"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Application } from "@splinetool/runtime";
import styles from "./H10-FinalCTA.module.css";

const RobotScene = dynamic(
  () => import("@splinetool/react-spline"),
  {
    ssr: false,
    loading: () => null,
  }
);

const SCENE_URL =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function H10FinalCTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const splineRef = useRef<Application | null>(null);

  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setShouldMount(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "250px 0px",
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const applyFramingZoom = useCallback((app: Application) => {
    if (typeof app.setZoom !== "function") return;
    try {
      const width = window.innerWidth;
      // Scene calibrated Camera 2 with close-up framing.
      // In our responsive exhibit container:
      // Desktop: zoom 1.85 frames head, shoulders, torso, and upper arms (~75-80% height)
      // Tablet: zoom 1.70
      // Mobile: zoom 1.55 to avoid clipping in compact 420px exhibit
      if (width <= 767) {
        app.setZoom(1.55);
      } else if (width <= 1080) {
        app.setZoom(1.7);
      } else {
        app.setZoom(1.85);
      }
    } catch {
      // Fallback: preserve untouched native zoom if setZoom is not supported
    }
  }, []);

  const handleSceneLoad = useCallback(
    (app: Application) => {
      splineRef.current = app;
      if (typeof window !== "undefined") {
        (window as unknown as { __splineApp: Application }).__splineApp = app;
      }

      // Safely attempt transparency if supported by Spline runtime API
      try {
        if (typeof app.setBackgroundColor === "function") {
          app.setBackgroundColor("transparent");
        }
      } catch {
        // Fallback: keep authored scene background safely contained inside robotExhibit
      }

      // Frame robot using tested setZoom calibrated to scene's authored Camera 2
      applyFramingZoom(app);
    },
    [applyFramingZoom]
  );

  useEffect(() => {
    const handleResize = () => {
      if (splineRef.current) {
        applyFramingZoom(splineRef.current);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      splineRef.current = null;
    };
  }, [applyFramingZoom]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={styles.section}
      aria-labelledby="closing-heading"
    >
      <div className={styles.frame}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span>READY WHEN YOU ARE</span>
            <span className={styles.eyebrowRule} aria-hidden="true" />
          </div>

          <h2 id="closing-heading" className={styles.headline}>
            <span>Let&apos;s turn</span>
            <span>what&apos;s next</span>
            <span>into something</span>
            <span className={styles.accent}>real.</span>
          </h2>

          <p className={styles.description}>
            Have a project, partnership, or idea worth exploring?
            <br />
            Let&apos;s start the conversation.
          </p>

          <Link
            className={styles.cta}
            href="#contact"
            aria-label="Start a project with AFAQO"
          >
            <span>START A PROJECT</span>
            <span aria-hidden="true" className={styles.ctaArrow}>
              ↗
            </span>
          </Link>
        </div>

        <div className={styles.robotArea}>
          <div className={styles.robotExhibit}>
            <div
              className={styles.robotAmbient}
              aria-hidden="true"
            />

            <div className={styles.robotViewport}>
              {shouldMount && (
                <RobotScene
                  scene={SCENE_URL}
                  onLoad={handleSceneLoad}
                  renderOnDemand
                  className={styles.spline}
                />
              )}
            </div>

            <div className={styles.robotLabel}>
              INTERACTIVE 3D / SPATIAL EXPERIENCE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default H10FinalCTA;
