"use client";

import { useEffect, useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import type { Medicine } from "@/lib/data";

type CatalogueViewProps = {
  products: Medicine[];
};

type SortValue = "default" | "price-asc" | "price-desc";

export function CatalogueView({ products }: CatalogueViewProps) {
  const [sortBy, setSortBy] = useState<SortValue>("default");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 450);

    return () => window.clearTimeout(timeout);
  }, []);

  const sortedProducts = [...products].sort((first, second) => {
    if (sortBy === "price-asc") {
      return first.price - second.price;
    }

    if (sortBy === "price-desc") {
      return second.price - first.price;
    }

    return first.name.localeCompare(second.name, "fr");
  });

  return (
    <div className="mt-10 space-y-6">
      <div className="glass-panel flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-semibold text-slate-900">{products.length} produits disponibles dans cette démonstration</p>
          <p className="mt-1 text-sm text-slate-500">Tri simple par prix pour accélérer les démonstrations produit.</p>
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-slate-600">
          Trier par
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortValue)}
            className="rounded-full border border-brand-100 bg-white px-4 py-3 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          >
            <option value="default">Nom A-Z</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </label>
      </div>

      {isLoading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-72 animate-pulse rounded-3xl border border-white/70 bg-white/70" />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sortedProducts.map((product, index) => (
            <div key={product.id} className="animate-rise" style={{ animationDelay: `${index * 70}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}