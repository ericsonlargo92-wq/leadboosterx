import { SITE_URL } from "./config";
import { PACKAGES, STAGES } from "./offer";
import { PROJECTS } from "./projects";
import { BUSINESS, PERSON } from "./schema";
import { HIRE_PATH, WORK_TYPES } from "./hire";

/** Page-specific structured data (kept out of schema.ts so the root bundle doesn't load project data). */

/** The three packages as Service entries (what is offered, by whom, where). No prices: they are scoped on a call. */
export function packagesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GoHighLevel packages",
    itemListElement: PACKAGES.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: p.name,
        serviceType: "GoHighLevel setup and management",
        description: `${p.tagline} ${p.who} Includes: ${p.includes.join("; ")}.`,
        provider: { "@id": BUSINESS },
        areaServed: { "@type": "Place", name: "Worldwide" },
        url: `${SITE_URL}/packages`,
      },
    })),
  };
}

/** "0:34" → "PT34S", "1:05" → "PT1M5S". */
const isoDuration = (d?: string) => {
  if (!d) return undefined;
  const [m, s] = d.split(":").map(Number);
  return `PT${m ? `${m}M` : ""}${s}S`;
};

/** Projects as an ItemList; each demo's screen recordings and workflow walkthroughs as VideoObjects. */
export function projectsJsonLd() {
  const video = (name: string, description: string, src: string, poster: string, duration?: string) => ({
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: `${SITE_URL}${poster}`,
    contentUrl: `${SITE_URL}${src}`,
    uploadDate: "2026-11-24",
    duration: isoDuration(duration),
    inLanguage: "en",
    publisher: { "@id": BUSINESS },
  });
  const stageName = (id: string) => STAGES.find((s) => s.id === id)?.name ?? id;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GoHighLevel projects by LeadBoosterX",
    itemListElement: PROJECTS.map((p, i) => {
      const videos = [];
      if (p.journey && p.video)
        videos.push(video(`${p.title}: the full customer journey`, p.journey.label, p.journey.src, p.video.poster, p.journey.duration));
      if (p.video?.voiceover)
        videos.push(video(`${p.title}: website walkthrough`, p.video.label, p.video.voiceover, p.video.poster, p.video.duration));
      for (const id of ["nurture", "close"] as const) {
        const vo = p.workflowShots?.[id].voiceover;
        if (vo) videos.push(video(`${p.title}: ${stageName(id)} workflow in GoHighLevel`, vo.label, vo.src, vo.poster, vo.duration));
      }
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: p.title,
          description: p.description,
          genre: p.label,
          keywords: [...p.tools, ...p.stages.map(stageName)].join(", "),
          creator: { "@id": PERSON },
          url: `${SITE_URL}/projects`,
          ...(p.images ? { image: p.images.map((img) => `${SITE_URL}${img.src}`) } : {}),
          ...(videos.length ? { video: videos } : {}),
        },
      };
    }),
  };
}


/** The ways to hire (freelancer / VA) as Services, for the Hire page. */
export function hireServicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hire a GoHighLevel freelancer or virtual assistant",
    itemListElement: WORK_TYPES.map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: w.name,
        serviceType: ["GoHighLevel virtual assistant", "GoHighLevel freelancer", "HighLevel CRM administration"],
        description: `${w.tagline} ${w.who} Includes: ${w.items.join("; ")}.`,
        provider: { "@id": PERSON },
        areaServed: { "@type": "Place", name: "Worldwide" },
        url: `${SITE_URL}${HIRE_PATH}`,
      },
    })),
  };
}
