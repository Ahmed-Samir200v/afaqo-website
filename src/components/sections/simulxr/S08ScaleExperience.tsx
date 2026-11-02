"use client";

import { useState, useEffect, useRef } from "react";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/lib/motion-preference";
import { simulxrScaleData, type ScaleTier } from "./simulxrData";
import { SimulxrIcon } from "./SimulxrIcon";
import styles from "./Simulxr.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function S08ScaleExperience() {
  const [activeTierId, setActiveTierId] = useState<string>(
    simulxrScaleData.tiers[0].id
  );
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useMotionPreference();

  const activeTier =
    simulxrScaleData.tiers.find((t) => t.id === activeTierId) ||
    simulxrScaleData.tiers[0];

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.scaleHeader} > *`, {
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

      gsap.from(`.${styles.scaleTierStep}`, {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.scaleProgressionBar}`,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="scale"
      className={styles.scaleSection}
      aria-labelledby="scale-heading"
    >
      <div className={styles.sectionContainer}>
        {/* Editorial Header */}
        <div className={styles.scaleHeader}>
          <span className={styles.sectionIndexTag}>{"08 // MODULAR EXPANSION"}</span>
          <h2 id="scale-heading" className={styles.scaleTitle}>
            START WITH ONE ASSET.<br />
            <span className={styles.headlineHighlight}>SCALE TO THE FACILITY.</span>
          </h2>

          <div className={styles.scaleCopyWrapper}>
            {simulxrScaleData.supportingCopy.map((txt, i) => (
              <p key={i} className={i === 0 ? styles.scaleLeadText : styles.scaleSubText}>
                {txt}
              </p>
            ))}
          </div>
        </div>

        {/* 4-Tier Interactive Scale Progression Track */}
        <div className={styles.scaleProgressionBar} role="tablist" aria-label="Scale Progression Tiers">
          {simulxrScaleData.tiers.map((tier, idx) => {
            const isSelected = tier.id === activeTier.id;
            return (
              <div key={tier.id} className={styles.scaleTierWrapper}>
                <button
                  type="button"
                  role="tab"
                  id={`scale-tab-${tier.id}`}
                  aria-selected={isSelected}
                  aria-controls={`scale-panel-${tier.id}`}
                  onClick={() => setActiveTierId(tier.id)}
                  className={`${styles.scaleTierStep} ${isSelected ? styles.scaleTierSelected : ""}`}
                >
                  <div className={styles.tierTopMeta}>
                    <span className={styles.tierLevelBadge}>TIER {tier.level}</span>
                    <span className={styles.tierIndicatorRing} aria-hidden="true" />
                  </div>
                  <h3 className={styles.tierStepTitle}>{tier.title}</h3>
                  <span className={styles.tierStepSub}>{tier.subtitle}</span>
                </button>

                {idx < simulxrScaleData.tiers.length - 1 && (
                  <div className={styles.tierFlowConnector} aria-hidden="true">
                    <span className={styles.flowArrow}>→</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Scale Tier Detail Showcase */}
        <div
          id={`scale-panel-${activeTier.id}`}
          role="tabpanel"
          aria-labelledby={`scale-tab-${activeTier.id}`}
          className={styles.scaleDetailStage}
        >
          {/* Left: Spatial Architectural Visualization */}
          <div className={styles.scaleVisualCol}>
            <div className={styles.scaleVisualFrame}>
              <ResponsiveImage
                src={activeTier.image}
                alt={`${activeTier.title} scale tier — ${activeTier.subtitle}`}
                fill
                sizes="(max-width: 900px) 100vw, 680px"
                className={styles.scaleVisualImg}
              />
              <div className={styles.scaleVisualOverlay} />

              <div className={styles.scaleSpatialBadge}>
                <span className={styles.spatialDot} />
                <span>SPATIAL BOUNDARY: TIER {activeTier.level} — {activeTier.title}</span>
              </div>
            </div>
          </div>

          {/* Right: Technical Explanation */}
          <div className={styles.scaleInfoCol}>
            <div className={styles.tierMetaTag}>
              <span>{`SCALE TIER // 0${activeTier.level} OF 04`}</span>
            </div>

            <h3 className={styles.tierInfoTitle}>
              {activeTier.title} Level Implementation
            </h3>

            <p className={styles.tierInfoDesc}>
              {activeTier.description}
            </p>

            <div className={styles.tierExamplesBox}>
              <span className={styles.tierExamplesLabel}>TYPICAL SCOPE EXAMPLES:</span>
              <div className={styles.tierExamplesList}>
                {activeTier.examples.map((ex) => (
                  <span key={ex} className={styles.examplePill}>
                    <SimulxrIcon name="check" size={13} />
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.tierExpansionNote}>
              <SimulxrIcon name="scale" size={18} className={styles.noteIcon} />
              <p>
                Each asset tier integrates directly into broader operational systems without rework, preserving initial modeling investment as your training curriculum expands.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Tier Stack */}
        <div className={styles.scaleMobileStack} aria-label="Scale Hierarchy">
          {simulxrScaleData.tiers.map((tier: ScaleTier) => (
            <article key={tier.id} className={styles.mobileScaleCard}>
              <div className={styles.mobileTierHeader}>
                <span className={styles.mobileTierBadge}>TIER {tier.level}</span>
                <h4 className={styles.mobileTierTitle}>{tier.title} ({tier.subtitle})</h4>
              </div>
              <p className={styles.mobileTierDesc}>{tier.description}</p>
              <div className={styles.mobileExamplesRow}>
                {tier.examples.map((ex) => (
                  <span key={ex} className={styles.mobileExTag}>
                    {ex}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
