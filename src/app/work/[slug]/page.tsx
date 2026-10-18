import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  getCaseStudy,
  getAllCaseStudySlugs,
} from "@/content/projects/case-studies";
import styles from "@/components/sections/work/CaseStudy.module.css";
import { IndustrialDigitalTwinCaseStudy } from "@/components/sections/work/case-studies/IndustrialDigitalTwinCaseStudy";

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
      title: "Industrial Digital Twin & Interactive Training | AFAQO",
      description:
        "A visual production journey connecting process references, detailed equipment and an explorable industrial environment.",
    };
  }

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
    return <IndustrialDigitalTwinCaseStudy />;
  }

  const nextProject = getCaseStudy(project.nextSlug);

  return (
    <div className={styles.pageContainer}>
      {/* Light Theme Glass Navigation */}
      <Header theme="light" />

      <main>
        {/* P01 — Project Hero */}
        <section className={styles.heroSection} aria-labelledby="case-study-title">
          <div className="page-container">
            <Link href="/work" className={styles.backLink}>
              <span aria-hidden="true">←</span>
              <span>Back to Work</span>
            </Link>

            <div className={styles.eyebrow}>
              <span>08 / CASE STUDY</span>
              <span className={styles.eyebrowLine} aria-hidden="true" />
            </div>

            <h1 id="case-study-title" className={styles.title}>
              {project.title}
            </h1>

            <p className={styles.summary}>{project.summary}</p>

            <div className={styles.heroMetaRow}>
              <span>[{project.category}]</span>
              <span>•</span>
              <span>[{project.location}]</span>
              <span>•</span>
              <span>[{project.theme}]</span>
            </div>

            {/* Cinematic Project Hero Asset */}
            <div className={styles.heroMediaFrame}>
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                priority
                sizes="(max-width: 1400px) 100vw, 1360px"
                className={styles.heroImage}
              />
            </div>
          </div>
        </section>

        {/* P02 — At a Glance */}
        <section className={styles.glanceSection} aria-labelledby="glance-heading">
          <div className="page-container">
            <div className={styles.sectionHeader}>
              <h2 id="glance-heading" className={styles.sectionHeading}>
                At a <span className={styles.accent}>glance.</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                A quick overview of the project, including key details about the
                industry, our role, and the core deliverables.
              </p>
            </div>

            <div className={styles.glanceGrid}>
              <div className={styles.glanceCard}>
                <span className={styles.glanceLabel}>Industry</span>
                <span className={styles.glanceValue}>{project.industry}</span>
              </div>

              <div className={styles.glanceCard}>
                <span className={styles.glanceLabel}>Category</span>
                <span className={styles.glanceValue}>{project.category}</span>
              </div>

              <div className={styles.glanceCard}>
                <span className={styles.glanceLabel}>Role</span>
                <span className={styles.glanceValue}>{project.role}</span>
              </div>

              <div className={styles.glanceCard}>
                <span className={styles.glanceLabel}>Deliverables</span>
                <span className={styles.glanceValue}>{project.deliverables}</span>
              </div>

              <div className={styles.glanceCard}>
                <span className={styles.glanceLabel}>Platform</span>
                <span className={styles.glanceValue}>{project.platform}</span>
              </div>

              <div className={styles.glanceCard}>
                <span className={styles.glanceLabel}>Location</span>
                <span className={styles.glanceValue}>{project.location}</span>
              </div>
            </div>
          </div>
        </section>

        {/* P03 & P04 — Challenge & Our Approach */}
        <section className={styles.storySection} aria-labelledby="challenge-heading">
          <div className="page-container">
            <div className={styles.sectionHeader}>
              <h2 id="challenge-heading" className={styles.sectionHeading}>
                Challe<span className={styles.accent}>nge.</span>
              </h2>
            </div>

            <div className={styles.challengeBox}>
              <p className={styles.challengeText}>{project.challenge}</p>
            </div>

            <div className={styles.sectionHeader} style={{ marginTop: "4rem" }}>
              <h2 className={styles.sectionHeading}>
                Our <span className={styles.accent}>approach.</span>
              </h2>
              <p className={styles.sectionSubtitle}>
                A multi-disciplinary process combining creative direction,
                experience design, 3D production, and real-time technology to bring the
                project to life.
              </p>
            </div>

            <div className={styles.stepsGrid}>
              {project.approach.map((step) => (
                <div key={step.step} className={styles.stepCard}>
                  <span className={styles.stepNumber}>{step.step}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* P05 — Experience Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className={styles.gallerySection} aria-labelledby="gallery-heading">
            <div className="page-container">
              <div className={styles.sectionHeader}>
                <h2 id="gallery-heading" className={styles.sectionHeading}>
                  Experience <span className={styles.accent}>gallery.</span>
                </h2>
                <p className={styles.sectionSubtitle}>
                  Production visuals and authentic interactive views captured from the project.
                </p>
              </div>

              <div className={styles.galleryGrid}>
                {project.gallery.map((item, idx) => (
                  <div key={idx} className={styles.galleryItem}>
                    <div className={styles.galleryFrame}>
                      <Image
                        src={item.image}
                        alt={`${project.title} - View ${idx + 1}`}
                        fill
                        sizes="(max-width: 1400px) 100vw, 1360px"
                        className={styles.galleryImage}
                      />
                    </div>
                    <span className={styles.galleryCaption}>{item.caption}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* P06 — Behind the Build (Production Process) */}
        {project.buildProcess && project.buildProcess.length > 0 && (
          <section className={styles.buildSection} aria-labelledby="build-heading">
            <div className="page-container">
              <div className={styles.sectionHeader}>
                <h2 id="build-heading" className={styles.sectionHeading}>
                  Behind the <span className={styles.accent}>build.</span>
                </h2>
                <p className={styles.sectionSubtitle}>
                  The technical pipeline and craft decisions that moved this experience from
                  concept to deployment.
                </p>
              </div>

              <div className={styles.buildGrid}>
                {project.buildProcess.map((stage) => (
                  <div key={stage.stage} className={styles.buildCard}>
                    <span className={styles.buildStage}>STAGE {stage.stage}</span>
                    <h3 className={styles.buildTitle}>{stage.title}</h3>
                    <p className={styles.buildDesc}>{stage.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* P07 — Technology & Delivery */}
        {project.tech && (
          <section className={styles.techDeliverySection} aria-labelledby="tech-heading">
            <div className="page-container">
              <div className={styles.sectionHeader}>
                <h2 id="tech-heading" className={styles.sectionHeading}>
                  Technology & <span className={styles.accent}>delivery.</span>
                </h2>
                <p className={styles.sectionSubtitle}>
                  Verified execution toolchains, runtime platforms, and delivered output formats.
                </p>
              </div>

              <div className={styles.techDeliveryGrid}>
                <div className={styles.techDeliveryCard}>
                  <span className={styles.techDeliveryLabel}>Engine & Runtime</span>
                  <span className={styles.techDeliveryValue}>{project.tech.engine}</span>
                </div>

                <div className={styles.techDeliveryCard}>
                  <span className={styles.techDeliveryLabel}>Target Hardware</span>
                  <span className={styles.techDeliveryValue}>{project.tech.platform}</span>
                </div>

                <div className={styles.techDeliveryCard}>
                  <span className={styles.techDeliveryLabel}>Output Format</span>
                  <span className={styles.techDeliveryValue}>{project.tech.output}</span>
                </div>

                <div className={styles.techDeliveryCard}>
                  <span className={styles.techDeliveryLabel}>Status</span>
                  <span className={styles.techDeliveryValue}>{project.tech.status}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* P08 — Outcomes / What Was Delivered */}
        {project.outcomes && (
          <section className={styles.outcomesSection} aria-labelledby="outcomes-heading">
            <div className="page-container">
              <div className={styles.sectionHeader}>
                <h2 id="outcomes-heading" className={styles.sectionHeading}>
                  What was <span className={styles.accent}>delivered.</span>
                </h2>
                <p className={styles.sectionSubtitle}>
                  Confirmed tangible assets and operational deliverables delivered for this project.
                </p>
              </div>

              <div className={styles.outcomesCard}>
                <p className={styles.outcomesSummary}>{project.outcomes.summary}</p>
                <ul className={styles.deliverablesList}>
                  {project.outcomes.deliverablesList.map((item, idx) => (
                    <li key={idx} className={styles.deliverableItem}>
                      <span className={styles.deliverableBullet}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* P09 — Next Project */}
        {nextProject && (
          <section className={styles.nextProjectSection} aria-labelledby="next-heading">
            <div className="page-container">
              <div className={styles.sectionHeader}>
                <h2 id="next-heading" className={styles.sectionHeading}>
                  Next <span className={styles.accent}>project.</span>
                </h2>
                <p className={styles.sectionSubtitle}>
                  Explore another project to see more of our work across different
                  industries and experiences.
                </p>
              </div>

              <Link
                href={`/work/${nextProject.slug}`}
                className={styles.nextCard}
                aria-label={`View next case study: ${nextProject.title}`}
              >
                <div className={styles.nextMedia}>
                  <Image
                    src={nextProject.image}
                    alt={nextProject.imageAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 550px"
                    className={styles.nextImage}
                  />
                </div>

                <div className={styles.nextContent}>
                  <span className={styles.nextSubtitle}>NEXT CASE STUDY</span>
                  <h3 className={styles.nextTitle}>{nextProject.title}</h3>
                  <p className={styles.nextSummary}>{nextProject.summary}</p>
                  <span className={styles.nextActionText}>
                    <span>View case study</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* P10 — Discuss Similar Project CTA */}
        <section className={styles.darkCtaSection} aria-labelledby="similar-cta-heading">
          <div className="page-container">
            <div className={styles.darkCtaGrid}>
              <div>
                <div className={styles.darkCtaEyebrow}>LET&apos;S WORK TOGETHER</div>
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
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Global Corporate Footer */}
      <Footer />
    </div>
  );
}
