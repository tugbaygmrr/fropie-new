"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Card = {
  label: string;
  tone: string;
  href: string;
  external?: boolean;
  r: string; // yere oturduğu açı
  dx: string; // dökülme noktasından yatay sapma
  ry: string; // düşerken savrulma
  rz0: string; // düşerken takla
  d: string; // gecikme — kasıtlı düzensiz, sırayla değil "dökülmüş" hissi versin
};

// Yalnızca sayfa linkleri. Değerler sabit: render sırasında rastgelelik
// üretmek sunucu/istemci çıktısını ayırır ve hydration'ı bozar.
const CARDS: Card[] = [
  { label: "HAKKIMIZDA", href: "#about", tone: "lime", r: "-5deg", dx: "120px", ry: "-40deg", rz0: "-62deg", d: "0ms" },
  { label: "ÜRÜNLER", href: "#products", tone: "yellow", r: "3.5deg", dx: "64px", ry: "34deg", rz0: "48deg", d: "95ms" },
  { label: "FROPIE'Lİ YAŞAM", href: "#life", tone: "pink", r: "-3deg", dx: "-44px", ry: "-26deg", rz0: "-34deg", d: "55ms" },
  { label: "BLOG", href: "#blog", tone: "purple", r: "6deg", dx: "96px", ry: "50deg", rz0: "72deg", d: "205ms" },
  { label: "INSTAGRAM", href: "https://instagram.com/fropietr", tone: "mint", r: "-6deg", dx: "-72px", ry: "-46deg", rz0: "-54deg", d: "150ms", external: true },
  { label: "İLETİŞİM", href: "mailto:merhaba@fropie.com", tone: "lime", r: "4deg", dx: "28px", ry: "30deg", rz0: "42deg", d: "265ms" },
];

const CANVAS_WIDTH = 1440; // tuval ölçeği: sürükleme farkını bu orana bölmeliyiz
const DRAG_THRESHOLD = 4; // px — bunun altındaki hareket tıklama sayılır

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

