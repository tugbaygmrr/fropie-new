"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Minus, Search, ShoppingBag, Trash2, User, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { useCart } from "@/context/CartContext";
import { formatPrice, products } from "@/data/products";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<"search" | "account" | "cart" | null>(null);
  const [query, setQuery] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const { count, lastAdded, lines, remove, clear } = useCart();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü açıkken arka plan kaydırmasını kilitle
  useEffect(() => {
    document.body.style.overflow = menuOpen || panel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, panel]);

  useEffect(() => {
    setMemberEmail(window.localStorage.getItem("dokuru-member") ?? "");
  }, []);

  const results = products.filter((product) =>
    `${product.name} ${product.tagline}`.toLocaleLowerCase("tr-TR").includes(query.toLocaleLowerCase("tr-TR")),
  );
  const total = lines.reduce((sum, line) => {
    const product = products.find((item) => item.id === line.id);
    return sum + (line.price ?? product?.price ?? 0) * line.qty;
  }, 0);

  const openPanel = (next: "search" | "account" | "cart") => {
    setMenuOpen(false);
    setPanel(next);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/5 bg-white/90 shadow-[0_8px_30px_rgba(75,50,38,0.05)] backdrop-blur-xl"
          : "border-b border-transparent bg-white"
      }`}
    >
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        {/* Logo */}
        <a href="#top" className="flex items-center lg:absolute lg:left-1/2 lg:-translate-x-1/2" aria-label="dokuru market ana sayfa">
          <Image
            src="/images/logo.png"
            alt="dokuru market"
            width={464}
            height={96}
            priority
            className="h-8 w-auto transition-all duration-300 sm:h-9"
          />
        </a>

        {/* Masaüstü menü */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.slice(0, 2).map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-sm font-bold text-ink/65 transition-colors hover:text-forest"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Aksiyonlar */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="mr-2 hidden items-center gap-7 lg:flex">
            <a href="#kutu-yap" className="font-body text-sm font-bold text-ink/65 hover:text-forest">Kutu Yap</a>
            <a href="mailto:merhaba@dokuru.tr" className="font-body text-sm font-bold text-ink/65 hover:text-forest">İletişim</a>
          </div>
          <button
            type="button"
            aria-label="Ara"
            onClick={() => openPanel("search")}
            className="hidden rounded-full border border-ink/10 bg-white p-2.5 text-ink shadow-sticker transition-transform hover:-translate-y-0.5 sm:block"
          >
            <Search size={18} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            aria-label="Hesabım"
            onClick={() => openPanel("account")}
            className="hidden"
          >
            <User size={18} strokeWidth={2.5} />
          </button>

          {/* Sepet + rozet */}
          <button
            type="button"
            aria-label={`Sepet, ${count} ürün`}
            onClick={() => openPanel("cart")}
            className="relative rounded-full bg-[#F0F5E9] p-2.5 text-forest transition-transform hover:-translate-y-0.5"
          >
            <ShoppingBag size={18} strokeWidth={2.5} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={`${count}-${lastAdded}`}
                  initial={reduce ? { opacity: 0 } : { scale: 0 }}
                  animate={reduce ? { opacity: 1 } : { scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-ink bg-bubble px-1 font-display text-xs font-bold text-cream"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full border border-ink/10 bg-white p-2.5 text-ink shadow-sm transition-transform hover:-translate-y-0.5 lg:hidden"
          >
            {menuOpen ? <X size={18} strokeWidth={2.5} /> : <Menu size={18} strokeWidth={2.5} />}
          </button>
        </div>
      </nav>

      {/* Mobil menü paneli */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="border-t border-ink/5 bg-white px-4 pb-6 pt-3 lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-2xl bg-[#F6F2EC] px-5 py-3 font-display text-lg font-semibold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {panel && (
          <>
            <motion.button
              type="button"
              aria-label="Paneli kapat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPanel(null)}
              className="fixed inset-0 z-[70] bg-ink/45 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[80] w-full max-w-md overflow-y-auto border-l-[3px] border-ink bg-cream p-5 shadow-2xl"
              aria-label={panel === "cart" ? "Sepet" : panel === "search" ? "Ürün arama" : "Hesabım"}
            >
              <div className="flex items-center justify-between border-b-2 border-ink/15 pb-4">
                <h2 className="font-display text-2xl font-bold">
                  {panel === "cart" ? "Sepetin" : panel === "search" ? "Meyve ara" : "Hesabım"}
                </h2>
                <button type="button" onClick={() => setPanel(null)} aria-label="Kapat" className="rounded-full border-[3px] border-ink bg-white p-2 shadow-sticker">
                  <X size={20} />
                </button>
              </div>

              {panel === "search" && (
                <div className="pt-5">
                  <label htmlFor="product-search" className="sr-only">Ürün ara</label>
                  <div className="flex items-center gap-2 rounded-full border-[3px] border-ink bg-white px-4 py-3">
                    <Search size={19} />
                    <input id="product-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Çilek, mango, muz…" className="w-full bg-transparent font-body font-semibold outline-none" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {results.map((product) => (
                      <a key={product.id} href="#urunler" onClick={() => setPanel(null)} className="flex items-center justify-between rounded-2xl border-[3px] border-ink bg-white p-4 shadow-sticker">
                        <span><strong className="block font-display text-lg">{product.name}</strong><span className="font-body text-sm text-ink/65">{product.tagline}</span></span>
                        <span className="font-display font-bold">{formatPrice(product.price)}</span>
                      </a>
                    ))}
                    {results.length === 0 && <p className="py-8 text-center font-body font-semibold text-ink/60">Bu isimde bir çıtırtı bulamadık.</p>}
                  </div>
                </div>
              )}

              {panel === "account" && (
                <div className="pt-6">
                  {memberEmail ? (
                    <div className="rounded-3xl border-[3px] border-ink bg-sunny p-6 shadow-pop">
                      <p className="font-display text-xl font-bold">Hoş geldin!</p>
                      <p className="mt-1 font-body font-semibold">{memberEmail}</p>
                      <button type="button" onClick={() => { window.localStorage.removeItem("dokuru-member"); setMemberEmail(""); }} className="btn-ink mt-5">Çıkış yap</button>
                    </div>
                  ) : (
                    <form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const email = String(form.get("email") ?? ""); if (email) { window.localStorage.setItem("dokuru-member", email); setMemberEmail(email); } }} className="space-y-4">
                      <p className="font-body font-semibold text-ink/70">Favorilerini ve siparişlerini bu cihazda takip etmek için giriş yap.</p>
                      <input required name="email" type="email" placeholder="sen@ornek.com" className="w-full rounded-full border-[3px] border-ink bg-white px-5 py-3 font-body font-semibold" />
                      <button className="btn-ink w-full justify-center" type="submit">Devam et</button>
                    </form>
                  )}
                </div>
              )}

              {panel === "cart" && (
                <div className="flex min-h-[calc(100vh-90px)] flex-col pt-5">
                  <div className="flex-1 space-y-3">
                    {lines.map((line) => {
                      const product = products.find((item) => item.id === line.id);
                      return (
                        <div key={line.id} className="rounded-2xl border-[3px] border-ink bg-white p-4 shadow-sticker">
                          <div className="flex justify-between gap-3"><div><strong className="font-display text-lg">{line.name ?? product?.name ?? "Özel kutu"}</strong><p className="font-body text-xs text-ink/60">{line.description ?? product?.tagline}</p></div><strong className="font-display">{formatPrice((line.price ?? product?.price ?? 0) * line.qty)}</strong></div>
                          <div className="mt-3 flex items-center justify-between"><span className="font-body text-sm font-bold">Adet: {line.qty}</span><button type="button" onClick={() => remove(line.id)} aria-label="Bir adet azalt" className="rounded-full border-2 border-ink p-1.5"><Minus size={15} /></button></div>
                        </div>
                      );
                    })}
                    {lines.length === 0 && <p className="py-12 text-center font-hand text-2xl text-ink/55">Sepetin henüz çıtırdamıyor.</p>}
                  </div>
                  {lines.length > 0 && <div className="sticky bottom-0 mt-6 border-t-[3px] border-ink bg-cream pt-5"><div className="flex justify-between font-display text-xl font-bold"><span>Toplam</span><span>{formatPrice(total)}</span></div><button type="button" onClick={() => window.alert("Demo siparişin hazır! Ödeme altyapısı bağlandığında buradan devam edilecek.")} className="btn-ink mt-4 w-full justify-center">Ödemeye geç</button><button type="button" onClick={clear} className="mt-3 flex w-full items-center justify-center gap-2 font-body text-sm font-bold text-ink/60"><Trash2 size={15} /> Sepeti temizle</button></div>}
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
