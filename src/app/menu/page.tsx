import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/section-heading";
import { MenuBrowser } from "@/components/menu/menu-browser";
import { ButtonLink } from "@/components/ui/button";
export const metadata: Metadata = {
  title: "Our menu",
  description:
    "Explore Palpasa Cafe’s croissants, hot coffee, premium tea, cold drinks, fresh juices, smoothies, milkshakes and Nepalese lunch dishes, with prices in Australian dollars.",
};
export default function MenuPage() {
  return (
    <>
      <PageIntro
        eyebrow="HONEST FOOD. HAPPY HEARTS."
        title={
          <>
            Your cafe <em>favourites.</em>
          </>
        }
        description="A croissant with your coffee, a fresh juice, or a comforting Nepalese lunch. Explore the Palpasa Cafe menu, from your first sip to your last bite."
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
