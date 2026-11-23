import { z } from "zod";

export const HELP_OPTIONS = [
  "Complete Capture → Nurture → Close build",
  "Capture: funnels, forms & chat",
  "Nurture: follow-up automation",
  "Close: calendars, payments & reviews",
  "Fix my GoHighLevel account",
  "Move from another CRM",
  "AI conversations",
  "Agency client builds",
  "Not sure yet",
] as const;

export const GHL_STATUS_OPTIONS = [
  "Already using GoHighLevel",
  "Switching from another CRM",
  "Starting fresh",
  "Agency with client accounts",
] as const;

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name.").max(80),
  lastName: z.string().trim().min(1, "Please enter your last name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: optionalText(40),
  business: optionalText(120),
  website: optionalText(300),
  help: z.array(z.enum(HELP_OPTIONS)).max(HELP_OPTIONS.length).default([]),
  ghlStatus: z.union([z.enum(GHL_STATUS_OPTIONS), z.literal("")]).default(""),
  message: z.string().trim().min(10, "Please tell me a little more (at least 10 characters).").max(5000),
  // Honeypot: real visitors never see or fill this.
  company_website: optionalText(500),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactResult = { ok: true } | { ok: false; error: string };
