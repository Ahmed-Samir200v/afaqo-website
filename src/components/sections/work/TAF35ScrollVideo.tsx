"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getMotionPreference } from "@/lib/motion-preference";
import type { CaseStudyMediaAsset } from "@/content/projects/case-studies";
import { CaseStudyIcon } from "./case-studies/CaseStudyIcons";
import styles from "./CaseStudy.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TAF35ScrollVideo({ media }: { media: CaseStudyMediaAsset }) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const [manualMode, setManualMode] = useState(false);

  const forceMotion = () =>
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("force-motion") === "true";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const forced = forceMotion();
      setManualMode(
        !forced &&
          (window.matchMedia?.("(max-width: 899px)").matches === true ||
            getMotionPreference().shouldReduceMotion ||
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true)
      );
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!section || !frame || !video) return;

    const reducedMotion =
      !forceMotion() &&
      (getMotionPreference().shouldReduceMotion ||
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
    const desktop = window.matchMedia?.("(min-width: 900px)").matches ?? true;

    if (reducedMotion || !desktop) {
      return;
    }

    let ctx: gsap.Context | null = null;

    const setup = () => {
      if (!video.duration || !Number.isFinite(video.duration)) return;
      ctx?.revert();
      ctx = gsap.context(() => {
        video.pause();
        video.currentTime = 0;

        gsap.to(video, {
          currentTime: video.duration,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1300",
            scrub: true,
            pin: frame,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (video.duration) {
                video.currentTime = self.progress * video.duration;
              }
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress.toFixed(4)})`;
              }
            },
          },
        });
      }, section);
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      video.removeEventListener("loadedmetadata", setup);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="device-motion"
      className={styles.taf35MotionSection}
      aria-labelledby="taf35-motion-heading"
      data-cs-section
    >
      <div className="page-container">
        <div className={styles.taf35MotionHeader} data-cs-header>
          <div>
            <div className={styles.sectionEyebrow}>
              <CaseStudyIcon kind="route" size={14} />
              <span>DEVICE MOTION / INTERACTIVE MECHANICS</span>
              <span className={styles.eyebrowLine} aria-hidden="true" />
            </div>
            <h2 id="taf35-motion-heading" className={styles.sectionHeading}>
              Interactive device <span className={styles.accent}>movement.</span>
            </h2>
          </div>
          <p className={styles.sectionSubtitle}>
            Scroll through the TAF35 device animation to see its mechanical movement and articulated behaviour inside the real-time training experience.
          </p>
        </div>

        <figure className={styles.mediaFigure} data-cs-media>
          <div ref={frameRef} className={styles.taf35MotionFrame}>
            <video
              ref={videoRef}
              className={styles.taf35MotionVideo}
              src={media.src}
              poster={media.poster}
              muted
              playsInline
              preload="metadata"
              controls={manualMode}
              aria-label={media.alt || "TAF35 device motion"}
            />
            <div
              className={`${styles.taf35MotionOverlay} ${
                manualMode ? styles.taf35MotionOverlayManual : ""
              }`}
              aria-hidden="true"
            >
              <span className={styles.taf35MotionBadge}>
                <CaseStudyIcon kind="route" size={13} />
                <span>DEVICE MOTION / INTERACTIVE MECHANICS</span>
              </span>
              <span className={styles.taf35MotionHint}>
                <CaseStudyIcon kind={manualMode ? "play" : "compass"} size={13} />
                <span>{manualMode ? "Play the motion study" : "Scroll to scrub"}</span>
              </span>
            </div>
            {!manualMode && (
              <div className={styles.taf35MotionProgressTrack} aria-hidden="true">
                <span
                  ref={progressBarRef}
                  className={styles.taf35MotionProgressBar}
                />
              </div>
            )}
          </div>
          {media.caption && (
            <figcaption className={`${styles.mediaCaption} ${styles.mediaCaptionDark}`}>
              <span className={styles.mediaCaptionIcon}>
                <CaseStudyIcon kind="route" size={15} />
              </span>
              <span>{media.caption}</span>
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
