"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/lib/motion-preference";
import { simulxrSolutionData, SIMULXR_ASSETS } from "./simulxrData";
import { SimulxrIcon } from "./SimulxrIcon";
import styles from "./Simulxr.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function S03Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useMotionPreference();

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.solutionEyebrow}, .${styles.solutionHeadline}`, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(`.${styles.solutionCopy}`, {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.solutionCopy}`,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(`.${styles.transformStageCard}`, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.transformationPipeline}`,
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(`.${styles.statementPillar}`, {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.solutionSupportingRow}`,
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
      id="solution"
      className={styles.solutionSection}
      aria-labelledby="solution-heading"
    >
      <div className={styles.sectionContainer}>
        {/* Editorial Introduction */}
        <div className={styles.solutionIntroGroup}>
          <span className={styles.sectionIndexTag}>{"03 // THE APPROACH"}</span>
          <p className={styles.solutionEyebrow}>{simulxrSolutionData.eyebrow}</p>
          <h2 id="solution-heading" className={styles.solutionHeadline}>
            TRAIN THE REAL OPERATION<br />
            <span className={styles.headlineBlue}>BEFORE THE REAL OPERATION.</span>
          </h2>
          <p className={styles.solutionCopy}>
            {simulxrSolutionData.copy}
          </p>
        </div>

        {/* The Core Visual Transformation Storytelling Pipeline */}
        <div className={styles.transformationPipeline} aria-label="SIMULXR Transformation Pipeline">
          {simulxrSolutionData.transformationSequence.map((stage, idx) => (
            <div key={stage.step} className={styles.transformStageWrapper}>
              <article className={styles.transformStageCard}>
                <div className={styles.stageHeader}>
                  <span className={styles.stageNumber}>{stage.step}</span>
                  <span className={styles.stageTag}>{stage.tag}</span>
                </div>

                <div className={styles.stageVisualThumb}>
                  {idx === 0 && (
                    <Image
                      src={SIMULXR_ASSETS.sourcePid}
                      alt="Source engineering CAD and P&ID references"
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className={styles.stageThumbImg}
                    />
                  )}
                  {idx === 1 && (
                    <Image
                      src={SIMULXR_ASSETS.experienceSpatial}
                      alt="Reconstructed 3D facility mesh and structural topology"
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className={styles.stageThumbImg}
                    />
                  )}
                  {idx === 2 && (
                    <Image
                      src={SIMULXR_ASSETS.owtTrainingPoster}
                      alt="Interactive training scenario with operational procedures"
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className={styles.stageThumbImg}
                    />
                  )}
                  {idx === 3 && (
                    <Image
                      src={SIMULXR_ASSETS.facilityWide}
                      alt="Fully prepared workforce mastering plant operations"
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className={styles.stageThumbImg}
                    />
                  )}
                  <div className={styles.stageThumbOverlay} />
                </div>

                <h3 className={styles.stageTitle}>{stage.title}</h3>
                <p className={styles.stageDesc}>{stage.desc}</p>
              </article>

              {idx < simulxrSolutionData.transformationSequence.length - 1 && (
                <div className={styles.stageConnector} aria-hidden="true">
                  <div className={styles.connectorTrack} />
                  <span className={styles.connectorArrow}>→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Supporting Statement Banner: Your facility / equipment / procedures / training */}
        <div className={styles.solutionSupportingRow}>
          <div className={styles.statementIntro}>
            <span className={styles.statementBadge}>OPERATIONAL FOUNDATION</span>
            <p className={styles.statementLead}>
              Engineered exclusively around your actual operating reality:
            </p>
          </div>

          <div className={styles.statementGrid}>
            {simulxrSolutionData.supportingStatement.map((stmt, idx) => (
              <div key={idx} className={styles.statementPillar}>
                <span className={styles.pillarNumber}>0{idx + 1}</span>
                <strong className={styles.pillarText}>{stmt}</strong>
                <SimulxrIcon name="check" size={18} className={styles.pillarCheck} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
