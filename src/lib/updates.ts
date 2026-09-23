export interface UpdateImage {
  id: number;
  url: string;
  alt: string;
}

export interface Update {
  id: number;
  projectId?: number; // Optional reference to project id in projects.ts
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
    projectId: 15, // Woodland
    date: "2026-09-20",
    dateFormatted: "20 Sept 2026",
    heading: "Completion of Soil testing.",
    description:
      "Pre-construction site setup and soil testing have been successfully completed.",
    category: "project",
    featured: true,
    images: [
      {
        id: 1,
        url: "/images/updates/woodland/soilTesting/1.jpg",
        alt: "",
      },
      {
        id: 2,
        url: "/images/updates/woodland/soilTesting/2.jpg",
        alt: "",
      },
      {
        id: 3,
        url: "/images/updates/woodland/soilTesting/3.jpg",
        alt: "",
      },
      {
        id: 4,
        url: "/images/updates/woodland/soilTesting/4.jpg",
        alt: "",
      },
    ],
  },
  {
    id: 2,
    projectId: 15, // Woodland
    date: "2026-08-27",
    dateFormatted: "27 Aug 2026",
    heading: "Woodland Project D.A Signing",
    description:
      " Development Agreement signing has been successfully completed. Architectural planning and municipal approvals for Woodland (I.C Colony, Borivali) are in full swing.",
    category: "announcement",
    featured: true,
    images: [
      {
        id: 1,
        url: "/images/updates/woodland/da/daSigning.jpg",
        alt: "",
      },
    ],
  },
  
  {
    id: 3,
    projectId: 1, // Shelter CHS
    date: "2026-01-20",
    dateFormatted: "20 Jan 2026",
    heading: "Shelter CHS IOD in process",
    description:
      "Intimation of Disapproval (IOD) for Shelter CHS at Shraddhanand Road, Vile Parle (E) is in Process.",
    category: "milestone",
    featured: true,
    images: [
      {
        id: 1,
        url: "/images/projects/shelter/shelter-1.jpeg",
        alt: "Shelter CHS Elevation Render",
      },
      {
        id: 2,
        url: "/images/projects/shelter/shelter-2.jpeg",
        alt: "Shelter CHS Site Layout",
      },
    ],
  },

];

