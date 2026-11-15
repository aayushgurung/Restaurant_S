import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/section-heading";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore a visual taste of Palpasa Cafe. Food, spaces and the little moments that bring us together.",
};
export default function GalleryPage() {
  return (
    <>
      <PageIntro
        eyebrow="A LITTLE LOOK INSIDE"
        title={
          <>
            Food. People. <em>Good moments.</em>
          </>
        }
        description="Some things are better seen. A glimpse of the flavours, spaces and everyday joys that inspire us."
      />
      <section className="container gallery-page">
        <GalleryGrid />
      </section>
    </>
  );
}
