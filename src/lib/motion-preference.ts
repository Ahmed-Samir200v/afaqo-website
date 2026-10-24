"use client";

import { useEffect, useState } from "react";

export interface MotionPreference {
  shouldReduceMotion: boolean;
  isForcedMotion: boolean;
  isExplicitReducedMotion: boolean;
  systemPrefersReducedMotion: boolean;
}

function isForceMotionRequested() {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  if (params.get("reduce-motion") === "true") return false;
  return params.get("force-motion") === "true" || document.documentElement.dataset.forceMotion === "true";
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
  const isForcedMotion = isForceMotionRequested() || new URLSearchParams(window.location.search).get("reduce-motion") !== "true";

  return {
    shouldReduceMotion: systemPrefersReducedMotion && !isForcedMotion,
    isForcedMotion,
    isExplicitReducedMotion: systemPrefersReducedMotion && !isForcedMotion,
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
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      const reduced = e.matches;
      const isForcedMotion = isForceMotionRequested();
      setPreference({
        shouldReduceMotion: reduced && !isForcedMotion,
        isForcedMotion,
        isExplicitReducedMotion: reduced && !isForcedMotion,
        systemPrefersReducedMotion: reduced,
      });

      if (typeof document !== "undefined") {
        if (isForcedMotion) {
          document.documentElement.setAttribute("data-force-motion", "true");
          document.documentElement.removeAttribute("data-reduced-motion");
        } else if (reduced) {
          document.documentElement.setAttribute("data-reduced-motion", "true");
          document.documentElement.removeAttribute("data-force-motion");
        } else {
          document.documentElement.removeAttribute("data-reduced-motion");
          document.documentElement.removeAttribute("data-force-motion");
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

