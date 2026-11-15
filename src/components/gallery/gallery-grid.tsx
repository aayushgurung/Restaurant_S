"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, X } from "lucide-react";
const photos = [
  {
    image: "momo-steamed",
    category: "Dishes",
    caption: "Little parcels of happiness.",
    alt: "Nepali steamed momo served with dipping sauce",
  },
  {
    image: "restaurant",
    category: "Interior",
    caption: "Find your favourite corner.",
    alt: "Warm timber tables and soft lighting in a welcoming restaurant",
  },
  {
    image: "thali",
    category: "Dishes",
    caption: "A whole lot of home on one plate.",
    alt: "Thali with fresh roti, vegetable curry and dal",
  },
  {
    image: "tea",
    category: "Dishes",
    caption: "There’s always time for chiya.",
    alt: "A warming cup of tea",
  },
  {
    image: "gathering",
    category: "Events",
    caption: "The table is only the beginning.",
    alt: "Dining table set for an intimate celebration",
  },
  {
    image: "momo",
    category: "Dishes",
    caption: "One plate. So many favourites.",
    alt: "A platter of steamed, fried and spiced dumplings",
  },
  {
    image: "kitchen",
    category: "Interior",
    caption: "Where the good things begin.",
    alt: "Fresh ingredients being prepared in a kitchen",
  },
  {
    image: "momo-table",
    category: "Dishes",
    caption: "Made to share. Hard to resist.",
    alt: "A circular plate of Nepali momo with achar",
  },
  {
    image: "yoghurt",
    category: "Dishes",
    caption: "End on a sweet little note.",
    alt: "A creamy yoghurt dessert with fresh fruit",
  },
  {
    image: "himalayas",
    category: "Events",
    caption: "A little inspiration from our roots.",
    alt: "A majestic mountain landscape, inspiration for our Himalayan evenings",
  },
];
export function GalleryGrid() {
  const [category, setCategory] = useState("All");
  const [limit, setLimit] = useState(6);
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const filtered = photos.filter(
    (p) => category === "All" || p.category === category,
  );
  const photo = filtered[selected] || filtered[0];
  function move(delta: number) {
    setSelected(
      (current) => (current + delta + filtered.length) % filtered.length,
    );
  }
  return (
    <>
      <div
        className="filter-tabs gallery-filters"
        role="group"
        aria-label="Gallery categories"
      >
        {["All", "Dishes", "Interior", "Events"].map((c) => (
          <button
            key={c}
            className={category === c ? "active" : ""}
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setLimit(6);
              setSelected(0);
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {filtered.slice(0, limit).map((p, i) => (
          <button
            className="gallery-tile"
            key={p.image}
            aria-label={`View ${p.alt}`}
            onClick={() => {
              setSelected(i);
              dialog.current?.showModal();
            }}
          >
            <Image
              src={`/images/${p.image}.webp`}
              alt={p.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 45vw"
            />
            <span className="gallery-tile-caption">
              {p.caption}
              <ArrowUpRight size={21} />
            </span>
            <span className="gallery-category">{p.category}</span>
          </button>
        ))}
      </div>
      {limit < filtered.length && (
        <div className="gallery-load-more">
          <button
            className="button button--outline"
            onClick={() => setLimit((n) => n + 6)}
          >
            A few more moments
            <Plus size={16} />
          </button>
        </div>
      )}
      <p className="gallery-sample-note">
        A moodboard of food, spaces and inspiration. All imagery is
        illustrative.
      </p>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Photo gallery"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        <button
          className="icon-button lightbox-close"
          aria-label="Close photo"
          onClick={() => dialog.current?.close()}
        >
          <X />
        </button>
        <div className="lightbox-image">
          <Image
            src={`/images/${photo.image}.webp`}
            alt={photo.alt}
            fill
            sizes="90vw"
          />
        </div>
        <div className="lightbox-bottom">
          <p aria-live="polite">
            {photo.caption}
            <small>
              {selected + 1} / {filtered.length}
            </small>
          </p>
          <div>
            <button
              className="icon-button"
              aria-label="Previous photo"
              onClick={() => move(-1)}
            >
              <ArrowLeft />
            </button>
            <button
              className="icon-button"
              aria-label="Next photo"
              onClick={() => move(1)}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
