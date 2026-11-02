"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { industriesContent, IndustryItem } from "@/content/industries";
import { useMotionPreference } from "@/lib/motion-preference";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function H05Industries() {
  // Start with 02 Oil & Gas (index 1) active per approved visual source of truth
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<number | null>(null);

  const { shouldReduceMotion } = useMotionPreference();
  const industries = industriesContent.industries;
  const activeIndustry: IndustryItem = industries[activeIndex] || industries[1];
  const total = industries.length;


  // Carousel navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  // Keyboard accessibility
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  // Drag and touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - dragStartRef.current;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    dragStartRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartRef.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartRef.current === null) return;
    const deltaX = e.clientX - dragStartRef.current;
    if (deltaX > 45) {
      handlePrev();
    } else if (deltaX < -45) {
      handleNext();
    }
    dragStartRef.current = null;
  };

  // Entrance reveal
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (shouldReduceMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }
        );
      }

      if (stageRef.current) {
        tl.fromTo(
          stageRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.0, ease: "power3.out" },
          "-=0.4"
        );
      }

      if (detailsRef.current) {
        tl.fromTo(
          detailsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
          "-=0.5"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  // Spatial 3D positioning mapping matching approved reference composition:
  // Active card: center front, largest, scale 1.0, 3:2 landscape
  // Left Near (01): shifted left (-66%), scale 0.81, rotateY +7deg, translateZ -100px
  // Right Near (03): shifted right (+66%), scale 0.81, rotateY -7deg, translateZ -100px
  // Far Card (04): shifted farther right (+112%), scale 0.68, rotateY -8deg, translateZ -210px
  const getCardSpatialState = useMemo(() => {
    return (idx: number) => {
      let offset = (idx - activeIndex) % total;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      if (offset === 0) {
        // ACTIVE CENTER (e.g. 02 Oil & Gas)
        return {
          offset,
          xPercent: 0,
          zPx: 100,
          rotateY: 0,
          scale: 1.0,
          opacity: 1.0,
          zIndex: 40,
          shadow: "0 24px 50px rgba(5, 13, 36, 0.09), 0 8px 18px rgba(5, 13, 36, 0.055)",
          reflectionOpacity: 0.12,
          contactShadowOpacity: 0.62,
          brightness: 1.0,
        };
      } else if (offset === -1) {
        // LEFT NEAR (e.g. 01 Industry & Manufacturing)
        return {
          offset,
          xPercent: -88,
          zPx: -90,
          rotateY: 6,
          scale: 0.81,
          opacity: 0.91,
          zIndex: 25,
          shadow: "0 18px 36px rgba(5, 13, 36, 0.065), 0 5px 14px rgba(5, 13, 36, 0.035)",
          reflectionOpacity: 0.06,
          contactShadowOpacity: 0.38,
          brightness: 0.94,
        };
      } else if (offset === 1) {
        // RIGHT NEAR (e.g. 03 Education)
        return {
          offset,
          xPercent: 94,
          zPx: -90,
          rotateY: -6,
          scale: 0.81,
          opacity: 0.91,
          zIndex: 25,
          shadow: "0 18px 36px rgba(5, 13, 36, 0.065), 0 5px 14px rgba(5, 13, 36, 0.035)",
          reflectionOpacity: 0.06,
          contactShadowOpacity: 0.38,
          brightness: 0.94,
        };
      } else {
        // FAR CARD (e.g. 04 Culture & Heritage)
        return {
          offset,
          xPercent: 146,
          zPx: -200,
          rotateY: -7,
          scale: 0.68,
          opacity: 0.74,
          zIndex: 15,
          shadow: "0 12px 24px rgba(5, 13, 36, 0.045)",
          reflectionOpacity: 0.03,
          contactShadowOpacity: 0.24,
          brightness: 0.90,
        };
      }
    };
  }, [activeIndex, total]);

  return (
    <section
      ref={sectionRef}
      id="industries"
      style={{
        backgroundColor: "var(--color-canvas-light, #F9F8F4)",
        color: "var(--color-brand-navy, #050D24)",
        paddingBlock: "clamp(4.5rem, 6.5vw, 6.5rem)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Industries — Spatial Industry Explorer"
    >

      {/* ================================================================== */}
      {/* 09 — SEAMLESS LIGHT ARCHITECTURAL FLOOR (Controlled CSS Gradients)  */}
      {/* No giant gray shadow, no floor image, no dark cloud                 */}
      {/* ================================================================== */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {/* Soft center floor radial illumination */}
        <div
          style={{
            position: "absolute",
            bottom: "6%",
            left: "10%",
            right: "10%",
            height: "68%",
            background:
              "radial-gradient(ellipse 65% 35% at 50% 45%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.72) 38%, rgba(249, 248, 244, 0.30) 66%, rgba(249, 248, 244, 0) 88%)",
          }}
        />

        {/* 10 — Delicate curved architectural floor guides (<= 0.04 opacity) */}
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            bottom: "8%",
            left: "5%",
            right: "5%",
            width: "90%",
            height: "170px",
            opacity: 0.035,
          }}
        >
          <path
            d="M 40 180 C 420 220, 1020 220, 1400 180"
            stroke="#050D24"
            strokeWidth="1.2"
          />
          <path
            d="M 120 210 C 480 250, 960 250, 1320 210"
            stroke="#050D24"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div
        className="page-container"
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ================================================================== */}
        {/* TOP EDITORIAL HEADER                                               */}
        {/* ================================================================== */}
        <div
          ref={headerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "clamp(1.5rem, 4vw, 3rem)",
            alignItems: "end",
            justifyContent: "space-between",
            marginBottom: "clamp(3.75rem, 5.5vw, 5.25rem)", // 60–90px desktop target
          }}
        >
          {/* Left: Eyebrow + Split-Color Headline */}
          <div style={{ maxWidth: "640px" }}>
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
              {industriesContent.eyebrow}
            </div>

            <h2
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "clamp(2.4rem, 4.8vw, 4.25rem)",
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: "var(--color-brand-navy, #050D24)",
                margin: 0,
              }}
            >
              {industriesContent.headlineStart}
              <br />
              <span
                style={{
                  color: "var(--color-brand-blue, #0866FF)",
                  fontWeight: 400,
                }}
              >
                {industriesContent.headlineAccent}
              </span>
            </h2>
          </div>

          {/* Right: Supporting Copy + Minimal Navigation Controls */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.75rem",
              alignItems: "flex-start",
              maxWidth: "460px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.9375rem, 1.05vw, 1.0625rem)",
                fontWeight: 400,
                color: "#64748B",
                lineHeight: 1.62,
                margin: 0,
              }}
            >
              {industriesContent.supportingCopy}
            </p>

            {/* Upper-right Minimal Previous/Next Navigation with 01 — 04 Counter */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "var(--color-brand-navy, #050D24)",
                  letterSpacing: "0.14em",
                }}
              >
                0{activeIndex + 1} — 0{total}
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous industry"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid var(--color-border-light, rgba(5, 13, 36, 0.12))",
                    backgroundColor: "transparent",
                    color: "var(--color-brand-navy, #050D24)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background-color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(8, 102, 255, 0.08)";
                    e.currentTarget.style.borderColor = "var(--color-brand-blue, #0866FF)";
                    e.currentTarget.style.color = "var(--color-brand-blue, #0866FF)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "var(--color-border-light, rgba(5, 13, 36, 0.12))";
                    e.currentTarget.style.color = "var(--color-brand-navy, #050D24)";
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
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
                  aria-label="Next industry"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid var(--color-border-light, rgba(5, 13, 36, 0.12))",
                    backgroundColor: "transparent",
                    color: "var(--color-brand-navy, #050D24)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background-color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(8, 102, 255, 0.08)";
                    e.currentTarget.style.borderColor = "var(--color-brand-blue, #0866FF)";
                    e.currentTarget.style.color = "var(--color-brand-blue, #0866FF)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "var(--color-border-light, rgba(5, 13, 36, 0.12))";
                    e.currentTarget.style.color = "var(--color-brand-navy, #050D24)";
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
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
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* MAIN SPATIAL STAGE (3D CAROUSEL + SYNCHRONIZED REFLECTIONS)        */}
        {/* ================================================================== */}
        <div
          ref={stageRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(420px, 36vw, 510px)",
            perspective: "1600px",
            perspectiveOrigin: "50% 42%",
            outline: "none",
            userSelect: "none",
            cursor: "grab",
          }}
          aria-label="Spatial industry carousel stage"
          role="region"
        >
          {/* Architectural 3D Carousel Stage */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {industries.map((item, idx) => {
              const state = getCardSpatialState(idx);
              const isActive = state.offset === 0;

              return (
                <div
                  key={item.number}
                  onClick={() => handleSelect(idx)}
                  style={{
                    position: "absolute",
                    // 3:2 landscape aspect-ratio sizing
                    width: "clamp(300px, 39vw, 580px)",
                    aspectRatio: "3 / 2",
                    transform: `translate3d(${state.xPercent}%, 0, ${state.zPx}px) rotateY(${state.rotateY}deg) scale(${state.scale})`,
                    zIndex: state.zIndex,
                    opacity: state.opacity,
                    cursor: isActive ? "default" : "pointer",
                    transition: shouldReduceMotion
                      ? "opacity 0.2s ease"
                      : "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1), opacity 900ms ease, z-index 0ms",
                    transformStyle: "preserve-3d",
                  }}
                  aria-hidden={!isActive}
                >
                  {/* Floating Card Surface (04 Layer order & 06 individual shadow) */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: "14px",
                      overflow: "hidden",
                      backgroundColor: "#050D24",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      boxShadow: state.shadow,
                      filter: `brightness(${state.brightness})`,
                      transition: "box-shadow 0.6s ease, filter 0.6s ease",
                    }}
                  >
                    {/* Layer 1: Shared 2400x1600 3:2 Cinematic Industry Image (14 & 21) */}
                    <ResponsiveImage
                      src={item.image}
                      alt={`${item.title} industry visualization`}
                      fill
                      sizes="(min-width: 1440px) 580px, (min-width: 1024px) 480px, 88vw"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        filter: "saturate(0.98) contrast(1.02)",
                        transform: isActive ? "scale(1.0)" : "scale(1.025)",
                        transition: "transform 1100ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />

                    {/* Layer 3: 03 — Subtle top gradient for metadata contrast */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "32%",
                        background:
                          "linear-gradient(to bottom, rgba(5, 13, 36, 0.34) 0%, rgba(5, 13, 36, 0.12) 12%, rgba(5, 13, 36, 0.00) 28%)",
                        pointerEvents: "none",
                        zIndex: 1,
                      }}
                    />

                    {/* Layer 4: 02 — Dedicated progressive bottom readability gradient */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to bottom, rgba(5, 13, 36, 0.00) 0%, rgba(5, 13, 36, 0.00) 42%, rgba(5, 13, 36, 0.12) 55%, rgba(5, 13, 36, 0.48) 72%, rgba(5, 13, 36, 0.82) 88%, rgba(5, 13, 36, 0.94) 100%)",
                        pointerEvents: "none",
                        zIndex: 1,
                      }}
                    />

                    {/* Layer 5: CARD TOP METADATA (zIndex: 2, crisp above gradients) */}
                    <div
                      style={{
                        position: "absolute",
                        top: "clamp(1.1rem, 2vw, 1.4rem)",
                        left: "clamp(1.2rem, 2.2vw, 1.6rem)",
                        right: "clamp(1.2rem, 2.2vw, 1.6rem)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        zIndex: 2,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-manrope)",
                            fontSize: "0.9375rem",
                            fontWeight: 600,
                            color: "rgba(255, 255, 255, 0.90)",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {item.number}
                        </span>
                        <div
                          style={{
                            width: "28px",
                            height: "1px",
                            backgroundColor: "rgba(255, 255, 255, 0.40)",
                          }}
                        />
                      </div>

                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          color: "#00D1FF", // Restrained Electric Cyan per spec 05
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Layer 6 & 7: CARD BOTTOM: Title, Description, and CTA (zIndex: 2) */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "clamp(1.2rem, 2.2vw, 1.65rem)",
                        left: "clamp(1.2rem, 2.2vw, 1.65rem)",
                        right: "clamp(1.2rem, 2.2vw, 1.65rem)",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        gap: "1rem",
                        zIndex: 2,
                      }}
                    >
                      <div style={{ maxWidth: "82%" }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-manrope)",
                            fontSize: isActive
                              ? "clamp(1.35rem, 1.85vw, 1.75rem)"
                              : "clamp(1.05rem, 1.35vw, 1.3rem)",
                            fontWeight: 500,
                            color: "rgba(255, 255, 255, 0.98)", // Pure crisp white per spec 05
                            letterSpacing: "-0.02em",
                            margin: "0 0 0.35rem 0",
                            lineHeight: 1.2,
                          }}
                        >
                          {item.title}
                        </h3>

                        <p
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: "clamp(0.78125rem, 0.95vw, 0.84375rem)",
                            color: "rgba(255, 255, 255, 0.80)", // 0.76–0.84 per spec 05
                            lineHeight: 1.45,
                            margin: 0,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.description}
                        </p>
                      </div>

                      {/* Layer 7: CTA Arrow Button */}
                      {isActive ? (
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            backgroundColor: "var(--color-brand-blue, #0866FF)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FFFFFF",
                            flexShrink: 0,
                            boxShadow: "0 6px 16px rgba(8, 102, 255, 0.40)",
                            transition: "transform 0.25s ease",
                          }}
                          aria-hidden="true"
                        >
                          <span style={{ fontSize: "1.05rem", lineHeight: 1 }}>→</span>
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "rgba(255, 255, 255, 0.65)",
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        >
                          <span style={{ fontSize: "1rem", lineHeight: 1 }}>↗</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ========================================================== */}
                  {/* 11 — REFINED FLOOR REFLECTIONS (Image Color Mass Only)      */}
                  {/* Mirrors ONLY image, 28% height, blur 2px, rapid dissolve   */}
                  {/* ========================================================== */}
                  <div
                    aria-hidden="true"
                    className="h05-card-reflection"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      height: "28%",
                      marginTop: "2px",
                      transform: "scaleY(-1)",
                      pointerEvents: "none",
                      overflow: "hidden",
                      borderRadius: "14px",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.11) 35%, rgba(0, 0, 0, 0.03) 62%, transparent 90%)",
                      maskImage:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.11) 35%, rgba(0, 0, 0, 0.03) 62%, transparent 90%)",
                      filter: "blur(2px)",
                      opacity: state.reflectionOpacity,
                      transition: "opacity 0.6s ease",
                    }}
                  >
                    <ResponsiveImage
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1440px) 580px, 480px"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>

                  {/* ========================================================== */}
                  {/* 07 — DEDICATED PHYSICAL CONTACT SHADOW                    */}
                  {/* Sits immediately underneath each card                     */}
                  {/* ========================================================== */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "8%",
                      right: "8%",
                      bottom: "-12px",
                      height: "22px",
                      backgroundColor: "rgba(5, 13, 36, 0.12)",
                      filter: "blur(18px)",
                      borderRadius: "50%",
                      transform: "scaleX(0.90)",
                      pointerEvents: "none",
                      opacity: state.contactShadowOpacity,
                      transition: "opacity 0.6s ease",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 19 — ACTIVE INDUSTRY DETAILS (Separated Below Reflection Fade)      */}
        {/* ================================================================== */}
        <div
          ref={detailsRef}
          style={{
            maxWidth: "680px",
            margin: "clamp(3.25rem, 4.8vw, 4.25rem) auto 0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          aria-live="polite"
        >
          {/* Dynamic Category / Number */}
          <div
            className="type-metadata"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--color-brand-blue, #0866FF)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: "0.6rem",
            }}
          >
            {activeIndustry.category} / {activeIndustry.number}
          </div>

          {/* Dynamic Large Industry Title */}
          <h3
            style={{
              fontFamily: "var(--font-manrope)",
              fontSize: "clamp(2rem, 3.2vw, 2.75rem)",
              fontWeight: 500,
              color: "var(--color-brand-navy, #050D24)",
              letterSpacing: "-0.025em",
              margin: "0 0 0.85rem 0",
              transition: "color 0.3s ease",
            }}
          >
            {activeIndustry.title}
          </h3>

          {/* Dynamic Supporting Description */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.9375rem, 1.05vw, 1.0625rem)",
              fontWeight: 400,
              color: "#64748B",
              lineHeight: 1.62,
              margin: "0 0 1.75rem 0",
              maxWidth: "58ch",
            }}
          >
            {activeIndustry.description}
          </p>

          {/* Four Minimal Horizontal Progress Bars */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            role="tablist"
            aria-label="Industry navigation indicators"
          >
            {industries.map((_, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={`indicator-${industries[idx].number}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Jump to ${industries[idx].title}`}
                  onClick={() => handleSelect(idx)}
                  style={{
                    height: isSelected ? "3px" : "2px",
                    width: isSelected ? "38px" : "24px",
                    borderRadius: "2px",
                    backgroundColor: isSelected
                      ? "var(--color-brand-blue, #0866FF)"
                      : "rgba(5, 13, 36, 0.18)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Scoped CSS for mobile reflection optimization (Section 22) */}
      <style>{`
        @media (max-width: 767px) {
          .h05-card-reflection {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
