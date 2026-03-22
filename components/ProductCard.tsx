import Link from "next/link";

import type { Medicine } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import { createWhatsAppLink } from "@/lib/whatsapp";

type ProductCardProps = {
  product: Medicine;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="glass-panel flex h-full flex-col justify-between px-5 py-5 transition duration-200 hover:-translate-y-1">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold text-mint-700">
              {product.available ? "Disponible" : "Sur demande"}
            </span>
            <h3 className="mt-4 text-2xl font-semibold leading-tight text-slate-950">{product.name}</h3>
          </div>
          <div className="rounded-2xl bg-brand-50 px-3 py-2 text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-700">Prix</p>
            <p className="mt-1 text-lg font-semibold text-brand-700">{formatPrice(product.price)}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
            {product.category}
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
            Référence locale
          </span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-slate-500">Message généré: Bonjour, avez-vous {product.name} ?</p>
        <Link
          href={createWhatsAppLink(product.name)}
          target="_blank"
          rel="noreferrer"
          className="primary-button whitespace-nowrap"
        >
          Demander sur WhatsApp
        </Link>
      </div>
    </article>
  );
}