"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/lib/motion-preference";
import { simulxrWorkflowData, SIMULXR_ASSETS } from "./simulxrData";
import { SimulxrIcon } from "./SimulxrIcon";
import styles from "./Simulxr.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function S04HowItWorks() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useMotionPreference();

  const stepImages = [
    { src: SIMULXR_ASSETS.sourcePid, label: "01 // CAD, BIM & P&ID INGESTION", caption: "Engineering diagrams, CAD geometry and operational manuals ingested as source truth" },
    { src: SIMULXR_ASSETS.experienceSpatial, label: "02 // 3D DIGITAL RECONSTRUCTION", caption: "Optimized real-time polygon mesh with PBR materials and accurate spatial dimensions" },
    { src: SIMULXR_ASSETS.explodedAssembly, label: "03 // PROCEDURAL & MECHANICAL LOGIC", caption: "Kinematic assemblies, valve states, LOTO logic, and operational sequences" },
    { src: SIMULXR_ASSETS.owtTrainingPoster, label: "04 // MULTI-PLATFORM RUNTIMES", caption: "Deployed to Standalone VR (Quest 3), Enterprise PC VR, and WebGL Desktop" },
    { src: SIMULXR_ASSETS.tankInternals, label: "05 // OBJECTIVE & ACCURACY EVALUATION", caption: "Action validation and completion tracking against formal learning criteria" },
    { src: SIMULXR_ASSETS.facilityWide, label: "06 // ENTERPRISE EXPANSION & SCALING", caption: "Modular expansion across new equipment, skids, process areas, and sites" },
  ];

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.workflowHeader} > *`, {
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

      gsap.from(`.${styles.workflowTimelineRail}`, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: `.${styles.workflowTimelineRail}`,
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
      id="how-it-works"
      className={styles.workflowSection}
      aria-labelledby="workflow-heading"
    >
      <div className={styles.sectionContainer}>
        {/* Section Header */}
        <div className={styles.workflowHeader}>
          <span className={styles.sectionIndexTag}>{"04 // METHODOLOGY"}</span>
          <h2 id="workflow-heading" className={styles.workflowTitle}>
            FROM YOUR FACILITY<br />
            <span className={styles.headlineHighlight}>TO A TRAINING ENVIRONMENT.</span>
          </h2>
          <p className={styles.workflowLead}>
            {simulxrWorkflowData.lead}
          </p>
        </div>

        {/* Continuous Process Pipeline Navigation */}
        <div className={styles.workflowTimelineRail} aria-label="Process Step Selector" role="tablist">
          {simulxrWorkflowData.steps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.number}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`workflow-panel-${idx}`}
                id={`workflow-tab-${idx}`}
                onClick={() => setActiveStepIndex(idx)}
                className={`${styles.timelineStepBtn} ${isActive ? styles.timelineStepActive : ""}`}
              >
                <span className={styles.timelineStepDot} aria-hidden="true" />
                <span className={styles.timelineStepNum}>{step.number}</span>
                <span className={styles.timelineStepName}>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Connected Interactive Stage Display */}
        <div
          id={`workflow-panel-${activeStepIndex}`}
          role="tabpanel"
          aria-labelledby={`workflow-tab-${activeStepIndex}`}
          className={styles.workflowDisplayStage}
        >
          {/* Step Detail Content */}
          <div className={styles.workflowStepContent}>
            <div className={styles.stepPhaseBadge}>
              <span className={styles.phaseDot} />
              <span>PHASE {simulxrWorkflowData.steps[activeStepIndex].number} — {simulxrWorkflowData.steps[activeStepIndex].phase}</span>
            </div>

            <h3 className={styles.stepTitle}>
              {simulxrWorkflowData.steps[activeStepIndex].number}. {simulxrWorkflowData.steps[activeStepIndex].title}
            </h3>

            <p className={styles.stepSummary}>
              {simulxrWorkflowData.steps[activeStepIndex].summary}
            </p>

            <p className={styles.stepDescription}>
              {simulxrWorkflowData.steps[activeStepIndex].description}
            </p>

            {/* Inputs Checklist for Step 01 */}
            {simulxrWorkflowData.steps[activeStepIndex].inputs && (
              <div className={styles.stepInputsBox}>
                <span className={styles.stepInputsLabel}>ACCEPTED INDUSTRIAL INPUTS:</span>
                <div className={styles.stepInputsPills}>
                  {simulxrWorkflowData.steps[activeStepIndex].inputs?.map((input) => (
                    <span key={input} className={styles.inputPill}>
                      <SimulxrIcon name="document" size={13} />
                      {input}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className={styles.stepNavControls}>
              <button
                type="button"
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className={styles.stepNavBtn}
                aria-label="Previous step"
              >
                ← Previous Stage
              </button>
              <span className={styles.stepCounterText}>
                {activeStepIndex + 1} of {simulxrWorkflowData.steps.length}
              </span>
              <button
                type="button"
                disabled={activeStepIndex === simulxrWorkflowData.steps.length - 1}
                onClick={() => setActiveStepIndex((prev) => Math.min(simulxrWorkflowData.steps.length - 1, prev + 1))}
                className={styles.stepNavBtn}
                aria-label="Next step"
              >
                Next Stage →
              </button>
            </div>
          </div>

          {/* Continuous Visual Viewport */}
          <div className={styles.workflowVisualFrame}>
            <div className={styles.workflowVisualWrapper}>
              <Image
                src={stepImages[activeStepIndex].src}
                alt={stepImages[activeStepIndex].caption}
                fill
                sizes="(max-width: 900px) 100vw, 680px"
                className={styles.workflowVisualImg}
              />
              <div className={styles.workflowVisualScrim} />
            </div>

            <div className={styles.workflowVisualCaption}>
              <span className={styles.visualPhaseTag}>{stepImages[activeStepIndex].label}</span>
              <p className={styles.visualPhaseDesc}>{stepImages[activeStepIndex].caption}</p>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Flow Fallback */}
        <div className={styles.workflowMobileList} aria-label="All Workflow Steps">
          {simulxrWorkflowData.steps.map((step) => (
            <article key={step.number} className={styles.mobileWorkflowCard}>
              <div className={styles.mobileStepHeader}>
                <span className={styles.mobileStepNumber}>{step.number}</span>
                <h4 className={styles.mobileStepTitle}>{step.title}</h4>
              </div>
              <p className={styles.mobileStepSummary}>{step.summary}</p>
              <p className={styles.mobileStepDesc}>{step.description}</p>
              {step.inputs && (
                <div className={styles.mobileInputsGrid}>
                  {step.inputs.map((inp) => (
                    <span key={inp} className={styles.inputPillSmall}>
                      {inp}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
