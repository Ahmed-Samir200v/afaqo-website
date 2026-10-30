"use client";

import { useEffect, useRef, useState } from "react";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getMotionPreference } from "@/lib/motion-preference";
import { sumedMedia, gallery } from "./sumedData";
import { SumedIcon, type SumedIconName } from "./SumedIcon";
import styles from "./Translation.module.css";

const stages = [
  ["process", "Process References", "Engineering logic, equipment relationships, and piping systems."],
  ["spatial", "Spatial Interpretation", "Translating technical information into equipment positions, structures, and routing."],
  ["layers", "Digital Reconstruction", "Combining individual assets and systems into one coherent 3D facility."],
] as const;

export function Translation({ openImage }: { openImage: (src: string, alt: string) => void }) {
  const [position, setPosition] = useState(50);
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (new URLSearchParams(window.location.search).get("reduce-motion") === "true" || getMotionPreference().shouldReduceMotion) return;
      const context = gsap.context(() => {
        gsap.from("[data-translation-intro]", { opacity: 0, y: 16, duration: .65, stagger: .1, scrollTrigger: { trigger: section.current, start: "top 85%", once: true } });
        gsap.from("[data-translation-frame]", { opacity: 0, y: 18, duration: .7, scrollTrigger: { trigger: frame.current, start: "top 90%", once: true } });
        gsap.from("[data-translation-stage]", { opacity: 0, y: 12, duration: .5, stagger: .1, scrollTrigger: { trigger: "[data-translation-process]", start: "top 95%", once: true } });
      }, section);
    return () => context.revert();
  }, []);

  const move = (clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (rect) setPosition(Math.max(0, Math.min(100, (clientX - rect.left) / rect.width * 100)));
  };

  return <section ref={section} className={styles.section} aria-labelledby="translation-title">
    <span id="chapter-02" className={styles.anchor} />
    <div className={styles.backdrop} aria-hidden="true"><ResponsiveImage src={gallery[0].src} alt="" fill sizes="60vw" /></div>
    <div className={styles.shell}>
      <div className={styles.intro}>
        <div>
          <div className={styles.eyebrow} data-translation-intro>02 // TRANSLATION <i /></div>
          <h2 id="translation-title" data-translation-intro>From Engineering Logic<br />to <span>Spatial Reality.</span></h2>
          <p data-translation-intro>The digital facility begins with engineering information. Process references establish relationships between equipment, pipelines, valves, and supporting systems. These references are interpreted spatially to define equipment positions, structural relationships, routing logic, and the overall organization of the LPG handling environment.</p>
        </div>
        <div className={styles.summary} data-translation-intro>
          <div><SumedIcon name="document" size={40} /><div><b>2D</b><strong>Process References</strong><span>P&amp;ID and engineering logic</span></div></div>
          <span className={styles.arrow} aria-hidden="true">→</span>
          <div><SumedIcon name="cube" size={40} /><div><b>3D</b><strong>Spatial Reality</strong><span>Structured digital facility</span></div></div>
        </div>
      </div>
      <div className={styles.views} aria-label="Comparison views">
        {([["document", "Engineering Reference", "P&ID and Process Logic", 100], ["cube", "3D Spatial Model", "Assets, Structures and Routing", 0], ["layers", "Comparative View", "From Drawing to Reality", 50]] as const).map(([icon, title, caption, value], index) =>
          <button key={title} onClick={() => setPosition(value)} aria-pressed={position === value}><SumedIcon name={icon} /><span className={styles.index}>0{index + 1}</span><span><b>{title}</b><small>{caption}</small></span><span aria-hidden="true">›</span></button>
        )}
      </div>
      <div ref={frame} className={styles.frame} data-translation-frame>
        <button className={styles.layer} onClick={() => openImage(sumedMedia.spatial, "3D Spatial Model")} aria-label="Expand 3D spatial model">
          <ResponsiveImage src={sumedMedia.spatial} alt="Reconstructed 3D equipment assembly" fill sizes="(max-width: 900px) 100vw, 1480px" draggable={false} />
          <span className={styles.modelLabel}><SumedIcon name="cube" /><span><b>3D Spatial Model</b><small>Assets, Structures &amp; Routing</small></span></span>
        </button>
        <button className={styles.reference} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} onClick={() => openImage(sumedMedia.pid, "2D Engineering Reference")} aria-label="Expand 2D engineering reference">
          <ResponsiveImage src={sumedMedia.pid} alt="P&ID engineering drawing supplied with the project" fill sizes="(max-width: 900px) 100vw, 1480px" draggable={false} />
          <span className={styles.referenceLabel}><SumedIcon name="document" /><span><b>2D Engineering Reference</b><small>P&amp;ID &amp; Process Logic</small></span></span>
        </button>
        <div className={styles.divider} style={{ left: `${position}%` }} />
        <button className={styles.handle} style={{ left: `clamp(25px, ${position}%, calc(100% - 25px))` }} role="slider" aria-label="Engineering reference reveal" aria-orientation="horizontal" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(position)} aria-valuetext={`${Math.round(position)}% engineering reference`}
          onPointerDown={(event) => { event.preventDefault(); dragging.current = true; event.currentTarget.focus(); event.currentTarget.setPointerCapture(event.pointerId); }}
          onPointerMove={(event) => { if (dragging.current) move(event.clientX); }}
          onPointerUp={(event) => { dragging.current = false; event.currentTarget.releasePointerCapture(event.pointerId); }}
          onPointerCancel={() => { dragging.current = false; }}
          onLostPointerCapture={() => { dragging.current = false; }}
          onKeyDown={(event) => { const changes: Record<string, number> = { ArrowLeft: -2, ArrowRight: 2, PageDown: -10, PageUp: 10 }; if (event.key in changes) { event.preventDefault(); setPosition(value => Math.max(0, Math.min(100, value + changes[event.key]))); } else if (event.key === "Home" || event.key === "End") { event.preventDefault(); setPosition(event.key === "Home" ? 0 : 100); } }}>
          <span aria-hidden="true">‹ ›</span>
        </button>
      </div>
      <div className={styles.process} data-translation-process>{stages.map(([icon, title, copy], index) =>
        <article key={title} data-translation-stage><span className={styles.icon}><SumedIcon name={icon as SumedIconName} size={34} /></span><div><h3>{title}</h3><p>{copy}</p></div><span className={styles.number}>0{index + 1}</span></article>
      )}</div>
    </div>
  </section>;
}
