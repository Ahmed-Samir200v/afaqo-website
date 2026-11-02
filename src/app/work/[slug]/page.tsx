import type { Metadata } from "next";
import ResponsiveImage from "@/components/ui/ResponsiveImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  getCaseStudy,
  getAllCaseStudySlugs,
} from "@/content/projects/case-studies";
import styles from "@/components/sections/work/CaseStudy.module.css";
import { SumedCaseStudy } from "@/components/sections/work/case-studies/sumed/SumedCaseStudy";
import { collectApprovedProjectImages } from "@/lib/case-study-media";
import {
  CinematicCaseStudyMedia,
  ExperienceCaseStudyMedia,
  FinalCaseStudyGallery,
  HeroCaseStudyMedia,
  OverviewCaseStudyMedia,
  ProcessCaseStudyMedia,
} from "@/components/sections/work/CaseStudyMedia";
import {
  CaseStudyMotionRoot,
  CaseStudySectionNav,
  type CaseStudyNavSection,
} from "@/components/sections/work/CaseStudyMotion";
import { TAF35ScrollVideo } from "@/components/sections/work/TAF35ScrollVideo";
import {
  CaseStudyIcon,
  resolveBuildStageIcon,
  resolveDeliverableIcon,
  resolveStepIcon,
  type CaseStudyIconKind,
} from "@/components/sections/work/case-studies/CaseStudyIcons";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) {
    return {
      title: "Project Not Found | AFAQO",
    };
  }

  if (slug === "industrial-training-experience") {
    return {
      title: "SUMED LPG Handling Station | AFAQO",
      description:
        "Industrial digital facility reconstruction and interactive exploration for the SUMED LPG Handling Station in Ain Sukhna, Egypt.",
      robots: { index: false, follow: false },
    };
  }

  const metadataBySlug: Record<string, { title: string; description: string }> = {
    "nakhal-fort": {
      title: "Nakhal Fort Virtual Tour | AFAQO",
      description:
        "Explore how AFAQO transformed Nakhal Fort in Oman into an immersive Meta Quest 3 virtual heritage experience for spatial exploration and historical discovery.",
    },
    "simulxr-owt": {
      title: "Oily Water Treatment Industrial XR Training | AFAQO",
      description:
        "See how AFAQO and SIMULXR transformed engineering references for an Oily Water Treatment facility into an interactive VR training environment.",
    },
    "taf35-robot-simulation": {
      title: "TAF35 Robot Training Simulation | AFAQO",
      description:
        "A confidential Saudi technical training project translating equipment documentation into immersive procedural training.",
    },
  };

  if (metadataBySlug[slug]) return metadataBySlug[slug];

  return {
    title: `${project.title} — Case Study | AFAQO`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) {
    notFound();
  }

  if (slug === "industrial-training-experience") {
    return <SumedCaseStudy />;
  }

  const nextProject = getCaseStudy(project.nextSlug);
  const nextProjectImage =
    nextProject?.image ||
    (nextProject?.mediaPlan?.hero.status === "approved"
      ? nextProject.mediaPlan.hero.src
      : undefined);
  const nextProjectImageAlt =
    nextProject?.imageAlt ||
    nextProject?.mediaPlan?.hero.alt ||
    nextProject?.title ||
    "";

  const approvedProjectImages = collectApprovedProjectImages(
    project.mediaPlan,
    project.image,
    project.imageAlt
  );

  const glanceItems: {
    label: string;
    value: string;
    icon: CaseStudyIconKind;
    code: string;
  }[] = [
    { label: "Industry", value: project.industry, icon: "industry", code: "01" },
    { label: "Category", value: project.category, icon: "layers", code: "02" },
    { label: "Role", value: project.role, icon: "compass", code: "03" },
    { label: "Deliverables", value: project.deliverables, icon: "package", code: "04" },
    { label: "Platform", value: project.platform, icon: "headset", code: "05" },
    { label: "Location", value: project.location, icon: "pin", code: "06" },
  ];

  const techItems: {
    label: string;
    value: string;
    icon: CaseStudyIconKind;
    code: string;
  }[] = [
    { label: "Engine & Runtime", value: project.tech.engine, icon: "cpu", code: "SYS.01" },
    { label: "Target Hardware", value: project.tech.platform, icon: "headset", code: "SYS.02" },
    { label: "Output Format", value: project.tech.output, icon: "globe", code: "SYS.03" },
    { label: "Status", value: project.tech.status, icon: "verified", code: "SYS.04" },
  ];

  const navSections: CaseStudyNavSection[] = [];
  if (project.overview.length > 0) {
    navSections.push({ id: "overview", label: "Overview", icon: "overview" });
  }
  navSections.push({ id: "at-a-glance", label: "At a Glance", icon: "glance" });
  navSections.push({ id: "approach", label: "Approach", icon: "route" });
  if (project.mediaPlan && project.mediaPlan.process.length > 0) {
    navSections.push({ id: "production-journey", label: "Process", icon: "process" });
  }
  if (project.buildProcess && project.buildProcess.length > 0) {
    navSections.push({ id: "behind-the-build", label: "Engineering Inputs", icon: "cad" });
  }
  if (project.mediaPlan?.scrollMedia) {
    navSections.push({ id: "device-motion", label: "Device Motion", icon: "route" });
  }
  if (project.mediaPlan) {
    navSections.push({ id: "experience-showcase", label: "VR & Scenarios", icon: "headset" });
  }
  if (project.tech) {
    navSections.push({ id: "tech-delivery", label: "Technology", icon: "cpu" });
  }
  if (project.outcomes) {
    navSections.push({ id: "outcomes", label: "Deliverables", icon: "verified" });
  }
  if (project.mediaPlan && project.mediaPlan.gallery.length > 0) {
    navSections.push({ id: "project-gallery", label: "Gallery", icon: "gallery" });
  }

  return (
    <div className={styles.pageContainer}>
      {/* Unified Global Floating Glass Header */}
      <Header />

      <CaseStudyMotionRoot>
        <main id="main-content">
          {/* P01 — Project Hero */}
          <section className={styles.heroSection} aria-labelledby="case-study-title">
            <div className={styles.heroAmbientGlow} data-cs-hero-glow aria-hidden="true" />
            <div className="page-container">
              <div className={styles.heroTopRow} data-cs-hero-item>
                <Link href="/work" className={styles.backLink}>
                  <CaseStudyIcon kind="arrow-left" size={16} />
                  <span>Back to Work</span>
                </Link>

                {project.productReference && (
                  <div className={styles.productReferenceBadge}>
                    <span className={styles.productReferenceDot} aria-hidden="true" />
                    <CaseStudyIcon kind="shield" size={15} />
                    <span>{project.productReference}</span>
                  </div>
                )}
              </div>

              <div className={styles.eyebrow} data-cs-hero-item>
                <CaseStudyIcon kind="layers" size={14} />
                <span>08 / CASE STUDY</span>
                <span className={styles.eyebrowLine} aria-hidden="true" />
              </div>

              <h1 id="case-study-title" className={styles.title} data-cs-hero-item>
                {project.title}
              </h1>

              <p className={styles.summary} data-cs-hero-item>
                {project.summary}
              </p>

              {project.confidentialityNote && (
                <div className={styles.confidentialityBanner} data-cs-hero-item>
                  <CaseStudyIcon kind="shield" size={16} />
                  <p className={styles.sectionSubtitle}>{project.confidentialityNote}</p>
                </div>
              )}

              <div className={styles.heroMetaRow} data-cs-hero-meta>
                <span className={styles.heroMetaPill}>
                  <CaseStudyIcon kind="layers" size={14} />
                  <span>{project.category}</span>
                </span>
                <span className={styles.heroMetaPill}>
                  <CaseStudyIcon kind="pin" size={14} />
                  <span>{project.location}</span>
                </span>
                <span className={styles.heroMetaPill}>
                  <CaseStudyIcon kind="facility" size={14} />
                  <span>{project.theme}</span>
                </span>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.heroTagPill}>
                    {tag}
                  </span>
                ))}
              </div>

              {project.mediaPlan ? (
                <HeroCaseStudyMedia
                  media={project.mediaPlan.hero}
                  fallbackImage={project.image}
                  fallbackAlt={project.imageAlt}
                />
              ) : (
                project.image &&
                project.imageAlt && (
                  <div className={styles.heroMediaFrame} data-cs-hero-media>
                    <ResponsiveImage
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      priority
                      sizes="(max-width: 1400px) 100vw, 1360px"
                      className={styles.heroImage}
                    />
                  </div>
                )
              )}
            </div>
          </section>

          {/* Editorial Body Layout: Sticky Left Sidebar on Desktop + Right Content Column */}
          <div className={styles.caseStudyBodyShell}>
            <CaseStudySectionNav sections={navSections} />

            <div className={styles.caseStudyMainColumn}>
              {/* P01.5 — Project Overview */}
              {project.overview.length > 0 && (
                <section
                  id="overview"
                  className={styles.storySection}
                  aria-labelledby="overview-heading"
                  data-cs-section
                >
                  <div className="page-container">
                    <div className={styles.sectionHeader} data-cs-header>
                      <div>
                        <div className={styles.sectionEyebrow}>
                          <CaseStudyIcon kind="overview" size={14} />
                          <span>01 / PROJECT OVERVIEW</span>
                          <span className={styles.eyebrowLine} aria-hidden="true" />
                        </div>
                        <h2 id="overview-heading" className={styles.sectionHeading}>
                          Project <span className={styles.accent}>overview.</span>
                        </h2>
                      </div>
                      <p className={styles.sectionSubtitle}>
                        Scope, engineering foundation, and spatial context of the delivered environment.
                      </p>
                    </div>

                    <div className={styles.challengeBox} data-cs-card>
                      <div className={styles.challengeBoxHeader}>
                        <span className={styles.cardIconBadge}>
                          <CaseStudyIcon kind="facility" size={18} />
                        </span>
                        <span className={styles.challengeBoxTag}>FACILITY &amp; SYSTEM CONTEXT</span>
                      </div>
                      <div className={styles.overviewParagraphs}>
                        {project.overview.map((paragraph) => (
                          <p key={paragraph} className={styles.challengeText}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    {project.mediaPlan && (
                      <OverviewCaseStudyMedia media={project.mediaPlan.overview} />
                    )}
                  </div>
                </section>
              )}

              {/* P02 — At a Glance */}
              <section
                id="at-a-glance"
                className={styles.glanceSection}
                aria-labelledby="glance-heading"
                data-cs-section
              >
                <div className="page-container">
                  <div className={styles.sectionHeader} data-cs-header>
                    <div>
                      <div className={styles.sectionEyebrow}>
                        <CaseStudyIcon kind="glance" size={14} />
                        <span>02 / SPECIFICATIONS &amp; SCOPE</span>
                        <span className={styles.eyebrowLine} aria-hidden="true" />
                      </div>
                      <h2 id="glance-heading" className={styles.sectionHeading}>
                        At a <span className={styles.accent}>glance.</span>
                      </h2>
                    </div>
                    <p className={styles.sectionSubtitle}>
                      A quick overview of the project, including key details about the
                      industry, our role, and the core deliverables.
                    </p>
                  </div>

                  <div className={styles.glanceGrid}>
                    {glanceItems.map((item) => (
                      <div key={item.label} className={styles.glanceCard} data-cs-card>
                        <div className={styles.glanceCardTop}>
                          <span className={styles.cardIconBadge}>
                            <CaseStudyIcon kind={item.icon} size={18} />
                          </span>
                          <span className={styles.cardIndexCode}>{item.code}</span>
                        </div>
                        <span className={styles.glanceLabel}>{item.label}</span>
                        <span className={styles.glanceValue}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* P03 & P04 — Challenge & Our Approach */}
              <section
                id="approach"
                className={styles.storySection}
                aria-labelledby="challenge-heading"
                data-cs-section
              >
                <div className="page-container">
                  <div className={styles.sectionHeader} data-cs-header>
                    <div>
                      <div className={styles.sectionEyebrow}>
                        <CaseStudyIcon kind="inspect" size={14} />
                        <span>03 / THE CHALLENGE</span>
                        <span className={styles.eyebrowLine} aria-hidden="true" />
                      </div>
                      <h2 id="challenge-heading" className={styles.sectionHeading}>
                        Challe<span className={styles.accent}>nge.</span>
                      </h2>
                    </div>
                  </div>

                  <div className={styles.challengeBox} data-cs-card>
                    <div className={styles.challengeBoxHeader}>
                      <span className={styles.cardIconBadge}>
                        <CaseStudyIcon kind="inspect" size={18} />
                      </span>
                      <span className={styles.challengeBoxTag}>OPERATIONAL PROBLEM STATEMENT</span>
                    </div>
                    <p className={styles.challengeText}>{project.challenge}</p>
                  </div>

                  <div className={`${styles.sectionHeader} ${styles.approachHeaderSpacing}`} data-cs-header>
                    <div>
                      <div className={styles.sectionEyebrow}>
                        <CaseStudyIcon kind="route" size={14} />
                        <span>04 / METHODOLOGY &amp; PROCESS FLOW</span>
                        <span className={styles.eyebrowLine} aria-hidden="true" />
                      </div>
                      <h2 className={styles.sectionHeading}>
                        Our <span className={styles.accent}>approach.</span>
                      </h2>
                    </div>
                    <p className={styles.sectionSubtitle}>
                      A multi-disciplinary process combining creative direction,
                      experience design, 3D production, and real-time technology to bring the
                      project to life.
                    </p>
                  </div>

                  <div className={styles.stepsGrid}>
                    {project.approach.map((step, idx) => {
                      const stepIcon = resolveStepIcon(step.title, idx);
                      return (
                        <div key={step.step} className={styles.stepCard} data-cs-card>
                          <div className={styles.stepCardTop}>
                            <span className={styles.cardIconBadge}>
                              <CaseStudyIcon kind={stepIcon} size={18} />
                            </span>
                            <span className={styles.stepNumber}>STEP {step.step}</span>
                          </div>
                          <span
                            className={styles.stepConnectorLine}
                            data-cs-connector
                            aria-hidden="true"
                          />
                          <h3 className={styles.stepTitle}>{step.title}</h3>
                          <p className={styles.stepDesc}>{step.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {project.mediaPlan && (
                <ProcessCaseStudyMedia media={project.mediaPlan.process} />
              )}

              {/* P06 — Behind the Build (Production Process / Engineering Inputs) */}
              {project.buildProcess && project.buildProcess.length > 0 && (
                <section
                  id="behind-the-build"
                  className={styles.buildSection}
                  aria-labelledby="build-heading"
                  data-cs-section
                >
                  <div className="page-container">
                    <div className={styles.sectionHeader} data-cs-header>
                      <div>
                        <div className={styles.sectionEyebrow}>
                          <CaseStudyIcon kind="cad" size={14} />
                          <span>06 / ENGINEERING INPUTS &amp; PIPELINE</span>
                          <span className={styles.eyebrowLine} aria-hidden="true" />
                        </div>
                        <h2 id="build-heading" className={styles.sectionHeading}>
                          Behind the <span className={styles.accent}>build.</span>
                        </h2>
                      </div>
                      <p className={styles.sectionSubtitle}>
                        The technical pipeline and craft decisions that moved this experience from
                        concept to deployment.
                      </p>
                    </div>

                    <div className={styles.buildGrid}>
                      {project.buildProcess.map((stage, idx) => {
                        const stageIcon = resolveBuildStageIcon(stage.title, idx);
                        return (
                          <div key={stage.stage} className={styles.buildCard} data-cs-card>
                            <div className={styles.buildCardTop}>
                              <span className={styles.cardIconBadge}>
                                <CaseStudyIcon kind={stageIcon} size={18} />
                              </span>
                              <span className={styles.buildStage}>STAGE {stage.stage}</span>
                            </div>
                            <span
                              className={styles.stepConnectorLine}
                              data-cs-connector
                              aria-hidden="true"
                            />
                            <h3 className={styles.buildTitle}>{stage.title}</h3>
                            <p className={styles.buildDesc}>{stage.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}

              {project.mediaPlan?.scrollMedia && (
                <TAF35ScrollVideo media={project.mediaPlan.scrollMedia} />
              )}

              {project.mediaPlan && (
                <CinematicCaseStudyMedia media={project.mediaPlan.cinematic} />
              )}

              {project.mediaPlan && (
                <ExperienceCaseStudyMedia media={project.mediaPlan.experience} />
              )}

              {/* P07 — Technology & Delivery */}
              {project.tech && (
                <section
                  id="tech-delivery"
                  className={styles.techDeliverySection}
                  aria-labelledby="tech-heading"
                  data-cs-section
                >
                  <div className="page-container">
                    <div className={styles.sectionHeader} data-cs-header>
                      <div>
                        <div className={styles.sectionEyebrow}>
                          <CaseStudyIcon kind="cpu" size={14} />
                          <span>08 / SYSTEM ARCHITECTURE &amp; DELIVERY</span>
                          <span className={styles.eyebrowLine} aria-hidden="true" />
                        </div>
                        <h2 id="tech-heading" className={styles.sectionHeading}>
                          Technology &amp; <span className={styles.accent}>delivery.</span>
                        </h2>
                      </div>
                      <p className={styles.sectionSubtitle}>
                        Production areas, target platforms, and delivered output formats.
                      </p>
                    </div>

                    <div className={styles.techDeliveryGrid}>
                      {techItems.map((item) => (
                        <div
                          key={item.label}
                          className={styles.techDeliveryCard}
                          data-cs-card
                        >
                          <div className={styles.techCardTop}>
                            <span className={styles.cardIconBadge}>
                              <CaseStudyIcon kind={item.icon} size={18} />
                            </span>
                            <span className={styles.cardIndexCode}>{item.code}</span>
                          </div>
                          <span className={styles.techDeliveryLabel}>{item.label}</span>
                          <span className={styles.techDeliveryValue}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* P08 — Outcomes / What Was Delivered */}
              {project.outcomes && (
                <section
                  id="outcomes"
                  className={styles.outcomesSection}
                  aria-labelledby="outcomes-heading"
                  data-cs-section
                >
                  <div className="page-container">
                    <div className={styles.sectionHeader} data-cs-header>
                      <div>
                        <div className={styles.sectionEyebrow}>
                          <CaseStudyIcon kind="verified" size={14} />
                          <span>09 / CONFIRMED DELIVERABLES</span>
                          <span className={styles.eyebrowLine} aria-hidden="true" />
                        </div>
                        <h2 id="outcomes-heading" className={styles.sectionHeading}>
                          What was <span className={styles.accent}>delivered.</span>
                        </h2>
                      </div>
                      <p className={styles.sectionSubtitle}>
                        Confirmed tangible assets and operational deliverables delivered for this project.
                      </p>
                    </div>

                    <div className={styles.outcomesCard} data-cs-card>
                      <div className={styles.outcomesSummaryWrap}>
                        <span className={styles.outcomesSummaryIcon}>
                          <CaseStudyIcon kind="package" size={22} />
                        </span>
                        <p className={styles.outcomesSummary}>{project.outcomes.summary}</p>
                      </div>
                      <ul className={styles.deliverablesList}>
                        {project.outcomes.deliverablesList.map((item, idx) => {
                          const itemIcon = resolveDeliverableIcon(item);
                          return (
                            <li
                              key={idx}
                              className={styles.deliverableItem}
                              data-cs-card
                            >
                              <span className={styles.deliverableBullet} aria-hidden="true">
                                <CaseStudyIcon kind="check" size={15} />
                              </span>
                              <span className={styles.deliverableText}>{item}</span>
                              <span className={styles.deliverableTypeIcon} aria-hidden="true">
                                <CaseStudyIcon kind={itemIcon} size={15} />
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </section>
              )}

              {project.mediaPlan && (
                <FinalCaseStudyGallery
                  media={project.mediaPlan.gallery}
                  projectImages={approvedProjectImages}
                  projectTitle={project.title}
                />
              )}

              {/* P09 — Next Project */}
              {nextProject && (
                <section
                  id="next-project"
                  className={styles.nextProjectSection}
                  aria-labelledby="next-heading"
                  data-cs-section
                >
                  <div className="page-container">
                    <div className={styles.sectionHeader} data-cs-header>
                      <div>
                        <div className={styles.sectionEyebrow}>
                          <CaseStudyIcon kind="arrow-right" size={14} />
                          <span>11 / CONTINUE EXPLORING</span>
                          <span className={styles.eyebrowLine} aria-hidden="true" />
                        </div>
                        <h2 id="next-heading" className={styles.sectionHeading}>
                          Next <span className={styles.accent}>project.</span>
                        </h2>
                      </div>
                      <p className={styles.sectionSubtitle}>
                        Explore another project to see more of our work across different
                        industries and experiences.
                      </p>
                    </div>

                    <Link
                      href={`/work/${nextProject.slug}`}
                      className={styles.nextCard}
                      aria-label={`View next case study: ${nextProject.title}`}
                      data-cs-card
                    >
                      {nextProjectImage ? (
                        <div className={styles.nextMedia}>
                          <ResponsiveImage
                            src={nextProjectImage}
                            alt={nextProjectImageAlt}
                            fill
                            sizes="(max-width: 900px) 100vw, 550px"
                            className={styles.nextImage}
                          />
                        </div>
                      ) : (
                        <div className={styles.nextMediaFallback} aria-hidden="true">
                          <CaseStudyIcon kind="facility" size={36} />
                        </div>
                      )}

                      <div className={styles.nextContent}>
                        <div className={styles.nextMetaRow}>
                          <span className={styles.nextSubtitle}>NEXT CASE STUDY</span>
                          <span className={styles.nextLocationBadge}>
                            <CaseStudyIcon kind="pin" size={12} />
                            <span>{nextProject.location}</span>
                          </span>
                        </div>
                        <h3 className={styles.nextTitle}>{nextProject.title}</h3>
                        <p className={styles.nextSummary}>{nextProject.summary}</p>
                        <span className={styles.nextActionText}>
                          <span>View case study</span>
                          <CaseStudyIcon kind="arrow-up-right" size={16} />
                        </span>
                      </div>
                    </Link>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* P10 — Discuss Similar Project CTA */}
          <section
            className={styles.darkCtaSection}
            aria-labelledby="similar-cta-heading"
            data-cs-section
          >
            <div className={styles.darkCtaGlow} aria-hidden="true" />
            <div className="page-container">
              <div className={styles.darkCtaGrid} data-cs-header>
                <div>
                  <div className={styles.darkCtaEyebrow}>
                    <CaseStudyIcon kind="compass" size={14} />
                    <span>LET&apos;S WORK TOGETHER</span>
                  </div>
                  <h2 id="similar-cta-heading" className={styles.darkCtaHeading}>
                    Discuss a{" "}
                    <span className={styles.darkCtaCyan}>similar project.</span>
                  </h2>
                </div>

                <div>
                  <p className={styles.darkCtaBody}>
                    Tell us about your goals, and we&apos;ll help shape the right
                    immersive, interactive, or visualization approach.
                  </p>

                  <Link href="/contact" className={styles.darkCtaButton}>
                    <span>Start a Project</span>
                    <CaseStudyIcon kind="arrow-up-right" size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </CaseStudyMotionRoot>

      {/* Shared Global Corporate Footer */}
      <Footer />
    </div>
  );
}
