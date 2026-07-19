"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface CartLine {
  id: string;
  qty: number;
  name?: string;
  price?: number;
  description?: string;
}

export interface CartItemInput {
  id: string;
  name?: string;
  price?: number;
  description?: string;
}

interface CartValue {
  lines: CartLine[];
  count: number;
  add: (item: string | CartItemInput) => void;
  remove: (id: string) => void;
  clear: () => void;
  /** Sepete son eklenen ürün id'si — mikro animasyon tetiklemek için */
  lastAdded: string | null;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("dokuru-cart");
      if (saved) setLines(JSON.parse(saved));
    } catch {
      // Bozuk veya engellenmiş depolama sepet deneyimini durdurmasın.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("dokuru-cart", JSON.stringify(lines));
  }, [hydrated, lines]);

  const add = useCallback((item: string | CartItemInput) => {
    const next = typeof item === "string" ? { id: item } : item;
    setLines((prev) => {
      const existing = prev.find((l) => l.id === next.id);
      if (existing) {
        return prev.map((l) => (l.id === next.id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { ...next, qty: 1 }];
    });
    setLastAdded(next.id);
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);

  const value = useMemo(
    () => ({ lines, count, add, remove, clear, lastAdded }),
    [lines, count, add, remove, clear, lastAdded],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart yalnızca CartProvider içinde kullanılabilir.");
  return ctx;
}
