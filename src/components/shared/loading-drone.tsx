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
      }, 800);
      return () => clearTimeout(timer);
    } else if (isLoading) {
      setShouldRender(true);
      setIsExiting(false);
    }
  }, [isLoading, shouldRender, onAnimationComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-500 ${!isLoading ? "opacity-0" : "opacity-100"}`}
    >
      <style>{`
        @keyframes drone-hover {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
        }
        @keyframes propeller-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes led-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes drone-fly-away {
          to {
            transform: translate(500px, -1000px) rotate(15deg) scale(0.5);
            opacity: 0;
          }
        }
        .drone-animate-hover {
          animation: drone-hover 2s ease-in-out infinite;
        }
        .drone-animate-exit {
          animation: drone-fly-away 0.8s ease-in forwards !important;
        }
        .propeller-spin {
          animation: propeller-spin 0.2s linear infinite;
        }
        .led-pulse {
          animation: led-pulse 1s infinite;
        }
        .text-pulse {
          animation: led-pulse 1.5s infinite;
        }
      `}</style>

      <div className="relative w-64 h-64">
        <div
          className={`w-full h-full drone-animate-hover ${isExiting ? "drone-animate-exit" : ""}`}
        >
          <DroneSvg />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-primary font-medium tracking-widest text-sm text-pulse">
          LOADING...
        </div>
      </div>
    </div>
  );
}

function DroneSvg() {
  const centerX = 250;
  const centerY = 210;
  const armLength = 90;
  const armAngle = 45;

  const armPositions = [
    { angle: armAngle, color: "#1e3a8a" },
    { angle: 180 - armAngle, color: "#1e3a8a" },
    { angle: 180 + armAngle, color: "#1e3a8a" },
    { angle: 360 - armAngle, color: "#1e3a8a" },
  ];

  const propellers = armPositions.map((arm) => {
    const rad = (arm.angle * Math.PI) / 180;
    return {
      x: centerX + Math.cos(rad) * armLength,
      y: centerY + Math.sin(rad) * armLength,
    };
  });

  const bodyPoints = [
    [centerX, centerY - 65],
    [centerX - 35, centerY - 35],
    [centerX - 30, centerY + 45],
    [centerX, centerY + 75],
    [centerX + 30, centerY + 45],
    [centerX + 35, centerY - 35],
  ]
    .map((p) => p.join(","))
    .join(" ");

  const topDetailPoints = [
    [centerX, centerY - 55],
    [centerX - 28, centerY - 28],
    [centerX - 24, centerY + 38],
    [centerX, centerY + 65],
    [centerX + 24, centerY + 38],
    [centerX + 28, centerY - 28],
  ]
    .map((p) => p.join(","))
    .join(" ");

  return (
    <svg viewBox="0 0 500 420" className="w-full h-full drop-shadow-2xl">
      <title>Spinner</title>
      <PropellerGroup data={[propellers[2], propellers[3]]} isBack />

      <g>
        {armPositions.map((arm, i) => {
          const rad = (arm.angle * Math.PI) / 180;
          const endX = centerX + Math.cos(rad) * armLength;
          const endY = centerY + Math.sin(rad) * armLength;
          return (
            <g key={i}>
              <line
                x1={centerX}
                y1={centerY}
                x2={endX}
                y2={endY}
                stroke={arm.color}
                strokeWidth="5"
                strokeLinecap="round"
              />
              <line
                x1={centerX + Math.cos(rad) * 20}
                y1={centerY + Math.sin(rad) * 20}
                x2={centerX + Math.cos(rad) * 50}
                y2={centerY + Math.sin(rad) * 50}
                stroke="#06b6d4"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </g>

      <g>
        <polygon
          points={bodyPoints}
          fill="#2563eb"
          stroke="#1e40af"
          strokeWidth="2"
        />
        <polygon points={topDetailPoints} fill="#1e40af" opacity="0.6" />
        <polygon
          points={`${centerX - 8},${centerY + 55} ${centerX},${centerY + 72} ${centerX + 8},${centerY + 55}`}
          fill="#1e3a8a"
          opacity="0.8"
        />
      </g>

      <g stroke="#475569" strokeWidth="3">
        <line
          x1={centerX - 40}
          y1={centerY + 18}
          x2={centerX - 40}
          y2={centerY + 35}
        />
        <line
          x1={centerX + 40}
          y1={centerY + 18}
          x2={centerX + 40}
          y2={centerY + 35}
        />
        <circle
          cx={centerX - 40}
          cy={centerY + 35}
          r="4"
          fill="#1e293b"
          stroke="none"
        />
        <circle
          cx={centerX + 40}
          cy={centerY + 35}
          r="4"
          fill="#1e293b"
          stroke="none"
        />
      </g>

      <g fill="#1e293b">
        <rect
          x={centerX - 15}
          y={centerY + 35}
          width="30"
          height="8"
          rx="2"
          fill="#475569"
        />
        <rect
          x={centerX - 18}
          y={centerY + 43}
          width="36"
          height="22"
          rx="4"
          stroke="#0f172a"
          strokeWidth="1.5"
        />
        <circle cx={centerX} cy={centerY + 54} r="8" fill="#0f172a" />
        <circle
          cx={centerX}
          cy={centerY + 54}
          r="6"
          fill="#1e3a8a"
          opacity="0.6"
        />
      </g>

      <Led x={centerX - 25} y={centerY + 40} color="#ef4444" />
      <Led x={centerX + 25} y={centerY + 40} color="#10b981" />
      <Led x={centerX - 25} y={centerY - 35} color="#3b82f6" />
      <Led x={centerX + 25} y={centerY - 35} color="#3b82f6" />

      <line
        x1={centerX}
        y1={centerY - 55}
        x2={centerX}
        y2={centerY - 80}
        stroke="#64748b"
        strokeWidth="2"
      />
      <circle cx={centerX} cy={centerY - 80} r="3" fill="#ef4444" />

      <PropellerGroup data={[propellers[0], propellers[1]]} />
    </svg>
  );
}

function PropellerGroup({
  data,
  isBack = false,
}: {
  data: { x: number; y: number }[];
  isBack?: boolean;
}) {
  return (
    <>
      {data.map((d, i) => (
        <g key={i}>
          <circle
            cx={d.x}
            cy={d.y}
            r="12"
            fill="#1e293b"
            stroke="#0f172a"
            strokeWidth="2"
          />
          <circle cx={d.x} cy={d.y} r="5" fill="#374151" />
          <g
            style={{ transformOrigin: `${d.x}px ${d.y}px` }}
            className="propeller-spin"
          >
            <ellipse
              cx={d.x}
              cy={d.y}
              rx="20"
              ry="4"
              fill="#9ca3af"
              opacity={isBack ? 0.5 : 0.7}
            />
            <ellipse
              cx={d.x}
              cy={d.y}
              rx="4"
              ry="20"
              fill="#9ca3af"
              opacity={isBack ? 0.5 : 0.7}
            />
          </g>
        </g>
      ))}
    </>
  );
}

function Led({ x, y, color }: { x: number; y: number; color: string }) {
  return <circle cx={x} cy={y} r="3" fill={color} className="led-pulse" />;
}
