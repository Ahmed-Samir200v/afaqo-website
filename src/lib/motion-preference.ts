"use client";

import { useEffect, useState } from "react";

export interface MotionPreference {
  shouldReduceMotion: boolean;
  isForcedMotion: boolean;
  isExplicitReducedMotion: boolean;
  systemPrefersReducedMotion: boolean;
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

  return {
    shouldReduceMotion: systemPrefersReducedMotion,
    isForcedMotion: false,
    isExplicitReducedMotion: systemPrefersReducedMotion,
    systemPrefersReducedMotion,
  };
}

/**
 * React hook to observe motion preference with live change subscription.
 */
export function useMotionPreference(): MotionPreference {
  const [preference, setPreference] = useState<MotionPreference>(() => getMotionPreference());

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      const reduced = e.matches;
      setPreference({
        shouldReduceMotion: reduced,
        isForcedMotion: false,
        isExplicitReducedMotion: reduced,
        systemPrefersReducedMotion: reduced,
      });

      if (typeof document !== "undefined") {
        if (reduced) {
          document.documentElement.setAttribute("data-reduced-motion", "true");
          document.documentElement.removeAttribute("data-force-motion");
        } else {
          document.documentElement.removeAttribute("data-reduced-motion");
        }
      }
    };

    update(mq);

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

