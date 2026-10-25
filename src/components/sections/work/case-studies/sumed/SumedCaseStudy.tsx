"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getMotionPreference } from "@/lib/motion-preference";
import { deliverables, gallery, metadata, platforms, sumedMedia } from "./sumedData";
import { ProjectIcon, SumedIcon, type SumedIconName } from "./SumedIcon";
import { VideoLightbox, type CaseStudyVideo } from "./VideoLightbox";
import styles from "./SumedCaseStudy.module.css";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function Eyebrow({ index, children, dark = false }: { index: string; children: React.ReactNode; dark?: boolean }) {
  return <div className={`${styles.eyebrow} ${dark ? styles.eyebrowDark : ""}`}><span>{index}{" // "}{children}</span><i aria-hidden="true" /></div>;
}

function SectionTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return <h2 className={styles.sectionTitle}>{children} <span>{accent}</span></h2>;
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", close); };
  }, [onClose]);
  return <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Expanded project image" onMouseDown={onClose}>
    <button className={styles.lightboxClose} onClick={onClose} aria-label="Close image viewer">×</button>
    <div className={styles.lightboxMedia} onMouseDown={(event) => event.stopPropagation()}>
      <Image src={src} alt={alt} fill sizes="95vw" className={styles.containImage} />
    </div>
  </div>;
}

function Hero({ openVideo }: { openVideo: (video: CaseStudyVideo) => void }) {
  return <section className={styles.hero} aria-labelledby="sumed-title">
    <div className={styles.heroImage} data-hero-media>
      <Image src={sumedMedia.hero} alt="Aerial visualization of the SUMED LPG handling facility near the coast at Ain Sukhna" fill priority sizes="(max-width: 767px) 100vw, 62vw" />
      <div className={`${styles.annotation} ${styles.annotationBerth}`}><b>PRODUCT BERTH-1</b><span>LPG LOADING ARMS</span></div>
      <div className={`${styles.annotation} ${styles.annotationTanks}`}><b>2 × 500 m³</b><span>BUFFER BULLET TANKS</span></div>
      <div className={`${styles.annotation} ${styles.annotationStation}`}><b>LPG PUMPING STATION</b><span>TO NATIONAL GRID</span></div>
    </div>
    <div className={styles.heroWash} aria-hidden="true" />
    <div className={`${styles.shell} ${styles.heroShell}`}>
      <div className={styles.heroCopy} data-hero-copy>
        <div className={styles.heroEyebrow}><span>03 / CASE STUDY</span><i /><b>LPG HANDLING STATION</b></div>
        <h1 id="sumed-title"><span>SUMED LPG</span><span>HANDLING STATION</span><strong>DIGITAL FACILITY</strong><strong>RECONSTRUCTION</strong></h1>
        <p className={styles.heroLead}>Digital Facility Reconstruction &amp; Interactive Exploration.</p>
        <p className={styles.heroStatement}>From marine LPG handling infrastructure to an explorable spatial digital environment.</p>
        <p className={styles.heroBody}>AFAQO translated engineering references, industrial equipment, piping systems, and spatial relationships into a structured 3D environment designed to make complex infrastructure easier to explore, understand, and communicate.</p>
        <div className={styles.tags}><span>LPG HANDLING STATION</span><i>•</i><span>INDUSTRIAL DIGITAL FACILITY</span><i>•</i><span>AIN SUKHNA, EGYPT</span></div>
        <div className={styles.heroActions}>
          <a href="#overview" className={styles.primaryButton}>Explore the Project <SumedIcon name="arrow" size={18} /></a>
          <button type="button" className={styles.secondaryButton} onClick={() => openVideo({ src: sumedMedia.overviewVideo, poster: sumedMedia.overviewPoster, title: "SUMED LPG Handling Station — Project Overview" })}><span className={styles.play}>▶</span> Watch Overview</button>
        </div>
        <dl className={styles.heroMeta}>
          <div><SumedIcon name="building" /><dt>CLIENT</dt><dd>SUMED</dd></div>
          <div><SumedIcon name="pin" /><dt>LOCATION</dt><dd>Ain Sukhna, Egypt</dd></div>
          <div><SumedIcon name="industry" /><dt>INDUSTRY</dt><dd>Oil &amp; Gas</dd></div>
          <div><SumedIcon name="cube" /><dt>PROJECT TYPE</dt><dd>Digital Facility</dd></div>
        </dl>
      </div>
    </div>
    <nav className={styles.chapterRail} aria-label="Case study chapters">{["01","02","03","04","05","06","07"].map((n) => <a key={n} href={`#chapter-${n}`}>{n}</a>)}</nav>
  </section>;
}

