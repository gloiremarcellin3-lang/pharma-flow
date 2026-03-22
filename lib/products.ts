export type Product = {
  name: string;
  price: number;
  available: boolean;
};

export const products: Product[] = [
  {
    name: "Doliprane 500mg",
    price: 1500,
    available: true,
  },
  {
    name: "Doliprane 1000mg",
    price: 2000,
    available: false,
  },
  {
    name: "Aspirine UPSA",
    price: 1700,
    available: true,
  },
  {
    name: "Smecta",
    price: 1800,
    available: false,
  },
  {
    name: "Gaviscon",
    price: 2600,
    available: true,
  },
  {
    name: "Dafalgan 500mg",
    price: 1600,
    available: true,
  },
  {
    name: "Hextril",
    price: 2900,
    available: false,
  },
  {
    name: "Biafine",
    price: 3400,
    available: true,
  },
];
