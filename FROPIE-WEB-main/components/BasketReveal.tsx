"use client";

import { useEffect, useRef } from "react";

const A = "/images/fropie/";

// Halka → sepetli kol → öndeki el sırasıyla, örtüşerek girer.
const RING_END = 0.45;
const HAND_START = 0.3;
const CANVAS_WIDTH = 1440;
// Sepet görselinin tuvaldeki üst hizası (katman kutusu 2558'de başlıyor ama
// fotoğrafın dolu kısmı biraz aşağıda) — tetik buna göre.
const ANCHOR_Y = 2700;

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function BasketReveal() {
  const ringRef = useRef<HTMLImageElement>(null);
  const basketRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const basket = basketRef.current;
    // Sepetli kol (.f-middle-layer) bilerek hariç: sabit duruyor.
    if (!ring || !basket) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      for (const el of [ring, basket]) {
        el.style.transform = "none";
        el.style.opacity = "1";
      }
      return;
    }

    let frame = 0;
    const render = () => {
      frame = 0;
      // İlerleme tuvalden ölçülüyor, sepet katmanından DEĞİL: katmanın kendi
      // rect'i uyguladığımız transform'u da içerdiği için animasyon kendi
      // tetiğini öteliyor (geri besleme). Tuvalin rect'i ise sabit.
      const canvas = basket.closest(".fropie-canvas") as HTMLElement | null;
      if (!canvas) return;
      const cr = canvas.getBoundingClientRect();
      const scale = cr.width / CANVAS_WIDTH || 1;
      const anchorTop = cr.top + ANCHOR_Y * scale; // sepetin dönüşümsüz ekran konumu
      const vh = window.innerHeight;
      const p = clamp01((vh * 0.95 - anchorTop) / (vh * 0.75));

      const c = easeOut(clamp01(p / RING_END));
      ring.style.transform = `perspective(1200px) scale(${lerp(0.72, 1, c)}) rotate(${lerp(-14, 0, c)}deg)`;
      ring.style.opacity = String(clamp01(c * 1.5));
      ring.classList.toggle("settled", c > 0.99);

      // Öndeki el: aşağıdan yükselir (sepetli kol sabit, animasyona dahil değil)
      const g = easeOut(clamp01((p - HAND_START) / (1 - HAND_START)));
      basket.style.transform =
        `perspective(1200px) translate3d(0, ${lerp(240, 0, g)}px, ${lerp(-340, 0, g)}px)` +
        ` rotateX(${lerp(24, 0, g)}deg) rotateY(${lerp(-12, 0, g)}deg)`;
      basket.style.opacity = String(clamp01(g * 1.5));
      basket.classList.toggle("settled", g > 0.99);
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
    <>
      <img ref={ringRef} className="f-circle f-basket-circle" src={`${A}basket-circle.svg`} alt="" />
      <img
        ref={basketRef}
        className="f-layer f-bottom-layer"
        src={`${A}bottom-foreground@2x.webp`}
        alt="Fropie tanışma paketi sepeti"
      />
    </>
  );
}
