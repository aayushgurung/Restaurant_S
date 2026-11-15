import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Leaf, Mountain } from "lucide-react";
import { PageIntro, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
export const metadata: Metadata = {
  title: "Our story",
  description:
    "Meet the spirit behind Palpasa Cafe: Nepali heritage, food made with care and hospitality that makes everyone feel at home.",
};
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="OUR ROOTS. OUR REASON."
        title={
          <>
            Always a little <em>closer to home.</em>
          </>
        }
        description="Inspired by the food we gather around, and the warmth we carry with us."
      />
      <div className="container">
        <div className="about-banner">
          <Image
            src="/images/restaurant.webp"
            alt="An inviting dining space filled with warm light"
            fill
            preload
            sizes="100vw"
          />
          <span className="image-corner-note">
            A PLACE FOR GOOD FOOD & EVEN BETTER COMPANY
          </span>
        </div>
      </div>
      <section className="section container about-story">
        <Reveal className="about-story-image">
          <Image
            src="/images/momo-table.webp"
            alt="A plate of lovingly folded Nepali momo"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </Reveal>
        <Reveal className="story-copy">
          <p className="eyebrow">
            <span />
            THE PALPASA SPIRIT
          </p>
          <h2>
            A little Nepal in Parramatta.
            <br />
            <em>A feeling that stays.</em>
          </h2>
          <p>
            Find Palpasa Cafe at 27 Hunter St, Parramatta NSW 2150. A shared
            meal, a familiar flavour and a heartfelt welcome are the simple
            pleasures that inspire this little taste of Nepal.
          </p>
          <p>
            Our concept brings those feelings to the table. A little of the
            bustle of Kathmandu. A little of the calm of the mountains. And a
            whole lot of the generosity that makes Nepali hospitality feel like
            home.
          </p>
          <p>
            We believe there’s something special about food that asks you to
            slow down. Momo folded one at a time. Spices given room to bloom.
            Another cup of chiya, just because.
          </p>
          <span lang="ne" className="nepali story-nepali">
            स्वादमा संस्कृति, सेवामा आत्मीयता।
          </span>
        </Reveal>
      </section>
      <section className="section about-values">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="WHAT WE BRING TO THE TABLE"
            title={
              <>
                Simple things. <em>Deep roots.</em>
              </>
            }
          />
          <div className="values-grid">
            {[
              {
                Icon: Mountain,
                title: "Rooted in heritage",
                text: "Recipes inspired by Nepal’s kitchens, street corners and family tables. Familiar flavours, thoughtfully shared.",
              },
              {
                Icon: Leaf,
                title: "Care in every detail",
                text: "Fresh ingredients, warming spices and food prepared with patience. Because the little things make the meal.",
              },
              {
                Icon: Heart,
                title: "Room for everyone",
                text: "Nepali hospitality means making you feel at home. Come as you are, stay a little longer.",
              },
            ].map(({ Icon, title, text }) => (
              <Reveal className="value-card" key={title}>
                <Icon size={32} strokeWidth={1.2} />
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="THE PEOPLE BEHIND THE PLATES"
          title={
            <>
              Many hands. <em>One heart.</em>
            </>
          }
          description="A preview of the people and stories behind Palpasa Cafe."
        />
        <div className="team-grid">
          {[
            {
              image: "kitchen",
              title: "At the stove",
              role: "Our kitchen team",
              copy: "The hands that turn good ingredients into something that feels like home.",
            },
            {
              image: "momo",
              title: "Behind every fold",
              role: "Our momo makers",
              copy: "A little patience, a practised hand, and plenty of love in every parcel.",
            },
            {
              image: "gathering",
              title: "At your service",
              role: "Our front-of-house family",
              copy: "The warm welcome, the extra chair, and the people who remember your favourite.",
            },
          ].map((t) => (
            <article className="team-card" key={t.title}>
              <div>
                <Image
                  src={`/images/${t.image}.webp`}
                  alt={t.role + " — illustrative image"}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <span className="eyebrow">{t.role}</span>
              <h3>{t.title}</h3>
              <p>{t.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="about-cta">
        <div className="container">
          <p className="eyebrow">OUR STORY IS BETTER WITH YOU IN IT</p>
          <h2>
            Come hungry. <em>Leave happy.</em>
          </h2>
          <ButtonLink href="/reservation" variant="light">
            Find your place at our table
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
