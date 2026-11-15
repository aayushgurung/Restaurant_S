import { Mountains } from "@/components/ui/mountains";
import { ButtonLink } from "@/components/ui/button";
export default function NotFound() {
  return (
    <section className="container not-found">
      <p className="eyebrow">A LITTLE OFF THE BEATEN PATH · 404</p>
      <h1>
        Let’s find your
        <br />
        <em>way home.</em>
      </h1>
      <p>This page seems to have wandered into the mountains.</p>
      <ButtonLink href="/">Back to Palpasa Cafe</ButtonLink>
      <Mountains />
    </section>
  );
}
