"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, MessageCircle, Star } from "lucide-react";
import { reviews } from "@/data/site";
import Reveal from "./Reveal";
import Doodle from "./Doodle";

export default function Reviews() {
  const reduce = useReducedMotion();

  return (
    <section
      className="grain relative overflow-hidden bg-cream px-4 py-20 sm:px-6"
      aria-labelledby="yorum-baslik"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 text-center">
          <span className="chip mb-4 bg-bubble text-cream">
            <Doodle type="heart" color="#FFF4DA" className="h-4 w-4" /> Sosyal kanıt
          </span>
          <h2 id="yorum-baslik" className="section-title text-ink">
            ÇITIRTIYI
            <br />
            <span className="text-tangerine">DUYAN GELİYOR.</span>
          </h2>
        </Reveal>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, i) => (
            <motion.li
              key={review.author}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, rotate: review.rotate }}
              whileInView={{ opacity: 1, y: 0, rotate: review.rotate }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 16 }}
              whileHover={reduce ? undefined : { rotate: 0, y: -8, scale: 1.03 }}
              className="rounded-2xl border-[3px] border-ink bg-white p-4 shadow-pop"
            >
              {/* Polaroid üst şerit */}
              <div
                className="flex items-center gap-2 rounded-xl border-[3px] border-ink px-3 py-2"
                style={{ backgroundColor: review.color }}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-white font-display font-bold text-ink">
                  {review.author.charAt(0)}
                </span>
                <div className="leading-tight">
                  <p className="font-display text-sm font-bold text-ink">{review.author}</p>
                  <p className="font-body text-xs font-semibold text-ink/70">{review.handle}</p>
                </div>
              </div>

              <div className="mt-3 flex gap-0.5" aria-label="5 üzerinden 5 yıldız">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={15} className="fill-sunny text-ink" strokeWidth={2} />
                ))}
              </div>

              <p className="mt-2 font-body text-lg font-bold leading-snug text-ink">
                “{review.quote}”
              </p>

              <div className="mt-3 flex items-center gap-4 border-t-2 border-ink/10 pt-3 text-ink/60">
                <span className="flex items-center gap-1 text-sm font-semibold">
                  <Heart size={15} className="fill-punch text-punch" /> 128
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold">
                  <MessageCircle size={15} /> 12
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
