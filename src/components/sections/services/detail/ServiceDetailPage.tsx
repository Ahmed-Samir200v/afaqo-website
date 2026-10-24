import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCaseStudy } from "@/content/projects/case-studies";
import { serviceDetails, serviceDetailProcess, type ServiceDetail, type CapabilityIcon } from "@/content/services/details";
import {
  IconVRHeadset, IconMobileAR, IconMixedReality, IconCrossPlatform,
  Icon3DExplorers, IconDigitalReplicas, IconComponentInspection, IconWebGLApps,
  Icon3DEnvironments, IconMaterialsLighting, IconOptimization, IconCinematics,
  IconScenarioTraining, IconWalkthroughs, IconGuidedLearning,
} from "../ServiceIcons";
import { ServiceDetailReveal } from "./ServiceDetailReveal";
import styles from "./ServiceDetail.module.css";

const icons = {
  vr: IconVRHeadset, ar: IconMobileAR, mr: IconMixedReality, platform: IconCrossPlatform,
  explore: Icon3DExplorers, replica: IconDigitalReplicas, inspect: IconComponentInspection,
  web: IconWebGLApps, environment: Icon3DEnvironments, material: IconMaterialsLighting,
  optimize: IconOptimization, cinematic: IconCinematics, scenario: IconScenarioTraining,
  walkthrough: IconWalkthroughs, learning: IconGuidedLearning,
} satisfies Record<CapabilityIcon, typeof IconVRHeadset>;

const origin = (process.env.NEXT_PUBLIC_SITE_URL || "https://afaqo.tech").replace(/\/$/, "");

export function serviceDetailMetadata(service: ServiceDetail): Metadata {
  const url = `${origin}/services/${service.slug}/`;
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website", siteName: "AFAQO", locale: "en_US", url,
      title: service.seoTitle, description: service.seoDescription,
      images: [{ url: `${origin}${service.image}`, alt: service.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: service.seoTitle, description: service.seoDescription, images: [`${origin}${service.image}`] },
  };
}

function Arrow() { return <span aria-hidden="true">↗</span>; }

