// The core offer, in one place. Pages read from here so the promise stays consistent everywhere.

export const CTA_LABEL = "Book a Free Growth Call";
export const CTA_MICROCOPY = "30 minutes. You'll leave with a clear plan — whether or not we work together.";

export const LAUNCH_DAYS = 14;

export const GUARANTEE = {
  headline: `Live in ${LAUNCH_DAYS} days — or I keep working for free until it is.`,
  contract: "No long-term contracts. Monthly management is month-to-month.",
  fineprint: `${LAUNCH_DAYS} days counts from when I have access to your accounts and the assets we agree on.`,
};

/** Only real, checkable claims. */
export const TRUST = [
  "5 years at Intuit, from customer support to closing deals",
  "Live GoHighLevel systems running for a membership business",
];

export type Package = {
  name: string;
  tagline: string;
  who: string;
  includes: string[];
  timing: string;
  recommended?: boolean;
};

export const PACKAGES: Package[] = [
  {
    name: "Follow-Up System",
    tagline: "Stop losing the leads you already get.",
    who: "For businesses that already get leads but lose too many.",
    includes: [
      "CRM pipeline set up around how you sell",
      "Instant reply to every new lead",
      "Booking calendar and confirmation flow",
      "Appointment reminders",
      "No-show and reschedule follow-up",
      "Nurture follow-up for leads who don't book yet",
    ],
    timing: `Live in ${LAUNCH_DAYS} days`,
  },
  {
    name: "Full Growth System",
    tagline: "Ads, funnel, and follow-up built as one system.",
    who: "For businesses that want a steady flow of booked calls, end to end.",
    includes: [
      "Everything in the Follow-Up System",
      "Meta Ads campaign setup (Facebook & Instagram)",
      "Landing page or funnel built to convert",
      "Tracking with Meta Pixel and Conversions API",
      "Offer and audience planning",
      "Full end-to-end testing before launch",
    ],
    timing: `Live in ${LAUNCH_DAYS} days`,
    recommended: true,
  },
  {
    name: "Growth Management",
    tagline: "Keep it running and keep it improving.",
    who: "Ongoing support after your system is live.",
    includes: [
      "Ad management and weekly optimization",
      "Creative testing",
      "Follow-up and booking flow tuning",
      "Plain-English monthly report",
    ],
    timing: "Month-to-month",
  },
];

export const PRICING_NOTE = "Pricing depends on your setup — we'll scope it on the call.";

/**
 * Approved client results. Leave empty until a client has given permission to share a number.
 * The "Results" section on the homepage stays hidden while this is empty.
 */
export const RESULTS: { value: string; label: string; context: string }[] = [];
