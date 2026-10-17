"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/lib/motion-preference";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicesScrollRevealProps {
  children: React.ReactNode;
}

export function ServicesScrollReveal({ children }: ServicesScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useMotionPreference();

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (shouldReduceMotion) return;

      // 1. Hero Reveal (immediate entrance on mount)
      const heroItems = root.querySelectorAll("[data-reveal-hero-item]");
      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.1,
            clearProps: "transform",
          }
        );
      }

      // 2. Chapters (01 - 04)
      const chapters = root.querySelectorAll("[data-reveal-chapter]");
      chapters.forEach((chapter) => {
        const textElements = chapter.querySelectorAll("[data-reveal-chapter-text]");
        const mediaElement = chapter.querySelector("[data-reveal-chapter-media]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: chapter,
            start: "top 82%",
            once: true,
          },
        });

        if (textElements.length) {
          tl.fromTo(
            textElements,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.08,
              clearProps: "transform",
            },
            0
          );
        }

        if (mediaElement) {
          tl.fromTo(
            mediaElement,
            { opacity: 0, y: 50, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.0,
              ease: "power3.out",
              clearProps: "transform",
            },
            0.1
          );
        }
      });

      // 3. Technical Band (One partner. End to end.)
      const endToEndSection = root.querySelector("[data-reveal-endtoend]");
      if (endToEndSection) {
        const headerItems = endToEndSection.querySelectorAll("[data-reveal-endtoend-header]");
        if (headerItems.length) {
          gsap.fromTo(
            headerItems,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1,
              clearProps: "transform",
              scrollTrigger: {
                trigger: endToEndSection,
                start: "top 82%",
                once: true,
              },
            }
          );
        }

        const stageCards = endToEndSection.querySelectorAll("[data-reveal-stage-card]");
        if (stageCards.length) {
          gsap.fromTo(
            stageCards,
            { opacity: 0, y: 45 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.12,
              clearProps: "transform",
              scrollTrigger: {
                trigger: endToEndSection.querySelector("[data-reveal-stages-grid]") || endToEndSection,
                start: "top 82%",
                once: true,
              },
            }
          );
        }
      }

      // 4. Relevant Work Section
      const workSection = root.querySelector("[data-reveal-work]");
      if (workSection) {
        const workHeader = workSection.querySelector("[data-reveal-work-header]");
        if (workHeader) {
          gsap.fromTo(
            workHeader,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: workSection,
                start: "top 82%",
                once: true,
              },
            }
          );
        }

        const projectCards = workSection.querySelectorAll("[data-reveal-project-card]");
        if (projectCards.length) {
          gsap.fromTo(
            projectCards,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.15,
              clearProps: "transform",
              scrollTrigger: {
                trigger: workSection.querySelector("[data-reveal-projects-grid]") || workSection,
                start: "top 82%",
                once: true,
              },
            }
          );
        }
      }

      // 5. Closing CTA Section
      const ctaSection = root.querySelector("[data-reveal-cta]");
      if (ctaSection) {
        const ctaItems = ctaSection.querySelectorAll("[data-reveal-cta-item]");
        if (ctaItems.length) {
          gsap.fromTo(
            ctaItems,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.1,
              clearProps: "transform",
              scrollTrigger: {
                trigger: ctaSection,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return <div ref={containerRef}>{children}</div>;
}
