"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsContent } from "@/content/projects";
import { useMotionPreference } from "@/lib/motion-preference";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Tuned per-project focal crops to preserve authentic architectural, robotic, and industrial figures
const PROJECT_OBJECT_POSITIONS: Record<string, string> = {
  "01": "center 38%", // Remal Park: preserves architectural canopy and sweeping desert landscape
  "02": "center center", // TAF35 Robot: keeps the humanoid robot torso and interactive UI centered
  "03": "center center", // Industrial Training: preserves facility equipment and immersive figures
};

export function H02SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridBgRef = useRef<HTMLDivElement>(null);
  const introEyebrowRef = useRef<HTMLDivElement>(null);
  const introHeadlineRef = useRef<HTMLHeadingElement>(null);
  const introDescRef = useRef<HTMLParagraphElement>(null);
  const introCtaRef = useRef<HTMLAnchorElement>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const floatingCanvasRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const locationRef = useRef<HTMLSpanElement>(null);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metadataRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileCardsRef = useRef<(HTMLElement | null)[]>([]);

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const { shouldReduceMotion } = useMotionPreference();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ======================================================================
      // 1. ARCHITECTURAL BACKGROUND GRID PARALLAX
      // ======================================================================
      if (!shouldReduceMotion && gridBgRef.current && sectionRef.current) {
        gsap.to(gridBgRef.current, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ======================================================================
      // 2. TOP EDITORIAL REVEAL ANIMATION
      // ======================================================================
      if (!shouldReduceMotion && sectionRef.current) {
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        if (introEyebrowRef.current) {
          introTl.fromTo(
            introEyebrowRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0
          );
        }

        if (introHeadlineRef.current) {
          introTl.fromTo(
            introHeadlineRef.current,
            { opacity: 0, yPercent: 100 },
            { opacity: 1, yPercent: 0, duration: 0.85, ease: "power4.out" },
            0.1
          );
        }

        if (introDescRef.current) {
          introTl.fromTo(
            introDescRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            0.22
          );
        }

        if (introCtaRef.current) {
          introTl.fromTo(
            introCtaRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0.32
          );
        }
      }

      // ======================================================================
      // 3. DESKTOP CINEMATIC FLOATING CANVAS & 3-PROJECT STORYTELLING (>= 1024px)
      // Issues 05 (Stable mouse), 06 (No borders/seams), 07 (Consistent 3D depth), 08 (Soft blur into H03)
      // ======================================================================
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (shouldReduceMotion || !stageRef.current) return;

        const validImages = imageRefs.current.filter(Boolean);
        const validMeta = metadataRefs.current.filter(Boolean);
        const count = projectsContent.projects.length;

        // Set initial state for architectural floating canvas (stable, no pitch tilt)
        if (floatingCanvasRef.current) {
          gsap.set(floatingCanvasRef.current, {
            scale: 0.98,
            rotateX: 0,
            y: 0,
            borderRadius: "8px",
            boxShadow: "0 28px 76px -20px rgba(5, 13, 36, 0.16), 0 10px 24px -10px rgba(5, 13, 36, 0.07)",
            transformPerspective: 1400,
            transformOrigin: "center top",
            border: "none",
            outline: "none",
          });
        }

        // Set initial visibility for images and metadata (Project 01 visible on top)
        validImages.forEach((img, idx) => {
          gsap.set(img, {
            opacity: idx === 0 ? 1 : 0,
            scale: idx === 0 ? 1 : 0.985,
            z: idx === 0 ? 0 : -25,
            zIndex: idx === 0 ? 2 : 1,
            border: "none",
            outline: "none",
          });
        });

        validMeta.forEach((meta, idx) => {
          gsap.set(meta, {
            opacity: idx === 0 ? 1 : 0,
            y: idx === 0 ? 0 : 20,
            pointerEvents: idx === 0 ? "auto" : "none",
          });
        });

        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { scaleX: 1 / count });
        }

        // Pinned Storytelling Timeline with Capped Viewport Scroll Track
        // Normalized track prevents desktop scroll fatigue while keeping 3-project storytelling intact
        const scrollDistance = Math.min(Math.max(window.innerHeight * 1.35, 1100), 1450);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 12%",
            end: `+=${scrollDistance}`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              let currentIdx = 0;
              if (progress >= 0.65) {
                currentIdx = 2;
              } else if (progress >= 0.32) {
                currentIdx = 1;
              }
              setActiveProjectIndex(currentIdx);
              if (counterRef.current) {
                counterRef.current.textContent = `0${currentIdx + 1} / 0${count}`;
              }
              if (locationRef.current) {
                locationRef.current.textContent =
                  projectsContent.projects[currentIdx]?.location || "";
              }
            },
          },
        });

        // ------------------------------------------------------------------
        // STAGE A: CONTAINER SCROLL EXPANSION (0.00 -> 0.22)
        // Expands floating canvas toward viewport edges, squares corners
        // ------------------------------------------------------------------
        if (floatingCanvasRef.current) {
          tl.to(
            floatingCanvasRef.current,
            {
              scale: 1.0,
              rotateX: 0,
              y: 0,
              borderRadius: "4px",
              boxShadow: "0 38px 90px -25px rgba(5, 13, 36, 0.22), 0 12px 32px -12px rgba(5, 13, 36, 0.10)",
              duration: 0.25,
              ease: "power2.out",
            },
            0
          );
        }

        // Dwell on Project 01 in expanded state (0.22 -> 0.38)
        tl.to({}, { duration: 0.25 });

        // ------------------------------------------------------------------
        // STAGE B: TRANSITION PROJECT 01 -> PROJECT 02 (0.38 -> 0.65)
        // Consistent 3D depth, seamless crossfade (0 borders / 0 seams), clean text exit
        // ------------------------------------------------------------------
        // Incoming Project 02 enters at zIndex 2 with matching subtle 3D depth settle
        if (validImages[1]) {
          tl.set(validImages[1], { zIndex: 2 }, "trans-0-1");
          tl.fromTo(
            validImages[1],
            { opacity: 0, scale: 0.985, z: -25 },
            { opacity: 1, scale: 1.0, z: 0, duration: 0.45, ease: "power2.out" },
            "trans-0-1+=0.04"
          );
        }

        // Outgoing Project 01 sits at zIndex 1 and gently lifts/fades after incoming is visible
        if (validImages[0]) {
          tl.set(validImages[0], { zIndex: 1 }, "trans-0-1");
          tl.to(
            validImages[0],
            { opacity: 0, scale: 1.025, z: 10, duration: 0.42, ease: "power2.inOut" },
            "trans-0-1+=0.08"
          );
        }

        // Text transitions: Project 01 exits cleanly before Project 02 reveals
        if (validMeta[0]) {
          tl.to(
            validMeta[0],
            { opacity: 0, y: -16, pointerEvents: "none", duration: 0.18, ease: "power2.in" },
            "trans-0-1"
          );
        }
        if (validMeta[1]) {
          tl.to(
            validMeta[1],
            { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.28, ease: "power2.out" },
            "trans-0-1+=0.20"
          );
        }

        // Progress indicator update to 2/3
        if (progressBarRef.current) {
          tl.to(
            progressBarRef.current,
            { scaleX: 2 / count, duration: 0.35, ease: "none" },
            "trans-0-1"
          );
        }

        // Dwell on Project 02 (0.65 -> 0.76)
        tl.to({}, { duration: 0.28 });

        // ------------------------------------------------------------------
        // STAGE C: TRANSITION PROJECT 02 -> PROJECT 03 (0.76 -> 1.05)
        // Consistent 3D depth, seamless crossfade (0 borders / 0 seams), clean text exit
        // ------------------------------------------------------------------
        // Incoming Project 03 enters at zIndex 2 with matching subtle 3D depth settle
        if (validImages[2]) {
          tl.set(validImages[2], { zIndex: 2 }, "trans-1-2");
          tl.fromTo(
            validImages[2],
            { opacity: 0, scale: 0.985, z: -25 },
            { opacity: 1, scale: 1.0, z: 0, duration: 0.45, ease: "power2.out" },
            "trans-1-2+=0.04"
          );
        }

        // Outgoing Project 02 sits at zIndex 1 and gently lifts/fades after incoming is visible
        if (validImages[1]) {
          tl.set(validImages[1], { zIndex: 1 }, "trans-1-2");
          tl.to(
            validImages[1],
            { opacity: 0, scale: 1.025, z: 10, duration: 0.42, ease: "power2.inOut" },
            "trans-1-2+=0.08"
          );
        }

        // Text transitions: Project 02 exits cleanly before Project 03 reveals
        if (validMeta[1]) {
          tl.to(
            validMeta[1],
            { opacity: 0, y: -16, pointerEvents: "none", duration: 0.18, ease: "power2.in" },
            "trans-1-2"
          );
        }
        if (validMeta[2]) {
          tl.to(
            validMeta[2],
            { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.28, ease: "power2.out" },
            "trans-1-2+=0.20"
          );
        }

        // Progress indicator update to 3/3
        if (progressBarRef.current) {
          tl.to(
            progressBarRef.current,
            { scaleX: 3 / count, duration: 0.35, ease: "none" },
            "trans-1-2"
          );
        }

        // Dwell on Project 03 (Project 03 remains 100% sharp and readable)
        tl.to({}, { duration: 0.35 });

        // ------------------------------------------------------------------
        // STAGE D: CLEAN EDITORIAL RELEASE TO NEXT SECTION
        // Outgoing H02 canvas lifts gently with subtle release, zero blur
        // ------------------------------------------------------------------
        if (floatingCanvasRef.current) {
          tl.to(
            floatingCanvasRef.current,
            {
              opacity: 0.94,
              y: -12,
              ease: "power1.out",
              duration: 0.22,
            },
            ">"
          );
        }
      });

      // ======================================================================
      // 4. MOBILE / TABLET STACKED STORYTELLING REVEAL (< 1024px)
      // ======================================================================
      mm.add("(max-width: 1023px)", () => {
        if (shouldReduceMotion) return;

        const cards = mobileCardsRef.current.filter(Boolean);
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  // Interactive project tab jump: smoothly scrolls to corresponding point in pinned timeline
  const handleSelectProject = (targetIdx: number) => {
    if (shouldReduceMotion || !stageRef.current) return;
    const triggers = ScrollTrigger.getAll();
    const stageTrigger = triggers.find((t) => t.trigger === stageRef.current);
    if (stageTrigger) {
      const start = stageTrigger.start;
      const end = stageTrigger.end;
      const dist = end - start;
      let targetScroll = start + dist * 0.15;
      if (targetIdx === 1) targetScroll = start + dist * 0.52;
      if (targetIdx === 2) targetScroll = start + dist * 0.92;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        backgroundColor: "var(--color-canvas-light)",
        color: "var(--color-text-on-light)",
        paddingTop: "clamp(4.5rem, 6.5vw, 6.5rem)",
        paddingBottom: "clamp(5rem, 8vw, 8.5rem)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="AFAQO Selected Work Showcase"
    >

      {/* ====================================================================
          SUBTLE ARCHITECTURAL BACKGROUND GRID (Deep Navy 3.5% Opacity)
          ==================================================================== */}
      <div
        ref={gridBgRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-40px 0 -40px 0",
          backgroundImage:
            "linear-gradient(to right, rgba(5, 13, 36, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(5, 13, 36, 0.035) 1px, transparent 1px)",
          backgroundSize: "clamp(110px, 11vw, 170px) clamp(110px, 11vw, 170px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        className="page-container"
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ====================================================================
            TOP EDITORIAL INTRODUCTION (Tight spacing, visually connected)
            ==================================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(1.5rem, 3.5vw, 3.5rem)",
            alignItems: "end",
            marginBottom: "clamp(2rem, 3.5vw, 3.25rem)",
          }}
        >
          {/* Left Column: Eyebrow + Section Headline */}
          <div>
            <div
              ref={introEyebrowRef}
              className="type-metadata"
              style={{
                color: "var(--color-brand-blue)",
                letterSpacing: "0.16em",
                fontSize: "0.75rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
              }}
            >
              {projectsContent.eyebrow}
            </div>
            <div style={{ overflow: "hidden" }}>
              <h2
                ref={introHeadlineRef}
                style={{
                  fontFamily: "var(--font-manrope)",
                  fontSize: "clamp(2.5rem, 4.8vw, 4.25rem)",
                  fontWeight: 300,
                  lineHeight: 1.06,
                  letterSpacing: "-0.035em",
                  color: "var(--color-brand-navy)",
                  margin: 0,
                }}
              >
                {projectsContent.headline}
              </h2>
            </div>
          </div>

          {/* Right Column: Narrative Body + Editorial Link */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              maxWidth: "52ch",
              justifySelf: "end",
            }}
          >
            <p
              ref={introDescRef}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                color: "rgba(5, 13, 36, 0.72)",
                lineHeight: 1.62,
                margin: 0,
              }}
            >
              {projectsContent.body}
            </p>

            <div>
              <Link
                ref={introCtaRef}
                href={projectsContent.cta.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  color: "var(--color-brand-navy)",
                  borderBottom: "1.5px solid var(--color-brand-blue)",
                  paddingBlock: "0.3rem",
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  transition:
                    "border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-brand-blue)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-brand-navy)";
                }}
              >
                <span>{projectsContent.cta.label}</span>
                <span aria-hidden="true" style={{ color: "var(--color-brand-blue)" }}>
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ====================================================================
            DESKTOP PINNED CINEMATIC SHOWCASE (>= 1024px)
            Container Scroll Expansion + Centered Floating Canvas (Issue 05: Stable mouse)
            ==================================================================== */}
        <div
          ref={stageRef}
          className="h02-desktop-stage"
          style={{
            position: "relative",
            width: "100%",
            marginInline: "auto",
          }}
        >
          {/* PROJECT NAVIGATION BAR (Tabs + Counter + Progress) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "clamp(900px, 86vw, 1480px)",
              marginInline: "auto",
              marginBottom: "1.25rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid rgba(5, 13, 36, 0.08)",
            }}
          >
            {/* Tabs: 01 REMAL | 02 TAF35 | 03 INDUSTRIAL */}
            <div
              style={{
                display: "flex",
                gap: "1.75rem",
                alignItems: "center",
              }}
              aria-label="Project index navigation"
            >
              {projectsContent.projects.map((project, idx) => {
                const isActive = activeProjectIndex === idx;
                const shortTitle = project.title.split(" ")[0];
                return (
                  <button
                    key={project.number}
                    ref={(el) => {
                      navTabRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => handleSelectProject(idx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8125rem",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "var(--color-brand-blue)" : "rgba(5, 13, 36, 0.48)",
                      letterSpacing: "0.04em",
                      background: "none",
                      border: "none",
                      padding: "0.25rem 0",
                      cursor: "pointer",
                      transition: "color 200ms ease",
                    }}
                    aria-label={`Jump to project ${project.number}: ${project.title}`}
                  >
                    <span
                      style={{
                        width: isActive ? "10px" : "4px",
                        height: "4px",
                        backgroundColor: isActive
                          ? "var(--color-brand-blue)"
                          : "rgba(5, 13, 36, 0.25)",
                        borderRadius: "2px",
                        transition: "all 250ms ease",
                      }}
                    />
                    <span>{`0${idx + 1} ${shortTitle}`}</span>
                  </button>
                );
              })}
            </div>

            {/* Right: Thin Progress Bar + Counter + Active Location */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
              }}
            >
              {/* Active Location */}
              <span
                ref={locationRef}
                className="type-metadata"
                style={{
                  color: "rgba(5, 13, 36, 0.55)",
                  letterSpacing: "0.14em",
                  fontSize: "0.75rem",
                }}
              >
                {projectsContent.projects[activeProjectIndex]?.location}
              </span>

              {/* Progress Line */}
              <div
                style={{
                  width: "120px",
                  height: "2px",
                  backgroundColor: "rgba(5, 13, 36, 0.10)",
                  borderRadius: "1px",
                  overflow: "hidden",
                  position: "relative",
                }}
                aria-hidden="true"
              >
                <div
                  ref={progressBarRef}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    backgroundColor: "var(--color-brand-blue)",
                    transformOrigin: "left center",
                  }}
                />
              </div>

              {/* Counter */}
              <span
                ref={counterRef}
                style={{
                  fontFamily: "var(--font-manrope)",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  color: "var(--color-brand-blue)",
                  letterSpacing: "-0.01em",
                  minWidth: "48px",
                  textAlign: "right",
                }}
              >
                {`0${activeProjectIndex + 1} / 0${projectsContent.projects.length}`}
              </span>
            </div>
          </div>

          {/* MAIN FEATURED FLOATING CANVAS CONTAINER (Perspective Stage) */}
          <div
            ref={canvasContainerRef}
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              perspective: "1400px",
            }}
          >
            {/* FLOATING PROJECT CANVAS (Scroll-driven Expansion & 3D Depth, No Mouse Tilt) */}
            <div
              ref={floatingCanvasRef}
              style={{
                position: "relative",
                width: "clamp(900px, 86vw, 1480px)",
                aspectRatio: "16 / 9.5",
                maxHeight: "clamp(460px, 62vh, 720px)",
                backgroundColor: "#050D24",
                overflow: "hidden",
                border: "none",
                outline: "none",
                willChange: "transform, filter, opacity",
              }}
            >
              {/* 3 AUTHENTIC PROJECT IMAGES (Seamless Crossfade with Consistent Depth) */}
              {projectsContent.projects.map((project, idx) => (
                <div
                  key={project.number}
                  ref={(el) => {
                    imageRefs.current[idx] = el;
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    outline: "none",
                    overflow: "hidden",
                    willChange: "transform, opacity",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    priority={idx === 0}
                    sizes="(min-width: 1920px) 1480px, (min-width: 1024px) 88vw, 100vw"
                    className="object-cover"
                    style={{
                      objectPosition:
                        PROJECT_OBJECT_POSITIONS[project.number] || "center center",
                      filter: "brightness(0.96) contrast(1.03)",
                    }}
                  />
                </div>
              ))}

              {/* ATMOSPHERIC GRADIENT OVERLAY (Legibility without dark overcast) */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                  pointerEvents: "none",
                  background:
                    "linear-gradient(to top, rgba(5, 13, 36, 0.92) 0%, rgba(5, 13, 36, 0.55) 30%, rgba(5, 13, 36, 0.15) 58%, transparent 80%)",
                }}
              />

              {/* REFINED PROJECT METADATA OVERLAY (Bottom inside canvas) */}
              {projectsContent.projects.map((project, idx) => (
                <div
                  key={`meta-${project.number}`}
                  ref={(el) => {
                    metadataRefs.current[idx] = el;
                  }}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 4,
                    padding: "clamp(1.75rem, 3.2vw, 3rem)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    gap: "2.5rem",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Left: Project Title, Location, Theme, Description & Role */}
                  <div style={{ maxWidth: "clamp(460px, 52vw, 680px)" }}>
                    {/* Category & Location Badges */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "0.65rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        className="type-metadata"
                        style={{
                          color: "var(--color-brand-cyan)",
                          letterSpacing: "0.14em",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        {project.category}
                      </span>
                      <span
                        aria-hidden="true"
                        style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "0.75rem" }}
                      >
                        •
                      </span>
                      <span
                        className="type-metadata"
                        style={{
                          color: "rgba(255, 255, 255, 0.72)",
                          letterSpacing: "0.12em",
                          fontSize: "0.75rem",
                        }}
                      >
                        {project.location}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3
                      style={{
                        fontFamily: "var(--font-manrope)",
                        fontSize: "clamp(1.85rem, 2.8vw, 2.75rem)",
                        fontWeight: 300,
                        lineHeight: 1.1,
                        letterSpacing: "-0.03em",
                        color: "#FFFFFF",
                        margin: 0,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "clamp(0.875rem, 1vw, 1rem)",
                        color: "rgba(255, 255, 255, 0.82)",
                        lineHeight: 1.55,
                        margin: 0,
                        marginBottom: "1rem",
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Role Pill */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.14)",
                        borderRadius: "4px",
                        padding: "0.35rem 0.75rem",
                      }}
                    >
                      <span
                        className="type-metadata"
                        style={{
                          color: "var(--color-brand-cyan)",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.12em",
                          fontWeight: 600,
                        }}
                      >
                        ROLE
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.75rem",
                          color: "#FFFFFF",
                          fontWeight: 400,
                        }}
                      >
                        {project.role}
                      </span>
                    </div>
                  </div>

                  {/* Right: Explore Project Link with Architectural Hover */}
                  <Link
                    href={project.href}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      color: "var(--color-brand-navy)",
                      padding: "0.8rem 1.4rem",
                      borderRadius: "var(--radius-md, 6px)",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      textDecoration: "none",
                      letterSpacing: "-0.01em",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
                      transition: "background-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--color-brand-blue)";
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
                      e.currentTarget.style.color = "var(--color-brand-navy)";
                    }}
                  >
                    <span>Explore Project</span>
                    <span aria-hidden="true" style={{ fontSize: "1rem" }}>
                      ↗
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ====================================================================
            MOBILE / TABLET CARDS & ACCESSIBLE FALLBACK (< 1024px or Reduced Motion)
            ==================================================================== */}
        <div
          className="h02-mobile-stage"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(2rem, 5vw, 3.5rem)",
            marginTop: "1.5rem",
          }}
        >
          {projectsContent.projects.map((project, idx) => (
            <article
              key={`mobile-${project.number}`}
              ref={(el) => {
                mobileCardsRef.current[idx] = el;
              }}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid rgba(5, 13, 36, 0.08)",
                boxShadow: "0 12px 36px -12px rgba(5, 13, 36, 0.08)",
              }}
            >
              {/* Project Image Frame */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  backgroundColor: "#050D24",
                }}
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 800px"
                  className="object-cover"
                  style={{
                    objectPosition:
                      PROJECT_OBJECT_POSITIONS[project.number] || "center center",
                  }}
                />
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    backgroundColor: "rgba(5, 13, 36, 0.8)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "4px",
                    padding: "0.3rem 0.65rem",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-manrope)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {project.number}
                </div>
              </div>

              {/* Project Content */}
              <div style={{ padding: "clamp(1.25rem, 3.5vw, 2rem)" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginBottom: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="type-metadata"
                    style={{
                      color: "var(--color-brand-blue)",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {project.category}
                  </span>
                  <span aria-hidden="true" style={{ color: "rgba(5, 13, 36, 0.25)" }}>
                    •
                  </span>
                  <span
                    className="type-metadata"
                    style={{
                      color: "rgba(5, 13, 36, 0.6)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {project.location}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-manrope)",
                    fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                    fontWeight: 400,
                    lineHeight: 1.15,
                    letterSpacing: "-0.025em",
                    color: "var(--color-brand-navy)",
                    margin: "0 0 0.75rem 0",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.9375rem",
                    color: "rgba(5, 13, 36, 0.72)",
                    lineHeight: 1.6,
                    margin: "0 0 1.25rem 0",
                  }}
                >
                  {project.description}
                </p>

                <div
                  style={{
                    borderTop: "1px solid rgba(5, 13, 36, 0.08)",
                    paddingTop: "0.85rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div
                    className="type-metadata"
                    style={{
                      color: "rgba(5, 13, 36, 0.48)",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.12em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    OUR ROLE
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.8125rem",
                      color: "rgba(5, 13, 36, 0.88)",
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {project.role}
                  </div>
                </div>

                <Link
                  href={project.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    color: "var(--color-brand-blue)",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "color var(--duration-fast) var(--ease-standard)",
                  }}
                >
                  <span>Explore Project</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
