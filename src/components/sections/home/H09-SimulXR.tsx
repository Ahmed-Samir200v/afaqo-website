"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { homeContent } from "@/content/global/home";
import { useMotionPreference } from "@/lib/motion-preference";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Authentic AFAQO industrial simulation project asset. */
const SIMULXR_IMAGE = {
  src: "/images/projects/industrial-training/industrial-training.png",
  alt: "AFAQO SIMULXR industrial training experience — interactive VR simulation of equipment and operational procedures",
};

export function H09SimulXR() {
  const { simulxr } = homeContent;
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useMotionPreference();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (shouldReduceMotion) return;

      const q = gsap.utils.selector(sectionRef);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out", immediateRender: false },
      });

      // Primary cinematic frame reveal
      tl.fromTo(
        q(".sx-primary-frame"),
        { clipPath: "inset(0% 10% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power3.out" }
      )
        .fromTo(q(".sx-primary-img-inner"), { scale: 1.04 }, { scale: 1, duration: 1.3, ease: "power3.out" }, "<")
        // Secondary detail crop reveal
        .fromTo(
          q(".sx-detail-crop"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.7"
        )
        // Typography and editorial links
        .fromTo(q(".sx-tag, .sx-eyebrow"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.8")
        .fromTo(q(".sx-headline-lead"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.6")
        .fromTo(q(".sx-headline-main"), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.55")
        .fromTo(q(".sx-body"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .fromTo(q(".sx-cta-rail"), { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.4")
        .fromTo(q(".sx-grid-meta"), { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.08 }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="simulxr"
      className="sx-section"
      aria-labelledby="simulxr-heading"
    >

      <div className="page-container sx-container">
        {/* Editorial Content Column (Left ~40% width) */}
        <div className="sx-editorial-col">
          <div className="sx-header-group">
            <p className="sx-tag section-index section-index--dark">06 / SIMULXR</p>
            <p className="sx-eyebrow">{simulxr.eyebrow}</p>

            <h2 id="simulxr-heading" className="sx-headline">
              <span className="sx-headline-lead">Industrial systems.</span>
              <span className="sx-headline-main">
                <span className="text-electric-cyan">Immersive</span> understanding.
              </span>
            </h2>
          </div>

          <p className="sx-body final-body final-body--dark">{simulxr.body}</p>

          {/* Controlled Editorial Action Rail with Extended Baseline */}
          <div className="sx-cta-rail">
            <Link
              href={simulxr.cta.href}
              className="sx-editorial-link"
              aria-label="Explore SIMULXR industrial simulation initiative"
            >
              <span className="sx-editorial-link__text">{simulxr.cta.label}</span>
              <span className="sx-editorial-link__arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>

          {/* Technical System Status Descriptor */}
          <div className="sx-system-indicator" aria-hidden="true">
            <span className="sx-pulse-dot" />
            <span className="sx-system-label">
              AFAQO SPECIALIZED INDUSTRIAL INITIATIVE
            </span>
          </div>
        </div>

        {/* Cinematic Media Field (Right ~60% width with layered depth) */}
        <div className="sx-media-stage">
          {/* Integrated Top Metadata Row */}
          <div className="sx-grid-meta sx-grid-meta--top">
            <span className="sx-meta-item">SIMULXR / INDUSTRIAL SIMULATION</span>
            <span className="sx-meta-item sx-meta-item--dim">
              SPEC // PROCEDURAL TRAINING
            </span>
          </div>

          {/* Primary Viewport: Wide Cinematic Ratio with Deep Navy Tonal Treatment */}
          <div className="sx-primary-frame">
            <div className="sx-primary-img-inner">
              <Image
                src={SIMULXR_IMAGE.src}
                alt={SIMULXR_IMAGE.alt}
                fill
                priority={false}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="sx-primary-img"
              />
              <div className="sx-tonal-scrim" aria-hidden="true" />
            </div>

            {/* Corner Precision CAD Crosshair Markers */}
            <span className="sx-cad-tick sx-cad-tick--tl" aria-hidden="true" />
            <span className="sx-cad-tick sx-cad-tick--br" aria-hidden="true" />
          </div>

          {/* Secondary Layer: High-Precision Detail Viewport (From SAME Authentic Asset) */}
          <div className="sx-detail-crop" aria-hidden="true">
            <div className="sx-detail-img-wrapper">
              <Image
                src={SIMULXR_IMAGE.src}
                alt=""
                fill
                sizes="280px"
                className="sx-detail-img"
              />
              <div className="sx-detail-scrim" />
            </div>
            <div className="sx-detail-badge">
              <span className="sx-detail-dot" />
              <span>DETAIL // PROCEDURE VIEW [1.6X]</span>
            </div>
          </div>

          {/* Integrated Bottom Metadata Row */}
          <div className="sx-grid-meta sx-grid-meta--bottom">
            <span className="sx-meta-item">
              REAL-WORLD SYSTEMS → INTERACTIVE DIGITAL TWIN
            </span>
            <span className="sx-meta-item sx-meta-item--dim">
              SYS.COORDINATES: 29°58&apos;N 31°15&apos;E
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
