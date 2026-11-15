import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Dish, money } from "@/lib/menu";
export function DishCard({ dish, index }: { dish: Dish; index: number }) {
  return (
    <article className="dish-card">
      <Link
        href="/menu"
        className="dish-card-image"
        aria-label={`Explore ${dish.name}`}
      >
        <Image
          src={`/images/${dish.image}.webp`}
          alt={dish.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="dish-number">0{index + 1}</span>
        {dish.badge && <span className="dish-badge">{dish.badge}</span>}
        <span className="dish-image-arrow">
          <ArrowUpRight size={22} />
        </span>
      </Link>
      <div className="dish-card-title">
        <h3>{dish.name}</h3>
        <span>{money(dish.price)}</span>
      </div>
      <p>{dish.description}</p>
    </article>
  );
}
