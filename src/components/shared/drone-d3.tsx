"use client";

import * as d3 from "d3";
import { useTheme } from "next-themes";
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
  const { theme } = useTheme();
  const isDark = theme === "dark";

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

    // Arms (diagonal for quadcopter X configuration)
    const armLength = 90;
    const armAngle = 45; // degrees
    const armPositions = [
      { angle: armAngle, color: isDark ? "#a52a2a" : "#1e3a8a" },
      { angle: 180 - armAngle, color: isDark ? "#a52a2a" : "#1e3a8a" },
      { angle: 180 + armAngle, color: isDark ? "#a52a2a" : "#1e3a8a" },
      { angle: 360 - armAngle, color: isDark ? "#a52a2a" : "#1e3a8a" },
    ];

    // Calculate propeller positions first
    const propellers: PropellerData[] = armPositions.map((arm) => {
      const rad = (arm.angle * Math.PI) / 180;
      return {
        x: centerX + Math.cos(rad) * armLength,
        y: centerY + Math.sin(rad) * armLength,
      };
    });

    // Render BACK propellers FIRST (top 2: indices 2 & 3 at negative Y, top of screen)
    // These will appear BEHIND the body
    const backPropellers = [propellers[2], propellers[3]];
    const backPropellerGroup = svg
      .selectAll<SVGGElement, PropellerData>(".propeller-back")
      .data(backPropellers)
      .enter()
      .append("g")
      .attr("class", "propeller propeller-back");

    // Motor housing (circles) for back propellers
    backPropellerGroup
      .append("circle")
      .attr("cx", (d: PropellerData) => d.x)
      .attr("cy", (d: PropellerData) => d.y)
      .attr("r", 12)
      .attr("fill", "#1e293b")
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 2);

    // Motor center for back propellers
    backPropellerGroup
      .append("circle")
      .attr("cx", (d: PropellerData) => d.x)
      .attr("cy", (d: PropellerData) => d.y)
      .attr("r", 5)
      .attr("fill", "#374151");

    // Propeller blades for back propellers
    backPropellerGroup
      .append("ellipse")
      .attr("cx", (d: PropellerData) => d.x)
      .attr("cy", (d: PropellerData) => d.y)
      .attr("rx", 20)
      .attr("ry", 4)
      .attr("fill", "#9ca3af")
      .attr("opacity", 0.5);

    backPropellerGroup
      .append("ellipse")
      .attr("cx", (d: PropellerData) => d.x)
      .attr("cy", (d: PropellerData) => d.y)
      .attr("rx", 4)
      .attr("ry", 20)
      .attr("fill", "#9ca3af")
      .attr("opacity", 0.5);

    // NOW render the arms (will be on top of back propellers)
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

    // Main body (aerodynamic pointed design) - Facing User (pointing down)
    const bodyGroup = svg.append("g").attr("class", "body");

    // Create pointed body shape pointing downwards
    const bodyPoints = [
      [centerX, centerY - 65], // Tail tip (top)
      [centerX - 35, centerY - 35], // Back-left side
      [centerX - 30, centerY + 45], // Front-left shoulder
      [centerX, centerY + 75], // Nose tip (bottom, facing user)
      [centerX + 30, centerY + 45], // Front-right shoulder
      [centerX + 35, centerY - 35], // Back-right side
    ]
      .map((p) => p.join(","))
      .join(" ");

    bodyGroup
      .append("polygon")
      .attr("points", bodyPoints)
      .attr("fill", isDark ? "#8b0000" : "#2563eb")
      .attr("stroke", isDark ? "#b22222" : "#1e40af")
      .attr("stroke-width", 2);

    // Body top detail (smaller pointed overlay)
    const topDetailPoints = [
      [centerX, centerY - 55], // Back detail tip
      [centerX - 28, centerY - 28], // Back-left side
      [centerX - 24, centerY + 38], // Front-left side
      [centerX, centerY + 65], // Front detail tip
      [centerX + 24, centerY + 38], // Front-right side
      [centerX + 28, centerY - 28], // Back-right side
    ]
      .map((p) => p.join(","))
      .join(" ");

    bodyGroup
      .append("polygon")
      .attr("points", topDetailPoints)
      .attr("fill", isDark ? "#b22222" : "#1e40af")
      .attr("opacity", 0.6);

    // Add subtle nose detail for extra pointiness at the front (bottom)
    bodyGroup
      .append("polygon")
      .attr(
        "points",
        `${centerX - 8},${centerY + 55} ${centerX},${centerY + 72} ${centerX + 8},${centerY + 55}`,
      )
      .attr("fill", isDark ? "#a52a2a" : "#1e3a8a")
      .attr("opacity", 0.8);

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

    // Camera/Gimbal (centered below body, near nose)
    const gimbal = svg.append("g").attr("class", "gimbal");

    // Gimbal mount (moved forward)
    gimbal
      .append("rect")
      .attr("x", centerX - 15)
      .attr("y", centerY + 35)
      .attr("width", 30)
      .attr("height", 8)
      .attr("rx", 2)
      .attr("fill", "#475569");

    // Camera body (moved forward)
    gimbal
      .append("rect")
      .attr("x", centerX - 18)
      .attr("y", centerY + 43)
      .attr("width", 36)
      .attr("height", 22)
      .attr("rx", 4)
      .attr("fill", "#1e293b")
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 1.5);

    // Camera lens (moved forward)
    gimbal
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY + 54)
      .attr("r", 8)
      .attr("fill", "#0f172a");

    gimbal
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY + 54)
      .attr("r", 6)
      .attr("fill", isDark ? "#a52a2a" : "#1e3a8a")
      .attr("opacity", 0.6);

    // LEDs (status lights on body)
    const leds: LedData[] = [
      { x: centerX - 25, y: centerY + 40, color: "#ef4444" }, // red front left (near nose)
      { x: centerX + 25, y: centerY + 40, color: "#10b981" }, // green front right (near nose)
      { x: centerX - 25, y: centerY - 35, color: "#3b82f6" }, // blue rear left
      { x: centerX + 25, y: centerY - 35, color: "#3b82f6" }, // blue rear right
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

    // Antenna (at the rear)
    svg
      .append("line")
      .attr("x1", centerX)
      .attr("y1", centerY - 55)
      .attr("x2", centerX)
      .attr("y2", centerY - 80)
      .attr("stroke", "#64748b")
      .attr("stroke-width", 2);

    svg
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY - 80)
      .attr("r", 3)
      .attr("fill", "#ef4444");

    // Render FRONT propellers (bottom 2: indices 0 & 1 at positive Y, bottom of screen)
    // These will appear in front of the body
    const frontPropellers = [propellers[0], propellers[1]];
    const frontPropellerGroup = svg
      .selectAll<SVGGElement, PropellerData>(".propeller-front")
      .data(frontPropellers)
      .enter()
      .append("g")
      .attr("class", "propeller propeller-front");

    // Motor housing (circles) for front propellers
    frontPropellerGroup
      .append("circle")
      .attr("cx", (d: PropellerData) => d.x)
      .attr("cy", (d: PropellerData) => d.y)
      .attr("r", 12)
      .attr("fill", "#1e293b")
      .attr("stroke", "#0f172a")
      .attr("stroke-width", 2);

    // Motor center for front propellers
    frontPropellerGroup
      .append("circle")
      .attr("cx", (d: PropellerData) => d.x)
      .attr("cy", (d: PropellerData) => d.y)
      .attr("r", 5)
      .attr("fill", "#374151");

    // Propeller blades for front propellers
    frontPropellerGroup
      .append("ellipse")
      .attr("cx", (d: PropellerData) => d.x)
      .attr("cy", (d: PropellerData) => d.y)
      .attr("rx", 20)
      .attr("ry", 4)
      .attr("fill", "#9ca3af")
      .attr("opacity", 0.7);

    frontPropellerGroup
      .append("ellipse")
      .attr("cx", (d: PropellerData) => d.x)
      .attr("cy", (d: PropellerData) => d.y)
      .attr("rx", 4)
      .attr("ry", 20)
      .attr("fill", "#9ca3af")
      .attr("opacity", 0.7);

    // Animations
    // Propeller spin for both groups
    const spin = () => {
      // Spin back propellers
      backPropellerGroup
        .transition()
        .duration(800)
        .attrTween(
          "transform",
          (d: PropellerData) => (t: number) =>
            `rotate(${t * 360} ${d.x} ${d.y})`,
        )
        .on("end", spin);

      // Spin front propellers
      frontPropellerGroup
        .transition()
        .duration(800)
        .attrTween(
          "transform",
          (d: PropellerData) => (t: number) =>
            `rotate(${t * 360} ${d.x} ${d.y})`,
        );
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
  }, [width, height, isDark]);

  return (
    <svg
      ref={svgRef}
      className={className || "max-w-full max-h-full object-contain"}
      style={style}
    />
  );
};

export default DroneD3;
