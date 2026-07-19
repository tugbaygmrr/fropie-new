"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Plus, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Reveal from "./Reveal";
import Doodle from "./Doodle";

interface BoxSize {
  id: string;
  label: string;
  capacity: number;
  base: number;
}

const boxSizes: BoxSize[] = [
  { id: "s", label: "Minik Kutu", capacity: 3, base: 149 },
  { id: "m", label: "Orta Kutu", capacity: 5, base: 229 },
  { id: "l", label: "Dev Kutu", capacity: 8, base: 339 },
];

const stickerChoices = ["Crunch Mode", "Fruit Addict", "Tropik Kafa", "Snack First"];

interface FruitChoice {
  id: string;
  name: string;
  piece: string;
  bg: string;
  price: number;
}

// Kendi kutunu yap için 8 meyve çeşidi (Dev Kutu tümünü alabilir).
const fruitChoices: FruitChoice[] = [
  { id: "cilek", name: "Çilek", piece: "/images/fruits/strawberry-piece.svg", bg: "#E7A9B6", price: 129 },
  { id: "incir", name: "İncir", piece: "/images/fruits/fig-piece.svg", bg: "#B9A2C8", price: 159 },
  { id: "mango", name: "Mango", piece: "/images/fruits/mango-piece.svg", bg: "#E7B68F", price: 149 },
  { id: "muz", name: "Muz", piece: "/images/fruits/banana-piece.svg", bg: "#E9D58D", price: 119 },
  { id: "bogurtlen", name: "Böğürtlen", piece: "/images/fruits/blackberry-piece.svg", bg: "#AE99BF", price: 154 },
  { id: "elma", name: "Elma", piece: "/images/fruits/apple-piece.svg", bg: "#DE958C", price: 119 },
  { id: "yabanmersini", name: "Yaban Mersini", piece: "/images/fruits/blueberry-piece.svg", bg: "#91ABC9", price: 179 },
  { id: "ejder", name: "Ejder Meyvesi", piece: "/images/fruits/dragonfruit-piece.svg", bg: "#DFA4B5", price: 169 },
];

function Step({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-ink bg-sunny font-display font-bold text-ink">
        {n}
      </span>
      <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
    </div>
  );
}

