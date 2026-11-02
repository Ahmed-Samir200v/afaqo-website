import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { H01Hero } from "@/components/sections/home/H01-Hero";
import { H02SelectedWork } from "@/components/sections/home/H02-SelectedWork";
import { H04Services } from "@/components/sections/home/H04-Services";
import { MidPageCTA } from "@/components/sections/home/MidPageCTA";
import { H05Industries } from "@/components/sections/home/H05-Industries";
import { H06Delivery } from "@/components/sections/home/H06-Delivery";
import { H07TechnologyAI } from "@/components/sections/home/H07-TechnologyAI";
import { H09SimulXR } from "@/components/sections/home/H09-SimulXR";
import { H10FinalCTA } from "@/components/sections/home/H10-FinalCTA";

export const metadata: Metadata = {
  title: "AFAQO | XR, Interactive 3D & Immersive Technology",
  description:
    "AFAQO combines experience design, interactive 3D and real-time technology to create immersive digital solutions for industry, learning and enterprise.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AFAQO | XR, Interactive 3D & Immersive Technology",
    description:
      "AFAQO combines experience design, interactive 3D and real-time technology to create immersive digital solutions for industry, learning and enterprise.",
    url: "/",
  },
};

export default function Home() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "var(--color-canvas-dark)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "AFAQO",
                url: "https://afaqo.tech",
                logo: "https://afaqo.tech/brand/afaqo-logo-dark.svg",
                description:
                  "AFAQO creates immersive digital experiences through experience design, interactive 3D and real-time technology.",
              },
              {
                "@type": "WebSite",
                name: "AFAQO",
                url: "https://afaqo.tech",
              },
            ],
          }),
        }}
      />
      {/* Global Production Floating Glass Header */}
      <Header />

      {/* Main Page Landmark Containing Homepage Sections */}
      <main>
        {/* H01 — Hero */}
        <H01Hero />

        {/* H02 — Selected Work */}
        <H02SelectedWork />

        {/* H04 — Services */}
        <H04Services />

        {/* Mid-Page CTA — Let's Build What's Next */}
        <MidPageCTA />

        {/* H05 — Industries */}
        <H05Industries />

        {/* H06 — End-to-End Delivery */}
        <H06Delivery />

        {/* 07 — Technology & AI */}
        <H07TechnologyAI />

        {/* H08 — AFAQO Lab (Disabled by default per project requirements) */}

        {/* 08 — SIMULXR Initiative */}
        <H09SimulXR />

        {/* Closing — brand moment & primary CTA */}
        <H10FinalCTA />
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
