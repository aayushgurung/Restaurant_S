import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/section-heading";
import { MenuBrowser } from "@/components/menu/menu-browser";
import { ButtonLink } from "@/components/ui/button";
export const metadata: Metadata = {
  title: "Our menu",
  description:
    "Explore Nepali momo, thali, comforting mains and house masala chiya. Filter the sample Palpasa Cafe menu by dish or dietary preference.",
};
export default function MenuPage() {
  return (
    <>
      <PageIntro
        eyebrow="HONEST FOOD. HAPPY HEARTS."
        title={
          <>
            A taste of <em>Nepal.</em>
          </>
        }
        description="From our favourite street-side bites to the plates we grew up sharing. Find a little something that feels like home."
      />
      <section className="container menu-page">
        <MenuBrowser />
        <div className="menu-bottom-cta">
          <span>Better together. Better around a table.</span>
          <ButtonLink href="/reservation" variant="text">
            Book your table
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
