"use client";

import { useEffect, useState } from "react";

export interface MotionPreference {
  shouldReduceMotion: boolean;
  isForcedMotion: boolean;
  isExplicitReducedMotion: boolean;
  systemPrefersReducedMotion: boolean;
}

function isExplicitReducedMotionRequested() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return (
    params.get("reduce-motion") === "true" ||
    params.get("reduced-motion") === "true" ||
    document.documentElement.dataset.reducedMotion === "true"
  );
}

function isForceMotionRequested() {
  if (typeof window === "undefined") return false;
  if (isExplicitReducedMotionRequested()) return false;
  const params = new URLSearchParams(window.location.search);
  return (
    params.get("force-motion") === "true" ||
    document.documentElement.dataset.forceMotion === "true"
  );
}

/**
 * Resolves motion preference for the AFAQO website based on user and system preference.
 */
export function getMotionPreference(): MotionPreference {
  if (typeof window === "undefined" || !window.matchMedia) {
    return {
      shouldReduceMotion: false,
      isForcedMotion: false,
      isExplicitReducedMotion: false,
      systemPrefersReducedMotion: false,
    };
  }

  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const systemPrefersReducedMotion = mq.matches;
  const isExplicitReducedMotion = isExplicitReducedMotionRequested();
  const isForcedMotion = isForceMotionRequested();
  const shouldReduceMotion = isExplicitReducedMotion || (systemPrefersReducedMotion && !isForcedMotion);

  return {
    shouldReduceMotion,
    isForcedMotion,
    isExplicitReducedMotion,
    systemPrefersReducedMotion,
  };
}

/**
 * React hook to observe motion preference with live change subscription.
 */
export function useMotionPreference(): MotionPreference {
  // Keep the first render identical on the server and client. The browser's
  // motion preference is applied in the effect below after hydration.
  const [preference, setPreference] = useState<MotionPreference>({
    shouldReduceMotion: false,
    isForcedMotion: false,
    isExplicitReducedMotion: false,
    systemPrefersReducedMotion: false,
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const next = getMotionPreference();
      setPreference(next);

      if (typeof document !== "undefined") {
        if (next.isForcedMotion) {
          document.documentElement.setAttribute("data-force-motion", "true");
          document.documentElement.removeAttribute("data-reduced-motion");
        } else if (next.shouldReduceMotion) {
          document.documentElement.setAttribute("data-reduced-motion", "true");
          document.documentElement.removeAttribute("data-force-motion");
        } else {
          document.documentElement.removeAttribute("data-reduced-motion");
          document.documentElement.removeAttribute("data-force-motion");
        }
      }
    };

    update();

    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } else if ("addListener" in mq) {
      // Legacy Safari / older browsers
      (mq as unknown as { addListener: (cb: (e: MediaQueryList) => void) => void }).addListener(update);
      return () =>
        (mq as unknown as { removeListener: (cb: (e: MediaQueryList) => void) => void }).removeListener(update);
    }
  }, []);

  return preference;
}

