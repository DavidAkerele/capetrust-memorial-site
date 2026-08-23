export const site = {
  name: "Capetrust Funeral Services",
  shortName: "Capetrust",
  tagline: "Honouring Every Life with Dignity, Care & Excellence.",
  phone: "+234 802 6666 655",
  phoneHref: "tel:+2348026666655",
  whatsapp: "https://wa.me/2348026666655",
  email: "info@capetrustfunerals.com",
  headOffice: "194, Elepe Road, Ikorodu, Lagos, Nigeria",
  headOfficeMap: "https://maps.app.goo.gl/PUVqwt1gfj8G3DXv7",
  park: "Garden of Peace Memorial Park, Odo-Ayandelu, Agbowa, Lagos",
  parkMap: "https://www.google.com/maps/search/Odo-Ayandelu+Agbowa+Lagos",
  hours: [
    ["Monday – Friday", "8:00 AM – 5:00 PM"],
    ["Saturday", "9:00 AM – 3:00 PM"],
    ["Sunday & Public Holidays", "By Appointment"],
  ] as const,
};

export interface NavChild {
  label: string;
  to: string;
  description: string;
}

export interface NavItem {
  label: string;
  to?: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: "About", to: "/about" },
  {
    label: "Services & Park",
    children: [
      {
        label: "Funeral & Burial Services",
        to: "/services",
        description: "Full funeral planning, burial coordination, and family care",
      },
      {
        label: "Garden of Peace™ Memorial Park",
        to: "/garden-of-peace",
        description: "10+ acres private cemetery in Agbowa-Ikosi, Lagos",
      },
      {
        label: "Memorial Products & Caskets",
        to: "/memorial-products",
        description: "Caskets, headstones, and memorial finishes",
      },
    ],
  },
  {
    label: "Planning & Pricing",
    children: [
      {
        label: "Price Estimator",
        to: "/estimator",
        description: "Interactive vault pricing and instant cost breakdown",
      },
      {
        label: "Pre-Planning Guide",
        to: "/pre-planning",
        description: "Plan ahead to protect and support your family",
      },
      {
        label: "Family Estates & Investment",
        to: "/investment",
        description: "Private family mausoleums and inflation-hedged plots",
      },
    ],
  },
  {
    label: "Obituaries",
    children: [
      {
        label: "Memorial Tributes & Directory",
        to: "/obituaries",
        description: "Search obituaries, light memorial candles, and share condolences",
      },
      {
        label: "Publish a Memorial",
        to: "/obituaries/create",
        description: "Create a dedicated online tribute page for a loved one",
      },
    ],
  },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export const nav = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Garden of Peace™ Park", to: "/garden-of-peace" },
  { label: "Price Estimator", to: "/estimator" },
  { label: "Obituaries & Tributes", to: "/obituaries" },
  { label: "Family Estates", to: "/investment" },
  { label: "Memorial Products", to: "/memorial-products" },
  { label: "Pre-Planning", to: "/pre-planning" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];
