export interface PortalLink {
  icon: string;
  title: string;
  description: string;
  url: string;
  external: boolean;
}

export interface HomeContent {
  hero: {
    badgeText: string;
    headline: string;
    highlightedWord: string;
    headlineSuffix: string;
    subheadline: string;
    sliderImages: string[];
    portalLinks: PortalLink[];
  };
  globalPresenceTeaser: { heading: string; description: string };
  quickEnquiry: { heading: string; subtext: string };
  aboutTeaser: { heading: string; paragraphs: string[]; image: string };
}

export const defaultHomeContent: HomeContent = {
  hero: {
    badgeText: 'Beyond Logistics, a Complete Solution',
    headline: 'Delivering Excellence in',
    highlightedWord: 'Global Logistics',
    headlineSuffix: 'Solutions',
    subheadline:
      'GGL brings over 25 years of expertise in international logistics, offering comprehensive solutions tailored to your business needs.',
    sliderImages: ['/hom1.png'],
    portalLinks: [
      { icon: 'Users', title: 'Consolmate', description: 'Access shipping dashboard', url: 'https://consolmate.com/auth/login/15', external: true },
      { icon: 'UserCircle', title: 'Partner Portal', description: 'Manage partnership', url: '', external: false },
      {
        icon: 'SearchCode',
        title: 'Tracking',
        description: 'Track your shipment',
        url: 'http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:102:::::P0_GROUP_RID:262',
        external: true,
      },
      {
        icon: 'Ship',
        title: 'Sailing Schedule',
        description: 'View schedules',
        url: 'http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:104:::::P0_GROUP_RID:262',
        external: true,
      },
      { icon: 'Calendar', title: 'Online Quote', description: 'Request a quote', url: '/contact', external: false },
    ],
  },
  globalPresenceTeaser: {
    heading: 'Global Presence',
    description: 'Our logistics network spans across continents, enabling seamless global shipping solutions.',
  },
  quickEnquiry: {
    heading: 'Quick Enquiry',
    subtext: "Have a question? Fill out the form below and we'll get back to you shortly.",
  },
  aboutTeaser: {
    heading: 'About Us',
    paragraphs: [
      'GGL is a trusted global leader in LCL (Less-than-Container Load) consolidation. With a robust presence across North America, the UK, the Middle East, the Indian Subcontinent, Southeast Asia, and the Far East, we offer streamlined groupage services backed by strong customer support and competitive pricing.',
      'We are Strategically positioned in major transshipment hubs like Singapore, Malaysia, Sri Lanka, and Dubai, GGL operates direct weekly sailings to key global ports. Our expansive network ensures fast, reliable, and cost-effective consolidation options for freight forwarders and logistics providers.',
    ],
    image: '/lovable-uploads/14c89acc-9c64-4484-b520-f5142136ccc6.png',
  },
};
