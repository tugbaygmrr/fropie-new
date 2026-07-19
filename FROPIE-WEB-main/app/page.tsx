import FooterStickers from "@/components/FooterStickers";
import HeroPour from "@/components/HeroPour";
import BasketReveal from "@/components/BasketReveal";
import CardMotion from "@/components/CardMotion";

const A = "/images/fropie/";

function Pill({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`f-pill ${className}`}>{children}</div>;
}

export default function HomePage() {
  return (
    <main className="fropie-viewport" id="main">
      <div className="fropie-canvas">
        {/* Arka plan deseni — dekoratif, içerik değil. <img> değil <div>:
            görsel maske olarak kullanılıyor, rengi CSS'ten geliyor. */}
        <div className="f-squiggle f-sq1" aria-hidden="true" />
        <div className="f-squiggle f-sq2" aria-hidden="true" />
        <div className="f-squiggle f-sq3" aria-hidden="true" />
        <div className="f-squiggle f-sq4" aria-hidden="true" />
        <div className="f-squiggle f-sq5" aria-hidden="true" />

        <header className="f-header">
          <a className="f-logo" href="#top">fropie</a>
          <nav aria-label="Ana menü">
            <a href="#products">Ürünler</a><a href="#about">Biz Kimiz?</a><a href="#life">Fropie&apos;li Yaşam</a><a href="#blog">Blog</a>
          </nav>
          <button className="f-cart">SEPETİM →</button>
        </header>

        <section className="f-hero" id="top">
          <h1>İYİ GELEN<br />ATIŞTIRMALIK</h1>
          <p>Şeker ilavesiz, bitki bazlı ve gerçekten lezzetli. Kendine iyi bakmanın en eğlenceli hali.</p>
          <div className="f-hero-actions"><a href="#products">KEŞFE ÇIK!</a><a href="#about">FROPIE NEDİR?</a></div>
        </section>
        <img className="f-circle f-hero-circle" src={`${A}hero-circle.svg`} alt="" />
        <HeroPour />
        <CardMotion />
        <div className="f-badges"><Pill className="lime">GLUTENSİZ</Pill><Pill className="yellow">VEGAN</Pill><Pill className="pink">PROBİYOTİK</Pill></div>

        <section className="f-about" id="about">
          <h2>FROPİE KÜÇÜK BİR ATIŞTIRMALIK<br />AMA BÜYÜK BİR KEYİF.</h2>
          <p>İçindekiler okunur, lezzeti unutulmaz. Günlük koşuşturmacaya iyi gelen gerçek malzemeler.</p>
          <div className="f-values">
            <article><b>01</b><h3>KATKISIZ İÇERİK</h3><p>Ne varsa paketin üzerinde. Gizli saklı hiçbir şey yok.</p></article>
            <article><b>02</b><h3>GERÇEK LEZZET</h3><p>İyi gelen içerikler, gerçekten güzel bir tatla buluşur.</p></article>
            <article><b>03</b><h3>GÜNLÜK ENERJİ</h3><p>Günün her anında yanında olacak pratik bir atıştırmalık.</p></article>
          </div>
        </section>

        <section className="f-products" id="products">
          <h2>BUGÜN HANGİ FROPİE SENLİK?</h2><p>Birini seçmek zor. O yüzden hepsini dene.</p>
          <div className="f-product-grid">
            <article><h3>PROTEİN BARLAR</h3><p>Fıstık ve kakao</p><img src={`${A}product-protein.png`} alt="Protein barlar" /><button>İNCELE</button></article>
            <article><h3>HURMA TOPLARI</h3><p>Minik ama güçlü</p><img src={`${A}product-dates.png`} alt="Hurma topları" /><button>İNCELE</button></article>
            <article><h3>NOHUT CİPSİ</h3><p>Çıtır çıtır keyif</p><img src={`${A}product-chips.png`} alt="Nohut cipsi" /><button>İNCELE</button></article>
          </div>
        </section>
        <img className="f-layer f-middle-layer" src={`${A}basket-arm.png`} alt="Fropie ürünleriyle yaşam" />

        <section className="f-bundle">
          <h2>TANIŞMA PAKETİYLE<br />FROPİE&apos;YE MERHABA DE.</h2><p>Favorilerini bulmanın en leziz yolu burada.</p><button>PAKETİ GÖR</button>
        </section>
        <img className="f-circle f-bundle-circle" src={`${A}bundle-circle.svg`} alt="" />
        <BasketReveal />

        <section className="f-life" id="life">
          <h2>FROPİE&apos;Lİ HALLER</h2><a href="https://instagram.com/fropietr">@fropietr</a>
          <div>
            <article><header>KAHVEYE EŞLİK EDER</header><img src={`${A}life-kahve.webp`} alt="Kahve yanında Fropie kuruyemiş bar" /></article>
            <article><header>ÇANTAYA SIĞAR</header><img src={`${A}life-canta.webp`} alt="Çantada Fropie proteinli toplar" /></article>
            <article><header>MOLAYA YAKIŞIR</header><img src={`${A}life-mola.webp`} alt="Çalışma masasında Fropie smoothie mix" /></article>
            <article><header>GÜNÜNE ENERJİ KATAR</header><img src={`${A}life-enerji.webp`} alt="Fropie kombucha içen kadın" /></article>
          </div>
        </section>
        <footer>
          <div className="f-foot-top"><strong>fropie</strong><span>İyi geleni seç.</span></div>
          <FooterStickers />
          <div className="f-foot-bottom"><span>© 2026 Fropie</span><span>Şeker ilavesiz, bitki bazlı.</span></div>
        </footer>
      </div>
    </main>
  );
}
