import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] items-center justify-center py-20">
      <div className="glass-panel max-w-xl px-8 py-12 text-center animate-rise">
        <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
          Erreur 404
        </span>
        <h1 className="mt-6 text-4xl font-semibold">Page introuvable</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Cette page n&apos;existe pas ou a été déplacée. Revenez au catalogue ou lancez une recherche pour demander un produit sur WhatsApp.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="primary-button">
            Retour à l&apos;accueil
          </Link>
          <Link href="/catalogue" className="secondary-button">
            Voir le catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}