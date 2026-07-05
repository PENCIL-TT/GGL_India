export interface CmsPageEntry {
  key: string;
  label: string;
  description: string;
}

export const CMS_PAGES: CmsPageEntry[] = [
  { key: 'header', label: 'Header', description: 'Site logo, partner logo, and CTA button (shown on every page).' },
  { key: 'footer', label: 'Footer', description: 'Footer logos, about blurb, and social links (shown on every page).' },
  { key: 'home', label: 'Home Page', description: 'Hero banner, portal links, global presence teaser, quick enquiry text.' },
  { key: 'home-about', label: 'Home — About Us Section', description: 'The "About Us" teaser block shown on the home page.' },
  { key: 'about-page', label: 'About Page', description: 'Full About page heading, paragraphs, services grid, and footer text.' },
  { key: 'careers', label: 'Careers Page', description: 'Hero, benefit cards, and call-to-action.' },
  { key: 'contact', label: 'Contact Page', description: 'Hero text, form headings, and office address shown above the form.' },
  { key: 'global-presence', label: 'Global Presence Page', description: 'Page intro text and default map link (office list is managed separately).' },
  { key: 'services-page', label: 'Services Page', description: 'Hero heading, subtitle, and background image for the /services grid page.' },
];

export const CMS_SEO_PAGES: CmsPageEntry[] = [
  { key: 'home-seo', label: 'Home — SEO', description: 'Meta title, description, and social share image for the home page.' },
  { key: 'about-seo', label: 'About — SEO', description: 'Meta title, description, and social share image for the About page.' },
  { key: 'careers-seo', label: 'Careers — SEO', description: 'Meta title, description, and social share image for the Careers page.' },
  { key: 'contact-seo', label: 'Contact — SEO', description: 'Meta title, description, and social share image for the Contact page.' },
  { key: 'services-seo', label: 'Services — SEO', description: 'Meta title, description, and social share image for the Services page.' },
  { key: 'global-presence-seo', label: 'Global Presence — SEO', description: 'Meta title, description, and social share image for the Global Presence page.' },
  { key: 'privacy-policy-seo', label: 'Privacy Policy — SEO', description: 'Meta title, description, and social share image for the Privacy Policy page.' },
  { key: 'terms-of-use-seo', label: 'Terms of Use — SEO', description: 'Meta title, description, and social share image for the Terms of Use page.' },
];
