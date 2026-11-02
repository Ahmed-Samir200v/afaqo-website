"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getMotionPreference } from "@/lib/motion-preference";
import type { CaseStudyIconKind } from "./case-studies/CaseStudyIcons";
import styles from "./CaseStudy.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CaseStudyNavSection {
  id: string;
  label: string;
  icon?: CaseStudyIconKind;
}

function shouldSkipMotion(): boolean {
  if (typeof window === "undefined") return true;
  const pref = getMotionPreference();
  if (pref.shouldReduceMotion) return true;
  const params = new URLSearchParams(window.location.search);
  if (params.get("reduce-motion") === "true" || params.get("reduced-motion") === "true") {
    return true;
  }
  if (document.documentElement.dataset.reducedMotion === "true") {
    return true;
  }
  const forceMotion =
    params.get("force-motion") === "true" ||
    document.documentElement.dataset.forceMotion === "true";
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !forceMotion
  ) {
    return true;
  }
  return false;
}

export function CaseStudySectionNav({ sections }: { sections: CaseStudyNavSection[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const navListRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    if (typeof window === "undefined" || sections.length === 0) return;

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-16% 0px -64% 0px",
        threshold: [0, 0.12, 0.35],
      }
    );

    elements.forEach((el) => observer.observe(el));

    let rafId = 0;
    const updateScrollState = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        // Fallback active section detection based on scroll offset
        const triggerOffset = window.innerHeight * 0.28;
        let currentSectionId = elements[0]?.id ?? "";
        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerOffset) {
            currentSectionId = el.id;
          } else {
            break;
          }
        }
        if (currentSectionId) {
          setActiveId(currentSectionId);
        }
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState, { passive: true });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [sections]);

  // Keep active pill centered inside compact horizontal nav on tablet/mobile
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 1024) return;
    const container = navListRef.current;
    const activeEl = linkRefs.current[activeId];
    if (!container || !activeEl) return;

    const targetLeft =
      activeEl.offsetLeft - container.clientWidth / 2 + activeEl.clientWidth / 2;
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: shouldSkipMotion() ? "auto" : "smooth",
    });
  }, [activeId]);

  const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const isRtl = typeof document !== "undefined" && document.documentElement.dir === "rtl";
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown") {
      nextIndex = (index + 1) % sections.length;
    } else if (event.key === "ArrowUp") {
      nextIndex = (index - 1 + sections.length) % sections.length;
    } else if (event.key === "ArrowRight") {
      const step = isRtl ? -1 : 1;
      nextIndex = (index + step + sections.length) % sections.length;
    } else if (event.key === "ArrowLeft") {
      const step = isRtl ? 1 : -1;
      nextIndex = (index + step + sections.length) % sections.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = sections.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const nextSection = sections[nextIndex];
      if (nextSection && linkRefs.current[nextSection.id]) {
        linkRefs.current[nextSection.id]?.focus();
      }
    }
  };

  if (sections.length === 0) return null;

  return (
    <aside className={styles.sectionSidebarCol} aria-label="Case study sections">
      <nav className={styles.sectionNav} aria-label="Case study section navigation">
        <div className={styles.sectionNavInner}>
          <div ref={navListRef} className={styles.sectionNavLinks} role="list">
            {sections.map((section, idx) => {
              const isActive = activeId === section.id;
              return (
                <a
                  key={section.id}
                  ref={(el) => {
                    linkRefs.current[section.id] = el;
                  }}
                  href={`#${section.id}`}
                  role="listitem"
                  aria-current={isActive ? "location" : undefined}
                  className={`${styles.sectionNavLink} ${isActive ? styles.sectionNavLinkActive : ""}`}
                  onClick={() => setActiveId(section.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                >
                  <span className={styles.sectionNavIndicator} aria-hidden="true" />
                  <span className={styles.sectionNavText}>{section.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function CaseStudyMotionRoot({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || shouldSkipMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Hero Entrance Sequence (350ms - 750ms, smooth power3.out)
      const heroItems = root.querySelectorAll<HTMLElement>("[data-cs-hero-item]");
      const heroMeta = root.querySelectorAll<HTMLElement>("[data-cs-hero-meta] > *");
      const heroMedia = root.querySelector<HTMLElement>("[data-cs-hero-media]");
      const heroGlow = root.querySelector<HTMLElement>("[data-cs-hero-glow]");

      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (heroGlow) {
        heroTl.fromTo(
          heroGlow,
          { opacity: 0.35, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.75, clearProps: "transform,opacity" },
          0
        );
      }

      if (heroItems.length > 0) {
        heroTl.fromTo(
          heroItems,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.58,
            stagger: 0.065,
            clearProps: "transform,opacity",
          },
          0.04
        );
      }

      if (heroMeta.length > 0) {
        heroTl.fromTo(
          heroMeta,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.42,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          0.22
        );
      }

      if (heroMedia) {
        heroTl.fromTo(
          heroMedia,
          { opacity: 0, y: 20, scale: 1.015 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            clearProps: "transform,opacity",
          },
          0.18
        );
      }

      // 2. Section Scroll Reveals (one cohesive timeline per section)
      const sections = root.querySelectorAll<HTMLElement>("[data-cs-section]");
      sections.forEach((section) => {
        const headers = section.querySelectorAll<HTMLElement>("[data-cs-header]");
        const cards = section.querySelectorAll<HTMLElement>("[data-cs-card]");
        const mediaBlocks = section.querySelectorAll<HTMLElement>("[data-cs-media]");
        const connectors = section.querySelectorAll<HTMLElement>("[data-cs-connector]");
        const scenarios = section.querySelectorAll<HTMLElement>("[data-cs-scenario]");

        if (headers.length > 0) {
          gsap.fromTo(
            headers,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.52,
              stagger: 0.06,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
                once: true,
              },
            }
          );
        }

        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.54,
              stagger: 0.065,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: cards[0],
                start: "top 88%",
                once: true,
              },
            }
          );
        }

        if (connectors.length > 0) {
          gsap.fromTo(
            connectors,
            { scaleX: 0, opacity: 0.3 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.55,
              stagger: 0.07,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                once: true,
              },
            }
          );
        }

        if (mediaBlocks.length > 0) {
          gsap.fromTo(
            mediaBlocks,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.64,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: mediaBlocks[0],
                start: "top 88%",
                once: true,
              },
            }
          );
        }

        if (scenarios.length > 0) {
          gsap.fromTo(
            scenarios,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: scenarios[0],
                start: "top 88%",
                once: true,
              },
            }
          );
        }
      });

      // 3. Alternating Process Chapters
      const processRows = root.querySelectorAll<HTMLElement>("[data-cs-process-row]");
      processRows.forEach((row) => {
        const media = row.querySelector<HTMLElement>("[data-cs-process-media]");
        const copy = row.querySelector<HTMLElement>("[data-cs-process-copy]");

        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 86%",
            once: true,
          },
        });

        if (media) {
          rowTl.fromTo(
            media,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.62,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
            0
          );
        }

        if (copy) {
          rowTl.fromTo(
            copy,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.52,
              ease: "power2.out",
              clearProps: "transform,opacity",
            },
            0.08
          );
        }
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.motionRoot}>
      {children}
    </div>
  );
}
