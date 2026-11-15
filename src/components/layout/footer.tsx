import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site, navigation } from "@/config/site";
import { MountainMark, Mountains } from "@/components/ui/mountains";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="dhaka-trim" />
      <div className="container footer-grid">
        <div className="footer-about">
          <Link href="/" className="brand">
            <MountainMark />
            <span>
              shaswat<small>NEPALI KITCHEN</small>
            </span>
          </Link>
          <p>
            Good food. Open hearts.
            <br />A little taste of home.
          </p>
          <span className="nepali" lang="ne">
            अतिथि देवो भवः
          </span>
        </div>
        <div>
          <h3>Come on over</h3>
          <p>
            {site.address}
            <br />
            Australia
          </p>
          <Link href="/contact" className="footer-link">
            Find us <ArrowUpRight size={15} />
          </Link>
        </div>
        <div>
          <h3>Make an evening of it</h3>
          <p>
            Mon – Thu & Sun · 12 pm – 9:30 pm
            <br />
            Fri – Sat · 12 pm – 10 pm
          </p>
          <Link href="/reservation" className="footer-link">
            Save your seat <ArrowUpRight size={15} />
          </Link>
        </div>
        <div>
          <h3>Explore</h3>
          <div className="footer-navigation">
            {navigation
              .filter((n) => n.href !== "/")
              .map((n) => (
                <Link href={n.href} key={n.href}>
                  {n.label}
                </Link>
              ))}
            <Link href="/order">Order online</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Shaswat Nepali Kitchen.</p>
        <p>Concept website · Sample menu, imagery & location.</p>
        <span>
          CRAFTED WITH A LITTLE NEPALI SOUL <span className="gold">✦</span>
        </span>
      </div>
      <Mountains className="footer-mountains" />
    </footer>
  );
}
