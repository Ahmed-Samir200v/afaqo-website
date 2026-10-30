"use client";

import { useRef } from "react";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMotionPreference } from "@/lib/motion-preference";
import styles from "./Work.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// Precision Blue SVG Icons for the 3 Floating UI Cards (34x34 container)
// ---------------------------------------------------------------------------

function CaptureRealityIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 5v2M12 17v2M5 12h2M17 12h2" />
    </svg>
  );
}

function DigitalTwinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
      <path d="M12 12v10" />
      <path d="M12 2v5" />
    </svg>
  );
}

function SimulationIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M9 6h6M18 9v6M15 18H9M6 15V9" />
      <path d="M8.5 8.5l7 7" strokeDasharray="2 2" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// W01Hero Component — Cinematic Work Hero Specification
// ---------------------------------------------------------------------------

export function W01Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowLineRef = useRef<HTMLSpanElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const actionRef = useRef<HTMLAnchorElement>(null);

  // Visual Stage References
  const visualRegionRef = useRef<HTMLDivElement>(null);
  const imageElementRef = useRef<HTMLDivElement>(null);

  // Floating Cards References (Separate Entrance vs Floating Wrapper)
  const card1EntranceRef = useRef<HTMLDivElement>(null);
  const card1FloatingRef = useRef<HTMLDivElement>(null);
  const card2EntranceRef = useRef<HTMLDivElement>(null);
  const card2FloatingRef = useRef<HTMLDivElement>(null);
  const card3EntranceRef = useRef<HTMLDivElement>(null);
  const card3FloatingRef = useRef<HTMLDivElement>(null);

  // SVG Connector Lines
  const connector1Ref = useRef<SVGPathElement>(null);
  const connector2Ref = useRef<SVGPathElement>(null);
  const connector3Ref = useRef<SVGPathElement>(null);
  const dot1Ref = useRef<SVGGElement>(null);
  const dot2Ref = useRef<SVGGElement>(null);
  const dot3Ref = useRef<SVGGElement>(null);

  const { shouldReduceMotion } = useMotionPreference();

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // 1. Reduced motion: immediate static display, no entrance transforms, floating or parallax
      if (shouldReduceMotion) {
        gsap.set(
          [
            eyebrowLineRef.current,
            titleLine1Ref.current,
            titleLine2Ref.current,
            introRef.current,
            actionRef.current,
            imageElementRef.current,
            card1EntranceRef.current,
            card2EntranceRef.current,
            card3EntranceRef.current,
            card1FloatingRef.current,
            card2FloatingRef.current,
            card3FloatingRef.current,
            dot1Ref.current,
            dot2Ref.current,
            dot3Ref.current,
          ].filter(Boolean),
          { opacity: 1, scale: 1, y: 0, yPercent: 0, scaleX: 1 }
        );
        [connector1Ref.current, connector2Ref.current, connector3Ref.current]
          .filter(Boolean)
          .forEach((path) => {
            if (path) gsap.set(path, { opacity: 1, strokeDashoffset: 0 });
          });
        return;
      }

      // 2. Initial state setup for motion
      gsap.set(eyebrowLineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set([titleLine1Ref.current, titleLine2Ref.current], { yPercent: 110, opacity: 0 });
      gsap.set(introRef.current, { y: 22, opacity: 0 });
      gsap.set(actionRef.current, { y: 18, opacity: 0 });

      // Factory entrance initial: scale 1.035, opacity 0
      gsap.set(imageElementRef.current, { opacity: 0, scale: 1.035, transformOrigin: "center center" });

      // Cards entrance initial
      gsap.set(
        [card1EntranceRef.current, card2EntranceRef.current, card3EntranceRef.current].filter(Boolean),
        { opacity: 0, y: 20, scale: 0.96 }
      );

      // SVG connectors line setup for 0.8s draw
      const paths = [connector1Ref.current, connector2Ref.current, connector3Ref.current].filter(
        (p): p is SVGPathElement => Boolean(p)
      );
      paths.forEach((path) => {
        try {
          const length = path.getTotalLength() || 200;
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
        } catch {
          gsap.set(path, { opacity: 0 });
        }
      });

      gsap.set([dot1Ref.current, dot2Ref.current, dot3Ref.current].filter(Boolean), {
        opacity: 0,
        scale: 0,
        transformOrigin: "center center",
      });

      // 3. Master Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Eyebrow line draws
      tl.to(eyebrowLineRef.current, { scaleX: 1, duration: 0.45, ease: "power2.out" }, 0.1);

      // Headline: masked reveal, 0.8s
      tl.to(titleLine1Ref.current, { yPercent: 0, opacity: 1, duration: 0.8 }, 0.18);
      tl.to(titleLine2Ref.current, { yPercent: 0, opacity: 1, duration: 0.8 }, 0.28);

      // Intro description & CTA
      tl.to(introRef.current, { y: 0, opacity: 1, duration: 0.6 }, 0.42);
      tl.to(actionRef.current, { y: 0, opacity: 1, duration: 0.5 }, 0.52);

      // Factory: opacity and scale 1.035 → 1, 1.1s
      tl.to(
        imageElementRef.current,
        { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" },
        0.3
      );

      // Connector drawing: 0.8s
      paths.forEach((path, i) => {
        tl.to(
          path,
          { opacity: 1, strokeDashoffset: 0, duration: 0.8, ease: "power2.out" },
          0.6 + i * 0.1
        );
      });

      // Connection dots scale and fade in
      tl.to(
        [dot1Ref.current, dot2Ref.current, dot3Ref.current].filter(Boolean),
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(2)" },
        0.8
      );

      // Card entrances: stagger 0.15s, duration 0.6s
      tl.to(
        [card1EntranceRef.current, card2EntranceRef.current, card3EntranceRef.current].filter(Boolean),
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        },
        0.7
      );

      // 4. Continuous floating loops (applied to floating wrappers to prevent transform conflicts)
      // Floating amplitude: ±6–8px. Floating periods: 4.5s, 5.2s, 6s.
      if (card1FloatingRef.current) {
        gsap.to(card1FloatingRef.current, {
          y: -7,
          duration: 2.25,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (card2FloatingRef.current) {
        gsap.to(card2FloatingRef.current, {
          y: 7,
          duration: 2.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 0.4,
        });
      }

      if (card3FloatingRef.current) {
        gsap.to(card3FloatingRef.current, {
          y: -7,
          duration: 3.0,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 0.8,
        });
      }

      // 5. Scroll parallax: maximum 20px
      if (imageElementRef.current && sectionRef.current) {
        gsap.to(imageElementRef.current, {
          y: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [shouldReduceMotion] }
  );

  return (
    <section ref={sectionRef} className={styles.heroSection} aria-labelledby="work-hero-heading">
      <div className={styles.heroContainer}>
        <div className={styles.heroGrid}>
          {/* ====================================================================
              1 & 2. LEFT CONTENT REGION (500–530px, 40% ratio)
              ==================================================================== */}
          <div className={styles.heroMainColumn}>
            {/* Eyebrow: 01 / WORK, 12px, 2px letter-spacing */}
            <div className={styles.eyebrow}>
              <span>01 / WORK</span>
              <span ref={eyebrowLineRef} className={styles.eyebrowLine} aria-hidden="true" />
            </div>

            {/* Headline: clamp(64px, 6vw, 88px), line-height 1.05, 2 lines */}
            <h1 id="work-hero-heading" className={styles.heroHeading}>
              <span className={styles.lineMask}>
                <span ref={titleLine1Ref} className={styles.lineInner}>
                  Ideas made
                </span>
              </span>
              <span className={styles.lineMask}>
                <span ref={titleLine2Ref} className={`${styles.lineInner} ${styles.headingAccent}`}>
                  tangible.
                </span>
              </span>
            </h1>

            {/* Description: 18px, line-height 1.65, max-width 510px */}
            <p ref={introRef} className={styles.heroIntro}>
              Explore selected work across interactive environments, industrial visualization and
              immersive experiences—each shaped by a specific technical or user challenge.
            </p>

            {/* CTA Button — Final element in the left column */}
            <div className={styles.heroActionRow}>
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
          </div>

          {/* ====================================================================
              3, 4 & 5. RIGHT VISUAL REGION (780 × 620px, 60% ratio)
              ==================================================================== */}
          <div ref={visualRegionRef} className={styles.visualRegion}>
            {/* Facility image container: vertically centered, seamless multiply blend */}
            <div ref={imageElementRef} className={styles.facilityImageWrapper}>
              <ResponsiveImage
                src="/images/work/work-hero.png"
                alt="AFAQO Industrial Facility Real-to-Wireframe Digital Twin"
                width={1920}
                height={1080}
                priority
                sizes="(min-width: 1440px) 780px, (min-width: 1024px) 58vw, 100vw"
                className={styles.facilityImage}
              />
            </div>

            {/* Technical Connectors: SVG overlay (viewBox="0 0 780 620", stroke: rgba(8,102,255,0.30), 1px) */}
            <svg
              className={styles.connectorsSvg}
              viewBox="0 0 780 620"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Path 1: Card 1 (01 — Capture Reality) to physical facility pump at (320, 310) */}
              <path
                ref={connector1Ref}
                d="M 255 116 C 290 116, 295 230, 320 310"
                className={styles.connectorPath}
              />
              {/* Path 2: Card 2 (02 — Build Digitalization) to distillation column top at (555, 155) */}
              <path
                ref={connector2Ref}
                d="M 635 107 C 635 135, 585 135, 555 155"
                className={styles.connectorPath}
              />
              {/* Path 3: Card 3 (03 — Interactive Simulation) to wireframe system at (635, 430) */}
              <path
                ref={connector3Ref}
                d="M 635 510 C 635 470, 635 460, 635 430"
                className={styles.connectorPath}
              />

              {/* Anchor Dots: 6px diameter (r=3) */}
              <g ref={dot1Ref}>
                <circle cx="320" cy="310" r="3" fill="#0866FF" />
                <circle cx="320" cy="310" r="7" fill="none" stroke="rgba(8,102,255,0.35)" strokeWidth="1" />
              </g>
              <g ref={dot2Ref}>
                <circle cx="555" cy="155" r="3" fill="#0866FF" />
                <circle cx="555" cy="155" r="7" fill="none" stroke="rgba(8,102,255,0.35)" strokeWidth="1" />
              </g>
              <g ref={dot3Ref}>
                <circle cx="635" cy="430" r="3" fill="#0866FF" />
                <circle cx="635" cy="430" r="7" fill="none" stroke="rgba(8,102,255,0.35)" strokeWidth="1" />
              </g>
            </svg>

            {/* Floating Card 1: 01 — Capture Reality */}
            <div ref={card1EntranceRef} className={`${styles.cardEntranceWrapper} ${styles.card1Pos}`}>
              <div ref={card1FloatingRef} className={styles.cardFloatingInner}>
                <div className={styles.cardIconBox}>
                  <CaptureRealityIcon />
                </div>
                <div className={styles.cardTextBlock}>
                  <span className={styles.cardTitle}>01 — Capture Reality</span>
                  <span className={styles.cardSubtitle}>From site to 3D</span>
                </div>
              </div>
            </div>

            {/* Floating Card 2: 02 — Build Digitalization */}
            <div ref={card2EntranceRef} className={`${styles.cardEntranceWrapper} ${styles.card2Pos}`}>
              <div ref={card2FloatingRef} className={styles.cardFloatingInner}>
                <div className={styles.cardIconBox}>
                  <DigitalTwinIcon />
                </div>
                <div className={styles.cardTextBlock}>
                  <span className={styles.cardTitle}>02 — Build Digitalization</span>
                  <span className={styles.cardSubtitle}>Accurate &amp; scalable</span>
                </div>
              </div>
            </div>

            {/* Floating Card 3: 03 — Interactive Simulation */}
            <div ref={card3EntranceRef} className={`${styles.cardEntranceWrapper} ${styles.card3Pos}`}>
              <div ref={card3FloatingRef} className={styles.cardFloatingInner}>
                <div className={styles.cardIconBox}>
                  <SimulationIcon />
                </div>
                <div className={styles.cardTextBlock}>
                  <span className={styles.cardTitle}>03 — Interactive Simulation</span>
                  <span className={styles.cardSubtitle}>Explore, train, optimize</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
