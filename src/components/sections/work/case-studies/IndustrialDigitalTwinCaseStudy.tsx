"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "./IndustrialDigitalTwinCaseStudy.module.css";
import { getMotionPreference } from "@/lib/motion-preference";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================================================
// ASSET PATH CONSTANTS (Verified from public/images/projects/industrial-training/oil and gas/)
// ==========================================================================
const MEDIA_BASE = "/images/projects/industrial-training/oil%20and%20gas/";

const P01_HERO_VIDEO = `${MEDIA_BASE}Creating_industrial_showcase_video_1080p_20261018000805.mp4`;
const P01_HERO_POSTER = `${MEDIA_BASE}Image%20Sequence_001_0000.jpg`;

const P02_CONTEXT_IMAGE = `${MEDIA_BASE}6ea3312c-e070-4428-9702-085a491faef5.png`;

const P03_PID_DIAGRAM = `${MEDIA_BASE}95ae18b8-9180-4c82-b6f0-458551ddd4b5.png`;
const P03_3D_MODEL = `${MEDIA_BASE}fc3f5f13-4e7f-4d91-85b7-110f8d37f1f9.png`;

const P04_STAGES = [
  {
    index: "STAGE 01",
    title: "Engineering Reference Reading",
    desc: "Translating Process & Instrumentation Diagrams (P&IDs) and layout drawings into spatial coordinates, establishing equipment footprints, pipe rack elevations, and functional process streams.",
    takeaway: "Contextual translation from 2D engineering schematics",
    image: `${MEDIA_BASE}ea9d0fc6-f346-42f3-8663-dcde7fb0f109.png`,
    alt: "P&ID Process Reference Diagram",
  },
  {
    index: "STAGE 02",
    title: "Mechanical Component Decomposition",
    desc: "Deconstructing pump skids, electric drive motors, fluid manifolds, and local control consoles into modular sub-assemblies for exploded structural inspection.",
    takeaway: "Mechanical hierarchy and sub-component isolation",
    image: `${MEDIA_BASE}30a2d880-c678-4853-95a7-c734bd0934d6.png`,
    alt: "Exploded pump-skid assembly with mechanical hierarchy",
  },
  {
    index: "STAGE 03",
    title: "PBR Industrial Shading & Materials",
    desc: "Authoring physically-based materials replicating cast steel, brushed metals, galvanized pipework, industrial coatings, and safety-critical hazard markings.",
    takeaway: "Calibrated optical reflectance and corrosion properties",
    image: `${MEDIA_BASE}fc3f5f13-4e7f-4d91-85b7-110f8d37f1f9.png`,
    alt: "Isolated process-skid model with color-coded routing",
  },
  {
    index: "STAGE 04",
    title: "Spatial Facility Assembly",
    desc: "Composing modular skids, overhead structural steel frames, pipe bridges, and auxiliary support buildings into a cohesive, navigable industrial scene.",
    takeaway: "Integration of multi-scale plant equipment and infrastructure",
    image: `${MEDIA_BASE}de83fd7a-6c84-434f-9cb3-f29c64f9ae2b.png`,
    alt: "Wide assembled pump skids and structural framework",
  },
  {
    index: "STAGE 05",
    title: "Real-Time Scene Optimization",
    desc: "Optimizing polygon budgets, draw-call batches, and collision volumes to achieve smooth interactive framerates across enterprise desktop workstations.",
    takeaway: "Performance-tuned meshes and interactive inspection states",
    image: `${MEDIA_BASE}8c9e6730-aec3-4309-857d-47dc96db0384.png`,
    alt: "Modular support building and plant infrastructure",
  },
];

const P05_GALLERY_ITEMS = [
  {
    type: "image" as const,
    src: `${MEDIA_BASE}de83fd7a-6c84-434f-9cb3-f29c64f9ae2b.png`,
    thumb: `${MEDIA_BASE}de83fd7a-6c84-434f-9cb3-f29c64f9ae2b.png`,
    title: "Multi-Skid Pumping Complex",
    caption: "Wide perspective of assembled pump skids, structural steel framework, and overhead piping manifolds.",
    evidence: "3D Facility Reconstruction",
  },
  {
    type: "image" as const,
    src: `${MEDIA_BASE}42c031f4-e7d3-495f-8e4d-5b7b397c2d82.png`,
    thumb: `${MEDIA_BASE}42c031f4-e7d3-495f-8e4d-5b7b397c2d82.png`,
    title: "Pump Skid & Local Control Cabinet",
    caption: "Close equipment inspection showing electric drive motor, fluid coupling, and local emergency controls.",
    evidence: "Equipment Detail",
  },
  {
    type: "image" as const,
    src: `${MEDIA_BASE}8a47c34f-a8b4-49c4-9d2a-37954110d509.png`,
    thumb: `${MEDIA_BASE}8a47c34f-a8b4-49c4-9d2a-37954110d509.png`,
    title: "High-Pressure Piping & Headers",
    caption: "Complex manifold connections, utility distribution lines, and industrial valve stations.",
    evidence: "Piping Network",
  },
  {
    type: "image" as const,
    src: `${MEDIA_BASE}f310aca6-30d4-4587-8fdc-3a82bb09199b.png`,
    thumb: `${MEDIA_BASE}f310aca6-30d4-4587-8fdc-3a82bb09199b.png`,
    title: "Front Perspective & Maintenance Clearance",
    caption: "Front three-quarter view illustrating operational access and equipment maintenance spacing.",
    evidence: "Facility Assembly",
  },
  {
    type: "video" as const,
    src: `${MEDIA_BASE}XR_plant_orientation_camera_move._20261018000901.mp4`,
    thumb: `${MEDIA_BASE}Copy%20of%20Image%20Sequence_002_0000.jpg`,
    poster: `${MEDIA_BASE}Copy%20of%20Image%20Sequence_002_0000.jpg`,
    title: "Spatial Traversal & Orientation Move",
    caption: "Cinematic camera move traversing the outdoor plant environment with dynamic path cues.",
    evidence: "Camera Traversal Sequence",
  },
];

