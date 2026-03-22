export default function SearchLoading() {
  return (
    <div className="shell py-10">
      <div className="glass-panel animate-pulse px-6 py-8">
        <div className="h-12 rounded-2xl bg-slate-100" />
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-64 rounded-3xl bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  );
}