"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { galleryImages } from "@/data/site";
import Reveal from "./Reveal";
import Doodle from "./Doodle";

export default function SocialGallery() {
  return (
    <section
      id="tarifler"
      className="grain relative overflow-hidden bg-cream px-4 py-20 sm:px-6"
      aria-labelledby="ugc-baslik"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 text-center">
          <span className="chip mb-4 bg-white">
            <Instagram size={16} strokeWidth={2.5} /> Topluluk
          </span>
          <h2 id="ugc-baslik" className="section-title text-ink">
            BİZİ ETİKETLE
            <br />
            <span className="text-bubble">@DOKURUCLUB</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md font-body text-lg font-semibold text-ink/75">
            En çıtır anları paylaş, bir sonraki paketimizde sen çık.
          </p>
        </Reveal>

        {/* Mobilde yatay kaydırma, masaüstünde grid */}
        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {galleryImages.map((img, i) => (
            <Reveal
              as="li"
              key={img.src}
              delay={i * 0.06}
              className="group relative min-w-[70%] snap-center overflow-hidden rounded-3xl border-[3px] border-ink shadow-pop sm:min-w-0"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-1.5 font-display font-bold text-cream">
                  <Instagram size={16} /> {img.handle}
                </span>
              </div>
              <Doodle
                type="sparkle"
                color="#FFF4DA"
                className="absolute right-3 top-3 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
