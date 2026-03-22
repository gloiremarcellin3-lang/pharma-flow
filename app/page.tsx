import type { Metadata } from "next";
import Link from "next/link";

import { ProductCard } from "@/components/ProductCard";
import { medicines, pharmacyProfile } from "@/lib/data";
import { buildPageMetadata, siteConfig } from "@/lib/seo";

const featuredProducts = medicines.slice(0, 3);

export const metadata: Metadata = buildPageMetadata({
  title: "Catalogue pharmacie et demande WhatsApp",
  description:
    "Consultez des medicaments, comparez les prix et contactez rapidement la pharmacie via WhatsApp.",
  path: "/",
  keywords: ["pharmacie en ligne", "catalogue medicaments", "prix medicaments", "contact pharmacie whatsapp"],
});

export default function HomePage() {
  const pharmacySchema = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: pharmacyProfile.name,
    description: siteConfig.description,
    areaServed: pharmacyProfile.city,
    url: siteConfig.siteUrl,
    knowsAbout: ["medicaments", "parapharmacie", "demande via WhatsApp"],
  };

  return (
    <div className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pharmacySchema) }}
      />
      <section className="shell pt-8 sm:pt-12">
        <div className="glass-panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-grid bg-[size:22px_22px] opacity-60 lg:block" />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="animate-rise">
              <span className="inline-flex rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-mint-700">
                SaaS pharmacie V0
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Trouver un médicament et lancer la demande sur WhatsApp en quelques secondes.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                PharmaFlow simplifie la mise en relation entre une pharmacie et ses clients: catalogue lisible, recherche instantanée, prix visibles et message WhatsApp pré-rempli.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/search" className="primary-button">
                  Rechercher un médicament
                </Link>
                <Link href="/catalogue" className="secondary-button">
                  Explorer le catalogue
                </Link>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-brand-100 bg-white/80 p-4">
                  <p className="text-2xl font-semibold text-brand-700">{medicines.length}</p>
                  <p className="mt-1 text-sm text-slate-500">médicaments référencés</p>
                </div>
                <div className="rounded-2xl border border-brand-100 bg-white/80 p-4">
                  <p className="text-2xl font-semibold text-brand-700">24/7</p>
                  <p className="mt-1 text-sm text-slate-500">prise de contact WhatsApp</p>
                </div>
                <div className="rounded-2xl border border-brand-100 bg-white/80 p-4">
                  <p className="text-2xl font-semibold text-brand-700">Mobile</p>
                  <p className="mt-1 text-sm text-slate-500">parfaitement responsive</p>
                </div>
              </div>
            </div>

            <div className="animate-rise rounded-[2rem] border border-white/60 bg-white/90 p-5 shadow-soft [animation-delay:120ms]">
              <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>{pharmacyProfile.name}</span>
                  <span>WhatsApp direct</span>
                </div>
                <div className="mt-6 rounded-3xl bg-white/10 p-5 backdrop-blur">
                  <p className="text-sm text-white/70">Exemple de demande</p>
                  <p className="mt-3 text-lg font-semibold">Bonjour, avez-vous Doliprane 500mg ?</p>
                </div>
                <div className="mt-6 grid gap-3 text-sm text-white/80">
                  <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                    <span>Catalogue clair</span>
                    <span>Prix visibles</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3">
                    <span>Recherche rapide</span>
                    <span>Réponse humaine</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell mt-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Produits mis en avant</p>
            <h2 className="section-title mt-3">Une V0 pensée pour être montrée rapidement</h2>
            <p className="section-copy mt-4">
              Le parcours est volontairement simple: voir les produits, chercher un nom, puis ouvrir WhatsApp avec un message déjà rédigé.
            </p>
          </div>
          <Link href="/catalogue" className="secondary-button">
            Tout le catalogue
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <div key={product.id} style={{ animationDelay: `${index * 90}ms` }} className="animate-rise">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section className="shell mt-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Catalogue instantané",
              copy: "Les produits et prix sont visibles immédiatement, sans création de compte côté client.",
            },
            {
              title: "Recherche en temps réel",
              copy: "Le filtre réagit dès la saisie pour trouver rapidement un nom de médicament.",
            },
            {
              title: "Contact WhatsApp pré-rempli",
              copy: "Chaque clic déclenche un message clair pour accélérer la conversation avec la pharmacie.",
            },
          ].map((feature, index) => (
            <div key={feature.title} className="glass-panel animate-rise px-6 py-7" style={{ animationDelay: `${index * 100}ms` }}>
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{feature.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}