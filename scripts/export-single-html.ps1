$ErrorActionPreference = 'Stop'
$baseUrl = 'http://127.0.0.1:3000'
$outputDir = Join-Path $PSScriptRoot '..\outputs'
$outputPath = Join-Path $outputDir 'fropie-site.html'

New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

function Get-DataUri([string]$url) {
  $response = Invoke-WebRequest -Uri $url -UseBasicParsing
  $contentType = $response.Headers['Content-Type']
  if (-not $contentType) { $contentType = 'application/octet-stream' }
  $bytes = $response.Content
  if ($bytes -is [string]) { $bytes = [Text.Encoding]::UTF8.GetBytes($bytes) }
  return "data:$contentType;base64,$([Convert]::ToBase64String($bytes))"
}

$html = (Invoke-WebRequest -Uri $baseUrl -UseBasicParsing).Content

$cssLinks = [regex]::Matches($html, '<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>')
foreach ($match in $cssLinks) {
  $href = $match.Groups[1].Value
  $cssUrl = if ($href.StartsWith('http')) { $href } else { "$baseUrl$href" }
  $css = (Invoke-WebRequest -Uri $cssUrl -UseBasicParsing).Content
  $assetMatches = [regex]::Matches($css, 'url\(([^)]+)\)')
  foreach ($assetMatch in $assetMatches) {
    $raw = $assetMatch.Groups[1].Value.Trim('"', "'")
    if ($raw.StartsWith('data:')) { continue }
    $assetUrl = if ($raw.StartsWith('http')) { $raw } elseif ($raw.StartsWith('/')) { "$baseUrl$raw" } else { [Uri]::new([Uri]$cssUrl, $raw).AbsoluteUri }
    $css = $css.Replace($raw, (Get-DataUri $assetUrl))
  }
  $html = $html.Replace($match.Value, "<style>$css</style>")
}

$imageMatches = [regex]::Matches($html, '<img[^>]+src="([^"]+)"[^>]*>')
foreach ($match in $imageMatches) {
  $src = $match.Groups[1].Value
  if ($src.StartsWith('data:')) { continue }
  $imageUrl = if ($src.StartsWith('http')) { $src } else { "$baseUrl$src" }
  $html = $html.Replace("src=`"$src`"", "src=`"$(Get-DataUri $imageUrl)`"")
}

$html = [regex]::Replace($html, '<script[^>]*>.*?</script>', '', 'Singleline')
$html = [regex]::Replace($html, '<link[^>]+rel="preload"[^>]*>', '')
$html = $html.Replace('<head>', '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">')
[IO.File]::WriteAllText($outputPath, $html, [Text.UTF8Encoding]::new($false))
Write-Output $outputPath
