// Single source of truth for site-wide settings. No GoHighLevel IDs live here.

// Public URL of the deployed site. Used for sitemap, canonical and og:image URLs.
// Custom domain (Cloudflare DNS → Vercel). leadboosterx.com 308-redirects here.
export const SITE_URL = "https://www.leadboosterx.com";

export const SITE_NAME = "LeadBoosterX";

export const CONTACT = {
  email: "ericsonlargo92@gmail.com",
  facebook: "https://www.facebook.com/ericsonlargo.metamediabuyer/",
};

/**
 * Freelance / job-site profiles. Shown on the Hire page and listed in structured data (sameAs) so search engines
 * connect them to this site. Leave a url empty to hide it.
 */
export const PROFILES: { name: string; url: string }[] = [
  { name: "Upwork", url: "" },
  { name: "OnlineJobs.ph", url: "" },
  { name: "LinkedIn", url: "" },
];
export const profileUrls = () => PROFILES.map((p) => p.url).filter(Boolean);

// Cal.com booking page: https://cal.com/<username>/<event-slug>
export const BOOKING = {
  calLink: "ericson-largo-zbq89g/30min",
  durationMinutes: 30,
};
export const bookingUrl = `https://cal.com/${BOOKING.calLink}`;

export const OG_IMAGE = `${SITE_URL}/images/og.jpg`;
