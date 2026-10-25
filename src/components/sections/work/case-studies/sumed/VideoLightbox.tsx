"use client";

import { useEffect, useRef } from "react";
import styles from "./SumedCaseStudy.module.css";

export type CaseStudyVideo = {
  src: string;
  poster: string;
  title: string;
};

export function VideoLightbox({ video, onClose }: { video: CaseStudyVideo; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const player = videoRef.current;
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    player?.focus();
    return () => {
      player?.pause();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div className={styles.videoLightbox} role="dialog" aria-modal="true" aria-label={video.title} onMouseDown={onClose}>
      <button className={styles.videoClose} onClick={onClose} aria-label="Close video">×</button>
      <div className={styles.videoDialog} onMouseDown={(event) => event.stopPropagation()}>
        <div className={styles.videoHeading}><span>PROJECT FILM</span><h2>{video.title}</h2></div>
        <video ref={videoRef} src={video.src} poster={video.poster} controls autoPlay playsInline preload="metadata" aria-label={video.title} />
      </div>
    </div>
  );
}
