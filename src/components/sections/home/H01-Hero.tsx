"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { homeContent } from "@/content/global/home";
import { useMotionPreference } from "@/lib/motion-preference";
import MoltenMetal from "@/components/ui/MoltenMetal";
import { HeroPointerFX } from "./HeroPointerFX";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  (window as unknown as { ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
}

// Typographical weights for initial and scrolled headlines (Issue 02)
const INITIAL_LINE_WEIGHTS = [300, 600, 500, 300]; // Light, Bold, Medium, Light
const SCROLLED_LINE_WEIGHTS = [500, 600, 400]; // Medium, Bold, Light/Regular

export function H01Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const bgScrollRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const moltenWrapperRef = useRef<HTMLDivElement>(null);
  const headline1LineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const headline2LineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);

  const { hero } = homeContent;
  const { shouldReduceMotion } = useMotionPreference();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validLines1 = headline1LineRefs.current.filter(Boolean);
      const validLines2 = headline2LineRefs.current.filter(Boolean);

      if (shouldReduceMotion) {
        // Reduced motion: static presentation without 3D rotation, pinning or blur
        if (bgImageRef.current) gsap.set(bgImageRef.current, { opacity: 1, scale: 1 });
        if (validLines1.length > 0) gsap.set(validLines1, { opacity: 0, display: "none" });
        if (validLines2.length > 0) gsap.set(validLines2, { opacity: 1, yPercent: 0, rotateX: 0, z: 0 });
        if (bodyRef.current) gsap.set(bodyRef.current, { opacity: 1, y: 0 });
        if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, y: 0 });
        if (metadataRef.current) gsap.set(metadataRef.current, { opacity: 1, y: 0 });
        if (moltenWrapperRef.current) gsap.set(moltenWrapperRef.current, { opacity: 0.18, scale: 1, y: 0 });
        return;
      }

      // Initial state: Headline 1 starts prepared for masked reveal; Headline 2 queued below mask with 3D angle
      if (validLines1.length > 0) {
        gsap.set(validLines1, { y: 0, yPercent: 115, rotateX: 0, z: 0, opacity: 0 });
      }
      if (validLines2.length > 0) {
        gsap.set(validLines2, { y: 0, yPercent: 120, rotateX: 16, z: -35, opacity: 0 });
      }

      // ====================================================================
      // 1. INTRO ANIMATION TIMELINE (Editorial & Coordinated)
      // ====================================================================
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 0.00s: Background Image resolves gently
      if (bgImageRef.current) {
        introTl.fromTo(
          bgImageRef.current,
          { opacity: 0, scale: 1.045 },
          { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
          0
        );
      }

      // 0.22s: Masked Initial Headline lines reveal
      validLines1.forEach((line, idx) => {
        introTl.to(
          line,
          {
            yPercent: 0,
            rotateX: 0,
            z: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power4.out",
          },
          0.22 + idx * 0.08
        );
      });

      // 0.65s: Body copy reveals
      if (bodyRef.current) {
        introTl.fromTo(
          bodyRef.current,
          { y: 24, opacity: 0 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          0.65
        );
      }

      // 0.78s: CTA reveals
      if (ctaRef.current) {
        introTl.fromTo(
          ctaRef.current,
          { y: 18, opacity: 0 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          0.78
        );
      }

      // 0.92s: Bottom Metadata reveals
      if (metadataRef.current) {
        introTl.fromTo(
          metadataRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          0.92
        );
      }

      // ====================================================================
      // 2. RESPONSIVE PINNED SCROLL CHOREOGRAPHY
      // Desktop (>= 1024px): Capped fluid scroll (~650-880px pin distance)
      // Mobile / Tablet (< 1024px): Unpinned clean flow, no scroll trap
      // ====================================================================
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!containerRef.current) return;
        // Capped viewport-based calculation to eliminate desktop scroll fatigue
        const scrollDistance = Math.min(Math.max(window.innerHeight * 0.85, 650), 880);

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Background subtle depth shift during pin
        if (bgScrollRef.current) {
          scrollTl.to(
            bgScrollRef.current,
            { scale: 1.04, y: -20, ease: "none" },
            0
          );
        }

        // Molten Metal depth response
        if (moltenWrapperRef.current) {
          scrollTl.to(
            moltenWrapperRef.current,
            { opacity: 0.12, y: -16, scale: 1.03, ease: "none" },
            0
          );
        }

        // ------------------------------------------------------------------
        // PHASE A: INITIAL MESSAGE HOLD (0.00 -> 0.15)
        // ------------------------------------------------------------------
        scrollTl.to({}, { duration: 0.15 });

        // ------------------------------------------------------------------
        // PHASE B: CINEMATIC 3D HEADLINE TRANSFORMATION (0.15 -> 0.60)
        // Outgoing lines move up, rotate around X axis, shift back in Z, and fade
        // Incoming lines enter from below with perspective angle and settle flat
        // ------------------------------------------------------------------
        validLines1.forEach((line, idx) => {
          scrollTl.to(
            line,
            {
              y: 0,
              yPercent: -120,
              rotateX: -16,
              z: -35,
              opacity: 0,
              ease: "power2.inOut",
              duration: 0.22,
            },
            0.15 + idx * 0.04
          );
        });

        validLines2.forEach((line, idx) => {
          scrollTl.fromTo(
            line,
            {
              y: 0,
              yPercent: 120,
              rotateX: 16,
              z: -35,
              opacity: 0,
            },
            {
              y: 0,
              yPercent: 0,
              rotateX: 0,
              z: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 0.28,
            },
            0.26 + idx * 0.05
          );
        });

        // ------------------------------------------------------------------
        // PHASE C: FINAL MESSAGE HOLD (0.60 -> 0.88)
        // Second headline remains 100% visible, fully settled, and readable
        // ------------------------------------------------------------------
        scrollTl.to({}, { duration: 0.28 });

        // ------------------------------------------------------------------
        // PHASE D: CLEAN EDITORIAL RELEASE TO H02 (0.88 -> 1.00)
        // Outgoing visual layer releases gently with subtle lift, zero blur
        // ------------------------------------------------------------------
        if (contentWrapperRef.current && bgScrollRef.current) {
          scrollTl.to(
            [contentWrapperRef.current, bgScrollRef.current],
            {
              opacity: 0.94,
              y: -12,
              ease: "power1.out",
              duration: 0.12,
            },
            0.88
          );
        }

        if (metadataRef.current) {
          scrollTl.to(metadataRef.current, { opacity: 0.72, y: -8, ease: "none", duration: 0.12 }, 0.88);
        }
      });

      // Mobile & Tablet Collapse (< 1024px): No pinning, Headline 1 remains prominent
      mm.add("(max-width: 1023px)", () => {
        if (validLines2.length > 0) {
          gsap.set(validLines2, { opacity: 0, display: "none" });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: "var(--color-canvas-dark)",
        color: "var(--color-text-on-dark)",
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "clamp(6rem, 9vw, 8rem)",
        overflow: "hidden",
      }}
      aria-label="AFAQO Hero Presentation"
    >
      {/* ====================================================================
          Z0: APPROVED HERO BACKGROUND IMAGE (Stable Architectural Layer)
          ==================================================================== */}
      <div
        ref={bgScrollRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
          pointerEvents: "none",
          willChange: "transform, filter, opacity",
        }}
      >
        <Image
          ref={bgImageRef}
          src="/images/hero/afaqo-hero-desktop.jpg"
          alt="AFAQO Cinematic Spatial Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{
            opacity: 0,
            filter: "brightness(0.98) contrast(1.05)",
          }}
        />
      </div>

      {/* ====================================================================
          Z1: RESTRAINED NAVY READABILITY GRADIENT OVERLAYS
          ==================================================================== */}
      {/* 1. Left Dominant Gradient (Headline Readability Protection) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(5,13,36,0.92) 0%, rgba(5,13,36,0.72) 34%, rgba(5,13,36,0.28) 60%, rgba(5,13,36,0.05) 100%)",
        }}
      />

      {/* 2. Bottom Transition Gradient (Smooth transition into H02) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, transparent 55%, rgba(5,13,36,0.50) 100%)",
        }}
      />

      {/* 3. Top Floating Glass Bar Grounding Gradient */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(5,13,36,0.48) 0%, transparent 20%)",
        }}
      />

      {/* ====================================================================
          Z2: REACT BITS MOLTEN METAL (Spatial Energy)
          ==================================================================== */}
      <div
        ref={moltenWrapperRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "clamp(380px, 62vw, 920px)",
          height: "clamp(340px, 72vh, 800px)",
          pointerEvents: "none",
          zIndex: 2,
          mixBlendMode: "screen",
          opacity: 0.22,
          maskImage:
            "radial-gradient(ellipse at 70% 60%, black 24%, transparent 74%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 60%, black 24%, transparent 74%)",
        }}
      >
        <MoltenMetal
          colors={["#0866FF", "#00D1FF"]}
          coreColor="#FFFFFF"
          backgroundColor="transparent"
          opacity={1}
          speed={0.24}
          scale={3.5}
          detail={3}
          glow={1.5}
          thickness={0.88}
          swirl={0.8}
          paused={shouldReduceMotion}
          mouseInteraction={!shouldReduceMotion}
        />
      </div>

      {/* ====================================================================
          Z3: CURSOR ENERGY HALO & MICRO SPARKS (HeroPointerFX)
          ==================================================================== */}
      <HeroPointerFX containerRef={containerRef} />

      {/* ====================================================================
          Z4: ARCHITECTURAL HAIRLINE GRID (Subtle depth)
          ==================================================================== */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.012) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.45,
        }}
      />

      {/* ====================================================================
          Z5: HERO EDITORIAL CONTENT & HEADLINE STAGE
          ==================================================================== */}
      <div
        ref={contentWrapperRef}
        className="page-container"
        style={{
          position: "relative",
          zIndex: 5,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "var(--page-max-width, 1440px)",
          paddingBottom: "clamp(1.5rem, 3vh, 3rem)",
          willChange: "transform, filter, opacity",
        }}
      >
        {/* DOMINANT EDITORIAL FIELD: Dual Headline Container with Layout Lock & 3D Perspective */}
        <div
          style={{
            maxWidth: "clamp(680px, 74vw, 1080px)",
            position: "relative",
            perspective: "1200px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              alignItems: "start",
            }}
          >
            {/* INITIAL 4-LINE HEADLINE (Issue 02 Typography & Hierarchy) */}
            <h1
              aria-hidden={shouldReduceMotion ? "true" : undefined}
              style={{
                gridArea: "1 / 1",
                fontFamily: "var(--font-manrope)",
                fontSize: "clamp(2.45rem, 4.2vw, 3.85rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                color: "var(--color-brand-white)",
                margin: 0,
                display: shouldReduceMotion ? "none" : "block",
              }}
            >
              {hero.initialHeadline.map((line, idx) => (
                <span
                  key={`init-${line}`}
                  style={{
                    display: "block",
                    overflow: "hidden",
                    paddingBlock: "0.08em",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span
                    ref={(el) => {
                      headline1LineRefs.current[idx] = el;
                    }}
                    style={{
                      display: "block",
                      fontWeight: INITIAL_LINE_WEIGHTS[idx] ?? 400,
                      willChange: "transform, opacity",
                      transformOrigin: "center center",
                    }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            {/* SCROLLED 3-LINE HEADLINE (Issue 02 Typography & Hierarchy) */}
            <div
              role={shouldReduceMotion ? "heading" : undefined}
              aria-level={shouldReduceMotion ? 1 : undefined}
              aria-hidden={shouldReduceMotion ? undefined : "true"}
              style={{
                gridArea: "1 / 1",
                fontFamily: "var(--font-manrope)",
                fontSize: "clamp(2.45rem, 4.2vw, 3.85rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.035em",
                color: "var(--color-brand-white)",
                margin: 0,
              }}
            >
              {hero.scrolledHeadline.map((line, idx) => (
                <span
                  key={`scroll-${line}`}
                  style={{
                    display: "block",
                    overflow: "hidden",
                    paddingBlock: "0.08em",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span
                    ref={(el) => {
                      headline2LineRefs.current[idx] = el;
                    }}
                    style={{
                      display: "block",
                      fontWeight: SCROLLED_LINE_WEIGHTS[idx] ?? 500,
                      willChange: "transform, opacity",
                      transformOrigin: "center center",
                    }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SUPPORTING FIELD: Body Copy & Single Refined CTA */}
        <div
          style={{
            marginTop: "clamp(1.5rem, 3vh, 2.5rem)",
            maxWidth: "clamp(480px, 45vw, 560px)",
          }}
        >
          {/* Editorial Body Text */}
          <p
            ref={bodyRef}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(1rem, 1.15vw, 1.1875rem)",
              color: "rgba(255, 255, 255, 0.78)",
              lineHeight: 1.62,
              margin: 0,
              willChange: "transform, opacity",
            }}
          >
            {hero.body}
          </p>

          {/* SINGLE PRIMARY HERO CTA (Issue 04) */}
          <div
            style={{
              marginTop: "clamp(1.5rem, 2.8vh, 2.25rem)",
              willChange: "transform, opacity",
            }}
          >
            <Link
              ref={ctaRef}
              href={hero.primaryCTA.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
                padding: "0.8rem 1.6rem",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderRadius: "var(--radius-md, 6px)",
                fontFamily: "var(--font-inter)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
                textDecoration: "none",
                backdropFilter: "blur(8px)",
                transition: "background-color var(--duration-ui) var(--ease-standard), border-color var(--duration-ui) var(--ease-standard), transform var(--duration-ui) var(--ease-standard)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-brand-blue)";
                e.currentTarget.style.borderColor = "var(--color-brand-blue)";
                const arrow = e.currentTarget.querySelector(".hero-cta-arrow") as HTMLElement;
                if (arrow) arrow.style.transform = "translate(3px, -3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                const arrow = e.currentTarget.querySelector(".hero-cta-arrow") as HTMLElement;
                if (arrow) arrow.style.transform = "translate(0px, 0px)";
              }}
            >
              <span>{hero.primaryCTA.label}</span>
              <span
                className="hero-cta-arrow"
                aria-hidden="true"
                style={{
                  color: "var(--color-accent-cyan)",
                  fontSize: "1.05rem",
                  transition: "transform var(--duration-ui) var(--ease-standard)",
                  display: "inline-block",
                }}
              >
                ↗
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ====================================================================
          HERO BOTTOM METADATA ROW
          ==================================================================== */}
      <div
        ref={metadataRef}
        className="page-container"
        style={{
          position: "relative",
          zIndex: 5,
          paddingBlock: "1.15rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          willChange: "transform, opacity",
        }}
      >
        <span
          className="type-metadata"
          style={{
            color: "var(--color-text-secondary-on-dark)",
            opacity: 0.72,
            letterSpacing: "0.16em",
            fontSize: "0.75rem",
          }}
        >
          {hero.metadata.location}
        </span>

        <span
          className="type-metadata"
          style={{
            color: "var(--color-accent-cyan)",
            opacity: 0.78,
            letterSpacing: "0.14em",
            fontSize: "0.75rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
          }}
        >
          <span>{hero.metadata.scrollHint}</span>
          <span aria-hidden="true">↓</span>
        </span>
      </div>
    </section>
  );
}
