export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
}

export interface OperatingHour {
  days: string;
  hours: string;
}

export interface EmergencyBanner {
  enabled: boolean;
  text: string;
  badge: string;
  phone: string;
  linkText?: string;
  linkHref?: string;
}

export interface SiteGeneralSettings {
  name: string;
  shortName: string;
  tagline: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  email: string;
  headOffice: string;
  headOfficeMap: string;
  park: string;
  parkMap: string;
  hours: OperatingHour[];
  socials: SocialLinks;
  emergencyBanner: EmergencyBanner;
  metaTitle: string;
  metaDescription: string;
}

export interface HomeStat {
  value: string;
  label: string;
  description: string;
}

export interface HomeServiceHighlight {
  title: string;
  badge: string;
  body: string;
  href: string;
}

export interface WhyUsItem {
  tag: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  relationship: string;
  location: string;
  stars: number;
}

export interface HomePageContent {
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroPrimaryCtaText: string;
  heroPrimaryCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
  stats: HomeStat[];
  servicesHeading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  services: HomeServiceHighlight[];
  whyUsHeading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  whyUsItems: WhyUsItem[];
  gardenHighlight: {
    eyebrow: string;
    title: string;
    body1: string;
    body2: string;
    image: string;
    ctaText: string;
    ctaLink: string;
  };
  testimonialsHeading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  testimonials: Testimonial[];
  ctaBand: {
    title: string;
    description: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface CoreValue {
  title: string;
  description: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface AboutPageContent {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
  };
  mission: {
    title: string;
    body: string;
  };
  vision: {
    title: string;
    body: string;
  };
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    image: string;
  };
  values: CoreValue[];
  milestones: Milestone[];
  teamHeading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  team: TeamMember[];
  facilities: {
    title: string;
    description: string;
    features: string[];
    image: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  body: string;
  image: string;
  cta: string;
  href: string;
}

export interface ServicesPageContent {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
  };
  servicesList: ServiceItem[];
  additionalServices: string[];
  transportHeading: {
    title: string;
    description: string;
    features: string[];
  };
}

export interface VaultTier {
  id: string;
  title: string;
  subtitle: string;
  capacity: string;
  description: string;
  priceNote: string;
  features: string[];
  isPopular?: boolean;
}

export interface ParkAmenity {
  title: string;
  description: string;
}

export interface GardenOfPeaceContent {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
  };
  aboutPark: {
    eyebrow: string;
    title: string;
    description: string;
    locationNote: string;
  };
  vaultTiers: VaultTier[];
  amenitiesHeading: {
    eyebrow: string;
    title: string;
    description: string;
  };
  amenities: ParkAmenity[];
  galleryImages: {
    url: string;
    title: string;
    caption: string;
  }[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  priceTag?: string;
  image?: string;
  badge?: string;
}

export interface ProductCollection {
  id: string;
  title: string;
  image: string;
  body: string;
  items: string[];
}

export interface MemorialProductsContent {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
  };
  collections: ProductCollection[];
  customInquiryNote: {
    title: string;
    body: string;
    ctaText: string;
    ctaLink: string;
  };
}

export interface PrePlanningStep {
  step: string;
  title: string;
  description: string;
}

export interface PrePlanningContent {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
  };
  benefits: {
    title: string;
    description: string;
  }[];
  steps: PrePlanningStep[];
  checklistItems: string[];
}

export interface InvestmentEstateTier {
  title: string;
  plots: string;
  description: string;
  features: string[];
}

export interface InvestmentContent {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
  };
  valueProposition: {
    title: string;
    body: string;
    points: string[];
  };
  estateTiers: InvestmentEstateTier[];
  faqExcerpt: {
    question: string;
    answer: string;
  }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Garden of Peace" | "Services & Planning" | "Pricing & Payment" | "Obituaries";
}

export interface FaqContent {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  categories: string[];
  faqs: FaqItem[];
}

export interface ContactBranch {
  title: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapLink: string;
}

export interface ContactPageContent {
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  branches: ContactBranch[];
  emergencyContact: {
    heading: string;
    description: string;
    phone: string;
    whatsapp: string;
  };
  inquirySubjects: string[];
}

export interface EstimatorPricingMatrix {
  vaultSingle: number;
  vaultDouble: number;
  vaultTriple: number;
  vaultFamilyMausoleum: number;
  casketBasic: number;
  casketStandard: number;
  casketExecutive: number;
  casketLuxuryBronze: number;
  hearseStandard: number;
  hearseExecutiveEscort: number;
  pallbearersTeam: number;
  chapelRental: number;
  receptionHall: number;
  livestreamProduction: number;
  customHeadstoneGranite: number;
  perpetualCareMaintenanceFee: number;
  intermentFee: number;
}

export interface CMSContent {
  version: number;
  lastUpdated: string;
  settings: SiteGeneralSettings;
  home: HomePageContent;
  about: AboutPageContent;
  services: ServicesPageContent;
  gardenOfPeace: GardenOfPeaceContent;
  memorialProducts: MemorialProductsContent;
  prePlanning: PrePlanningContent;
  investment: InvestmentContent;
  estimator: EstimatorPricingMatrix;
  faq: FaqContent;
  contact: ContactPageContent;
}
