type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultsCount: number;
  isBusy?: boolean;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Rechercher un médicament",
  resultsCount,
  isBusy = false,
}: SearchBarProps) {
  return (
    <div className="glass-panel px-5 py-5 sm:px-6">
      <label htmlFor="medicine-search" className="text-sm font-semibold text-slate-700">
        Recherche médicament
      </label>
      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <input
            id="medicine-search"
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="w-full rounded-2xl border border-brand-100 bg-white px-4 py-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Live
          </span>
        </div>
        <div className="rounded-2xl bg-brand-50 px-4 py-3 text-sm text-brand-700">
          {isBusy ? "Recherche..." : `${resultsCount} résultat${resultsCount > 1 ? "s" : ""}`}
        </div>
      </div>
    </div>
  );
}