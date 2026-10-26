"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useMotionPreference } from "@/lib/motion-preference";
import { simulxrHeroData, SIMULXR_ASSETS } from "./simulxrData";
import { SimulxrIcon } from "./SimulxrIcon";
import styles from "./Simulxr.module.css";

export function S01Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useMotionPreference();

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        `.${styles.heroEyebrow}`,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          `.${styles.heroMainTitle}`,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          `.${styles.heroSubheadline}`,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          `.${styles.heroBody}`,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          `.${styles.heroButtons}`,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          `.${styles.heroTagsGroup}`,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06 },
          "-=0.4"
        )
        .fromTo(
          `.${styles.heroVisualFrame}`,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" },
          "-=0.8"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={styles.heroSection}
      aria-labelledby="simulxr-hero-title"
    >
      <div className={styles.heroContainer}>
        {/* Left Column: Strategic Brand Hierarchy */}
        <div className={styles.heroCopyCol}>
          <div className={styles.heroEyebrow}>
            <span className={styles.heroPulseDot} aria-hidden="true" />
            <span>{simulxrHeroData.eyebrow}</span>
          </div>

          <h1 id="simulxr-hero-title" className={styles.heroMainTitle}>
            {simulxrHeroData.headline}
          </h1>

          <p className={styles.heroSubheadline}>
            {simulxrHeroData.subheadline}
          </p>

          <p className={styles.heroBody}>
            {simulxrHeroData.body}
          </p>

          {/* Action CTAs */}
          <div className={styles.heroButtons}>
            <a href="#solution" className={styles.primaryBtn}>
              <span>{simulxrHeroData.primaryCTA.label}</span>
              <SimulxrIcon name="arrow" size={16} />
            </a>

            <Link href="#pilot" className={styles.secondaryBtn}>
              <span>{simulxrHeroData.secondaryCTA.label}</span>
              <SimulxrIcon name="arrow-up-right" size={15} />
            </Link>
          </div>

          {/* Supporting Readiness Tags */}
          <div className={styles.heroTagsGroup} aria-label="SIMULXR Capabilities">
            <span className={styles.heroTagsLabel}>SPECIALIZED READINESS DOMAINS:</span>
            <div className={styles.heroTagsList}>
              {simulxrHeroData.supportingTags.map((tag) => (
                <span key={tag} className={styles.heroTagPill}>
                  <span className={styles.tagDot} aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Authentic Industrial Visual Stage */}
        <div className={styles.heroVisualCol}>
          <div className={styles.heroVisualFrame}>
            <div className={styles.heroVisualInner}>
              <Image
                src={SIMULXR_ASSETS.hero}
                alt="SIMULXR industrial simulation — real facility reconstructed into an interactive training environment"
                fill
                priority
                sizes="(max-width: 900px) 100vw, (max-width: 1360px) 52vw, 680px"
                className={styles.heroImage}
              />
              <div className={styles.heroImageGradient} aria-hidden="true" />
            </div>

            {/* Industrial Overlay Annotations */}
            <div className={styles.heroMetaHeader}>
              <span className={styles.heroMetaBadge}>
                {simulxrHeroData.metaCoordinates}
              </span>
              <span className={styles.heroMetaStatus}>
                <span className={styles.liveIndicator} />
                OPERATIONAL MAPPING
              </span>
            </div>

            <div className={styles.heroTransformationBadge}>
              <div className={styles.transformFrom}>
                <span className={styles.transformLabel}>SOURCE</span>
                <strong>REAL FACILITY</strong>
              </div>
              <div className={styles.transformArrow} aria-hidden="true">→</div>
              <div className={styles.transformTo}>
                <span className={styles.transformLabel}>RUNTIME</span>
                <strong>INTERACTIVE TRAINING</strong>
              </div>
            </div>

            {/* Corner Precision CAD crosshairs */}
            <span className={`${styles.cornerTick} ${styles.cornerTickTL}`} aria-hidden="true" />
            <span className={`${styles.cornerTick} ${styles.cornerTickBR}`} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
