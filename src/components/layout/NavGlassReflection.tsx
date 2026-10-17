"use client";

import { useRef } from "react";

export function NavGlassReflection() {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    el.style.setProperty("--nav-mouse-x", `${x}px`);
    el.style.setProperty("--nav-mouse-y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className="group absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-auto"
      style={{
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--nav-mouse-x, 50%) var(--nav-mouse-y, 50%), rgba(255,255,255,0.14), rgba(0,209,255,0.055) 28%, rgba(8,102,255,0.025) 48%, transparent 68%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.06), transparent 32%)",
        }}
      />
    </div>
  );
}
