import { Clock, Mail, PackageCheck, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const recipes = [
  { title: "Çıtır yoğurt kasesi", time: "5 dk", text: "Yoğurt, granola, bal ve bir avuç DOKURU çileği kat kat yerleştir." },
  { title: "Tropik smoothie", time: "7 dk", text: "Muz, mango, süt ve DOKURU mangoyu blender’dan geçir; üstünü ekstra çıtırtıyla bitir." },
  { title: "Kahveli muz lokması", time: "4 dk", text: "DOKURU muzu fıstık ezmesine batır, tarçın serp ve kahvenin yanında servis et." },
];

export default function Recipes() {
  return (
    <section id="tarifler" className="bg-cream px-4 py-20 sm:px-6" aria-labelledby="tarifler-baslik">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <span className="chip mb-4 bg-sunny"><Sparkles size={16} /> Çıtır fikirler</span>
          <h2 id="tarifler-baslik" className="section-title">PAKETİ AÇ,<br />TARİFİ KAP.</h2>
          <p className="mt-3 font-body text-lg font-semibold text-ink/70">DOKURU’yu yalnız yemek serbest; paylaşmak ve tariflere katmak daha da eğlenceli.</p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {recipes.map((recipe, index) => (
            <Reveal key={recipe.title} delay={index * 0.08}>
              <article className="card-chunk h-full p-6 shadow-pop">
                <span className="chip bg-lime text-xs"><Clock size={14} /> {recipe.time}</span>
                <h3 className="mt-5 font-display text-2xl font-bold">{recipe.title}</h3>
                <p className="mt-3 font-body font-semibold leading-relaxed text-ink/70">{recipe.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <article id="kargo" className="rounded-3xl border-[3px] border-ink bg-sunny p-6 shadow-pop">
            <PackageCheck size={30} />
            <h3 className="mt-3 font-display text-2xl font-bold">Kargo ve iade</h3>
            <p className="mt-2 font-body font-semibold text-ink/70">Siparişler 1–3 iş gününde hazırlanır. Açılmamış ürünleri teslimden sonraki 14 gün içinde bize bildirerek iade edebilirsin.</p>
          </article>
          <article id="sss" className="rounded-3xl border-[3px] border-ink bg-lime p-6 shadow-pop">
            <Mail size={30} />
            <h3 className="mt-3 font-display text-2xl font-bold">Aklına bir şey mi takıldı?</h3>
            <p className="mt-2 font-body font-semibold text-ink/70">Ürün, alerjen veya sipariş soruların için bize yaz. En geç bir iş günü içinde döneriz.</p>
            <a href="mailto:merhaba@dokuru.tr" className="btn-ink mt-4">merhaba@dokuru.tr</a>
          </article>
        </div>
      </div>
    </section>
  );
}
