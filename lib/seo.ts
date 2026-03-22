import type { Metadata } from "next";

const FALLBACK_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(rawUrl: string) {
  return rawUrl.replace(/\/$/, "");
}

function getSiteUrl() {
  const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!envSiteUrl) {
    return FALLBACK_SITE_URL;
  }

  try {
    return normalizeSiteUrl(new URL(envSiteUrl).toString());
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export const siteConfig = {
  name: "PharmaFlow",
  title: "PharmaFlow | Catalogue pharmacie et demande WhatsApp",
  description:
    "Catalogue de pharmacie avec recherche rapide et redirection WhatsApp pour demander la disponibilite des medicaments.",
  locale: "fr_FR",
  siteUrl: getSiteUrl(),
};

export function getMetadataBase() {
  return new URL(siteConfig.siteUrl);
}

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function buildPageMetadata({ title, description, path, keywords = [] }: BuildPageMetadataInput): Metadata {
  const canonicalUrl = `${siteConfig.siteUrl}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
