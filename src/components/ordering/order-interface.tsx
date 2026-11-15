"use client";
import { useRef, useState, type FormEvent } from "react";
import {
  ShoppingBag,
  Bike,
  Store,
  Minus,
  Plus,
  ArrowUpRight,
  X,
  Check,
  Clock3,
} from "lucide-react";
import { MenuBrowser } from "@/components/menu/menu-browser";
import { useCart } from "@/components/providers/cart-provider";
import { dishes, money } from "@/lib/menu";

export function OrderInterface() {
  const { items, subtotal, count, change, clear } = useCart();
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const [receipt, setReceipt] = useState<{
    name: string;
    total: number;
    method: string;
  } | null>(null);
  const modal = useRef<HTMLDialogElement>(null);
  const fee = method === "delivery" && count > 0 ? 500 : 0;
  function complete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!count) return;
    const data = new FormData(event.currentTarget);
    setReceipt({
      name: String(data.get("name")).trim(),
      total: subtotal + fee,
      method,
    });
    clear();
    event.currentTarget.reset();
  }
  return (
    <>
      <div className="container order-page">
        <div className="order-toolbar">
          <div
            className="fulfilment-tabs"
            role="group"
            aria-label="Order method"
          >
            <button
              className={method === "pickup" ? "active" : ""}
              aria-pressed={method === "pickup"}
              onClick={() => setMethod("pickup")}
            >
              <Store size={18} />
              Pick up
            </button>
            <button
              className={method === "delivery" ? "active" : ""}
              aria-pressed={method === "delivery"}
              onClick={() => setMethod("delivery")}
            >
              <Bike size={19} />
              Delivery
            </button>
          </div>
          <span>
            <Clock3 size={16} />
            {method === "pickup"
              ? "Ready in around 25–35 minutes"
              : "At your door in around 40–55 minutes"}
          </span>
        </div>
        <div className="demo-note">
          A taste of what’s to come. This is a demo ordering experience; no
          payment or real order is taken.
        </div>
        <div className="order-layout">
          <MenuBrowser ordering />
          <aside className="cart-panel" aria-label="Your order">
            <div className="cart-panel-title">
              <h2>Your bag</h2>
              <ShoppingBag size={23} />
              <span>{count}</span>
            </div>
            {count === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={38} strokeWidth={1} />
                <h3>A little empty in here.</h3>
                <p>
                  Good things come to those
                  <br />
                  who add momo.
                </p>
              </div>
            ) : (
              <ul className="cart-items">
                {items.map((line) => {
                  const dish = dishes.find((d) => d.id === line.id)!;
                  return (
                    <li key={line.id}>
                      <div className="cart-item-title">
                        <h3>{dish.name}</h3>
                        <span>{money(dish.price * line.quantity)}</span>
                      </div>
                      <div className="quantity-control">
                        <button
                          onClick={() => change(line.id, -1)}
                          aria-label={`Remove one ${dish.name}`}
                        >
                          <Minus size={13} />
                        </button>
                        <span aria-label={`Quantity ${line.quantity}`}>
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => change(line.id, 1)}
                          disabled={line.quantity >= 99}
                          aria-label={`Add one ${dish.name}`}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="cart-totals">
              <div>
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              {method === "delivery" && (
                <div>
                  <span>Delivery</span>
                  <span>{money(fee)}</span>
                </div>
              )}
              <div className="cart-total">
                <span>Total</span>
                <strong>{money(subtotal + fee)}</strong>
              </div>
            </div>
            <button
              className="button button--primary checkout-button"
              disabled={!count}
              onClick={() => {
                setReceipt(null);
                modal.current?.showModal();
              }}
            >
              Preview checkout
              <ArrowUpRight size={17} />
            </button>
            <p className="cart-footnote">
              Made with care. Packed with love.
              <br />
              Sample prices include GST.
            </p>
          </aside>
        </div>
      </div>
      <dialog
        ref={modal}
        className="checkout-dialog"
        aria-labelledby="checkout-title"
      >
        <button
          className="icon-button dialog-close"
          aria-label="Close checkout"
          onClick={() => modal.current?.close()}
        >
          <X />
        </button>
        {receipt ? (
          <div className="form-success">
            <span className="success-icon">
              <Check size={28} />
            </span>
            <p className="eyebrow">ALL THE GOOD FEELINGS</p>
            <h2 id="checkout-title">Thanks, {receipt.name}.</h2>
            <p>
              Your demo {receipt.method === "pickup" ? "pick-up" : "delivery"}{" "}
              order totals <strong>{money(receipt.total)}</strong>.
            </p>
            <p>
              No order has been sent and no payment has been taken. We hope you
              enjoyed a little taste of Shaswat.
            </p>
            <button
              className="button button--primary"
              onClick={() => modal.current?.close()}
            >
              Keep exploring
              <ArrowUpRight size={17} />
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">
              <span />
              ONE STEP CLOSER
            </p>
            <h2 id="checkout-title">
              The good part <em>is coming.</em>
            </h2>
            <p className="dialog-description">
              {method === "pickup"
                ? "Pick up from Shaswat · sample location, Sydney"
                : "Delivery · sample Sydney service area"}
            </p>
            <form onSubmit={complete} className="form-grid">
              <label className="form-field full">
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={80}
                  pattern=".*\S.*"
                  placeholder="Who’s joining us?"
                />
              </label>
              <label className="form-field">
                Email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  maxLength={150}
                  placeholder="you@example.com"
                />
              </label>
              <label className="form-field">
                Phone
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  required
                  pattern={"[+\\d\\s\\(\\)\\-]{8,20}"}
                  placeholder="Your contact number"
                />
              </label>
              {method === "delivery" && (
                <label className="form-field full">
                  Delivery address
                  <input
                    name="address"
                    autoComplete="street-address"
                    required
                    minLength={8}
                    maxLength={200}
                    placeholder="Street address, suburb and postcode"
                  />
                </label>
              )}
              <label className="form-field full">
                A little note <span>(optional)</span>
                <textarea
                  name="notes"
                  rows={2}
                  maxLength={500}
                  placeholder="Anything we should know?"
                />
              </label>
              <div className="full checkout-total">
                <span>
                  {count} items · {method === "pickup" ? "Pick up" : "Delivery"}
                </span>
                <strong>{money(subtotal + fee)}</strong>
              </div>
              <button className="button button--primary full" type="submit">
                Complete demo order
                <ArrowUpRight size={17} />
              </button>
              <p className="form-disclaimer full">
                Demo only. Your details are not sent or saved.
              </p>
            </form>
          </>
        )}
      </dialog>
    </>
  );
}
