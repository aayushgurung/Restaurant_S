import type { Metadata } from "next";
import Image from "next/image";
import { Check, ArrowDown } from "lucide-react";
import { PageIntro, SectionHeading } from "@/components/ui/section-heading";
import { InquiryForm } from "@/components/forms/inquiry-form";
export const metadata: Metadata = {
  title: "Catering & events",
  description:
    "Gather your people around the flavours of Nepal. Explore sample Palpasa Cafe catering packages and event enquiries.",
};
const packages = [
  {
    title: "The gathering",
    price: "35",
    subtitle: "For simple, happy get-togethers.",
    items: [
      "A selection of steamed momo",
      "Two comforting mains",
      "Rice, roti & house achar",
      "Vegetarian choices included",
    ],
  },
  {
    title: "The celebration",
    price: "49",
    subtitle: "A little more to make it special.",
    items: [
      "Steamed & pan-fried momo",
      "Three mains, served to share",
      "Sides, rice, roti & house achar",
      "House dessert to finish",
    ],
  },
  {
    title: "The feast",
    price: "65",
    subtitle: "Make a beautiful occasion of it.",
    items: [
      "A full momo tasting selection",
      "Four signature mains",
      "A generous spread of sides",
      "Dessert & house masala chiya",
    ],
  },
];
export default function CateringPage() {
  return (
    <>
      <PageIntro
        eyebrow="YOUR PEOPLE. OUR TABLE."
        title={
          <>
            Good company. <em>Great occasions.</em>
          </>
        }
        description="Milestones, little wins, and every excuse to get together. Bring a little Nepali soul to your next gathering."
      />
      <div className="container">
        <div className="catering-banner">
          <Image
            src="/images/gathering.webp"
            alt="A thoughtfully set table for a special gathering"
            fill
            preload
            sizes="100vw"
          />
          <div>
            <p className="eyebrow">LET’S MAKE A LITTLE MEMORY</p>
            <h2>
              Made to share.
              <br />
              <em>Made to remember.</em>
            </h2>
            <a href="#enquiry" className="button button--light">
              Plan your gathering
              <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </div>
      <section className="section container">
        <SectionHeading
          eyebrow="FOR EVERY KIND OF TOGETHER"
          title={
            <>
              Big moments. <em>Little details.</em>
            </>
          }
        />
        <div className="team-grid">
          {[
            {
              title: "Celebrations",
              image: "gathering",
              text: "Birthdays, anniversaries and all the days worth raising a glass to.",
            },
            {
              title: "Catering with soul",
              image: "momo",
              text: "Office lunches, team milestones and generous Nepali spreads, wherever you gather.",
            },
            {
              title: "Private occasions",
              image: "restaurant",
              text: "A space to make your own. Thoughtful menus and a warm welcome for your people.",
            },
          ].map((item) => (
            <article className="team-card" key={item.title}>
              <div>
                <Image
                  src={`/images/${item.image}.webp`}
                  alt={item.title + " inspiration"}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section catering-packages">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="A SPREAD FOR YOUR OCCASION"
            title={
              <>
                Leave the cooking <em>to us.</em>
              </>
            }
            description="Illustrative packages for groups of 10 or more. We’ll shape the details around you."
          />
          <div className="package-grid">
            {packages.map((p, i) => (
              <article
                className={`package-card ${i === 1 ? "package-card--featured" : ""}`}
                key={p.title}
              >
                {i === 1 && (
                  <span className="package-badge">A LITTLE OF EVERYTHING</span>
                )}
                <p className="eyebrow">0{i + 1}</p>
                <h3>{p.title}</h3>
                <p>{p.subtitle}</p>
                <div className="package-price">
                  <span>from</span>
                  <strong>${p.price}</strong>
                  <span>/ person</span>
                </div>
                <ul>
                  {p.items.map((item) => (
                    <li key={item}>
                      <Check size={15} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#enquiry"
                  className={`button ${i === 1 ? "button--primary" : "button--outline"}`}
                >
                  Let’s talk about it
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container catering-enquiry" id="enquiry">
        <div>
          <p className="eyebrow">
            <span />
            GOOD THINGS START WITH HELLO
          </p>
          <h2>
            Tell us what
            <br />
            you’re <em>dreaming of.</em>
          </h2>
          <p>
            Big plans or just the beginnings of an idea? We’d love to help bring
            your people together.
          </p>
          <span className="nepali" lang="ne">
            खुसी बाँडौँ, सँगै मनाऔँ।
          </span>
        </div>
        <div className="form-panel">
          <InquiryForm kind="catering" />
        </div>
      </section>
    </>
  );
}