function Overview({ openImage }: { openImage: (src: string, alt: string) => void }) {
  return <section id="overview" className={`${styles.lightSection} ${styles.overview}`} data-reveal-section>
    <span id="chapter-01" className={styles.anchor} />
    <div className={styles.shell}>
      <Eyebrow index="01">PROJECT OVERVIEW</Eyebrow>
      <div className={styles.overviewHeading}>
        <div><SectionTitle accent="space.">Systems become</SectionTitle><p>The LPG Handling Station is part of SUMED&apos;s Ain Sukhna Product Hub, connecting marine LPG handling infrastructure with onshore storage and pumping facilities.</p><p>AFAQO&apos;s work focused on translating this interconnected industrial system into a structured digital environment where equipment, piping, spatial relationships, and facility context can be understood as one coherent environment.</p></div>
      </div>
      <div className={styles.overviewGrid}>
        <div className={styles.scopeColumn}>
          <article className={styles.scopeCard} data-reveal-item><ProjectIcon name="layers" size="feature" /><div><h3>Project Scope</h3><p>3D Facility Reconstruction <i>·</i> Industrial Equipment Modeling <i>·</i> Spatial Visualization <i>·</i> Interactive Exploration <i>·</i> Process Visualization</p></div></article>
          <figure className={styles.scopeFigure} data-image-reveal>
            <button onClick={() => openImage(sumedMedia.scope, "SUMED LPG Handling Station project scope aerial view")} aria-label="View project scope image full screen"><SumedIcon name="expand" /></button>
            <div className={styles.scopeImage}><Image src={sumedMedia.scope} alt="Aerial view showing the process area and piping infrastructure" fill sizes="(max-width: 900px) 100vw, 62vw" /></div>
            <figcaption><ProjectIcon name="document" size="small" /><div><b>SUMED LPG Handling Station — Project Scope</b><span>Aerial view showing process area and piping infrastructure.</span></div><button onClick={() => openImage(sumedMedia.scope, "SUMED LPG Handling Station project scope aerial view")}>VIEW FULL IMAGE <SumedIcon name="expand" size={16} /></button></figcaption>
          </figure>
        </div>
        <div className={styles.metaColumn}>
          <article className={styles.evidenceCard} data-reveal-item><ProjectIcon name="document" size="feature" /><div><h3>Evidence Scope <span>VERIFIED</span></h3><p>This case study documents the supplied visual material and the facility context provided for the SUMED LPG Handling Station.</p></div></article>
          {metadata.map(([icon,label,value]) => <article key={label} className={styles.metaCard} data-reveal-item><ProjectIcon name={icon as SumedIconName} /><div><span>{label}</span><b>{value}</b></div></article>)}
        </div>
      </div>
    </div>
  </section>;
}

