"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPreference } from "@/lib/motion-preference";
import { simulxrProblemData } from "./simulxrData";
import styles from "./Simulxr.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function S02Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion } = useMotionPreference();

  useEffect(() => {
    if (!sectionRef.current || shouldReduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.problemHeadline}`, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(`.${styles.problemIntroCol} p`, {
        opacity: 0,
        y: 16,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.problemIntroCol}`,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(`.${styles.problemCard}`, {
        opacity: 0,
        y: 22,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.problemSpatialGrid}`,
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
      id="problem"
      className={styles.problemSection}
      aria-labelledby="problem-heading"
    >
      <div className={styles.sectionContainer}>
        {/* Top Header Group: High-Impact Editorial Statement */}
        <div className={styles.problemHeaderGrid}>
          <div className={styles.problemHeadlineCol}>
            <span className={styles.sectionIndexTag}>{"02 // THE OPERATIONAL CHALLENGE"}</span>
            <h2 id="problem-heading" className={styles.problemHeadline}>
              SOME SITUATIONS ARE TOO CRITICAL<br />
              <span className={styles.headlineHighlight}>TO PRACTICE FOR THE FIRST TIME IN REALITY.</span>
            </h2>
          </div>

          <div className={styles.problemIntroCol}>
            {simulxrProblemData.introParagraphs.map((para, i) => (
              <p key={i} className={i === 0 ? styles.introParaLead : styles.introParaSecondary}>
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Spatial Corporate Layout — 5 Asymmetrical Industrial Problem Blocks */}
        <div className={styles.problemSpatialGrid} aria-label="Key Industrial Training Bottlenecks">
          {/* Block 1: Lead High-Impact Feature (Spans 7 cols on desktop) */}
          <article className={`${styles.problemCard} ${styles.problemCardLead}`}>
            <div className={styles.problemCardHeader}>
              <span className={styles.problemIndexNumber}>{simulxrProblemData.problems[0].number}</span>
              <span className={styles.problemTagBadge}>{simulxrProblemData.problems[0].tag}</span>
            </div>
            <h3 className={styles.problemTitle}>{simulxrProblemData.problems[0].title}</h3>
            <p className={styles.problemDesc}>{simulxrProblemData.problems[0].description}</p>
            <div className={styles.problemAccentLine} aria-hidden="true" />
          </article>

          {/* Block 2: Operational Downtime (Spans 5 cols on desktop) */}
          <article className={`${styles.problemCard} ${styles.problemCardDowntime}`}>
            <div className={styles.problemCardHeader}>
              <span className={styles.problemIndexNumber}>{simulxrProblemData.problems[1].number}</span>
              <span className={styles.problemTagBadge}>{simulxrProblemData.problems[1].tag}</span>
            </div>
            <h3 className={styles.problemTitle}>{simulxrProblemData.problems[1].title}</h3>
            <p className={styles.problemDesc}>{simulxrProblemData.problems[1].description}</p>
            <div className={styles.problemAccentLine} aria-hidden="true" />
          </article>

          {/* Block 3: Limited Exposure */}
          <article className={`${styles.problemCard} ${styles.problemCardExposure}`}>
            <div className={styles.problemCardHeader}>
              <span className={styles.problemIndexNumber}>{simulxrProblemData.problems[2].number}</span>
              <span className={styles.problemTagBadge}>{simulxrProblemData.problems[2].tag}</span>
            </div>
            <h3 className={styles.problemTitle}>{simulxrProblemData.problems[2].title}</h3>
            <p className={styles.problemDesc}>{simulxrProblemData.problems[2].description}</p>
            <div className={styles.problemAccentLine} aria-hidden="true" />
          </article>

          {/* Block 4: Theory vs. Action */}
          <article className={`${styles.problemCard} ${styles.problemCardAction}`}>
            <div className={styles.problemCardHeader}>
              <span className={styles.problemIndexNumber}>{simulxrProblemData.problems[3].number}</span>
              <span className={styles.problemTagBadge}>{simulxrProblemData.problems[3].tag}</span>
            </div>
            <h3 className={styles.problemTitle}>{simulxrProblemData.problems[3].title}</h3>
            <p className={styles.problemDesc}>{simulxrProblemData.problems[3].description}</p>
            <div className={styles.problemAccentLine} aria-hidden="true" />
          </article>

          {/* Block 5: Generic Training */}
          <article className={`${styles.problemCard} ${styles.problemCardGeneric}`}>
            <div className={styles.problemCardHeader}>
              <span className={styles.problemIndexNumber}>{simulxrProblemData.problems[4].number}</span>
              <span className={styles.problemTagBadge}>{simulxrProblemData.problems[4].tag}</span>
            </div>
            <h3 className={styles.problemTitle}>{simulxrProblemData.problems[4].title}</h3>
            <p className={styles.problemDesc}>{simulxrProblemData.problems[4].description}</p>
            <div className={styles.problemAccentLine} aria-hidden="true" />
          </article>
        </div>
      </div>
    </section>
  );
}
