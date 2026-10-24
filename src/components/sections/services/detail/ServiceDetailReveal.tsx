"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getMotionPreference } from "@/lib/motion-preference";

export function ServiceDetailReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (getMotionPreference().shouldReduceMotion || !root.current) return;
        // Enhance visible server content; never hide sections waiting far below fold.
        root.current.querySelectorAll<HTMLElement>("[data-detail-reveal]").forEach((element, index) => {
          gsap.fromTo(element, { y: 14 }, {
            y: 0,
            duration: 0.55,
            delay: element.tagName === "ARTICLE" ? (index % 2) * 0.06 : 0,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
      });
    }, root);
    return () => { media.revert(); context.revert(); };
  }, []);

  return <div ref={root}>{children}</div>;
}
