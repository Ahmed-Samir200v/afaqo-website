"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/lib/motion-preference";
import { simulxrPoweredData } from "./simulxrData";
import { SimulxrIcon } from "./SimulxrIcon";
import styles from "./Simulxr.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function S10PoweredByAfaqo() {
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useMotionPreference();

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.poweredHeader} > *`, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(`.${styles.capabilityPill}`, {
        opacity: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.capabilitiesGrid}`,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(`.${styles.signatureLine}`, {
        opacity: 0,
        x: -16,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.signatureCard}`,
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(`.${styles.finalCtaBox}`, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.finalCtaBox}`,
          start: "top 90%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="powered-by-afaqo"
      className={styles.poweredSection}
      aria-labelledby="powered-heading"
    >
      <div className={styles.sectionContainer}>
        {/* Part 1: Powered by AFAQO Brand Architecture */}
        <div className={styles.poweredHeader}>
          <div className={styles.poweredEyebrowGroup}>
            <span className={styles.sectionIndexTagCyan}>{"10 // MASTER BRAND ARCHITECTURE"}</span>
            <span className={styles.poweredEyebrow}>{simulxrPoweredData.eyebrow}</span>
          </div>

          <h2 id="powered-heading" className={styles.poweredTitle}>
            INDUSTRIAL THINKING<br />
            <span className={styles.headlineCyan}>MEETS IMMERSIVE TECHNOLOGY.</span>
          </h2>

          <p className={styles.poweredCopy}>
            {simulxrPoweredData.copy}
          </p>
        </div>

        {/* 6 Capabilities Pills */}
        <div className={styles.capabilitiesContainer}>
          <span className={styles.capabilitiesHeading}>INTEGRATED CAPABILITIES:</span>
          <div className={styles.capabilitiesGrid} aria-label="AFAQO Core Capabilities">
            {simulxrPoweredData.capabilities.map((cap) => (
              <div key={cap} className={styles.capabilityPill}>
                <span className={styles.capabilityDot} aria-hidden="true" />
                <span className={styles.capabilityText}>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic 3-Line Brand Signature */}
        <div className={styles.signatureCard}>
          <span className={styles.signatureTag}>THE SIMULXR TRIAD</span>
          <div className={styles.signatureLines}>
            {simulxrPoweredData.signature.map((line, idx) => (
              <div key={idx} className={styles.signatureLine}>
                <span className={styles.sigArrow} aria-hidden="true">→</span>
                <strong className={styles.sigText}>{line}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Final High-Conversion CTA Block */}
        <div className={styles.finalCtaBox}>
          <div className={styles.finalCtaContent}>
            <span className={styles.finalCtaLabel}>
              {simulxrPoweredData.finalCTA.label}
            </span>

            <h3 className={styles.finalCtaTitle}>
              {simulxrPoweredData.finalCTA.headline}
            </h3>

            <p className={styles.finalCtaCopy}>
              {simulxrPoweredData.finalCTA.copy}
            </p>

            <div className={styles.finalCtaActions}>
              <Link
                href={simulxrPoweredData.finalCTA.primary.href}
                className={styles.finalCtaPrimary}
              >
                <span>{simulxrPoweredData.finalCTA.primary.label}</span>
                <SimulxrIcon name="arrow" size={16} />
              </Link>

              <Link
                href={simulxrPoweredData.finalCTA.secondary.href}
                className={styles.finalCtaSecondary}
              >
                <span>{simulxrPoweredData.finalCTA.secondary.label}</span>
                <SimulxrIcon name="arrow-up-right" size={15} />
              </Link>
            </div>
          </div>

          {/* Decorative CAD Corner Markers */}
          <span className={`${styles.cornerTick} ${styles.cornerTickTL}`} aria-hidden="true" />
          <span className={`${styles.cornerTick} ${styles.cornerTickBR}`} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
