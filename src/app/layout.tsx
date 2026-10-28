import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/Manrope.ttf",
  variable: "--font-manrope",
  weight: "300 600",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/Inter.ttf",
  variable: "--font-inter",
  weight: "400 500",
  display: "swap",
});

const ibmPlexArabic = localFont({
  src: [
    { path: "./fonts/IBMPlexSansArabic-Regular.ttf", weight: "400" },
    { path: "./fonts/IBMPlexSansArabic-Medium.ttf", weight: "500" },
    { path: "./fonts/IBMPlexSansArabic-SemiBold.ttf", weight: "600" },
  ],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://afaqo.tech").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AFAQO — Immersive Digital Transformation",
  description: "Next-generation digital transformation and immersive solutions.",
  openGraph: {
    title: "AFAQO — Creative Technology Company",
    description: "We turn complex ideas into immersive experiences.",
    siteName: "AFAQO",
    locale: "en_US",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/images/hero/afaqo-hero-desktop.jpg",
        width: 1920,
        height: 1080,
        alt: "AFAQO immersive digital experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AFAQO — Immersive Digital Transformation",
    description: "Next-generation digital transformation and immersive solutions.",
    images: ["/images/hero/afaqo-hero-desktop.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      data-force-motion="true"
      className={`${manrope.variable} ${inter.variable} ${ibmPlexArabic.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
