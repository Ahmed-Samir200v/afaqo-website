"use client";

import { useState, useEffect, useRef } from "react";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/lib/motion-preference";
import { simulxrReadinessData, type ReadinessSystem } from "./simulxrData";
import { SimulxrIcon } from "./SimulxrIcon";
import styles from "./Simulxr.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function S05ReadinessSystems() {
  const [activeSystemId, setActiveSystemId] = useState<string>(
    simulxrReadinessData.systems[0].id
  );
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useMotionPreference();

  const activeSystem =
    simulxrReadinessData.systems.find((s) => s.id === activeSystemId) ||
    simulxrReadinessData.systems[0];

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.readinessHeader} > *`, {
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

      gsap.from(`.${styles.readinessTab}`, {
        opacity: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.readinessTabs}`,
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
      id="readiness"
      className={styles.readinessSection}
      aria-labelledby="readiness-heading"
    >
      <div className={styles.sectionContainer}>
        {/* Editorial Heading */}
        <div className={styles.readinessHeader}>
          <span className={styles.sectionIndexTagLight}>{"05 // READINESS FRAMEWORK"}</span>
          <h2 id="readiness-heading" className={styles.readinessTitle}>
            FOUR SYSTEMS.<br />
            <span className={styles.headlineCyan}>ONE GOAL: READINESS.</span>
          </h2>
          <p className={styles.readinessLead}>
            {simulxrReadinessData.lead}
          </p>
        </div>

        {/* Tab Navigation for 4 Systems */}
        <div className={styles.readinessTabs} role="tablist" aria-label="Four Readiness Systems">
          {simulxrReadinessData.systems.map((system) => {
            const isSelected = system.id === activeSystem.id;
            return (
              <button
                key={system.id}
                type="button"
                role="tab"
                id={`tab-${system.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${system.id}`}
                onClick={() => setActiveSystemId(system.id)}
                className={`${styles.readinessTab} ${isSelected ? styles.readinessTabActive : ""}`}
              >
                <span className={styles.readinessTabNum}>{system.number}</span>
                <span className={styles.readinessTabLabel}>{system.title}</span>
                <span className={styles.readinessTabIndicator} aria-hidden="true" />
              </button>
            );
          })}
        </div>

        {/* Active System Showcase: Strong Editorial Panel */}
        <div
          id={`panel-${activeSystem.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeSystem.id}`}
          className={styles.readinessPanel}
        >
          {/* Left Editorial Info */}
          <div className={styles.panelInfoCol}>
            <div className={styles.panelMeta}>
              <span className={styles.panelBadge}>{activeSystem.badge}</span>
              <span className={styles.panelIndex}>{`SYSTEM // ${activeSystem.number} OF 04`}</span>
            </div>

            <h3 className={styles.panelHeadline}>{activeSystem.headline}</h3>

            <p className={styles.panelDescription}>{activeSystem.description}</p>

            {/* Targeted Applications Grid */}
            <div className={styles.applicationsWrapper}>
              <span className={styles.appsHeaderTitle}>CORE TARGETED APPLICATIONS:</span>
              <div className={styles.appsPillsGrid}>
                {activeSystem.applications.map((app) => (
                  <div key={app} className={styles.appPill}>
                    <SimulxrIcon name="check" size={14} className={styles.appPillCheck} />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual Stage */}
          <div className={styles.panelVisualCol}>
            <div className={styles.panelVisualFrame}>
              <ResponsiveImage
                src={activeSystem.image}
                alt={activeSystem.alt}
                fill
                sizes="(max-width: 900px) 100vw, 640px"
                className={styles.panelImage}
              />
              <div className={styles.panelImageGradient} aria-hidden="true" />

              {/* Technical Marker Callout */}
              <div className={styles.panelAnnotation}>
                <span className={styles.annotationDot} />
                <span className={styles.annotationText}>{`${activeSystem.title} // VERIFIED SIMULATION DOMAIN`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile All-Panels Stack */}
        <div className={styles.readinessMobileStack} aria-label="All Four Readiness Systems">
          {simulxrReadinessData.systems.map((system: ReadinessSystem) => (
            <article key={system.id} className={styles.mobileReadinessCard}>
              <div className={styles.mobileCardHeader}>
                <span className={styles.mobileCardNum}>{system.number}</span>
                <h4 className={styles.mobileCardTitle}>{system.title}</h4>
              </div>

              <div className={styles.mobileCardImgWrapper}>
                <ResponsiveImage
                  src={system.image}
                  alt={system.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className={styles.mobileCardImg}
                />
              </div>

              <p className={styles.mobileCardHeadline}>{system.headline}</p>
              <p className={styles.mobileCardDesc}>{system.description}</p>

              <div className={styles.mobileAppsList}>
                {system.applications.map((app) => (
                  <span key={app} className={styles.mobileAppTag}>
                    • {app}
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
