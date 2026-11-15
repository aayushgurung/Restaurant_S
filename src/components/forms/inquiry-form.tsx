"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, RotateCcw } from "lucide-react";
type Kind = "reservation" | "catering" | "contact";

function sydneyDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
export function InquiryForm({ kind }: { kind: Kind }) {
  const [minDate, setMinDate] = useState("");
  const [result, setResult] = useState<{
    name: string;
    date: string;
    guests: string;
  } | null>(null);
  const success = useRef<HTMLDivElement>(null);
  useEffect(() => setMinDate(sydneyDate()), []);
  useEffect(() => {
    if (result) success.current?.focus();
  }, [result]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const date = String(data.get("date") || "");
    const time = String(data.get("time") || "");
    const dateInput = form.elements.namedItem(
      "date",
    ) as HTMLInputElement | null;
    if (date && date < sydneyDate()) {
      dateInput?.setCustomValidity("Please choose today or a future date.");
      dateInput?.reportValidity();
      return;
    }
    if (kind === "reservation" && date === sydneyDate()) {
      const now = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Australia/Sydney",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());
      const timeInput = form.elements.namedItem("time") as HTMLSelectElement;
      if (time <= now) {
        timeInput.setCustomValidity(
          "That time has passed. Please choose a later time or another day.",
        );
        timeInput.reportValidity();
        return;
      }
    }
    setResult({
      name: String(data.get("name")).trim().split(" ")[0],
      date,
      guests: String(data.get("guests") || ""),
    });
  }
  if (result)
    return (
      <div className="form-success" ref={success} tabIndex={-1} role="status">
        <span className="success-icon">
          <Check size={28} />
        </span>
        <p className="eyebrow">NAMASTE, {result.name.toUpperCase()}</p>
        <h2>
          {kind === "reservation" ? (
            <>
              Your table, <em>imagined.</em>
            </>
          ) : (
            <>
              Good things <em>start here.</em>
            </>
          )}
        </h2>
        <p>
          {kind === "reservation"
            ? `Your demo request is for ${result.guests} guests on ${new Date(`${result.date}T12:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}.`
            : "Thanks for trying our enquiry experience."}
        </p>
        <p>
          This is a website preview.{" "}
          {kind === "reservation"
            ? "No table has been reserved."
            : "Your message has not been sent."}{" "}
          Your details are not saved.
        </p>
        <button
          className="button button--outline"
          onClick={() => setResult(null)}
        >
          <RotateCcw size={15} />
          {kind === "reservation"
            ? "Try another booking"
            : "Write another message"}
        </button>
      </div>
    );
  return (
    <form
      className="form-grid"
      onSubmit={submit}
      onChange={(e) => {
        for (const name of ["date", "time"]) {
          const el = e.currentTarget.elements.namedItem(name);
          if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement)
            el.setCustomValidity("");
        }
      }}
    >
      {kind === "reservation" && (
        <>
          <label className="form-field">
            Date
            <input type="date" name="date" required min={minDate} />
          </label>
          <label className="form-field">
            Time
            <select name="time" required defaultValue="">
              <option value="" disabled>
                Choose a time
              </option>
              {[
                "12:00",
                "12:30",
                "13:00",
                "13:30",
                "14:00",
                "17:00",
                "17:30",
                "18:00",
                "18:30",
                "19:00",
                "19:30",
                "20:00",
                "20:30",
                "21:00",
              ].map((t) => (
                <option value={t} key={t}>
                  {Number(t.split(":")[0]) > 12
                    ? `${Number(t.split(":")[0]) - 12}:${t.split(":")[1]} pm`
                    : `${t} pm`}
                </option>
              ))}
            </select>
          </label>
          <label className="form-field">
            Your party
            <select name="guests" required defaultValue="2">
              <option value="1">1 guest</option>
              {[2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option value={n} key={n}>
                  {n} guests
                </option>
              ))}
            </select>
          </label>
        </>
      )}
      <label className="form-field">
        Your name
        <input
          name="name"
          autoComplete="name"
          required
          pattern=".*\S.*"
          maxLength={80}
          placeholder="Your full name"
        />
      </label>
      <label className="form-field">
        Email address
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          maxLength={150}
          placeholder="you@example.com"
        />
      </label>
      {kind !== "contact" && (
        <label className="form-field">
          Phone number
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            pattern={"[+\\d\\s\\(\\)\\-]{8,20}"}
            placeholder="Your contact number"
          />
        </label>
      )}
      {kind === "catering" && (
        <>
          <label className="form-field">
            The occasion
            <select name="event" required defaultValue="">
              <option value="" disabled>
                What are we celebrating?
              </option>
              <option>Birthday or celebration</option>
              <option>Corporate gathering</option>
              <option>Wedding celebration</option>
              <option>Private dining</option>
              <option>Something else</option>
            </select>
          </label>
          <label className="form-field">
            Event date
            <input name="date" type="date" required min={minDate} />
          </label>
          <label className="form-field">
            Number of guests
            <input
              name="guests"
              type="number"
              required
              min={10}
              max={300}
              placeholder="10 – 300"
            />
          </label>
          <label className="form-field">
            Your preferred package
            <select name="package" defaultValue="Not sure yet">
              <option>Not sure yet</option>
              <option>The gathering · from $35 pp</option>
              <option>The celebration · from $49 pp</option>
              <option>The feast · from $65 pp</option>
            </select>
          </label>
        </>
      )}
      <label className="form-field full">
        {kind === "reservation"
          ? "A little note"
          : kind === "catering"
            ? "Tell us about your event"
            : "Your message"}
        {kind === "reservation" && <span>(optional)</span>}
        <textarea
          name="message"
          rows={4}
          required={kind !== "reservation"}
          maxLength={2000}
          placeholder={
            kind === "reservation"
              ? "A special occasion, accessibility needs or dietary requests…"
              : kind === "catering"
                ? "Your plans, your people, and anything else you’d like us to know…"
                : "We’d love to hear from you…"
          }
        />
      </label>
      <div className="full form-submit-row">
        <button type="submit" className="button button--primary">
          {kind === "reservation"
            ? "Request a table"
            : kind === "catering"
              ? "Send an enquiry"
              : "Send your message"}
          <ArrowUpRight size={17} />
        </button>
        <span>Good conversations start here.</span>
      </div>
      <p className="form-disclaimer full">
        Preview experience only.{" "}
        {kind === "reservation"
          ? "Bookings are not confirmed or sent to a restaurant."
          : "Messages are not sent."}{" "}
        Your details stay on this page.
      </p>
    </form>
  );
}
