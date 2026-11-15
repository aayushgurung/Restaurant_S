import type { Metadata } from "next";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { PageIntro, SectionHeading } from "@/components/ui/section-heading";
import { OpeningHours } from "@/components/ui/opening-hours";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { site } from "@/config/site";
export const metadata: Metadata = {
  title: "Contact & location",
  description:
    "Find your way to a little Nepal. Sample opening hours, location and contact information for Shaswat Nepali Kitchen.",
};
export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="COME SAY NAMASTE"
        title={
          <>
            A little closer <em>than you think.</em>
          </>
        }
        description="Good food has a way of bringing people together. We’d love to welcome you."
      />
      <section className="container contact-layout">
        <div className="contact-details">
          <div className="contact-address">
            <MapPin size={25} strokeWidth={1.3} />
            <p className="eyebrow">FIND YOUR WAY TO US</p>
            <h2>
              Your neighbourhood.
              <br />
              <em>A taste of Nepal.</em>
            </h2>
            <p>
              {site.address}
              <br />
              Location to be announced.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Sydney+NSW+Australia"
              target="_blank"
              rel="noreferrer"
              className="button button--text"
            >
              Explore the Sydney area
              <ArrowUpRight size={17} />
            </a>
          </div>
          <OpeningHours />
          <div className="contact-email">
            <Mail size={22} strokeWidth={1.3} />
            <div>
              <h3>A little hello goes a long way.</h3>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <p>Sample email · contact and social details coming soon.</p>
            </div>
          </div>
        </div>
        <div className="contact-map">
          <iframe
            src="https://maps.google.com/maps?q=Sydney%20NSW%20Australia&t=&z=13&ie=UTF8&iwloc=&output=embed"
            title="Sydney area map — illustrative location, restaurant address to be confirmed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div>
            <MapPin size={17} />
            Sydney, Australia<span>Sample area map</span>
          </div>
        </div>
      </section>
      <section className="section container contact-form-section">
        <SectionHeading
          eyebrow="WE’RE ALL EARS"
          title={
            <>
              Let’s start <em>a conversation.</em>
            </>
          }
          description="A question, a kind word, or something you’d love to see on the menu. Drop us a little note."
        />
        <div className="form-panel">
          <InquiryForm kind="contact" />
        </div>
      </section>
    </>
  );
}
