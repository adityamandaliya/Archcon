export interface UpdateImage {
  id: number;
  url: string;
  alt: string;
}

export interface Update {
  id: number;
  date: string;
  dateFormatted: string;
  heading: string;
  description: string;
  images: UpdateImage[];
  category: "announcement" | "project" | "milestone" | "news";
  featured?: boolean;
}

export const UPDATES: Update[] = [
  {
    id: 1,
    date: "2025-12-01",
    dateFormatted: "01 Dec 2025",
    heading: "Archcon Wins Mumbai Urban Excellence Award",
    description:
      "Archcon has been recognized for its outstanding contribution to sustainable urban development in Mumbai. This award reflects our commitment to innovative architecture and community-centric building solutions. Our team continues to push boundaries in creating spaces that inspire and transform lives.",
    category: "milestone",
    featured: true,
    images: [
      {
        id: 1,
        url: "/images/updates/update-1-1.jpg",
        alt: "Award Ceremony - Archcon Recognition",
      },
      {
        id: 2,
        url: "/images/updates/update-1-2.jpg",
        alt: "Team Celebration - Award Win",
      },
      {
        id: 3,
        url: "/images/updates/update-1-3.jpg",
        alt: "Trophy Display - Urban Excellence",
      },
    ],
  },
  {
    id: 2,
    date: "2025-11-24",
    dateFormatted: "24 Nov 2025",
    heading: "New Project Launch: Waterfront Residential Complex",
    description:
      "We are thrilled to announce the commencement of our latest project in the heart of Mumbai. This state-of-the-art waterfront residential complex features 250+ units with premium amenities, sustainable design principles, and breathtaking skyline views. Construction begins with a 36-month timeline.",
    category: "project",
    images: [
      {
        id: 1,
        url: "/images/updates/update-2-1.jpg",
        alt: "Waterfront Complex Rendering",
      },
      {
        id: 2,
        url: "/images/updates/update-2-2.jpg",
        alt: "Site Preparation",
      },
      {
        id: 3,
        url: "/images/updates/update-2-3.jpg",
        alt: "Architectural Blueprint",
      },
      {
        id: 4,
        url: "/images/updates/update-2-4.jpg",
        alt: "Construction Foundation",
      },
    ],
  },
  {
    id: 3,
    date: "2025-11-10",
    dateFormatted: "10 Nov 2025",
    heading: "Sustainable Architecture Initiative Unveiled",
    description:
      "Archcon launches a comprehensive sustainability initiative focused on eco-friendly construction methods, carbon-neutral buildings, and green infrastructure integration. Our vision is to set new industry standards for environmentally responsible urban development across all future projects.",
    category: "announcement",
    images: [
      {
        id: 1,
        url: "/images/updates/update-3-1.jpg",
        alt: "Sustainable Design Showcase",
      },
      {
        id: 2,
        url: "/images/updates/update-3-2.jpg",
        alt: "Green Infrastructure",
      },
      {
        id: 3,
        url: "/images/updates/update-3-3.jpg",
        alt: "Eco-Friendly Materials",
      },
    ],
  },
  {
    id: 4,
    date: "2025-11-05",
    dateFormatted: "05 Nov 2025",
    heading: "Archcon Receives Green Building Certification",
    description:
      "Archcon has been recognized for its outstanding contribution to sustainable urban development in Mumbai. This award reflects our commitment to innovative architecture and community-centric building solutions. Our team continues to push boundaries in creating spaces that inspire and transform lives.",
    category: "milestone",
    featured: true,
    images: [
      {
        id: 1,
        url: "/images/updates/update-4-1.jpg",
        alt: "Award Ceremony - Archcon Recognition",
      },
      {
        id: 2,
        url: "/images/updates/update-4-2.jpg",
        alt: "Team Celebration - Award Win",
      },
      {
        id: 3,
        url: "/images/updates/update-4-3.jpg",
        alt: "Trophy Display - Urban Excellence",
      },
    ],
  },
  {
    id: 5,
    date: "2025-11-05",
    dateFormatted: "05 Nov 2025",
    heading: "Archcon Receives Green Building Certification",
    description:
      "Archcon has been recognized for its outstanding contribution to sustainable urban development in Mumbai. This award reflects our commitment to innovative architecture and community-centric building solutions. Our team continues to push boundaries in creating spaces that inspire and transform lives.",
    category: "milestone",
    featured: true,
    images: [
      {
        id: 1,
        url: "/images/updates/update-4-1.jpg",
        alt: "Award Ceremony - Archcon Recognition",
      },
      {
        id: 2,
        url: "/images/updates/update-4-2.jpg",
        alt: "Team Celebration - Award Win",
      },
      {
        id: 3,
        url: "/images/updates/update-4-3.jpg",
        alt: "Trophy Display - Urban Excellence",
      },
    ],
  },
  {
    id: 4,
    date: "2025-11-05",
    dateFormatted: "05 Nov 2025",
    heading: "Archcon Receives Green Building Certification",
    description:
      "Archcon has been recognized for its outstanding contribution to sustainable urban development in Mumbai. This award reflects our commitment to innovative architecture and community-centric building solutions. Our team continues to push boundaries in creating spaces that inspire and transform lives.",
    category: "milestone",
    featured: true,
    images: [
      {
        id: 6,
        url: "/images/updates/update-4-1.jpg",
        alt: "Award Ceremony - Archcon Recognition",
      },
      {
        id: 2,
        url: "/images/updates/update-4-2.jpg",
        alt: "Team Celebration - Award Win",
      },
      {
        id: 3,
        url: "/images/updates/update-4-3.jpg",
        alt: "Trophy Display - Urban Excellence",
      },
    ],
  },
];
