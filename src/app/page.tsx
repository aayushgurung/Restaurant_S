import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Utensils, ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { MountainMark, Mountains } from "@/components/ui/mountains";
import { DishCard } from "@/components/menu/dish-card";
import { dishes } from "@/lib/menu";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="values-strip">
        <div className="container values-strip-inner">
          <span>
            <Utensils size={17} />
            Hand-folded. Never hurried.
          </span>
          <i>✦</i>
          <span>
            <Leaf size={17} />
            Fresh ingredients, honest flavours.
          </span>
          <i>✦</i>
          <span>
            <Heart size={17} />
            Nepali hospitality, always.
          </span>
        </div>
      </div>
      <section className="section container" id="signature">
        <Reveal>
          <SectionHeading
            eyebrow="FROM OUR KITCHEN"
            title={
              <>
                A few reasons
                <br className="mobile-break" /> to <em>come hungry.</em>
              </>
            }
            description="Familiar comforts. New favourites. Always made with care."
            action={
              <ButtonLink href="/menu" variant="text">
                Discover the full menu
              </ButtonLink>
            }
          />
        </Reveal>
        <div className="signature-grid">
          {[dishes[0], dishes[3], dishes[5]].map((dish, index) => (
            <Reveal key={dish.id} delay={index * 0.09}>
              <DishCard dish={dish} index={index} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="gathering-band">
        <div className="container gathering-inner">
          <MountainMark />
          <div>
            <p className="eyebrow">GOOD FOOD TASTES BETTER TOGETHER</p>
            <h2>
              Bring your people. <em>We’ll bring Nepal.</em>
            </h2>
          </div>
          <ButtonLink href="/reservation" variant="light">
            Gather around our table
          </ButtonLink>
        </div>
        <Mountains className="band-mountains" />
      </section>
      <section className="section container story-section">
        <Reveal className="story-images">
          <div className="story-main-image">
            <Image
              src="/images/restaurant.webp"
              alt="A warm, welcoming restaurant with timber details and soft lighting"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
          <div className="story-small-image">
            <Image
              src="/images/momo-table.webp"
              alt="A plate of Nepali momo ready to share"
              fill
              sizes="(max-width: 768px) 45vw, 20vw"
            />
          </div>
          <span className="story-image-label">A PLACE TO FEEL AT HOME</span>
        </Reveal>
        <Reveal className="story-copy">
          <p className="eyebrow">
            <span />
            OUR ROOTS, OUR HEART
          </p>
          <h2>
            More than a meal.
            <br />
            <em>A little piece of home.</em>
          </h2>
          <p>
            In Nepal, a meal is never just a meal. It’s a reason to pause, pull
            up a chair and make room for one more.
          </p>
          <p>
            That’s the spirit behind Shaswat. Recipes inspired by home, spices
            that tell a story, and the kind of welcome that stays with you long
            after the last bite.
          </p>
          <span className="nepali story-nepali" lang="ne">
            हाम्रो भान्छाबाट, तपाईंको टेबलसम्म।
          </span>
          <ButtonLink href="/about" variant="text">
            Get to know our story
          </ButtonLink>
        </Reveal>
      </section>
      <section className="section home-gallery">
        <div className="container">
          <SectionHeading
            eyebrow="LITTLE MOMENTS, LASTING MEMORIES"
            title={
              <>
                Life around <em>our table.</em>
              </>
            }
            action={
              <ButtonLink href="/gallery" variant="text">
                Take a closer look
              </ButtonLink>
            }
          />
          <div className="home-gallery-grid">
            {[
              { image: "momo-steamed", alt: "A plate of hand-folded momo" },
              {
                image: "gathering",
                alt: "An intimate table set for a shared evening",
              },
              { image: "tea", alt: "A quiet moment with a warming cup of tea" },
            ].map((p, i) => (
              <Link
                href="/gallery"
                className="home-gallery-image"
                key={p.image}
              >
                <Image
                  src={`/images/${p.image}.webp`}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 75vw, 33vw"
                />
                <span>
                  0{i + 1}
                  <ArrowUpRight size={23} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="home-final container">
        <p className="eyebrow">
          <span />
          THERE’S ALWAYS ROOM FOR YOU
        </p>
        <h2>
          Your next favourite meal
          <br />
          starts with <em>namaste.</em>
        </h2>
        <div>
          <ButtonLink href="/reservation">Book a table</ButtonLink>
          <ButtonLink href="/order" variant="outline">
            Order for home
          </ButtonLink>
        </div>
        <Mountains className="final-mountains" />
      </section>
    </>
  );
}
