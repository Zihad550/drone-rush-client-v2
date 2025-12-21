"use client";

import * as d3 from "d3";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

interface MiniDroneProps {
  size?: number;
  className?: string;
  followSpeed?: number; // 0.01 to 0.1 for smoothness
}

const MiniDrone: React.FC<MiniDroneProps> = ({
  size = 60,
  className,
  followSpeed = 0.08,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const glowClass = isDark ? "bg-red-500/10" : "bg-blue-500/10";

  // Track mouse position and drone position
  const mousePos = useRef({ x: 0, y: 0 });
  const dronePos = useRef({ x: 0, y: 0 });

  // Initialize mouse position to center of screen or something sensible
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Initialize position immediately on first move or render
    if (typeof window !== "undefined") {
      const initialX = window.innerWidth / 2;
      const initialY = window.innerHeight / 2;
      mousePos.current = { x: initialX, y: initialY };
      dronePos.current = { x: initialX, y: initialY };
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 100;
    const height = 100;
    const centerX = width / 2;
    const centerY = height / 2;

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    // Theme-based colors
    const armColor = isDark ? "#a52a2a" : "#1e3a8a";
    const bodyFill = isDark ? "#8b0000" : "#2563eb";
    const bodyStroke = isDark ? "#b22222" : "#1e40af";

    // Groups for different parts
    const mainGroup = svg.append("g").attr("class", "drone-content");
    const armsGroup = mainGroup.append("g").attr("class", "arms");
    const bodyGroup = mainGroup.append("g").attr("class", "body");
    const propellersGroup = mainGroup.append("g").attr("class", "propellers");

    // Arms
    const armLength = 25;
    const armAngles = [45, 135, 225, 315];

    armAngles.forEach((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x2 = centerX + Math.cos(rad) * armLength;
      const y2 = centerY + Math.sin(rad) * armLength;

      armsGroup
        .append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", x2)
        .attr("y2", y2)
        .attr("stroke", armColor)
        .attr("stroke-width", 4)
        .attr("stroke-linecap", "round");

      // Propeller Motor
      propellersGroup
        .append("circle")
        .attr("cx", x2)
        .attr("cy", y2)
        .attr("r", 4)
        .attr("fill", "#1e293b");

      // Shared Propeller Blades (animated via CSS)
      const bladeGroup = propellersGroup
        .append("g")
        .attr("class", "propeller-blade")
        .style("transform-origin", `${x2}px ${y2}px`);

      bladeGroup
        .append("ellipse")
        .attr("cx", x2)
        .attr("cy", y2)
        .attr("rx", 10)
        .attr("ry", 2)
        .attr("fill", "#9ca3af")
        .attr("opacity", 0.6);
    });

    // Body
    const bodyPoints = [
      [centerX, centerY - 15],
      [centerX - 10, centerY - 8],
      [centerX - 8, centerY + 12],
      [centerX, centerY + 18],
      [centerX + 8, centerY + 12],
      [centerX + 10, centerY - 8],
    ]
      .map((p) => p.join(","))
      .join(" ");

    bodyGroup
      .append("polygon")
      .attr("points", bodyPoints)
      .attr("fill", bodyFill)
      .attr("stroke", bodyStroke)
      .attr("stroke-width", 1);

    // LEDs
    bodyGroup
      .append("circle")
      .attr("cx", centerX - 4)
      .attr("cy", centerY + 8)
      .attr("r", 1.5)
      .attr("fill", "#ef4444")
      .attr("class", "led-pulse");

    bodyGroup
      .append("circle")
      .attr("cx", centerX + 4)
      .attr("cy", centerY + 8)
      .attr("r", 1.5)
      .attr("fill", "#10b981")
      .attr("class", "led-pulse");

    // Movement and Tilt Logic Loop
    let requestId: number;
    const animate = () => {
      // Smoothly follow mouse
      const dx = mousePos.current.x - dronePos.current.x;
      const dy = mousePos.current.y - dronePos.current.y;

      dronePos.current.x += dx * followSpeed;
      dronePos.current.y += dy * followSpeed;

      // Calculate tilt based on velocity/delta
      // We want to tilt towards the movement direction
      const tiltX = Math.max(-20, Math.min(20, dy * 0.1));
      const tiltY = Math.max(-20, Math.min(20, -dx * 0.1));

      if (containerRef.current) {
        // Use translate3d for hardware acceleration and precise positioning
        containerRef.current.style.transform = `translate3d(${dronePos.current.x - size / 2}px, ${dronePos.current.y - size / 2}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }

      requestId = requestAnimationFrame(animate);
    };

    requestId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestId);
  }, [size, followSpeed, isDark]);

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform ${className}`}
      style={{
        width: size,
        height: size,
        perspective: "1000px",
      }}
    >
      {/* Background glow for visibility */}
      <div
        className={`absolute inset-0 ${glowClass} blur-xl rounded-full -z-10`}
      />
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="overflow-visible"
      />
      <style jsx global>{`
        @keyframes propeller-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .propeller-blade {
          animation: propeller-spin 0.2s linear infinite;
        }
        @keyframes led-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .led-pulse {
          animation: led-blink 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MiniDrone;
