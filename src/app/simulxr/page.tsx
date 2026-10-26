import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { S01Hero } from "@/components/sections/simulxr/S01Hero";
import { S02Problem } from "@/components/sections/simulxr/S02Problem";
import { S03Solution } from "@/components/sections/simulxr/S03Solution";
import { S04HowItWorks } from "@/components/sections/simulxr/S04HowItWorks";
import { S05ReadinessSystems } from "@/components/sections/simulxr/S05ReadinessSystems";
import { S06InAction } from "@/components/sections/simulxr/S06InAction";
import { S07OperationComparison } from "@/components/sections/simulxr/S07OperationComparison";
import { S08ScaleExperience } from "@/components/sections/simulxr/S08ScaleExperience";
import { S09Pilot } from "@/components/sections/simulxr/S09Pilot";
import { S10PoweredByAfaqo } from "@/components/sections/simulxr/S10PoweredByAfaqo";
import styles from "@/components/sections/simulxr/Simulxr.module.css";

export const metadata: Metadata = {
  title: "SIMULXR | Industrial Simulation & Immersive Workforce Training | AFAQO",
  description:
    "SIMULXR transforms real industrial facilities, equipment, and operational procedures into interactive training environments where teams learn, practice and prepare before entering the real operation.",
  alternates: {
    canonical: "https://afaqo.tech/simulxr/",
  },
  openGraph: {
    title: "SIMULXR — Before It Happens | An AFAQO Industrial Solution",
    description:
      "Transform real facilities, equipment, and operational procedures into interactive training environments.",
    url: "https://afaqo.tech/simulxr/",
    siteName: "AFAQO",
    images: [
      {
        url: "/images/SIMULXR/Simulxr-Hero.png",
        width: 1200,
        height: 630,
        alt: "SIMULXR Industrial Simulation & Immersive Workforce Training",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIMULXR — Before It Happens | AFAQO",
    description:
      "Industrial Simulation & Immersive Workforce Training for complex industrial operations.",
    images: ["/images/SIMULXR/Simulxr-Hero.png"],
  },
};

export default function SimulxrPage() {
  return (
    <div className={styles.simulxrPage}>
      {/* S00: Route Header (Unified AFAQO Navigation) */}
      <Header />

      {/* Main Content Landmark with Skip-To Anchor */}
      <main id="main-content">
        {/* SECTION 01 — HERO */}
        <S01Hero />

        {/* SECTION 02 — THE PROBLEM */}
        <S02Problem />

        {/* SECTION 03 — THE SOLUTION */}
        <S03Solution />

        {/* SECTION 04 — HOW SIMULXR WORKS */}
        <S04HowItWorks />

        {/* SECTION 05 — FOUR READINESS SYSTEMS */}
        <S05ReadinessSystems />

        {/* SECTION 06 — SIMULXR IN ACTION (Cinematic Demonstrator) */}
        <S06InAction />

        {/* SECTION 07 — BUILT AROUND YOUR OPERATION (Before/After Slider) */}
        <S07OperationComparison />

        {/* SECTION 08 — SCALE THE EXPERIENCE */}
        <S08ScaleExperience />

        {/* SECTION 09 — START WITH A PILOT */}
        <S09Pilot />

        {/* SECTION 10 — POWERED BY AFAQO + FINAL CTA */}
        <S10PoweredByAfaqo />
      </main>

      {/* Global Unified Corporate Footer */}
      <Footer />
    </div>
  );
}
