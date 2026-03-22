export default function Loading() {
  return (
    <div className="shell flex min-h-[60vh] items-center justify-center py-16">
      <div className="glass-panel flex w-full max-w-md flex-col items-center gap-4 px-8 py-10 text-center animate-rise">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
        <div>
          <p className="text-lg font-semibold text-slate-900">Chargement de l&apos;interface</p>
          <p className="mt-2 text-sm text-slate-500">Préparation du catalogue et de la recherche pharmacie.</p>
        </div>
      </div>
    </div>
  );
}