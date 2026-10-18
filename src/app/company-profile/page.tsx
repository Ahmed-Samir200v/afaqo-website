import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CompanyProfileExperience } from "@/components/sections/company-profile/CompanyProfileExperience";

export const metadata: Metadata = {
  title: "Company Profile | AFAQO Immersive Digital Transformation",
  description:
    "Explore AFAQO's creative technology capabilities, immersive experiences, real-time 3D work, industrial simulation, and project delivery approach. Cairo — Working Globally.",
  openGraph: {
    title: "Company Profile | AFAQO Immersive Digital Transformation",
    description:
      "A cinematic exploration of AFAQO's creative technology capabilities, digital twin projects, and interactive spatial simulation.",
    url: "/company-profile",
    siteName: "AFAQO",
    type: "website",
  },
};

export default function CompanyProfilePage() {
  return (
    <>
      {/* Route Header (Dark surface for cinematic deep navy atmosphere) */}
      <Header theme="dark" />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
        <CompanyProfileExperience />
      </main>

      {/* Shared Global Corporate Editorial Footer */}
      <Footer />
    </>
  );
}
