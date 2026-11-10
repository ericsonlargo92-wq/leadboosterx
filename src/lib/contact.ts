import { createServerFn } from "@tanstack/react-start";
import { contactSchema, type ContactResult } from "./contact-schema";

/**
 * POST server function behind the discovery form.
 * The Resend logic lives in contact.server.ts, which is loaded only on the server,
 * so the API key never reaches the browser bundle.
 */
export const submitContact = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }): Promise<ContactResult> => {
    const { sendContactEmail } = await import("./contact.server");
    return sendContactEmail(data);
  });
