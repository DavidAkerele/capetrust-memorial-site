export interface CondolenceMessage {
  id: string;
  name: string;
  relationship: string;
  message: string;
  date: string;
}

export interface ServiceEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
}

export interface Obituary {
  id: string;
  slug: string;
  fullName: string;
  title?: string;
  dateOfBirth: string;
  dateOfDeath: string;
  age: number;
  featuredImage: string;
  galleryImages: string[];
  lifeStory: string;
  summaryQuote: string;
  familyNote?: string;
  services: ServiceEvent[];
  candlesCount: number;
  condolences: CondolenceMessage[];
  createdAt: string;
}

export const INITIAL_OBITUARIES: Obituary[] = [
  {
    id: "1",
    slug: "chief-dr-emmanuel-olawale",
    fullName: "Chief (Dr.) Emmanuel Babatunde Olawale",
    title: "Otunba of Agbowa Kingdom",
    dateOfBirth: "March 14, 1944",
    dateOfDeath: "January 18, 2026",
    age: 81,
    featuredImage: "/images/noah-silliman-EBB45rCSjrU-unsplash.jpg",
    galleryImages: [
      "/images/noah-silliman-EBB45rCSjrU-unsplash.jpg",
      "/images/adrianna-geo-JWlZS708L1Y-unsplash.jpg",
      "/images/strauss-western-5a3eFHcGl9U-unsplash.jpg"
    ],
    summaryQuote: "A life of selfless service, visionary leadership, and unwavering faith in God and community.",
    lifeStory: `Chief (Dr.) Emmanuel Babatunde Olawale lived an extraordinary life of leadership, philanthropy, and steadfast devotion to his family, community, and the medical profession.

Born in Lagos in 1944, Dr. Olawale attended CMS Grammar School before pursuing his medical education at the University of Ibadan and postgraduate surgical training in the United Kingdom. Throughout his 45-year career as a consultant surgeon and community elder, he mentored hundreds of young medical practitioners and spearheaded numerous community healthcare initiatives in Ikorodu and Agbowa divisions.

As the Otunba of Agbowa Kingdom, he was a pillar of wisdom, peace, and traditional excellence. He is survived by his beloved wife of 52 years, Chief (Mrs.) Folashade Olawale, 5 children, 14 grandchildren, and extended family across Nigeria and the diaspora.`,
    familyNote: "We thank everyone for the overwhelming outpouring of love, prayers, and tributes during this solemn celebration of an iconic life.",
    services: [
      {
        title: "Service of Songs & Night of Tributes",
        date: "Thursday, February 26, 2026",
        time: "5:00 PM - 8:00 PM",
        location: "Capetrust Private Chapel",
        address: "194, Elepe Rd, Opp Elepe School, Ikorodu, Lagos"
      },
      {
        title: "Funeral & Thanksgiving Service",
        date: "Friday, February 27, 2026",
        time: "10:00 AM",
        location: "Cathedral Church of St. Jude, Ebute Metta / Agbowa",
        address: "Agbowa Central, Lagos State"
      },
      {
        title: "Interment & Committal",
        date: "Friday, February 27, 2026",
        time: "1:30 PM",
        location: "Garden of Peace™ Memorial Park (Private Family Estate Section)",
        address: "Odo-Ayandelu, Agbowa, Lagos State"
      },
      {
        title: "Celebration Reception",
        date: "Friday, February 27, 2026",
        time: "2:30 PM Onwards",
        location: "Grand Ballroom & Canopy Gardens",
        address: "Capetrust Event Grounds, Agbowa, Lagos"
      }
    ],
    candlesCount: 48,
    condolences: [
      {
        id: "c1",
        name: "Senator Adebayo Adeleke",
        relationship: "Family Friend & Associate",
        message: "A colossal loss to Lagos State and the entire medical community. Otunba was a mentor and a true statesman. May his noble soul rest in perfect peace.",
        date: "January 20, 2026"
      },
      {
        id: "c2",
        name: "Dr. & Mrs. Kemi Osinubi",
        relationship: "Colleague",
        message: "Papa lived a fulfilled life with unparalleled generosity. We take comfort knowing his legacy endures forever. Rest on, Chief Dr. Olawale.",
        date: "January 22, 2026"
      },
      {
        id: "c3",
        name: "Hon. Taiwo Alabi",
        relationship: "Community Leader",
        message: "The Agbowa community will forever cherish your immense contributions and peaceful leadership. Adieu Baba rere!",
        date: "January 24, 2026"
      }
    ],
    createdAt: "2026-01-19T10:00:00.000Z"
  },
  {
    id: "2",
    slug: "lady-victoria-oluwayemisi-adeyemi",
    fullName: "Lady Victoria Oluwayemisi Adeyemi (JP)",
    title: "Matriarch of the Adeyemi Dynasty",
    dateOfBirth: "August 22, 1950",
    dateOfDeath: "January 04, 2026",
    age: 75,
    featuredImage: "/images/jacinta-christos-pJ8WXG5C_5U-unsplash.jpg",
    galleryImages: [
      "/images/jacinta-christos-pJ8WXG5C_5U-unsplash.jpg",
      "/images/annie-spratt-38yKQLL11d8-unsplash.jpg",
      "/images/diego-lozano-wuCHIyWheSo-unsplash.jpg"
    ],
    summaryQuote: "A mother in Israel whose kindness, warmth, and grace brightened every life she touched.",
    lifeStory: `Lady Victoria Oluwayemisi Adeyemi was an inspiring educator, devout Christian leader, and entrepreneur. 

Born in 1950, she dedicated over three decades to the Lagos State Educational Service, shaping the minds and morals of countless students across secondary schools in Lagos. Following her retirement as Vice Principal, she established community micro-credit empowerment programs for market women in Ikorodu and Epe divisions.

Her radiant smile, hospitable home, and deep prayer life were pillars of strength to her children, grandchildren, church family, and community. Her memory remains an everlasting blessing to all who knew her.`,
    familyNote: "Rest peacefully in the bosom of your Lord, our dearest mother and grandmother.",
    services: [
      {
        title: "Lying-in-State & Wake Keep",
        date: "Thursday, February 12, 2026",
        time: "4:30 PM",
        location: "Adeyemi Family Residence & Capetrust Reception Hall",
        address: "Elepe, Ikorodu, Lagos State"
      },
      {
        title: "Celebration of Life Service",
        date: "Friday, February 13, 2026",
        time: "10:00 AM",
        location: "Archbishop Vining Memorial Church / Local Parish",
        address: "Ikorodu, Lagos"
      },
      {
        title: "Private Interment",
        date: "Friday, February 13, 2026",
        time: "1:00 PM",
        location: "Garden of Peace™ Memorial Park (Double Vault Section)",
        address: "Odo-Ayandelu, Agbowa, Lagos"
      }
    ],
    candlesCount: 62,
    condolences: [
      {
        id: "c4",
        name: "Mrs. Folashade Balogun",
        relationship: "Former Student & Family Friend",
        message: "Mummy Adeyemi taught me discipline, elegance, and integrity. You were truly a mother to all of us. Rest with the angels.",
        date: "January 06, 2026"
      },
      {
        id: "c5",
        name: "Engr. Femi Adeyemi",
        relationship: "Son",
        message: "Thank you for being our beacon of prayer and strength. We love you forever Mummy.",
        date: "January 07, 2026"
      }
    ],
    createdAt: "2026-01-05T08:30:00.000Z"
  },
  {
    id: "3",
    slug: "elder-michael-folarin-daniels",
    fullName: "Elder Michael Folarin Daniels",
    title: "Distinguished Public Administrator",
    dateOfBirth: "May 10, 1938",
    dateOfDeath: "December 28, 2025",
    age: 87,
    featuredImage: "/images/eli-solitas-q6e4zwgtUcM-unsplash.jpg",
    galleryImages: [
      "/images/eli-solitas-q6e4zwgtUcM-unsplash.jpg",
      "/images/panyawat-auitpol-eq254Cqvmk8-unsplash.jpg",
      "/images/strauss-western-5a3eFHcGl9U-unsplash.jpg"
    ],
    summaryQuote: "An exemplary statesman of integrity, humility, and gentle wisdom.",
    lifeStory: `Elder Michael Folarin Daniels served with distinction in the Nigerian Federal Civil Service for over 35 years before retiring as a Permanent Secretary. 

Known for his calm demeanor, forensic intellect, and incorruptible character, he championed administrative reforms and rural development infrastructure projects across Western Nigeria.

In his retirement, Elder Daniels devoted himself to church administration, mentoring young civil servants, and organic agriculture in Agbowa-Ikosi. He is remembered with deep reverence by his children, grandchildren, and great-grandchildren.`,
    services: [
      {
        title: "Commendation Service",
        date: "Friday, January 30, 2026",
        time: "10:00 AM",
        location: "First Baptist Church, Lagos",
        address: "Lagos Island / Ikorodu"
      },
      {
        title: "Interment",
        date: "Friday, January 30, 2026",
        time: "1:30 PM",
        location: "Garden of Peace™ Memorial Park",
        address: "Odo-Ayandelu, Agbowa, Lagos"
      }
    ],
    candlesCount: 35,
    condolences: [
      {
        id: "c6",
        name: "Chief Oladipo Williams",
        relationship: "Friend & Civil Service Colleague",
        message: "Michael was an officer and a gentleman in the truest sense. His legacy of clean service will guide future generations.",
        date: "January 02, 2026"
      }
    ],
    createdAt: "2025-12-29T14:00:00.000Z"
  }
];

