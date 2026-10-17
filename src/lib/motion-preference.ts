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
 * Animations are permanently enabled across all devices and operating system settings.
 */
export function getMotionPreference(): MotionPreference {
  return {
    shouldReduceMotion: false,
    isForcedMotion: true,
    isExplicitReducedMotion: false,
    systemPrefersReducedMotion: false,
  };
}

const alwaysMotionPreference: MotionPreference = {
  shouldReduceMotion: false,
  isForcedMotion: true,
  isExplicitReducedMotion: false,
  systemPrefersReducedMotion: false,
};

/**
 * React hook to observe motion preference.
 * Animations are permanently enabled.
 */
export function useMotionPreference(): MotionPreference {
  const [preference] = useState<MotionPreference>(alwaysMotionPreference);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-force-motion", "true");
      document.documentElement.removeAttribute("data-reduced-motion");
    }
  }, []);

  return preference;
}
