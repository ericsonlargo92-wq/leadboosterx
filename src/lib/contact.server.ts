// Server-only: never imported by client code. Reads secrets from the environment.
import { Resend } from "resend";
import type { ContactData, ContactResult } from "./contact-schema";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function sendContactEmail(data: ContactData): Promise<ContactResult> {
  // Bots fill the hidden field: pretend it worked, send nothing.
  if (data.company_website) return { ok: true };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "LeadBoosterX <onboarding@resend.dev>";
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return { ok: false, error: "Email is not configured." };
  }

  const name = `${data.firstName} ${data.lastName}`.trim();
  const fields: [string, string][] = [
    ["Name", name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Business", data.business || "—"],
    ["Website / Facebook", data.website || "—"],
    ["Needs help with", data.help.length ? data.help.join(", ") : "—"],
    ["Monthly ad budget", data.budget || "—"],
    ["Message", data.message],
  ];

  const text = fields.map(([k, v]) => `${k}: ${v}`).join("\n\n");
  const html = `<div style="font-family:Inter,Arial,sans-serif;font-size:14px;color:#111827">
<h2 style="margin:0 0 16px">New inquiry from the LeadBoosterX site</h2>
<table cellpadding="6" style="border-collapse:collapse">${fields
    .map(
      ([k, v]) =>
        `<tr><td style="vertical-align:top;color:#64748B;white-space:nowrap"><strong>${esc(k)}</strong></td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("")}</table></div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New inquiry — ${name}${data.business ? ` (${data.business})` : ""}`,
      text,
      html,
    });
    if (error) {
      console.error("[contact] Resend error", error);
      return { ok: false, error: "The email service rejected the message." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] send failed", err);
    return { ok: false, error: "The email could not be sent." };
  }
}
