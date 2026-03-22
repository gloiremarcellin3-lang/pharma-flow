"use client";

import Link from "next/link";
import { startTransition, useDeferredValue, useEffect, useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import type { Medicine } from "@/lib/data";
import { searchMedicines } from "@/lib/data";
import { createWhatsAppLink } from "@/lib/whatsapp";

type SearchExperienceProps = {
  products: Medicine[];
};

export function SearchExperience({ products }: SearchExperienceProps) {
  const [query, setQuery] = useState("");
  const [isReady, setIsReady] = useState(false);
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsReady(true), 350);

    return () => window.clearTimeout(timeout);
  }, []);

  const results = searchMedicines(products, deferredQuery);
  const hasQuery = deferredQuery.trim().length > 0;
  const isBusy = query !== deferredQuery;

  return (
    <div className="mt-10 space-y-6">
      <SearchBar
        value={query}
        onChange={(value) => startTransition(() => setQuery(value))}
        placeholder="Ex: Doliprane, Smecta, Vitamine C"
        resultsCount={results.length}
        isBusy={isBusy}
      />

      {!isReady ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-72 animate-pulse rounded-3xl border border-white/70 bg-white/70" />
          ))}
        </div>
      ) : hasQuery && results.length === 0 ? (
        <div className="glass-panel px-6 py-8 text-center animate-rise">
          <h2 className="text-2xl font-semibold text-slate-950">Aucun produit trouvé</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Aucun produit ne correspond à votre recherche actuelle. Vous pouvez tout de même contacter la pharmacie avec votre demande saisie.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={createWhatsAppLink(deferredQuery)}
              target="_blank"
              rel="noreferrer"
              className="primary-button"
            >
                Demander &quot;{deferredQuery}&quot; sur WhatsApp
            </Link>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="secondary-button"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              {hasQuery
                  ? `Résultats pour « ${deferredQuery} »`
                : "Commencez à taper pour filtrer le catalogue en temps réel."}
            </p>
            {hasQuery ? (
              <Link
                href={createWhatsAppLink(deferredQuery)}
                target="_blank"
                rel="noreferrer"
                className="secondary-button"
              >
                Demander cette recherche sur WhatsApp
              </Link>
            ) : null}
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {(hasQuery ? results : products).map((product, index) => (
              <div key={product.id} className="animate-rise" style={{ animationDelay: `${index * 60}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}