function Section({ id, eyebrow, title, children, dark = false }: {
  id: string; eyebrow: string; title: string; children: ReactNode; dark?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`${styles.section} ${dark ? styles.dark : ""}`}>
      <div className="page-container">
        <div className={styles.sectionHeading} data-detail-reveal>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 id={`${id}-heading`}>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function ServiceDetailHero({ service }: { service: ServiceDetail }) {
  return (
    <section className={styles.hero} aria-labelledby="service-title">
      <div className="page-container">
        <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
          <Link href="/services">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{service.shortTitle}</span>
        </nav>
        <div className={styles.heroGrid}>
          <div data-detail-reveal>
            <p className={styles.eyebrow}>Service {service.number} / {service.category}</p>
            <h1 id="service-title">{service.title}</h1>
            <p className={styles.proposition}>{service.proposition}</p>
            <p className={styles.heroIntro}>{service.introduction}</p>
            <div className={styles.actions}>
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className={styles.primaryLink}>Discuss your project <Arrow /></Link>
              <a href="#capabilities" className={styles.textLink}>Explore capabilities <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <figure className={styles.heroFigure} data-detail-reveal>
            <div className={styles.heroImage}>
              <Image src={service.image} alt={service.imageAlt} fill preload sizes="(max-width: 1024px) calc(100vw - 48px), (max-width: 1440px) 44vw, 560px" />
            </div>
            <figcaption><span className={styles.signal} aria-hidden="true" />{service.imageCaption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function CapabilityGrid({ service }: { service: ServiceDetail }) {
  return (
    <div className={styles.capabilityGrid}>
      {service.capabilities.map((capability, index) => {
        const Icon = icons[capability.icon];
        return (
          <article className={styles.capability} data-detail-reveal key={capability.title}>
            <div className={styles.cardTop}><span className={styles.icon}><Icon size={30} /></span><span className={styles.index}>0{index + 1}</span></div>
            <h3>{capability.title}</h3><p>{capability.text}</p>
            <dl><div><dt>What you get</dt><dd>{capability.deliverable}</dd></div><div><dt>Typical application</dt><dd>{capability.application}</dd></div></dl>
          </article>
        );
      })}
    </div>
  );
}

function ServiceProcess() {
  return (
    <ol className={styles.process}>
      {serviceDetailProcess.map((stage, index) => (
        <li key={stage.title} data-detail-reveal><span className={styles.processNumber} aria-hidden="true">0{index + 1}</span><h3>{stage.title}</h3><p>{stage.text}</p></li>
      ))}
    </ol>
  );
}

function RelatedWork({ service }: { service: ServiceDetail }) {
  return (
    <div className={`${styles.workGrid} ${service.projects.length === 1 ? styles.singleWork : ""}`}>
      {service.projects.map((mapping) => {
        const project = getCaseStudy(mapping.slug);
        if (!project) throw new Error(`Unknown service project: ${mapping.slug}`);
        return (
          <article className={styles.workCard} data-detail-reveal key={project.slug}>
            <Link className={styles.workImageLink} href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}>
              <div className={styles.workImage}><Image src={project.image} alt={project.imageAlt} fill sizes={service.projects.length === 1 ? "(max-width: 767px) calc(100vw - 40px), 640px" : "(max-width: 767px) calc(100vw - 40px), (max-width: 1440px) 44vw, 624px"} /></div>
            </Link>
            <div className={styles.workBody}><p className={styles.eyebrow}>{project.location} / {project.category}</p><h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3><p>{mapping.relevance}</p><Link href={`/work/${project.slug}`} className={styles.textLink}>View case study <Arrow /></Link></div>
          </article>
        );
      })}
    </div>
  );
}

function ServiceFAQ({ service }: { service: ServiceDetail }) {
  return (
    <div className={styles.faq}>
      {service.faq.map((item) => (
        <details key={item.question}><summary>{item.question}<span className={styles.faqIndicator} aria-hidden="true" /></summary><div className={styles.faqAnswer}><p>{item.answer}</p></div></details>
      ))}
    </div>
  );
}

export function ServiceDetailPage({ service }: { service: ServiceDetail }) {
  const url = `${origin}/services/${service.slug}/`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", "@id": `${url}#service`, name: service.title, description: service.seoDescription, url, provider: { "@type": "Organization", name: "AFAQO", url: origin } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Services", item: `${origin}/services/` },
        { "@type": "ListItem", position: 2, name: service.title, item: url },
      ] },
    ],
  };
  return (
    <div className={styles.page}>
      <Header />
      <main id="main-content" tabIndex={-1} className={styles.main}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <ServiceDetailReveal>
          <ServiceDetailHero service={service} />
          <nav className={styles.contents} aria-label="On this page"><div className={`page-container ${styles.contentsLinks}`}>
            <a href="#what-it-is">Overview</a><a href="#capabilities">Capabilities</a><a href="#applications">Applications</a><a href="#technology">Technology</a><a href="#relevant-work">Relevant work</a><a href="#faq">FAQ</a>
          </div></nav>

          <Section id="what-it-is" eyebrow="01 / Understand the service" title={service.definition.heading}>
            <div className={styles.definition} data-detail-reveal><p className={styles.lead}>{service.definition.paragraphs[0]}</p><p>{service.definition.paragraphs[1]}</p></div>
            <div className={styles.distinctions}>{service.definition.distinctions.map((item) => <article key={item.title} data-detail-reveal><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </Section>

          <Section id="why-it-matters" eyebrow="02 / Why it matters" title="Make the complex easier to understand." dark>
            <div className={styles.benefits}>{service.benefits.map((item, index) => <article key={item.title} data-detail-reveal><span className={styles.benefitNumber}>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </Section>

          <Section id="capabilities" eyebrow="03 / What AFAQO can create" title="A clear scope. A purposeful experience."><CapabilityGrid service={service} /></Section>

          <Section id="applications" eyebrow="04 / Practical applications" title="Where the service comes into use.">
            <div className={styles.useCases}>{service.useCases.map((item, index) => <article key={item.title} data-detail-reveal><span className={styles.index} aria-hidden="true">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
          </Section>

          <section className={styles.considerationSection} aria-labelledby="considerations-heading"><div className={`page-container ${styles.considerationGrid}`}>
            <div className={styles.contextImage} data-detail-reveal><Image src={service.image} alt={service.imageAlt} fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1440px) 44vw, 624px" /></div>
            <div data-detail-reveal><p className={styles.eyebrow}>Design & delivery considerations</p><h2 id="considerations-heading">{service.considerations.heading}</h2><p>{service.considerations.text}</p><ul className={styles.checkList}>{service.considerations.items.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div></section>

          <Section id="industries" eyebrow="05 / Industries & disciplines" title="Built around the context of use.">
            <div className={styles.industries}>{service.industries.map((item) => <article key={item.title} data-detail-reveal><h3>{item.title}</h3><p>{item.text}</p><Link className={styles.textLink} href={`/industries#${item.anchor}`} aria-label={`Explore ${item.title} applications`}>Explore industry <Arrow /></Link></article>)}</div>
          </Section>

          <Section id="technology" eyebrow="06 / Tools & technology" title="The stack follows the experience." dark>
            <p className={styles.sectionIntro}>Engine, content and platform choices are made together. The scope, source assets and delivery target determine which tools belong in the pipeline.</p>
            <div className={styles.technology}>{service.technologies.map((item) => <article key={item.title} data-detail-reveal><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
            <Link className={styles.textLink} href="/technology-ai">Our technology approach <Arrow /></Link>
          </Section>

          <Section id="delivery" eyebrow="07 / Delivery formats" title="Choose the right place for it to run.">
            <div className={styles.delivery}>{service.delivery.map((item) => <article key={item.title} data-detail-reveal><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </Section>

          <Section id="process" eyebrow="08 / How we work" title="One partner. End to end.">
            <div className={styles.processIntro}><p>From the first idea to the deployed experience, creative and technical decisions stay connected. The brief, content and target platform shape the work within each stage.</p><Link href="/about" className={styles.textLink}>Meet AFAQO’s approach <Arrow /></Link></div>
            <ServiceProcess />
            <p className={styles.processFootnote}>Purpose before platform. Clarity over complexity. Collaboration across disciplines. These principles connect experience design, 3D production and technical delivery.</p>
          </Section>

          <Section id="relevant-work" eyebrow="09 / Relevant work" title="The capability, in context."><RelatedWork service={service} /></Section>

          <Section id="related-services" eyebrow="10 / Connected capabilities" title="Explore the rest of the picture.">
            <div className={styles.related}>{Object.values(serviceDetails).filter((item) => item.slug !== service.slug).map((item) => <Link href={`/services/${item.slug}`} key={item.slug}><span className={styles.index}>{item.number}</span><span>{item.title}</span><Arrow /></Link>)}</div>
          </Section>

          <Section id="faq" eyebrow="11 / Questions & answers" title="Before you start."><ServiceFAQ service={service} /></Section>

          <section className={`${styles.section} ${styles.dark} ${styles.finalCta}`} aria-labelledby="next-step-heading"><div className="page-container" data-detail-reveal>
            <p className={styles.eyebrow}>12 / Start a conversation</p><h2 id="next-step-heading">{service.cta}</h2><p>Share your audience, objectives, existing assets and intended platform. We’ll help define an appropriate scope and the next step.</p><div className={styles.actions}><Link className={styles.primaryLink} href={`/contact?service=${encodeURIComponent(service.title)}`}>Discuss your project <Arrow /></Link><a className={styles.textLink} href={`mailto:info@afaqo.tech?subject=${encodeURIComponent(`Project inquiry: ${service.title}`)}`}>Email AFAQO <Arrow /></a></div>
          </div></section>
        </ServiceDetailReveal>
      </main>
      <Footer />
    </div>
  );
}
