"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/lib/motion-preference";
import { simulxrPilotData } from "./simulxrData";
import { SimulxrIcon } from "./SimulxrIcon";
import styles from "./Simulxr.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function S09Pilot() {
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useMotionPreference();

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.pilotHeader} > *`, {
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

      gsap.from(`.${styles.pilotPhaseCard}`, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.pilotPhasesGrid}`,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(`.${styles.pilotActionBanner}`, {
        opacity: 0,
        scale: 0.98,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.pilotActionBanner}`,
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
      id="pilot"
      className={styles.pilotSection}
      aria-labelledby="pilot-heading"
    >
      <div className={styles.sectionContainer}>
        {/* Editorial Heading */}
        <div className={styles.pilotHeader}>
          <div className={styles.pilotEyebrowGroup}>
            <span className={styles.sectionIndexTag}>{"09 // COMMERCIAL READINESS"}</span>
            <span className={styles.pilotEyebrow}>{simulxrPilotData.eyebrow}</span>
          </div>

          <h2 id="pilot-heading" className={styles.pilotTitle}>
            START WITH ONE REAL PROBLEM.
          </h2>

          <p className={styles.pilotCopy}>
            {simulxrPilotData.copy}
          </p>
        </div>

        {/* 5-Phase Structured Pilot Framework Grid */}
        <div className={styles.pilotPhasesGrid} aria-label="Pilot Structure">
          {simulxrPilotData.phases.map((phase) => (
            <article key={phase.number} className={styles.pilotPhaseCard}>
              <div className={styles.phaseCardHeader}>
                <span className={styles.phaseCardNumber}>{phase.number}</span>
                <span className={styles.phaseStatusBadge}>PHASE SCOPE</span>
              </div>

              <h3 className={styles.phaseCardTitle}>{phase.title}</h3>
              <p className={styles.phaseCardDesc}>{phase.description}</p>
              <p className={styles.phaseCardDetail}>{phase.detail}</p>

              <div className={styles.phaseCardFooterLine} aria-hidden="true" />
            </article>
          ))}
        </div>

        {/* Action Card: Enterprise Consultation & Pilot Discussion */}
        <div className={styles.pilotActionBanner}>
          <div className={styles.bannerInfoCol}>
            <span className={styles.bannerTag}>STRUCTURED PILOT SCOPE</span>
            <h3 className={styles.bannerHeading}>
              Define a low-risk, high-impact starting point for your team.
            </h3>
            <p className={styles.bannerText}>
              Review your target facility geometry, documentation format, and operational priorities with our engineering and immersive technology specialists.
            </p>
          </div>

          <div className={styles.bannerActionsCol}>
            <Link
              href={simulxrPilotData.primaryCTA.href}
              className={styles.pilotPrimaryBtn}
            >
              <span>{simulxrPilotData.primaryCTA.label}</span>
              <SimulxrIcon name="arrow" size={16} />
            </Link>

            <Link
              href={simulxrPilotData.secondaryCTA.href}
              className={styles.pilotSecondaryBtn}
            >
              <span>{simulxrPilotData.secondaryCTA.label}</span>
              <SimulxrIcon name="arrow-up-right" size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
