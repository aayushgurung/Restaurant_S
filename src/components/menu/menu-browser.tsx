"use client";
import Image from "next/image";
import { useState } from "react";
import { Search, Plus, Leaf, X, ShoppingBag } from "lucide-react";
import { categories, dishes, money, type Category } from "@/lib/menu";
import { useCart } from "@/components/providers/cart-provider";

export function MenuBrowser({ ordering = false }: { ordering?: boolean }) {
  const [category, setCategory] = useState<Category>("All dishes");
  const [query, setQuery] = useState("");
  const [vegetarian, setVegetarian] = useState(false);
  const { add } = useCart();
  const visible = dishes.filter(
    (d) =>
      (category === "All dishes" || d.category === category) &&
      (!vegetarian || d.tags.includes("V") || d.tags.includes("VG")) &&
      `${d.name} ${d.description}`.toLowerCase().includes(query.toLowerCase()),
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
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="menu-search-row">
          <label className="search-field">
            <Search size={17} />
            <span className="sr-only">Search dishes</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find your favourite…"
            />
          </label>
          <button
            className={`vegetarian-filter ${vegetarian ? "active" : ""}`}
            aria-pressed={vegetarian}
            onClick={() => setVegetarian(!vegetarian)}
          >
            <Leaf size={15} />
            Vegetarian
          </button>
        </div>
      </div>
      <div className="menu-results-label">
        <span>
          {category === "All dishes"
            ? "Something for every appetite"
            : category === "Momo"
              ? "Little parcels. Big feelings."
              : category}
        </span>
        <span aria-live="polite">{visible.length} dishes</span>
      </div>
      <div className="menu-list">
        {visible.map((d) => (
          <article key={d.id} className="menu-item">
            <div className="menu-item-image">
              <Image
                src={`/images/${d.image}.webp`}
                alt={d.name}
                fill
                sizes="(max-width: 640px) 90px, 140px"
              />
            </div>
            <div className="menu-item-body">
              <div className="menu-item-top">
                <h3>{d.name}</h3>
                <span>{money(d.price)}</span>
              </div>
              <p>{d.description}</p>
              <div className="menu-item-bottom">
                <div className="dietary-tags">
                  {d.tags.map((t) => (
                    <span className={t === "Spicy" ? "tag-spicy" : ""} key={t}>
                      {t}
                    </span>
                  ))}
                  {d.tags.length === 0 && (
                    <span className="tag-label">Hand-folded daily</span>
                  )}
                </div>
                <button
                  className="add-button"
                  onClick={() => add(d.id)}
                  aria-label={`Add ${d.name} to order`}
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
          <h3>No dishes found</h3>
          <p>Try another search or explore the full menu.</p>
          <button
            className="button button--outline"
            onClick={() => {
              setCategory("All dishes");
              setQuery("");
              setVegetarian(false);
            }}
          >
            <X size={15} />
            Clear filters
          </button>
        </div>
      )}
      <p className="menu-legend">
        <span>V · Vegetarian</span>
        <span>VG · Vegan</span>
        <span>GF · Gluten-free</span>
        <span>All prices in AUD</span>
      </p>
      <p className="allergy-note">
        Food brings us together. If you have an allergy, please let us know
        before ordering. Our kitchen handles common allergens.
      </p>
    </div>
  );
}
