import Image from "next/image";
import { Instagram, Music2 } from "lucide-react";
import { footerLinks } from "@/data/site";
import Doodle from "./Doodle";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-cream text-ink">
      {/* Dönen gülen çilek */}
      <div className="pointer-events-none absolute -right-10 -top-16 hidden select-none md:block">
        <div className="animate-spinslow motion-reduce:animate-none">
          <SmilingBerry />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          {/* Marka bloğu */}
          <div>
            <Image
              src="/images/logo.png"
              alt="dokuru market"
              width={464}
              height={96}
              className="h-12 w-auto sm:h-14"
            />
            <p className="mt-5 max-w-sm font-body text-ink/70">
              Gerçek meyveleri dondurduk, kuruttuk ve aşırı eğlenceli paketlere koyduk. İlave
              sıkıcılık içermez.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/dokuru"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border-[3px] border-ink bg-white p-3 text-ink shadow-sticker transition-transform hover:-translate-y-0.5"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@dokuru"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="rounded-full border-[3px] border-ink bg-white p-3 text-ink shadow-sticker transition-transform hover:-translate-y-0.5"
              >
                <Music2 size={20} />
              </a>
            </div>
          </div>

          {/* Bağlantı sütunları */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerLinks.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="mb-3 flex items-center gap-1.5 font-display text-lg font-semibold text-ink">
                  <Doodle type="star" color="#FF8A3D" className="h-4 w-4" />
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-body text-ink/70 transition-colors hover:text-ink hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t-2 border-ink/15 pt-6 text-sm text-ink/60 sm:flex-row sm:items-center">
          <p>© {year} DOKURU! Tüm çıtırtılar saklıdır.</p>
          <p className="font-hand text-xl text-tangerine">Bir paket aç, günü kurtar. ✦</p>
        </div>
      </div>
    </footer>
  );
}

function SmilingBerry() {
  return (
    <svg viewBox="0 0 240 240" className="h-72 w-72 opacity-90" aria-hidden="true">
      <path
        d="M120 40 C170 40 196 74 188 118 C182 154 150 196 120 196 C90 196 58 154 52 118 C44 74 70 40 120 40 Z"
        fill="#FF4D3D"
        stroke="#1B1512"
        strokeWidth="6"
      />
      <path
        d="M92 40 C104 22 136 22 148 40 C136 50 128 54 120 54 C112 54 104 50 92 40 Z"
        fill="#5FC66B"
        stroke="#1B1512"
        strokeWidth="5"
      />
      <circle cx="100" cy="112" r="9" fill="#1B1512" />
      <circle cx="140" cy="112" r="9" fill="#1B1512" />
      <path d="M96 140 C112 156 128 156 144 140" fill="none" stroke="#1B1512" strokeWidth="6" strokeLinecap="round" />
      <circle cx="82" cy="132" r="7" fill="#FF8AA6" opacity="0.7" />
      <circle cx="158" cy="132" r="7" fill="#FF8AA6" opacity="0.7" />
    </svg>
  );
}
