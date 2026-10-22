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
      const heroBg = root.querySelector("[data-reveal-hero-bg]");
      if (heroBg) {
        gsap.fromTo(
          heroBg,
          { opacity: 0.8 },
          {
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
            clearProps: "opacity",
          }
        );
      }

      const heroItems = root.querySelectorAll("[data-reveal-hero-item]");
      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.15,
            clearProps: "transform",
          }
        );
      }

      // 2. Service Sections (01 - 04)
      const serviceSections = root.querySelectorAll(
        "[data-reveal-service-section], [data-reveal-chapter]"
      );
      serviceSections.forEach((section) => {
        const introTextElements = section.querySelectorAll(
          "[data-reveal-service-intro-text] > *, [data-reveal-chapter-text]"
        );
        const mediaElement = section.querySelector(
          "[data-reveal-service-media], [data-reveal-chapter-media]"
        );
        const capabilityCards = section.querySelectorAll(
          "[data-reveal-capability-card]"
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });

        if (introTextElements.length) {
          tl.fromTo(
            introTextElements,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power2.out",
              stagger: 0.07,
              clearProps: "transform",
            },
            0
          );
        }

        if (mediaElement) {
          tl.fromTo(
            mediaElement,
            { opacity: 0, y: 20, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              clearProps: "transform",
            },
            0.1
          );
        }

        if (capabilityCards.length) {
          tl.fromTo(
            capabilityCards,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power2.out",
              stagger: 0.07,
              clearProps: "transform",
            },
            0.2
          );
        }
      });

      // 3. Technical Band (System Architecture: One partner. End to end.)
      const endToEndSection = root.querySelector("[data-reveal-endtoend]");
      if (endToEndSection) {
        const headerElements = endToEndSection.querySelectorAll(
          "[data-reveal-endtoend-header] > *"
        );
        const stageCards = endToEndSection.querySelectorAll(
          "[data-reveal-stage-card]"
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: endToEndSection,
            start: "top 82%",
            once: true,
          },
        });

        if (headerElements.length) {
          tl.fromTo(
            headerElements,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.08,
              clearProps: "transform",
            },
            0
          );
        }

        if (stageCards.length) {
          tl.fromTo(
            stageCards,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power2.out",
              stagger: 0.08,
              clearProps: "transform",
            },
            0.15
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
