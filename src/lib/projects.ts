import { Armchair, Bot, CreditCard, Funnel, Trees, Truck, Workflow, type LucideIcon } from "lucide-react";
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
  /**
   * Screen recording shown instead of screenshots: a light silent `loop` that plays while on screen, and an optional
   * narrated `voiceover` version (with sound and controls) that loads only when the visitor asks for it.
   */
  video?: { loop: string; voiceover?: string; duration?: string; poster: string; caption: string; label: string };
  /** Spans both columns on desktop (used for builds with media). */
  wide?: boolean;
  /**
   * Real screenshots of the Nurture and Close workflows as built in the GoHighLevel workflow builder (tall images,
   * stitched from 100% zoom captures). Shown under the Nurture / Close filters instead of the website recording.
   */
  workflowShots?: { nurture: WorkflowShot; close: WorkflowShot };
};

export type WorkflowShot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Optional narrated walkthrough: a camera pan down the same workflow with a voice explaining each step. */
  voiceover?: { src: string; poster: string; duration: string; label: string };
};

export type ProjectFilter = "all" | StageId;

export const FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  ...STAGES.map((s) => ({ id: s.id, label: s.name })),
];

export const PROJECTS: Project[] = [
  {
    slug: "freight-quote-capture",
    title: "Freight Quote System",
    label: "Demo Build",
    category: "Capture · Nurture · Close",
    stages: ["capture", "nurture", "close"],
    icon: Truck,
    description:
      "A demo build for a fictional freight broker, Northline Freight, with all three stages built in GoHighLevel. Capture: a landing page made in AI Studio with a video hero, and a quote form that asks for pickup, delivery and freight type; every request becomes a tagged contact and a new deal. Nurture: an instant email and text, then timed follow-ups until a quote call is booked. Close: the booked call moves the deal forward and stops the follow-ups, then ends in a thank-you and review request, or a final offer before the deal is marked lost.",
    workflow: [
      "Landing Page",
      "Quote Form",
      "Tag + New Deal",
      "Instant Email & Text",
      "Follow-Up Sequence",
      "Quote Call Booked",
      "Won: Thank-You + Review",
      "Lost: Final Offer",
    ],
    tools: ["GoHighLevel", "AI Studio", "Forms", "Custom Fields", "Workflows", "Pipelines", "Email & SMS"],
    video: {
      loop: "/projects/northline-freight-loop.mp4",
      voiceover: "/projects/northline-freight-voiceover.mp4",
      duration: "0:34",
      poster: "/projects/northline-freight-poster.webp",
      label: "Screen recording of the Northline Freight demo website: video hero, services, how it works, and the quote form being filled in",
      caption: "Screen recording of the demo site · fictional brand, built in GoHighLevel AI Studio",
    },
    wide: true,
    workflowShots: {
      nurture: {
        src: "/projects/freight-nurture-workflow.webp",
        alt: "The Northline Freight Nurture workflow in the GoHighLevel workflow builder: quote request tag → find or create the deal → instant email and SMS → wait → call booked? → follow-up email, SMS and nurture-complete tag",
        caption: "Nurture workflow · built in GoHighLevel (demo sub-account, draft)",
        width: 760,
        height: 1918,
        voiceover: {
          src: "/projects/freight-nurture-workflow-voiceover.mp4",
          poster: "/projects/freight-nurture-workflow-poster.webp",
          duration: "0:38",
          label: "Narrated walkthrough of the freight Nurture workflow in GoHighLevel, panning from the trigger to the end",
        },
      },
      close: {
        src: "/projects/freight-close-workflow.webp",
        alt: "The Northline Freight Close workflow in the GoHighLevel workflow builder: quote-call-booked tag → deal to Quote Call Booked → stop the follow-up → confirmation email and SMS → wait → shipment won? → won, thank-you and customer tag, or a final rate email, recheck, then lost",
        caption: "Close workflow · built in GoHighLevel (demo sub-account, draft)",
        width: 760,
        height: 2310,
        voiceover: {
          src: "/projects/freight-close-workflow-voiceover.mp4",
          poster: "/projects/freight-close-workflow-poster.webp",
          duration: "0:37",
          label: "Narrated walkthrough of the freight Close workflow in GoHighLevel, panning from the trigger to the won and lost paths",
        },
      },
    },
  },
  {
    slug: "upholstery-quote-site",
    title: "Upholstery Shop Quote System",
    label: "Demo Build",
    category: "Capture · Nurture · Close",
    stages: ["capture", "nurture", "close"],
    icon: Armchair,
    description:
      "A demo site for a fictional custom upholstery shop, Ridgeway Upholstery, built in GoHighLevel AI Studio, with the quote form in the hero so a visitor can ask for a price without scrolling. Behind it, Nurture and Close workflows in GoHighLevel follow up on each request with an email, a text and a consultation invite, then move the deal to won or lost. In this demo the form is display-only, so the workflows start from a tag.",
    workflow: [
      "Hero + Quote Form",
      "Vehicle & Service Details",
      "Instant Email & Text",
      "Consultation Invite",
      "Consultation Booked",
      "Won: Thank-You + Review",
      "Lost: Final Offer",
    ],
    tools: ["GoHighLevel", "AI Studio", "Landing Page", "Workflows", "Pipelines", "Email & SMS"],
    video: {
      loop: "/projects/ridgeway-upholstery-loop.mp4",
      voiceover: "/projects/ridgeway-upholstery-voiceover.mp4",
      duration: "0:26",
      poster: "/projects/ridgeway-upholstery-poster.webp",
      label: "Screen recording of the Ridgeway Upholstery demo website: hero quote form being filled in, service cards, project gallery and FAQ",
      caption: "Screen recording of the demo site · fictional brand, built in GoHighLevel AI Studio",
    },
    wide: true,
    workflowShots: {
      nurture: {
        src: "/projects/upholstery-nurture-workflow.webp",
        alt: "The Ridgeway Upholstery Nurture workflow in the GoHighLevel workflow builder: quote request tag → find or create the deal → instant email and photo request SMS → wait → consultation booked? → consultation invite, follow-up SMS and nurture-complete tag",
        caption: "Nurture workflow · built in GoHighLevel (demo sub-account, draft)",
        width: 760,
        height: 1851,
      },
      close: {
        src: "/projects/upholstery-close-workflow.webp",
        alt: "The Ridgeway Upholstery Close workflow in the GoHighLevel workflow builder: consultation-booked tag → deal to Consultation Booked → stop the follow-up → confirmation email and SMS → wait → job won? → won, thank-you and review email and customer tag, or a quote follow-up, recheck, then lost",
        caption: "Close workflow · built in GoHighLevel (demo sub-account, draft)",
        width: 760,
        height: 2310,
      },
    },
  },
  {
    slug: "tree-service-estimate-site",
    title: "Tree Service Estimate System",
    label: "Demo Build",
    category: "Capture · Nurture · Close",
    stages: ["capture", "nurture", "close"],
    icon: Trees,
    description:
      "A demo site for a fictional tree service, Timberline Tree Care, built in GoHighLevel AI Studio: a short estimate form after the hero, clear service cards and an emergency storm call to action. Behind it, Nurture and Close workflows in GoHighLevel follow up with an email, a text and a site-visit invite, then move the deal to won or lost. In this demo the form is display-only, so the workflows start from a tag.",
    workflow: [
      "Hero",
      "Estimate Form",
      "Instant Email & Text",
      "Site Visit Invite",
      "Site Visit Booked",
      "Won: Thank-You + Review",
      "Lost: Final Offer",
    ],
    tools: ["GoHighLevel", "AI Studio", "Landing Page", "Workflows", "Pipelines", "Email & SMS"],
    video: {
      loop: "/projects/timberline-tree-care-loop.mp4",
      voiceover: "/projects/timberline-tree-care-voiceover.mp4",
      duration: "0:23",
      poster: "/projects/timberline-tree-care-poster.webp",
      label: "Screen recording of the Timberline Tree Care demo website: hero, estimate form being filled in, service cards and the emergency storm section",
      caption: "Screen recording of the demo site · fictional brand, built in GoHighLevel AI Studio",
    },
    wide: true,
    workflowShots: {
      nurture: {
        src: "/projects/tree-nurture-workflow.webp",
        alt: "The Timberline Tree Care Nurture workflow in the GoHighLevel workflow builder: estimate request tag → find or create the deal → instant email and tree photo request SMS → wait → site visit booked? → estimate invite, follow-up SMS and nurture-complete tag",
        caption: "Nurture workflow · built in GoHighLevel (demo sub-account, draft)",
        width: 760,
        height: 1918,
      },
      close: {
        src: "/projects/tree-close-workflow.webp",
        alt: "The Timberline Tree Care Close workflow in the GoHighLevel workflow builder: site-visit-booked tag → deal to Site Visit Booked → stop the follow-up → confirmation email and SMS → wait → job won? → won, thank-you and customer tag, or an estimate follow-up, recheck, then lost",
        caption: "Close workflow · built in GoHighLevel (demo sub-account, draft)",
        width: 760,
        height: 2310,
      },
    },
  },
  {
    slug: "payment-recovery",
    title: "Payment Recovery Pipeline",
    label: "Real build — client details redacted",
    category: "CRM / Automation",
    stages: ["close"],
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
];

/**
 * Earlier portfolio cards, hidden for now so the page shows only the three Capture → Nurture → Close demo systems.
 * Move an entry back into PROJECTS to show it again (its images are still in /public/projects).
 */
export const ARCHIVED_PROJECTS: Project[] = [
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
