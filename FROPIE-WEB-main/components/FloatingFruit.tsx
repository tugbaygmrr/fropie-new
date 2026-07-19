"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface FloatingFruitProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Mouse parallax'ının şiddeti (px). Negatif değer ters yönde hareket ettirir. */
  depth?: number;
  /** Idle süzülme aralığı (px) */
  floatRange?: number;
  /** Idle animasyon süresi (s) */
  duration?: number;
  rotate?: number;
  priority?: boolean;
  /** Ebeveynden gelen normalize edilmiş pointer konumu (-1..1) */
  pointerX?: MotionValue<number>;
  pointerY?: MotionValue<number>;
  /** Dekoratif mi (ekran okuyucudan gizle) */
  decorative?: boolean;
}

export default function FloatingFruit({
  src,
  alt,
  width,
  height,
  className = "",
  depth = 18,
  floatRange = 12,
  duration = 5,
  rotate = 0,
  priority = false,
  pointerX,
  pointerY,
  decorative = true,
}: FloatingFruitProps) {
  const reduce = useReducedMotion();

  // Pointer verilmezse sabit 0'da kalan yedek MotionValue kullan (hook sırası sabit kalır).
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  const px = useTransform(pointerX ?? fallbackX, (v) => (reduce ? 0 : v * depth));
  const py = useTransform(pointerY ?? fallbackY, (v) => (reduce ? 0 : v * depth));

  return (
    <motion.div className={`pointer-events-none absolute ${className}`} style={{ x: px, y: py }}>
      <motion.div
        style={{ rotate }}
        animate={reduce ? undefined : { y: [0, -floatRange, 0] }}
        transition={reduce ? undefined : { duration, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={decorative ? "" : alt}
          aria-hidden={decorative || undefined}
          width={width}
          height={height}
          priority={priority}
          className="h-auto w-full drop-shadow-[3px_4px_0_rgba(27,21,18,0.18)]"
        />
      </motion.div>
    </motion.div>
  );
}
