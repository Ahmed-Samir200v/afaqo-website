"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Work.module.css";

interface Capability {
  label: string;
  icon: (props: { className?: string }) => React.JSX.Element;
}

interface FeaturedProject {
  id: string;
  number: string;
  title: string;
  location: string;
  caption: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  href: string;
  capabilities: Capability[];
}

/* Crisp 20x20 inline SVG icons matching Lucide minimalist style (1.5px stroke, round caps/joins) */
function VrHeadsetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a3 3 0 0 1-3 3h-2l-2-2h-4l-2 2H6a3 3 0 0 1-3-3v-4z" />
      <circle cx="8" cy="13" r="1.5" />
      <circle cx="16" cy="13" r="1.5" />
      <path d="M12 9v2" />
    </svg>
  );
}

function Layers3DIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 2 9 4.5-9 4.5-9-4.5z" />
      <path d="m3 11.5 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MountainGridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      <path d="M4.14 15h15.72" />
    </svg>
  );
}

function SunLightingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function FidelityEyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

function RobotKinematicsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16.01" />
      <line x1="16" y1="16" x2="16" y2="16.01" />
    </svg>
  );
}

function InteractiveSlidersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function PhysicsNodesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "industrial-training-experience",
    number: "01",
    title: "Industrial Training Experience",
    location: "CAIRO, EGYPT",
    caption: "High-precision VR facility replication and operational training simulation.",
    description:
      "An immersive training experience that recreates complex industrial environments with high realism, enabling safe, effective, and repeatable operational learning.",
    tags: ["Simulation", "VR Training", "Real-Time 3D"],
    image: "/images/projects/industrial-training/industrial-training.png",
    imageAlt: "Industrial Training Experience VR Procedure Simulation",
    href: "/work/industrial-training-experience",
    capabilities: [
      { label: "VR Simulation", icon: VrHeadsetIcon },
      { label: "Real-Time 3D", icon: Layers3DIcon },
      { label: "Safety Assessment", icon: ShieldCheckIcon },
    ],
  },
  {
    id: "remal-park",
    number: "02",
    title: "Remal Park",
    location: "RIYADH, SAUDI ARABIA",
    caption: "Heritage-scale landscape reconstruction and authentic daylight simulation.",
    description:
      "High-fidelity 3D environments and visual content for an immersive cultural visitor experience, synthesizing authentic desert topography with cutting-edge real-time fidelity.",
    tags: ["Interactive 3D", "Visualization", "Cultural Heritage"],
    image: "/images/projects/remal-park/remal-park.jpg",
    imageAlt: "Remal Park Cultural Visitor Experience 3D Visualization",
    href: "/work/remal-park",
    capabilities: [
      { label: "3D Environments", icon: MountainGridIcon },
      { label: "Authentic Lighting", icon: SunLightingIcon },
      { label: "Realism & Fidelity", icon: FidelityEyeIcon },
    ],
  },
  {
    id: "taf35-robot-simulation",
    number: "03",
    title: "TAF35 Robot Simulation",
    location: "MUSCAT, OMAN",
    caption: "Kinematic digital twin explorer and real-time physical telemetry visualization.",
    description:
      "An interactive application for exploring complex robotic systems in real time, featuring physically grounded kinematic movement, component breakdowns, and live simulation controls.",
    tags: ["Simulation", "Robotics", "Technical Explorer"],
    image: "/images/projects/taf35-robot/taf35-robot.png",
    imageAlt: "TAF35 Robot Interactive Application and Technical Explorer",
    href: "/work/taf35-robot-simulation",
    capabilities: [
      { label: "Robotics Kinematics", icon: RobotKinematicsIcon },
      { label: "Interactive UI", icon: InteractiveSlidersIcon },
      { label: "Physical Modeling", icon: PhysicsNodesIcon },
    ],
  },
];

