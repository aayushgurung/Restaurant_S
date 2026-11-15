"use client";
import Image from "next/image";
import { useState } from "react";
import { Search, Plus, X, ShoppingBag } from "lucide-react";
import {
  categories,
  dishes,
  money,
  matchesCategory,
  itemLabel,
  type Category,
} from "@/lib/menu";
import { useCart } from "@/components/providers/cart-provider";

export function MenuBrowser({ ordering = false }: { ordering?: boolean }) {
  const [category, setCategory] = useState<Category>("All items");
  const [query, setQuery] = useState("");
  const { add } = useCart();
  const visible = dishes.filter(
    (d) =>
      matchesCategory(d, category) &&
      `${itemLabel(d)} ${d.description} ${d.category}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div
      className={ordering ? "menu-browser menu-browser--order" : "menu-browser"}
    >
      <div className="menu-controls">
        <div className="filter-tabs" role="group" aria-label="Dish categories">
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? "active" : ""}
              aria-pressed={category === c}
              onClick={(event) => {
                setCategory(c);
                event.currentTarget.scrollIntoView({
                  block: "nearest",
                  inline: "nearest",
                });
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="menu-search-row">
          <label className="search-field">
            <Search size={17} />
            <span className="sr-only">Search menu items</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find your favourite…"
            />
          </label>
          <label className="menu-section-select">
            <span className="sr-only">Menu section</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="menu-results-label">
        <span>
          {category === "All items" ? "Something for every appetite" : category}
        </span>
        <span aria-live="polite">
          {visible.length} {visible.length === 1 ? "item" : "items"}
        </span>
      </div>
      <div className="menu-list">
        {visible.map((d) => (
          <article key={d.id} className="menu-item" data-item-id={d.id}>
            <div className="menu-item-image">
              <Image
                src={`/images/${d.image}.webp`}
                alt={`${itemLabel(d)} — illustrative photo`}
                fill
                sizes="(max-width: 640px) 90px, 140px"
              />
            </div>
            <div className="menu-item-body">
              <div className="menu-item-top">
                <h3>{d.name}</h3>
                <span>{money(d.price)}</span>
              </div>
              {d.description && <p>{d.description}</p>}
              <div className="menu-item-bottom">
                <span className="menu-item-category">{d.category}</span>
                <button
                  className="add-button"
                  onClick={() => add(d.id)}
                  aria-label={`Add ${itemLabel(d)} to order`}
                >
                  <Plus size={15} />
                  <span>{ordering ? "Add" : "Add to order"}</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 && (
        <div className="empty-state">
          <ShoppingBag size={32} />
          <h3>No items found</h3>
          <p>Try another search or explore the full menu.</p>
          <button
            className="button button--outline"
            onClick={() => {
              setCategory("All items");
              setQuery("");
            }}
          >
            <X size={15} />
            Clear filters
          </button>
        </div>
      )}
      <p className="menu-legend">
        <span>All prices in AUD</span>
        <span>Photos are illustrative</span>
      </p>
      <p className="allergy-note">
        Food brings us together. If you have an allergy, please let us know
        before ordering. Our kitchen handles common allergens.
      </p>
    </div>
  );
}
