import { z } from "zod";

export const HELP_OPTIONS = [
  "Lead Generation",
  "Meta Ads",
  "AI Automation",
  "GoHighLevel CRM",
  "Funnels / Landing Pages",
  "Appointment Setting",
  "Sales Process & Follow-Up",
  "Not sure yet",
] as const;

export const BUDGET_OPTIONS = ["Not running ads yet", "Under $1,000", "$1,000–$5,000", "$5,000+"] as const;

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name.").max(80),
  lastName: z.string().trim().min(1, "Please enter your last name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: optionalText(40),
  business: optionalText(120),
  website: optionalText(300),
  help: z.array(z.enum(HELP_OPTIONS)).max(HELP_OPTIONS.length).default([]),
  budget: z.union([z.enum(BUDGET_OPTIONS), z.literal("")]).default(""),
  message: z.string().trim().min(10, "Please tell me a little more (at least 10 characters).").max(5000),
  // Honeypot: real visitors never see or fill this.
  company_website: optionalText(500),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ContactResult = { ok: true } | { ok: false; error: string };
