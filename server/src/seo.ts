/**
 * Server-side SEO metadata injection.
 *
 * The client is a Vite/React SPA served from a single index.html, so every
 * route previously emitted identical <title>/<meta> tags. This module rewrites
 * those tags per-route in the HTML before it is sent, which means crawlers and
 * social scrapers (LinkedIn, X, Slack) receive correct metadata without
 * executing JavaScript.
 */

const SITE_NAME = "Essayons Change";
const BASE_URL = "https://www.essayonschange.com";
const DEFAULT_IMAGE = `${BASE_URL}/favicon.png`;

export interface FaqPair {
  question: string;
  answer: string;
}

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  /** Question/answer pairs emitted as FAQPage structured data. */
  faq?: FaqPair[];
}

const DEFAULT_DESCRIPTION =
  "Essayons Change combines research-driven frameworks with practical tools to help organizations design, measure, and sustain transformational change.";

/**
 * Static route metadata. Titles lead with the page's specific value and end
 * with the brand; descriptions are written to earn the click, not to keyword-stuff.
 */
export const STATIC_META: Record<string, PageMeta> = {
  "/": {
    title: "Change Management & Leadership Consulting | Essayons Change",
    description:
      "Fractional change management, readiness assessments, and the CMIS platform for mid-market and PE-backed organizations. Serving Greater St. Louis and nationwide.",
    path: "/",
  },
  "/about": {
    title: "About Essayons Change | Research-Driven Change Management",
    description:
      "Founded to close the gap between individual understanding and organizational intent. Meet the team behind the Change Management Information System.",
    path: "/about",
  },
  "/blog": {
    title: "Insights & Resources | Essayons Change",
    description:
      "Practical guidance and research on change execution, adoption risk, readiness, and why change initiatives fail. Written for leaders running real transformations.",
    path: "/blog",
  },
  "/tutorials": {
    title: "Tutorials | Essayons Change",
    description:
      "Step-by-step guides for running change initiatives with the Change Management Information System, from readiness surveys to stakeholder engagement.",
    path: "/tutorials",
  },
  "/games": {
    title: "Interactive Assessments & Learning | Essayons Change",
    description:
      "Assess your leadership readiness and change management style with free interactive tools, including the Leadership Readiness Quiz and Leadership Style Quiz.",
    path: "/games",
  },
  "/model": {
    title: "The Integrated Change Management Model (ICMM) | Essayons Change",
    description:
      "A five-step change framework that manages organizational and individual change at the same time. Built on doctoral research into employee experience during change.",
    path: "/model",
    faq: [
      {
        question: "What is the Integrated Change Management Model?",
        answer:
          "The Integrated Change Management Model, or ICMM, is a five-step change framework that manages the organizational and individual dimensions of change simultaneously rather than choosing one at the expense of the other. The five steps are: identify the need to change, identify the stakeholders, develop the change, implement the change, and reinforce the change. At each step, the model requires leaders to address both what the organization must do and what the people affected by the change need to understand.",
      },
      {
        question: "What are the five steps of the ICMM?",
        answer:
          "Step 1 is identify the need to change. Step 2 is identify the stakeholders. Step 3 is develop the change. Step 4 is implement the change. Step 5 is reinforce the change. Each step runs an organizational track and an individual track in parallel, so the operational work and the human work advance together.",
      },
      {
        question: "What is the Lens of Experience?",
        answer:
          "The Lens of Experience is the accumulated weight of prior events that every employee brings into a change initiative before a single word has been communicated. It has four components: past experience with similar changes, existing conflict and group dynamics, the trust balance in the organization, and the leader's own lens. It is invisible to the leader and completely real to the employee.",
      },
      {
        question:
          "What is the difference between Commander's Intent and Commander's Directive?",
        answer:
          "A Commander's Directive communicates the task and the method: what to do and how to do it. A Commander's Intent communicates the end state and the reason for it: what success looks like and why it matters. A directive produces compliance, while an intent produces understanding. In organizational change, where conditions shift constantly, compliance is not enough because it does not survive contact with situations the plan did not anticipate.",
      },
      {
        question: "How is the ICMM different from other change management models?",
        answer:
          "Most established change models address one dimension well. Process-driven models describe what the organization should do and treat adoption as a downstream consequence. Individually focused models describe how people move through transition but leave the operational work unspecified. The ICMM holds both dimensions at every step, because in practice the organizational and individual dimensions of a change fail together.",
      },
    ],
  },
  "/offerings": {
    title: "Fractional Change Management & Consulting | Essayons Change",
    description:
      "Embedded change leadership without a full-time hire. Fractional engagements, change readiness assessments, and the CMIS system of record for organizational change.",
    path: "/offerings",
  },
  "/pricing": {
    title: "Pricing | Essayons Change",
    description:
      "Commercial and enterprise plans for the Change Management Information System. Find the tier that fits your organization's change portfolio.",
    path: "/pricing",
  },
  "/contact": {
    title: "Schedule a Consultation | Essayons Change",
    description:
      "Talk with a change management consultant about your organization's transformation. Serving the Greater St. Louis area, Northwest Indiana, Evansville, and nationwide.",
    path: "/contact",
  },
  "/privacy": {
    title: "Privacy Policy | Essayons Change",
    description: "How Essayons Change collects, uses, and protects your information.",
    path: "/privacy",
  },
  "/terms": {
    title: "Terms of Use | Essayons Change",
    description: "The terms governing use of the Essayons Change website and services.",
    path: "/terms",
  },
};

