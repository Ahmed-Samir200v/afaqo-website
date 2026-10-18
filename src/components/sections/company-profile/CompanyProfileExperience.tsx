"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChapterNav } from "./chapters/ChapterNav";
import { CP01HorizonHero } from "./chapters/CP01HorizonHero";
import { CP02IdentityPurpose } from "./chapters/CP02IdentityPurpose";
import { CP03CapabilitySystem } from "./chapters/CP03CapabilitySystem";
import { CP04BrandRoles } from "./chapters/CP04BrandRoles";
import { CP05EngineeringReality } from "./chapters/CP05EngineeringReality";
import { CP06FirefightingRobot } from "./chapters/CP06FirefightingRobot";
import { CP07SystemsDevelopmentDelivery } from "./chapters/CP07SystemsDevelopmentDelivery";
import { CP08ClosingHorizon } from "./chapters/CP08ClosingHorizon";
import styles from "./CompanyProfileExperience.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CompanyProfileExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState("cp01");
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Chapter Click Handler for smooth scrolling
  const handleChapterClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // IntersectionObserver to accurately track active chapter and nav visibility
    const chapters = root.querySelectorAll<HTMLElement>("[data-chapter-id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const chId = entry.target.getAttribute("data-chapter-id");
            if (chId) {
              setActiveChapter(chId);
              // Hide nav bar while in hero (cp01), show in cp02 through cp08
              setIsNavVisible(chId !== "cp01");
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -40% 0px",
        threshold: [0, 0.2, 0.5],
      }
    );

    chapters.forEach((ch) => observer.observe(ch));

    // GSAP Motion Context
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        return; // Retain standard static layout
      }

      const mm = gsap.matchMedia();

      // Desktop Animations (≥1024px)
      mm.add("(min-width: 1024px)", () => {
        // Subtle Parallax on Editorial Frames
        const frames = root.querySelectorAll(`.${styles.editorialFrame}`);
        frames.forEach((frame) => {
          gsap.fromTo(
            frame,
            { y: 15 },
            {
              y: -15,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );
        });

        // Stagger Reveals for Chapter 02
        const cp02 = document.getElementById("cp02");
        if (cp02) {
          gsap.from(cp02.querySelectorAll(`.${styles.disciplineCard}`), {
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cp02,
              start: "top 75%",
            },
          });
        }

        // Stagger Reveals for Chapter 03 Capabilities
        const cp03 = document.getElementById("cp03");
        if (cp03) {
          gsap.from(cp03.querySelectorAll(`.${styles.capCard}`), {
            y: 25,
            opacity: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cp03.querySelector(`.${styles.capabilitiesGrid}`),
              start: "top 80%",
            },
          });
        }

        // Stagger Reveals for Chapter 04 Roles
        const cp04 = document.getElementById("cp04");
        if (cp04) {
          gsap.from(cp04.querySelectorAll(`.${styles.roleCard}`), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cp04,
              start: "top 75%",
            },
          });
        }

        // Stagger Reveals for Chapter 05 Stages
        const cp05 = document.getElementById("cp05");
        if (cp05) {
          gsap.from(cp05.querySelectorAll(`.${styles.stageCard}`), {
            y: 25,
            opacity: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cp05.querySelector(`.${styles.stagesGrid}`),
              start: "top 80%",
            },
          });
        }

        // Stagger Reveals for Chapter 06 Multidisciplinary Team
        const cp06 = document.getElementById("cp06");
        if (cp06) {
          gsap.from(cp06.querySelectorAll(`.${styles.teamRoleCard}`), {
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cp06.querySelector(`.${styles.teamRolesGrid}`),
              start: "top 85%",
            },
          });
        }
      });
    }, rootRef);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.pageWrapper}>
      {/* Floating / Sticky Chapter Navigator */}
      <ChapterNav
        activeChapter={activeChapter}
        onChapterClick={handleChapterClick}
        isVisible={isNavVisible}
      />

      {/* CP01 Horizon / Arrival (Pages 1-2) */}
      <CP01HorizonHero />

      {/* CP02 Identity & Purpose (Pages 3-5) */}
      <CP02IdentityPurpose />

      {/* CP03 Capability System (Pages 6-8) */}
      <CP03CapabilitySystem />

      {/* CP04 Brand Roles & Transition (Pages 9-10) */}
      <CP04BrandRoles />

      {/* CP05 Case Study: Industrial Digital Reality (Pages 11-14) */}
      <CP05EngineeringReality />

      {/* CP06 Case Study: Robot Simulation Training (Pages 15-20) */}
      <CP06FirefightingRobot />

      {/* CP07 Systems in Development & Delivery (Pages 21-28) */}
      <CP07SystemsDevelopmentDelivery />

      {/* CP08 Closing Horizon & PDF Download (Page 29) */}
      <CP08ClosingHorizon />
    </div>
  );
}
