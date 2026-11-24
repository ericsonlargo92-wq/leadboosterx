import { OG_IMAGE, SITE_NAME, SITE_URL } from "./config";
import { breadcrumbJsonLd, jsonLdScript } from "./schema";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  /** Short page name for the breadcrumb trail (inner pages). */
  crumb?: string;
  /** Extra JSON-LD blocks for this page. */
  jsonLd?: unknown[];
  image?: string;
  imageAlt?: string;
};

/** Builds the per-route head() payload: title, description, Open Graph, Twitter, canonical and JSON-LD. */
export function seo({ title, description, path, crumb, jsonLd = [], image = OG_IMAGE, imageAlt }: SeoInput) {
  const url = `${SITE_URL}${path}`;
  const blocks = [...(crumb ? [breadcrumbJsonLd(crumb, path)] : []), ...jsonLd];
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt ?? `${SITE_NAME} — GoHighLevel systems that capture, nurture and close` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: blocks.map(jsonLdScript),
  };
}

/** "Q4 2026" style label (no longer shown in the sidebar; kept for reuse). */
export function quarterLabel(date = new Date()) {
  const q = Math.floor(date.getMonth() / 3) + 1;
  return `Q${q} ${date.getFullYear()}`;
}