export default function FooterStickers() {
  const navRef = useRef<HTMLElement>(null);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pos = useRef(CARDS.map(() => ({ x: 0, y: 0, rot: 0 })));
  const topZ = useRef(1);
  const [dropped, setDropped] = useState(false);
  const [moved, setMoved] = useState(false);

  // Sürükleme oturumu ve tıklama bastırma bayrağı
  const drag = useRef<{
    i: number; startX: number; startY: number; ox: number; oy: number; scale: number; moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);

  const apply = useCallback((i: number, animate: boolean) => {
    const el = chipRefs.current[i];
    if (!el) return;
    const p = pos.current[i];
    el.style.transition = animate ? "transform .6s cubic-bezier(.2,.8,.3,1.2)" : "none";
    el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`;
  }, []);

  // Kart, sticker alanının dışına taşmasın; dikeyde biraz serbestlik var.
  const boundsOf = useCallback((i: number) => {
    const el = chipRefs.current[i];
    const nav = navRef.current;
    if (!el || !nav) return { minX: -200, maxX: 200, minY: -120, maxY: 120 };
    const { offsetLeft: left, offsetTop: top, offsetWidth: w, offsetHeight: h } = el;
    // Aşağıda dar tutuluyor: kartlar DAĞIT/TOPLA düğmelerinin üstüne düşmesin.
    return {
      minX: -left,
      maxX: nav.offsetWidth - w - left,
      minY: -(top + 130),
      maxY: nav.offsetHeight - h - top + 30,
    };
  }, []);

  // Footer görüş alanına girer girmez kartlar dökülmeye başlar.
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDropped(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Sürükleme window üzerinden dinlenir; setPointerCapture kullanılmıyor.
  // Capture, pointerup'ı chip'e yönlendirdiği için click olayı <a>'ya hiç
  // ulaşmıyor ve footer linkleri ölüyordu.
  const onWindowMove = useCallback(
    (e: PointerEvent) => {
      const d = drag.current;
      if (!d) return;
      const dx = (e.clientX - d.startX) / d.scale;
      const dy = (e.clientY - d.startY) / d.scale;
      if (!d.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        d.moved = true;
        chipRefs.current[d.i]?.classList.add("is-dragging");
      }
      if (!d.moved) return;
      const b = boundsOf(d.i);
      pos.current[d.i] = {
        x: clamp(d.ox + dx, b.minX, b.maxX),
        y: clamp(d.oy + dy, b.minY, b.maxY),
        rot: pos.current[d.i].rot,
      };
      apply(d.i, false);
    },
    [apply, boundsOf]
  );

  const onWindowUp = useCallback(() => {
    const d = drag.current;
    window.removeEventListener("pointermove", onWindowMove);
    window.removeEventListener("pointerup", onWindowUp);
    window.removeEventListener("pointercancel", onWindowUp);
    if (!d) return;
    chipRefs.current[d.i]?.classList.remove("is-dragging");
    suppressClick.current = d.moved; // sürüklendiyse link tetiklenmesin
    if (d.moved) setMoved(true);
    drag.current = null;
  }, [onWindowMove]);

  const onPointerDown = (e: React.PointerEvent<HTMLSpanElement>, i: number) => {
    const el = chipRefs.current[i];
    if (!el) return;
    // Bayrağı burada sıfırla: sürükleme sonrası tarayıcı her zaman click
    // üretmiyor, bayrak takılı kalırsa sonraki gerçek tıklamayı yutuyor.
    suppressClick.current = false;
    el.style.zIndex = String(++topZ.current); // en son tutulan kart üstte kalsın
    drag.current = {
      i,
      startX: e.clientX,
      startY: e.clientY,
      ox: pos.current[i].x,
      oy: pos.current[i].y,
      scale: document.documentElement.clientWidth / CANVAS_WIDTH,
      moved: false,
    };
    window.addEventListener("pointermove", onWindowMove);
    window.addEventListener("pointerup", onWindowUp);
    window.addEventListener("pointercancel", onWindowUp);
  };

  useEffect(() => onWindowUp, [onWindowUp]); // unmount olursa dinleyiciler kalmasın

  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const scatter = () => {
    CARDS.forEach((_, i) => {
      const b = boundsOf(i);
      pos.current[i] = { x: rand(b.minX, b.maxX), y: rand(b.minY, b.maxY), rot: rand(-28, 28) };
      apply(i, true);
    });
    setMoved(true);
  };

  const collect = () => {
    CARDS.forEach((_, i) => {
      pos.current[i] = { x: 0, y: 0, rot: 0 };
      apply(i, true);
    });
    setMoved(false);
  };

  return (
    <div className="f-foot-play">
      <nav ref={navRef} className={`f-foot-stickers${dropped ? " in" : ""}`} aria-label="Alt menü">
        {CARDS.map((card, i) => (
          <span
            key={card.label}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            className="f-foot-chip"
            style={
              {
                "--r": card.r,
                "--dx": card.dx,
                "--ry": card.ry,
                "--rz0": card.rz0,
                "--d": card.d,
              } as React.CSSProperties
            }
            onPointerDown={(e) => onPointerDown(e, i)}
            onClickCapture={onClickCapture}
          >
            <span className="f-foot-drop">
              <a
                className={`f-foot-link ${card.tone}`}
                href={card.href}
                draggable={false}
                {...(card.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {card.label}
              </a>
            </span>
          </span>
        ))}
      </nav>

      <div className="f-foot-controls">
        <button type="button" onClick={scatter}>DAĞIT ✦</button>
        <button type="button" onClick={collect} disabled={!moved}>TOPLA ↺</button>
        <span className="f-foot-hint">Kartları tutup sürükleyebilirsin.</span>
      </div>
    </div>
  );
}