function Translation({ openImage }: { openImage: (src: string, alt: string) => void }) {
  const [mode, setMode] = useState<0 | 1 | 2>(2);
  return <section className={styles.translation} data-reveal-section>
    <span id="chapter-02" className={styles.anchor} />
    <div className={styles.shell}>
      <div className={styles.translationIntro}><Eyebrow index="02" dark>TRANSLATION</Eyebrow><h2>From Engineering Logic to<br/><span>Spatial Reality.</span></h2><p>The digital facility begins with engineering information. Process references establish relationships between equipment, pipelines, valves, and supporting systems. These references are interpreted spatially to define equipment positions, structural relationships, routing logic, and the overall organization of the LPG handling environment.</p></div>
      <div className={styles.translationTabs} role="tablist" aria-label="Engineering translation views">
        {[["document","01 // Engineering Reference"],["cube","02 // 3D Spatial Model"],["layers","03 // Comparative View"]].map(([icon,label], index) => <button key={label} role="tab" aria-selected={mode === index} onClick={() => setMode(index as 0|1|2)}><SumedIcon name={icon as SumedIconName}/>{label}</button>)}
      </div>
      <div className={`${styles.comparison} ${mode === 0 ? styles.showReference : mode === 1 ? styles.showSpatial : ""}`}>
        <button className={styles.comparePanel} onClick={() => openImage(sumedMedia.pid, "Engineering P&ID reference") } aria-label="Expand engineering reference"><div><Image src={sumedMedia.pid} alt="Engineering P and ID reference showing functional flow and valve schematics" fill sizes="50vw" /></div><span><ProjectIcon name="document"/><b>2D Logic Input<small>P&amp;ID functional flow and valve schematics</small></b></span></button>
        <i className={styles.transformArrow} aria-hidden="true">››</i>
        <button className={styles.comparePanel} onClick={() => openImage(sumedMedia.spatial, "3D spatial equipment assembly") } aria-label="Expand 3D spatial model"><div><Image src={sumedMedia.spatial} alt="Real-time dimensional equipment assembly reconstructed in 3D" fill sizes="50vw" /></div><span><ProjectIcon name="cube"/><b>3D Spatial Output<small>Real-time dimensional equipment assembly</small></b></span></button>
      </div>
      <div className={styles.translationCards}>
        {[["process","Process References","Engineering logic, equipment relationships, and piping systems."],["spatial","Spatial Interpretation","Translating technical information into equipment positions, structures, and routing."],["layers","Digital Reconstruction","Combining individual assets and systems into one coherent 3D facility."]].map(([icon,title,copy],i) => <article key={title} data-reveal-item><ProjectIcon name={icon as SumedIconName} size="feature"/><div><h3>{title}</h3><p>{copy}</p></div><span>0{i+1}</span></article>)}
      </div>
    </div>
  </section>;
}

