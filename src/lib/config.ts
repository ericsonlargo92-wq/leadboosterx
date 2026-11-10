// Single source of truth for site-wide settings. No GoHighLevel IDs live here.

// Public URL of the deployed site. Used for sitemap, canonical and og:image URLs.
// Change this once a custom domain is connected in Vercel.
export const SITE_URL = "https://leadboosterx.vercel.app";

export const SITE_NAME = "LeadBoosterX";

export const CONTACT = {
  email: "ericsonlargo92@gmail.com",
  facebook: "https://www.facebook.com/ericsonlargo.metamediabuyer/",
};

// Cal.com booking page: https://cal.com/<username>/<event-slug>
export const BOOKING = {
  calLink: "ericsonlargo/strategy-call", // placeholder: replace with the real Cal.com link
  durationMinutes: 30,
};
export const bookingUrl = `https://cal.com/${BOOKING.calLink}`;

export const OG_IMAGE = `${SITE_URL}/images/og.jpg`;
