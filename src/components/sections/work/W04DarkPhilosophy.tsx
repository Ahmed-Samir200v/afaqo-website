"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Work.module.css";
import { getMotionPreference } from "@/lib/motion-preference";

/* ==========================================================================
   CUSTOM TECHNICAL SVG ICONS (Geometric, Dimensional, Technical Precision)
   ViewBox: 0 0 130 130 | Palette: Electric Blue (#0866FF), Electric Cyan (#00D1FF), White (#FFFFFF)
   ========================================================================== */

/* 01 — IDEAS: Stylized dimensional light bulb representing discovery and innovation */
function IdeasIcon({ className, iconInnerRef }: { className?: string; iconInnerRef?: React.RefObject<SVGGElement | null> }) {
  return (
    <svg className={className} viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="ideasGlow" x1="65" y1="20" x2="65" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#0866FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#050D24" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="ideasBulbStroke" x1="30" y1="25" x2="100" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00D1FF" />
          <stop offset="70%" stopColor="#0866FF" />
          <stop offset="100%" stopColor="rgba(0, 209, 255, 0.3)" />
        </linearGradient>
        <radialGradient id="ideasCenterGlow" cx="65" cy="52" r="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00D1FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g ref={iconInnerRef}>
        {/* Soft Radial Ambient Core */}
        <circle cx="65" cy="52" r="28" fill="url(#ideasCenterGlow)" />

        {/* Faint Innovation Coordinates / Compass Ticks */}
        <line x1="65" y1="14" x2="65" y2="20" stroke="#00D1FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="65" y1="84" x2="65" y2="90" stroke="#00D1FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <line x1="30" y1="52" x2="36" y2="52" stroke="#00D1FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="94" y1="52" x2="100" y2="52" stroke="#00D1FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        {/* Outer Bulb Profile with Dimensional Facets */}
        <path
          d="M 44 68 C 38 60 36 50 40 40 C 45 28 56 22 65 22 C 74 22 85 28 90 40 C 94 50 92 60 86 68 C 81 74 79 78 78 86 L 52 86 C 51 78 49 74 44 68 Z"
          stroke="url(#ideasBulbStroke)"
          strokeWidth="2"
          fill="rgba(5, 13, 36, 0.4)"
        />

        {/* Geometric Diamond Filament / Core */}
        <path
          d="M 65 34 L 75 48 L 65 62 L 55 48 Z"
          stroke="#00D1FF"
          strokeWidth="1.75"
          fill="rgba(0, 209, 255, 0.12)"
          strokeLinejoin="round"
        />
        {/* Central Vertical Energy Spine */}
        <line x1="65" y1="34" x2="65" y2="62" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="55" y1="48" x2="75" y2="48" stroke="#00D1FF" strokeWidth="1" strokeLinecap="round" />

        {/* Lead Wires to Base */}
        <path d="M 60 62 L 58 76 L 62 86" stroke="#0866FF" strokeWidth="1.25" strokeLinecap="round" />
        <path d="M 70 62 L 72 76 L 68 86" stroke="#0866FF" strokeWidth="1.25" strokeLinecap="round" />

        {/* Screw Base Collar */}
        <line x1="53" y1="91" x2="77" y2="91" stroke="#00D1FF" strokeWidth="2" strokeLinecap="round" />
        <line x1="55" y1="96" x2="75" y2="96" stroke="#0866FF" strokeWidth="2" strokeLinecap="round" />
        <path d="M 58 101 C 61 104 69 104 72 101" stroke="#00D1FF" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

/* 02 — DESIGN: Technical vector pen-nib with Bezier control points and curves */
function DesignIcon({ className, iconInnerRef }: { className?: string; iconInnerRef?: React.RefObject<SVGGElement | null> }) {
  return (
    <svg className={className} viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="nibGradient" x1="45" y1="35" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00D1FF" />
          <stop offset="60%" stopColor="#0866FF" />
          <stop offset="100%" stopColor="rgba(5, 13, 36, 0.6)" />
        </linearGradient>
      </defs>

      <g ref={iconInnerRef}>
        {/* Dynamic Curved Bezier Guide Path */}
        <path
          d="M 22 96 C 36 62 70 38 108 44"
          stroke="rgba(0, 209, 255, 0.35)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          fill="none"
        />

        {/* Tangent Handle Line & Control Handles */}
        <line x1="42" y1="84" x2="82" y2="44" stroke="rgba(8, 102, 255, 0.5)" strokeWidth="1" />
        <circle cx="42" cy="84" r="3.5" fill="#050D24" stroke="#00D1FF" strokeWidth="1.5" />
        <circle cx="82" cy="44" r="3.5" fill="#00D1FF" stroke="#FFFFFF" strokeWidth="1.2" />

        {/* Vector Tangent Anchor Node */}
        <rect x="59.5" y="61.5" width="7" height="7" fill="#050D24" stroke="#00D1FF" strokeWidth="1.5" transform="rotate(45 63 65)" />

        {/* Precision Pen Nib (Angled 45 degrees) */}
        <g transform="translate(64, 64) rotate(-45) translate(-64, -64)">
          {/* Main Nib Body */}
          <path
            d="M 64 24 L 76 54 L 72 78 L 56 78 L 52 54 Z"
            fill="rgba(5, 13, 36, 0.75)"
            stroke="url(#nibGradient)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Collar Band */}
          <rect x="54" y="78" width="20" height="6" rx="1.5" fill="#0866FF" stroke="#00D1FF" strokeWidth="1" />

          {/* Breather Hole */}
          <circle cx="64" cy="52" r="3.5" fill="#00D1FF" />

          {/* Central Ink Slit & Dual Tines */}
          <line x1="64" y1="24" x2="64" y2="48.5" stroke="#00D1FF" strokeWidth="1.75" strokeLinecap="round" />

          {/* Nib Shoulder Highlights */}
          <line x1="56" y1="50" x2="61" y2="60" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

/* 03 — 3D PRODUCTION: Isometric geometric cube with visible dimensional edges and wireframe facets */
function ProductionIcon({ className, iconInnerRef }: { className?: string; iconInnerRef?: React.RefObject<SVGGElement | null> }) {
  return (
    <svg className={className} viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="cubeTopGrad" x1="65" y1="22" x2="65" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(0, 209, 255, 0.28)" />
          <stop offset="100%" stopColor="rgba(8, 102, 255, 0.12)" />
        </linearGradient>
        <linearGradient id="cubeLeftGrad" x1="32" y1="58" x2="65" y2="102" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(8, 102, 255, 0.35)" />
          <stop offset="100%" stopColor="rgba(5, 13, 36, 0.85)" />
        </linearGradient>
        <linearGradient id="cubeRightGrad" x1="98" y1="58" x2="65" y2="102" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(0, 209, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(5, 13, 36, 0.95)" />
        </linearGradient>
      </defs>

      <g ref={iconInnerRef}>
        {/* Top Face */}
        <polygon
          points="65,24 97,42 65,60 33,42"
          fill="url(#cubeTopGrad)"
          stroke="#00D1FF"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />

        {/* Left Face */}
        <polygon
          points="33,42 65,60 65,98 33,80"
          fill="url(#cubeLeftGrad)"
          stroke="#0866FF"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />

        {/* Right Face */}
        <polygon
          points="65,60 97,42 97,80 65,98"
          fill="url(#cubeRightGrad)"
          stroke="#00D1FF"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />

        {/* Internal 3D Wireframe / Subdivision Grid Lines */}
        {/* Top Face Division */}
        <line x1="49" y1="33" x2="81" y2="51" stroke="rgba(0, 209, 255, 0.35)" strokeWidth="1" />
        <line x1="81" y1="33" x2="49" y2="51" stroke="rgba(0, 209, 255, 0.35)" strokeWidth="1" />

        {/* Left Face Division */}
        <line x1="49" y1="51" x2="49" y2="89" stroke="rgba(8, 102, 255, 0.4)" strokeWidth="1" />
        <line x1="33" y1="61" x2="65" y2="79" stroke="rgba(8, 102, 255, 0.4)" strokeWidth="1" />

        {/* Right Face Division */}
        <line x1="81" y1="51" x2="81" y2="89" stroke="rgba(0, 209, 255, 0.3)" strokeWidth="1" />
        <line x1="65" y1="79" x2="97" y2="61" stroke="rgba(0, 209, 255, 0.3)" strokeWidth="1" />

        {/* Center Prominent Axis Node */}
        <circle cx="65" cy="60" r="3" fill="#FFFFFF" stroke="#00D1FF" strokeWidth="1.5" />

        {/* Corner Vertices */}
        <circle cx="65" cy="24" r="2.5" fill="#00D1FF" />
        <circle cx="97" cy="42" r="2.5" fill="#00D1FF" />
        <circle cx="33" cy="42" r="2.5" fill="#0866FF" />
        <circle cx="65" cy="98" r="2.5" fill="#00D1FF" />
        <circle cx="33" cy="80" r="2" fill="#0866FF" />
        <circle cx="97" cy="80" r="2" fill="#00D1FF" />
      </g>
    </svg>
  );
}

/* 04 — TECHNOLOGY: Three layered technology planes representing integrated systems */
function TechnologyIcon({ className, iconInnerRef }: { className?: string; iconInnerRef?: React.RefObject<SVGGElement | null> }) {
  return (
    <svg className={className} viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="techLayer1" x1="28" y1="28" x2="102" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(0, 209, 255, 0.28)" />
          <stop offset="100%" stopColor="rgba(8, 102, 255, 0.12)" />
        </linearGradient>
        <linearGradient id="techLayer2" x1="28" y1="52" x2="102" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(8, 102, 255, 0.35)" />
          <stop offset="100%" stopColor="rgba(5, 13, 36, 0.8)" />
        </linearGradient>
        <linearGradient id="techLayer3" x1="28" y1="76" x2="102" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(0, 209, 255, 0.2)" />
          <stop offset="100%" stopColor="rgba(5, 13, 36, 0.9)" />
        </linearGradient>
      </defs>

      <g ref={iconInnerRef}>
        {/* Vertical Data Bus Lines Piercing Layers */}
        <line x1="65" y1="22" x2="65" y2="104" stroke="rgba(0, 209, 255, 0.4)" strokeWidth="1.5" strokeDasharray="2 3" />
        <line x1="45" y1="42" x2="45" y2="92" stroke="rgba(8, 102, 255, 0.35)" strokeWidth="1" strokeDasharray="2 3" />
        <line x1="85" y1="42" x2="85" y2="92" stroke="rgba(8, 102, 255, 0.35)" strokeWidth="1" strokeDasharray="2 3" />

        {/* BOTTOM LAYER (Foundation / Core Engines) */}
        <g transform="translate(0, 52)">
          <polygon points="65,24 102,44 65,64 28,44" fill="url(#techLayer3)" stroke="rgba(8, 102, 255, 0.6)" strokeWidth="1.5" />
          <circle cx="65" cy="44" r="2.5" fill="#0866FF" />
          <line x1="48" y1="34" x2="56" y2="39" stroke="rgba(8, 102, 255, 0.4)" strokeWidth="1" />
          <line x1="74" y1="49" x2="82" y2="54" stroke="rgba(8, 102, 255, 0.4)" strokeWidth="1" />
        </g>

        {/* MIDDLE LAYER (Pipelines & Real-Time Logic) */}
        <g transform="translate(0, 26)">
          <polygon points="65,24 102,44 65,64 28,44" fill="url(#techLayer2)" stroke="#0866FF" strokeWidth="1.75" />
          <circle cx="65" cy="44" r="3" fill="#00D1FF" />
          {/* Micro Circuit Trace */}
          <polyline points="45,44 55,49 55,44 65,44" stroke="#00D1FF" strokeWidth="1" fill="none" />
          <polyline points="65,44 75,44 75,39 85,44" stroke="#00D1FF" strokeWidth="1" fill="none" />
        </g>

        {/* TOP LAYER (Interactive Interface & Presentation) */}
        <g transform="translate(0, 0)">
          <polygon points="65,24 102,44 65,64 28,44" fill="url(#techLayer1)" stroke="#00D1FF" strokeWidth="1.75" />
          {/* Top Plane Node Grid */}
          <circle cx="65" cy="44" r="3.5" fill="#FFFFFF" stroke="#00D1FF" strokeWidth="1.5" />
          <circle cx="45" cy="44" r="2" fill="#00D1FF" />
          <circle cx="85" cy="44" r="2" fill="#00D1FF" />
          <circle cx="65" cy="30" r="2" fill="#0866FF" />
          <circle cx="65" cy="58" r="2" fill="#0866FF" />
          <line x1="45" y1="44" x2="85" y2="44" stroke="rgba(0, 209, 255, 0.5)" strokeWidth="1" />
          <line x1="65" y1="30" x2="65" y2="58" stroke="rgba(0, 209, 255, 0.5)" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
}

/* 05 — REAL EXPERIENCES: Three connected human silhouettes with a subtle orbital path */
function RealExperiencesIcon({ className, iconInnerRef }: { className?: string; iconInnerRef?: React.RefObject<SVGGElement | null> }) {
  return (
    <svg className={className} viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="expOrbitalGrad" x1="20" y1="35" x2="110" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#0866FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00D1FF" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <g ref={iconInnerRef}>
        {/* Dynamic Spatial Orbit Ring */}
        <ellipse
          cx="65"
          cy="72"
          rx="46"
          ry="18"
          stroke="url(#expOrbitalGrad)"
          strokeWidth="1.5"
          transform="rotate(-18 65 72)"
          fill="none"
        />

        {/* Orbit Connection Nodes */}
        <circle cx="28" cy="84" r="2.5" fill="#00D1FF" />
        <circle cx="102" cy="60" r="2.5" fill="#00D1FF" />
        <circle cx="65" cy="55" r="2" fill="#0866FF" />

        {/* Central Figure (Human in Foreground - Prominent) */}
        <g transform="translate(0, -2)">
          {/* Head */}
          <circle cx="65" cy="44" r="8" fill="#050D24" stroke="#00D1FF" strokeWidth="2" />
          <circle cx="65" cy="44" r="4" fill="#FFFFFF" />

          {/* Shoulders / Torso */}
          <path
            d="M 50 78 C 50 64 56 58 65 58 C 74 58 80 64 80 78 Z"
            fill="rgba(5, 13, 36, 0.85)"
            stroke="#00D1FF"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>

        {/* Left Secondary Figure */}
        <g transform="translate(-20, 4) scale(0.85)">
          <circle cx="56" cy="50" r="7" fill="#050D24" stroke="#0866FF" strokeWidth="1.75" />
          <path
            d="M 43 80 C 43 68 48 62 56 62 C 64 62 69 68 69 80 Z"
            fill="rgba(5, 13, 36, 0.8)"
            stroke="#0866FF"
            strokeWidth="1.75"
          />
        </g>

        {/* Right Secondary Figure */}
        <g transform="translate(30, 4) scale(0.85)">
          <circle cx="74" cy="50" r="7" fill="#050D24" stroke="#0866FF" strokeWidth="1.75" />
          <path
            d="M 61 80 C 61 68 66 62 74 62 C 82 62 87 68 87 80 Z"
            fill="rgba(5, 13, 36, 0.8)"
            stroke="#0866FF"
            strokeWidth="1.75"
          />
        </g>

        {/* Horizon Baseline / Impact Glow */}
        <line x1="36" y1="96" x2="94" y2="96" stroke="rgba(0, 209, 255, 0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="48" y1="100" x2="82" y2="100" stroke="rgba(8, 102, 255, 0.35)" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ==========================================================================
   CARD DEFINITIONS
   ========================================================================== */

interface ApproachStep {
  number: string;
  title: string;
  description: string;
  icon: (props: { className?: string; iconInnerRef?: React.RefObject<SVGGElement | null> }) => React.JSX.Element;
  microAnim: (iconEl: SVGGElement) => gsap.core.Tween | gsap.core.Timeline | void;
}

const APPROACH_STEPS: ApproachStep[] = [
  {
    number: "01",
    title: "IDEAS",
    description: "Discover opportunities and define the right direction.",
    icon: IdeasIcon,
    microAnim: (el) => {
      gsap.fromTo(el, { scale: 0.96 }, { scale: 1.04, duration: 1.8, yoyo: true, repeat: 1, ease: "sine.inOut" });
    },
  },
  {
    number: "02",
    title: "DESIGN",
    description: "Shape clear visual and spatial concepts.",
    icon: DesignIcon,
    microAnim: (el) => {
      gsap.fromTo(el, { y: 2 }, { y: -2, duration: 1.6, yoyo: true, repeat: 1, ease: "power1.inOut" });
    },
  },
  {
    number: "03",
    title: "3D PRODUCTION",
    description: "Build high-quality assets and environments.",
    icon: ProductionIcon,
    microAnim: (el) => {
      gsap.fromTo(el, { rotate: -2 }, { rotate: 2, transformOrigin: "center center", duration: 2, yoyo: true, repeat: 1, ease: "power1.inOut" });
    },
  },
  {
    number: "04",
    title: "TECHNOLOGY",
    description: "Integrate real-time tools and interactive systems.",
    icon: TechnologyIcon,
    microAnim: (el) => {
      gsap.fromTo(el, { y: 3 }, { y: -3, duration: 1.8, yoyo: true, repeat: 1, ease: "sine.inOut" });
    },
  },
  {
    number: "05",
    title: "REAL EXPERIENCES",
    description: "Deliver immersive experiences with real impact.",
    icon: RealExperiencesIcon,
    microAnim: (el) => {
      gsap.fromTo(el, { scale: 0.97 }, { scale: 1.03, duration: 2, yoyo: true, repeat: 1, ease: "sine.inOut" });
    },
  },
];

/* Individual Interactive Bento Card */
function BentoCard({
  step,
  cardRef,
}: {
  step: ApproachStep;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconWrapRef = useRef<HTMLDivElement>(null);
  const iconInnerRef = useRef<SVGGElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);

  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);
  const quickLift = useRef<gsap.QuickToFunc | null>(null);
  const quickIconY = useRef<gsap.QuickToFunc | null>(null);
  const quickIconScale = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      quickX.current = gsap.quickTo(containerRef.current, "rotateY", { duration: 0.35, ease: "power2.out" });
      quickY.current = gsap.quickTo(containerRef.current, "rotateX", { duration: 0.35, ease: "power2.out" });
      quickLift.current = gsap.quickTo(containerRef.current, "y", { duration: 0.35, ease: "power2.out" });

      if (iconWrapRef.current) {
        quickIconY.current = gsap.quickTo(iconWrapRef.current, "y", { duration: 0.35, ease: "power2.out" });
        quickIconScale.current = gsap.quickTo(iconWrapRef.current, "scale", { duration: 0.35, ease: "power2.out" });
      }
    },
    { scope: containerRef }
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Restrained tilt: rotateX ±1.8deg, rotateY ±2.4deg, lift -4px
    const rotateY = x * 4.8; // ±2.4deg
    const rotateX = -y * 3.6; // ±1.8deg

    if (quickX.current) quickX.current(rotateY);
    if (quickY.current) quickY.current(rotateX);
    if (quickLift.current) quickLift.current(-4);

    // Icon subtle elevation on hover: -3px, scale 1.02
    if (quickIconY.current) quickIconY.current(-3);
    if (quickIconScale.current) quickIconScale.current(1.02);

    // Soft cursor-following light reflection
    if (reflectionRef.current) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      reflectionRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(0, 209, 255, 0.08) 0%, rgba(0, 209, 255, 0) 65%)`;
      reflectionRef.current.style.opacity = "1";
    }
  };

  const handlePointerLeave = () => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (iconWrapRef.current) {
      gsap.to(iconWrapRef.current, {
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (reflectionRef.current) {
      reflectionRef.current.style.opacity = "0";
    }
  };

  const IconComponent = step.icon;

  return (
    <div
      ref={(el) => {
        containerRef.current = el;
        if (cardRef) cardRef(el);
      }}
      className={styles.bentoCard}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Permanent subtle dark glass reflection overlay (top sheen & reflective edge highlight) */}
      <div className={styles.bentoGlassOverlay} aria-hidden="true">
        <div className={styles.bentoGlassSweep} aria-hidden="true" />
      </div>

      {/* Soft dynamic cursor highlight */}
      <div ref={reflectionRef} className={styles.bentoCardReflection} aria-hidden="true" />

      {/* ZONE A: Top Left Step Number Zone with 30px cyan line */}
      <div className={styles.bentoStepNumberZone}>
        <div className={styles.bentoStepNumber}>{step.number}</div>
        <div className={styles.bentoStepLine} aria-hidden="true" />
      </div>

      {/* ZONE B: Upper Central SVG Icon Area */}
      <div ref={iconWrapRef} className={styles.bentoIconArea}>
        <IconComponent className={styles.bentoSvgIcon} iconInnerRef={iconInnerRef} />
      </div>

      {/* ZONE C: Bottom Content Block */}
      <div className={styles.bentoContentBlock}>
        <h3 className={styles.bentoCardTitle}>{step.title}</h3>
        <p className={styles.bentoCardDescription}>{step.description}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN COMPONENT: W04OURAPPROACH
   ========================================================================== */
export function W04OurApproach() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const row1CardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const row2CardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      if (getMotionPreference().shouldReduceMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.out" },
      });

      // 1. Eyebrow fade-up (0.45s)
      if (eyebrowRef.current) {
        tl.fromTo(eyebrowRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45 }, 0);
      }

      // 2. Headline masked reveal (0.75s)
      if (headlineLine1Ref.current && headlineLine2Ref.current) {
        tl.fromTo(
          [headlineLine1Ref.current, headlineLine2Ref.current],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 },
          0.08
        );
      }

      // 3. Description fade-up (0.55s)
      if (descriptionRef.current) {
        tl.fromTo(descriptionRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55 }, 0.2);
      }

      // 4. Cards stagger entrance: 0.1s stagger, 0.65s duration
      const validRow1 = row1CardsRef.current.filter(Boolean);
      if (validRow1.length > 0) {
        tl.fromTo(
          validRow1,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1 },
          0.3
        );
      }

      const validRow2 = row2CardsRef.current.filter(Boolean);
      if (validRow2.length > 0) {
        tl.fromTo(
          validRow2,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1 },
          0.45
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="approach"
      ref={sectionRef}
      className={styles.bentoSection}
      aria-labelledby="approach-heading"
    >
      {/* Background Technical Grid & Subtle Guide Accents */}
      <div className={styles.bentoBgGrid} aria-hidden="true" />
      <div className={styles.bentoGuideNode1} aria-hidden="true" />
      <div className={styles.bentoGuideNode2} aria-hidden="true" />

      <div className={styles.bentoContainer}>
        {/* 6-Column Asymmetrical Bento Grid */}
        <div className={styles.bentoGrid}>
          {/* ROW 1 — Col 1-2: Intro Block */}
          <div className={styles.bentoIntroBlock}>
            <div ref={eyebrowRef} className={styles.bentoEyebrow}>
              <span>04 / APPROACH</span>
              <span className={styles.bentoEyebrowLine} aria-hidden="true" />
            </div>

            <h2 id="approach-heading" className={styles.bentoHeading}>
              <span ref={headlineLine1Ref} className={styles.bentoHeadingLine}>
                Different challenges.
              </span>
              <span ref={headlineLine2Ref} className={`${styles.bentoHeadingLine} ${styles.bentoCyanAccent}`}>
                One connected approach.
              </span>
            </h2>

            <p ref={descriptionRef} className={styles.bentoDescription}>
              We combine creative thinking, design, 3D production and technology to create
              immersive real-world experiences.
            </p>
          </div>

          {/* ROW 1 — Col 3-4: 01 — IDEAS */}
          <div className={styles.bentoCellIdeas}>
            <BentoCard
              step={APPROACH_STEPS[0]}
              cardRef={(el) => {
                row1CardsRef.current[0] = el;
              }}
            />
          </div>

          {/* ROW 1 — Col 5-6: 02 — DESIGN */}
          <div className={styles.bentoCellDesign}>
            <BentoCard
              step={APPROACH_STEPS[1]}
              cardRef={(el) => {
                row1CardsRef.current[1] = el;
              }}
            />
          </div>

          {/* ROW 2 — Col 1-2: 03 — 3D PRODUCTION */}
          <div className={styles.bentoCellProduction}>
            <BentoCard
              step={APPROACH_STEPS[2]}
              cardRef={(el) => {
                row2CardsRef.current[0] = el;
              }}
            />
          </div>

          {/* ROW 2 — Col 3-4: 04 — TECHNOLOGY */}
          <div className={styles.bentoCellTechnology}>
            <BentoCard
              step={APPROACH_STEPS[3]}
              cardRef={(el) => {
                row2CardsRef.current[1] = el;
              }}
            />
          </div>

          {/* ROW 2 — Col 5-6: 05 — REAL EXPERIENCES */}
          <div className={styles.bentoCellExperiences}>
            <BentoCard
              step={APPROACH_STEPS[4]}
              cardRef={(el) => {
                row2CardsRef.current[2] = el;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Backward compatibility export */
export const W04DarkPhilosophy = W04OurApproach;
