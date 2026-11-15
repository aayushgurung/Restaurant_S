"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, CalendarDays, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { navigation } from "@/config/site";
import { MountainMark } from "@/components/ui/mountains";
import { useCart } from "@/components/providers/cart-provider";

export function Header() {
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const { count } = useCart();
  return (
    <>
      <div className="announcement">
        <span className="announcement-star">✦</span> ROOTED IN NEPAL. MADE TO
        BRING US TOGETHER. <span className="announcement-star">✦</span>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="Palpasa Cafe home">
            <MountainMark />
            <span>
              palpasa<small>CAFE</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={path === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              className="cart-link"
              href="/order"
              aria-label={`Your order, ${count} items`}
            >
              <ShoppingBag size={20} />
              {count > 0 && <span>{count}</span>}
            </Link>
            <Link className="header-book" href="/reservation">
              Book a table
              <ArrowUpRight size={16} />
            </Link>
            <button
              className="icon-button mobile-menu-toggle"
              aria-label="Open navigation"
              onClick={() => dialog.current?.showModal()}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      <dialog className="mobile-menu" ref={dialog} aria-label="Navigation">
        <div className="mobile-menu-top">
          <span className="brand-word">palpasa</span>
          <button
            className="icon-button"
            aria-label="Close navigation"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {[
            ...navigation,
            { href: "/order", label: "Order online" },
            { href: "/reservation", label: "Book a table" },
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => dialog.current?.close()}
              aria-current={path === item.href ? "page" : undefined}
            >
              <span className="mobile-nav-index">0{index + 1}</span>
              {item.label}
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </nav>
        <p className="mobile-menu-note">A little Nepal. A lot of heart.</p>
      </dialog>
      <nav className="mobile-action-bar" aria-label="Quick actions">
        <Link href="/order">
          <ShoppingBag size={18} />
          Order online{count > 0 && <span>({count})</span>}
        </Link>
        <Link href="/reservation">
          <CalendarDays size={18} />
          Book a table
        </Link>
      </nav>
    </>
  );
}
