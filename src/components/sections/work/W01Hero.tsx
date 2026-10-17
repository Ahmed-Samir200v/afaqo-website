"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/lib/motion-preference";
import styles from "./Work.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function W01Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const eyebrowLineRef = useRef<HTMLSpanElement>(null);
  const lineWrap1Ref = useRef<HTMLSpanElement>(null);
  const lineWrap2Ref = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const actionRef = useRef<HTMLAnchorElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const { shouldReduceMotion } = useMotionPreference();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Reduced motion: immediate static display with no transforms or animation masks
      if (shouldReduceMotion) {
        if (eyebrowLineRef.current) gsap.set(eyebrowLineRef.current, { scaleX: 1, opacity: 1 });
        if (titleLine1Ref.current) gsap.set(titleLine1Ref.current, { yPercent: 0, opacity: 1 });
        if (titleLine2Ref.current) gsap.set(titleLine2Ref.current, { yPercent: 0, opacity: 1 });
        if (introRef.current) gsap.set(introRef.current, { y: 0, opacity: 1 });
        if (actionRef.current) gsap.set(actionRef.current, { y: 0, opacity: 1 });
        if (railRef.current) gsap.set(railRef.current, { y: 0, opacity: 1 });
        return;
      }

      // 2. Normal motion entrance timeline
      gsap.set(eyebrowLineRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.set([titleLine1Ref.current, titleLine2Ref.current], { yPercent: 110, opacity: 0 });
      gsap.set(introRef.current, { y: 20, opacity: 0 });
      gsap.set([actionRef.current, railRef.current].filter(Boolean), { y: 15, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Step 1: Eyebrow rule draws over 0.45s at +100ms
      tl.to(
        eyebrowLineRef.current,
        {
          scaleX: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        0.1
      );

      // Step 2: First title line reveals through overflow mask at +180ms over 0.8s
      tl.to(
        titleLine1Ref.current,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
        },
        0.18
      );

      // Step 3: Accent line follows 100ms later (at +280ms) over 0.85s
      tl.to(
        titleLine2Ref.current,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
        },
        0.28
      );

      // Step 4: Intro reveals at approximately +520ms over 0.55s
      tl.to(
        introRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
        },
        0.52
      );

      // Step 5: Scroll action and factual rail reveal at +650ms over 0.45s
      tl.to(
        [actionRef.current, railRef.current].filter(Boolean),
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        },
        0.65
      );

      // Scroll departure: subtle upward translation and fade as section exits
      if (contentWrapperRef.current) {
        gsap.to(contentWrapperRef.current, {
          y: -24,
          opacity: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section ref={sectionRef} className={styles.heroSection} aria-labelledby="work-hero-heading">
      <div className="page-container">
        <div ref={contentWrapperRef} className={styles.heroGrid}>
          {/* Main Editorial Column */}
          <div className={styles.heroMainColumn}>
            <div className={styles.eyebrow}>
              <span>01 / WORK</span>
              <span ref={eyebrowLineRef} className={styles.eyebrowLine} aria-hidden="true" />
            </div>

            <h1 id="work-hero-heading" className={styles.heroHeading}>
              <span ref={lineWrap1Ref} className={styles.lineMask}>
                <span ref={titleLine1Ref} className={styles.lineInner}>
                  Ideas made
                </span>
              </span>
              <span ref={lineWrap2Ref} className={styles.lineMask}>
                <span ref={titleLine2Ref} className={`${styles.lineInner} ${styles.headingAccent}`}>
                  tangible.
                </span>
              </span>
            </h1>

            <p ref={introRef} className={styles.heroIntro}>
              A selection of immersive experiences, interactive environments, and digital
              projects brought to life through design, 3D production, and technology.
            </p>

            <a
              ref={actionRef}
              href="#featured-work"
              className={styles.scrollAction}
              aria-label="Scroll to featured work"
            >
              <span className={styles.scrollActionIcon} aria-hidden="true">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.scrollArrowSvg}
                >
                  <path
                    d="M7 2.5V11.5M7 11.5L3 7.5M7 11.5L11 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className={styles.scrollActionText}>EXPLORE OUR WORK</span>
            </a>
          </div>

          {/* Factual Index Rail */}
          <aside ref={railRef} className={styles.heroIndexRail} aria-label="Portfolio index summary">
            <div className={styles.railItem}>
              <span className={styles.railValue}>03</span>
              <span className={styles.railLabel}>PUBLISHED PROJECTS</span>
            </div>
            <div className={styles.railDivider} aria-hidden="true" />
            <div className={styles.railItem}>
              <span className={styles.railValue}>04</span>
              <span className={styles.railLabel}>CORE DISCIPLINES</span>
            </div>
            <div className={styles.railDivider} aria-hidden="true" />
            <div className={styles.railItem}>
              <span className={styles.railValueLocation}>CAIRO</span>
              <span className={styles.railLabel}>WORKING GLOBALLY</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
