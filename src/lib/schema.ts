import { CONTACT, SITE_NAME, SITE_URL, bookingUrl, profileUrls } from "./config";
import { CERTIFICATE, CREDENTIAL, PACKAGES } from "./offer";

/**
 * Structured data (schema.org JSON-LD) so search engines and AI answer engines understand who the site is for.
 * Only facts already on the site — no ratings, reviews, prices or addresses.
 */
export const BUSINESS = `${SITE_URL}/#business`;
export const PERSON = `${SITE_URL}/#ericson`;
const WEBSITE = `${SITE_URL}/#website`;

const SERVICE_TYPES = [
  "GoHighLevel setup",
  "GoHighLevel account fixes",
  "GoHighLevel management",
  "CRM migration to GoHighLevel",
  "Marketing automation",
  "Sales funnel build",
];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": BUSINESS,
      name: SITE_NAME,
      alternateName: "LeadBoosterX Revenue Systems",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-512.png`, width: 512, height: 512 },
      image: `${SITE_URL}/images/og.jpg`,
      slogan: "GoHighLevel Systems That Capture, Nurture and Close.",
      description:
        "LeadBoosterX sets up, fixes and runs GoHighLevel (HighLevel CRM) systems that capture every lead, follow up automatically and move leads to a booked call or a closed sale. Built by a HighLevel Certified Admin, in the client's own account, with no long-term contract.",
      email: CONTACT.email,
      founder: { "@id": PERSON },
      employee: { "@id": PERSON },
      areaServed: { "@type": "Place", name: "Worldwide" },
      sameAs: [CONTACT.facebook, ...profileUrls()],
      potentialAction: { "@type": "ReserveAction", target: bookingUrl, name: "Book a Free Growth Call" },
      knowsAbout: [
        "GoHighLevel",
        "HighLevel CRM administration",
        "Lead capture",
        "Lead nurturing",
        "Sales funnels",
        "Marketing automation",
        "SMS and email follow-up",
        "Pipelines and workflows",
        "Appointment booking and calendars",
        "Payment links and failed-payment recovery",
        "CRM migration",
        "AI automation",
        "GoHighLevel virtual assistant services",
        "GoHighLevel freelancing",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "GoHighLevel packages",
        itemListElement: PACKAGES.map((p) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: p.name,
            serviceType: SERVICE_TYPES,
            description: `${p.tagline} ${p.who}`,
            provider: { "@id": BUSINESS },
          },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": PERSON,
      name: "Ericson Largo",
      jobTitle: "Founder, LeadBoosterX — GoHighLevel Specialist, Freelancer & Virtual Assistant",
      hasOccupation: {
        "@type": "Occupation",
        name: "GoHighLevel Specialist",
        alternateName: ["GoHighLevel Freelancer", "GoHighLevel Virtual Assistant", "GHL VA", "HighLevel CRM Administrator"],
        skills: "GoHighLevel workflows, funnels, pipelines, SMS and email automation, calendars, payments, CRM migration, agency snapshots",
      },
      description:
        "HighLevel Certified Admin and founder of LeadBoosterX. Builds GoHighLevel systems that capture, nurture and close, after 10+ years in sales, support and revenue roles, including 5 years at Intuit.",
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: CERTIFICATE.name,
        alternateName: CREDENTIAL,
        credentialCategory: "certification",
        identifier: CERTIFICATE.id,
        url: CERTIFICATE.verifyUrl,
        image: `${SITE_URL}${CERTIFICATE.image}`,
        dateCreated: "2026-11-24",
        expires: "2027-11-24",
        recognizedBy: { "@type": "Organization", name: "HighLevel", url: "https://www.gohighlevel.com" },
      },
      knowsAbout: ["GoHighLevel", "HighLevel CRM", "Marketing automation", "Sales funnels", "CRM migration"],
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}/images/ericson.webp`,
      sameAs: [CONTACT.facebook, CERTIFICATE.verifyUrl, ...profileUrls()],
      worksFor: { "@id": BUSINESS },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": BUSINESS },
    },
  ],
};

/** Breadcrumb trail Home → page, shown by Google under the result URL. */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}

/** WebPage of a specific kind (AboutPage, ContactPage, ProfilePage, CollectionPage …) tied to the site graph. */
export function webPageJsonLd(type: string, path: string, name: string, description: string, extra: Record<string, unknown> = {}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE },
    about: { "@id": BUSINESS },
    ...extra,
  };
}

/** FAQPage structured data from the same Q&A shown on /contact. */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export const jsonLdScript = (data: unknown) => ({ type: "application/ld+json", children: JSON.stringify(data) });