function Reconstruction({ openImage }: { openImage: (src: string, alt: string) => void }) {
  return <section className={`${styles.lightSection} ${styles.reconstruction}`} data-reveal-section>
    <span id="chapter-03" className={styles.anchor} />
    <div className={styles.shell}>
      <Eyebrow index="03">3D ASSET RECONSTRUCTION</Eyebrow>
      <div className={styles.reconstructionHead}><SectionTitle accent="interactive systems.">Engineering assets become</SectionTitle><p>Pumps, valves, tanks and supporting equipment were organized as structured assets so their construction and relationship to the complete facility can be inspected and understood.</p></div>
      <div className={styles.reconstructionGrid}>
        <button className={styles.explodedVisual} onClick={() => openImage(sumedMedia.exploded, "Exploded mechanical pump-skid assembly")} aria-label="Expand exploded mechanical assembly"><Image src={sumedMedia.exploded} alt="Exploded view of a pump-skid mechanical assembly" fill sizes="(max-width: 900px) 100vw, 68vw" /><span><SumedIcon name="expand"/> EXPLODED ASSEMBLY</span></button>
        <div className={styles.reconstructionSteps}>
          {[["cube","01","Equipment Modeling","Industrial equipment is reconstructed as organized 3D assets."],["layers","02","Mechanical Assembly","Components retain their hierarchy within the complete asset."],["settings","03","Interactive Inspection","Individual parts can be explored without losing system context."]].map(([icon,n,title,copy]) => <article key={n} data-reveal-item><ProjectIcon name={icon as SumedIconName}/><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </div>
    </div>
  </section>;
}

function Explorer({ openImage }: { openImage: (src: string, alt: string) => void }) {
  const [active, setActive] = useState(0);
  const current = gallery[active];
  const change = useCallback((delta: number) => setActive((value) => (value + delta + gallery.length) % gallery.length), []);
  return <section className={`${styles.lightSection} ${styles.explorer}`} data-reveal-section>
    <span id="chapter-04" className={styles.anchor}/><div className={styles.shell}>
      <div className={styles.explorerHead}><div><Eyebrow index="04">FACILITY SCALE</Eyebrow><SectionTitle accent="Explorer.">Digital Facility</SectionTitle></div><p>The reconstructed environment brings the individual systems of the LPG Handling Station together into one explorable digital space.</p></div>
      <div className={styles.galleryViewer} tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft") change(-1); if (event.key === "ArrowRight") change(1); }} aria-label="Project image gallery">
        <button className={styles.galleryImage} onClick={() => openImage(current.src, current.title)} aria-label={`Expand ${current.title}`}><Image key={current.src} src={current.src} alt={current.caption} fill sizes="(max-width: 1500px) 100vw, 1500px" /></button>
        <div className={styles.galleryCaption}><ProjectIcon name={current.icon as SumedIconName}/><div><b>{current.title}</b><span>{current.caption}</span></div><div className={styles.galleryControls}><span>{String(active + 1).padStart(2,"0")} / 05</span><i><b style={{width:`${(active+1)*20}%`}} /></i><button onClick={() => change(-1)} aria-label="Previous gallery image">←</button><button onClick={() => change(1)} aria-label="Next gallery image">→</button></div></div>
      </div>
      <div className={styles.thumbnails}>{gallery.map((item,index) => <button key={item.label} className={index === active ? styles.activeThumb : ""} onClick={() => setActive(index)} aria-pressed={index===active}><Image src={item.src} alt="" fill sizes="280px"/><span><SumedIcon name={item.icon as SumedIconName} size={18}/>{String(index+1).padStart(2,"0")} {item.label}</span></button>)}</div>
    </div>
  </section>;
}

function Training({ openVideo }: { openVideo: (video: CaseStudyVideo) => void }) {
  const capabilities = [
    ["data","Live Operational Data","Connection with Hisense for operational data and system status."],
    ["tank","Tank Internal View","Trainees can inspect represented tank processes and understand system behavior."],
    ["settings","Mechanical Assembly","Valves and mechanical components can be inspected as structured assemblies."],
    ["training","Interactive Training","Navigate the facility, inspect equipment and understand process relationships."],
  ] as const;
  return <section id="training" className={`${styles.lightSection} ${styles.training}`} data-reveal-section>
    <span id="chapter-05" className={styles.anchor}/><div className={styles.shell}>
      <Eyebrow index="05">INTERACTIVE TRAINING</Eyebrow><div className={styles.trainingHead}><SectionTitle accent="Operational Understanding.">From Digital Facility to</SectionTitle><p>The project extends beyond static visualization into an interactive real-time environment for facility exploration, equipment inspection and immersive learning.</p></div>
      <div className={styles.trainingVisual} data-image-reveal>
        <button onClick={() => openVideo({ src: sumedMedia.trainingVideo, poster: sumedMedia.trainingPoster, title: "Interactive Training Experience" })} aria-label="Play interactive training video"><Image src={sumedMedia.trainingPoster} alt="Interactive equipment inspection inside the digital facility" fill sizes="(max-width: 1200px) 100vw, 66vw"/><span className={styles.trainingPlay}><i>▶</i><b>PLAY INTERACTIVE TRAINING</b></span></button>
        <div className={`${styles.trainingCallout} ${styles.calloutData}`}><ProjectIcon name="data" size="small"/><b>HISENSE INTEGRATION</b><span>Operational data &amp; status</span></div>
        <div className={`${styles.trainingCallout} ${styles.calloutAssembly}`}><ProjectIcon name="settings" size="small"/><b>ASSET INSPECTION</b><span>Structured components</span></div>
      </div>
      <div className={styles.capabilityGrid}>{capabilities.map(([icon,title,copy]) => <article key={title} data-reveal-item><ProjectIcon name={icon}/><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
    </div>
  </section>;
}

function Delivery() {
  return <section className={`${styles.lightSection} ${styles.delivery}`} data-reveal-section>
    <span id="chapter-06" className={styles.anchor}/><div className={styles.shell}>
      <Eyebrow index="06">TECHNOLOGY &amp; DELIVERY</Eyebrow><div className={styles.deliveryHead}><SectionTitle accent="Delivery Summary.">Technology &amp;</SectionTitle><p>A complete interactive digital facility delivered for training, visualization, and real-time operation, connecting detailed 3D models with live data from Hisense.</p></div>
      <div className={styles.deliveryPanel}><div className={styles.panelTitle}><ProjectIcon name="cube"/><h3>What We Delivered</h3><span>A COMPLETE INTERACTIVE DIGITAL FACILITY</span></div><div className={styles.deliverableGrid}>{deliverables.map(([icon,title,copy]) => <article key={title}><ProjectIcon name={icon as SumedIconName}/><div><h4>{title}</h4><p>{copy}</p></div></article>)}</div></div>
      <div className={styles.platformPanel}>
        <div className={styles.platforms}><div className={styles.subPanelTitle}><ProjectIcon name="package" size="small"/><div><h3>Delivered Platforms</h3><p>Full interactive application across multiple platforms.</p></div></div><div className={styles.platformGrid}>{platforms.map(([icon,title,copy,image]) => <article key={title}><div className={styles.deviceVisual}>{image ? <Image src={image} alt={`${title} headset`} fill sizes="180px"/> : <SumedIcon name={icon as SumedIconName} size={42}/>}</div><b>{title}</b><span>{copy}</span></article>)}</div></div>
        <div className={styles.interactiveCapabilities}><div className={styles.subPanelTitle}><ProjectIcon name="training" size="small"/><div><h3>Interactive Capabilities</h3><p>Core training, inspection and exploration functions.</p></div></div><div>{[["data","Live Operational Data"],["tank","Explore Tank Internal Processes"],["settings","Inspect Valve Components"],["route","Navigate Full Facility"],["training","Training & Scenario Simulation"]].map(([icon,label]) => <article key={label}><SumedIcon name={icon as SumedIconName}/><span>{label}</span></article>)}</div></div>
      </div>
    </div>
  </section>;
}

function Outcome() {
  return <section className={`${styles.lightSection} ${styles.outcome}`} data-reveal-section><span id="chapter-07" className={styles.anchor}/><div className={styles.shell}><Eyebrow index="07">PROJECT VALUE</Eyebrow><SectionTitle accent="understandable.">Complex infrastructure becomes</SectionTitle><div className={styles.outcomeGrid}>{[["spatial","Understand","See equipment and process relationships spatially."],["route","Explore","Navigate the facility without being physically present."],["settings","Inspect","Study equipment assemblies and internal components."],["training","Train","Use the digital environment as an immersive operational learning tool."],["data","Connect","Bring operational information into the facility through Hisense integration."]].map(([icon,title,copy]) => <article key={title}><ProjectIcon name={icon as SumedIconName}/><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>;
}

function NextProject() {
  return <section className={styles.nextProject}><Image src="/images/projects/remal-park/remal-park.jpg" alt="Remal Park immersive cultural visitor environment" fill sizes="100vw"/><div className={styles.nextOverlay}/><div className={styles.shell}><Eyebrow index="NEXT" dark>CASE STUDY / SAUDI ARABIA</Eyebrow><h2>REMAL PARK</h2><p>High-fidelity 3D environments and visual content for an immersive cultural visitor experience.</p><Link href="/work/remal-park" className={styles.primaryButton}>View Case Study <SumedIcon name="arrow" size={18}/></Link></div></section>;
}

export function SumedCaseStudy() {
  const [lightbox, setLightbox] = useState<{src:string;alt:string}|null>(null);
  const [activeVideo, setActiveVideo] = useState<CaseStudyVideo | null>(null);
  const openImage = useCallback((src:string, alt:string) => setLightbox({src,alt}), []);
  const closeImage = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    const preference = getMotionPreference();
    if (preference.shouldReduceMotion) return;
    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline.from("[data-hero-copy] > *", { opacity: 0, y: 24, duration: .72, stagger: .08 }).from("[data-hero-media]", { opacity: 0, scale: 1.025, duration: 1 }, "<.1").from(`.${styles.annotation}`, { opacity: 0, y: 8, duration: .45, stagger: .1 }, "<.45");
      document.querySelectorAll<HTMLElement>("[data-reveal-section]").forEach((section) => {
        const items = section.querySelectorAll("[data-reveal-item]");
        if (items.length) gsap.from(items, { scrollTrigger: { trigger: section, start: "top 78%", once: true }, opacity: 0, y: 18, duration: .65, stagger: .07, ease: "power2.out" });
        const image = section.querySelector("[data-image-reveal]");
        if (image) gsap.from(image, { scrollTrigger: { trigger: image, start: "top 82%", once: true }, opacity: 0, y: 22, scale: 1.015, duration: .8, ease: "power3.out" });
      });
    });
    return () => context.revert();
  }, []);

  return <div className={styles.page}>
    <Header activeHref="/work" />
    <main><Hero openVideo={setActiveVideo}/><Overview openImage={openImage}/><Translation openImage={openImage}/><Reconstruction openImage={openImage}/><Explorer openImage={openImage}/><Training openVideo={setActiveVideo}/><Delivery/><Outcome/><NextProject/></main>
    <Footer />
    {lightbox && <Lightbox {...lightbox} onClose={closeImage}/>} 
    {activeVideo && <VideoLightbox video={activeVideo} onClose={() => setActiveVideo(null)} />}
  </div>;
}
