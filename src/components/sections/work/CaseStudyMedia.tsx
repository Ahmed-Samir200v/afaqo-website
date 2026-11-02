"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import type {
  CaseStudyMediaAsset,
  CaseStudyMediaPlan,
} from "@/content/projects/case-studies";
import {
  isApprovedAsset,
  isDiagramAsset,
  isScenarioAsset,
  shouldContainAsset,
} from "@/lib/case-study-media";
import { getMotionPreference } from "@/lib/motion-preference";
import {
  CaseStudyIcon,
  resolveMediaIcon,
} from "./case-studies/CaseStudyIcons";
import styles from "./CaseStudy.module.css";
import { YoutubeMedia } from "./YoutubeMedia";

interface MediaFrameProps {
  asset: CaseStudyMediaAsset;
  className?: string;
  sizes?: string;
  hoverZoom?: boolean;
  darkCaption?: boolean;
  onExpandImage?: (asset: CaseStudyMediaAsset, triggerEl: HTMLButtonElement | null) => void;
  expandLabel?: string;
}

/**
 * Accessible HTML5 Video Player with poster, play/pause controls,
 * playsInline, viewport pause, and prefers-reduced-motion compliance.
 */
function CaseStudyVideoPlayer({
  asset,
  priority = false,
}: {
  asset: CaseStudyMediaAsset;
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const manuallyPausedRef = useRef(false);

  const title = asset.alt || asset.caption || "Case study video";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReduced =
      getMotionPreference().shouldReduceMotion ||
      (typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

    if (prefersReduced) {
      video.pause();
      return;
    }

    if (asset.autoplay) {
      video.muted = true;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !video.paused) {
            video.pause();
          } else if (
            entry.isIntersecting &&
            asset.autoplay &&
            !manuallyPausedRef.current &&
            !getMotionPreference().shouldReduceMotion
          ) {
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [asset.autoplay]);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      manuallyPausedRef.current = false;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => setIsPlaying(false));
    } else {
      manuallyPausedRef.current = true;
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <div className={styles.videoPlayerContainer}>
      <video
        ref={videoRef}
        className={styles.mediaVideo}
        poster={asset.poster}
        muted={asset.autoplay ?? true}
        loop={Boolean(asset.autoplay)}
        controls={hasStarted && (asset.controls ?? true)}
        playsInline
        preload={priority || asset.autoplay ? "metadata" : "none"}
        aria-label={title}
        onPlay={() => {
          setIsPlaying(true);
          setHasStarted(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={asset.src} type="video/mp4" />
        Your browser does not support embedded video.{" "}
        <a href={asset.src}>Open the video file</a>.
      </video>

      <div className={styles.videoControlOverlay}>
        <span className={styles.youtubeBadge} aria-hidden="true">
          <CaseStudyIcon kind="play" size={12} />
          <span>{isPlaying ? "PLAYING PREVIEW" : "VIDEO SHOWCASE"}</span>
        </span>

        {!isPlaying && (
          <button
            type="button"
            className={styles.videoCenterPlayButton}
            onClick={togglePlayback}
            aria-label={`Play ${title}`}
          >
            <span className={styles.youtubePlay} aria-hidden="true">
              <CaseStudyIcon kind="play" size={22} className={styles.youtubePlayIcon} />
            </span>
          </button>
        )}

        <button
          type="button"
          className={styles.videoCornerControlBtn}
          onClick={togglePlayback}
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
        >
          <CaseStudyIcon kind={isPlaying ? "pause" : "play"} size={14} />
          <span>{isPlaying ? "Pause" : "Play Video"}</span>
        </button>
      </div>
    </div>
  );
}

export function CaseStudyMediaFrame({
  asset,
  className = "",
  sizes = "(max-width: 1440px) 100vw, 1100px",
  hoverZoom = false,
  darkCaption = false,
  onExpandImage,
  expandLabel,
}: MediaFrameProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const aspectClass =
    asset.aspectRatio === "21/9"
      ? styles.mediaRatioCinematic
      : asset.aspectRatio === "4/3"
        ? styles.mediaRatioFourThree
        : styles.mediaRatioWide;

  const contain = shouldContainAsset(asset.id);
  const diagram = isDiagramAsset(asset.id);
  const frameClassName = [
    styles.mediaFrame,
    aspectClass,
    contain ? styles.mediaFrameContain : "",
    diagram ? styles.mediaFrameDiagram : "",
    hoverZoom ? styles.mediaFrameGalleryHover : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!isApprovedAsset(asset)) {
    return (
      <div
        className={`${frameClassName} ${styles.mediaAwaiting}`}
        data-media-slot={asset.id}
        data-media-status="awaiting-approved-media"
        aria-hidden="true"
      >
        <span className={styles.mediaAwaitingMark} />
      </div>
    );
  }

  const iconKind = resolveMediaIcon(asset.id, asset.caption || asset.alt || "");
  const imageClassName = [
    styles.mediaImage,
    contain ? styles.mediaImageContain : "",
    hoverZoom ? styles.mediaImageHoverZoom : "",
  ]
    .filter(Boolean)
    .join(" ");

  const isExpandableImage = asset.type === "image" && Boolean(onExpandImage);

  return (
    <figure className={styles.mediaFigure}>
      <div className={frameClassName}>
        {asset.type === "youtube" ? (
          <YoutubeMedia
            src={asset.src || ""}
            watchUrl={asset.watchUrl}
            poster={asset.poster}
            title={asset.alt || asset.caption || "Case study video"}
          />
        ) : asset.type === "video" ? (
          <CaseStudyVideoPlayer asset={asset} priority={asset.priority} />
        ) : isExpandableImage ? (
          <button
            ref={triggerRef}
            type="button"
            className={styles.galleryImageTrigger}
            onClick={() => onExpandImage?.(asset, triggerRef.current)}
            aria-label={
              expandLabel ||
              `Open ${asset.caption || asset.alt || "project image"} in full-screen gallery`
            }
          >
            <ResponsiveImage
              src={asset.src}
              alt={asset.alt || ""}
              fill
              priority={asset.priority}
              sizes={sizes}
              className={imageClassName}
            />
            <span className={styles.galleryExpandBadge} aria-hidden="true">
              <CaseStudyIcon kind="expand" size={14} />
              <span>Expand View</span>
            </span>
          </button>
        ) : (
          <ResponsiveImage
            src={asset.src}
            alt={asset.alt || ""}
            fill
            priority={asset.priority}
            sizes={sizes}
            className={imageClassName}
          />
        )}
      </div>
      {asset.caption && (
        <figcaption
          className={`${styles.mediaCaption} ${darkCaption ? styles.mediaCaptionDark : ""}`}
        >
          <span className={styles.mediaCaptionIcon}>
            <CaseStudyIcon kind={iconKind} size={15} />
          </span>
          <span>{asset.caption}</span>
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Task 04 — Video-first Hero Media with Safe Image Fallback
 * - If the project has an approved hero video (type "video" or "youtube" with approved src),
 *   renders the video player as primary hero media with its approved poster and playback controls.
 * - If no approved hero video exists, preserves the approved hero image without creating a fake
 *   or empty video player.
 */
export function HeroCaseStudyMedia({
  media,
  fallbackImage,
  fallbackAlt,
}: {
  media: CaseStudyMediaAsset;
  fallbackImage?: string;
  fallbackAlt?: string;
}) {
  const resolvedMedia = useMemo<CaseStudyMediaAsset>(() => {
    const hasApprovedHeroVideo =
      (media.type === "video" || media.type === "youtube") &&
      isApprovedAsset(media);

    if (hasApprovedHeroVideo) {
      return {
        ...media,
        poster: media.poster || fallbackImage,
        aspectRatio: media.aspectRatio || "21/9",
        priority: true,
      };
    }

    // Fallback to approved hero image if hero video is not present or awaiting media
    const approvedHeroImageSrc =
      media.type === "image" && isApprovedAsset(media)
        ? media.src
        : media.poster || fallbackImage;

    if (approvedHeroImageSrc) {
      return {
        id: media.id || "case-study-hero-image",
        type: "image",
        src: approvedHeroImageSrc,
        alt: media.alt || fallbackAlt || "Case study hero visualization",
        caption: media.caption,
        aspectRatio: media.aspectRatio || "21/9",
        priority: true,
        status: "approved",
      };
    }

    // Neither approved video nor approved image exists: render clean awaiting frame (never an empty player)
    return {
      id: media.id || "case-study-hero-awaiting",
      type: "image",
      aspectRatio: media.aspectRatio || "21/9",
      status: "awaiting-approved-media",
    };
  }, [media, fallbackImage, fallbackAlt]);

  return (
    <div data-cs-hero-media>
      <CaseStudyMediaFrame
        asset={resolvedMedia}
        className={styles.heroArchitectureMedia}
        sizes="(max-width: 1439px) 95vw, (max-width: 1799px) 1340px, (max-width: 2299px) 1500px, 1800px"
      />
    </div>
  );
}

export function OverviewCaseStudyMedia({ media }: { media: CaseStudyMediaAsset[] }) {
  if (media.length === 0) return null;
  return (
    <div
      className={media.length > 1 ? styles.overviewMediaGrid : styles.overviewMediaSingle}
    >
      {media.map((item, idx) => {
        const iconKind = resolveMediaIcon(item.id, item.caption || item.alt || "");
        return (
          <div key={item.id} className={styles.overviewMediaCard} data-cs-media>
            <div className={styles.mediaCardTopBar}>
              <span className={styles.mediaCardTag}>
                <CaseStudyIcon kind={iconKind} size={14} />
                <span>
                  {item.id.includes("masterplan")
                    ? "SPATIAL MASTERPLAN"
                    : idx === 0
                      ? "DIGITAL FACILITY ENVIRONMENT"
                      : "SYSTEM ARCHITECTURE"}
                </span>
              </span>
              <span className={styles.mediaCardIndex}>
                FIG 0{idx + 1}
              </span>
            </div>
            <CaseStudyMediaFrame
              asset={item}
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          </div>
        );
      })}
    </div>
  );
}

export function ProcessCaseStudyMedia({
  media,
}: {
  media: CaseStudyMediaPlan["process"];
}) {
  if (media.length === 0) return null;
  const isTaf35 = media.some((chapter) => chapter.id.toLowerCase().startsWith("taf35-"));
  return (
    <section
      id="production-journey"
      className={styles.mediaProcessSection}
      aria-labelledby="media-process-heading"
      data-cs-section
    >
      <div className="page-container">
        <div className={styles.mediaSectionIntro} data-cs-header>
          <div className={styles.eyebrowDark}>
            <CaseStudyIcon kind="process" size={14} />
            <span>05 / PRODUCTION JOURNEY</span>
            <span className={styles.eyebrowLineDark} aria-hidden="true" />
          </div>
          <h2 id="media-process-heading">
            From source to <em>experience.</em>
          </h2>
          <p className={styles.mediaSectionSubtitle}>
            {isTaf35
              ? "Equipment references, component structures, assembly sequences, and maintenance workflows translated into an interactive training simulation."
              : "Engineering references, spatial layouts, treatment assemblies, and process systems translated into an interactive real-time facility."}
          </p>
        </div>
        <div className={styles.mediaProcessList}>
          {media.map((chapter, index) => {
            const chapterIcon = resolveMediaIcon(chapter.id, chapter.title);
            return (
              <article
                key={chapter.id}
                className={`${styles.mediaProcessRow} ${
                  chapter.align === "media-right" ? styles.mediaRight : ""
                }`}
                data-cs-process-row
              >
                <div className={styles.mediaProcessFrameWrap} data-cs-process-media>
                  <CaseStudyMediaFrame
                    asset={chapter.media}
                    sizes="(max-width: 899px) 100vw, 54vw"
                    darkCaption
                  />
                </div>
                <div className={styles.mediaProcessCopy} data-cs-process-copy>
                  <div className={styles.mediaProcessStepHeader}>
                    <span className={styles.mediaProcessIconBadge}>
                      <CaseStudyIcon kind={chapterIcon} size={20} />
                    </span>
                    <div className={styles.mediaProcessStepMeta}>
                      <span className={styles.mediaProcessStepCode}>
                        STAGE {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.mediaProcessConnector} aria-hidden="true" />
                    </div>
                  </div>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CinematicCaseStudyMedia({ media }: { media: CaseStudyMediaAsset }) {
  const isVideo = media.type === "video" || media.type === "youtube";
  const badgeIcon = isVideo
    ? "play"
    : resolveMediaIcon(media.id, media.caption || media.alt || "");
  const badgeLabel = isVideo ? "FACILITY WALKTHROUGH" : "ENVIRONMENT WIDE VIEW";

  return (
    <section
      id="cinematic-walkthrough"
      className={styles.cinematicSection}
      aria-label="Project cinematic media"
      data-cs-section
    >
      <div className="page-container">
        <div className={styles.cinematicHeaderBar} data-cs-header>
          <span className={styles.cinematicBadge}>
            <CaseStudyIcon kind={badgeIcon} size={13} />
            <span>{badgeLabel}</span>
          </span>
          {media.caption && (
            <span className={styles.cinematicMetaText}>{media.caption}</span>
          )}
        </div>
        <div data-cs-media>
          <CaseStudyMediaFrame
            asset={media}
            className={styles.cinematicFrame}
            darkCaption
          />
        </div>
      </div>
    </section>
  );
}

function resolveInteractionTagLabel(item: CaseStudyMediaAsset): string {
  const id = item.id.toLowerCase();
  if (id.includes("valve")) return "EQUIPMENT INTERACTION";
  if (id.includes("interactive-ui")) return "INTERACTIVE VR INTERFACE";
  if (id.includes("motion") || item.type === "youtube" || item.type === "video") {
    return "DEVICE MOTION & ANIMATION";
  }
  if (id.includes("training-team")) return "TRAINING BAY CONTEXT";
  if (id.includes("safety-uniform")) return "EMERGENCY-RESPONSE CONTEXT";
  if (id.includes("vertical-view")) return "EQUIPMENT ORIENTATION & ACCESS";
  return "INTERACTIVE VR INTERFACE";
}

export function ExperienceCaseStudyMedia({
  media,
}: {
  media: CaseStudyMediaPlan["experience"];
}) {
  const interactionItems = media.secondary.filter(
    (item) => !isScenarioAsset(item.id, item.caption)
  );
  const scenarioItems = media.secondary.filter((item) =>
    isScenarioAsset(item.id, item.caption)
  );

  return (
    <section
      id="experience-showcase"
      className={styles.experienceMediaSection}
      aria-labelledby="experience-showcase-heading"
      data-cs-section
    >
      <div className="page-container">
        <div className={styles.sectionHeader} data-cs-header>
          <div>
            <div className={styles.sectionEyebrow}>
              <CaseStudyIcon kind="headset" size={14} />
              <span>07 / IMMERSIVE TRAINING &amp; SCENARIOS</span>
              <span className={styles.eyebrowLine} aria-hidden="true" />
            </div>
            <h2 id="experience-showcase-heading" className={styles.sectionHeading}>
              Experience <span className={styles.accent}>showcase.</span>
            </h2>
          </div>
          <p className={styles.sectionSubtitle}>{media.copy}</p>
        </div>

        <div className={styles.experiencePrimaryBlock} data-cs-media>
          <div className={styles.experiencePrimaryHeader}>
            <span className={styles.experiencePrimaryIcon}>
              <CaseStudyIcon kind="headset" size={18} />
            </span>
            <h3 className={styles.experienceMediaTitle}>{media.title}</h3>
          </div>
          <CaseStudyMediaFrame
            asset={media.primary}
            className={styles.experiencePrimary}
          />
        </div>

        {interactionItems.length > 0 && (
          <div className={styles.experienceSecondaryGrid}>
            {interactionItems.map((item, idx) => {
              const iconKind = resolveMediaIcon(
                item.id,
                item.caption || item.alt || ""
              );
              return (
                <article
                  key={item.id}
                  className={styles.interactionMediaCard}
                  data-cs-card
                >
                  <div className={styles.mediaCardTopBar}>
                    <span className={styles.mediaCardTag}>
                      <CaseStudyIcon kind={iconKind} size={14} />
                      <span>{resolveInteractionTagLabel(item)}</span>
                    </span>
                    <span className={styles.mediaCardIndex}>
                      0{idx + 1}
                    </span>
                  </div>
                  <CaseStudyMediaFrame
                    asset={item}
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                </article>
              );
            })}
          </div>
        )}

        {scenarioItems.length > 0 && (
          <div className={styles.scenarioSubSection}>
            <div className={styles.scenarioSubHeader} data-cs-header>
              <span className={styles.scenarioSectionBadge}>
                <CaseStudyIcon kind="scenario" size={14} />
                <span>HAZARD &amp; SAFETY TRAINING SCENARIOS</span>
              </span>
              <p className={styles.scenarioSectionNote}>
                Scenario-based drills enabling workforce familiarization with critical emergency conditions inside a controlled virtual environment.
              </p>
            </div>
            <div
              className={
                scenarioItems.length > 1
                  ? styles.scenarioGrid
                  : styles.overviewMediaSingle
              }
            >
              {scenarioItems.map((item, idx) => {
                const lowerId = item.id.toLowerCase();
                const isGasLeak = lowerId.includes("gas");
                const isFire = lowerId.includes("fire");
                const scenarioIcon = isGasLeak
                  ? "gas-leak"
                  : "hazardous-atmosphere";
                const scenarioCode = isGasLeak
                  ? "SCENARIO 01 · GAS LEAKAGE RESPONSE"
                  : isFire
                    ? "SCENARIO 01 · FIRE-RESPONSE SIMULATION"
                    : "SCENARIO 02 · HAZARDOUS ATMOSPHERE";
                return (
                  <article
                    key={item.id}
                    className={styles.scenarioMediaCard}
                    data-cs-scenario
                  >
                    <div className={styles.scenarioCardHeader}>
                      <div className={styles.scenarioTitleGroup}>
                        <span className={styles.scenarioIconBadge}>
                          <CaseStudyIcon kind={scenarioIcon} size={18} />
                        </span>
                        <div>
                          <span className={styles.scenarioCode}>
                            {scenarioCode}
                          </span>
                          <h4 className={styles.scenarioCardTitle}>
                            {item.caption || item.alt || `Scenario 0${idx + 1}`}
                          </h4>
                        </div>
                      </div>
                      <span className={styles.scenarioStatusPill}>
                        <span className={styles.scenarioHazardDot} aria-hidden="true" />
                        <CaseStudyIcon kind="shield" size={12} />
                        <span>SAFETY DRILL</span>
                      </span>
                    </div>
                    <CaseStudyMediaFrame
                      asset={item}
                      sizes={
                        scenarioItems.length > 1
                          ? "(max-width: 767px) 100vw, 50vw"
                          : "(max-width: 1023px) 100vw, 1140px"
                      }
                    />
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Accessible Full-Screen Lightbox Overlay for Project Gallery
 * - Keyboard navigation: ArrowLeft, ArrowRight, Home, End, Escape, Tab trap
 * - Mobile touch swipe navigation
 * - Background scroll lock while open
 * - Restores focus to the originating gallery image button on close
 */
function CaseStudyGalleryLightbox({
  items,
  activeIndex,
  projectTitle,
  onSelectIndex,
  onClose,
}: {
  items: CaseStudyMediaAsset[];
  activeIndex: number;
  projectTitle?: string;
  onSelectIndex: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const total = items.length;
  const current = items[activeIndex] || items[0];

  const goPrev = useCallback(() => {
    onSelectIndex((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onSelectIndex]);

  const goNext = useCallback(() => {
    onSelectIndex((activeIndex + 1) % total);
  }, [activeIndex, total, onSelectIndex]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (total <= 1) return;
      const isRtl = document.documentElement.dir === "rtl";
      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (isRtl) goPrev();
        else goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (isRtl) goNext();
        else goPrev();
      } else if (event.key === "Home") {
        event.preventDefault();
        onSelectIndex(0);
      } else if (event.key === "End") {
        event.preventDefault();
        onSelectIndex(total - 1);
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [onClose, goPrev, goNext, onSelectIndex, total]);

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const handleTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current || total <= 1) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    touchStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!touchStartRef.current || total <= 1) return;
    const dx = e.clientX - touchStartRef.current.x;
    const dy = e.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  if (!current || !current.src) return null;

  return (
    <div
      ref={dialogRef}
      className={styles.lightboxBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle || "Project"} full-screen image gallery`}
      onKeyDown={handleDialogKeyDown}
      onClick={onClose}
    >
      <div
        className={styles.lightboxShell}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar: Project Label, Counter & Accessible Close Button */}
        <header className={styles.lightboxHeader}>
          <div className={styles.lightboxTitleGroup}>
            <span className={styles.lightboxEyebrow}>
              <CaseStudyIcon kind="gallery" size={14} />
              <span>{projectTitle || "PROJECT GALLERY"}</span>
            </span>
          </div>

          <div className={styles.lightboxHeaderRight}>
            <div className={styles.lightboxCounter} aria-live="polite">
              <span className={styles.lightboxCounterActive}>
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className={styles.lightboxCounterSep}>/</span>
              <span>{String(total).padStart(2, "0")}</span>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              className={styles.lightboxCloseBtn}
              onClick={onClose}
              aria-label="Close full-screen gallery"
            >
              <CaseStudyIcon kind="close" size={18} />
              <span className={styles.lightboxCloseLabel}>Close</span>
            </button>
          </div>
        </header>

        {/* Main Image Stage with Touch Swipe & Previous/Next Controls */}
        <div
          className={styles.lightboxStage}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {total > 1 && (
            <button
              type="button"
              className={`${styles.lightboxNavBtn} ${styles.lightboxNavPrev}`}
              onClick={goPrev}
              aria-label="Previous project image"
            >
              <CaseStudyIcon kind="arrow-left" size={20} />
            </button>
          )}

          <div className={styles.lightboxImageWrapper}>
            <ResponsiveImage
              key={current.src}
              src={current.src}
              alt={current.alt || current.caption || "Project gallery view"}
              fill
              sizes="94vw"
              className={styles.lightboxImage}
            />
          </div>

          {total > 1 && (
            <button
              type="button"
              className={`${styles.lightboxNavBtn} ${styles.lightboxNavNext}`}
              onClick={goNext}
              aria-label="Next project image"
            >
              <CaseStudyIcon kind="arrow-right" size={20} />
            </button>
          )}
        </div>

        {/* Footer Caption & Project Thumbnail Strip */}
        <footer className={styles.lightboxFooter}>
          <div className={styles.lightboxCaptionBlock}>
            <p className={styles.lightboxCaptionTitle}>
              {current.caption || current.alt || `View ${activeIndex + 1}`}
            </p>
            {current.alt && current.caption && current.alt !== current.caption && (
              <p className={styles.lightboxCaptionSub}>{current.alt}</p>
            )}
          </div>

          {total > 1 && (
            <div
              className={styles.lightboxThumbStrip}
              role="tablist"
              aria-label="Project gallery images"
            >
              {items.map((item, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={item.id || item.src}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={`View image ${idx + 1}: ${item.caption || item.alt || ""}`}
                    className={`${styles.lightboxThumbBtn} ${
                      isSelected ? styles.lightboxThumbBtnActive : ""
                    }`}
                    onClick={() => onSelectIndex(idx)}
                  >
                    {item.src && (
                      <ResponsiveImage
                        src={item.src}
                        alt=""
                        fill
                        sizes="96px"
                        className={styles.lightboxThumbImg}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

export function FinalCaseStudyGallery({
  media,
  projectImages,
  projectTitle,
}: {
  media: CaseStudyMediaAsset[];
  projectImages?: CaseStudyMediaAsset[];
  projectTitle?: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const originButtonRef = useRef<HTMLButtonElement | null>(null);

  // Build deduplicated approved image list for this project (never mixes assets across projects)
  const lightboxItems = useMemo(() => {
    const seen = new Set<string>();
    const combined: CaseStudyMediaAsset[] = [];

    const add = (asset: CaseStudyMediaAsset) => {
      if (asset.type !== "image" || !isApprovedAsset(asset)) return;
      if (seen.has(asset.src)) return;
      seen.add(asset.src);
      combined.push(asset);
    };

    media.forEach(add);
    projectImages?.forEach(add);
    return combined;
  }, [media, projectImages]);

  const handleOpenAsset = useCallback(
    (asset: CaseStudyMediaAsset, triggerEl: HTMLButtonElement | null) => {
      if (!isApprovedAsset(asset)) return;
      originButtonRef.current = triggerEl;
      const foundIdx = lightboxItems.findIndex((item) => item.src === asset.src);
      setLightboxIndex(foundIdx >= 0 ? foundIdx : 0);
    },
    [lightboxItems]
  );

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
    const trigger = originButtonRef.current;
    if (trigger) {
      requestAnimationFrame(() => {
        trigger.focus();
      });
    }
  }, []);

  if (media.length === 0) return null;

  const hasFeaturedLayout = media.length >= 2;
  const featuredItem = hasFeaturedLayout ? media[0] : null;
  const supportingItems = hasFeaturedLayout ? media.slice(1) : media;

  return (
    <section
      id="project-gallery"
      className={styles.finalGallerySection}
      aria-labelledby="final-gallery-heading"
      data-cs-section
    >
      <div className="page-container">
        <div className={styles.sectionHeader} data-cs-header>
          <div>
            <div className={styles.sectionEyebrow}>
              <CaseStudyIcon kind="gallery" size={14} />
              <span>10 / EQUIPMENT &amp; COMPONENT GALLERY</span>
              <span className={styles.eyebrowLine} aria-hidden="true" />
            </div>
            <h2 id="final-gallery-heading" className={styles.sectionHeading}>
              Project <span className={styles.accent}>gallery.</span>
            </h2>
          </div>
          <p className={styles.sectionSubtitle}>
            Selected views of reconstructed equipment, assemblies, and spatial environments.
            {lightboxItems.length > 0 && " Select any image to inspect the full project gallery."}
          </p>
        </div>

        {/* Featured Editorial Gallery Item */}
        {featuredItem && (
          <article
            className={styles.finalGalleryFeaturedCard}
            data-cs-card
          >
            <div className={styles.mediaCardTopBar}>
              <span className={styles.mediaCardTag}>
                <CaseStudyIcon
                  kind={resolveMediaIcon(
                    featuredItem.id,
                    featuredItem.caption || featuredItem.alt || ""
                  )}
                  size={15}
                />
                <span>{featuredItem.caption || "FEATURED PROJECT VIEW"}</span>
              </span>
              <div className={styles.galleryCardMetaRight}>
                {isApprovedAsset(featuredItem) && (
                  <span className={styles.galleryInteractiveHint}>
                    FULLSCREEN GALLERY ({lightboxItems.length} VIEWS)
                  </span>
                )}
                <span className={styles.mediaCardIndex}>01</span>
              </div>
            </div>
            <CaseStudyMediaFrame
              asset={featuredItem}
              sizes="(max-width: 1023px) 100vw, (max-width: 1799px) 1140px, (max-width: 2299px) 1300px, 1520px"
              hoverZoom={isApprovedAsset(featuredItem)}
              onExpandImage={
                isApprovedAsset(featuredItem) ? handleOpenAsset : undefined
              }
            />
          </article>
        )}

        {/* Responsive Supporting Image Grid */}
        {supportingItems.length > 0 && (
          <div
            className={
              supportingItems.length === 2
                ? styles.finalGallerySupportingTwoCol
                : styles.finalGalleryGrid
            }
          >
            {supportingItems.map((item, idx) => {
              const displayIdx = featuredItem ? idx + 2 : idx + 1;
              const iconKind = resolveMediaIcon(
                item.id,
                item.caption || item.alt || ""
              );
              const approved = isApprovedAsset(item);
              return (
                <article
                  key={item.id}
                  className={styles.finalGalleryCard}
                  data-cs-card
                >
                  <div className={styles.mediaCardTopBar}>
                    <span className={styles.mediaCardTag}>
                      <CaseStudyIcon kind={iconKind} size={14} />
                      <span>
                        {item.caption || `VIEW ${String(displayIdx).padStart(2, "0")}`}
                      </span>
                    </span>
                    <span className={styles.mediaCardIndex}>
                      {String(displayIdx).padStart(2, "0")}
                    </span>
                  </div>
                  <CaseStudyMediaFrame
                    asset={item}
                    sizes="(max-width: 767px) 100vw, (max-width: 1799px) 540px, 740px"
                    hoverZoom={approved}
                    onExpandImage={approved ? handleOpenAsset : undefined}
                  />
                </article>
              );
            })}
          </div>
        )}
      </div>

      {lightboxIndex !== null && lightboxItems.length > 0 && (
        <CaseStudyGalleryLightbox
          items={lightboxItems}
          activeIndex={lightboxIndex}
          projectTitle={projectTitle}
          onSelectIndex={setLightboxIndex}
          onClose={handleCloseLightbox}
        />
      )}
    </section>
  );
}