const P06_SIM_VIDEO = `${MEDIA_BASE}Create_interactive_plant_sequence_1080p_20261018000344.mp4`;
const P06_SIM_POSTER = `${MEDIA_BASE}691669b8-34da-4ef1-9349-1b0c6ba4b234.png`;
const P06_SIM_STILL_1 = `${MEDIA_BASE}691669b8-34da-4ef1-9349-1b0c6ba4b234.png`;
const P06_SIM_STILL_2 = `${MEDIA_BASE}206bf61e-cb4e-4aba-a60a-483ff213b4e5.png`;

export function IndustrialDigitalTwinCaseStudy() {
  // P01 Hero Refs & State
  const heroRef = useRef<HTMLElement>(null);
  const theaterRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const eyebrowLineRef = useRef<HTMLSpanElement>(null);
  const eyebrowTagsRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const metaRowRef = useRef<HTMLDivElement>(null);

  const [isHeroPlaying, setIsHeroPlaying] = useState<boolean>(true);
  const [heroManuallyPaused, setHeroManuallyPaused] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // P03 Translation State
  const [translationTab, setTranslationTab] = useState<number>(0);

  // P04 Pipeline State
  const [activePipelineStage, setActivePipelineStage] = useState<number>(1);

  // P05 Gallery State
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const galleryVideoRef = useRef<HTMLVideoElement>(null);

  // P06 Simulation State
  const simVideoRef = useRef<HTMLVideoElement>(null);
  const [isSimPlaying, setIsSimPlaying] = useState<boolean>(true);
  const [simManuallyPaused, setSimManuallyPaused] = useState<boolean>(false);

  // Section Refs for GSAP ScrollTrigger
  const p02Ref = useRef<HTMLElement>(null);
  const p03Ref = useRef<HTMLElement>(null);
  const p04Ref = useRef<HTMLElement>(null);
  const p05Ref = useRef<HTMLElement>(null);
  const p06Ref = useRef<HTMLElement>(null);
  const p07Ref = useRef<HTMLElement>(null);

  // ------------------------------------------------------------------------
  // P01 HERO PLAY / PAUSE
  // ------------------------------------------------------------------------
  const toggleHeroPlay = useCallback(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsHeroPlaying(true);
          setHeroManuallyPaused(false);
        })
        .catch(() => setIsHeroPlaying(false));
    } else {
      video.pause();
      setIsHeroPlaying(false);
      setHeroManuallyPaused(true);
    }
  }, []);

  // ------------------------------------------------------------------------
  // P06 SIMULATION PLAY / PAUSE
  // ------------------------------------------------------------------------
  const toggleSimPlay = useCallback(() => {
    const video = simVideoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsSimPlaying(true);
          setSimManuallyPaused(false);
        })
        .catch(() => setIsSimPlaying(false));
    } else {
      video.pause();
      setIsSimPlaying(false);
      setSimManuallyPaused(true);
    }
  }, []);

  // ------------------------------------------------------------------------
  // P05 GALLERY NAVIGATION
  // ------------------------------------------------------------------------
  const nextGalleryItem = useCallback(() => {
    setActiveGalleryIndex((prev) => (prev + 1) % P05_GALLERY_ITEMS.length);
  }, []);

  const prevGalleryItem = useCallback(() => {
    setActiveGalleryIndex((prev) =>
      prev === 0 ? P05_GALLERY_ITEMS.length - 1 : prev - 1
    );
  }, []);

  // ------------------------------------------------------------------------
  // VIDEO LIFECYCLE & REDUCED MOTION MANAGEMENT
  // ------------------------------------------------------------------------
  useEffect(() => {
    const heroVid = heroVideoRef.current;
    const simVid = simVideoRef.current;

    const prefersReduced = getMotionPreference().shouldReduceMotion;

    if (prefersReduced) {
      if (heroVid) heroVid.pause();
      if (simVid) simVid.pause();
      queueMicrotask(() => {
        setIsReducedMotion(true);
        setIsHeroPlaying(false);
        setIsSimPlaying(false);
      });
      return;
    }

    // Try muted autoplay on mount for hero video
    if (heroVid) {
      heroVid.muted = true;
      heroVid
        .play()
        .then(() => setIsHeroPlaying(true))
        .catch(() => setIsHeroPlaying(false));
    }

    // Tab visibility handling
    const handleVisibility = () => {
      const isHidden = document.visibilityState === "hidden";
      if (isHidden) {
        if (heroVid) heroVid.pause();
        if (simVid) simVid.pause();
      } else {
        if (heroVid && !heroManuallyPaused && !getMotionPreference().shouldReduceMotion) {
          heroVid.play().catch(() => {});
        }
        if (simVid && !simManuallyPaused && !getMotionPreference().shouldReduceMotion) {
          simVid.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    // Viewport Intersection Observers for automatic pause
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroVid) {
            if (!entry.isIntersecting) {
              heroVid?.pause();
            } else if (!heroManuallyPaused && !getMotionPreference().shouldReduceMotion) {
              heroVid?.play().catch(() => {});
            }
          } else if (entry.target === simVid) {
            if (!entry.isIntersecting) {
              simVid?.pause();
            } else if (!simManuallyPaused && !getMotionPreference().shouldReduceMotion) {
              simVid?.play().catch(() => {});
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (heroVid) observer.observe(heroVid);
    if (simVid) observer.observe(simVid);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, [heroManuallyPaused, simManuallyPaused]);

  // ------------------------------------------------------------------------
  // GSAP SCROLLTRIGGER ENTRANCES & TIMELINES
  // ------------------------------------------------------------------------
  useEffect(() => {
    const prefersReduced = getMotionPreference().shouldReduceMotion;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. P01 Cinematic Hero Reveal
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (eyebrowLineRef.current) {
        tl.fromTo(eyebrowLineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.45 });
      }

      if (eyebrowTagsRef.current) {
        tl.fromTo(eyebrowTagsRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.25");
      }

      const titleLines = [titleLine1Ref.current, titleLine2Ref.current].filter(Boolean);
      if (titleLines.length > 0) {
        tl.fromTo(titleLines, { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.08 }, "-=0.2");
      }

      const editorialItems = [statementRef.current, descriptionRef.current, metaRowRef.current].filter(Boolean);
      if (editorialItems.length > 0) {
        tl.fromTo(editorialItems, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, "-=0.35");
      }

      if (theaterRef.current) {
        tl.fromTo(
          theaterRef.current,
          { clipPath: "inset(5% round 16px)", opacity: 0, scale: 0.985 },
          { clipPath: "inset(0% round 16px)", opacity: 1, scale: 1, duration: 0.9 },
          "-=0.4"
        );
      }

      // Desktop-only subtle scroll settle for hero media
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (min-height: 720px)", () => {
        if (heroVideoRef.current && heroRef.current) {
          gsap.fromTo(
            heroVideoRef.current,
            { scale: 1.04 },
            {
              scale: 1.0,
              ease: "none",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        }
      });

      // 2. P02 Overview Reveal
      if (p02Ref.current) {
        gsap.from(p02Ref.current.querySelectorAll(`.${styles.overviewGrid} > div`), {
          y: 24,
          opacity: 0,
          duration: 0.65,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: p02Ref.current,
            start: "top 78%",
          },
        });
      }

      // 3. P03 Translation Reveal
      if (p03Ref.current) {
        gsap.from(p03Ref.current.querySelector(`.${styles.comparisonStage}`), {
          scale: 0.97,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: p03Ref.current,
            start: "top 72%",
          },
        });
      }

      // 4. P04 Pipeline Reveal
      if (p04Ref.current) {
        gsap.from(p04Ref.current.querySelector(`.${styles.pipelineStageCard}`), {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: p04Ref.current,
            start: "top 75%",
          },
        });
      }

      // 5. P05 Facility Explorer Reveal
      if (p05Ref.current) {
        gsap.from(p05Ref.current.querySelector(`.${styles.galleryMainTheater}`), {
          opacity: 0,
          y: 24,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: p05Ref.current,
            start: "top 72%",
          },
        });
      }

      // 6. P06 Simulation Reveal
      if (p06Ref.current) {
        gsap.from(p06Ref.current.querySelectorAll(`.${styles.simCapabilityCard}`), {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: p06Ref.current,
            start: "top 75%",
          },
        });
      }

      // 7. P07 Specification Reveal
      if (p07Ref.current) {
        gsap.from(p07Ref.current.querySelectorAll(`.${styles.specCard}`), {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: p07Ref.current,
            start: "top 78%",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const activeGallery = P05_GALLERY_ITEMS[activeGalleryIndex];
  const activePipeline = P04_STAGES[activePipelineStage];

  return (
    <div className={styles.pageContainer}>
      {/* Official AFAQO Navigation Header */}
      <Header />

      <main className={styles.mainContent}>
        {/* ==================================================================
            P01 — CINEMATIC HERO (DEEP NAVY)
            ================================================================== */}
        <section
          ref={heroRef}
          className={styles.heroSection}
          aria-labelledby="case-study-hero-title"
        >
          <div className={styles.heroBackdropAura} aria-hidden="true" />

          <div className={styles.heroInner}>
            <div className={styles.backLinkWrapper}>
              <Link
                href="/work"
                className={styles.backLink}
                aria-label="Return to selected work portfolio"
              >
                <span className={styles.backLinkArrow} aria-hidden="true">
                  ←
                </span>
                <span>Back to Selected Work</span>
              </Link>
            </div>

            <header className={styles.editorialHeader}>
              <div ref={eyebrowTagsRef} className={styles.eyebrowRow}>
                <span className={styles.eyebrowIndex}>03 / CASE STUDY</span>
                <span
                  ref={eyebrowLineRef}
                  className={styles.eyebrowLine}
                  aria-hidden="true"
                />
                <span className={styles.eyebrowTag}>
                  REAL-TIME 3D / INTERACTIVE SIMULATION
                </span>
              </div>

              <h1 id="case-study-hero-title" className={styles.heroTitle}>
                <div className={styles.titleMask}>
                  <span ref={titleLine1Ref} className={styles.titleLine}>
                    INDUSTRIAL DIGITAL TWIN
                  </span>
                </div>
                <div className={styles.titleMask}>
                  <span ref={titleLine2Ref} className={styles.titleLine}>
                    &amp; INTERACTIVE TRAINING
                  </span>
                </div>
              </h1>

              <div ref={statementRef} className={styles.heroStatementWrapper}>
                <p className={styles.heroStatement}>
                  From engineering documentation to interactive digital reality.
                </p>
              </div>

              <div ref={descriptionRef} className={styles.heroDescriptionWrapper}>
                <p className={styles.heroDescription}>
                  A visual production journey connecting process references,
                  detailed equipment and an explorable industrial environment.
                </p>
              </div>

              <div ref={metaRowRef} className={styles.metaRow}>
                <span className={styles.metaItem}>
                  [REAL-TIME 3D / INTERACTIVE SIMULATION]
                </span>
                <span className={styles.metaBullet} aria-hidden="true">
                  •
                </span>
                <span className={styles.metaItem}>
                  [INDUSTRIAL OPERATIONS]
                </span>
                <span className={styles.metaBullet} aria-hidden="true">
                  •
                </span>
                <span className={styles.metaItem}>
                  [SPATIAL FACILITY RECONSTRUCTION]
                </span>
              </div>
            </header>

            <div ref={theaterRef} className={styles.theaterContainer}>
              <div className={styles.aspectFrame}>
                <video
                  ref={heroVideoRef}
                  className={styles.heroVideo}
                  src={P01_HERO_VIDEO}
                  poster={P01_HERO_POSTER}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Camera sequence moving through a modeled industrial processing facility."
                >
                  <track kind="captions" />
                  Your browser does not support HTML5 video playback.
                </video>

                <div className={styles.mediaGradientProtection} aria-hidden="true" />

                <div className={styles.mediaOverlayBar}>
                  <div className={styles.evidenceBlock}>
                    <div className={styles.evidenceClassPill}>
                      <span className={styles.evidenceClassDot} aria-hidden="true" />
                      <span>3D Facility Visualization</span>
                    </div>
                    <p className={styles.mediaCaption}>
                      Camera sequence moving through a modeled industrial processing facility.
                    </p>
                  </div>

                  <div className={styles.mediaControls}>
                    <button
                      type="button"
                      onClick={toggleHeroPlay}
                      className={styles.playPauseButton}
                      aria-label={
                        isHeroPlaying
                          ? "Pause background showcase video"
                          : "Play background showcase video"
                      }
                      title={isHeroPlaying ? "Pause video" : "Play video"}
                    >
                      {isHeroPlaying ? (
                        <>
                          <svg className={styles.playPauseIcon} viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="5" y="4" width="4" height="16" rx="1" />
                            <rect x="15" y="4" width="4" height="16" rx="1" />
                          </svg>
                          <span className={styles.playPauseLabel}>Showcase Active</span>
                        </>
                      ) : (
                        <>
                          <svg className={styles.playPauseIcon} viewBox="0 0 24 24" aria-hidden="true">
                            <polygon points="6,4 20,12 6,20" />
                          </svg>
                          <span className={styles.playPauseLabel}>Play</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.scrollCueContainer}>
              <div className={styles.scrollCueStatus}>
                <span
                  className={`${styles.scrollCueIndicator} ${
                    isHeroPlaying && !isReducedMotion ? styles.scrollCueIndicatorLive : ""
                  }`}
                  aria-hidden="true"
                />
                <span>Real-Time Production Environment</span>
              </div>
              <div>
                <span>AFAQO CREATIVE TECHNOLOGY</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            P02 — PROJECT OVERVIEW & EVIDENCE FRAME (SOFT IVORY #F9F8F4)
            ================================================================== */}
        <section
          ref={p02Ref}
          className={styles.overviewSection}
          aria-labelledby="overview-heading"
        >
          <div className={styles.sectionContainer}>
            <div className={styles.sectionEyebrowRow}>
              <span className={styles.sectionEyebrowDark}>01 // PROJECT OVERVIEW</span>
              <span className={styles.sectionEyebrowLineDark} aria-hidden="true" />
            </div>

            <h2 id="overview-heading" className={styles.sectionHeadingDark}>
              Systems become <span className={styles.accentWordBlue}>space.</span>
            </h2>

            <div className={styles.overviewGrid}>
              {/* Main 7-Column Editorial Content */}
              <div className={styles.overviewMainColumn}>
                <p className={styles.overviewLead}>
                  The project brings industrial process information into a spatial, interactive format.
                  Supplied diagrams establish system relationships; equipment studies resolve individual
                  assemblies; facility views bring those assets together; and interactive captures demonstrate
                  how users can inspect equipment, follow highlighted routes and move through the environment.
                </p>

                <div className={styles.challengeBox}>
                  <h3 className={styles.challengeTitle}>The Multi-Scale Challenge</h3>
                  <p className={styles.challengeBody}>
                    Industrial systems operate at several scales: process logic, equipment construction,
                    facility layout and user context. The creative challenge was to connect those layers
                    without reducing the work to a decorative plant render or an unreadable engineering diagram.
                  </p>
                </div>

                <div className={styles.overviewContextMedia}>
                  <div className={styles.overviewContextFrame}>
                    <Image
                      src={P02_CONTEXT_IMAGE}
                      alt="Contextual visualization of an industrial coastal processing facility"
                      fill
                      sizes="(max-width: 1024px) 100vw, 750px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.overviewContextCaption}>
                    <span>Contextual coastal facility visualization</span>
                    <span style={{ fontSize: "0.72rem", color: "#0866FF", fontWeight: 600 }}>
                      [CONTEXT VISUALIZATION]
                    </span>
                  </div>
                </div>
              </div>

              {/* 5-Column Scope & Taxonomy Sidebar */}
              <aside className={styles.overviewSidebar} aria-label="Project Scope and Taxonomy">
                <div className={styles.evidenceScopeCard}>
                  <h3 className={styles.evidenceScopeHeading}>
                    <span>Evidence Scope</span>
                    <span className={styles.evidenceScopeBadge}>VERIFIED</span>
                  </h3>
                  <p className={styles.evidenceScopeBody}>
                    This case study documents the supplied visual material. Client identity, facility location,
                    production software, target hardware and measured training outcomes are not stated
                    because they have not been independently verified.
                  </p>
                </div>

                <div className={styles.taxonomyGrid}>
                  <div className={styles.taxonomyCard}>
                    <span className={styles.taxonomyLabel}>Industry</span>
                    <span className={styles.taxonomyValue}>Industrial Operations</span>
                  </div>
                  <div className={styles.taxonomyCard}>
                    <span className={styles.taxonomyLabel}>Category</span>
                    <span className={styles.taxonomyValue}>Real-Time 3D / Interactive Simulation</span>
                  </div>
                  <div className={styles.taxonomyCard}>
                    <span className={styles.taxonomyLabel}>Production Scope</span>
                    <span className={styles.taxonomyValue}>2D References → 3D Mesh Assemblies → Real-Time Scene</span>
                  </div>
                  <div className={styles.taxonomyCard}>
                    <span className={styles.taxonomyLabel}>Key Assets</span>
                    <span className={styles.taxonomyValue}>Modular Pump Skids, Pipe Networks, Control Buildings</span>
                  </div>
                  <div className={styles.taxonomyCard}>
                    <span className={styles.taxonomyLabel}>Studio Role</span>
                    <span className={styles.taxonomyValue}>Environmental Modeling &amp; Real-Time Presentation</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ==================================================================
            P03 — ENGINEERING TO DIGITAL REALITY (DEEP NAVY)
            ================================================================== */}
        <section
          ref={p03Ref}
          className={styles.translationSection}
          aria-labelledby="translation-heading"
        >
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeaderCenter}>
              <div className={styles.sectionEyebrowRow} style={{ justifyContent: "center" }}>
                <span className={styles.sectionEyebrowLight}>02 // TRANSLATION</span>
                <span className={styles.sectionEyebrowLineLight} aria-hidden="true" />
              </div>
              <h2 id="translation-heading" className={styles.sectionHeadingLight}>
                From Engineering Logic to <span className={styles.accentWordCyan}>Spatial Reality.</span>
              </h2>
              <p className={styles.sectionDescLight}>
                Process and Instrumentation Diagrams define fluid streams, operating valves, and nominal
                equipment relationships. In this stage, 2D technical drawings were translated into dimensional
                3D coordinates, establishing equipment footprints, pipe rack elevations, and mechanical clearances.
              </p>
            </div>

            {/* Interactive View Selector Tabs */}
            <div className={styles.comparisonNav} role="tablist" aria-label="Engineering to 3D View Modes">
              <button
                type="button"
                role="tab"
                aria-selected={translationTab === 0}
                className={`${styles.tabButton} ${translationTab === 0 ? styles.tabButtonActive : ""}`}
                onClick={() => setTranslationTab(0)}
              >
                01 // P&amp;ID Engineering Reference
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={translationTab === 1}
                className={`${styles.tabButton} ${translationTab === 1 ? styles.tabButtonActive : ""}`}
                onClick={() => setTranslationTab(1)}
              >
                02 // 3D Spatial Model
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={translationTab === 2}
                className={`${styles.tabButton} ${translationTab === 2 ? styles.tabButtonActive : ""}`}
                onClick={() => setTranslationTab(2)}
              >
                03 // Comparative Side-by-Side
              </button>
            </div>

            {/* Comparison Stage Display */}
            <div className={styles.comparisonStage}>
              {translationTab === 0 && (
                <div className={styles.comparisonSingleFrame}>
                  <Image
                    src={P03_PID_DIAGRAM}
                    alt="Process and Instrumentation Diagram (P&ID) reference drawing"
                    fill
                    sizes="(max-width: 1400px) 100vw, 1360px"
                    style={{ objectFit: "contain" }}
                  />
                  <div className={styles.comparisonMeta}>
                    <h3 className={styles.comparisonMetaTitle}>
                      Process &amp; Instrumentation Diagram (P&amp;ID) — Typical Reference
                    </h3>
                    <p className={styles.comparisonMetaDesc}>
                      Supplied process reference detailing produced-water export logic, operating valves, and nominal tags.
                    </p>
                  </div>
                </div>
              )}

              {translationTab === 1 && (
                <div className={styles.comparisonSingleFrame}>
                  <Image
                    src={P03_3D_MODEL}
                    alt="Isolated 3D process-skid model with color-coded routing"
                    fill
                    sizes="(max-width: 1400px) 100vw, 1360px"
                    style={{ objectFit: "contain" }}
                  />
                  <div className={styles.comparisonMeta}>
                    <h3 className={styles.comparisonMetaTitle}>
                      3D Spatial Model — Isolated Process Assembly
                    </h3>
                    <p className={styles.comparisonMetaDesc}>
                      Accurate mechanical decomposition with color-coded routing translated into dimensional 3D space.
                    </p>
                  </div>
                </div>
              )}

              {translationTab === 2 && (
                <div className={styles.comparisonSplitGrid}>
                  <div className={styles.comparisonPanel}>
                    <div className={styles.comparisonFrame}>
                      <Image
                        src={P03_PID_DIAGRAM}
                        alt="2D Engineering diagram"
                        fill
                        sizes="(max-width: 1024px) 100vw, 680px"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div className={styles.comparisonMeta}>
                      <h4 className={styles.comparisonMetaTitle}>2D Logic Input</h4>
                      <p className={styles.comparisonMetaDesc}>P&amp;ID functional flow and valve schematics</p>
                    </div>
                  </div>

                  <div className={styles.comparisonPanel}>
                    <div className={styles.comparisonFrame}>
                      <Image
                        src={P03_3D_MODEL}
                        alt="3D Spatial model"
                        fill
                        sizes="(max-width: 1024px) 100vw, 680px"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div className={styles.comparisonMeta}>
                      <h4 className={styles.comparisonMetaTitle}>3D Spatial Output</h4>
                      <p className={styles.comparisonMetaDesc}>Real-time dimensional equipment assembly</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Three Technical Transformation Callouts */}
            <div className={styles.calloutCardsGrid}>
              <div className={styles.calloutCard}>
                <span className={styles.calloutNumber}>CALLOUT 01</span>
                <h3 className={styles.calloutHeading}>Symbolic to Dimensional</h3>
                <p className={styles.calloutBody}>
                  2D diagram equipment tags were matched against real mechanical standards, establishing true
                  physical dimensions, flange ratings, and operational clearance.
                </p>
              </div>

              <div className={styles.calloutCard}>
                <span className={styles.calloutNumber}>CALLOUT 02</span>
                <h3 className={styles.calloutHeading}>Stream Geometry</h3>
                <p className={styles.calloutBody}>
                  Process lines, pump suction lines, and utility headers were mapped through structural elevations,
                  ensuring realistic pipe support spans and valve handwheel access.
                </p>
              </div>

              <div className={styles.calloutCard}>
                <span className={styles.calloutNumber}>CALLOUT 03</span>
                <h3 className={styles.calloutHeading}>Visual Differentiation</h3>
                <p className={styles.calloutBody}>
                  Color-coded routing distinguishes fluid and gas phases inside the 3D viewport, making complex
                  process pathways immediately recognizable to technical teams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            P04 — 3D PRODUCTION PIPELINE (SOFT IVORY #F9F8F4)
            ================================================================== */}
        <section
          ref={p04Ref}
          className={styles.pipelineSection}
          aria-labelledby="pipeline-heading"
        >
          <div className={styles.sectionContainer}>
            <div className={styles.sectionEyebrowRow}>
              <span className={styles.sectionEyebrowDark}>03 // 3D ASSET PIPELINE</span>
              <span className={styles.sectionEyebrowLineDark} aria-hidden="true" />
            </div>

            <h2 id="pipeline-heading" className={styles.sectionHeadingDark}>
              The 3D Production <span className={styles.accentWordBlue}>Pipeline.</span>
            </h2>

            {/* Horizontal Stage Selection Rail */}
            <div className={styles.pipelineNavRail} role="tablist" aria-label="3D Asset Pipeline Stages">
              {P04_STAGES.map((stg, idx) => (
                <button
                  key={stg.index}
                  type="button"
                  role="tab"
                  aria-selected={activePipelineStage === idx}
                  className={`${styles.pipelineTab} ${
                    activePipelineStage === idx ? styles.pipelineTabActive : ""
                  }`}
                  onClick={() => setActivePipelineStage(idx)}
                >
                  {stg.index}
                </button>
              ))}
            </div>

            {/* Dominant Stage Production Canvas */}
            <div className={styles.pipelineStageCard}>
              <div className={styles.pipelineStageMediaFrame}>
                <Image
                  src={activePipeline.image}
                  alt={activePipeline.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  style={{ objectFit: "contain" }}
                />
              </div>

              <div className={styles.pipelineStageContent}>
                <span className={styles.pipelineStageIndex}>{activePipeline.index}</span>
                <h3 className={styles.pipelineStageTitle}>{activePipeline.title}</h3>
                <p className={styles.pipelineStageDesc}>{activePipeline.desc}</p>
                <div className={styles.pipelineStageTakeaway}>
                  <span style={{ color: "#0866FF", fontWeight: 700 }}>✓</span>
                  <span>{activePipeline.takeaway}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            P05 — DIGITAL FACILITY EXPLORER (DEEP NAVY)
            ================================================================== */}
        <section
          ref={p05Ref}
          className={styles.explorerSection}
          aria-labelledby="explorer-heading"
        >
          <div className={styles.sectionContainer}>
            <div className={styles.sectionEyebrowRow}>
              <span className={styles.sectionEyebrowLight}>04 // FACILITY SCALE</span>
              <span className={styles.sectionEyebrowLineLight} aria-hidden="true" />
            </div>

            <h2 id="explorer-heading" className={styles.sectionHeadingLight}>
              Digital Facility <span className={styles.accentWordCyan}>Explorer.</span>
            </h2>

            {/* Main Dominant Theater Frame */}
            <div className={styles.galleryMainTheater}>
              <div className={styles.galleryMainFrame}>
                {activeGallery.type === "image" ? (
                  <Image
                    src={activeGallery.src}
                    alt={activeGallery.title}
                    fill
                    sizes="(max-width: 1400px) 100vw, 1360px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <video
                    ref={galleryVideoRef}
                    src={activeGallery.src}
                    poster={activeGallery.poster}
                    muted
                    loop
                    playsInline
                    autoPlay
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
              </div>

              {/* Caption & Navigation Controls Bar */}
              <div className={styles.galleryCaptionBar}>
                <div className={styles.galleryCaptionLeft}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className={styles.evidenceClassPill} style={{ margin: 0 }}>
                      {activeGallery.evidence}
                    </span>
                    <h3 className={styles.galleryItemTitle}>{activeGallery.title}</h3>
                  </div>
                  <p className={styles.galleryItemCaption}>{activeGallery.caption}</p>
                </div>

                <div className={styles.galleryNavControls}>
                  <span className={styles.galleryIndexCounter}>
                    0{activeGalleryIndex + 1} / 0{P05_GALLERY_ITEMS.length}
                  </span>
                  <button
                    type="button"
                    onClick={prevGalleryItem}
                    className={styles.galleryNavButton}
                    aria-label="Previous facility viewpoint"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={nextGalleryItem}
                    className={styles.galleryNavButton}
                    aria-label="Next facility viewpoint"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Thumbnail Strip */}
            <div className={styles.galleryThumbstrip} role="tablist" aria-label="Facility Gallery Viewpoints">
              {P05_GALLERY_ITEMS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={activeGalleryIndex === idx}
                  className={`${styles.thumbItem} ${
                    activeGalleryIndex === idx ? styles.thumbItemActive : ""
                  }`}
                  onClick={() => setActiveGalleryIndex(idx)}
                  aria-label={`View ${item.title}`}
                >
                  <Image
                    src={item.thumb}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 33vw, 20vw"
                    style={{ objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            P06 — INTERACTIVE TRAINING & SIMULATION SHOWCASE (DEEP NAVY)
            ================================================================== */}
        <section
          ref={p06Ref}
          className={styles.simulationSection}
          aria-labelledby="simulation-heading"
        >
          <div className={styles.sectionContainer}>
            <div className={styles.sectionEyebrowRow}>
              <span className={styles.sectionEyebrowLight}>05 // INTERACTION &amp; AGENCY</span>
              <span className={styles.sectionEyebrowLineLight} aria-hidden="true" />
            </div>

            <h2 id="simulation-heading" className={styles.sectionHeadingLight}>
              Interactive Inspection &amp; <span className={styles.accentWordCyan}>Route Tracing.</span>
            </h2>

            {/* Primary Showcase Video Player */}
            <div className={styles.simVideoTheater}>
              <div className={styles.simVideoFrame}>
                <video
                  ref={simVideoRef}
                  className={styles.simVideo}
                  src={P06_SIM_VIDEO}
                  poster={P06_SIM_POSTER}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Operator view sequence with equipment information panels and dynamic route highlight"
                />

                <div className={styles.mediaGradientProtection} aria-hidden="true" />

                <div className={styles.mediaOverlayBar}>
                  <div className={styles.evidenceBlock}>
                    <div className={styles.evidenceClassPill}>
                      <span className={styles.evidenceClassDot} aria-hidden="true" />
                      <span>Interactive Simulation Sequence</span>
                    </div>
                    <p className={styles.mediaCaption}>
                      Operator perspective showing real-time asset selection, contextual data cards, and active flow routing.
                    </p>
                  </div>

                  <div className={styles.mediaControls}>
                    <button
                      type="button"
                      onClick={toggleSimPlay}
                      className={styles.playPauseButton}
                      aria-label={isSimPlaying ? "Pause simulation video" : "Play simulation video"}
                    >
                      {isSimPlaying ? (
                        <>
                          <svg className={styles.playPauseIcon} viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="5" y="4" width="4" height="16" rx="1" />
                            <rect x="15" y="4" width="4" height="16" rx="1" />
                          </svg>
                          <span className={styles.playPauseLabel}>Simulation Active</span>
                        </>
                      ) : (
                        <>
                          <svg className={styles.playPauseIcon} viewBox="0 0 24 24" aria-hidden="true">
                            <polygon points="6,4 20,12 6,20" />
                          </svg>
                          <span className={styles.playPauseLabel}>Play</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Three Evidence-Safe Capability Cards */}
            <div className={styles.simCapabilitiesGrid}>
              <div className={styles.simCapabilityCard}>
                <div className={styles.simCardMediaFrame}>
                  <Image
                    src={P06_SIM_STILL_1}
                    alt="Contextual equipment information panels and operator view"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.simCardContent}>
                  <span className={styles.simCardTag}>01 // ASSET INSPECTION</span>
                  <h3 className={styles.simCardHeading}>Contextual Equipment HUD</h3>
                  <p className={styles.simCardBody}>
                    Selecting equipment in the 3D viewport triggers contextual panels displaying mechanical tags,
                    nominal flow rates, and operating parameters.
                  </p>
                </div>
              </div>

              <div className={styles.simCapabilityCard}>
                <div className={styles.simCardMediaFrame}>
                  <Image
                    src={P06_SIM_STILL_2}
                    alt="Interactive slug-catcher process view with active route highlighting"
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className={styles.simCardContent}>
                  <span className={styles.simCardTag}>02 // PROCESS TRACING</span>
                  <h3 className={styles.simCardHeading}>Illuminated Fluid Routes</h3>
                  <p className={styles.simCardBody}>
                    Color-coded path highlighting visualizes complex fluid streams through slug-catchers and manifold
                    headers, clarifying process connectivity.
                  </p>
                </div>
              </div>

              <div className={styles.simCapabilityCard}>
                <div className={styles.simCardMediaFrame} style={{ backgroundColor: "#040A1D", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center", padding: "1.5rem" }}>
                    <span style={{ fontSize: "2rem", color: "#00D1FF", display: "block", marginBottom: "0.5rem" }}>
                      ☩
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em" }}>
                      SPATIAL ORIENTATION
                    </span>
                  </div>
                </div>
                <div className={styles.simCardContent}>
                  <span className={styles.simCardTag}>03 // PLANT FAMILIARIZATION</span>
                  <h3 className={styles.simCardHeading}>Guided Spatial Navigation</h3>
                  <p className={styles.simCardBody}>
                    Traversing the digital environment allows operational staff to develop spatial familiarity
                    with valves, emergency cutoffs, and equipment layout before physical site entry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            P07 — TECHNOLOGY & CONFIRMED DELIVERABLES (SOFT IVORY #F9F8F4)
            ================================================================== */}
        <section
          ref={p07Ref}
          className={styles.specSection}
          aria-labelledby="tech-heading"
        >
          <div className={styles.sectionContainer}>
            <div className={styles.sectionEyebrowRow}>
              <span className={styles.sectionEyebrowDark}>06 // SPECIFICATION</span>
              <span className={styles.sectionEyebrowLineDark} aria-hidden="true" />
            </div>

            <h2 id="tech-heading" className={styles.sectionHeadingDark}>
              Technology &amp; <span className={styles.accentWordBlue}>Delivery Summary.</span>
            </h2>

            <div className={styles.specTwoColumnGrid}>
              {/* Confirmed Tangible Deliverables */}
              <div className={styles.specCard}>
                <h3 className={styles.specCardHeading}>Confirmed Project Deliverables</h3>
                <ul className={styles.specList}>
                  <li className={styles.specListItem}>
                    <span className={styles.specCheckBullet}>✓</span>
                    <div>
                      <strong>Industrial Equipment &amp; Facility Models:</strong> High-fidelity 3D meshes of modular
                      pump skids, high-pressure piping manifolds, and structural frames.
                    </div>
                  </li>
                  <li className={styles.specListItem}>
                    <span className={styles.specCheckBullet}>✓</span>
                    <div>
                      <strong>Exploded Component Inspection:</strong> Interactive sub-assembly view allowing mechanical
                      inspection of motors, valves, and couplings.
                    </div>
                  </li>
                  <li className={styles.specListItem}>
                    <span className={styles.specCheckBullet}>✓</span>
                    <div>
                      <strong>Real-Time Contextual HUD:</strong> Floating UI overlays presenting equipment tags,
                      flow diagrams, and process parameters.
                    </div>
                  </li>
                  <li className={styles.specListItem}>
                    <span className={styles.specCheckBullet}>✓</span>
                    <div>
                      <strong>Process-Route Geometry Tracing:</strong> Dynamic colored path cues clarifying fluid
                      movement through complex pipe headers.
                    </div>
                  </li>
                  <li className={styles.specListItem}>
                    <span className={styles.specCheckBullet}>✓</span>
                    <div>
                      <strong>Cinematic Traversal Sequences:</strong> 1080p camera moves establishing facility scale
                      and technical recognition.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Verified Presentation & Production Toolchain */}
              <div className={styles.specCard}>
                <h3 className={styles.specCardHeading}>Verified Technical Stack</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div className={styles.specPropertyBlock}>
                    <span className={styles.specPropLabel}>Web Presentation Stack</span>
                    <span className={styles.specPropValue}>
                      Next.js 16 (Turbopack), React 19, TypeScript, CSS Modules
                    </span>
                  </div>
                  <div className={styles.specPropertyBlock}>
                    <span className={styles.specPropLabel}>Motion &amp; Interaction</span>
                    <span className={styles.specPropValue}>
                      GSAP 3.15, ScrollTrigger, Route-Local Reduced-Motion Queries
                    </span>
                  </div>
                  <div className={styles.specPropertyBlock}>
                    <span className={styles.specPropLabel}>Asset Pipeline Represented</span>
                    <span className={styles.specPropValue}>
                      2D Engineering Diagrams → 3D Mesh Assemblies → PBR Shaders → Real-Time Scene
                    </span>
                  </div>
                  <div className={styles.specPropertyBlock}>
                    <span className={styles.specPropLabel}>Evidence Classification</span>
                    <span className={styles.specPropValue}>
                      Strictly evidence-safe documentation without unverified hardware claims
                    </span>
                  </div>
                  <div className={styles.specPropertyBlock}>
                    <span className={styles.specPropLabel}>Project Studio</span>
                    <span className={styles.specPropValue}>
                      AFAQO — Cairo, Working Globally
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            P08 — NEXT PROJECT (DEEP NAVY)
            ================================================================== */}
        <section className={styles.nextSection} aria-labelledby="next-heading">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionEyebrowRow}>
              <span className={styles.sectionEyebrowLight}>07 // NEXT PROJECT</span>
              <span className={styles.sectionEyebrowLineLight} aria-hidden="true" />
            </div>

            <Link
              href="/work/remal-park"
              className={styles.nextProjectCard}
              aria-label="View next case study: Remal Park"
            >
              <div className={styles.nextProjectMedia}>
                <Image
                  src="/images/projects/remal-park/remal-park.jpg"
                  alt="Remal Park Cultural Visitor Experience 3D Visualization"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className={styles.nextProjectImage}
                />
              </div>

              <div className={styles.nextProjectContent}>
                <span className={styles.nextProjectSub}>NEXT CASE STUDY // SAUDI ARABIA</span>
                <h3 className={styles.nextProjectTitle}>REMAL PARK</h3>
                <p className={styles.nextProjectSummary}>
                  High-fidelity 3D environments and visual content for an immersive cultural visitor experience.
                </p>
                <span className={styles.nextProjectAction}>
                  <span>Explore Case Study</span>
                  <span aria-hidden="true">↗</span>
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* Official AFAQO Footer */}
      <Footer />
    </div>
  );
}
