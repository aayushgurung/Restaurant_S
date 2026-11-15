export const categories = [
  "All dishes",
  "Momo",
  "Mains",
  "Sides",
  "Drinks",
  "Desserts",
] as const;
export type Category = (typeof categories)[number];
export type Dish = {
  id: string;
  name: string;
  nepali: string;
  description: string;
  price: number;
  category: Exclude<Category, "All dishes">;
  image: string;
  tags: ("V" | "VG" | "GF" | "Spicy")[];
  badge?: string;
};

// Illustrative dishes and prices. Cents keep cart arithmetic exact.
export const dishes: Dish[] = [
  {
    id: "chicken-momo",
    name: "Signature chicken momo",
    nepali: "चिकेन मःमः",
    description:
      "Ten hand-folded dumplings, gently steamed. Tomato-sesame achar on the side.",
    price: 1800,
    category: "Momo",
    image: "momo-steamed",
    tags: [],
    badge: "A house favourite",
  },
  {
    id: "jhol-momo",
    name: "Kathmandu jhol momo",
    nepali: "झोल मःमः",
    description:
      "Tender chicken dumplings with a warming, tangy sesame and tomato broth.",
    price: 2050,
    category: "Momo",
    image: "momo-table",
    tags: ["Spicy"],
    badge: "Comfort in a bowl",
  },
  {
    id: "veg-momo",
    name: "Garden vegetable momo",
    nepali: "भेज मःमः",
    description:
      "Cabbage, carrot and fragrant ginger, wrapped by hand and steamed to order.",
    price: 1700,
    category: "Momo",
    image: "momo",
    tags: ["VG"],
  },
  {
    id: "thali",
    name: "The Nepali thali",
    nepali: "नेपाली थाली",
    description:
      "A little of everything. Seasonal vegetable curry, dal, roti, pickles and yoghurt.",
    price: 2850,
    category: "Mains",
    image: "thali",
    tags: ["V"],
    badge: "Nepal on a plate",
  },
  {
    id: "rice",
    name: "Himalayan fried rice",
    nepali: "फ्राइड राइस",
    description:
      "Wok-tossed rice, seasonal vegetables, fresh herbs and our house spice blend.",
    price: 1950,
    category: "Mains",
    image: "rice",
    tags: ["V"],
  },
  {
    id: "momo-platter",
    name: "Momo sharing platter",
    nepali: "मःमः प्लेटर",
    description:
      "Steamed, pan-fried and chilli-tossed momo. Three ways, made for sharing.",
    price: 3200,
    category: "Mains",
    image: "momo",
    tags: ["Spicy"],
  },
  {
    id: "achar",
    name: "House tomato achar",
    nepali: "गोलभेंडाको अचार",
    description:
      "Roasted tomato, sesame, coriander and a gentle hint of chilli.",
    price: 500,
    category: "Sides",
    image: "momo-table",
    tags: ["VG", "GF", "Spicy"],
  },
  {
    id: "roti",
    name: "Warm roti",
    nepali: "रोटी",
    description: "Two soft wholemeal flatbreads, fresh from the griddle.",
    price: 600,
    category: "Sides",
    image: "thali",
    tags: ["VG"],
  },
  {
    id: "chiya",
    name: "House masala chiya",
    nepali: "मसला चिया",
    description:
      "Slow-brewed black tea, milk, cardamom and warming whole spices.",
    price: 550,
    category: "Drinks",
    image: "tea",
    tags: ["V", "GF"],
  },
  {
    id: "iced-tea",
    name: "Himalayan iced tea",
    nepali: "आइस चिया",
    description:
      "A refreshing black tea infusion with lemon and a touch of mint.",
    price: 650,
    category: "Drinks",
    image: "tea",
    tags: ["VG", "GF"],
  },
  {
    id: "yoghurt",
    name: "Juju dhau",
    nepali: "जुजु धौ",
    description:
      "Our take on Bhaktapur’s king of yoghurt. Creamy, gently sweet and finished with cardamom.",
    price: 950,
    category: "Desserts",
    image: "yoghurt",
    tags: ["V", "GF"],
  },
];
export function money(cents: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(cents / 100);
}
