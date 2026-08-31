import type { CMSContent } from "./types";

export const DEFAULT_CMS_CONTENT: CMSContent = {
  version: 1,
  lastUpdated: new Date().toISOString(),
  settings: {
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
      { days: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
      { days: "Saturday", hours: "9:00 AM – 3:00 PM" },
      { days: "Sunday & Public Holidays", hours: "By Appointment" },
    ],
    socials: {
      facebook: "https://facebook.com/capetrustfunerals",
      instagram: "https://instagram.com/capetrustfunerals",
      linkedin: "https://linkedin.com/company/capetrust",
      youtube: "https://youtube.com/@capetrustfunerals",
      twitter: "https://twitter.com/capetrust",
    },
    emergencyBanner: {
      enabled: true,
      badge: "24/7 Immediate Care",
      text: "Need urgent funeral assistance or repatriation in Lagos?",
      phone: "+234 802 6666 655",
      linkText: "Call Now",
      linkHref: "tel:+2348026666655",
    },
    metaTitle: "Capetrust Funeral Services & Garden of Peace™ Memorial Park | Lagos",
    metaDescription:
      "Dignified funeral planning, private cemetery vaults, and comprehensive memorial care at Garden of Peace Memorial Park in Agbowa, Lagos.",
  },
  home: {
    heroTag: "Premier Funeral & Memorial Park in Lagos",
    heroTitle: "Honouring Every Life with Dignity, Care & Excellence.",
    heroSubtitle:
      "Providing compassionate funeral coordination, private vault interments, and serene memorial grounds at Garden of Peace™ Memorial Park, Agbowa, Lagos.",
    heroImage: "https://images.pexels.com/photos/7317677/pexels-photo-7317677.jpeg",
    heroPrimaryCtaText: "Explore Memorial Park",
    heroPrimaryCtaLink: "/garden-of-peace",
    heroSecondaryCtaText: "Price Estimator",
    heroSecondaryCtaLink: "/estimator",
    stats: [
      {
        value: "10+ Acres",
        label: "Private Memorial Park",
        description: "Lush, secure, and permanently maintained sanctuary.",
      },
      {
        value: "100%",
        label: "Perpetual Care",
        description: "Lifetime landscaping and structural vault preservation.",
      },
      {
        value: "24/7",
        label: "Family Support",
        description: "Immediate guidance and emergency care when needed.",
      },
      {
        value: "0%",
        label: "Flexible Installments",
        description: "Inflation-hedged pre-planning with up to 12-month terms.",
      },
    ],
    servicesHeading: {
      eyebrow: "Our core services",
      title: "Comprehensive Care from First Call to Final Farewell",
      description:
        "Every family is unique. We provide tailored funeral coordination, private cemetery vault interment, and timeless memorialization.",
    },
    services: [
      {
        title: "Burial & Vault Options",
        body: "Single, double and triple unit vaults, as well as family estates and private mausoleums, within a well-maintained and permanently preserved memorial park.",
        href: "/garden-of-peace",
        badge: "Garden of Peace™",
      },
      {
        title: "Funeral Coordination & Planning",
        body: "Full funeral coordination, order of service design, floral arrangements, transport coordination, and on-site chapel access to ensure a seamless service.",
        href: "/services",
        badge: "Full Coordination",
      },
      {
        title: "Estate Pre-Planning",
        body: "Plan ahead with confidence. Secure resting spaces, protect your family from future costs, and ensure your wishes are documented with absolute clarity.",
        href: "/investment",
        badge: "0% Installments",
      },
      {
        title: "Memorialisation & Monuments",
        body: "Headstones, pebblestone surrounds, evergreen artificial flower bed finishes, memorial street naming and memorial wall plaques designed to preserve cherished memories.",
        href: "/memorial-products",
        badge: "Granite & Stone",
      },
    ],
    whyUsHeading: {
      eyebrow: "The Capetrust Promise",
      title: "Why Families Place Their Trust in Capetrust",
      description:
        "We combine world-class memorial park infrastructure with deeply empathetic personal guidance.",
    },
    whyUsItems: [
      {
        tag: "Certified",
        title: "Licensed & Dedicated Memorial Park",
        description: "Privately owned, legally secured 10+ acre cemetery with permanent land titles.",
      },
      {
        tag: "Permanent",
        title: "Engineered Concrete Vaults",
        description: "Reinforced underground concrete vaults with lifetime structural integrity.",
      },
      {
        tag: "Perpetual",
        title: "Perpetual Landscape Maintenance",
        description: "Clean paved walkways, manicured turf, solar streetlights, and 24/7 security.",
      },
      {
        tag: "Compassion",
        title: "Empathetic Advisors",
        description: "Compassionate, dedicated counselors who relieve your burden during grief.",
      },
      {
        tag: "24/7 Support",
        title: "24-Hour Immediate Assistance",
        description: "Immediate response team available round the clock for urgent removals & logistics.",
      },
      {
        tag: "Transparent",
        title: "Transparent, Honest Pricing",
        description: "Clear prices in Nigerian Naira with no hidden fees or surprise surcharges.",
      },
    ],
    gardenHighlight: {
      eyebrow: "Garden of Peace™ Memorial Park",
      title: "A Dignified Sanctuary Designed for Eternal Rest",
      body1:
        "Nestled in the serene surroundings of Odo-Ayandelu, Agbowa (Lagos State), Garden of Peace™ offers an oasis of calm and dignity away from the bustle of the city.",
      body2:
        "With paved access roads, landscaped lawns, private family mausoleums, and lifetime perpetual care, your loved ones rest in peace and dignity.",
      image: "https://images.pexels.com/photos/7317677/pexels-photo-7317677.jpeg",
      ctaText: "Discover Garden of Peace™",
      ctaLink: "/garden-of-peace",
    },
    testimonialsHeading: {
      eyebrow: "Family Testimonials",
      title: "Trusted by Families Across Lagos and the Diaspora",
      description: "Read genuine feedback from families we have had the privilege to serve.",
    },
    testimonials: [
      {
        id: "t1",
        quote:
          "Capetrust handled my father's funeral with such grace, efficiency, and respect. From the hearse escort to the burial service at Garden of Peace, everything was top notch.",
        author: "Dr. Oladipo Adeleke",
        relationship: "Son of Late Chief Adeleke",
        location: "Lekki, Lagos",
        stars: 5,
      },
      {
        id: "t2",
        quote:
          "Living in the UK, coordinating a funeral in Nigeria was daunting until we contacted Capetrust. Their communication was flawless and the memorial park is truly serene.",
        author: "Mrs. Folashade Johnson",
        relationship: "Daughter",
        location: "London / Lagos",
        stars: 5,
      },
      {
        id: "t3",
        quote:
          "The private vault section at Garden of Peace gave our family immense comfort. The environment is clean, peaceful, and well secured. Highly recommended.",
        author: "Engr. Babatunde Balogun",
        relationship: "Family Representative",
        location: "Ikorodu, Lagos",
        stars: 5,
      },
    ],
    ctaBand: {
      title: "We Are Here to Guide You with Empathy and Excellence",
      description:
        "Whether you are planning ahead or need immediate assistance, our dedicated advisors are available 24 hours a day.",
      primaryCtaText: "Speak with an Advisor",
      primaryCtaLink: "/contact",
      secondaryCtaText: "Calculate Price Estimate",
      secondaryCtaLink: "/estimator",
    },
  },
  about: {
    hero: {
      eyebrow: "Our Heritage & Purpose",
      title: "Honouring Life, Preserving Legacy, Supporting Families",
      intro:
        "Capetrust Funeral Services and Garden of Peace™ Memorial Park provide a distinguished standard of funeral care and perpetual memorialization in Lagos State.",
      image: "https://images.unsplash.com/photo-1548625361-16eb16ce3998?q=80&w=800&auto=format&fit=crop",
    },
    mission: {
      title: "Our Mission",
      body: "To deliver compassionate, world-class funeral coordination and provide pristine, permanently preserved resting spaces that honour the legacy of departed loved ones.",
    },
    vision: {
      title: "Our Vision",
      body: "To be West Africa's leading funeral care provider and memorial park, recognized for unwavering integrity, serenity, architectural dignity, and empathy.",
    },
    story: {
      eyebrow: "Our Story",
      title: "Founded on Empathy, Integrity and Excellence",
      paragraphs: [
        "Capetrust was established to transform the experience of funeral planning and memorialization in Nigeria. We recognized that grieving families deserve transparent pricing, compassionate guidance, and a pristine, well-maintained environment for their loved ones' final resting place.",
        "Today, Garden of Peace™ Memorial Park spans over 10 acres of lush, landscaped grounds in Agbowa-Ikosi, Lagos. With modern engineered concrete vaults, paved roadways, on-site chapel facilities, and perpetual maintenance, we provide families with eternal peace of mind.",
      ],
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop",
    },
    values: [
      {
        title: "Dignity & Reverence",
        description: "We treat every departed soul and their grieving family with the highest respect and solemn care.",
      },
      {
        title: "Integrity & Transparency",
        description: "Clear pricing, transparent terms, and complete honesty in every interaction.",
      },
      {
        title: "Perpetual Stewardship",
        description: "Our commitment to the perpetual care of our memorial park ensures grounds remain pristine for generations.",
      },
      {
        title: "Empathetic Guidance",
        description: "We listen with patience, support with compassion, and shoulder logistics so families can grieve in peace.",
      },
    ],
    milestones: [
      {
        year: "2018",
        title: "Capetrust Inception",
        description: "Acquisition of 10+ acres in Agbowa, Lagos, and initial park zoning masterplan.",
      },
      {
        year: "2020",
        title: "Garden of Peace™ Inauguration",
        description: "Completion of Phase 1 concrete vaults, perimeter fencing, and internal paved road network.",
      },
      {
        year: "2023",
        title: "Chapel & Fleet Expansion",
        description: "Launch of Capetrust Private Chapel, executive hearse fleet, and digital memorial platform.",
      },
      {
        year: "2026",
        title: "Family Estates & Pre-Planning",
        description: "Introduction of private family mausoleum estates, inflation-hedged pre-planning, and interactive online tools.",
      },
    ],
    teamHeading: {
      eyebrow: "Leadership & Advisory",
      title: "Dedicated Professionals Committed to Your Peace of Mind",
      description: "Our leadership team brings decades of experience in healthcare, funeral logistics, and memorial estate management.",
    },
    team: [
      {
        id: "m1",
        name: "Elder Samuel Adebayo",
        role: "Managing Director & Founder",
        bio: "Over 20 years of executive leadership in healthcare and funeral administration, dedicated to elevating memorial care standards in Nigeria.",
        image: "/images/noah-silliman-EBB45rCSjrU-unsplash.jpg",
      },
      {
        id: "m2",
        name: "Mrs. Folashade Olawale",
        role: "Director of Family Care & Ceremonies",
        bio: "Specialist in bereavement counseling and funeral ceremony planning, ensuring every family feels deeply supported and valued.",
        image: "/images/jacinta-christos-pJ8WXG5C_5U-unsplash.jpg",
      },
      {
        id: "m3",
        name: "Engr. Michael Folarin",
        role: "Head of Park Operations & Engineering",
        bio: "Civil engineer overseeing vault construction integrity, perpetual landscaping, drainage systems, and 24/7 security infrastructure.",
        image: "/images/eli-solitas-q6e4zwgtUcM-unsplash.jpg",
      },
    ],
    facilities: {
      title: "Our Facilities & Infrastructure",
      description:
        "From air-conditioned private chapels to state-of-the-art hearse fleets and manicured garden walkways, our facilities are built for comfort.",
      features: [
        "Private Air-Conditioned Memorial Chapel",
        "Reception & Viewing Hall for Family Gatherings",
        "Executive Hearse Fleet and Transportation Buses",
        "Modern Cold Storage and Embalming Coordination",
        "Solar Streetlighting and 24/7 Security Patrols",
      ],
      image: "/chapel.jpg",
    },
  },
  services: {
    hero: {
      eyebrow: "Our Offerings",
      title: "Services & Memorial Solutions",
      intro:
        "At Capetrust Funeral Services, we provide a comprehensive range of funeral, burial and memorial services designed to support families before, during and after a loss.",
      image: "/hearse.jpg",
    },
    servicesList: [
      {
        id: "s1",
        title: "Funeral Planning & Coordination",
        body: "Our experienced team works closely with you to coordinate every aspect of the service, ensuring your loved one's wishes, family traditions and personal preferences are carefully reflected. Whether a simple service or a larger celebration of life, we guide you through every decision.",
        image: "https://images.unsplash.com/photo-1548625361-16eb16ce3998?q=80&w=800&auto=format&fit=crop",
        cta: "Speak with an Advisor",
        href: "/contact",
      },
      {
        id: "s2",
        title: "Repatriation Services",
        body: "When a loved one passes away from home, arranging transportation across states or international borders can feel overwhelming. We coordinate documentation, transportation logistics and regulatory requirements to ensure a smooth and respectful journey home.",
        image: "/images/diego-lozano-wuCHIyWheSo-unsplash.jpg",
        cta: "Request Repatriation Assistance",
        href: "/contact",
      },
      {
        id: "s3",
        title: "Burial & Vault Interments",
        body: "From cemetery arrangements and graveside coordination to vault preparation and burial scheduling at Garden of Peace™, we create a seamless experience during an important moment of remembrance.",
        image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop",
        cta: "Explore Memorial Park",
        href: "/garden-of-peace",
      },
      {
        id: "s4",
        title: "Chapel & Reception Venue",
        body: "Our private on-site chapel and reception venue provide a welcoming, air-conditioned setting for funeral services, prayer gatherings, memorial receptions, viewing services and intimate family gatherings.",
        image: "/chapel.jpg",
        cta: "Enquire About Availability",
        href: "/contact",
      },
      {
        id: "s5",
        title: "Reception & Catering Coordination",
        body: "Gathering together after a funeral offers family and friends an opportunity to share memories and celebrate a life well lived. We coordinate reception arrangements and catering tailored to the size and style of your gathering.",
        image: "/images/adrianna-geo-JWlZS708L1Y-unsplash.jpg",
        cta: "Plan Your Reception",
        href: "/contact",
      },
    ],
    additionalServices: [
      "Professional Pallbearers Team",
      "Funeral Livestreaming & High-Definition Recording",
      "Tribute Video Production & Digital Screens",
      "Obituary Design, Printing & Order of Service Booklets",
      "Memorial Stationery & Condolence Registers",
      "Floral Tribute Wreaths & Sympathy Bouquets",
      "Police Escort & Traffic Coordination",
      "Grave Maintenance & Perpetual Care Program",
    ],
    transportHeading: {
      title: "Executive Transportation & Hearse Fleet",
      description: "We provide modern, dignified hearse fleets and air-conditioned luxury buses for family and mourners.",
      features: [
        "Modern Mercedes-Benz and Cadillac Funeral Hearses",
        "Executive Coaster & HiAce Passenger Buses",
        "Escort Outriders & Convoy Management",
        "Interstate Long-Distance Transport Vehicles",
      ],
    },
  },
  gardenOfPeace: {
    hero: {
      eyebrow: "Garden of Peace™",
      title: "A Sanctuary of Serenity, Reverence and Perpetual Care",
      intro:
        "Set across 10+ lush acres in Agbowa, Lagos State, Garden of Peace™ Memorial Park is designed as a peaceful sanctuary for eternal remembrance.",
      image: "https://images.pexels.com/photos/7317677/pexels-photo-7317677.jpeg",
    },
    aboutPark: {
      eyebrow: "About the Park",
      title: "Engineered for Permanence, Landscaped for Serenity",
      description:
        "Unlike overcrowded public cemeteries, Garden of Peace™ offers structured concrete vaults, wide paved avenues, private family estates, solar lighting, and perpetual lawn care.",
      locationNote: "Conveniently accessible along the Ikorodu–Epe expressway at Odo-Ayandelu, Agbowa, Lagos.",
    },
    vaultTiers: [
      {
        id: "v1",
        title: "Single Unit Vault",
        subtitle: "Individual Resting Space",
        capacity: "1 Casket Vault",
        description: "Reinforced concrete underground vault designed for one individual with full granite marker finish.",
        priceNote: "Starting from ₦2,500,000",
        features: [
          "Reinforced structural concrete chamber",
          "Waterproof sealed lid system",
          "Polished granite headstone marker included",
          "Perpetual landscape & lawn maintenance",
          "24/7 guarded security & gated entry",
        ],
      },
      {
        id: "v2",
        title: "Double Unit Companion Vault",
        subtitle: "Spousal & Companion Resting Space",
        capacity: "2 Casket Vaults (Side-by-side or Layered)",
        description: "Designed for couples wishing to be laid to rest side by side in eternal companionship.",
        priceNote: "Starting from ₦4,500,000",
        features: [
          "Dual reinforced concrete chambers",
          "Double-width polished granite headstone",
          "Custom joint epitaph engraving",
          "Perpetual landscape & lawn maintenance",
          "Priority graveside service scheduling",
        ],
        isPopular: true,
      },
      {
        id: "v3",
        title: "Triple Unit Family Vault",
        subtitle: "Family Resting Space",
        capacity: "3 Casket Vaults",
        description: "Generational resting space for immediate family members within a dedicated perimeter.",
        priceNote: "Starting from ₦6,500,000",
        features: [
          "Triple reinforced concrete chambers",
          "Expanded family monument marker",
          "Pebblestone or synthetic turf surround",
          "Perpetual landscape & lawn maintenance",
          "Reserved parking for memorial visits",
        ],
      },
      {
        id: "v4",
        title: "Private Family Mausoleum Estate",
        subtitle: "Exclusive Gated Dynasty Estate",
        capacity: "6 to 12+ Vaults",
        description: "A private, gated estate with personalized architecture, seating benches, and custom street naming.",
        priceNote: "Custom Quote on Request",
        features: [
          "Private gated enclosure with wrought iron perimeter",
          "Bespoke marble or granite monument pavilion",
          "Custom estate naming plaque and garden seating",
          "Dedicated family key and exclusive access",
          "Lifetime perpetual estate maintenance agreement",
        ],
      },
    ],
    amenitiesHeading: {
      eyebrow: "Park Amenities",
      title: "World-Class Infrastructure for Generations to Come",
      description: "Every aspect of Garden of Peace™ is engineered to provide peace of mind.",
    },
    amenities: [
      {
        title: "24/7 Security & CCTV",
        description: "Manned security post, perimeter fencing, solar lighting, and CCTV monitoring around the clock.",
      },
      {
        title: "Perpetual Grounds Care",
        description: "Dedicated full-time gardening staff keeping grass manicured, flowers fresh, and walkways pristine.",
      },
      {
        title: "Paved Access & Parking",
        description: "Smooth asphalt and paved internal roads ensuring easy vehicle access in all weather conditions.",
      },
      {
        title: "On-Site Chapel & Gazebos",
        description: "Covered reflection gazebos and access to our private chapel for committal services.",
      },
    ],
    galleryImages: [
      {
        url: "https://images.pexels.com/photos/7317677/pexels-photo-7317677.jpeg",
        title: "Park Lawns & Avenues",
        caption: "Wide paved access roads and serene landscape.",
      },
      {
        url: "/images/noah-silliman-EBB45rCSjrU-unsplash.jpg",
        title: "Memorial Walkway",
        caption: "Tranquil walking paths shaded by palms and evergreen trees.",
      },
      {
        url: "/images/adrianna-geo-JWlZS708L1Y-unsplash.jpg",
        title: "Family Gazebo Area",
        caption: "Private seating areas for reflection and prayer.",
      },
      {
        url: "/images/strauss-western-5a3eFHcGl9U-unsplash.jpg",
        title: "Polished Granite Vaults",
        caption: "Precision-engineered concrete vaults finished with imported granite.",
      },
    ],
  },
  memorialProducts: {
    hero: {
      eyebrow: "Memorial Offerings",
      title: "Memorial Products & Craftsmanship",
      intro:
        "Alongside our professional funeral services, Capetrust offers a collection of memorial products designed to honour your loved ones with lasting craftsmanship.",
      image: "/flowers.jpg",
    },
    collections: [
      {
        id: "p1",
        title: "Coffins & Caskets",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
        body: "A carefully curated range of coffins and caskets in solid hardwood, bronze, brushed steel, and bespoke finishes, crafted in Nigeria and imported to international standards.",
        items: [
          "Solid Mahogany & Oak Hardwood Caskets",
          "Executive Brushed Steel & Bronze Caskets",
          "Eco-Friendly Solid Wood Coffins",
          "Custom Interior Silk and Velvet Upholstery",
        ],
      },
      {
        id: "p2",
        title: "Floral Tributes & Wreaths",
        image: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=800&auto=format&fit=crop",
        body: "Flowers offer a timeless, elegant expression of remembrance, celebration, and gratitude for a cherished life.",
        items: [
          "Custom Heart and Cross Funeral Wreaths",
          "Standing Sympathy Flower Sprays",
          "Casket Full & Half Top Sprays",
          "Church Altar & Chapel Arrangements",
          "Condolence Hand Bouquets",
        ],
      },
      {
        id: "p3",
        title: "Memorial Keepsakes & Urns",
        image: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?q=80&w=800&auto=format&fit=crop",
        body: "Some memories deserve to be held close. Thoughtfully selected items that allow families to preserve meaningful memories for generations.",
        items: [
          "Handcrafted Decorative Marble & Brass Urns",
          "Memorial Keepsake Wall Plaques",
          "Engraved Wooden Memory Boxes",
          "Personalised Tribute Photo Frames",
        ],
      },
      {
        id: "p4",
        title: "Headstones & Memorial Accessories",
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop",
        body: "Every detail contributes to a dignified farewell, from solid granite headstone engravings to brass accents.",
        items: [
          "Polished Black & Grey Granite Headstones",
          "Custom Laser Engraved Epitaph Plaques",
          "Brass Casket Ornaments & Crucifix Accents",
          "Evergreen Synthetic Turf & Pebblestone Finishes",
        ],
      },
    ],
    customInquiryNote: {
      title: "Looking for Bespoke or Custom Designs?",
      body: "We create custom engraved monuments, imported luxury caskets, and bespoke floral tributes to fulfill your exact family wishes.",
      ctaText: "Inquire About Custom Orders",
      ctaLink: "/contact",
    },
  },
  prePlanning: {
    hero: {
      eyebrow: "Protecting Tomorrow",
      title: "Funeral & Memorial Pre-Planning Guide",
      intro:
        "Planning ahead provides emotional peace of mind, locks in current prices against inflation, and spares your loved ones from stressful decisions during a time of grief.",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=800&auto=format&fit=crop",
    },
    benefits: [
      {
        title: "Lock in Current Prices",
        description: "Protect against inflation and future price hikes by securing vaults and services today with zero-interest installments.",
      },
      {
        title: "Relieve Family Emotional Burden",
        description: "Spares your grieving family from difficult financial decisions and logistical stress when the time comes.",
      },
      {
        title: "Ensure Personal Wishes are Met",
        description: "Document your exact desires for your service, burial location, casket choice, and order of ceremonies.",
      },
      {
        title: "Flexible Payment Options",
        description: "Structured installment plans spread across 3, 6, or 12 months with 0% interest.",
      },
    ],
    steps: [
      {
        step: "01",
        title: "Consultation & Preference Mapping",
        description: "Meet with an advisor in person or virtually to discuss resting vault options, ceremony preferences, and budget.",
      },
      {
        step: "02",
        title: "Select Vault & Resting Space",
        description: "Choose your preferred location and vault type (single, double, or family estate) at Garden of Peace™.",
      },
      {
        step: "03",
        title: "Customize Plan & Flexible Terms",
        description: "Select payment schedule and document specific ceremony wishes in our binding pre-planning agreement.",
      },
      {
        step: "04",
        title: "Certificate of Allocation Issued",
        description: "Receive an official Certificate of Vault Allocation and Pre-Planning Record for your family archives.",
      },
    ],
    checklistItems: [
      "Preferred burial method and vault tier selection",
      "Designated family representative or next of kin contact",
      "Chapel service, religious officiant, and music preferences",
      "Casket model, floral arrangement, and pallbearer choices",
      "Obituary photo selection and summary biography notes",
      "Special instructions regarding donations or charity memorials",
    ],
  },
  investment: {
    hero: {
      eyebrow: "Family Estates & Heritage",
      title: "Family Estates & Generational Legacy",
      intro:
        "Secure family mausoleum estates and burial vaults as an enduring heritage for your family, protected by perpetual care and rising land value.",
      image: "https://images.pexels.com/photos/7317677/pexels-photo-7317677.jpeg",
    },
    valueProposition: {
      title: "Why Invest in a Memorial Estate Today?",
      body: "Memorial land in prime metropolitan areas such as Lagos is increasingly scarce. Securing an estate at Garden of Peace™ safeguards your family's future.",
      points: [
        "Hedge against steep annual inflation and funeral price escalation",
        "Guaranteed contiguous burial plots so your family rests together",
        "Clear freehold property title and registered Certificate of Allocation",
        "Perpetual maintenance fund guarantees permanent upkeep forever",
      ],
    },
    estateTiers: [
      {
        title: "Executive Duo Plot",
        plots: "2 Contiguous Vaults",
        description: "Side-by-side companion resting space with shared granite monument and lush turf finish.",
        features: ["2 Reinforced Concrete Vaults", "Double Granite Marker", "Lifetime Lawn Maintenance", "0% 6-Month Plan Available"],
      },
      {
        title: "Heritage Family Quad",
        plots: "4 Contiguous Vaults",
        description: "Dedicated 4-vault family enclave with private perimeter border and family name plaque.",
        features: ["4 Reinforced Concrete Vaults", "Custom Family Monument", "Pebblestone Surrounds", "Priority Booking for Services"],
      },
      {
        title: "Dynasty Mausoleum Estate",
        plots: "8 to 12+ Vaults",
        description: "An exclusive, gated private sanctuary with bespoke pavilion architecture and private access gate.",
        features: ["Up to 12 Underground Vaults", "Private Wrought-Iron Gate", "Custom Pavilion & Benches", "Dedicated Family Access Key"],
      },
    ],
    faqExcerpt: [
      {
        question: "Can an allocated plot be transferred or inherited?",
        answer: "Yes, your Certificate of Allocation is legally recognized and can be passed down as part of your family estate or transferred to designated beneficiaries.",
      },
      {
        question: "How is perpetual maintenance funded?",
        answer: "A dedicated portion of every plot allocation goes into an independent Perpetual Care Trust Fund that finances ongoing security, landscaping, and infrastructure maintenance in perpetuity.",
      },
    ],
  },
  estimator: {
    vaultSingle: 2500000,
    vaultDouble: 4500000,
    vaultTriple: 6500000,
    vaultFamilyMausoleum: 12000000,
    casketBasic: 450000,
    casketStandard: 850000,
    casketExecutive: 1800000,
    casketLuxuryBronze: 3500000,
    hearseStandard: 250000,
    hearseExecutiveEscort: 450000,
    pallbearersTeam: 180000,
    chapelRental: 300000,
    receptionHall: 500000,
    livestreamProduction: 220000,
    customHeadstoneGranite: 450000,
    perpetualCareMaintenanceFee: 350000,
    intermentFee: 200000,
  },
  faq: {
    hero: {
      eyebrow: "Frequently Asked Questions",
      title: "Answers to Common Questions",
      intro:
        "Find answers regarding our funeral coordination, Garden of Peace™ Memorial Park, pre-planning, and obituaries.",
    },
    categories: ["General", "Garden of Peace", "Services & Planning", "Pricing & Payment", "Obituaries"],
    faqs: [
      {
        id: "f1",
        category: "General",
        question: "What should I do immediately when a loved one passes away?",
        answer:
          "First, ensure a medical practitioner certifies the death. Then, call our 24/7 emergency support line at +234 802 6666 655. Our team will arrange immediate, dignified transportation to a mortuary facility and guide you through the next steps.",
      },
      {
        id: "f2",
        category: "Garden of Peace",
        question: "Where is Garden of Peace™ Memorial Park located?",
        answer:
          "Garden of Peace™ is located in Odo-Ayandelu, Agbowa, Lagos State, easily accessible via the Ikorodu–Epe expressway. We offer scheduled tours Monday through Saturday.",
      },
      {
        id: "f3",
        category: "Garden of Peace",
        question: "What makes Garden of Peace™ different from public cemeteries in Lagos?",
        answer:
          "Unlike crowded municipal cemeteries, Garden of Peace™ is a privately owned and professionally managed 10+ acre park featuring reinforced underground concrete vaults, lifetime perpetual lawn care, paved internal roads, solar lighting, and 24/7 security.",
      },
      {
        id: "f4",
        category: "Services & Planning",
        question: "Do you handle interstate and international repatriation?",
        answer:
          "Yes. We manage full documentation, embassy/consular clearances, embalming to international standards, airline freight bookings, and ground hearse transport across Nigeria.",
      },
      {
        id: "f5",
        category: "Pricing & Payment",
        question: "Can I pay for vaults or funeral packages in installments?",
        answer:
          "Yes. We offer pre-planning installment plans over 3, 6, or 12 months with 0% interest, allowing you to lock in today's prices and protect your family from future inflation.",
      },
      {
        id: "f6",
        category: "Obituaries",
        question: "How do I publish an online obituary and memorial tribute page?",
        answer:
          "You can publish directly through our website by navigating to Obituaries > Publish a Memorial, or our team can assist you with photo curation, biography writing, and tribute design.",
      },
      {
        id: "f7",
        category: "Services & Planning",
        question: "Can we use your private chapel for a funeral service?",
        answer:
          "Yes. Our air-conditioned chapel is equipped with modern audio-visual systems, comfortable pew seating, and livestreaming equipment for funeral services, wake keeps, and remembrance prayers.",
      },
    ],
  },
  contact: {
    hero: {
      eyebrow: "Contact & Assistance",
      title: "We Are Here for You 24/7",
      intro:
        "Whether you require immediate assistance, wish to book a park tour, or have questions regarding pre-planning, our team is ready to assist.",
    },
    branches: [
      {
        title: "Head Office & Chapel",
        address: "194, Elepe Road, Ikorodu, Lagos, Nigeria",
        phone: "+234 802 6666 655",
        email: "info@capetrustfunerals.com",
        hours: "Monday – Saturday: 8:00 AM – 5:00 PM",
        mapLink: "https://maps.app.goo.gl/PUVqwt1gfj8G3DXv7",
      },
      {
        title: "Garden of Peace™ Memorial Park",
        address: "Odo-Ayandelu, Agbowa, Lagos State, Nigeria",
        phone: "+234 802 6666 655",
        email: "park@capetrustfunerals.com",
        hours: "Daily: 8:00 AM – 6:00 PM (Tours by Appointment)",
        mapLink: "https://www.google.com/maps/search/Odo-Ayandelu+Agbowa+Lagos",
      },
    ],
    emergencyContact: {
      heading: "24/7 Immediate Emergency Line",
      description: "For immediate funeral assistance, mortuary pickup, or emergency ambulance coordination:",
      phone: "+234 802 6666 655",
      whatsapp: "https://wa.me/2348026666655",
    },
    inquirySubjects: [
      "Immediate Funeral Assistance",
      "Garden of Peace™ Vault Purchase",
      "Family Estate & Investment Inquiry",
      "Pre-Planning Consultation",
      "Repatriation Services",
      "Memorial Products & Caskets",
      "Online Obituary Publication",
      "General Question",
    ],
  },
};
