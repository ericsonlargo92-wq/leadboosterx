import { OG_IMAGE, SITE_NAME, SITE_URL } from "./config";

type SeoInput = { title: string; description: string; path: string };

/** Builds the per-route head() payload: title, description, Open Graph, Twitter and canonical. */
export function seo({ title, description, path }: SeoInput) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** "Q4 2026 — Booking new projects" style badge text. */
export function quarterLabel(date = new Date()) {
  const q = Math.floor(date.getMonth() / 3) + 1;
  return `Q${q} ${date.getFullYear()}`;
}
