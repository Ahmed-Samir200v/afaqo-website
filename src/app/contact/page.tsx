import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import styles from "@/components/sections/contact/Contact.module.css";

export const metadata: Metadata = {
  title: "Contact — Start a Conversation | AFAQO",
  description:
    "Have a project, partnership, or idea worth exploring? Get in touch with AFAQO. Cairo — Working Globally.",
};

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      {/* S00: Route Header (Unified Home Navigation) */}
      <Header />

      {/* Main Split Grid */}
      <div className={styles.contactContainer}>
        {/* Left Column: Editorial Statement & Info */}
        <div className={styles.editorialCol}>
          <span className={styles.eyebrow}>04 / CONTACT</span>
          <h1 className={styles.heroTitle}>
            Let’s build something <span className={styles.accentWord}>worth experiencing.</span>
          </h1>
          <p className={styles.heroIntro}>
            Tell us what you’re building. Have a project, partnership, or idea worth exploring?
            Let’s start the conversation.
          </p>

          <div className={styles.contactInfoCard}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Location</span>
              <span className={styles.infoValue}>CAIRO — WORKING GLOBALLY</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Operations</span>
              <span className={styles.infoValue}>
                Headquartered in Cairo, serving clients and project partners worldwide.
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Focus Domains</span>
              <span className={styles.infoValue}>
                Immersive Computing, Digital Twins, 3D Visualization, SIMULXR
              </span>
            </div>
          </div>

          <div className={styles.commitmentBox}>
            <span className={styles.commitmentDot} />
            <span>
              Enterprise project consultations and technical evaluations are coordinated directly with our engineering leadership.
            </span>
          </div>
        </div>

        {/* Right Column: Project Inquiry Form */}
        <div className={styles.formCol}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Project Inquiry</h2>
            <p className={styles.formDesc}>
              Provide initial details about your requirements and timeline.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>

      {/* Global Unified Footer */}
      <Footer />
    </div>
  );
}
