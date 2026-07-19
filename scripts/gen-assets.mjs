/**
 * DOKURU! görsel üreticisi.
 * Marka kimliğine uygun, tutarlı SVG illüstrasyonlarını /public altına yazar.
 * Çalıştır:  node scripts/gen-assets.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUB = resolve(ROOT, "public");

const INK = "#1B1512";

function write(rel, svg) {
  const full = resolve(PUB, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, svg.trim() + "\n", "utf8");
  console.log("✓", rel);
}

function doc(w, h, title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}">
<title>${title}</title>
${body}
</svg>`;
}

/* --------------------------------------------------------------------- */
/*  Meyve parçası çizimleri — hem paket penceresinde hem tekil kullanılır */
/* --------------------------------------------------------------------- */

const fruit = {
  strawberry(cx, cy, s = 1, rot = 0) {
    return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${s})">
  <path d="M0,-30 C22,-30 34,-14 30,6 C26,26 12,40 0,40 C-12,40 -26,26 -30,6 C-34,-14 -22,-30 0,-30 Z" fill="#FF4D3D" stroke="${INK}" stroke-width="3.5"/>
  <path d="M-16,-30 C-10,-40 10,-40 16,-30 C10,-24 6,-22 0,-22 C-6,-22 -10,-24 -16,-30 Z" fill="#5FC66B" stroke="${INK}" stroke-width="3"/>
  <path d="M0,-40 L0,-28" stroke="#3B7d3f" stroke-width="4" stroke-linecap="round"/>
  ${[[-14, -8], [4, -12], [-4, 4], [14, -2], [-16, 12], [8, 8], [0, 20], [-8, -20]]
    .map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="2.4" ry="3.6" fill="#FFE9A8" stroke="${INK}" stroke-width="1" transform="rotate(${i * 24} ${x} ${y})"/>`)
    .join("")}
</g>`;
  },
  pineapple(cx, cy, s = 1, rot = 0) {
    return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${s})">
  <path d="M-20,-4 C-30,-40 30,-40 20,-4 L14,30 C10,42 -10,42 -14,30 Z" fill="#FFC23C" stroke="${INK}" stroke-width="3.5"/>
  <g stroke="#C77E12" stroke-width="2.2" opacity="0.8">
    <path d="M-18,2 L18,2"/><path d="M-16,14 L16,14"/><path d="M-14,26 L14,26"/>
    <path d="M-8,-30 L2,36"/><path d="M8,-30 L-2,36"/>
  </g>
  <path d="M0,-52 C10,-44 12,-30 4,-24 C0,-34 -2,-40 0,-52 Z" fill="#5FC66B" stroke="${INK}" stroke-width="2.6"/>
  <path d="M0,-50 C-10,-44 -12,-30 -4,-24 C0,-34 2,-40 0,-50 Z" fill="#4FB55C" stroke="${INK}" stroke-width="2.6"/>
  <path d="M-2,-46 C-4,-34 -4,-28 0,-24 C4,-28 4,-34 2,-46 Z" fill="#6FD37b" stroke="${INK}" stroke-width="2.4"/>
</g>`;
  },
  mango(cx, cy, s = 1, rot = 0) {
    return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${s})">
  <path d="M-6,-28 C24,-30 40,-6 30,20 C22,40 -6,44 -24,30 C-42,16 -34,-24 -6,-28 Z" fill="#FF8A2B" stroke="${INK}" stroke-width="3.5"/>
  <path d="M-2,-24 C16,-22 26,-8 22,10" fill="none" stroke="#FFD23F" stroke-width="5" stroke-linecap="round" opacity="0.85"/>
  <path d="M-6,-28 C-6,-36 -2,-40 4,-40" fill="none" stroke="#5FC66B" stroke-width="4" stroke-linecap="round"/>
</g>`;
  },
  banana(cx, cy, s = 1, rot = 0) {
    return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${s})">
  <path d="M-30,-22 C-36,6 -14,34 24,32 C30,32 34,28 30,24 C-2,26 -20,4 -16,-20 C-15,-26 -22,-28 -25,-26 Z" fill="#FFD23F" stroke="${INK}" stroke-width="3.5"/>
  <path d="M-24,-24 C-22,-30 -18,-32 -14,-30" fill="none" stroke="#8a6a12" stroke-width="4" stroke-linecap="round"/>
  <path d="M22,30 C28,30 30,26 27,23" fill="none" stroke="#8a6a12" stroke-width="4" stroke-linecap="round"/>
  <path d="M-24,-16 C-26,4 -12,22 12,24" fill="none" stroke="#C79A16" stroke-width="2.4" opacity="0.7"/>
