"use client";

import { useEffect, useState } from "react";

export interface MotionPreference {
  shouldReduceMotion: boolean;
  isForcedMotion: boolean;
  isExplicitReducedMotion: boolean;
  systemPrefersReducedMotion: boolean;
}

/**
 * Resolves motion preference for the AFAQO website.
 *
 * Rules:
 * 1. Development/Testing Override:
 *    - `?force-motion=true` forces full motion mode even if OS animation effects are off.
 *    - `?reduced-motion=true` forces reduced motion mode for accessibility verification.
 * 2. Normal Production Mode:
 *    - Strictly honors `window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
 */
export function getMotionPreference(): MotionPreference {
  if (typeof window === "undefined") {
    return {
      shouldReduceMotion: false,
      isForcedMotion: false,
      isExplicitReducedMotion: false,
      systemPrefersReducedMotion: false,
    };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const isExplicitReducedMotion = searchParams.get("reduced-motion") === "true";
  const isForcedMotion = searchParams.get("force-motion") === "true";
  const systemPrefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Development overrides take precedence for inspection & verification
  if (isExplicitReducedMotion) {
    return {
      shouldReduceMotion: true,
      isForcedMotion: false,
      isExplicitReducedMotion: true,
      systemPrefersReducedMotion,
    };
  }

  if (isForcedMotion) {
    return {
      shouldReduceMotion: false,
      isForcedMotion: true,
      isExplicitReducedMotion: false,
      systemPrefersReducedMotion,
    };
  }

  // Normal Production: strictly respect system preference
  return {
    shouldReduceMotion: systemPrefersReducedMotion,
    isForcedMotion: false,
    isExplicitReducedMotion: false,
    systemPrefersReducedMotion,
  };
}

const defaultPreference: MotionPreference = {
  shouldReduceMotion: false,
  isForcedMotion: false,
  isExplicitReducedMotion: false,
  systemPrefersReducedMotion: false,
};

/**
 * React hook to observe motion preference dynamically with listener support.
 */
export function useMotionPreference(): MotionPreference {
  const [preference, setPreference] = useState<MotionPreference>(defaultPreference);

  useEffect(() => {
    const update = () => {
      const pref = getMotionPreference();
      setPreference(pref);

      if (typeof document !== "undefined") {
        if (pref.isForcedMotion) {
          document.documentElement.setAttribute("data-force-motion", "true");
          document.documentElement.removeAttribute("data-reduced-motion");
        } else if (pref.shouldReduceMotion) {
          document.documentElement.setAttribute("data-reduced-motion", "true");
          document.documentElement.removeAttribute("data-force-motion");
        } else {
          document.documentElement.removeAttribute("data-force-motion");
          document.documentElement.removeAttribute("data-reduced-motion");
        }
      }
    };

    update();

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return preference;
}
