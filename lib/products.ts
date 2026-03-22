/**
 * Local product catalogue used by the bot.
 * Intentionally mixes available: true and available: false to exercise all code paths.
 */
export type Product = {
  name: string;
  price: number;
  available: boolean;
};

export const products: Product[] = [
  { name: "Doliprane 500mg", price: 1500, available: true },
  { name: "Doliprane 1000mg", price: 2000, available: false },
  { name: "Efferalgan 1000mg", price: 2200, available: true },
  { name: "Smecta", price: 1800, available: false },
  { name: "Ultra Levure", price: 2700, available: true },
  { name: "Vitamine C 1000", price: 2000, available: false },
  { name: "Bepanthen", price: 3200, available: true },
  { name: "Gaviscon", price: 2600, available: false },
  { name: "Aspirine UPSA", price: 1700, available: true },
  { name: "Hextril", price: 2900, available: false },
  { name: "Dafalgan 500mg", price: 1600, available: true },
  { name: "Biafine", price: 3400, available: false },
  { name: "Sérum Physiologique", price: 1200, available: true },
  { name: "Paracétamol 500mg", price: 1400, available: true },
  { name: "Ibuprofène 400mg", price: 1900, available: false },
];
