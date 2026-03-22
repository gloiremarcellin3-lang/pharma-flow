export type Medicine = {
  id: string;
  name: string;
  price: number;
  available: boolean;
  category: string;
};

export const pharmacyProfile = {
  name: "PharmaFlow Demo",
  city: "Paris",
  service: "Catalogue et demande via WhatsApp",
};

export const medicines: Medicine[] = [
  { id: "doliprane-500", name: "Doliprane 500mg", price: 1500, available: true, category: "Douleurs" },
  { id: "efferalgan-1000", name: "Efferalgan 1000mg", price: 2200, available: true, category: "Douleurs" },
  { id: "smecta", name: "Smecta", price: 1800, available: true, category: "Digestion" },
  { id: "ultra-levure", name: "Ultra Levure", price: 2700, available: true, category: "Digestion" },
  { id: "vitamine-c", name: "Vitamine C 1000", price: 2000, available: true, category: "Compléments" },
  { id: "bepanthen", name: "Bepanthen", price: 3200, available: true, category: "Soin" },
  { id: "gaviscon", name: "Gaviscon", price: 2600, available: true, category: "Digestion" },
  { id: "aspirine-upsa", name: "Aspirine UPSA", price: 1700, available: true, category: "Douleurs" },
  { id: "hextril", name: "Hextril", price: 2900, available: true, category: "Hygiène" },
  { id: "dafalgan", name: "Dafalgan 500mg", price: 1600, available: true, category: "Douleurs" },
  { id: "biafine", name: "Biafine", price: 3400, available: true, category: "Soin" },
  { id: "serum-physio", name: "Sérum Physiologique", price: 1200, available: true, category: "Hygiène" },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-FR").format(price) + " FCFA";
}

function normalizeValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function searchMedicines(products: Medicine[], query: string) {
  const normalizedQuery = normalizeValue(query);

  if (!normalizedQuery) {
    return products;
  }

  return products.filter((product) => normalizeValue(product.name).includes(normalizedQuery));
}