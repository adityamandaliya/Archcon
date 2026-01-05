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
    date: "2026-01-01",
    dateFormatted: "01 Jan 2026",
    heading: "Archcon Website Launch",
    description:
      "We are excited to announce the launch of our new website. We have designed it to be user-friendly and easy to navigate. Our website is a reflection of our commitment to providing the best possible service.",
    category: "announcement",
    featured: true,
    images: [
      {
        id: 1,
        url: "/images/updates/1.png",
        alt: "Award Ceremony - Archcon Recognition",
      },
      {
        id: 2,
        url: "/images/updates/2.png",
        alt: "Team Celebration - Award Win",
      },
      {
        id: 3,
        url: "/images/updates/3.png",
        alt: "Trophy Display - Urban Excellence",
      },
    ],
  },
];
