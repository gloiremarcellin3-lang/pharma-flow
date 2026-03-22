import type { Metadata } from "next";

import { CatalogueView } from "@/components/CatalogueView";
import { medicines } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Catalogue des medicaments",
  description:
    "Parcourez le catalogue de medicaments, comparez les prix et lancez une demande de disponibilite sur WhatsApp.",
  path: "/catalogue",
  keywords: ["catalogue pharmacie", "liste medicaments", "prix pharmacie"],
});

export default function CataloguePage() {
  return (
    <div className="shell py-10 sm:py-14">
      <div className="max-w-3xl animate-rise">
        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
          Catalogue
        </span>
        <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">Tous les médicaments disponibles dans la V0</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Parcourez les produits, comparez les prix et ouvrez WhatsApp directement depuis chaque carte pour demander la disponibilité.
        </p>
      </div>

      <CatalogueView products={medicines} />
    </div>
  );
}