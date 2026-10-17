"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/lib/motion-preference";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProcessStage {
  number: string;
  title: string;
  description: string;
}

const STAGES: ProcessStage[] = [
  {
    number: "01",
    title: "DISCOVER",
    description: "Understand the challenge, audience, objectives, and requirements.",
  },
  {
    number: "02",
    title: "DEFINE",
    description: "Establish the experience concept, scope, journey, and technical direction.",
  },
  {
    number: "03",
    title: "DESIGN",
    description: "Develop visual language, interfaces, interactions, and storyboards.",
  },
  {
    number: "04",
    title: "BUILD",
    description: "Produce 3D content, develop the application, and integrate systems.",
  },
  {
    number: "05",
    title: "VALIDATE",
    description: "Test usability, performance, technical requirements, and experience quality.",
  },
  {
    number: "06",
    title: "DEPLOY & SUPPORT",
    description: "Prepare delivery, deployment, documentation, and agreed ongoing support.",
  },
];

// Intentionally art-directed continuous flowing C1 spline in viewBox 0 0 1200 240
const MASTER_SVG_PATH =
  "M 70 145 C 170 145, 190 70, 290 70 C 390 70, 410 175, 510 175 C 610 175, 630 65, 730 65 C 830 65, 840 165, 940 165 C 1030 165, 1050 95, 1130 95";

const TOTAL_PATH_LENGTH = 1185;

const DEFAULT_NODE_COORDS = [
  { x: 70, y: 145 },
  { x: 290.7, y: 70 },
  { x: 497.5, y: 174.4 },
  { x: 701.7, y: 68.2 },
  { x: 909.4, y: 161.5 },
  { x: 1130, y: 95 },
];

