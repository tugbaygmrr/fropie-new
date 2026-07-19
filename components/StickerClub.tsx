"use client";

import Reveal from "./Reveal";
import Doodle from "./Doodle";

export default function StickerClub() {
  return (
    <section
      id="sticker-kulubu"
      className="grain relative overflow-hidden bg-grape px-4 py-24 text-cream sm:px-6"
      aria-labelledby="sticker-baslik"
    >
      {/* Çıkartma arka planı */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        aria-hidden="true"
        style={{ backgroundImage: "url(/images/stickers/sticker-bg.png)" }}
      />
      {/* Okunabilirlik için koyu katman */}
      <div
        className="pointer-events-none absolute inset-0 bg-ink/45"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl">
        <Reveal className="text-center">
          <span className="chip mb-4 bg-sunny text-ink">
            <Doodle type="star" color="#1B1512" className="h-4 w-4" /> Sticker Kulübü
          </span>
          <h2 id="sticker-baslik" className="section-title drop-shadow-[0_3px_0_rgba(27,21,18,0.6)]">
            PAKETİ AÇ.
            <br />
            <span className="text-sunny">STICKER’I KAP.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-lg font-semibold text-cream">
            Her kutudan farklı bir sticker paketi çıkar. Koleksiyonu topla, arkadaşınla takas et,
            hepsini tamamla.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
