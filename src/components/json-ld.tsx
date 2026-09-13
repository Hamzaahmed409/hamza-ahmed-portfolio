import { profile, flatStack } from "@/content/profile";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:43123";

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.tagline,
    email: profile.email,
    telephone: profile.phone,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
      addressLocality: "Karachi",
    },
    sameAs: [profile.links.linkedin, profile.links.github].filter(
      (url) => Boolean(url) && !url.endsWith("linkedin.com/in/") && !url.endsWith("github.com/"),
    ),
    knowsAbout: flatStack.slice(0, 16),
    alumniOf: profile.experience.map((job) => ({
      "@type": "Organization",
      name: job.company,
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} Portfolio`,
    url: siteUrl,
    description: profile.tagline,
    author: { "@type": "Person", name: profile.name },
    inLanguage: "en",
  };

  const portfolio = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected mobile apps",
    itemListElement: profile.projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.name,
        applicationCategory: project.category,
        operatingSystem: project.platform,
        description: project.summary,
        url:
          project.websiteUrl ||
          project.storeUrl ||
          project.playStoreUrl ||
          `${siteUrl}/#${project.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolio) }}
      />
    </>
  );
}
