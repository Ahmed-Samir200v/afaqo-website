"use client";

import { useEffect, useRef, useState, useCallback, Suspense, lazy } from "react";
import type { Application } from "@splinetool/runtime";

// Lazy-load Spline to prevent blocking initial paint and ensure client-only execution
const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: (app: Application) => void;
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoad = useCallback(
    (app: Application) => {
      appRef.current = app;
      try {
        // Enforce Soft Ivory background color inside Spline's WebGL renderer
        app.setBackgroundColor("#F9F8F4");
      } catch {
        // Continue if scene controls background internally
      }

      setIsLoaded(true);
      if (onLoad) {
        onLoad(app);
      }
    },
    [onLoad]
  );

  return (
    <div
      className={`spline-scene-container ${className || ""}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      {/* Quiet Soft Ivory visual placeholder while Spline loads (zero layout shift, no spinner) */}
      <div
        className="spline-placeholder"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#F9F8F4",
          opacity: isLoaded ? 0 : 1,
          transition: "opacity 0.6s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {mounted && (
        <Suspense fallback={null}>
          <Spline
            scene={scene}
            onLoad={handleLoad}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />
        </Suspense>
      )}
    </div>
  );
}
