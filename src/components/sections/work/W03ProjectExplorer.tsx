"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projectsContent, type Project } from "@/content/projects";
import styles from "./Work.module.css";
import { getMotionPreference } from "@/lib/motion-preference";

const CATEGORIES = [
  "All Work",
  "Immersive XR",
  "Digital Twins",
  "Interactive 3D",
  "Visualization",
] as const;

type CategoryType = (typeof CATEGORIES)[number];

/* Individual 3D Tilt Project Card */
function ProjectTiltCard({
  project,
  isDragging,
  index,
}: {
  project: Project;
  isDragging: boolean;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);
  const quickLift = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      if (!innerRef.current) return;
      quickX.current = gsap.quickTo(innerRef.current, "rotateY", {
        duration: 0.35,
        ease: "power2.out",
      });
      quickY.current = gsap.quickTo(innerRef.current, "rotateX", {
        duration: 0.35,
        ease: "power2.out",
      });
      quickLift.current = gsap.quickTo(innerRef.current, "y", {
        duration: 0.35,
        ease: "power2.out",
      });
    },
    { scope: cardRef }
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Disable tilt while dragging or on touch devices
    if (isDragging || !cardRef.current || !innerRef.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Constraints: rotateX max ±5deg, rotateY max ±7deg, translateY: -6px
    const rotateY = x * 14; // ±7deg
    const rotateX = -y * 10; // ±5deg

    if (quickX.current) quickX.current(rotateY);
    if (quickY.current) quickY.current(rotateX);
    if (quickLift.current) quickLift.current(-6);

    // Dynamic light reflection highlight
    if (reflectionRef.current) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      reflectionRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 65%)`;
      reflectionRef.current.style.opacity = "1";
    }
  };

  const handlePointerLeave = () => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });

    if (reflectionRef.current) {
      reflectionRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      className={styles.explorerCardPerspective}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div ref={innerRef} className={styles.explorerCardInner}>
        {/* Subtle dynamic light reflection overlay */}
        <div ref={reflectionRef} className={styles.explorerCardReflection} aria-hidden="true" />

        <Link
          href={project.href}
          className={styles.explorerCardLink}
          tabIndex={0}
          aria-label={`View ${project.title} case study`}
          onClick={(e) => {
            if (isDragging) e.preventDefault();
          }}
        >
          {/* Depth Layer 1: Image Frame (translateZ: 12px) */}
          <div className={styles.explorerCardImageWrap}>
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 768px) 82vw, (max-width: 1200px) 360px, 420px"
              className={styles.explorerCardImage}
              priority={index < 2}
            />
            <div className={styles.explorerImageOverlay} />
          </div>

          {/* Depth Layer 2: Content Details (translateZ: 20px) */}
          <div className={styles.explorerCardContent}>
            <div className={styles.explorerCardTextMeta}>
              <h3 className={styles.explorerCardTitle}>{project.title}</h3>

              <div className={styles.explorerTagsRow}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.explorerTagBadge}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Depth Layer 3: Circular Action Arrow (translateZ: 24px) */}
            <div className={styles.explorerArrowCircle} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export function W03ProjectExplorer() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("All Work");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [progressRatio, setProgressRatio] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const filtersNavRef = useRef<HTMLElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);

  // Mouse drag state
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  // Filter projects by category
  const filteredProjects = projectsContent.projects.filter((project: Project) => {
    if (activeCategory === "All Work") return true;
    if (project.filterCategory === activeCategory) return true;
    if (project.tags.some((t) => t.toLowerCase() === activeCategory.toLowerCase())) return true;
    return false;
  });

  // Calculate scroll position, scroll bounds, and progress bar ratio
  const updateScrollState = useCallback(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < maxScroll - 6);

    if (maxScroll <= 0) {
      setProgressRatio(1);
    } else {
      const ratio = Math.max(0, Math.min(1, scrollLeft / maxScroll));
      setProgressRatio(ratio);
    }
  }, []);

  useEffect(() => {
    const track = carouselTrackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, filteredProjects.length]);

  // Reset carousel scroll on category filter change
  const handleCategorySelect = (category: CategoryType) => {
    setActiveCategory(category);
    if (carouselTrackRef.current) {
      carouselTrackRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Programmatic scroll with navigation buttons
  const scrollStep = (direction: "left" | "right") => {
    const track = carouselTrackRef.current;
    if (!track) return;

    const cardWidth = 444; // Card width + gap
    const delta = direction === "right" ? cardWidth : -cardWidth;
    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  // Mouse Drag / Touch Swipe handlers for the carousel track
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary mouse button or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;
    if (!carouselTrackRef.current) return;

    isPointerDownRef.current = true;
    startXRef.current = e.clientX;
    scrollLeftRef.current = carouselTrackRef.current.scrollLeft;
    setIsDragging(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || !carouselTrackRef.current) return;

    const deltaX = e.clientX - startXRef.current;
    if (Math.abs(deltaX) > 8) {
      setIsDragging(true);
      carouselTrackRef.current.scrollLeft = scrollLeftRef.current - deltaX;
    }
  };

  const handlePointerUpOrLeave = () => {
    isPointerDownRef.current = false;
    // Delay resetting isDragging briefly so onClick handlers recognize the drag
    setTimeout(() => setIsDragging(false), 50);
  };

  // GSAP scroll entrance animation
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      if (getMotionPreference().shouldReduceMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      });

      if (eyebrowRef.current) {
        tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0);
      }

      if (headlineRef.current) {
        tl.fromTo(headlineRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1);
      }

      if (filtersNavRef.current) {
        tl.fromTo(filtersNavRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.2);
      }

      if (carouselTrackRef.current) {
        const cards = carouselTrackRef.current.children;
        tl.fromTo(
          cards,
          { opacity: 0, y: 28, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12 },
          0.3
        );
      }

      if (progressTrackRef.current) {
        tl.fromTo(progressTrackRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.45);
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className={styles.explorerSection}
      aria-labelledby="project-explorer-heading"
    >
      <div className={styles.explorerHeaderContainer}>
        {/* Top Header Row: Eyebrow + Right Supporting Statement */}
        <div className={styles.explorerTopRow}>
          <div ref={eyebrowRef} className={styles.explorerEyebrow}>
            <span>03 / PROJECT EXPLORER</span>
            <span className={styles.explorerEyebrowLine} aria-hidden="true" />
          </div>

          <div className={styles.explorerSupportText}>
            <span>REAL-WORLD IMPACT THROUGH</span>
            <span>IMMERSIVE TECHNOLOGIES.</span>
          </div>
        </div>

        {/* Section Headline */}
        <h2 id="project-explorer-heading" ref={headlineRef} className={styles.explorerHeading}>
          Explore our work<span className={styles.explorerHeadingAccent}>.</span>
        </h2>

        {/* Header Controls Bar: Filter Tabs Left, Nav Buttons Right */}
        <div className={styles.explorerControlsRow}>
          {/* Category Filter Navigation */}
          <nav
            ref={filtersNavRef}
            aria-label="Project category filters"
            className={styles.explorerFilterNav}
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategorySelect(category)}
                  className={`${styles.explorerFilterBtn} ${
                    isActive ? styles.explorerFilterBtnActive : ""
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{category}</span>
                  {isActive && <span className={styles.explorerActiveUnderline} aria-hidden="true" />}
                </button>
              );
            })}
          </nav>

          {/* Carousel Previous / Next Navigation Arrows */}
          <div className={styles.explorerNavArrows}>
            <button
              type="button"
              onClick={() => scrollStep("left")}
              disabled={!canScrollLeft}
              className={`${styles.explorerNavArrowBtn} ${styles.explorerNavPrev}`}
              aria-label="Scroll projects carousel left"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scrollStep("right")}
              disabled={!canScrollRight}
              className={`${styles.explorerNavArrowBtn} ${styles.explorerNavNext}`}
              aria-label="Scroll projects carousel right"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div className={styles.explorerCarouselContainer}>
        <div
          ref={carouselTrackRef}
          className={styles.explorerTrack}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrLeave}
          onPointerCancel={handlePointerUpOrLeave}
          tabIndex={0}
          role="region"
          aria-label="Projects horizontal scroll carousel"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <ProjectTiltCard
                key={project.slug}
                project={project}
                isDragging={isDragging}
                index={idx}
              />
            ))
          ) : (
            /* Elegant empty state card when category has no published records */
            <div className={styles.explorerEmptyStateCard}>
              <div className={styles.explorerEmptyIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h4 className={styles.explorerEmptyTitle}>Digital Twin Case Studies in Publication</h4>
              <p className={styles.explorerEmptyText}>
                Active industrial digital twin projects and engineering validations are scheduled for publication.
              </p>
              <button
                type="button"
                onClick={() => handleCategorySelect("All Work")}
                className={styles.explorerEmptyResetBtn}
              >
                <span>View All Work</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar & Counter Bar */}
      <div ref={progressTrackRef} className={styles.explorerProgressContainer}>
        <div className={styles.explorerProgressBarTrack}>
          <div
            className={styles.explorerProgressBarFill}
            style={{ width: `${Math.max(15, progressRatio * 100)}%` }}
            aria-hidden="true"
          />
        </div>

        <div className={styles.explorerCounterText} aria-live="polite">
          <span className={styles.explorerCounterCurrent}>
            {filteredProjects.length > 0 ? "01" : "00"}
          </span>
          <span className={styles.explorerCounterSep}>/</span>
          <span className={styles.explorerCounterTotal}>
            {filteredProjects.length < 10 ? `0${filteredProjects.length}` : filteredProjects.length}
          </span>
        </div>
      </div>
    </section>
  );
}
