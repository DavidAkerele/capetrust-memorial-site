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

export const nav = [
  { label: "About", to: "/about" },
  { label: "Park", to: "/garden-of-peace" },
  { label: "Services", to: "/services" },
  { label: "Estimator", to: "/estimator" },
  { label: "Obituaries", to: "/obituaries" },
  { label: "Estates", to: "/investment" },
  { label: "Products", to: "/memorial-products" },
  { label: "Planning", to: "/pre-planning" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];
