import { Bot, CreditCard, Funnel, Truck, Workflow, type LucideIcon } from "lucide-react";
import { STAGES, type StageId } from "./offer";
export type ProjectLabel = "Real build — client details redacted" | "Concept Project" | "Demo Build" | "Sample System";

export type Project = {
  slug: string;
  title: string;
  label: ProjectLabel;
  category: string;
  /** Which of the three stages this build covers, in Capture → Nurture → Close order. Drives the filters and the stage tags. */
  stages: StageId[];
  icon: LucideIcon;
  description: string;
  workflow: string[];
  tools: string[];
  images?: { src: string; alt: string; caption: string }[];
  /** Screen recording shown instead of screenshots (muted, loops while on screen). */
  video?: { src: string; poster: string; caption: string; label: string };
  /** Spans both columns on desktop (used for builds with media). */
  wide?: boolean;
};

export type ProjectFilter = "all" | StageId;

export const FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  ...STAGES.map((s) => ({ id: s.id, label: s.name })),
];

export const PROJECTS: Project[] = [
  {
    slug: "payment-recovery",
    title: "Payment Recovery Pipeline",
    label: "Real build — client details redacted",
    category: "CRM / Automation",
    stages: ["nurture", "close"],
    icon: CreditCard,
    description:
      "A GoHighLevel system for a membership business: a failed Stripe payment opens a pipeline opportunity, alerts the team, and moves through stages — contacted, no answer, voicemail, callback, payment link sent, recovered or cancelled — as call outcomes are logged.",
    workflow: [
      "Payment Failed",
      "Opportunity Created",
      "Team Alert",
      "Outreach (Call · SMS · Email)",
      "Call Outcome",
      "Stage Update",
      "Recovered / Cancelled",
    ],
    tools: ["GoHighLevel", "Stripe", "Workflows", "Pipelines", "SMS/Email"],
    wide: true,
    images: [
      {
        src: "/projects/payment-recovery-live.webp",
        alt: "Screenshots of the GoHighLevel payment recovery workflows, with client and product names redacted",
        caption: "Real GoHighLevel screenshots · client and product names redacted",
      },
      {
        src: "/projects/payment-recovery-flow.webp",
        alt: "Diagram of the failed-payment recovery sequence from trigger to final notice",
        caption: "Workflow diagram of the recovery sequence",
      },
    ],
  },
  {
    slug: "freight-quote-capture",
    title: "Freight Quote Capture System",
    label: "Demo Build",
    category: "Website + Capture",
    stages: ["capture"],
    icon: Truck,
    description:
      "A demo build for a fictional freight broker, Northline Freight: a landing page made in GoHighLevel AI Studio with a video hero, and a quote form that asks for pickup, delivery and freight type. Every request becomes a tagged contact and a new deal in a Freight Quotes pipeline, ready for the follow-up stage.",
    workflow: [
      "Landing Page",
      "Quote Form",
      "Contact + Freight Details",
      "Tag: freight-quote-request",
      "Pipeline: New Quote Request",
      "Hand-off to Nurture",
    ],
    tools: ["GoHighLevel", "AI Studio", "Forms", "Custom Fields", "Workflows", "Pipelines"],
    video: {
      src: "/projects/northline-freight-walkthrough.mp4",
      poster: "/projects/northline-freight-poster.webp",
      label: "Screen recording of the Northline Freight demo website: video hero, services, how it works, and the quote form being filled in",
      caption: "Screen recording of the demo site · fictional brand, built in GoHighLevel AI Studio",
    },
    wide: true,
  },
  {
    slug: "ai-receptionist",
    title: "AI Receptionist + Lead Booking System",
    label: "Concept Project",
    category: "AI Automation",
    stages: ["capture", "nurture", "close"],
    icon: Bot,
    description:
      "An AI assistant that answers new inquiries right away, asks qualifying questions, and books good-fit leads straight into the calendar — with the conversation and notes saved to the CRM.",
    workflow: ["Lead", "AI Conversation", "Qualification", "Calendar", "Appointment", "CRM", "Follow-Up"],
    tools: ["GoHighLevel", "AI Automation", "CRM", "Calendar", "SMS/Email"],
  },
  {
    slug: "home-service-funnel",
    title: "Home Service Lead Generation Funnel",
    label: "Demo Build",
    category: "Funnels / Conversion",
    stages: ["capture", "nurture", "close"],
    icon: Funnel,
    description:
      "A focused landing page and booking flow for a home service business: clear offer, short qualifying form, instant booking, and automatic follow-up for anyone who doesn't book.",
    workflow: ["Ad / Traffic", "Landing Page", "Lead Capture", "Qualification", "Booking", "Follow-Up"],
    tools: ["GoHighLevel", "Landing Pages", "Copywriting", "CRM", "Automation"],
  },
  {
    slug: "sales-pipeline",
    title: "Sales Pipeline & Follow-Up Automation",
    label: "Sample System",
    category: "CRM / Sales Automation",
    stages: ["nurture", "close"],
    icon: Workflow,
    description:
      "A CRM pipeline where every lead has a stage, an owner and a next step, with automatic reminders and follow-ups so warm leads never sit untouched.",
    workflow: ["New Lead", "Contacted", "Qualified", "Appointment Booked", "Proposal", "Won"],
    tools: ["GoHighLevel", "CRM", "SMS", "Email", "AI Automation"],
  },
];
