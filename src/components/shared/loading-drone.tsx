"use client";

import { useEffect, useState } from "react";

interface LoadingDroneProps {
  isLoading: boolean;
  onAnimationComplete?: () => void;
}

export function LoadingDrone({
  isLoading,
  onAnimationComplete,
}: LoadingDroneProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(isLoading);

  useEffect(() => {
    if (!isLoading && shouldRender) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        if (onAnimationComplete) onAnimationComplete();
      }, 450);
      return () => clearTimeout(timer);
    } else if (isLoading) {
      setShouldRender(true);
      setIsExiting(false);
    }
  }, [isLoading, shouldRender, onAnimationComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-dr-field/80 backdrop-blur-md transition-opacity duration-300 ${!isLoading ? "opacity-0" : "opacity-100"}`}
    >
      <style>{`
        @keyframes dr-radar-sweep { to { transform: rotate(360deg); } }
        @keyframes dr-rotor { to { transform: rotate(360deg); } }
        @keyframes dr-ring-pulse { 0%,100% { opacity: 0.25; } 50% { opacity: 0.5; } }
        @keyframes dr-lock { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.82); } }
        @keyframes dr-dots { 0%,20% { opacity: 0; } 50%,100% { opacity: 1; } }
        .dr-sweep { transform-origin: 200px 200px; animation: dr-radar-sweep 1.6s linear infinite; }
        .dr-rotor { animation: dr-rotor 0.32s linear infinite; }
        .dr-rotor-slow { animation: dr-rotor 0.5s linear infinite; }
        .dr-ring-pulse { animation: dr-ring-pulse 2.4s ease-in-out infinite; }
        .dr-lock { animation: dr-lock 1.4s ease-in-out infinite; transform-origin: 200px 200px; }
        .dr-load-exit { animation: dr-lock 1.4s ease-in-out infinite; }
        .dr-dot { animation: dr-dots 1.4s steps(1) infinite; }
        .dr-dot-2 { animation-delay: 0.25s; }
        .dr-dot-3 { animation-delay: 0.5s; }
        @media (prefers-reduced-motion: reduce) {
          .dr-sweep, .dr-rotor, .dr-rotor-slow, .dr-ring-pulse, .dr-lock, .dr-dot { animation-duration: 3s; animation-iteration-count: infinite; }
          .dr-rotor, .dr-rotor-slow { animation: none; }
        }
      `}</style>

      <div
        className={`relative flex w-56 flex-col items-center transition-all duration-300 ease-out ${isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
      >
        <QuadHud />

        <div className="mt-8 flex items-center gap-[0.22em] font-dm-mono text-[11px] uppercase tracking-[0.32em] text-dr-text-3">
          <span>Loading</span>
          <span className="dr-dot text-dr-red">.</span>
          <span className="dr-dot dr-dot-2 text-dr-red">.</span>
          <span className="dr-dot dr-dot-3 text-dr-red">.</span>
        </div>
      </div>
    </div>
  );
}

function QuadHud() {
  const c = 200;
  const arm = 96;
  const ring = 150;
  const rotors = [45, 135, 225, 315].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return { x: c + Math.cos(rad) * arm, y: c + Math.sin(rad) * arm, deg };
  });
  const circ = 2 * Math.PI * ring;

  return (
    <svg viewBox="0 0 400 400" className="h-52 w-52" aria-hidden="true">
      <title>Loading</title>

      {/* radar rings — faint, pulsing */}
      <g
        className="dr-ring-pulse text-dr-text-3"
        stroke="currentColor"
        fill="none"
      >
        <circle cx={c} cy={c} r={ring} strokeWidth="1" opacity="0.35" />
        <circle cx={c} cy={c} r={ring - 46} strokeWidth="1" opacity="0.22" />
      </g>

      {/* cardinal ticks */}
      <g
        className="text-dr-text-3"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      >
        <line x1={c} y1={c - ring - 6} x2={c} y2={c - ring + 8} />
        <line x1={c} y1={c + ring - 8} x2={c} y2={c + ring + 6} />
        <line x1={c - ring - 6} y1={c} x2={c - ring + 8} y2={c} />
        <line x1={c + ring - 8} y1={c} x2={c + ring + 6} y2={c} />
      </g>

      {/* signature: red scanning sweep */}
      <g className="dr-sweep text-dr-red">
        <circle
          cx={c}
          cy={c}
          r={ring}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${circ * 0.16} ${circ}`}
        />
        <line
          x1={c}
          y1={c}
          x2={c + ring}
          y2={c}
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.28"
        />
      </g>

      {/* quad arms */}
      <g
        className="text-dr-text-3"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
      >
        {rotors.map((r) => (
          <line key={r.deg} x1={c} y1={c} x2={r.x} y2={r.y} />
        ))}
      </g>

      {/* motors + spinning rotors */}
      {rotors.map((r, i) => (
        <g key={r.deg}>
          <circle
            cx={r.x}
            cy={r.y}
            r="22"
            className="text-dr-bd-4"
            fill="var(--dr-field)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <g
            style={{ transformOrigin: `${r.x}px ${r.y}px` }}
            className={
              i < 2 ? "dr-rotor text-dr-text-2" : "dr-rotor-slow text-dr-text-2"
            }
          >
            <rect
              x={r.x - 20}
              y={r.y - 2.5}
              width="40"
              height="5"
              rx="2.5"
              fill="currentColor"
              opacity="0.85"
            />
            <rect
              x={r.x - 2.5}
              y={r.y - 20}
              width="5"
              height="40"
              rx="2.5"
              fill="currentColor"
              opacity="0.85"
            />
          </g>
          <circle
            cx={r.x}
            cy={r.y}
            r="4"
            className="text-dr-text"
            fill="currentColor"
          />
        </g>
      ))}

      {/* central body */}
      <rect
        x={c - 30}
        y={c - 30}
        width="60"
        height="60"
        rx="14"
        fill="var(--dr-surface)"
        className="text-dr-bd-4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x={c - 18}
        y={c - 18}
        width="36"
        height="36"
        rx="8"
        fill="none"
        className="text-dr-text-3"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      {/* GPS-lock pulse */}
      <circle
        cx={c}
        cy={c}
        r="7"
        className="dr-lock text-dr-red"
        fill="currentColor"
      />
    </svg>
  );
}
