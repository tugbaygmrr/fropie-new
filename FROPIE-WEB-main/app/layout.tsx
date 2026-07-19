import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito, Caveat, Bricolage_Grotesque, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Başlıklar için özel font
const heading = localFont({
  src: "./fonts/BalooBhai-Regular.ttf",
  variable: "--font-heading",
  display: "swap",
});

const display = Fredoka({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Hero için premium modern display fontu
const hero = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-hero",
  display: "swap",
});

const body = Nunito({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-hand",
  display: "swap",
});

const poppins = Poppins({ subsets: ["latin", "latin-ext"], weight: ["400", "700"], variable: "--font-poppins", display: "swap" });

const SITE_URL = "https://fropie.com.tr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "fropie — İyi Gelen Atıştırmalık",
    template: "%s · fropie",
  },
  description:
    "Şeker ilavesiz, bitki bazlı ve gerçekten lezzetli atıştırmalıklar. Probiyotikli toplar, protein barlar, nohut cipsi ve daha fazlası — kendine iyi bakmanın en eğlenceli hali.",
  keywords: [
    "fropie",
    "sağlıklı atıştırmalık",
    "şeker ilavesiz atıştırmalık",
    "probiyotikli toplar",
    "protein bar",
    "bitki bazlı atıştırmalık",
    "vegan atıştırmalık",
  ],
  authors: [{ name: "fropie" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "fropie",
    title: "fropie — İyi Gelen Atıştırmalık",
    description:
      "Şeker ilavesiz, bitki bazlı ve gerçekten lezzetli. Favorilerini bulmanın en leziz yolu burada.",
    images: [{ url: "/images/fropie/hero-package.png", width: 1024, height: 1536, alt: "fropie probiyotik granola paketi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "fropie — İyi Gelen Atıştırmalık",
    description: "Şeker ilavesiz, bitki bazlı ve gerçekten lezzetli atıştırmalıklar.",
  },
  category: "food",
};

export const viewport: Viewport = {
  themeColor: "#fff9ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: aşağıdaki script hydration'dan önce <html>'e
    // --f-scale yazıyor, sunucu çıktısıyla kasıtlı olarak farklılaşıyor.
    <html lang="tr" suppressHydrationWarning className={`${display.variable} ${hero.variable} ${heading.variable} ${body.variable} ${hand.variable} ${poppins.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border-[3px] focus:border-ink focus:bg-sunny focus:px-4 focus:py-2 focus:font-display focus:font-semibold"
        >
          İçeriğe geç
        </a>
        {children}
        {/* Figma tuvalini (1440px) ekran genişliğine oturtur — kenarlarda boşluk kalmaz.
            İlk boyama öncesi çalışsın diye inline; resize'da yeniden hesaplar. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){function s(){document.documentElement.style.setProperty('--f-scale',String(document.documentElement.clientWidth/1440))}s();addEventListener('resize',s)})()",
          }}
        />
      </body>
    </html>
  );
}
