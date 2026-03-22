import type { Metadata } from "next";

const FALLBACK_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(rawUrl: string) {
  const value = rawUrl.trim();
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  return withProtocol.replace(/\/$/, "");
}

function getSiteUrl() {
  const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const vercelPreviewUrl = process.env.VERCEL_URL;
  const candidateUrl = envSiteUrl ?? vercelProductionUrl ?? vercelPreviewUrl;

  if (!candidateUrl) {
    return FALLBACK_SITE_URL;
  }

  try {
    return normalizeSiteUrl(new URL(normalizeSiteUrl(candidateUrl)).toString());
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
