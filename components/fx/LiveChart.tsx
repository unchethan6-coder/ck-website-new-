"use client";
import { useEffect, useState } from "react";

/** Ticking market price — jitters around a base every ~1.5–2.5s. */
export function useTickingPrice(base: number, decimals: number) {
  const [price, setPrice] = useState(base);
  useEffect(() => {
    const interval = setInterval(() => {
      const jitter = (Math.random() - 0.5) * base * 0.0008;
      setPrice(base + jitter);
    }, 1500 + Math.random() * 1000);
    return () => clearInterval(interval);
  }, [base]);
  return decimals > 0 ? price.toFixed(decimals) : Math.round(price).toLocaleString();
}

export function TickerPrice({
  base,
  decimals,
  prefix,
}: {
  base: number;
  decimals: number;
  prefix: string;
}) {
  const price = useTickingPrice(base, decimals);
  return <>{prefix}{price}</>;
}

/**
 * Live-progressing line chart — new points are pushed in from the right
 * every ~800ms, the oldest fall off the left. GPU-safe (SVG attributes).
 */
export function LiveChart() {
  const [points, setPoints] = useState(() => {
    const pts: number[] = [];
    for (let i = 0; i <= 30; i++) {
      pts.push(120 - i * 3.2 + Math.sin(i * 0.5) * 12);
    }
    return pts;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => {
        const last = prev[prev.length - 1];
        const next = last + (Math.random() - 0.48) * 8;
        const clamped = Math.max(15, Math.min(135, next));
        return [...prev.slice(1), clamped];
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const w = 400;
  const h = 150;
  const step = w / (points.length - 1);

  const linePoints = points.map((y, i) => `${i * step},${y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h + 10}`} preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="fxChartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="fx-chart-fill" stopOpacity="0.2" />
          <stop offset="100%" className="fx-chart-fill" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[37.5, 75, 112.5].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2={w}
          y2={y}
          className="fx-chart-grid"
          stroke="#1a1a1a"
          strokeWidth="1"
        />
      ))}
      <polygon
        points={`0,${h} ${points.map((y, i) => `${i * step},${y}`).join(" ")} ${w},${h}`}
        fill="url(#fxChartFill)"
      />
      <polyline
        points={linePoints}
        fill="none"
        className="fx-chart-line"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={w}
        cy={points[points.length - 1]}
        r="4"
        className="fx-chart-dot"
        stroke="#030C1B"
        strokeWidth="2"
      >
        <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
