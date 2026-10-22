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
      if (shouldReduceMotion) {
        // Immediate reveal without motion
        gsap.set(
          root.querySelectorAll(
            "[data-reveal-hero-bg], [data-reveal-hero-item], [data-reveal-service-intro-text] > *, [data-reveal-service-media], [data-reveal-capability-card], [data-reveal-endtoend-header] > *, [data-reveal-stage-card], [data-reveal-work-header] > *, [data-reveal-project-card], [data-reveal-cta-item]"
          ),
          { opacity: 1, clearProps: "all" }
        );
        return;
      }

      // 1. Hero Reveal (immediate entrance on mount, duration 550ms, y 16px max)
      const heroBg = root.querySelector("[data-reveal-hero-bg]");
      if (heroBg) {
        gsap.fromTo(
          heroBg,
          { opacity: 0.8 },
          {
            opacity: 1,
            duration: 0.65,
            ease: "power2.out",
            clearProps: "opacity",
          }
        );
      }

      const heroItems = root.querySelectorAll("[data-reveal-hero-item]");
      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.07,
            delay: 0.1,
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
            start: "top 85%",
            once: true,
          },
        });

        if (introTextElements.length) {
          tl.fromTo(
            introTextElements,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.06,
              clearProps: "transform",
            },
            0
          );
        }

        if (mediaElement) {
          tl.fromTo(
            mediaElement,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.58,
              ease: "power2.out",
              clearProps: "transform",
            },
            0.08
          );
        }

        if (capabilityCards.length) {
          tl.fromTo(
            capabilityCards,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.06,
              clearProps: "transform",
            },
            0.15
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
            start: "top 85%",
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
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.06,
              clearProps: "transform",
            },
            0
          );
        }

        if (stageCards.length) {
          tl.fromTo(
            stageCards,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.06,
              clearProps: "transform",
            },
            0.12
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
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: workSection,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        const projectCards = workSection.querySelectorAll("[data-reveal-project-card]");
        if (projectCards.length) {
          gsap.fromTo(
            projectCards,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.07,
              clearProps: "transform",
              scrollTrigger: {
                trigger: workSection.querySelector("[data-reveal-projects-grid]") || workSection,
                start: "top 85%",
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
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.06,
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