export function H06Delivery() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const basePathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const detailContainerRef = useRef<HTMLDivElement>(null);

  const [activeStage, setActiveStage] = useState<number>(0);
  const [nodeCoords, setNodeCoords] = useState<{ x: number; y: number }[]>(DEFAULT_NODE_COORDS);
  const [travelDot, setTravelDot] = useState<{ x: number; y: number }>(DEFAULT_NODE_COORDS[0]);

  const { shouldReduceMotion } = useMotionPreference();
  const totalStages = STAGES.length;
  const currentStage = STAGES[activeStage] || STAGES[0];

  // Mathematical node derivation via path.getPointAtLength
  useEffect(() => {
    if (!basePathRef.current) return;
    try {
      const pathEl = basePathRef.current;
      const totalLen = pathEl.getTotalLength();
      if (totalLen > 0) {
        const derived = STAGES.map((_, i) => {
          const frac = i / (STAGES.length - 1);
          const pt = pathEl.getPointAtLength(frac * totalLen);
          return { x: Math.round(pt.x * 10) / 10, y: Math.round(pt.y * 10) / 10 };
        });
        setNodeCoords(derived);
      }
    } catch {
      // Fallback coordinates already in place
    }
  }, []);

  // Update traveling dot and active stage programmatically
  const updateStageProgress = useCallback(
    (index: number) => {
      const targetIdx = Math.max(0, Math.min(index, totalStages - 1));
      setActiveStage(targetIdx);

      if (!basePathRef.current || !progressPathRef.current) return;
      const totalLen = basePathRef.current.getTotalLength();
      const targetFraction = targetIdx / (totalStages - 1);
      const targetOffset = totalLen * (1 - targetFraction);

      gsap.to(progressPathRef.current, {
        strokeDashoffset: targetOffset,
        duration: 0.65,
        ease: "power2.out",
      });

      const pt = basePathRef.current.getPointAtLength(targetFraction * totalLen);
      setTravelDot({ x: pt.x, y: pt.y });
    },
    [totalStages]
  );

  const handlePrev = useCallback(() => {
    updateStageProgress(activeStage - 1);
  }, [activeStage, updateStageProgress]);

  const handleNext = useCallback(() => {
    updateStageProgress(activeStage + 1);
  }, [activeStage, updateStageProgress]);

  // DESKTOP & MOBILE SCROLL ANIMATION
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Entrance animation: eyebrow -> headline -> copy -> base path -> nodes
      if (!shouldReduceMotion) {
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        if (headerRef.current) {
          entranceTl.fromTo(
            headerRef.current.children,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }
          );
        }

        if (basePathRef.current) {
          entranceTl.fromTo(
            basePathRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: "power2.out" },
            "-=0.3"
          );
        }

        entranceTl.fromTo(
          ".process-node-group",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)", stagger: 0.06 },
          "-=0.4"
        );
      }

      // ======================================================================
      // DESKTOP PINNED HORIZONTAL JOURNEY (>= 1024px)
      // Short ScrollTrigger: roughly 140vh additional scroll. No trap, no snapping.
      // ======================================================================
      mm.add("(min-width: 1024px)", () => {
        if (shouldReduceMotion) return;

        const pathEl = basePathRef.current;
        const progressEl = progressPathRef.current;
        if (!pathEl || !progressEl || !pinWrapperRef.current) return;

        const totalLength = pathEl.getTotalLength();
        gsap.set(progressEl, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
        });

        const progressProxy = { val: 0 };

        ScrollTrigger.create({
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "+=140%", // short fluid scroll (~140vh)
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            progressProxy.val = p;

            // Blue progress path draws using real path length
            const offset = totalLength * (1 - p);
            progressEl.style.strokeDashoffset = `${offset}`;

            // Small blue dot travels on the exact path using getPointAtLength()
            const pt = pathEl.getPointAtLength(p * totalLength);
            setTravelDot({ x: pt.x, y: pt.y });

            // Active stage changes naturally as path progresses
            const idx = Math.min(totalStages - 1, Math.floor(p * 5.99));
            setActiveStage(idx);
          },
        });
      });

      // ======================================================================
      // MOBILE VERTICAL JOURNEY (< 1024px)
      // No pinning. Vertical path progresses naturally as stages enter viewport.
      // ======================================================================
      mm.add("(max-width: 1023px)", () => {
        const mobileStages = document.querySelectorAll(".mobile-process-stage");
        mobileStages.forEach((stageEl, i) => {
          ScrollTrigger.create({
            trigger: stageEl,
            start: "top 75%",
            onEnter: () => setActiveStage(i),
            onEnterBack: () => setActiveStage(i),
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion, totalStages]);

  // Crossfade editorial detail text when activeStage changes
  useEffect(() => {
    if (detailContainerRef.current && !shouldReduceMotion) {
      gsap.fromTo(
        detailContainerRef.current,
        { opacity: 0.35, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [activeStage, shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      style={{
        backgroundColor: "#F9F8F4",
        color: "#050D24",
        position: "relative",
        borderTop: "1px solid rgba(5, 13, 36, 0.08)",
      }}
      aria-label="04 / How We Work — End-to-End Experience Delivery"
    >
      <div
        ref={pinWrapperRef}
        style={{
          width: "100%",
          paddingBlock: "clamp(4.5rem, 6.5vw, 6.5rem)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            paddingInline: "clamp(1.5rem, 5vw, 5rem)",
            boxSizing: "border-box",
          }}
        >
          {/* Section Header */}
          <div
            ref={headerRef}
            style={{
              maxWidth: "880px",
              marginBottom: "clamp(2.5rem, 4.5vw, 4rem)",
            }}
          >
            {/* Section label */}
            <div
              className="type-metadata"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--color-brand-blue, #0866FF)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              04 / HOW WE WORK
            </div>

            {/* Headline with only "experience." highlighted in Electric Blue */}
            <h2
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "clamp(2.4rem, 4.8vw, 4.25rem)",
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "#050D24",
                margin: 0,
                marginBottom: "1.25rem",
              }}
            >
              From the first idea to the final
              <br />
              <span
                style={{
                  color: "var(--color-brand-blue, #0866FF)",
                  fontWeight: 400,
                }}
              >
                experience.
              </span>
            </h2>

            {/* Supporting Copy */}
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(1rem, 1.15vw, 1.1875rem)",
                fontWeight: 400,
                color: "#64748B",
                lineHeight: 1.6,
                maxWidth: "52ch",
                margin: 0,
              }}
            >
              One coordinated process across strategy, design, production, technology, and delivery.
            </p>
          </div>

          {/* ================================================================ */}
          {/* DESKTOP: PREMIUM HORIZONTAL SVG PROCESS JOURNEY (>= 1024px)      */}
          {/* ================================================================ */}
          <div
            className="desktop-journey-wrapper"
            style={{
              position: "relative",
              width: "100%",
              marginBlock: "clamp(2rem, 3.5vw, 3.5rem)",
            }}
          >
            <svg
              viewBox="0 0 1200 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                overflow: "visible",
              }}
            >
              {/* Base Path (rgba(5,13,36,0.12), 1.75px) */}
              <path
                ref={basePathRef}
                d={MASTER_SVG_PATH}
                stroke="rgba(5, 13, 36, 0.12)"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />

              {/* Progress Path (#0866FF, 2.5px, round caps) */}
              <path
                ref={progressPathRef}
                d={MASTER_SVG_PATH}
                stroke="var(--color-brand-blue, #0866FF)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={{
                  strokeDasharray: TOTAL_PATH_LENGTH,
                  strokeDashoffset: TOTAL_PATH_LENGTH,
                }}
              />

              {/* Traveling Blue Dot on the exact path */}
              <g
                style={{
                  transform: `translate(${travelDot.x}px, ${travelDot.y}px)`,
                  transition: "transform 0.15s ease-out",
                }}
              >
                <circle r="9" fill="rgba(8, 102, 255, 0.20)" />
                <circle r="4.5" fill="var(--color-brand-blue, #0866FF)" />
              </g>

              {/* 6 Nodes Placed Mathematically on the Actual Path */}
              {STAGES.map((stage, idx) => {
                const pt = nodeCoords[idx] || DEFAULT_NODE_COORDS[idx];
                const isActive = activeStage === idx;
                const isCompleted = idx < activeStage;
                // Crests (y < 115) place labels above; valleys (y >= 115) place labels below
                const isAbove = pt.y < 115;

                return (
                  <g
                    key={stage.number}
                    className="process-node-group"
                    onClick={() => updateStageProgress(idx)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Node interactive hit target */}
                    <circle cx={pt.x} cy={pt.y} r="24" fill="transparent" />

                    {/* Active Node: blue ring + white center */}
                    {isActive ? (
                      <g>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="16"
                          fill="rgba(8, 102, 255, 0.14)"
                          stroke="rgba(8, 102, 255, 0.28)"
                          strokeWidth="1"
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="10.5"
                          fill="none"
                          stroke="var(--color-brand-blue, #0866FF)"
                          strokeWidth="2.5"
                        />
                        <circle cx={pt.x} cy={pt.y} r="5" fill="#FFFFFF" />
                      </g>
                    ) : isCompleted ? (
                      /* Completed Node: quieter blue */
                      <g>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="6.5"
                          fill="var(--color-brand-blue, #0866FF)"
                        />
                      </g>
                    ) : (
                      /* Future Node: subtle base */
                      <g>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="5.5"
                          fill="#F9F8F4"
                          stroke="rgba(5, 13, 36, 0.24)"
                          strokeWidth="1.5"
                        />
                      </g>
                    )}

                    {/* Node Labels: Stage Number + Stage Name */}
                    <text
                      x={pt.x}
                      y={isAbove ? pt.y - 24 : pt.y + 32}
                      textAnchor="middle"
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "10.5px",
                        fontWeight: isActive ? 600 : 500,
                        fill: isActive
                          ? "var(--color-brand-blue, #0866FF)"
                          : isCompleted
                          ? "rgba(5, 13, 36, 0.85)"
                          : "rgba(5, 13, 36, 0.45)",
                        letterSpacing: "0.12em",
                        transition: "fill 0.3s ease",
                      }}
                    >
                      {stage.number} {stage.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ================================================================ */}
          {/* EDITORIAL DETAIL ROW BELOW                                       */}
          {/* LEFT: 01 / 06 + STAGE OF JOURNEY                                  */}
          {/* CENTER: active title + description                                */}
          {/* RIGHT: minimal prev/next controls + "FROM A SINGLE POINT..."      */}
          {/* ================================================================ */}
          <div
            ref={detailContainerRef}
            className="editorial-detail-row"
            style={{
              borderTop: "1px solid rgba(5, 13, 36, 0.10)",
              paddingTop: "clamp(1.75rem, 2.5vw, 2.5rem)",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            {/* Inner 3-Column Desktop Grid */}
            <div
              className="editorial-grid-desktop"
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr auto",
                gap: "clamp(2rem, 3.5vw, 4rem)",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* LEFT: 01 / 06 + STAGE OF JOURNEY */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-manrope)",
                    fontSize: "1.75rem",
                    fontWeight: 300,
                    color: "var(--color-brand-navy, #050D24)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  0{activeStage + 1}
                  <span style={{ fontSize: "1.1rem", color: "#94A3B8", fontWeight: 400 }}>
                    {" "}
                    / 0{totalStages}
                  </span>
                </span>
                <span
                  className="type-metadata"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: "var(--color-brand-blue, #0866FF)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  STAGE OF JOURNEY
                </span>
              </div>

              {/* CENTER: Active Title + Description */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-manrope)",
                    fontSize: "clamp(1.35rem, 1.8vw, 1.65rem)",
                    fontWeight: 500,
                    color: "var(--color-brand-navy, #050D24)",
                    letterSpacing: "-0.02em",
                    margin: 0,
                  }}
                >
                  {currentStage.number} {currentStage.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.9375rem, 1.05vw, 1.0625rem)",
                    color: "#64748B",
                    lineHeight: 1.55,
                    margin: 0,
                    maxWidth: "54ch",
                  }}
                >
                  {currentStage.description}
                </p>
              </div>

              {/* RIGHT: Minimal Prev/Next Controls + "FROM A SINGLE POINT..." */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "0.85rem",
                }}
              >
                {/* Prev / Next Buttons */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={activeStage === 0}
                    aria-label="Previous stage"
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      border: "1px solid rgba(5, 13, 36, 0.15)",
                      backgroundColor: "transparent",
                      color: activeStage === 0 ? "rgba(5, 13, 36, 0.25)" : "#050D24",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: activeStage === 0 ? "not-allowed" : "pointer",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M10 13L5 8L10 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={activeStage === totalStages - 1}
                    aria-label="Next stage"
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      border: "1px solid rgba(5, 13, 36, 0.15)",
                      backgroundColor: "transparent",
                      color: activeStage === totalStages - 1 ? "rgba(5, 13, 36, 0.25)" : "#050D24",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: activeStage === totalStages - 1 ? "not-allowed" : "pointer",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 13L11 8L6 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* "FROM A SINGLE POINT TO INFINITE HORIZONS ↗" */}
                <Link
                  href="#contact"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: "var(--color-brand-blue, #0866FF)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    transition: "color 0.25s ease",
                  }}
                >
                  FROM A SINGLE POINT TO INFINITE HORIZONS ↗
                </Link>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* MOBILE: NATURAL VERTICAL 6-STAGE PROCESS JOURNEY (< 1024px)       */}
          {/* No pinning. Vertical path progresses naturally. No horizontal overflow. */}
          {/* ================================================================ */}
          <div
            className="mobile-journey-wrapper"
            style={{
              position: "relative",
              marginTop: "2.5rem",
              paddingLeft: "2rem",
            }}
          >
            {/* Left Vertical Track */}
            <div
              style={{
                position: "absolute",
                top: "14px",
                bottom: "24px",
                left: "7px",
                width: "2px",
                backgroundColor: "rgba(5, 13, 36, 0.12)",
              }}
            />

            {/* Stages Stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {STAGES.map((stage, idx) => {
                const isActive = activeStage === idx;
                const isCompleted = idx <= activeStage;

                return (
                  <div
                    key={`mob-${stage.number}`}
                    className="mobile-process-stage"
                    onClick={() => updateStageProgress(idx)}
                    style={{
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    {/* Node Dot on Left Vertical Track */}
                    <div
                      style={{
                        position: "absolute",
                        left: "-2rem",
                        top: "2px",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: isActive
                          ? "#FFFFFF"
                          : isCompleted
                          ? "var(--color-brand-blue, #0866FF)"
                          : "#F9F8F4",
                        border: `2.5px solid ${
                          isCompleted
                            ? "var(--color-brand-blue, #0866FF)"
                            : "rgba(5, 13, 36, 0.24)"
                        }`,
                        boxShadow: isActive ? "0 0 0 4px rgba(8, 102, 255, 0.20)" : "none",
                        transition: "all 0.3s ease",
                      }}
                    />

                    {/* Stage Header */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        marginBottom: "0.4rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "var(--color-brand-blue, #0866FF)",
                          letterSpacing: "0.12em",
                        }}
                      >
                        {stage.number}
                      </span>
                      <h3
                        style={{
                          fontFamily: "var(--font-manrope)",
                          fontSize: "1.15rem",
                          fontWeight: 500,
                          color: "#050D24",
                          letterSpacing: "-0.015em",
                          margin: 0,
                        }}
                      >
                        {stage.title}
                      </h3>
                    </div>

                    {/* Stage Description */}
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.9375rem",
                        color: "#64748B",
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {stage.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scoped Responsive Display Switching Styles */}
      <style>{`
        @media (min-width: 1024px) {
          .mobile-journey-wrapper {
            display: none !important;
          }
          .desktop-journey-wrapper {
            display: block !important;
          }
        }
        @media (max-width: 1023px) {
          .desktop-journey-wrapper {
            display: none !important;
          }
          .mobile-journey-wrapper {
            display: block !important;
          }
          .editorial-grid-desktop {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
