import type { CSSProperties } from "react";

type DoodleType = "star" | "sparkle" | "arrow" | "sun" | "heart" | "squiggle" | "swirl" | "burst";

interface DoodleProps {
  type: DoodleType;
  className?: string;
  color?: string;
  style?: CSSProperties;
}

const paths: Record<DoodleType, React.ReactNode> = {
  star: (
    <path
      d="M24 3 L30 18 L46 20 L34 31 L38 46 L24 38 L10 46 L14 31 L2 20 L18 18 Z"
      strokeLinejoin="round"
    />
  ),
  sparkle: (
    <path
      d="M24 2 C26 16 32 22 46 24 C32 26 26 32 24 46 C22 32 16 26 2 24 C16 22 22 16 24 2 Z"
      strokeLinejoin="round"
    />
  ),
  arrow: (
    <>
      <path d="M4 30 C16 10 30 8 44 18" strokeLinecap="round" />
      <path d="M36 12 L45 17 L39 26" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  sun: (
    <>
      <circle cx="24" cy="24" r="10" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = (24 + Math.cos(a) * 15).toFixed(3);
        const y1 = (24 + Math.sin(a) * 15).toFixed(3);
        const x2 = (24 + Math.cos(a) * 22).toFixed(3);
        const y2 = (24 + Math.sin(a) * 22).toFixed(3);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeLinecap="round" />;
      })}
    </>
  ),
  heart: (
    <path
      d="M24 42 C6 30 4 16 14 12 C20 9.5 24 14 24 17 C24 14 28 9.5 34 12 C44 16 42 30 24 42 Z"
      strokeLinejoin="round"
    />
  ),
  squiggle: <path d="M3 24 C10 12 14 36 22 24 C30 12 34 36 45 24" strokeLinecap="round" />,
  swirl: (
    <path
      d="M24 24 C24 18 30 18 30 24 C30 32 20 32 20 22 C20 10 34 10 34 24"
      strokeLinecap="round"
    />
  ),
  burst: (
    <>
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i * Math.PI) / 3;
        const x2 = (24 + Math.cos(a) * 20).toFixed(3);
        const y2 = (24 + Math.sin(a) * 20).toFixed(3);
        return <line key={i} x1={24} y1={24} x2={x2} y2={y2} strokeLinecap="round" />;
      })}
    </>
  ),
};

export default function Doodle({ type, className, color = "#1B1512", style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      style={style}
      fill={type === "star" || type === "sparkle" || type === "heart" ? color : "none"}
      stroke={color}
      strokeWidth={type === "star" || type === "sparkle" || type === "heart" ? 2.5 : 3.5}
      aria-hidden="true"
      focusable="false"
    >
      {paths[type]}
    </svg>
  );
}
