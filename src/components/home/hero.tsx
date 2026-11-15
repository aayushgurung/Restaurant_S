"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ButtonLink } from "@/components/ui/button";
import { Mountains, MountainMark } from "@/components/ui/mountains";

export function Hero() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 45, damping: 25 });
  const springY = useSpring(y, { stiffness: 45, damping: 25 });
  const motifX = useTransform(springX, (v) => v * -1.6);
  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const bounds = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - bounds.left - bounds.width / 2) * 0.016);
        y.set((e.clientY - bounds.top - bounds.height / 2) * 0.016);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div className="hero-image" style={{ x: springX, y: springY }}>
        <Image
          src="/images/hero.webp"
          alt="Fresh Nepali momo and house achar served on a dark ceramic plate"
          fill
          preload
          sizes="100vw"
        />
      </motion.div>
      <div className="hero-shade" />
      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 1, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="eyebrow hero-eyebrow">
            <span />
            NAMASTE. WELCOME TO OUR TABLE.
          </p>
          <h1 id="hero-title">
            A little Nepal.
            <br />
            <em>A lot of heart.</em>
          </h1>
          <p className="hero-description">
            Hand-folded momo. Time-honoured recipes.
            <br className="desktop-break" /> The warmth of Nepal, shared with
            you.
          </p>
          <div className="hero-buttons">
            <ButtonLink href="/menu">Explore our menu</ButtonLink>
            <ButtonLink href="/order" variant="light">
              Order online
            </ButtonLink>
          </div>
          <Link className="hero-book-link" href="/reservation">
            Make yourself at home.{" "}
            <span>
              Book a table <ArrowUpRight size={14} />
            </span>
          </Link>
        </motion.div>
      </div>
      <motion.div className="hero-seal" style={{ x: motifX, y: springY }}>
        <span>FROM OUR HANDS</span>
        <MountainMark />
        <em>with love</em>
        <span>TO YOUR TABLE</span>
      </motion.div>
      <div className="container hero-bottom">
        <a href="#signature" className="hero-scroll">
          <span className="scroll-circle">
            <ArrowDown size={15} />
          </span>
          A TASTE OF WHAT’S TO COME
        </a>
        <span className="hero-nepali" lang="ne">
          घरको स्वाद, मनको न्यानो
        </span>
      </div>
      <Mountains className="hero-mountains" />
    </section>
  );
}
