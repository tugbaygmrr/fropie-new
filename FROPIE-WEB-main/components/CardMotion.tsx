"use client";

import { useEffect } from "react";

// Sırayla açılacak kart grupları
const GROUPS = [".f-badges", ".f-values", ".f-product-grid", ".f-life > div"];

export default function CardMotion() {
  useEffect(() => {
    const canvas = document.querySelector(".fropie-canvas");
    if (!canvas) return;
    // Gizleme kuralları bu sınıfa bağlı: JS çalışmazsa kartlar hiç kaybolmaz.
    canvas.classList.add("js-motion");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observers: IntersectionObserver[] = [];
    const cleanups: (() => void)[] = [];

    for (const selector of GROUPS) {
      const group = document.querySelector(selector);
      if (!group) continue;

      if (reduced) {
        group.classList.add("in");
        continue;
      }

      // Animasyon bitince .done → animation kapanır, hover devralır.
      // (fill-mode both transform'u kilitliyor, yoksa hover hiç çalışmıyor.)
      const onEnd = (e: Event) => {
        const t = e.target;
        if (t instanceof HTMLElement && t.parentElement === group) t.classList.add("done");
      };
      group.addEventListener("animationend", onEnd);
      cleanups.push(() => group.removeEventListener("animationend", onEnd));

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            group.classList.add("in");
            io.disconnect();
          }
        },
        { threshold: 0.25, rootMargin: "0px 0px -60px 0px" }
      );
      io.observe(group);
      observers.push(io);
    }

    return () => {
      observers.forEach((o) => o.disconnect());
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
