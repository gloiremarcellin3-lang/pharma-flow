import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { Layout } from "@/components/Layout";
import { getMetadataBase, siteConfig } from "@/lib/seo";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: siteConfig.title,
    template: "%s | PharmaFlow",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "pharmacie",
    "catalogue pharmacie",
    "medicaments",
    "recherche medicament",
    "whatsapp pharmacie",
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}