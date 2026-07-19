# DOKURU! 🍓

Dondurularak kurutulmuş çıtır meyve atıştırmalık markası için özgün, eğlenceli ve
sosyal medyada paylaşılabilir bir e-ticaret ana sayfası. Sticker + scrapbook estetiği,
kalın siyah konturlar, canlı renkler, mikro animasyonlar.

## Teknolojiler

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — özel marka renk paleti ve animasyonları
- **Framer Motion** — hero parallax, 3D tilt, scroll reveal, mikro animasyonlar
- **GSAP + ScrollTrigger** — marka hikâyesindeki gelişmiş scroll-scrub parallax
- **lucide-react** — ikonlar
- **next/image** — CLS'siz görsel yükleme

## Kurulum

```bash
npm install
npm run dev      # http://localhost:3000
```

Üretim derlemesi:

```bash
npm run build && npm start
```

## Görseller

Tüm görseller markaya özel **SVG illüstrasyonlardır** (boş gri kutu / gradient yok).
`scripts/gen-assets.mjs` bunları üretir:

```bash
node scripts/gen-assets.mjs
```

Üretilen dosyalar:

| Klasör | İçerik |
| --- | --- |
| `public/images/products/*` | Ürün fotoğrafları ve paket illüstrasyonları |
| `public/images/fruits/*.svg` | Tekil meyve parçaları (hero + kart dekorları) |
| `public/images/stickers/*.svg` | Rozet sticker'ları (crunch, real-fruit, no-boring-snacks) |
| `public/images/gallery/*.svg` | Instagram / UGC karoları |
| `public/images/story/closeup.svg` | Marka hikâyesi yakın plan görseli |

> Gerçek fotoğraf/çizimlerle değiştirmek için aynı dosya yollarına kendi görsellerini koyman yeterli.

## Mimari

```
app/
  layout.tsx        # fontlar (Fredoka/Nunito/Caveat) + SEO metadata
  page.tsx          # bölümlerin kurgusu + CartProvider
  globals.css       # grain dokusu, marquee, buton/kart yardımcıları, reduced-motion
components/          # 14 marka bölümü + 3 paylaşılan yapı taşı (Doodle/Sticker/FloatingFruit/Reveal)
context/CartContext.tsx   # sepet state'i (badge + "Sepete At")
data/                # products.ts, site.ts — tüm içerik ve TS interface'leri
scripts/gen-assets.mjs    # SVG görsel üreticisi
```

## Öne çıkanlar

- Transparan → scroll'da krem + blur'lu sticky header, canlı sepet rozeti
- Mouse'u takip eden 3D tilt + parallax hero, scroll'da dağılan meyve parçaları
- Çalışan **Kendi Kutunu Yap** demosu (canlı önizleme, fiyat ve seçilen içeriği koruyan sepet)
- Yerel depolamada kalıcı sepet, hesap ve bülten tercihleri
- Açılır ürün arama, hesap ve sepet panelleri
- Tarifler, kargo/iade ve iletişim bölümleri
- İnteraktif Sticker Kulübü + koleksiyon ilerleme çubuğu
- `prefers-reduced-motion` desteği ve mobilde sadeleştirilmiş animasyonlar
- Semantik HTML, ARIA etiketleri, açıklayıcı `alt` metinleri, klavye odak halkaları
