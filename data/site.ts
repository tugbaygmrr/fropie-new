export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Meyveler", href: "#urunler" },
  { label: "Karışık Kutular", href: "#kutu-yap" },
  { label: "Hikâyemiz", href: "#hikaye" },
  { label: "Sticker Kulübü", href: "#sticker-kulubu" },
  { label: "Tarifler", href: "#tarifler" },
];

export const announcements: string[] = [
  "750 TL üzeri kargo bizden",
  "Gerçek meyve, gerçek çıtırtı",
  "Paketlerin içinden sürpriz sticker çıkar",
  "İlave sıkıcılık içermez",
];

export interface StickerItem {
  label: string;
  color: string;
  rotate: number;
  collected: boolean;
}

export const clubStickers: StickerItem[] = [
  { label: "Crunch Mode", color: "#F4E2A8", rotate: -8, collected: true },
  { label: "Fruit Addict", color: "#E8B6C3", rotate: 6, collected: true },
  { label: "Tropik Kafa", color: "#BDD8B7", rotate: -4, collected: true },
  { label: "Çilek Çetesi", color: "#E6AAA2", rotate: 9, collected: true },
  { label: "Ananasın Havası", color: "#EED69B", rotate: -10, collected: true },
  { label: "Snack First", color: "#BBDCE7", rotate: 5, collected: false },
  { label: "Gerçek Meyve Gang", color: "#EBC3A5", rotate: -6, collected: false },
  { label: "Gece Vardiyası", color: "#C9B8D5", rotate: 7, collected: false },
];

export interface StickerPack {
  name: string;
  tagline: string;
  src: string;
  rotate: number;
}

export const stickerPacks: StickerPack[] = [
  { name: "Çilek Çetesi", tagline: "Tatlı bir çete, doğadan gelen lezzet", src: "/images/stickers/pack-cilek.jpg", rotate: -3 },
  { name: "Crunch Mode", tagline: "Kuru meyve gücü, her an yanında", src: "/images/stickers/pack-crunch.jpg", rotate: 2.5 },
  { name: "Ananasın Havası", tagline: "Tropik enerji, doğal lezzet", src: "/images/stickers/pack-ananas.jpg", rotate: -2 },
  { name: "Tropik Kafa", tagline: "Enerjini doğadan al", src: "/images/stickers/pack-tropik.jpg", rotate: 3 },
  { name: "Fruit Addict", tagline: "Meyveye bağımlı olanlar buraya", src: "/images/stickers/pack-fruit.jpg", rotate: -2.5 },
  { name: "Gerçek Meyve Gang", tagline: "Doğal lezzetin gerçek ekibi", src: "/images/stickers/pack-gang.jpg", rotate: 2 },
  { name: "Snack First", tagline: "Lezzeti öncele, hayatı keyifle", src: "/images/stickers/pack-snack.jpg", rotate: -3 },
  { name: "Gece Vardiyası", tagline: "İşin biter, lezzet başlar", src: "/images/stickers/pack-gece.jpg", rotate: 2.5 },
];

export interface Review {
  quote: string;
  author: string;
  handle: string;
  color: string;
  rotate: number;
}

export const reviews: Review[] = [
  {
    quote: "Çileği açtım, iki dakika sonra paket yoktu.",
    author: "Deniz",
    handle: "@deniz.atistirir",
    color: "#F0C1CB",
    rotate: -5,
  },
  {
    quote: "Kahvenin yanına aldım ama kahveye kalmadı.",
    author: "Selin",
    handle: "@selinyer",
    color: "#F1DCA2",
    rotate: 4,
  },
  {
    quote: "Çocuğa diye aldım, çoğunu ben yedim.",
    author: "Baran",
    handle: "@baran.evde",
    color: "#BCD7B7",
    rotate: -3,
  },
  {
    quote: "Sticker biriktirmeye başladım, snack bahane.",
    author: "Ece",
    handle: "@ecenin.masasi",
    color: "#B8DAE6",
    rotate: 6,
  },
];

export interface Feature {
  title: string;
  desc: string;
  emoji: string;
  color: string;
}

export const storyFeatures: Feature[] = [
  {
    title: "Gerçek meyve",
    desc: "İçinde sadece meyve var. Katkı yok, numara yok, sıkıcılık hiç yok.",
    emoji: "🍓",
    color: "#F0C1CB",
  },
  {
    title: "Uzun raf ömrü",
    desc: "Çantada ezilmez, dolapta unutulur ama bozulmaz. Aylarca çıtır kalır.",
    emoji: "⏳",
    color: "#F1DCA2",
  },
  {
    title: "Hafif ve çıtır",
    desc: "Suyunu aldık, çıtırtısını bıraktık. Bir avuç, kocaman bir tat.",
    emoji: "✨",
    color: "#BCD7B7",
  },
];

export const galleryImages: { src: string; alt: string; handle: string }[] = [
  { src: "/images/gallery/social-1.jpg", alt: "İncir kutusuyla dokuru topluluk paylaşımı", handle: "@ayse.crunch" },
  { src: "/images/gallery/social-2.jpg", alt: "Çilek, mango ve incir kutularıyla dokuru topluluk paylaşımı", handle: "@tropik.kerem" },
  { src: "/images/gallery/social-3.jpg", alt: "Güneşte mango cipsi yerken dokuru topluluk paylaşımı", handle: "@gunes.li" },
  { src: "/images/gallery/social-4.jpg", alt: "Dokuru karışık miks atıştırırken topluluk paylaşımı", handle: "@gece.snacki" },
  { src: "/images/gallery/social-5.jpg", alt: "Muz kutusunu çantaya koyarken dokuru topluluk paylaşımı", handle: "@kararsiz.zeynep" },
];

export const footerLinks: { title: string; links: NavLink[] }[] = [
  {
    title: "Alışveriş",
    links: [
      { label: "Ürünler", href: "#urunler" },
      { label: "Karışık Kutular", href: "#kutu-yap" },
      { label: "Sticker Kulübü", href: "#sticker-kulubu" },
    ],
  },
  {
    title: "Marka",
    links: [
      { label: "Hakkımızda", href: "#hikaye" },
      { label: "Tarifler", href: "#tarifler" },
      { label: "Sıkça Sorulan Sorular", href: "#sss" },
    ],
  },
  {
    title: "Yardım",
    links: [
      { label: "Kargo ve İade", href: "#kargo" },
      { label: "İletişim", href: "mailto:merhaba@dokuru.tr" },
      { label: "Instagram", href: "https://www.instagram.com/dokuru" },
      { label: "TikTok", href: "https://www.tiktok.com/@dokuru" },
    ],
  },
];
