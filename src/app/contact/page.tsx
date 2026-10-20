import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import styles from "@/components/sections/contact/Contact.module.css";

export const metadata: Metadata = {
  title: "Start a Project | Contact AFAQO",
  description:
    "Discuss an XR, interactive 3D, simulation or digital environment project with AFAQO. Based in Cairo, working globally.",
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
          <span className={styles.eyebrow}>START A CONVERSATION</span>
          <h1 className={styles.heroTitle}>
            Let&apos;s make the complex <span className={styles.accentWord}>easier to experience.</span>
          </h1>
          <p className={styles.heroIntro}>
            Tell us what your organization needs to explain, train, simulate or build. We will help determine the right approach, platform and scope.
          </p>

          <div className={styles.contactInfoCard}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Location</span>
              <span className={styles.infoValue}>CAIRO — WORKING GLOBALLY</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Operations</span>
              <span className={styles.infoValue}>
                Based in Cairo, Egypt. Working across Oman, Saudi Arabia, the UAE and internationally.
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Focus Domains</span>
              <span className={styles.infoValue}>
                Extended Reality (XR), Interactive 3D, Digital Environments, Simulation & Training (SIMULXR), 3D Content Production
              </span>
            </div>
          </div>

          <div className={styles.commitmentBox}>
            <span className={styles.commitmentDot} />
            <span>
              Every inquiry is reviewed directly by our technical and creative leadership. We respond within two business days.
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
