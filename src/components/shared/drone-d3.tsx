"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface DroneD3Props {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface PropellerData {
  x: number;
  y: number;
}

interface LedData {
  x: number;
  y: number;
  color: string;
}

const DroneD3: React.FC<DroneD3Props> = ({
  width = 500,
  height = 420,
  className,
  style,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    // Set viewBox for scalability
    svg
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", width)
      .attr("height", height);

    const centerX = width / 2;
    const centerY = height / 2;

    // Main body (sleeker design)
    const bodyGroup = svg.append("g").attr("class", "body");

    // Body base
    bodyGroup
      .append("rect")
      .attr("x", centerX - 60)
      .attr("y", centerY - 18)
      .attr("width", 120)
      .attr("height", 36)
      .attr("rx", 8)
      .attr("fill", "#2563eb")
      .attr("stroke", "#1e40af")
      .attr("stroke-width", 2);

    // Body top detail
    bodyGroup
      .append("rect")
      .attr("x", centerX - 50)
      .attr("y", centerY - 12)
      .attr("width", 100)
      .attr("height", 24)
      .attr("rx", 6)
      .attr("fill", "#1e40af")
      .attr("opacity", 0.6);

    // Arms (diagonal for quadcopter X configuration)
    const armLength = 90;
    const armAngle = 45; // degrees
    const armPositions = [
      { angle: armAngle, color: "#1e3a8a" },
      { angle: 180 - armAngle, color: "#1e3a8a" },
      { angle: 180 + armAngle, color: "#1e3a8a" },
      { angle: 360 - armAngle, color: "#1e3a8a" },
    ];

    const arms = svg.append("g").attr("class", "arms");

    armPositions.forEach((arm) => {
      const rad = (arm.angle * Math.PI) / 180;
      const endX = centerX + Math.cos(rad) * armLength;
      const endY = centerY + Math.sin(rad) * armLength;

      // Arm line
      arms
        .append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", endX)
        .attr("y2", endY)
        .attr("stroke", arm.color)
        .attr("stroke-width", 5)
        .attr("stroke-linecap", "round");

      // Accent stripe on arms
      arms
        .append("line")
        .attr("x1", centerX + Math.cos(rad) * 20)
        .attr("y1", centerY + Math.sin(rad) * 20)
        .attr("x2", centerX + Math.cos(rad) * 50)
        .attr("y2", centerY + Math.sin(rad) * 50)
        .attr("stroke", "#06b6d4")
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round");
    });

    // Motor housings and propellers
    const propellers: PropellerData[] = armPositions.map((arm) => {
      const rad = (arm.angle * Math.PI) / 180;
      return {
        x: centerX + Math.cos(rad) * armLength,
        y: centerY + Math.sin(rad) * armLength,
      };
    });

    const propellerGroup = svg
      .selectAll<SVGGElement, PropellerData>(".propeller")
      .data(propellers)
      .enter()
      .append("g")
      .attr("class", "propeller");

    // Motor housing (circles)
    propellerGroup
      .append("circle")
      .attr("cx", (d: PropellerData) => d.x)
      .attr("cy", (d: PropellerData) => d.y)
      .attr("r", 12)
      .attr("fill", "#1e293b")
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 2);

    // Motor center
    propellerGroup
      .append("circle")
      .attr("cx", (d: PropellerData) => d.x)
      .attr("cy", (d: PropellerData) => d.y)
      .attr("r", 5)
      .attr("fill", "#374151");

    // Propeller blades (more realistic)
    propellerGroup
      .append("ellipse")
      .attr("cx", (d: PropellerData) => d.x)
      .attr("cy", (d: PropellerData) => d.y)
      .attr("rx", 20)
      .attr("ry", 4)
      .attr("fill", "#9ca3af")
      .attr("opacity", 0.7);

    propellerGroup
      .append("ellipse")
      .attr("cx", (d: PropellerData) => d.x)
      .attr("cy", (d: PropellerData) => d.y)
      .attr("rx", 4)
      .attr("ry", 20)
      .attr("fill", "#9ca3af")
      .attr("opacity", 0.7);

    // Landing gear struts
    const landingGear = svg.append("g").attr("class", "landing-gear");

    landingGear
      .append("line")
      .attr("x1", centerX - 40)
      .attr("y1", centerY + 18)
      .attr("x2", centerX - 40)
      .attr("y2", centerY + 35)
      .attr("stroke", "#475569")
      .attr("stroke-width", 3);

    landingGear
      .append("line")
      .attr("x1", centerX + 40)
      .attr("y1", centerY + 18)
      .attr("x2", centerX + 40)
      .attr("y2", centerY + 35)
      .attr("stroke", "#475569")
      .attr("stroke-width", 3);

    // Landing feet
    landingGear
      .append("circle")
      .attr("cx", centerX - 40)
      .attr("cy", centerY + 35)
      .attr("r", 4)
      .attr("fill", "#1e293b");

    landingGear
      .append("circle")
      .attr("cx", centerX + 40)
      .attr("cy", centerY + 35)
      .attr("r", 4)
      .attr("fill", "#1e293b");

    // Camera/Gimbal (centered below body)
    const gimbal = svg.append("g").attr("class", "gimbal");

    // Gimbal mount
    gimbal
      .append("rect")
      .attr("x", centerX - 15)
      .attr("y", centerY + 18)
      .attr("width", 30)
      .attr("height", 8)
      .attr("rx", 2)
      .attr("fill", "#475569");

    // Camera body
    gimbal
      .append("rect")
      .attr("x", centerX - 18)
      .attr("y", centerY + 26)
      .attr("width", 36)
      .attr("height", 22)
      .attr("rx", 4)
      .attr("fill", "#1e293b")
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 1.5);

    // Camera lens
    gimbal
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY + 37)
      .attr("r", 8)
      .attr("fill", "#0f172a");

    gimbal
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY + 37)
      .attr("r", 6)
      .attr("fill", "#1e3a8a")
      .attr("opacity", 0.6);

    // LEDs (status lights on body)
    const leds: LedData[] = [
      { x: centerX - 45, y: centerY - 8, color: "#ef4444" }, // red front left
      { x: centerX + 45, y: centerY - 8, color: "#10b981" }, // green front right
      { x: centerX - 45, y: centerY + 8, color: "#3b82f6" }, // blue rear left
      { x: centerX + 45, y: centerY + 8, color: "#3b82f6" }, // blue rear right
    ];

    svg
      .selectAll<SVGCircleElement, LedData>(".led")
      .data(leds)
      .enter()
      .append("circle")
      .attr("class", "led")
      .attr("cx", (d: LedData) => d.x)
      .attr("cy", (d: LedData) => d.y)
      .attr("r", 3)
      .attr("fill", (d: LedData) => d.color);

    // Antenna
    svg
      .append("line")
      .attr("x1", centerX + 50)
      .attr("y1", centerY - 18)
      .attr("x2", centerX + 50)
      .attr("y2", centerY - 35)
      .attr("stroke", "#64748b")
      .attr("stroke-width", 2);

    svg
      .append("circle")
      .attr("cx", centerX + 50)
      .attr("cy", centerY - 35)
      .attr("r", 3)
      .attr("fill", "#ef4444");

    // Animations
    // Propeller spin
    const spin = () => {
      propellerGroup
        .transition()
        .duration(800)
        .attrTween(
          "transform",
          (d: PropellerData) => (t: number) =>
            `rotate(${t * 360} ${d.x} ${d.y})`,
        )
        .on("end", spin);
    };
    spin();

    // Floating motion
    const float = () => {
      svg
        .transition()
        .duration(2000)
        .ease(d3.easeSinInOut)
        .attr("transform", "translate(0, -10)")
        .transition()
        .duration(2000)
        .ease(d3.easeSinInOut)
        .attr("transform", "translate(0, 10)")
        .on("end", float);
    };
    float();

    // LED pulsing animation
    svg.selectAll(".led").each(function () {
      const pulse = () => {
        d3.select(this)
          .transition()
          .duration(1000)
          .attr("opacity", 0.3)
          .transition()
          .duration(1000)
          .attr("opacity", 1)
          .on("end", pulse);
      };
      pulse();
    });

    // Hover effect
    svg
      .on("mouseover", function () {
        d3.select(this)
          .transition()
          .duration(300)
          .style("transform", "scale(1.05)");
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(300)
          .style("transform", "scale(1)");
      });
  }, [width, height]);

  return (
    <svg
      ref={svgRef}
      className={className || "max-w-full max-h-full object-contain"}
      style={style}
    />
  );
};

export default DroneD3;
