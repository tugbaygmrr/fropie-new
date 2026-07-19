"use client";

import { useEffect, useRef } from "react";

const A = "/images/fropie/";

// Kaydırmanın bu kadarında sahne kurulur (sayfa px). Kısa tutuluyor:
// hero yukarı kaydıkça öğeler ekrandan çıkıyor, uzun aralıkta animasyon
// kullanıcı göremeden bitiyor.
const SCROLL_SPAN = 260;
// El önce gelir, paket araya girerek onu takip eder — sıralı ama kesintisiz.
const HAND_END = 0.55;
const PACK_START = 0.42;

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function HeroPour() {
  const handRef = useRef<HTMLDivElement>(null);
  const packRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hand = handRef.current;
    const pack = packRef.current;
    if (!hand || !pack) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Hareket azaltılmışsa kompozisyonu doğrudan bitmiş halde göster.
      for (const el of [hand, pack]) {
        el.style.transform = "none";
        el.style.opacity = "1";
      }
      return;
    }

    let frame = 0;
    const render = () => {
      frame = 0;
      const p = clamp01(window.scrollY / SCROLL_SPAN);

      // El, çerezleriyle birlikte yukarıdan ve derinden gelir: yüzü yatık
      // (rotateX) ve uzakta (negatif Z) başlayıp yerine oturur.
      const h = easeOut(clamp01(p / HAND_END));
      hand.style.transform =
        `translate3d(${lerp(90, 0, h)}px, ${lerp(-460, 0, h)}px, ${lerp(-320, 0, h)}px)` +
        ` rotateX(${lerp(-52, 0, h)}deg) rotateY(${lerp(14, 0, h)}deg) rotateZ(${lerp(-14, 0, h)}deg)`;
      hand.style.opacity = String(clamp01(h * 1.5));
      hand.classList.toggle("settled", h > 0.99);

      // Paket aşağıdan yükselerek gelir, hafif yana dönük başlar.
      const g = easeOut(clamp01((p - PACK_START) / (1 - PACK_START)));
      pack.style.transform =
        `translate3d(${lerp(-46, 0, g)}px, ${lerp(320, 0, g)}px, ${lerp(-280, 0, g)}px)` +
        ` rotateX(${lerp(26, 0, g)}deg) rotateY(${lerp(-16, 0, g)}deg) scale(${lerp(0.86, 1, g)})`;
      pack.style.opacity = String(clamp01(g * 1.5));
      pack.classList.toggle("settled", g > 0.99);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="f-hero-stage">
      <div className="f-layer f-hero-hand" ref={handRef}>
        <img src={`${A}hero-hand@2x.webp`} alt="" />
      </div>
      <div className="f-layer f-hero-package" ref={packRef}>
        <img src={`${A}hero-package@2x.webp`} alt="Fropie probiyotik granola paketi" />
      </div>
    </div>
  );
}
