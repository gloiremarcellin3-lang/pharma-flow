import type { Metadata } from "next";
import Link from "next/link";

import { pharmacyProfile } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export const metadata: Metadata = buildPageMetadata({
  title: "Presentation de la pharmacie",
  description:
    "Decouvrez la pharmacie, son canal WhatsApp et le parcours simple pour demander la disponibilite des produits.",
  path: "/pharmacie",
  keywords: ["pharmacie", "contact pharmacie", "whatsapp pharmacie"],
});

export default function PharmacyPage() {
  return (
    <div className="shell py-10 sm:py-14">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="glass-panel px-6 py-8 sm:px-8 sm:py-10 animate-rise">
          <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
            Pharmacie
          </span>
          <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">{pharmacyProfile.name}</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Une page simple pour présenter la pharmacie, le canal de contact et le fonctionnement du service avant connexion à un back-office plus complet.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-brand-100 bg-brand-50/60 p-5">
              <p className="text-sm font-semibold text-slate-500">Canal principal</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">WhatsApp</p>
              <p className="mt-1 text-sm text-slate-600">+{WHATSAPP_NUMBER}</p>
            </div>
            <div className="rounded-3xl border border-mint-100 bg-mint-100/40 p-5">
              <p className="text-sm font-semibold text-slate-500">Positionnement</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Catalogue + demande rapide</p>
              <p className="mt-1 text-sm text-slate-600">Sans conseil médical intégré</p>
            </div>
          </div>
        </section>

        <section className="glass-panel px-6 py-8 sm:px-8 sm:py-10 animate-rise [animation-delay:120ms]">
          <h2 className="text-2xl font-semibold">Parcours utilisateur</h2>
          <div className="mt-6 space-y-4">
            {[
              "Le client parcourt le catalogue ou utilise la recherche.",
              "Il clique sur demander depuis une carte produit.",
              "WhatsApp s'ouvre avec le message pré-rempli.",
              "La pharmacie gère ensuite l'échange directement dans WhatsApp.",
            ].map((item, index) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-slate-100 bg-white/80 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/catalogue" className="primary-button">
              Ouvrir le catalogue
            </Link>
            <Link href="/search" className="secondary-button">
              Utiliser la recherche
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}