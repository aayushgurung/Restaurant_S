"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { dishes, itemLabel } from "@/lib/menu";
type CartLine = { id: string; quantity: number };
type CartContextValue = {
  items: CartLine[];
  count: number;
  subtotal: number;
  add: (id: string) => void;
  change: (id: string, delta: number) => void;
  clear: () => void;
  notice: string;
};
const CartContext = createContext<CartContextValue | null>(null);
const key = "shaswat-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(key) || "[]");
      if (Array.isArray(stored)) {
        const unique = new Map<string, number>();
        for (const item of stored)
          if (
            item &&
            dishes.some((d) => d.id === item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
          )
            unique.set(item.id, Math.min(item.quantity, 99));
        setItems(Array.from(unique, ([id, quantity]) => ({ id, quantity })));
      }
    } catch {
      /* A disabled or full storage area must not prevent ordering. */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(key, JSON.stringify(items));
      } catch {
        /* Cart remains usable in memory. */
      }
    }
  }, [items, ready]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2500);
    return () => clearTimeout(timer);
  }, [notice]);
  function add(id: string) {
    const dish = dishes.find((d) => d.id === id);
    if (!dish) return;
    setItems((current) =>
      current.some((i) => i.id === id)
        ? current.map((i) =>
            i.id === id ? { ...i, quantity: Math.min(99, i.quantity + 1) } : i,
          )
        : [...current, { id, quantity: 1 }],
    );
    setNotice(`${itemLabel(dish)} added to your bag`);
  }
  function change(id: string, delta: number) {
    setItems((current) =>
      current
        .map((i) =>
          i.id === id
            ? { ...i, quantity: Math.min(99, i.quantity + delta) }
            : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce(
    (sum, i) =>
      sum + (dishes.find((d) => d.id === i.id)?.price || 0) * i.quantity,
    0,
  );
  return (
    <CartContext.Provider
      value={{
        items,
        count,
        subtotal,
        add,
        change,
        clear: () => setItems([]),
        notice,
      }}
    >
      {children}
      <div
        className={`toast ${notice ? "toast--visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice}
      </div>
    </CartContext.Provider>
  );
}
export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart requires CartProvider");
  return cart;
}
