import Link from "next/link";

const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/search", label: "Recherche" },
  { href: "/pharmacie", label: "Pharmacie" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid bg-[size:28px_28px] opacity-40" />
      <header className="shell sticky top-0 z-30 py-4">
        <div className="glass-panel flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link href="/" className="flex items-center gap-3 text-slate-950">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-mint-500 text-lg font-semibold text-white">
              P
            </span>
            <div>
              <p className="font-display text-lg font-semibold">PharmaFlow</p>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Catalogue WhatsApp</p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="shell pb-8 pt-4">
        <div className="glass-panel flex flex-col gap-4 px-6 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>V0 SaaS pharmacie sans logique médicale, orientée catalogue et contact WhatsApp.</p>
          <p>Next.js App Router • TypeScript • Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}