const LOCAL_STORAGE_KEY = "capetrust_obituaries_v1";

export function getStoredObituaries(): Obituary[] {
  if (typeof window === "undefined") {
    return INITIAL_OBITUARIES;
  }

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_OBITUARIES));
      return INITIAL_OBITUARIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_OBITUARIES;
  } catch {
    return INITIAL_OBITUARIES;
  }
}

export function saveObituary(newObituary: Obituary): void {
  if (typeof window === "undefined") return;
  const current = getStoredObituaries();
  const updated = [newObituary, ...current.filter((o) => o.slug !== newObituary.slug)];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
}

export function getObituaryBySlug(slug: string): Obituary | undefined {
  const all = getStoredObituaries();
  return all.find((o) => o.slug === slug);
}

export function addCondolence(
  slug: string,
  condolence: Omit<CondolenceMessage, "id" | "date">
): Obituary | undefined {
  if (typeof window === "undefined") return undefined;
  const all = getStoredObituaries();
  const index = all.findIndex((o) => o.slug === slug);
  if (index === -1) return undefined;

  const newMessage: CondolenceMessage = {
    id: `c_${Date.now()}`,
    ...condolence,
    date: new Date().toLocaleDateString("en-NG", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };

  const target = all[index];
  if (!target) return undefined;

  const updatedObituary: Obituary = {
    ...target,
    condolences: [newMessage, ...(target.condolences || [])],
  };

  all[index] = updatedObituary;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
  return updatedObituary;
}

export function incrementCandle(slug: string): number {
  if (typeof window === "undefined") return 0;
  const all = getStoredObituaries();
  const index = all.findIndex((o) => o.slug === slug);
  if (index === -1) return 0;

  const target = all[index];
  if (!target) return 0;

  const newCount = (target.candlesCount || 0) + 1;
  all[index] = {
    ...target,
    candlesCount: newCount,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(all));
  return newCount;
}
