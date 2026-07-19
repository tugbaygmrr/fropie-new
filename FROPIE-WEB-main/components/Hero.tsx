import Image from "next/image";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

const miniPacks = [
  "/images/products/strawberry-pack.svg",
  "/images/products/mango-pack.svg",
  "/images/products/banana-pack.svg",
  "/images/products/blackberry-pack.svg",
];

export default function Hero() {
  return (
    <section id="top" className="px-3 pb-16 pt-2 sm:px-6 lg:px-10">
      <div className="relative mx-auto min-h-[610px] max-w-[1380px] overflow-hidden rounded-[30px] bg-[#67A948] px-6 py-10 text-white sm:min-h-[680px] sm:px-12 lg:px-20">
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[#B9E164]/40 blur-3xl" />
        <div className="absolute -bottom-32 left-[25%] h-96 w-96 rounded-full bg-[#F1B541]/35 blur-3xl" />

        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/75"><Leaf size={15} /> %100 gerçek meyve</span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">Yeni sezon · 2026</span>
        </div>

        <p className="pointer-events-none absolute left-1/2 top-[24%] z-0 -translate-x-1/2 whitespace-nowrap font-heading text-[18vw] font-bold leading-none tracking-[-0.07em] text-[#CDE99A]/55 lg:text-[11.5rem]">
          ÇITIR MEYVE
        </p>

        <div className="relative z-10 grid min-h-[520px] items-center gap-8 lg:grid-cols-[0.8fr_1.2fr_0.8fr]">
          <div className="self-end pb-16 lg:self-center lg:pb-0">
            <p className="max-w-xs font-body text-lg font-semibold leading-relaxed text-white/90">
              Meyvenin en saf halini, dört mevsim yanında taşıyabileceğin çıtır paketlere dönüştürdük.
            </p>
            <a href="#urunler" className="mt-7 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 font-display font-semibold text-[#477E34] shadow-[0_12px_30px_rgba(42,85,29,0.18)] transition-transform hover:-translate-y-1">
              Ürünleri keşfet <ArrowRight size={18} />
            </a>
          </div>

          <div className="absolute left-1/2 top-[48%] w-[270px] -translate-x-1/2 -translate-y-1/2 sm:w-[340px] lg:relative lg:left-auto lg:top-auto lg:w-auto lg:translate-x-0 lg:translate-y-0">
            <div className="absolute inset-12 rounded-full bg-[#F5C34C]/70 blur-3xl" />
            <Image src="/images/products/strawberry-pack.svg" alt="DOKURU çilek paketi" width={420} height={540} priority unoptimized className="relative mx-auto h-[430px] w-auto rotate-[-4deg] drop-shadow-[0_28px_32px_rgba(34,70,22,0.28)] sm:h-[520px]" />
            <Image src="/images/fruits/strawberry-piece.svg" alt="" aria-hidden="true" width={100} height={110} unoptimized className="absolute -left-5 top-24 w-20 -rotate-12 drop-shadow-xl sm:-left-10 sm:w-28" />
            <Image src="/images/fruits/mango-piece.svg" alt="" aria-hidden="true" width={100} height={110} unoptimized className="absolute -right-2 bottom-16 w-20 rotate-12 drop-shadow-xl sm:-right-10 sm:w-28" />
          </div>

          <div className="hidden self-end pb-14 lg:block">
            <div className="ml-auto max-w-[220px] rounded-[24px] bg-white/12 p-5 backdrop-blur-sm">
              <Sparkles size={20} className="text-[#F8D978]" />
              <p className="mt-3 font-display text-lg font-semibold">Katkısız. Hafif. Fazlasıyla çıtır.</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 items-end gap-2 sm:gap-4">
          {miniPacks.map((src, index) => (
            <Image key={src} src={src} alt="" aria-hidden="true" width={90} height={115} unoptimized className={`h-20 w-auto drop-shadow-lg sm:h-28 ${index % 2 ? "translate-y-3" : ""}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
