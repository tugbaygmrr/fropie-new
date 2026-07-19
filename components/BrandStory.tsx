import { Apple, HeartPulse, Leaf, Zap } from "lucide-react";
import Reveal from "./Reveal";

const values = [
  { title: "Vitamin ve mineral", text: "Meyvenin doğal iyiliği", color: "#F4B63E", icon: Apple },
  { title: "Sağlığı önemser", text: "Aktif yaşama eşlik eder", color: "#BEE45C", icon: HeartPulse },
  { title: "Gün boyu enerji", text: "Hafif ve pratik atıştırmalık", color: "#F2A8B4", icon: Zap },
  { title: "%100 meyve", text: "Katkısız, gerçek ve doğal", color: "#67A948", icon: Leaf },
];

export default function BrandStory() {
  return (
    <section id="hikaye" className="bg-white px-6 py-20 text-ink sm:py-28" aria-labelledby="hikaye-baslik">
      <div className="mx-auto max-w-5xl">
        <Reveal><p className="text-xs font-bold uppercase tracking-[0.22em] text-forest">Hakkımızda</p></Reveal>
        <div className="mt-5 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <h2 id="hikaye-baslik" className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Meyvenin iyiliği,<br />hayatın enerjisi.</h2>
            <p className="mt-7 max-w-md font-body text-lg font-semibold leading-relaxed text-ink/65"><strong className="text-ink">DOKURU</strong>, taze meyveleri dondurarak kurutur; lezzetini, rengini ve çıtırtısını korur. İlave şeker ve koruyucu eklemeden, her an yanında taşıyabileceğin modern bir atıştırmalığa dönüştürür.</p>
            <p className="mt-4 max-w-md font-body font-semibold leading-relaxed text-ink/50">Her paket gerçek meyve, özenli üretim ve küçük bir mutluluk içerir.</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {values.map((item, index) => {
              const Icon = item.icon;
              return <Reveal key={item.title} delay={index * 0.06}><article className="flex min-h-44 flex-col justify-between rounded-[26px] p-5 sm:p-6" style={{ backgroundColor: item.color, color: index === 3 ? "white" : "#302824" }}><Icon size={25} strokeWidth={1.8} /><div><h3 className="font-display text-lg font-semibold leading-tight sm:text-xl">{item.title}</h3><p className="mt-1 font-body text-xs font-bold opacity-70 sm:text-sm">{item.text}</p></div></article></Reveal>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
