"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { homeContent, WhatWeDoStage } from "@/content/global/home";
import { useMotionPreference } from "@/lib/motion-preference";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Canonical master spline path in viewBox 0 0 1100 240
const MASTER_SVG_PATH =
  "M 80 170 C 160 170 240 65 320 65 C 400 65 480 175 560 175 C 640 175 720 65 800 65 C 880 65 960 140 1020 140";

// Fallback normalized coordinates (x, y) along the master spline for viewBox 0 0 1100 240
const DEFAULT_NODE_COORDS = [
  { x: 80, y: 170 },
  { x: 320, y: 65 },
  { x: 560, y: 175 },
  { x: 800, y: 65 },
  { x: 1020, y: 140 },
];

export function H03WhatWeDo() {
  const { whatWeDo } = homeContent;
  const { stages, bottomSignature } = whatWeDo;
  const { shouldReduceMotion } = useMotionPreference();

  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const masterPathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);

  // Active stage index (0 to 4)
  const [activeStage, setActiveStage] = useState<number>(0);
  const activeStageRef = useRef<number>(0);

  // Node positions along SVG path derived accurately via path.getPointAtLength
  const [nodePositions, setNodePositions] = useState<{ x: number; y: number }[]>(DEFAULT_NODE_COORDS);

  // Active editorial text ref for smooth GSAP transitions
  const activeTitleRef = useRef<HTMLHeadingElement>(null);
  const activeDescRef = useRef<HTMLParagraphElement>(null);
  const activeCounterRef = useRef<HTMLSpanElement>(null);

  // Mobile timeline refs
  const mobileListRef = useRef<HTMLDivElement>(null);
  const mobileLineProgressRef = useRef<HTMLDivElement>(null);

  // Calculate exact node coordinates on mount from the canonical SVG path
  useEffect(() => {
    if (!masterPathRef.current) return;
    try {
      const pathEl = masterPathRef.current;
      const totalLen = pathEl.getTotalLength();
      if (totalLen > 0) {
        const step = totalLen / (stages.length - 1);
        const derived = stages.map((_, i) => {
          const pt = pathEl.getPointAtLength(Math.min(i * step, totalLen));
          return { x: Math.round(pt.x * 10) / 10, y: Math.round(pt.y * 10) / 10 };
        });
        setNodePositions(derived);
      }
    } catch {
      // Fallback coordinates already set
    }
  }, [stages]);

  // DESKTOP & MOBILE SCROLL ANIMATION
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ======================================================================
      // 1. DESKTOP PINNED CONNECTED JOURNEY (>= 1024px)
      // ======================================================================
      mm.add("(min-width: 1024px)", () => {
        if (shouldReduceMotion) return;

        const pathEl = masterPathRef.current;
        const progressEl = progressPathRef.current;
        if (!pathEl || !progressEl || !sectionRef.current) return;

        const totalLength = pathEl.getTotalLength();
        gsap.set(progressEl, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        });

        // Initialize progress line to stage 01
        const initialOffset = totalLength;
        gsap.set(progressEl, { strokeDashoffset: initialOffset });

        // Desktop pinned scroll journey
        // 260vh scroll duration reserves ~20-25% for the final stage hold before release
        const scrollDistance = Math.max(window.innerHeight * 2.6, 2200);

        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress; // 0.00 to 1.00

            // SVG Path progress: advance stroke from 0 to totalLength
            // Progress reaches stage 5 at ~0.80, reserving 0.80 -> 1.00 as readable hold
            const pathProgress = Math.min(progress / 0.82, 1);
            const drawOffset = totalLength * (1 - pathProgress);
            gsap.set(progressEl, { strokeDashoffset: drawOffset });

            // Determine discrete active stage with stable thresholds
            // 0: 0.00 - 0.18
            // 1: 0.18 - 0.38
            // 2: 0.38 - 0.58
            // 3: 0.58 - 0.78
            // 4: 0.78 - 1.00 (Final Stage 05 Hold)
            let newStage = 0;
            if (progress >= 0.78) {
              newStage = 4;
            } else if (progress >= 0.58) {
              newStage = 3;
            } else if (progress >= 0.38) {
              newStage = 2;
            } else if (progress >= 0.18) {
              newStage = 1;
            } else {
              newStage = 0;
            }

            if (newStage !== activeStageRef.current) {
              activeStageRef.current = newStage;
              setActiveStage(newStage);

              // Smooth GSAP text transition
              if (activeTitleRef.current && activeDescRef.current && activeCounterRef.current) {
                gsap.fromTo(
                  [activeCounterRef.current, activeTitleRef.current, activeDescRef.current],
                  { opacity: 0, y: 8 },
                  { opacity: 1, y: 0, duration: 0.32, ease: "power2.out", stagger: 0.04, overwrite: "auto" }
                );
              }
            }
          },
        });

        return () => st.kill();
      });

      // ======================================================================
      // 2. MOBILE & TABLET VERTICAL TIMELINE (< 1024px)
      // ======================================================================
      mm.add("(max-width: 1023px)", () => {
        if (shouldReduceMotion) return;

        if (mobileListRef.current && mobileLineProgressRef.current) {
          ScrollTrigger.create({
            trigger: mobileListRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.4,
            onUpdate: (self) => {
              if (mobileLineProgressRef.current) {
                gsap.set(mobileLineProgressRef.current, {
                  scaleY: self.progress,
                  transformOrigin: "top center",
                });
              }
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion, stages.length]);

  // Click-to-stage navigation: calculate corresponding scroll position in pinned section
  const handleStageClick = (index: number) => {
    if (!sectionRef.current) return;
    const st = ScrollTrigger.getById("h03-pin") || ScrollTrigger.getAll().find((s) => s.trigger === sectionRef.current);
    if (st) {
      // Stage scroll milestones: 0.05, 0.28, 0.48, 0.68, 0.88
      const stageMilestones = [0.05, 0.28, 0.48, 0.68, 0.88];
      const targetRatio = stageMilestones[index] ?? (index / (stages.length - 1)) * 0.85;
      const targetScroll = st.start + (st.end - st.start) * targetRatio;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const currentStage: WhatWeDoStage = stages[activeStage] || stages[0];

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      style={{
        position: "relative",
        backgroundColor: "var(--color-canvas-light, #F9F8F4)",
        color: "var(--color-brand-navy, #050D24)",
        minHeight: shouldReduceMotion ? "auto" : "100vh",
        borderTop: "1px solid var(--color-border-light, rgba(5, 13, 36, 0.08))",
        overflow: "hidden",
      }}
      aria-label="What We Do — The Connected Journey"
    >
      <div
        ref={pinContainerRef}
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          paddingInline: "clamp(1.5rem, 4vw, 4rem)",
          paddingBlock: "clamp(4rem, 6vh, 6.5rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: shouldReduceMotion ? "auto" : "100vh",
          boxSizing: "border-box",
        }}
      >
        {/* ================================================================== */}
        {/* ZONE A: EDITORIAL INTRO                                            */}
        {/* ================================================================== */}
        <div>
          {/* Eyebrow */}
          <div
            className="type-metadata"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--color-brand-blue, #0866FF)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: "clamp(0.875rem, 1.5vh, 1.25rem)",
            }}
          >
            {whatWeDo.eyebrow}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(1.5rem, 3vw, 4rem)",
              alignItems: "end",
            }}
          >
            {/* Primary Headline */}
            <h2
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "clamp(2.15rem, 3.8vw, 3.85rem)",
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "var(--color-brand-navy, #050D24)",
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {whatWeDo.headline}
            </h2>

            {/* Intro Copy */}
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.9375rem, 1.05vw, 1.0625rem)",
                fontWeight: 400,
                color: "rgba(5, 13, 36, 0.72)",
                lineHeight: 1.62,
                maxWidth: "52ch",
                margin: 0,
              }}
            >
              {whatWeDo.body}
            </p>
          </div>
        </div>

        {/* ================================================================== */}
        {/* ZONE B: DESKTOP CONNECTED JOURNEY SVG CANVAS (>= 1024px)           */}
        {/* ================================================================== */}
        <div
          className="h03-desktop-journey hidden lg:block"
          style={{
            position: "relative",
            width: "100%",
            marginBlock: "clamp(2rem, 4vh, 3.5rem)",
            display: shouldReduceMotion ? "none" : undefined,
          }}
        >
          <svg
            viewBox="0 0 1100 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              overflow: "visible",
            }}
            aria-hidden="true"
          >
            {/* Master Base Curve (Muted Blue-Gray) */}
            <path
              ref={masterPathRef}
              d={MASTER_SVG_PATH}
              stroke="rgba(5, 13, 36, 0.12)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Animated Electric Blue Progress Path */}
            <path
              ref={progressPathRef}
              d={MASTER_SVG_PATH}
              stroke="var(--color-brand-blue, #0866FF)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Five Precisely Positioned Nodes */}
            {stages.map((stage, idx) => {
              const pos = nodePositions[idx] || DEFAULT_NODE_COORDS[idx];
              const isActive = activeStage === idx;
              const isCompleted = activeStage > idx;
              const isHighNode = idx % 2 === 1; // Nodes 02 & 04 are near top of curve

              return (
                <g
                  key={stage.number}
                  style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                  onClick={() => handleStageClick(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Jump to stage ${stage.number}: ${stage.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleStageClick(idx);
                    }
                  }}
                >
                  {/* Active Outer Pulse Ring */}
                  {isActive && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="18"
                      stroke="var(--color-brand-blue, #0866FF)"
                      strokeWidth="1.25"
                      strokeDasharray="3 3"
                      fill="none"
                      opacity="0.55"
                      style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                    />
                  )}

                  {/* Node Outer Halo for Completed/Active */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 10 : isCompleted ? 7 : 6}
                    fill={
                      isActive
                        ? "var(--color-brand-blue, #0866FF)"
                        : isCompleted
                        ? "var(--color-brand-blue, #0866FF)"
                        : "#F9F8F4"
                    }
                    stroke={
                      isActive || isCompleted
                        ? "var(--color-brand-blue, #0866FF)"
                        : "rgba(5, 13, 36, 0.35)"
                    }
                    strokeWidth={isActive ? 2.5 : 1.75}
                    style={{ transition: "all 0.35s ease" }}
                  />

                  {/* Active Node Inner Core Light */}
                  {isActive && (
                    <circle cx={pos.x} cy={pos.y} r="3" fill="#FFFFFF" />
                  )}

                  {/* Stage Short Label: positioned above high nodes, below low nodes */}
                  <text
                    x={pos.x}
                    y={isHighNode ? pos.y - 18 : pos.y + 26}
                    textAnchor="middle"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "11px",
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: "0.14em",
                      fill: isActive
                        ? "var(--color-brand-blue, #0866FF)"
                        : isCompleted
                        ? "rgba(5, 13, 36, 0.75)"
                        : "rgba(5, 13, 36, 0.45)",
                      transition: "fill 0.3s ease, font-weight 0.3s ease",
                      userSelect: "none",
                    }}
                  >
                    {stage.shortLabel}
                  </text>

                  {/* Stage Number Identifier */}
                  <text
                    x={pos.x}
                    y={isHighNode ? pos.y - 32 : pos.y + 40}
                    textAnchor="middle"
                    style={{
                      fontFamily: "var(--font-manrope)",
                      fontSize: "10px",
                      fontWeight: 300,
                      fill: isActive
                        ? "var(--color-brand-blue, #0866FF)"
                        : "rgba(5, 13, 36, 0.35)",
                      userSelect: "none",
                    }}
                  >
                    {stage.number}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ================================================================== */}
        {/* ZONE C: ACTIVE STAGE EDITORIAL DISPLAY (Desktop >= 1024px)         */}
        {/* ================================================================== */}
        <div
          className="h03-desktop-editorial hidden lg:grid"
          style={{
            display: shouldReduceMotion ? "none" : undefined,
            gridTemplateColumns: "auto 1fr auto",
            gap: "clamp(2rem, 4vw, 4rem)",
            alignItems: "center",
            paddingTop: "clamp(1.5rem, 2.5vh, 2rem)",
            borderTop: "1px solid rgba(5, 13, 36, 0.08)",
            minHeight: "140px",
          }}
        >
          {/* Stage Counter */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span
              ref={activeCounterRef}
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "clamp(1.75rem, 2.4vw, 2.5rem)",
                fontWeight: 300,
                color: "var(--color-brand-blue, #0866FF)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {currentStage.number} {"//"} 05
            </span>
            <span
              className="type-metadata"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.6875rem",
                color: "rgba(5, 13, 36, 0.45)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              STAGE OF JOURNEY
            </span>
          </div>

          {/* Active Title & Description (Stable height, zero layout shift) */}
          <div style={{ minHeight: "85px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3
              ref={activeTitleRef}
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "clamp(1.35rem, 1.85vw, 1.85rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--color-brand-navy, #050D24)",
                margin: "0 0 0.35rem 0",
                willChange: "transform, opacity",
              }}
            >
              {currentStage.title}
            </h3>
            <p
              ref={activeDescRef}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.9375rem, 1.05vw, 1.0625rem)",
                color: "rgba(5, 13, 36, 0.72)",
                lineHeight: 1.55,
                margin: 0,
                maxWidth: "65ch",
                willChange: "transform, opacity",
              }}
            >
              {currentStage.description}
            </p>
          </div>

          {/* Bottom Brand Signature */}
          <div
            style={{
              textAlign: "right",
              borderLeft: "1px solid rgba(5, 13, 36, 0.08)",
              paddingLeft: "clamp(1.5rem, 2.5vw, 3rem)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "0.8125rem",
                fontWeight: 300,
                letterSpacing: "0.12em",
                color: "rgba(5, 13, 36, 0.55)",
                textTransform: "uppercase",
                lineHeight: 1.5,
              }}
            >
              {bottomSignature.line1}
            </div>
            <div
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "0.8125rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--color-brand-blue, #0866FF)",
                textTransform: "uppercase",
                lineHeight: 1.5,
              }}
            >
              {bottomSignature.line2}
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* MOBILE & TABLET VERTICAL TIMELINE (< 1024px) / REDUCED MOTION     */}
        {/* ================================================================== */}
        <div
          ref={mobileListRef}
          className={`h03-mobile-timeline ${shouldReduceMotion ? "block" : "block lg:hidden"}`}
          style={{
            position: "relative",
            marginBlock: "clamp(2.5rem, 5vh, 4rem)",
            paddingLeft: "2rem",
          }}
        >
          {/* Base Vertical Timeline Line */}
          <div
            style={{
              position: "absolute",
              top: 8,
              bottom: 8,
              left: "6px",
              width: "2px",
              backgroundColor: "rgba(5, 13, 36, 0.12)",
            }}
          />

          {/* Animated Mobile Progress Line */}
          {!shouldReduceMotion && (
            <div
              ref={mobileLineProgressRef}
              style={{
                position: "absolute",
                top: 8,
                bottom: 8,
                left: "6px",
                width: "2px",
                backgroundColor: "var(--color-brand-blue, #0866FF)",
                transformOrigin: "top center",
                transform: "scaleY(0.2)",
              }}
            />
          )}

          {/* Five Vertically Stacked Stages in Natural Reading Order */}
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(2rem, 4vh, 3rem)" }}>
            {stages.map((stage) => (
              <article
                key={`mobile-${stage.number}`}
                style={{
                  position: "relative",
                }}
              >
                {/* Stage Bullet Node on Line */}
                <div
                  style={{
                    position: "absolute",
                    top: "4px",
                    left: "-2rem",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    backgroundColor: "#F9F8F4",
                    border: "2px solid var(--color-brand-blue, #0866FF)",
                    transform: "translateX(0px)",
                  }}
                />

                {/* Metadata Header: Number + Short Label */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-manrope)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--color-brand-blue, #0866FF)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {stage.number}
                  </span>
                  <span
                    className="type-metadata"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      color: "rgba(5, 13, 36, 0.55)",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    {stage.shortLabel}
                  </span>
                </div>

                {/* Full Stage Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-manrope)",
                    fontSize: "clamp(1.25rem, 4.5vw, 1.5rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "var(--color-brand-navy, #050D24)",
                    margin: "0 0 0.35rem 0",
                  }}
                >
                  {stage.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.9375rem",
                    color: "rgba(5, 13, 36, 0.72)",
                    lineHeight: 1.55,
                    margin: 0,
                    maxWidth: "50ch",
                  }}
                >
                  {stage.description}
                </p>
              </article>
            ))}
          </div>

          {/* Mobile Bottom Signature */}
          <div
            style={{
              marginTop: "2.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(5, 13, 36, 0.08)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "0.75rem",
                fontWeight: 300,
                letterSpacing: "0.12em",
                color: "rgba(5, 13, 36, 0.55)",
                textTransform: "uppercase",
              }}
            >
              {bottomSignature.line1}
            </div>
            <div
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--color-brand-blue, #0866FF)",
                textTransform: "uppercase",
                marginTop: "0.15rem",
              }}
            >
              {bottomSignature.line2}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