export function W02FeaturedExperience() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  // Drag / swipe detection
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Check reduced motion preference changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Pause when tab is not visible
  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.visibilityState === "hidden");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const total = FEATURED_PROJECTS.length;
  const currentProject = FEATURED_PROJECTS[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance every 7 seconds
  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const interval = setInterval(goToNext, 7000);
    return () => clearInterval(interval);
  }, [isPaused, reducedMotion, goToNext]);

  // Pointer drag/swipe handling on the image frame
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStartRef.current) return;
    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;
    pointerStartRef.current = null;

    // Minimum swipe threshold: 45px horizontal and more horizontal than vertical
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // GSAP transition when project index changes
  useGSAP(
    () => {
      if (reducedMotion || !sectionRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Subtle image entrance / crossfade zoom
      if (imageWrapperRef.current) {
        tl.fromTo(
          imageWrapperRef.current,
          { opacity: 0.25, scale: 0.985 },
          { opacity: 1, scale: 1, duration: 0.65 },
          0
        );
      }

      // Title masked reveal
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.05
        );
      }

      // Description & tags fade-up
      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.1
        );
      }

      if (tagsRef.current) {
        tl.fromTo(
          tagsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.15
        );
      }

      // CTA button entrance
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45 },
          0.2
        );
      }

      // Capability icons staggered entrance
      if (capabilitiesRef.current) {
        const items = capabilitiesRef.current.querySelectorAll(`.${styles.featuredCapItem}`);
        tl.fromTo(
          items,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          0.2
        );
      }

      // Counter animation
      if (counterRef.current) {
        tl.fromTo(
          counterRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.4 },
          0
        );
      }
    },
    { dependencies: [currentIndex, reducedMotion], scope: sectionRef }
  );

  return (
    <section
      id="featured-work"
      ref={sectionRef}
      className={styles.featuredSection}
      aria-labelledby="featured-work-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className={styles.featuredContainer}>
        {/* Two-Column Showcase Grid (58% Image / 42% Content) */}
        <div className={styles.featuredGrid}>
          {/* LEFT COLUMN: Large Media, Caption, Counter & Controls */}
          <div className={styles.featuredLeftCol}>
            <div
              ref={imageWrapperRef}
              className={styles.featuredImageFrame}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              tabIndex={0}
              role="region"
              aria-label={`Featured project showcase: ${currentProject.title}. Swipe or use controls to navigate.`}
            >
              <Image
                key={currentProject.id}
                src={currentProject.image}
                alt={currentProject.imageAlt}
                fill
                priority={currentIndex === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 780px"
                className={styles.featuredMainImage}
              />
              <div className={styles.featuredImageScrim} />

              {/* Location Badge */}
              <span className={styles.featuredLocationBadge}>
                {currentProject.location}
              </span>
            </div>

            {/* Below-image editorial bar: Caption, Counter & Controls */}
            <div className={styles.featuredMetaBar}>
              <div className={styles.featuredCaptionCol}>
                <span className={styles.featuredProjectNumber}>{currentProject.number}</span>
                <p className={styles.featuredCaptionText}>{currentProject.caption}</p>
              </div>

              <div className={styles.featuredControlsCol}>
                {/* Counter */}
                <div className={styles.featuredCounter} aria-live="polite">
                  <span ref={counterRef} className={styles.featuredCounterActive}>
                    {currentProject.number}
                  </span>
                  <span className={styles.featuredCounterSep}>/</span>
                  <span className={styles.featuredCounterTotal}>0{total}</span>
                </div>

                {/* Previous / Next Controls */}
                <div className={styles.featuredNavArrows}>
                  <button
                    type="button"
                    onClick={goToPrev}
                    className={styles.featuredNavBtn}
                    aria-label="Previous project"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={goToNext}
                    className={`${styles.featuredNavBtn} ${styles.featuredNavBtnNext}`}
                    aria-label="Next project"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Eyebrow, Heading, Description, Tags, CTA, Capabilities */}
          <div className={styles.featuredRightCol}>
            {/* Eyebrow */}
            <div className={styles.featuredEyebrow}>
              <span>02 / FEATURED EXPERIENCE</span>
              <span className={styles.featuredEyebrowLine} aria-hidden="true" />
            </div>

            {/* Large Project Title */}
            <h2 id="featured-work-heading" ref={titleRef} className={styles.featuredHeading}>
              {currentProject.title}
            </h2>

            {/* Description */}
            <p ref={descriptionRef} className={styles.featuredBody}>
              {currentProject.description}
            </p>

            {/* Compact Category Tags */}
            <div ref={tagsRef} className={styles.featuredTagsRow}>
              {currentProject.tags.map((tag) => (
                <span key={tag} className={styles.featuredTagPill}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Electric Blue CTA Button */}
            <div className={styles.featuredCtaWrap}>
              <Link
                ref={ctaRef}
                href={currentProject.href}
                className={styles.featuredCtaButton}
              >
                <span>View Case Study</span>
                <span className={styles.featuredCtaArrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
            </div>

            {/* Divider Line */}
            <div className={styles.featuredDivider} />

            {/* Bottom Row: 3 Minimal Blue Line Icons with Capabilities */}
            <div ref={capabilitiesRef} className={styles.featuredCapabilitiesRow}>
              {currentProject.capabilities.map((cap) => {
                const IconComponent = cap.icon;
                return (
                  <div key={cap.label} className={styles.featuredCapItem}>
                    <div className={styles.featuredCapIconBox}>
                      <IconComponent className={styles.featuredCapIcon} />
                    </div>
                    <span className={styles.featuredCapLabel}>{cap.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