</g>`;
  },
  blackberry(cx, cy, s = 1, rot = 0) {
    const dots = [[0, -14], [-11, -4], [11, -4], [-6, 8], [6, 8], [0, -2], [0, 18], [-13, 12], [13, 12]];
    return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${s})">
  ${dots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8.5" fill="#5B2A7A" stroke="${INK}" stroke-width="2.6"/>`).join("")}
  ${dots.map(([x, y]) => `<circle cx="${x - 2}" cy="${y - 2}" r="2.6" fill="#B387D6" opacity="0.8"/>`).join("")}
  <path d="M0,-22 C6,-30 14,-30 16,-24" fill="none" stroke="#5FC66B" stroke-width="4" stroke-linecap="round"/>
</g>`;
  },
  apple(cx, cy, s = 1, rot = 0) {
    return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${s})">
  <path d="M0,-18 C-6,-30 -30,-26 -30,-2 C-30,22 -12,38 0,30 C12,38 30,22 30,-2 C30,-26 6,-30 0,-18 Z" fill="#FF4D3D" stroke="${INK}" stroke-width="3.5"/>
  <path d="M0,-20 C2,-30 6,-34 12,-34" fill="none" stroke="#6b3b1a" stroke-width="4" stroke-linecap="round"/>
  <path d="M2,-22 C14,-30 20,-22 16,-14" fill="#5FC66B" stroke="${INK}" stroke-width="2.6"/>
  <path d="M-10,-6 C-12,4 -8,14 -2,18" fill="none" stroke="#FFC9C2" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
</g>`;
  },
  fig(cx, cy, s = 1, rot = 0) {
    return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${s})">
  <path d="M0,-24 C18,-24 30,-6 24,18 C20,34 -20,34 -24,18 C-30,-6 -18,-24 0,-24 Z" fill="#7B3F8F" stroke="${INK}" stroke-width="3.5"/>
  <path d="M0,-30 C6,-34 14,-32 12,-26 C8,-24 4,-24 0,-24 C-4,-24 -8,-24 -12,-26 C-14,-32 -6,-34 0,-30 Z" fill="#5FC66B" stroke="${INK}" stroke-width="2.6"/>
  <ellipse cx="0" cy="10" rx="12" ry="14" fill="#E0577F" opacity="0.55"/>
  ${[[-4, 4], [4, 8], [0, 16], [-6, 14], [6, 0]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="#FFE0EC"/>`).join("")}
</g>`;
  },
  dragonfruit(cx, cy, s = 1, rot = 0) {
    return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${s})">
  <path d="M0,-26 C20,-26 32,-8 26,16 C22,34 -22,34 -26,16 C-32,-8 -20,-26 0,-26 Z" fill="#FF5C93" stroke="${INK}" stroke-width="3.5"/>
  ${[[-24, -6, -30], [24, -6, 30], [-16, -22, -20], [16, -22, 20], [-20, 18, -50], [20, 18, 50]]
    .map(([x, y, r]) => `<path d="M0,0 C8,-4 14,-2 12,6 C6,8 2,6 0,0 Z" transform="translate(${x} ${y}) rotate(${r})" fill="#5FC66B" stroke="${INK}" stroke-width="2.4"/>`)
    .join("")}
  <ellipse cx="0" cy="6" rx="14" ry="18" fill="#FFEAF2" stroke="${INK}" stroke-width="2"/>
  ${[[-5, -2], [5, 0], [0, 8], [-4, 12], [4, 14], [0, -6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.7" fill="${INK}"/>`).join("")}
</g>`;
  },
};

/* --------------------------------------------------------------------- */
/*  Ürün paketi (pouch) illüstrasyonu                                     */
/* --------------------------------------------------------------------- */

function pouch({ title, body, accent, name, mod, drawFruit }) {
  const W = 360, H = 460;
  const crimp = (y) => {
    let d = `M60,${y} `;
    for (let x = 60; x <= 300; x += 20) d += `L${x + 10},${y - 9} L${x + 20},${y} `;
    return `<path d="${d}Z" fill="${body}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  };
  return doc(
    W,
    H,
    `${name} — DOKURU dondurularak kurutulmuş meyve paketi`,
    `
<rect x="72" y="46" width="216" height="368" rx="30" fill="${INK}" opacity="0.16"/>
<rect x="60" y="40" width="216" height="368" rx="28" fill="${body}" stroke="${INK}" stroke-width="6"/>
${crimp(44)}
${crimp(414)}
<rect x="150" y="26" width="12" height="22" rx="4" fill="${body}" stroke="${INK}" stroke-width="3"/>
<!-- üst logo -->
<g transform="translate(168 96) rotate(-3)">
  <text x="0" y="0" text-anchor="middle" font-family="Fredoka, Arial, sans-serif" font-weight="700" font-size="42" fill="#FFF4DA" stroke="${INK}" stroke-width="5" paint-order="stroke" letter-spacing="1">DOKURU!</text>
  <text x="0" y="26" text-anchor="middle" font-family="Fredoka, Arial, sans-serif" font-weight="600" font-size="13" fill="${INK}" letter-spacing="3">ÇITIR MEYVE</text>
</g>
<!-- pencere -->
<rect x="92" y="150" width="152" height="150" rx="26" fill="#FFF9E8" stroke="${INK}" stroke-width="5"/>
<clipPath id="win"><rect x="92" y="150" width="152" height="150" rx="26"/></clipPath>
<g clip-path="url(#win)">
  ${drawFruit}
</g>
<!-- lezzet şeridi -->
<g transform="translate(168 344) rotate(-2)">
  <rect x="-92" y="-26" width="184" height="52" rx="18" fill="${accent}" stroke="${INK}" stroke-width="5"/>
  <text x="0" y="7" text-anchor="middle" font-family="Fredoka, Arial, sans-serif" font-weight="700" font-size="26" fill="${INK}">${name.toUpperCase()}</text>
</g>
<text x="168" y="392" text-anchor="middle" font-family="Fredoka, Arial, sans-serif" font-weight="600" font-size="15" fill="${INK}" opacity="0.75">${mod}</text>
<!-- çıtır rozeti -->
<g transform="translate(276 128) rotate(12)">
  <path d="M0,-30 L8,-10 L30,-14 L14,2 L26,22 L2,14 L-14,30 L-12,6 L-32,-2 L-12,-8 Z" fill="#FFD23F" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <text x="0" y="6" text-anchor="middle" font-family="Fredoka, Arial, sans-serif" font-weight="700" font-size="13" fill="${INK}">ÇITIR</text>
</g>
`,
  );
}

/* --------------------------------------------------------------------- */
/*  Üretim                                                                */
/* --------------------------------------------------------------------- */

// Paket pencerelerindeki meyve kompozisyonları
const windows = {
  strawberry: fruit.strawberry(150, 210, 1.15, -8) + fruit.strawberry(210, 250, 0.75, 16) + fruit.strawberry(190, 190, 0.55, 30),
  pineapple: fruit.pineapple(160, 220, 1.1, -6) + fruit.pineapple(212, 250, 0.6, 12),
  mango: fruit.mango(150, 215, 1.15, -6) + fruit.mango(212, 255, 0.65, 20),
  banana: fruit.banana(160, 220, 1.15, -6) + fruit.banana(205, 255, 0.7, 18),
  blackberry: fruit.blackberry(150, 210, 1.15, -6) + fruit.blackberry(210, 250, 0.7, 14),
  mixed:
    fruit.strawberry(126, 200, 0.6, -12) +
    fruit.pineapple(200, 200, 0.55, 8) +
    fruit.mango(150, 250, 0.6, 16) +
    fruit.blackberry(212, 255, 0.55, -10),
};

const packs = [
  { slug: "strawberry-pack", body: "#FF6E8E", accent: "#FFD23F", name: "Çilek", mod: "Tatlı Mod", win: windows.strawberry },
  { slug: "pineapple-pack", body: "#FFC23C", accent: "#5FC66B", name: "Ananas", mod: "Tropik Mod", win: windows.pineapple },
  { slug: "mango-pack", body: "#FF8A3D", accent: "#FFD23F", name: "Mango", mod: "Güneşli Mod", win: windows.mango },
  { slug: "banana-pack", body: "#FFDD5C", accent: "#FF8A3D", name: "Muz", mod: "Rahat Mod", win: windows.banana },
  { slug: "blackberry-pack", body: "#7B4FA0", accent: "#FFD23F", name: "Böğürtlen", mod: "Gece Modu", win: windows.blackberry },
  { slug: "mixed-pack", body: "#68C4E8", accent: "#FF5C93", name: "Karışık", mod: "Kararsız Mod", win: windows.mixed },
];

for (const p of packs) {
  write(
    `images/products/${p.slug}.svg`,
    pouch({ body: p.body, accent: p.accent, name: p.name, mod: p.mod, drawFruit: p.win }),
  );
}

// Tekil meyve parçaları (hero + kart dekorasyonları)
const pieces = {
  "strawberry-piece": fruit.strawberry(60, 62, 1.4, -6),
  "pineapple-piece": fruit.pineapple(60, 66, 1.15, -6),
  "mango-piece": fruit.mango(60, 60, 1.25, -8),
  "banana-piece": fruit.banana(60, 60, 1.2, -4),
  "blackberry-piece": fruit.blackberry(60, 60, 1.4, -6),
  "apple-piece": fruit.apple(60, 60, 1.3, -6),
  "fig-piece": fruit.fig(60, 60, 1.35, -6),
  "dragonfruit-piece": fruit.dragonfruit(60, 62, 1.3, -6),
};
for (const [slug, g] of Object.entries(pieces)) {
  write(`images/fruits/${slug}.svg`, doc(120, 130, `${slug} illüstrasyonu`, g));
}

// İçerik sticker'ları (badge)
function badge(text, sub, fill, ring) {
  return doc(
    200,
    200,
    `${text} sticker`,
    `
<circle cx="100" cy="100" r="88" fill="${fill}" stroke="${INK}" stroke-width="7"/>
<circle cx="100" cy="100" r="72" fill="none" stroke="${ring}" stroke-width="4" stroke-dasharray="6 9"/>
<text x="100" y="94" text-anchor="middle" font-family="Fredoka, Arial, sans-serif" font-weight="700" font-size="30" fill="${INK}">${text}</text>
<text x="100" y="124" text-anchor="middle" font-family="Fredoka, Arial, sans-serif" font-weight="600" font-size="14" fill="${INK}" opacity="0.8">${sub}</text>
`,
  );
}
write("images/stickers/crunch.svg", badge("ÇITIR", "CRUNCH MODE", "#FFD23F", "#FF4D3D"));
write("images/stickers/real-fruit.svg", badge("%100", "GERÇEK MEYVE", "#5FC66B", "#FFF9E8"));
write("images/stickers/no-boring-snacks.svg", badge("NO", "BORING SNACKS", "#FF5C93", "#FFF9E8"));

// UGC / Instagram galeri karoları — markalı doku
const galleryTiles = [
  { fill: "#FF6E8E", f: fruit.strawberry(150, 150, 2.1, -8) },
  { fill: "#FFC23C", f: fruit.pineapple(150, 155, 1.7, -6) },
  { fill: "#FF8A3D", f: fruit.mango(150, 150, 2.0, -8) },
  { fill: "#7B4FA0", f: fruit.blackberry(150, 150, 2.2, -6) },
  { fill: "#68C4E8", f: fruit.dragonfruit(150, 152, 2.0, -6) },
];
galleryTiles.forEach((t, i) => {
  write(
    `images/gallery/ugc-${i + 1}.svg`,
    doc(
      300,
      300,
      `DOKURU topluluk paylaşımı ${i + 1}`,
      `
<rect width="300" height="300" fill="${t.fill}"/>
<g opacity="0.18" fill="#FFF9E8">
  ${Array.from({ length: 16 }, (_, k) => `<circle cx="${(k % 4) * 80 + 20}" cy="${Math.floor(k / 4) * 80 + 20}" r="8"/>`).join("")}
</g>
<circle cx="150" cy="150" r="96" fill="#FFF9E8" stroke="${INK}" stroke-width="6"/>
<clipPath id="c${i}"><circle cx="150" cy="150" r="93"/></clipPath>
<g clip-path="url(#c${i})">${t.f}</g>
<g transform="translate(150 262)">
  <rect x="-80" y="-18" width="160" height="34" rx="12" fill="${INK}"/>
  <text x="0" y="5" text-anchor="middle" font-family="Fredoka, Arial, sans-serif" font-weight="600" font-size="16" fill="#FFF4DA">@DOKURUCLUB</text>
</g>
`,
    ),
  );
});

// Marka hikâyesi — yakın plan kompozisyon
write(
  "images/story/closeup.svg",
  doc(
    600,
    600,
    "Yakın plan dondurularak kurutulmuş çilek",
    `
<rect width="600" height="600" fill="#FFE28A"/>
<g opacity="0.14" fill="#1B1512">
  ${Array.from({ length: 25 }, (_, k) => `<circle cx="${(k % 5) * 120 + 30}" cy="${Math.floor(k / 5) * 120 + 30}" r="6"/>`).join("")}
</g>
<circle cx="300" cy="300" r="210" fill="#FFF9E8" stroke="${INK}" stroke-width="8"/>
<clipPath id="story"><circle cx="300" cy="300" r="204"/></clipPath>
<g clip-path="url(#story)">
  ${fruit.strawberry(240, 260, 3.2, -10)}
  ${fruit.strawberry(390, 360, 2.1, 14)}
  ${fruit.blackberry(400, 220, 1.6, 8)}
  ${fruit.mango(220, 400, 1.6, -14)}
</g>
<g transform="translate(300 300) rotate(-8)"></g>
`,
  ),
);

console.log("\nTüm görseller üretildi.");
