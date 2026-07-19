# fropie 🥥

**İyi Gelen Atıştırmalık** — şeker ilavesiz, bitki bazlı atıştırmalıklar için tek sayfalık
tanıtım sitesi. Figma tasarımının (1440×4650) piksel karşılığı olarak kurulmuş, ekran
genişliğine göre ölçeklenen bir tuval üzerine yerleştirilmiştir.

## Teknolojiler

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — yardımcı sınıflar; bölüm düzenleri `app/globals.css` içinde elle yazılmış
- **Framer Motion** ve **GSAP + ScrollTrigger** — scroll'a bağlı animasyonlar
- **next/font** — Bricolage Grotesque, Poppins, Fredoka, Nunito, Caveat + yerel Baloo Bhai

## Kurulum

```bash
npm install
npm run dev      # http://localhost:3000
```

Üretim derlemesi:

```bash
npm run build && npm start
```

## Mimari

```
app/
  layout.tsx        # fontlar, SEO metadata, --f-scale ölçekleme scripti
  page.tsx          # tüm sayfa: header, hero, hakkımızda, ürünler, tanışma paketi, yaşam, footer
  globals.css       # .fropie-canvas tuvali ve tüm bölüm konumlandırmaları
components/
  HeroPour.tsx      # hero paketi + dökülen ürün animasyonu
  CardMotion.tsx    # ürün kartlarının scroll hareketi
  BasketReveal.tsx  # tanışma paketi sepetinin açılma animasyonu
  FooterStickers.tsx# footer'daki dönen sticker linkleri
public/images/fropie/   # sayfada kullanılan görseller (webp/png/svg)
```

### Ölçekleme nasıl çalışıyor?

Tasarım sabit 1440px genişliğinde bir tuval (`.fropie-canvas`) üzerine mutlak konumlarla
yerleştirilmiştir. [layout.tsx](app/layout.tsx#L103-L108) içindeki satır içi script,
`clientWidth / 1440` oranını `--f-scale` CSS değişkenine yazar; tuval bu oranla
`transform: scale()` uygulanarak her ekran genişliğine oturur. Script ilk boyamadan önce
çalıştığı için `<html>` üzerinde `suppressHydrationWarning` kullanılır.

## Erişilebilirlik

- "İçeriğe geç" atlama bağlantısı ve görünür odak halkaları
- Dekoratif görsellerde `alt=""` / `aria-hidden`, anlamlı görsellerde açıklayıcı `alt`
- Semantik bölüm etiketleri ve `aria-label`'lı ana menü

## Bilinen artıklar

`components/` altında bu sayfada **kullanılmayan** eski bir projeden (DOKURU) kalma
bileşenler bulunuyor: `Header`, `Footer`, `Hero`, `BrandStory`, `ProductGrid`, `Recipes`,
`Reviews`, `Newsletter`, `StickerClub` vb. ile `data/products.ts`, `data/site.ts` ve
`context/CartContext.tsx`. [app/page.tsx](app/page.tsx) bunların hiçbirini import etmez;
temizlenmeleri güvenlidir.
