"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesContent } from "@/content/services";
import { useMotionPreference } from "@/lib/motion-preference";

export function H04Services() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { shouldReduceMotion } = useMotionPreference();

  const services = servicesContent.services;

  // Preload all 4 service images to ensure instantaneous transitions with zero blank frames
  useEffect(() => {
    services.forEach((s) => {
      if (typeof window !== "undefined" && s.image) {
        const img = new window.Image();
        img.src = s.image;
      }
    });
  }, [services]);

  // Clean transition handler that coordinates active and outgoing indices
  const handleServiceSelect = useCallback(
    (newIdx: number) => {
      if (newIdx === activeIdx) return;
      setPrevIdx(activeIdx);
      setActiveIdx(newIdx);

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      // Clear outgoing layer after transition completes (~650ms)
      transitionTimerRef.current = setTimeout(() => {
        setPrevIdx(null);
      }, 650);
    },
    [activeIdx]
  );

  // Debounced hover activation to prevent flickering when cursor rapidly crosses dividers
  const handleMouseEnter = useCallback(
    (idx: number) => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      hoverTimeoutRef.current = setTimeout(() => {
        handleServiceSelect(idx);
      }, 40);
    },
    [handleServiceSelect]
  );

  const handleMouseLeaveRow = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  return (
    <section
      id="services"
      style={{
        backgroundColor: "var(--color-canvas-light, #F9F8F4)",
        color: "var(--color-brand-navy, #050D24)",
        paddingBlock: "clamp(4.5rem, 6.5vw, 6.5rem)",
        borderTop: "1px solid var(--color-border-light, rgba(5, 13, 36, 0.08))",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Services — What We Create"
    >
      <div className="page-container">
        {/* ================================================================== */}
        {/* SECTION HEADER: Eyebrow, Headline, Intro, Supporting Copy          */}
        {/* ================================================================== */}
        <div style={{ maxWidth: "1080px", marginBottom: "clamp(3.5rem, 6vw, 5.5rem)" }}>
          {/* Eyebrow */}
          <div
            className="type-metadata"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "var(--color-brand-blue, #0866FF)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            {servicesContent.eyebrow}
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "var(--font-manrope)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 300,
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: "var(--color-brand-navy, #050D24)",
              margin: "0 0 1.5rem 0",
            }}
          >
            {servicesContent.headline}
          </h2>

          {/* Intro statement & Supporting copy */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(1.25rem, 3vw, 3rem)",
              marginTop: "clamp(1.25rem, 2vh, 1.75rem)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "clamp(1.15rem, 1.6vw, 1.45rem)",
                fontWeight: 500,
                lineHeight: 1.45,
                color: "var(--color-brand-navy, #050D24)",
                letterSpacing: "-0.015em",
                margin: 0,
              }}
            >
              {servicesContent.intro}
            </p>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(0.9375rem, 1.05vw, 1.0625rem)",
                fontWeight: 400,
                color: "rgba(5, 13, 36, 0.72)",
                lineHeight: 1.65,
                margin: 0,
                maxWidth: "52ch",
              }}
            >
              {servicesContent.supportingCopy}
            </p>
          </div>
        </div>

        {/* ================================================================== */}
        {/* ASYMMETRIC TWO-COLUMN SHOWCASE (55% List / 45% Visual)             */}
        {/* ================================================================== */}
        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "clamp(2.5rem, 5vw, 5rem)",
            alignItems: "start",
          }}
        >
          {/* LEFT: Four Numbered Editorial Rows (55% weight on desktop) */}
          <div
            role="tablist"
            aria-label="Services List"
            style={{
              borderTop: "1px solid rgba(5, 13, 36, 0.12)",
            }}
          >
            {services.map((service, idx) => {
              const isActive = activeIdx === idx;

              return (
                <div
                  key={service.number}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isActive}
                  aria-controls={`service-panel-${service.number}`}
                  id={`service-tab-${service.number}`}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeaveRow}
                  onFocus={() => handleServiceSelect(idx)}
                  onClick={() => handleServiceSelect(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleServiceSelect(idx);
                    }
                  }}
                  style={{
                    borderBottom: "1px solid rgba(5, 13, 36, 0.12)",
                    paddingBlock: "clamp(1.5rem, 2.5vh, 2.25rem)",
                    cursor: "pointer",
                    outline: "none",
                    position: "relative",
                  }}
                >
                  {/* Row Header: Number + Title + Arrow */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1.5rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(1.25rem, 2.5vw, 2.5rem)" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-manrope)",
                          fontSize: "1.125rem",
                          fontWeight: 500,
                          color: isActive
                            ? "var(--color-brand-blue, #0866FF)"
                            : "rgba(5, 13, 36, 0.38)",
                          transition: "color 0.3s ease",
                          minWidth: "2.5ch",
                        }}
                      >
                        {service.number}
                      </span>

                      <h3
                        style={{
                          fontFamily: "var(--font-manrope)",
                          fontSize: "clamp(1.35rem, 2.2vw, 1.95rem)",
                          fontWeight: isActive ? 600 : 400,
                          letterSpacing: "-0.025em",
                          color: isActive
                            ? "var(--color-brand-navy, #050D24)"
                            : "rgba(5, 13, 36, 0.68)",
                          margin: 0,
                          transition: "color 0.3s ease, font-weight 0.2s ease",
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Arrow Icon Indicator */}
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        border: isActive
                          ? "1px solid var(--color-brand-blue, #0866FF)"
                          : "1px solid rgba(5, 13, 36, 0.15)",
                        backgroundColor: isActive
                          ? "var(--color-brand-blue, #0866FF)"
                          : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isActive ? "#FFFFFF" : "rgba(5, 13, 36, 0.5)",
                        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                        transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* STABLE, ZERO-JUMP CSS GRID ACCORDION */}
                  <div
                    id={`service-panel-${service.number}`}
                    role="region"
                    aria-labelledby={`service-tab-${service.number}`}
                    style={{
                      display: "grid",
                      gridTemplateRows: isActive ? "1fr" : "0fr",
                      transition: shouldReduceMotion
                        ? "none"
                        : "grid-template-rows 550ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div
                      style={{
                        overflow: "hidden",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(6px)",
                        transition: shouldReduceMotion
                          ? "opacity 0.2s ease"
                          : "opacity 400ms ease 100ms, transform 450ms cubic-bezier(0.16, 1, 0.3, 1) 100ms",
                        paddingLeft: "calc(clamp(1.25rem, 2.5vw, 2.5rem) + 2.5ch)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "clamp(0.9375rem, 1.05vw, 1.0625rem)",
                          color: "rgba(5, 13, 36, 0.72)",
                          lineHeight: 1.62,
                          margin: "1.1rem 0 1.25rem 0",
                          maxWidth: "48ch",
                        }}
                      >
                        {service.description}
                      </p>

                      {/* Tags */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.5rem 1rem",
                          marginBottom: "1.25rem",
                        }}
                      >
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontFamily: "var(--font-inter)",
                              fontSize: "0.6875rem",
                              fontWeight: 600,
                              letterSpacing: "0.12em",
                              color: "var(--color-brand-blue, #0866FF)",
                              textTransform: "uppercase",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Explore Service CTA */}
                      <Link
                        href={service.href}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "var(--color-brand-navy, #050D24)",
                          textDecoration: "none",
                          paddingBottom: "2px",
                          borderBottom: "1.5px solid var(--color-brand-blue, #0866FF)",
                          transition: "color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
                        }}
                      >
                        <span>Explore Service</span>
                        <span style={{ fontSize: "1rem", lineHeight: 1 }}>↗</span>
                      </Link>

                      {/* Mobile-only inline preview image */}
                      <div
                        className="service-inline-preview"
                        style={{
                          marginTop: "1.5rem",
                          position: "relative",
                          aspectRatio: "16 / 10",
                          width: "100%",
                          borderRadius: "6px",
                          overflow: "hidden",
                          backgroundColor: "#050D24",
                        }}
                      >
                        <Image
                          src={service.image}
                          alt={`${service.title} preview`}
                          fill
                          sizes="(max-width: 1024px) 90vw, 500px"
                          priority
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Large Cinematic Image Preview (Desktop >= 900px, ~45% weight) */}
          <div
            className="service-desktop-preview"
            style={{
              position: "sticky",
              top: "120px",
              width: "100%",
              aspectRatio: "4 / 5",
              maxHeight: "620px",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#050D24",
              boxShadow: "0 24px 60px -15px rgba(5, 13, 36, 0.15)",
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            {services.map((service, idx) => {
              const isActive = activeIdx === idx;
              const isPrev = prevIdx === idx;

              // Dual-layer cinema crossfade:
              // - Active incoming: zIndex 20, fades from 0 to 1, scales from 1.03 to 1.
              // - Outgoing: zIndex 10, stays at opacity 1, scale 1 underneath until incoming completes.
              // - Inactive: zIndex 0, opacity 0.
              const zIndex = isActive ? 20 : isPrev ? 10 : 0;
              const opacity = isActive || isPrev ? 1 : 0;
              const scale = isActive ? "scale(1)" : isPrev ? "scale(1)" : "scale(1.03)";

              return (
                <div
                  key={`preview-${service.number}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex,
                    opacity,
                    transform: scale,
                    transition: shouldReduceMotion
                      ? "opacity 0.2s ease"
                      : isActive
                      ? "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 650ms cubic-bezier(0.16, 1, 0.3, 1)"
                      : "none",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <Image
                    src={service.image}
                    alt={`${service.title} preview`}
                    fill
                    sizes="(min-width: 1024px) 45vw, 600px"
                    priority
                    style={{
                      objectFit: "cover",
                    }}
                  />

                  {/* Subtle Cinematic Bottom Vignette */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(5, 13, 36, 0.75) 0%, rgba(5, 13, 36, 0.2) 35%, transparent 60%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Overlay Metadata Pill */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1.75rem",
                      left: "1.75rem",
                      right: "1.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: "#FFFFFF",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          color: "var(--color-brand-cyan, #00D1FF)",
                          textTransform: "uppercase",
                          marginBottom: "0.25rem",
                        }}
                      >
                        SERVICE // {service.number}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-manrope)",
                          fontSize: "1.125rem",
                          fontWeight: 500,
                          color: "#FFFFFF",
                        }}
                      >
                        {service.title}
                      </div>
                    </div>

                    <div
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        color: "rgba(255, 255, 255, 0.6)",
                        textTransform: "uppercase",
                      }}
                    >
                      {activeIdx + 1} / {services.length}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scoped Responsive Styles for Service Previews (>= 900px Desktop, < 900px Mobile) */}
      <style>{`
        @media (min-width: 900px) {
          .services-grid {
            grid-template-columns: minmax(0, 1.18fr) minmax(0, 0.82fr) !important;
          }
          .service-inline-preview {
            display: none !important;
          }
          .service-desktop-preview {
            display: block !important;
          }
        }
        @media (max-width: 899px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .service-inline-preview {
            display: block !important;
          }
          .service-desktop-preview {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
