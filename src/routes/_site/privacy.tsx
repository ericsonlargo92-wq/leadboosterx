import { createFileRoute } from "@tanstack/react-router";
import { Container, Pill } from "~/components/ui";
import { CONTACT } from "~/lib/config";
import { seo } from "~/lib/seo";

export const Route = createFileRoute("/_site/privacy")({
  head: () =>
    seo({
      title: "Privacy Policy — LeadBoosterX",
      description: "How LeadBoosterX handles the information you share through the contact form and booking page.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

const UPDATED = "November 2026";

function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <Pill>Privacy</Pill>
      <h1 className="mt-5 text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: {UPDATED}</p>

      <div className="mt-8 space-y-8 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_ul]:mt-3 [&_ul]:space-y-1.5">
        <p>
          This site is run by Ericson Largo (LeadBoosterX). This page explains what information is collected when you use
          it, why, and what you can ask me to do with it.
        </p>

        <section>
          <h2>What I collect</h2>
          <ul>
            <li>
              <strong className="text-foreground">Contact form:</strong> your name, email, and anything else you choose to
              share (phone, business name, website, budget range and your message).
            </li>
            <li>
              <strong className="text-foreground">Booking a call:</strong> the details you enter on the Cal.com booking
              form, such as your name, email and the time you pick.
            </li>
            <li>
              <strong className="text-foreground">Site analytics:</strong> anonymous page-view counts through Vercel Web
              Analytics, which does not use cookies or identify individual visitors.
            </li>
          </ul>
        </section>

        <section>
          <h2>How it's used</h2>
          <p className="mt-3">
            Only to reply to your inquiry, prepare for and hold the call you booked, and follow up about that
            conversation. I don't sell your information, add you to a mailing list without asking, or send you text
            messages from this site.
          </p>
        </section>

        <section>
          <h2>Services that process it</h2>
          <ul>
            <li>Resend, which delivers contact-form messages to my inbox.</li>
            <li>Cal.com and Google Calendar / Google Meet, which handle bookings, reminders and the meeting link.</li>
            <li>Vercel, which hosts the site.</li>
          </ul>
        </section>

        <section>
          <h2>How long it's kept</h2>
          <p className="mt-3">
            Inquiry emails and booking details are kept only as long as needed to work with you, then deleted on request.
          </p>
        </section>

        <section>
          <h2>Your choices</h2>
          <p className="mt-3">
            You can ask to see, correct or delete the information you've sent me at any time by emailing{" "}
            <a href={`mailto:${CONTACT.email}`} className="font-semibold text-primary underline">
              {CONTACT.email}
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
