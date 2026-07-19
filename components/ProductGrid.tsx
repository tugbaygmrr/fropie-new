import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import Doodle from "./Doodle";

export default function ProductGrid() {
  return (
    <section
      id="urunler"
      className="relative z-10 bg-white px-4 pb-28 pt-10 sm:px-6 sm:pt-20"
      aria-labelledby="urunler-baslik"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-forest">
            <Doodle type="sun" color="#67A948" className="h-4 w-4" /> Meyve seçkisi
          </span>
          <h2 id="urunler-baslik" className="section-title text-ink tracking-[-0.02em]">
            Favori çıtırtını seç.
          </h2>
          <p className="mx-auto mt-3 max-w-md font-body text-lg font-semibold text-ink/75">
            Gerçek meyve, canlı tatlar ve her ana yakışan hafif paketler.
          </p>
        </Reveal>

        {/* Mobilde yatay kaydırma, masaüstünde grid */}
        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal
              as="li"
              key={product.id}
              delay={i * 0.06}
              className="min-w-[78%] snap-center sm:min-w-0"
            >
              <ProductCard product={product} index={i} />
            </Reveal>
          ))}
        </ul>

        <p className="mt-6 text-center font-hand text-xl text-ink/70 sm:hidden">
          ← kaydır, hepsini gör →
        </p>
      </div>
    </section>
  );
}
