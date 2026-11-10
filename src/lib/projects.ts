import { Bot, CreditCard, Funnel, Megaphone, Workflow, type LucideIcon } from "lucide-react";

export type ProjectFilter = "automation" | "meta-ads" | "funnels";
export type ProjectLabel = "Live Build (redacted)" | "Concept Project" | "Demo Build" | "Sample System";

export type Project = {
  slug: string;
  title: string;
  label: ProjectLabel;
  category: string;
  filter: ProjectFilter;
  icon: LucideIcon;
  description: string;
  workflow: string[];
  tools: string[];
  images?: { src: string; alt: string; caption: string }[];
};

export const FILTERS: { id: "all" | ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "automation", label: "Automation" },
  { id: "meta-ads", label: "Meta Ads" },
  { id: "funnels", label: "Funnels" },
];

export const PROJECTS: Project[] = [
  {
    slug: "payment-recovery",
    title: "Payment Recovery Pipeline",
    label: "Live Build (redacted)",
    category: "CRM / Automation",
    filter: "automation",
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
    slug: "ai-receptionist",
    title: "AI Receptionist + Lead Booking System",
    label: "Concept Project",
    category: "AI Automation",
    filter: "automation",
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
    filter: "funnels",
    icon: Funnel,
    description:
      "A focused landing page and booking flow for a home service business: clear offer, short qualifying form, instant booking, and automatic follow-up for anyone who doesn't book.",
    workflow: ["Ad / Traffic", "Landing Page", "Lead Capture", "Qualification", "Booking", "Follow-Up"],
    tools: ["GoHighLevel", "Landing Pages", "Copywriting", "CRM", "Automation"],
  },
  {
    slug: "meta-ads-system",
    title: "Meta Ads Customer Acquisition System",
    label: "Sample System",
    category: "Paid Media",
    filter: "meta-ads",
    icon: Megaphone,
    description:
      "A Facebook and Instagram campaign structure tied to a clear offer and proper tracking, so every lead can be followed from ad click to booked appointment and sale.",
    workflow: ["Audience", "Creative", "Offer", "Landing Page", "Lead", "Qualification", "Appointment", "Sale"],
    tools: ["Meta Ads", "Meta Pixel", "GA4", "GTM", "GoHighLevel"],
  },
  {
    slug: "sales-pipeline",
    title: "Sales Pipeline & Follow-Up Automation",
    label: "Sample System",
    category: "CRM / Sales Automation",
    filter: "automation",
    icon: Workflow,
    description:
      "A CRM pipeline where every lead has a stage, an owner and a next step, with automatic reminders and follow-ups so warm leads never sit untouched.",
    workflow: ["New Lead", "Contacted", "Qualified", "Appointment Booked", "Proposal", "Won"],
    tools: ["GoHighLevel", "CRM", "SMS", "Email", "AI Automation"],
  },
];
