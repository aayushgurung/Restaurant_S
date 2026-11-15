export const categories = [
  "All items",
  "Featured Items",
  "Extras",
  "Hot Coffee",
  "Premium Tea",
  "Iced Coffee & Cold Drinks",
  "Fresh Juices",
  "Smoothies",
  "Milkshakes",
  "Lunch",
] as const;

export type Category = (typeof categories)[number];
type MenuSection = Exclude<Category, "All items" | "Featured Items">;
export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuSection;
  image: string;
  featured: boolean;
  badge?: string;
};
type MenuRow = readonly [
  id: string,
  name: string,
  price: number,
  image: string,
  description?: string,
];

// Owner-supplied menu, with AUD prices stored in cents. Featured items share
// their canonical product IDs with Extras/Lunch, so carts never duplicate them.
// No dietary or allergen claims are inferred from item names.
const sections: { category: MenuSection; items: MenuRow[] }[] = [
  {
    category: "Extras",
    items: [
      ["biscoff-croissant", "Biscoff Croissant", 900, "croissant"],
      [
        "chocolate-croissant",
        "Chocolate Croissant",
        900,
        "chocolate-croissant",
      ],
      [
        "cheese-tomato-croissant",
        "Cheese and Tomato Croissant",
        850,
        "croissant-cheese",
      ],
      [
        "ham-cheese-croissant",
        "Ham and Cheese Croissant",
        900,
        "croissant-savoury",
      ],
      [
        "ham-cheese-tomato-croissant",
        "Ham, Cheese and Tomato Croissant",
        1000,
        "croissant-savoury",
      ],
      ["plain-croissant", "Plain Croissant", 750, "croissant"],
      ["nutella-croissant", "Nutella Croissant", 1000, "chocolate-croissant"],
    ],
  },
  {
    category: "Hot Coffee",
    items: [
      ["latte", "Latte", 450, "latte"],
      ["espresso", "Espresso", 350, "espresso"],
      ["piccolo-latte", "Piccolo Latte", 400, "latte"],
      ["long-black", "Long Black", 450, "espresso"],
      ["mocha", "Mocha", 500, "latte"],
      ["chai-latte", "Chai Latte", 500, "latte"],
      ["hot-chocolate", "Hot Chocolate", 500, "latte"],
      ["babychino", "Babychino", 200, "latte"],
      ["double-espresso", "Double Espresso", 400, "espresso"],
      ["macchiato", "Macchiato", 400, "latte"],
    ],
  },
  {
    category: "Premium Tea",
    items: [
      ["english-breakfast-tea", "English Breakfast Tea", 450, "tea"],
      ["peppermint-tea", "Peppermint Tea", 450, "tea"],
      ["chamomile-tea", "Chamomile Tea", 450, "tea"],
      ["lemongrass-ginger-tea", "Lemongrass & Ginger Tea", 450, "tea"],
      ["sticky-chai-tea", "Sticky Chai Tea", 550, "tea"],
      ["earl-grey", "Earl Grey", 450, "tea"],
      ["green-tea", "Green Tea", 450, "tea"],
    ],
  },
  {
    category: "Iced Coffee & Cold Drinks",
    items: [
      ["iced-latte", "Iced Latte", 600, "iced-coffee"],
      ["iced-chocolate", "Iced Chocolate", 600, "iced-coffee"],
      ["iced-chai-latte", "Iced Chai Latte", 600, "iced-coffee"],
      ["affogato", "Affogato", 700, "iced-coffee"],
      ["coffee-frappe", "Coffee Frappe", 800, "iced-coffee"],
      ["mocha-frappe", "Mocha Frappe", 800, "iced-coffee"],
      ["vanilla-frappe", "Vanilla Frappe", 800, "iced-coffee"],
      ["caramel-frappe", "Caramel Frappe", 800, "iced-coffee"],
      ["iced-long-black", "Iced Long Black", 600, "iced-coffee"],
      ["iced-mocha", "Iced Mocha", 600, "iced-coffee"],
    ],
  },
  {
    category: "Fresh Juices",
    items: [
      ["orange-juice", "Orange Juice", 1000, "juice"],
      ["apple-carrot-ginger", "Apple, Carrot & Ginger", 1000, "juice"],
      ["orange-apple-mint", "Orange, Apple & Mint", 1000, "juice"],
      [
        "green-detox",
        "Green Detox",
        1000,
        "juice",
        "Apple, celery, cucumber and spinach.",
      ],
      ["apple-juice", "Apple Juice", 1000, "juice"],
      ["carrot-orange-juice", "Carrot & Orange Juice", 1000, "juice"],
    ],
  },
  {
    category: "Smoothies",
    items: [
      [
        "protein-smoothie",
        "Protein Smoothie",
        1000,
        "smoothie",
        "Banana, peanut butter and oats.",
      ],
      ["mix-berries-smoothie", "Mix Berries Smoothie", 900, "smoothie"],
      [
        "tropical-smoothie",
        "Tropical Smoothie",
        1000,
        "smoothie",
        "Mango, pineapple and banana.",
      ],
      [
        "peanut-butter-banana-smoothie",
        "Peanut Butter Banana Smoothie",
        1000,
        "smoothie",
      ],
      ["strawberry-smoothie", "Strawberry Smoothie", 900, "smoothie"],
      ["banana-smoothie", "Banana Smoothie", 900, "smoothie"],
    ],
  },
  {
    category: "Milkshakes",
    items: [
      ["chocolate-milkshake", "Chocolate", 800, "milkshake"],
      ["caramel-milkshake", "Caramel", 800, "milkshake"],
      ["banana-milkshake", "Banana", 800, "milkshake"],
      ["vanilla-milkshake", "Vanilla", 800, "milkshake"],
      ["strawberry-milkshake", "Strawberry", 800, "milkshake"],
    ],
  },
  {
    category: "Lunch",
    items: [
      [
        "egg-fried-rice",
        "Egg Fried Rice",
        1300,
        "fried-rice",
        "Onion, carrots, peas and eggs.",
      ],
      [
        "nepalese-chicken-curry",
        "Nepalese Chicken Curry",
        1350,
        "chicken-curry",
      ],
      [
        "chicken-curry-half",
        "Nepalese Chicken Curry with Rice or Naan (half)",
        1450,
        "chicken-curry",
      ],
      [
        "chicken-curry-full",
        "Nepalese Chicken Curry with Rice or Naan (full)",
        1950,
        "chicken-curry",
      ],
      ["daal-gravy", "Daal Gravy", 1250, "dal", "Lentil gravy."],
      ["rajma-curry", "Rajma Curry", 1300, "rajma"],
    ],
  },
];

const featuredIds = ["ham-cheese-tomato-croissant", "egg-fried-rice"];
export const dishes: Dish[] = sections.flatMap(({ category, items }) =>
  items.map(([id, name, price, image, description = ""]) => ({
    id,
    name,
    price,
    category,
    description,
    image: image === "tea" ? "tea" : `menu/${image}`,
    featured: featuredIds.includes(id),
    ...(featuredIds.includes(id) ? { badge: "Featured item" } : {}),
  })),
);
export const featuredDishes = featuredIds.map((id) =>
  dishes.find((d) => d.id === id)!,
);
export const homeDishes = [
  ...featuredDishes,
  dishes.find((d) => d.id === "latte")!,
];

export function matchesCategory(dish: Dish, category: Category) {
  return (
    category === "All items" ||
    (category === "Featured Items" ? dish.featured : dish.category === category)
  );
}
export function itemLabel(dish: Dish) {
  return dish.category === "Milkshakes" ? `${dish.name} Milkshake` : dish.name;
}
export function money(cents: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(cents / 100);
}