export default function BuildYourBox() {
  const reduce = useReducedMotion();
  const { add } = useCart();
  const [sizeId, setSizeId] = useState("m");
  const [picked, setPicked] = useState<string[]>(["cilek", "mango"]);
  const [sticker, setSticker] = useState(stickerChoices[0]);
  const [added, setAdded] = useState(false);

  const size = boxSizes.find((b) => b.id === sizeId)!;

  const toggleFruit = (id: string) => {
    setPicked((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= size.capacity) return prev; // kapasite dolu
      return [...prev, id];
    });
  };

  // Kutu küçültülürse fazla seçimleri buda
  const visiblePicked = picked.slice(0, size.capacity);

  const total = useMemo(
    () =>
      visiblePicked.reduce((sum, id) => {
        const p = fruitChoices.find((f) => f.id === id);
        return sum + (p ? Math.round(p.price * 0.65) : 0);
      }, size.base),
    [visiblePicked, size.base],
  );

  const handleAdd = () => {
    const fruitNames = visiblePicked
      .map((id) => fruitChoices.find((fruit) => fruit.id === id)?.name)
      .filter(Boolean)
      .join(", ");
    add({
      id: `kutu-${size.id}-${[...visiblePicked].sort().join("-")}-${sticker}`,
      name: size.label,
      price: total,
      description: `${fruitNames} · ${sticker}`,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const remaining = size.capacity - visiblePicked.length;

  return (
    <section
      id="kutu-yap"
      className="grain relative overflow-hidden px-4 py-20 sm:px-6"
      aria-labelledby="kutu-baslik"
      style={{
        backgroundColor: "#FFF9F1",
        backgroundImage:
          "linear-gradient(to right, rgba(27,21,18,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,21,18,0.08) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 max-w-xl">
          <span className="chip mb-4 bg-white">
            <Doodle type="burst" color="#FF4D3D" className="h-4 w-4" /> Sana özel
          </span>
          <h2 id="kutu-baslik" className="section-title text-ink">
            KENDİ ÇITIR
            <br />
            KUTUNU YAP.
          </h2>
          <p className="mt-3 font-body text-lg font-semibold text-ink/75">
            Boyutunu seç, meyvelerini kap, stickerını ekle. Kutu senin, çıtırtı bizden.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Adımlar */}
          <div className="space-y-6">
            {/* 1: Boyut */}
            <div className="card-chunk p-6 shadow-pop">
              <Step n={1} title="Kutu boyutunu seç" />
              <div className="grid gap-3 sm:grid-cols-3">
                {boxSizes.map((b) => {
                  const active = b.id === sizeId;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSizeId(b.id)}
                      aria-pressed={active}
                      className={`rounded-2xl border-[3px] border-ink p-4 text-left font-display transition-all ${
                        active ? "bg-ink text-cream shadow-pop" : "bg-white text-ink hover:-translate-y-0.5 hover:shadow-sticker"
                      }`}
                    >
                      <span className="block text-lg font-bold">{b.label}</span>
                      <span className="text-sm opacity-80">{b.capacity} çeşit</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2: Meyveler */}
            <div className="card-chunk p-6 shadow-pop">
              <div className="flex items-center justify-between">
                <Step n={2} title="Meyveleri seç" />
                <span className="chip bg-sunny text-xs">
                  {remaining > 0 ? `${remaining} slot boş` : "Kutu dolu!"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {fruitChoices.map((f) => {
                  const active = visiblePicked.includes(f.id);
                  const full = remaining <= 0 && !active;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggleFruit(f.id)}
                      aria-pressed={active}
                      disabled={full}
                      className={`flex items-center gap-2 rounded-2xl border-[3px] border-ink p-2.5 text-left font-display font-semibold transition-all ${
                        active ? "text-cream shadow-pop" : "bg-white text-ink hover:-translate-y-0.5"
                      } ${full ? "cursor-not-allowed opacity-40" : ""}`}
                      style={active ? { backgroundColor: f.bg } : undefined}
                    >
                      <Image src={f.piece} alt="" aria-hidden="true" width={40} height={44} unoptimized className="h-9 w-9" />
                      <span className="flex-1 text-sm">{f.name}</span>
                      {active ? <Check size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3: Sticker */}
            <div className="card-chunk p-6 shadow-pop">
              <Step n={3} title="Stickerını seç" />
              <div className="flex flex-wrap gap-3">
                {stickerChoices.map((s) => {
                  const active = s === sticker;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSticker(s)}
                      aria-pressed={active}
                      className={`rounded-full border-[3px] border-ink px-4 py-2 font-display font-semibold transition-all ${
                        active ? "bg-bubble text-cream shadow-pop" : "bg-white text-ink hover:-translate-y-0.5"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Önizleme */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-chunk overflow-hidden bg-cream p-6 shadow-chonk">
              <p className="font-display text-lg font-bold text-ink">Kutu önizleme</p>
              <p className="font-body text-sm font-semibold text-ink/60">{size.label} · canlı</p>

              {/* Kutu görseli */}
              <div className="relative mt-4 flex min-h-52 items-center justify-center rounded-3xl border-[3px] border-dashed border-ink/40 bg-white p-4">
                {visiblePicked.length === 0 ? (
                  <p className="font-hand text-2xl text-ink/50">Meyve seç, kutu dolsun…</p>
                ) : (
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    <AnimatePresence mode="popLayout">
                      {visiblePicked.map((id) => {
                        const f = fruitChoices.find((p) => p.id === id)!;
                        return (
                          <motion.div
                            key={id}
                            layout
                            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                          >
                            <Image src={f.piece} alt={f.name} width={70} height={76} unoptimized className="h-16 w-16" />
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
                <span
                  className="absolute -bottom-3 right-4 rotate-[-6deg] rounded-xl border-[3px] border-ink bg-sunny px-3 py-1 font-display text-sm font-bold text-ink shadow-sticker"
                >
                  {sticker}
                </span>
              </div>

              <dl className="mt-6 space-y-1 font-body font-semibold text-ink">
                <div className="flex justify-between">
                  <dt>Kutu</dt>
                  <dd>{size.label}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Meyveler</dt>
                  <dd>
                    {visiblePicked.length}/{size.capacity}
                  </dd>
                </div>
                <div className="mt-2 flex justify-between border-t-2 border-ink/15 pt-2 font-display text-xl font-bold">
                  <dt>Toplam</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={handleAdd}
                disabled={visiblePicked.length === 0}
                className="btn-ink mt-5 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
              >
                {added ? (
                  <>
                    <Check size={20} strokeWidth={3} /> Kutu sepette!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} strokeWidth={2.5} /> Kutuyu Sepete At
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
