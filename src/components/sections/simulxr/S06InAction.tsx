"use client";

import { useState, useEffect, useRef } from "react";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/lib/motion-preference";
import { simulxrInActionData, SIMULXR_ASSETS } from "./simulxrData";
import { SimulxrIcon } from "./SimulxrIcon";
import styles from "./Simulxr.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function S06InAction() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useMotionPreference();

  // Escape key handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVideoOpen) {
        setIsVideoOpen(false);
      }
    };
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoOpen]);

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.actionEyebrow}, .${styles.actionTitle}, .${styles.actionProjectBadge}`, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(`.${styles.actionStageFrame}`, {
        opacity: 0,
        scale: 0.97,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.actionStageFrame}`,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(`.${styles.actionLayerCard}`, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.actionLayersRow}`,
          start: "top 88%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="in-action"
      className={styles.inActionSection}
      aria-labelledby="in-action-heading"
    >
      <div className={styles.sectionContainer}>
        {/* Top Header Group */}
        <div className={styles.actionHeaderGroup}>
          <div className={styles.actionEyebrowGroup}>
            <span className={styles.actionEyebrow}>{simulxrInActionData.eyebrow}</span>
            <span className={styles.actionProjectBadge}>
              {`DEMONSTRATOR // ${simulxrInActionData.project}`}
            </span>
          </div>

          <h2 id="in-action-heading" className={styles.actionTitle}>
            SIMULXR IN ACTION.
          </h2>

          <p className={styles.actionCopy}>
            {simulxrInActionData.copy}
          </p>
        </div>

        {/* Cinematic Plant Centerpiece Stage */}
        <div className={styles.actionStageFrame}>
          <div className={styles.actionStageVisual}>
            <ResponsiveImage
              src={SIMULXR_ASSETS.owtMain}
              alt="Oily Water Treatment Training Environment authentic plant layout and equipment reconstruction"
              fill
              sizes="(max-width: 1400px) 100vw, 1360px"
              className={styles.actionStageImg}
            />
            <div className={styles.actionStageOverlay} />

            {/* Authentic Engineering Plant Annotation Pins */}
            <div className={`${styles.plantPin} ${styles.pinSkid}`} aria-hidden="true">
              <span className={styles.pinDot} />
              <div className={styles.pinTooltip}>
                <strong>PUMP SKID UNIT</strong>
                <span>DUAL-STAGE HIGH EFFICIENCY DRIVE</span>
              </div>
            </div>

            <div className={`${styles.plantPin} ${styles.pinPiping}`} aria-hidden="true">
              <span className={styles.pinDot} />
              <div className={styles.pinTooltip}>
                <strong>MANIFOLD &amp; VALVES</strong>
                <span>ISOLATION &amp; ROUTE CONTROLS</span>
              </div>
            </div>

            <div className={`${styles.plantPin} ${styles.pinTank}`} aria-hidden="true">
              <span className={styles.pinDot} />
              <div className={styles.pinTooltip}>
                <strong>SEPARATION TANK</strong>
                <span>INTERNAL PROCESS MONITORING</span>
              </div>
            </div>

            {/* Play Button Trigger Overlay */}
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className={styles.actionPlayBtn}
              aria-label="Play Oily Water Treatment demonstrator video"
            >
              <span className={styles.playIconRing}>
                <SimulxrIcon name="play" size={24} />
              </span>
              <span className={styles.playTextGroup}>
                <strong className={styles.playTitle}>{simulxrInActionData.ctaLabel}</strong>
                <span className={styles.playSub}>WATCH INDUSTRIAL DEMONSTRATOR</span>
              </span>
            </button>

            {/* Status Footer on Cinematic Frame */}
            <div className={styles.actionStageMeta}>
              <span className={styles.stageMetaItem}>
                <span className={styles.liveGreenDot} />
                REAL-TIME 3D RECONSTRUCTION
              </span>
              <span className={styles.stageMetaItemDim}>
                VERIFIED ASSETS: TANKS, FILTERS, PUMPS, PIPING &amp; STRUCTURES
              </span>
            </div>
          </div>
        </div>

        {/* Five Experience Layers Grid */}
        <div className={styles.actionLayersContainer}>
          <div className={styles.layersHeading}>
            <span className={styles.layersIndexTag}>STRUCTURED TRAINING DEPTH</span>
            <h3 className={styles.layersTitle}>FIVE INTERACTIVE EXPERIENCE LAYERS</h3>
          </div>

          <div className={styles.actionLayersRow} role="tablist" aria-label="Experience Layers">
            {simulxrInActionData.layers.map((layer, index) => {
              const isSelected = activeLayerIndex === index;
              return (
                <article
                  key={layer.title}
                  tabIndex={0}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveLayerIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveLayerIndex(index);
                    }
                  }}
                  className={`${styles.actionLayerCard} ${isSelected ? styles.actionLayerSelected : ""}`}
                >
                  <div className={styles.layerHeader}>
                    <span className={styles.layerStepNum}>0{index + 1}</span>
                    <span className={styles.layerStepAction}>{layer.title}</span>
                  </div>
                  <h4 className={styles.layerHeadline}>{layer.description}</h4>
                  <p className={styles.layerDetail}>{layer.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Modal Lightbox */}
      {isVideoOpen && (
        <div
          className={styles.videoLightboxOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={simulxrInActionData.videoTitle}
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className={styles.videoLightboxDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.videoModalHeader}>
              <div className={styles.videoModalTitleCol}>
                <span className={styles.videoModalEyebrow}>FLAGSHIP DEMONSTRATOR FILM</span>
                <h3 className={styles.videoModalHeading}>{simulxrInActionData.videoTitle}</h3>
              </div>
              <button
                type="button"
                className={styles.videoModalCloseBtn}
                onClick={() => setIsVideoOpen(false)}
                aria-label="Close video"
              >
                <SimulxrIcon name="close" size={20} />
              </button>
            </div>

            <div className={styles.videoPlayerWrapper}>
              <video
                ref={videoRef}
                src={SIMULXR_ASSETS.owtTrainingVideo}
                poster={SIMULXR_ASSETS.owtVideoPoster}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className={styles.videoPlayer}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
