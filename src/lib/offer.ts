// The core offer, in one place. Pages read from here so the promise stays consistent everywhere.
// Positioning (approved 2026-11-24): certified GoHighLevel specialist — one system that Captures, Nurtures and Closes.

export const CTA_LABEL = "Book a Free Growth Call";
export const CTA_MICROCOPY = "30 minutes. You'll leave with a clear plan — whether or not we work together.";

export const CREDENTIAL = "HighLevel Certified Admin";

export const GUARANTEE = {
  headline: "Tested end to end before a single lead goes through it.",
  contract: "No long-term contracts. Monthly management is month-to-month.",
  fineprint: "Everything is built in your own GoHighLevel account, so you keep every funnel, workflow and contact.",
};

/** Only real, checkable claims. */
export const TRUST = [
  CREDENTIAL,
  "Live GoHighLevel systems running for a membership business",
  "5 years at Intuit, from customer support to closing deals",
];

/** The three stages of the system, built inside GoHighLevel. */
export const STAGES = [
  {
    id: "capture",
    name: "Capture",
    promise: "Every lead lands in one place.",
    builds: [
      "Funnels and landing pages",
      "Forms, surveys and quizzes",
      "Website chat widget",
      "Missed-call text-back",
      "Leads from your ads and website",
    ],
  },
  {
    id: "nurture",
    name: "Nurture",
    promise: "Every lead gets followed up — automatically.",
    builds: [
      "Pipelines with clear stages",
      "SMS and email follow-up sequences",
      "Instant replies and AI conversations",
      "Appointment reminders",
      "Reactivation campaigns for old leads",
    ],
  },
  {
    id: "close",
    name: "Close",
    promise: "More conversations become customers.",
    builds: [
      "Calendars and online booking",
      "Confirmations and no-show recovery",
      "Every deal tracked to won or lost",
      "Invoices, payment links and text-to-pay",
      "Review requests after the sale",
    ],
  },
] as const;

export type Package = {
  name: string;
  tagline: string;
  who: string;
  includes: string[];
  /** Shown as a small badge; only Management has one (month-to-month). */
  timing?: string;
  recommended?: boolean;
};

/** Order matters: the recommended package sits in the middle column. */
export const PACKAGES: Package[] = [
  {
    name: "Single-Stage Build",
    tagline: "Fix the stage that's leaking most.",
    who: "For businesses already on GoHighLevel with one weak spot.",
    includes: [
      "Audit of your current GoHighLevel setup",
      "Rebuild of one stage: Capture, Nurture or Close",
      "Repair of broken workflows and triggers in that stage",
      "Every path in that stage tested before launch",
    ],
  },
  {
    name: "Complete Capture → Nurture → Close System",
    tagline: "All three stages, built and connected.",
    who: "For businesses that want GoHighLevel working end to end — new to GHL or rebuilding.",
    includes: [
      "Capture: funnels, forms, chat widget and missed-call text-back",
      "Nurture: pipelines, SMS and email sequences, reminders",
      "Close: calendars, no-show recovery, payment links, review requests",
      "Contacts and pipelines moved from your old CRM",
      "Every path tested end to end before launch",
    ],
    recommended: true,
  },
  {
    name: "GoHighLevel Management",
    tagline: "Keep it running and keep it improving.",
    who: "Ongoing support after your system is live.",
    includes: [
      "Workflow and automation upkeep",
      "New funnels, forms and campaigns as needed",
      "Pipeline and reporting tune-ups",
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
