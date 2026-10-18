import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { W01Hero } from "@/components/sections/work/W01Hero";
import { W02FeaturedExperience } from "@/components/sections/work/W02FeaturedExperience";
import { W03ProjectExplorer } from "@/components/sections/work/W03ProjectExplorer";
import { W04DarkPhilosophy } from "@/components/sections/work/W04DarkPhilosophy";
import { W05ContactCTA } from "@/components/sections/work/W05ContactCTA";
import styles from "@/components/sections/work/Work.module.css";

export const metadata: Metadata = {
  title: "Work — Ideas Made Tangible | AFAQO",
  description:
    "A selection of immersive experiences, interactive environments, and digital projects brought to life through design, 3D production, and technology.",
};

export default function WorkPage() {
  return (
    <div className={styles.workPage}>
      {/* Unified Global Floating Glass Header */}
      <Header />

      {/* Main Page Content */}
      <main>
        {/* W01 — Editorial Hero */}
        <W01Hero />

        {/* W02 — Featured Experience */}
        <W02FeaturedExperience />

        {/* W03 — Project Explorer with Interactive Filters */}
        <W03ProjectExplorer />

        {/* W04 — Dark Philosophy Pause */}
        <W04DarkPhilosophy />

        {/* W05 — Get In Touch Contact Callout */}
        <W05ContactCTA />
      </main>

      {/* Shared Global Corporate Footer */}
      <Footer />
    </div>
  );
}
