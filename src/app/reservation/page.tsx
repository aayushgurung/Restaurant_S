import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, UsersRound } from "lucide-react";
import Link from "next/link";
import { PageIntro } from "@/components/ui/section-heading";
import { InquiryForm } from "@/components/forms/inquiry-form";
import { OpeningHours } from "@/components/ui/opening-hours";
export const metadata: Metadata = {
  title: "Book a table",
  description:
    "Make yourself at home at Shaswat. Try our table reservation form for your next Nepali dining experience.",
};
export default function ReservationPage() {
  return (
    <>
      <PageIntro
        eyebrow="THERE’S A PLACE FOR YOU HERE"
        title={
          <>
            Pull up <em>a chair.</em>
          </>
        }
        description="A catch-up, a celebration, or just a Tuesday. Let’s make a little room for something lovely."
      />
      <section className="container reservation-layout">
        <div className="form-panel">
          <h2>Make yourself at home.</h2>
          <p className="form-panel-intro">
            Choose a date, bring your appetite. We’ll take care of the rest.
          </p>
          <InquiryForm kind="reservation" />
        </div>
        <aside className="reservation-aside">
          <OpeningHours />
          <div className="aside-image">
            <Image
              src="/images/gathering.webp"
              alt="An intimate dining table set for a warm evening"
              fill
              sizes="(max-width: 768px) 100vw, 35vw"
            />
          </div>
          <div className="group-note">
            <UsersRound size={24} />
            <h3>More than eight of you?</h3>
            <p>The more, the merrier. Let’s plan something a little special.</p>
            <Link href="/catering#enquiry">
              Talk to us about your gathering
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}
