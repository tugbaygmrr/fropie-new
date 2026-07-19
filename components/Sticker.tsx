"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StickerProps {
  children: ReactNode;
  color?: string;
  rotate?: number;
  className?: string;
  /** Hover'da yukarı çıkıp sallansın mı */
  interactive?: boolean;
  onDark?: boolean;
  as?: "div" | "span";
}

export default function Sticker({
  children,
  color = "#FFD23F",
  rotate = -4,
  className = "",
  interactive = true,
  onDark = false,
}: StickerProps) {
  return (
    <motion.span
      initial={false}
      style={{ backgroundColor: color, rotate }}
      whileHover={interactive ? { rotate: 0, y: -6, scale: 1.05 } : undefined}
      whileTap={interactive ? { scale: 0.96 } : undefined}
      transition={{ type: "spring", stiffness: 320, damping: 14 }}
      className={`inline-flex select-none items-center gap-1.5 rounded-full border-[3px] border-ink px-4 py-1.5 font-display text-sm font-semibold shadow-sticker ${
        onDark ? "text-ink" : "text-ink"
      } ${className}`}
    >
      {children}
    </motion.span>
  );
}