/** Routes that should never be indexed. */
export const NOINDEX_PREFIXES = ["/admin", "/investor"];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Trim to a clean length on a word boundary for meta descriptions. */
export function truncate(text: string, max = 160): string {
  const clean = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, "") + "…";
}

function organizationJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    legalName: "Essayons Change Corp",
    url: BASE_URL,
    logo: DEFAULT_IMAGE,
    image: DEFAULT_IMAGE,
    description: DEFAULT_DESCRIPTION,
    email: "psmith@essayonschange.com",
    telephone: "+1-240-446-1093",
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Worden",
      addressRegion: "IL",
      addressCountry: "US",
    },
    // Metros served. Google uses areaServed to associate the practice with
    // regional queries even without a storefront in each city.
    areaServed: [
      { "@type": "City", name: "St. Louis", address: { "@type": "PostalAddress", addressRegion: "MO", addressCountry: "US" } },
      { "@type": "City", name: "Munster", address: { "@type": "PostalAddress", addressRegion: "IN", addressCountry: "US" } },
      { "@type": "City", name: "Evansville", address: { "@type": "PostalAddress", addressRegion: "IN", addressCountry: "US" } },
      { "@type": "Country", name: "United States" },
    ],
    knowsAbout: [
      "Change Management",
      "Organizational Change Management",
      "Change Leadership",
      "Leadership Development",
      "Organizational Readiness",
      "Stakeholder Engagement",
      "Change Management Information System",
    ],
    sameAs: ["https://www.linkedin.com/company/essayons-change/"],
  });
}

function faqJsonLd(faq: FaqPair[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  });
}

function articleJsonLd(meta: PageMeta): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    url: `${BASE_URL}${meta.path}`,
    ...(meta.publishedTime ? { datePublished: meta.publishedTime } : {}),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: DEFAULT_IMAGE },
    },
  });
}

/**
 * Rewrite the <title>/<meta> block of index.html for a specific route.
 * Falls back to defaults so an unknown route still produces valid markup.
 */
export function injectMeta(html: string, meta: PageMeta, noindex = false): string {
  const url = `${BASE_URL}${meta.path === "/" ? "/" : meta.path}`;
  const image = meta.image || DEFAULT_IMAGE;
  const type = meta.type || "website";

  const title = escapeHtml(meta.title);
  const description = escapeHtml(truncate(meta.description));

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<link rel="canonical" href="${url}">`,
    noindex
      ? `<meta name="robots" content="noindex, nofollow">`
      : `<meta name="robots" content="index, follow, max-image-preview:large">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${title}">`,
    `<meta name="twitter:description" content="${description}">`,
    `<meta name="twitter:image" content="${image}">`,
    meta.publishedTime
      ? `<meta property="article:published_time" content="${escapeHtml(meta.publishedTime)}">`
      : "",
    `<script type="application/ld+json">${
      type === "article" ? articleJsonLd(meta) : organizationJsonLd()
    }</script>`,
    meta.faq && meta.faq.length
      ? `<script type="application/ld+json">${faqJsonLd(meta.faq)}</script>`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  // Remove the build-time title/description so they cannot duplicate.
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name=["']description["'][^>]*>/i, "");

  // Insert immediately before </head> so tags win over anything earlier.
  return out.replace(/<\/head>/i, `  ${tags}\n  </head>`);
}

/** Resolve metadata for a static route, or null if it is not a known static page. */
export function getStaticMeta(pathname: string): PageMeta | null {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return STATIC_META[normalized] || null;
}

export function isNoindexPath(pathname: string): boolean {
  return NOINDEX_PREFIXES.some((p) => pathname.startsWith(p));
}

export { BASE_URL, SITE_NAME, DEFAULT_DESCRIPTION };
