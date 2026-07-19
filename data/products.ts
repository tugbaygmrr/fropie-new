export interface Product {
  id: string;
  name: string;
  mood: string;
  tagline: string;
  price: number;
  grams: number;
  /** Kart arka plan rengi (Tailwind arbitrary değeri için hex) */
  bg: string;
  /** Kart üzerindeki metin rengi kontrastı: koyu mu açık mı */
  onDark?: boolean;
  image: string;
  imageAlt: string;
  /** Görsel bir SVG paket cutout'u değil, çerçevelenecek gerçek fotoğrafsa true */
  photo?: boolean;
  sticker: string;
  /** Ürüne özel meyve parçası dekoru */
  piece: string;
}

export const products: Product[] = [
  {
    id: "cilek",
    name: "Çilek",
    mood: "Tatlı Mod",
    tagline: "Tatlı krizlerinin çıtır çözümü.",
    price: 129,
    grams: 20,
    bg: "#F3C3CC",
    image: "/images/products/strawberry-photo.jpg",
    imageAlt: "dokuru dondurularak kurutulmuş çilek atıştırmalık kutusu",
    photo: true,
    sticker: "Çilek Çetesi",
    piece: "/images/fruits/strawberry-piece.svg",
  },
  {
    id: "incir",
    name: "İncir",
    mood: "Bahçe Modu",
    tagline: "Bahçenin en tatlı, en çıtır hali.",
    price: 159,
    grams: 25,
    bg: "#CDBBD8",
    image: "/images/products/incir-photo.jpg",
    imageAlt: "dokuru dondurularak kurutulmuş incir atıştırmalık kutusu",
    photo: true,
    sticker: "İncir Sever",
    piece: "/images/fruits/fig-piece.svg",
  },
  {
    id: "mango",
    name: "Mango",
    mood: "Güneşli Mod",
    tagline: "Güneşi paketledik.",
    price: 149,
    grams: 20,
    bg: "#F2C9A9",
    image: "/images/products/mango-photo.jpg",
    imageAlt: "dokuru dondurularak kurutulmuş mango atıştırmalık kutusu",
    photo: true,
    sticker: "Güneş Ekibi",
    piece: "/images/fruits/mango-piece.svg",
  },
  {
    id: "muz",
    name: "Muz",
    mood: "Rahat Mod",
    tagline: "Kahvenin yanına gelen en iyi fikir.",
    price: 119,
    grams: 24,
    bg: "#F4E2A8",
    image: "/images/products/muz-photo.jpg",
    imageAlt: "dokuru dondurularak kurutulmuş muz atıştırmalık kutusu",
    photo: true,
    sticker: "Sakin Kal",
    piece: "/images/fruits/banana-piece.svg",
  },
  {
    id: "bogurtlen",
    name: "Böğürtlen",
    mood: "Gece Modu",
    tagline: "Gece atıştırmasının karanlık tarafı.",
    price: 154,
    grams: 18,
    bg: "#C8B8D5",
    image: "/images/products/bogurtlen-photo.jpg",
    imageAlt: "dokuru dondurularak kurutulmuş böğürtlen atıştırmalık kutusu",
    photo: true,
    sticker: "Gece Vardiyası",
    piece: "/images/fruits/blackberry-piece.svg",
  },
  {
    id: "karisik",
    name: "Karışık Kutu",
    mood: "Kararsız Mod",
    tagline: "Karar veremeyenler için hepsi bir arada.",
    price: 199,
    grams: 30,
    bg: "#BDDDE7",
    image: "/images/products/karisik-photo.jpg",
    imageAlt: "dokuru karışık dondurularak kurutulmuş meyve atıştırmalık kutusu",
    photo: true,
    sticker: "Kararsız Kulüp",
    piece: "/images/fruits/dragonfruit-piece.svg",
  },
];

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
  }).format(value);
}
