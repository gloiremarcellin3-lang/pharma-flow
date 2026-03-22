import type { Metadata } from "next";

import { SearchExperience } from "@/components/SearchExperience";
import { medicines } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Recherche de medicament",
  description:
    "Recherchez rapidement un medicament puis ouvrez WhatsApp avec un message pre-rempli vers la pharmacie.",
  path: "/search",
  keywords: ["recherche medicament", "demande medicament", "pharmacie whatsapp"],
});

export default function SearchPage() {
  return (
    <div className="shell py-10 sm:py-14">
      <div className="max-w-3xl animate-rise">
        <span className="inline-flex rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-mint-700">
          Recherche rapide
        </span>
        <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">Chercher un médicament puis ouvrir WhatsApp</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Tapez quelques lettres, filtrez instantanément les résultats puis cliquez sur demander pour envoyer un message dynamique à la pharmacie.
        </p>
      </div>

      <SearchExperience products={medicines} />
    </div>
  );
}