import { CONTACT, SITE_NAME, SITE_URL, bookingUrl } from "./config";

/**
 * Structured data (schema.org JSON-LD) so search engines understand who the site is for.
 * Only facts already on the site — no ratings, reviews, prices or addresses.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      image: `${SITE_URL}/images/og.jpg`,
      description:
        "GoHighLevel systems that capture, nurture and close: funnels, follow-up automation, calendars and payments, built by a HighLevel Certified Admin. Live in 14 days, no long-term contract.",
      email: CONTACT.email,
      founder: { "@id": `${SITE_URL}/#ericson` },
      areaServed: "Worldwide",
      sameAs: [CONTACT.facebook],
      potentialAction: { "@type": "ReserveAction", target: bookingUrl, name: "Book a Free Growth Call" },
      knowsAbout: ["GoHighLevel", "HighLevel CRM administration", "Sales funnels", "Marketing automation", "Pipelines and workflows", "AI automation"],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#ericson`,
      name: "Ericson Largo",
      jobTitle: "Founder, LeadBoosterX — GoHighLevel Specialist",
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: "HighLevel Certified Admin",
        credentialCategory: "certification",
        recognizedBy: { "@type": "Organization", name: "HighLevel" },
      },
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}/images/ericson.webp`,
      sameAs: [CONTACT.facebook],
      worksFor: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

/** FAQPage structured data from the same Q&A shown on /contact. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export const jsonLdScript = (data: unknown) => ({ type: "application/ld+json", children: JSON.stringify(data) });
