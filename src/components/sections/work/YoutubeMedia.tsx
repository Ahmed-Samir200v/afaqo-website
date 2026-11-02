"use client";

import { useState } from "react";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import { CaseStudyIcon } from "./case-studies/CaseStudyIcons";
import styles from "./CaseStudy.module.css";

interface YoutubeMediaProps {
  src: string;
  watchUrl?: string;
  poster?: string;
  title: string;
}

export function YoutubeMedia({ src, watchUrl, poster, title }: YoutubeMediaProps) {
  const [started, setStarted] = useState(false);
  const embedSrc = `${src}${src.includes("?") ? "&" : "?"}autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className={styles.youtubeMedia}>
      {!started ? (
        <button
          className={styles.youtubePoster}
          type="button"
          onClick={() => setStarted(true)}
          aria-label={`Play ${title}`}
        >
          {poster ? (
            <ResponsiveImage
              src={poster}
              alt=""
              fill
              sizes="(max-width: 1439px) 95vw, (max-width: 1799px) 1280px, 1560px"
              className={styles.mediaImage}
            />
          ) : (
            <span className={styles.youtubeFallbackPoster} aria-hidden="true" />
          )}
          <span className={styles.youtubeBadge} aria-hidden="true">
            <CaseStudyIcon kind="play" size={12} />
            <span>VIDEO WALKTHROUGH</span>
          </span>
          <span className={styles.youtubePlay} aria-hidden="true">
            <CaseStudyIcon kind="play" size={22} className={styles.youtubePlayIcon} />
          </span>
        </button>
      ) : (
        <iframe
          className={styles.youtubeIframe}
          src={embedSrc}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
      {watchUrl && (
        <a
          className={styles.youtubeWatchLink}
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Watch ${title} on YouTube (opens in new tab)`}
        >
          <span>Watch on YouTube</span>
          <CaseStudyIcon kind="arrow-up-right" size={14} />
        </a>
      )}
    </div>
  );
}
