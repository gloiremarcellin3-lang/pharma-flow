export default function CatalogueLoading() {
  return (
    <div className="shell py-10">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-72 animate-pulse rounded-3xl border border-white/70 bg-white/70" />
        ))}
      </div>
    </div>
  );
}