"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Plus, Check } from "lucide-react";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { add } = useCart();
  const reduce = useReducedMotion();
  const [liked, setLiked] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    add({ id: product.id, name: product.name, price: product.price, description: `${product.grams} g` });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  const heartButton = (
    <button
      type="button"
      onClick={() => setLiked((v) => !v)}
      aria-label={liked ? "Favorilerden çıkar" : "Favorilere ekle"}
      aria-pressed={liked}
      className="rounded-full border border-white/70 bg-white/90 p-2.5 text-ink shadow-[0_6px_20px_rgba(48,40,36,0.12)] backdrop-blur transition-all hover:scale-105 hover:bg-white active:scale-95"
    >
      <Heart size={16} strokeWidth={2.5} className={liked ? "fill-punch text-punch" : ""} />
    </button>
  );

  return (
    <motion.article
      initial={reduce ? undefined : { opacity: 0.96, y: 4 }}
      whileHover={reduce ? undefined : { y: -7 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-ink/10 bg-[#FFFCF8] p-4 shadow-[0_16px_45px_rgba(74,55,45,0.10)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(74,55,45,0.16)]"
    >
      {product.photo ? (
        <div className="relative z-10 mb-5 overflow-hidden rounded-[24px]" style={{ backgroundColor: product.bg }}>
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={900}
            height={900}
            className="aspect-[4/3] w-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.035] sm:aspect-square"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/10 via-transparent to-white/10" />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <span className="rounded-full border border-white/70 bg-white/85 px-3.5 py-1.5 font-display text-xs font-semibold tracking-wide text-ink shadow-sm backdrop-blur">{product.mood}</span>
            {heartButton}
          </div>
        </div>
      ) : (
        <>
          {/* Arka plan dekor parçaları */}
          <Image
            src={product.piece}
            alt=""
            aria-hidden="true"
            width={120}
            height={130}
            className="pointer-events-none absolute -right-6 -top-6 w-24 rotate-12 opacity-30 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-6"
          />

          {/* Üst satır: mod sticker + kalp */}
          <div className="relative z-10 flex items-start justify-between">
            <span className="rounded-full bg-white/85 px-3.5 py-1.5 font-display text-xs font-semibold shadow-sm">{product.mood}</span>
            {heartButton}
          </div>

          {/* Paket görseli (SVG cutout) */}
          <div className="relative z-10 my-4 flex justify-center">
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={360}
              height={460}
              className="h-44 w-auto drop-shadow-[5px_7px_0_rgba(27,21,18,0.16)] transition-transform duration-300 group-hover:scale-110 sm:h-52"
            />
          </div>
        </>
      )}

      {/* Metin */}
      <div className="relative z-10 mt-auto px-1 pb-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 font-body text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-ink/45">Dondurularak kurutulmuş</p>
            <h3 className="font-display text-[1.7rem] font-semibold tracking-[-0.03em] text-ink">{product.name}</h3>
          </div>
          <p className="font-display text-xl font-semibold text-ink">{formatPrice(product.price)}</p>
        </div>
        <p className="mt-2 min-h-[2.5rem] font-body text-sm font-semibold leading-relaxed text-ink/60">
          {product.tagline}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
          <p className="font-body text-xs font-bold uppercase tracking-[0.12em] text-ink/45">{product.grams} g · gerçek meyve</p>
          <span className="rounded-full px-3 py-1 font-body text-xs font-bold text-ink/70" style={{ backgroundColor: product.bg }}>{product.sticker}</span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 font-display text-base font-semibold text-cream shadow-[0_10px_24px_rgba(48,40,36,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#4A3D36] active:translate-y-0"
        >
          {justAdded ? (
            <>
              <Check size={18} strokeWidth={3} className="text-lime" /> Sepete eklendi!
            </>
          ) : (
            <>
              <Plus size={18} strokeWidth={3} /> Sepete At
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
