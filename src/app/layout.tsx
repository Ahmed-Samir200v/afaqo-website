import type { Metadata } from "next";
import { Manrope, Inter, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: "AFAQO — Immersive Digital Transformation",
  description: "Next-generation digital transformation and immersive solutions.",
  openGraph: {
    title: "AFAQO — Creative Technology Company",
    description: "We turn complex ideas into immersive experiences.",
    siteName: "AFAQO",
    locale: "en_US",
    type: "website",
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
      className={`${manrope.variable} ${inter.variable} ${ibmPlexArabic.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { const p = new URLSearchParams(location.search); if (p.get('reduce-motion') !== 'true') document.documentElement.setAttribute('data-force-motion','true'); })();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
