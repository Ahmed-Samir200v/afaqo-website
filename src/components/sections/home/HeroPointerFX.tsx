"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "@/lib/motion-preference";

interface HeroPointerFXProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

export function HeroPointerFX({ containerRef }: HeroPointerFXProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { shouldReduceMotion } = useMotionPreference();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    let isInside = false;
    let targetX = width / 2;
    let targetY = height / 2;
    let haloX = targetX;
    let haloY = targetY;
    let lastEmitX = targetX;
    let lastEmitY = targetY;
    let haloAlpha = 0;

    let sparks: Spark[] = [];
    let rafId: number | null = null;
    let isTouch = false;

    const colors = ["#00D1FF", "#0866FF", "#FFFFFF"];

    const resize = () => {
      if (!container || !canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        isTouch = true;
        return;
      }
      isTouch = false;
      isInside = true;
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      haloX = targetX;
      haloY = targetY;
      lastEmitX = targetX;
      lastEmitY = targetY;
      startLoop();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isTouch || e.pointerType === "touch") return;
      isInside = true;
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      // Distance check for micro sparks emission
      const dx = targetX - lastEmitX;
      const dy = targetY - lastEmitY;
      const dist = Math.hypot(dx, dy);

      if (dist > 18) {
        lastEmitX = targetX;
        lastEmitY = targetY;

        // Emit 2-4 restrained spatial micro-sparks
        const count = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 1.4 + 0.4;
          sparks.push({
            x: targetX + (Math.random() - 0.5) * 6,
            y: targetY + (Math.random() - 0.5) * 6,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 0.9 + 0.8, // 0.8 - 1.7px (very small data fragments)
            alpha: 0.65,
            decay: Math.random() * 0.035 + 0.025, // ~300-400ms lifetime
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }

        // Cap sparks array to maintain 60fps performance
        if (sparks.length > 28) {
          sparks = sparks.slice(-28);
        }
      }

      startLoop();
    };

    const onPointerLeave = () => {
      isInside = false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth halo position
      haloX += (targetX - haloX) * 0.14;
      haloY += (targetY - haloY) * 0.14;

      // Fade halo in/out (Target alpha ~0.26 inside H01)
      const targetAlpha = isInside ? 0.26 : 0;
      haloAlpha += (targetAlpha - haloAlpha) * 0.1;

      // Draw Cursor Energy Halo
      if (haloAlpha > 0.005) {
        const radius = 140; // 120-160px
        const gradient = ctx.createRadialGradient(haloX, haloY, 0, haloX, haloY, radius);
        gradient.addColorStop(0, `rgba(0, 209, 255, ${haloAlpha * 0.98})`);
        gradient.addColorStop(0.14, `rgba(0, 209, 255, ${haloAlpha * 0.70})`);
        gradient.addColorStop(0.45, `rgba(8, 102, 255, ${haloAlpha * 0.46})`); // ~0.12 blue secondary glow
        gradient.addColorStop(1, "rgba(5, 13, 36, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(haloX, haloY, radius, 0, Math.PI * 2);
        ctx.fill();

        // 4px Core Point (radius 2.0px)
        ctx.fillStyle = `rgba(255, 255, 255, ${haloAlpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(haloX, haloY, 2.0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw and update micro sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Stop loop when inactive to conserve CPU/GPU
      if (!isInside && haloAlpha <= 0.005 && sparks.length === 0) {
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(draw);
    };

    const startLoop = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(draw);
      }
    };

    container.addEventListener("pointerenter", onPointerEnter);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [shouldReduceMotion, containerRef]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
      }}
    />
  );
}
