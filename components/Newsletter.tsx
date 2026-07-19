"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("dokuru-newsletter");
    if (saved) { setEmail(saved); setDone(true); }
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Geçerli bir e-posta adresi yazmalısın."); return; }
    window.localStorage.setItem("dokuru-newsletter", email);
    setError(""); setDone(true);
  };

  return (
    <section className="bg-white px-4 pb-16 pt-8 sm:px-6 sm:pb-24" aria-labelledby="bulten-baslik">
      <div className="relative mx-auto min-h-[480px] max-w-[1380px] overflow-hidden rounded-[32px] bg-[#EFA9B5]">
        <Image src="/images/products/strawberry-photo.jpg" alt="DOKURU çilek ürünü" fill className="object-cover object-center opacity-75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#D95E78]/90 via-[#E98FA2]/60 to-[#F6C2CB]/35" />
        <div className="relative z-10 grid min-h-[480px] items-center gap-10 p-7 sm:p-12 lg:grid-cols-2 lg:p-20">
          <div className="text-white">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">DOKURU kulübü</p>
            <h2 id="bulten-baslik" className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Çıtır haberler<br />kutuna gelsin.</h2>
            <p className="mt-5 max-w-sm font-body text-lg font-semibold leading-relaxed text-white/80">Yeni tatlar, sınırlı kutular ve yalnızca kulübe özel fırsatlar.</p>
          </div>
          <div className="rounded-[26px] bg-white/90 p-5 shadow-[0_20px_50px_rgba(122,38,55,0.16)] backdrop-blur-md sm:p-7">
            {done ? <div className="flex min-h-40 flex-col items-center justify-center text-center"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime"><Check /></span><p className="mt-4 font-display text-xl font-semibold">Kulüptesin!</p><p className="mt-1 font-body text-sm font-bold text-ink/50">İlk çıtır haber yakında kutunda.</p></div> : <form onSubmit={onSubmit}><label htmlFor="newsletter-email" className="font-body text-sm font-bold text-ink/60">E-posta adresin</label><input id="newsletter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sen@ornek.com" className="mt-2 w-full rounded-2xl border border-ink/10 bg-white px-5 py-4 font-body font-semibold outline-none focus:border-forest" /><button type="submit" className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-forest px-5 py-4 font-display font-semibold text-white">Kulübe katıl <ArrowRight size={18} /></button>{error && <p className="mt-2 text-sm font-bold text-punch" role="alert">{error}</p>}</form>}
          </div>
        </div>
      </div>
    </section>
  );
}
