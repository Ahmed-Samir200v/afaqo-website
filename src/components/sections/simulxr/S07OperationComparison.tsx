"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/lib/motion-preference";
import { simulxrOperationData } from "./simulxrData";
import { SimulxrIcon } from "./SimulxrIcon";
import styles from "./Simulxr.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function S07OperationComparison() {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useMotionPreference();

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // In case capture wasn't held
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = 4;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        setSliderPosition((prev) => Math.max(0, prev - step));
        break;
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        setSliderPosition((prev) => Math.min(100, prev + step));
        break;
      case "PageDown":
        e.preventDefault();
        setSliderPosition((prev) => Math.max(0, prev - 20));
        break;
      case "PageUp":
        e.preventDefault();
        setSliderPosition((prev) => Math.min(100, prev + 20));
        break;
      case "Home":
        e.preventDefault();
        setSliderPosition(0);
        break;
      case "End":
        e.preventDefault();
        setSliderPosition(100);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.operationHeader} > *`, {
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

      gsap.from(`.${styles.operationSliderWrapper}`, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.operationSliderWrapper}`,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(`.${styles.statementBannerBox} > *`, {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.statementBannerBox}`,
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
      id="operation-specific"
      className={styles.operationSection}
      aria-labelledby="operation-heading"
    >
      <div className={styles.sectionContainer}>
        {/* Editorial Heading */}
        <div className={styles.operationHeader}>
          <span className={styles.sectionIndexTag}>{"07 // CUSTOM ENGINEERING FIDELITY"}</span>
          <h2 id="operation-heading" className={styles.operationTitle}>
            NOT A GENERIC TRAINING WORLD.
          </h2>
          <p className={styles.operationCopy}>
            {simulxrOperationData.copy}
          </p>
        </div>

        {/* Accepted Inputs Tag Bar */}
        <div className={styles.operationInputsBar}>
          <span className={styles.inputsBarTitle}>
            {simulxrOperationData.inputsHeadline}
          </span>
          <div className={styles.inputsPillContainer}>
            {simulxrOperationData.inputs.map((inp) => (
              <span key={inp} className={styles.operationInputPill}>
                <SimulxrIcon name="document" size={13} />
                {inp}
              </span>
            ))}
          </div>
        </div>

        {/* Professional Draggable Before / After Comparison Slider */}
        <div className={styles.operationSliderWrapper}>
          <div className={styles.sliderControlBar}>
            <span className={styles.sliderInstructionText}>
              DRAG CENTER DIVIDER OR TAP MODES TO INSPECT TRANSLATION:
            </span>
            <div className={styles.sliderPresetBtns} role="group" aria-label="Slider View Presets">
              <button
                type="button"
                onClick={() => setSliderPosition(100)}
                className={`${styles.presetBtn} ${sliderPosition === 100 ? styles.presetBtnActive : ""}`}
                aria-pressed={sliderPosition === 100}
              >
                100% SOURCE
              </button>
              <button
                type="button"
                onClick={() => setSliderPosition(50)}
                className={`${styles.presetBtn} ${sliderPosition === 50 ? styles.presetBtnActive : ""}`}
                aria-pressed={sliderPosition === 50}
              >
                SPLIT VIEW (50/50)
              </button>
              <button
                type="button"
                onClick={() => setSliderPosition(0)}
                className={`${styles.presetBtn} ${sliderPosition === 0 ? styles.presetBtnActive : ""}`}
                aria-pressed={sliderPosition === 0}
              >
                100% EXPERIENCE
              </button>
            </div>
          </div>

          <div
            ref={containerRef}
            className={styles.sliderContainer}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            role="region"
            aria-label="Before and after comparison slider"
          >
            {/* Background Layer: RIGHT - EXPERIENCE (Optimized 3D Real-Time Environment) */}
            <div className={styles.sliderLayerExperience}>
              <ResponsiveImage
                src={simulxrOperationData.slider.experienceImage}
                alt={simulxrOperationData.slider.experienceAlt}
                fill
                sizes="(max-width: 1400px) 100vw, 1360px"
                className={styles.sliderImg}
                draggable={false}
              />
              <div className={`${styles.sliderLabelBadge} ${styles.labelRight}`}>
                <span className={styles.labelSub}>{`RIGHT // ${simulxrOperationData.slider.experienceLabel}`}</span>
                <strong>{simulxrOperationData.slider.experienceCaption}</strong>
              </div>
            </div>

            {/* Foreground Clipped Layer: LEFT - SOURCE (Engineering CAD / P&ID) */}
            <div
              className={styles.sliderLayerSource}
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <ResponsiveImage
                src={simulxrOperationData.slider.sourceImage}
                alt={simulxrOperationData.slider.sourceAlt}
                fill
                sizes="(max-width: 1400px) 100vw, 1360px"
                className={styles.sliderImg}
                draggable={false}
              />
              <div className={`${styles.sliderLabelBadge} ${styles.labelLeft}`}>
                <span className={styles.labelSub}>{`LEFT // ${simulxrOperationData.slider.sourceLabel}`}</span>
                <strong>{simulxrOperationData.slider.sourceCaption}</strong>
              </div>
            </div>

            {/* Divider Line */}
            <div
              className={styles.sliderDividerLine}
              style={{ left: `${sliderPosition}%` }}
              aria-hidden="true"
            />

            {/* Center Draggable / Focusable Handle */}
            <button
              type="button"
              className={styles.sliderDividerHandle}
              style={{ left: `${sliderPosition}%` }}
              role="slider"
              aria-label="Comparison position slider"
              aria-orientation="horizontal"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPosition)}
              aria-valuetext={`${Math.round(sliderPosition)}% Source, ${100 - Math.round(sliderPosition)}% Experience`}
              onKeyDown={handleKeyDown}
            >
              <span className={styles.handleArrows} aria-hidden="true">
                ‹ ›
              </span>
            </button>
          </div>
        </div>

        {/* Supporting Tri-Statement Banner */}
        <div className={styles.statementBannerBox}>
          <span className={styles.statementBannerTag}>DEDICATED SPECIFICATION</span>
          <div className={styles.statementTriad}>
            {simulxrOperationData.statement.map((item, i) => (
              <div key={i} className={styles.triadCol}>
                <span className={styles.triadIndex}>0{i + 1}</span>
                <h3 className={styles.triadText}>{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
