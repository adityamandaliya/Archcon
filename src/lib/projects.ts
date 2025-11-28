export interface Project {
  id: number;
  title: string;
  location: string;
  type: "Residential" | "Commercial" | "Industrial";
  image: string;
  startDate: string;
  endDate: string;
  durationMonths: number;
  highlights: string[];
  description: string;
  area: string;
  status: "Completed" | "In Progress" | "Upcoming";
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "The Gold Residences",
    location: "Bandra, Mumbai",
    type: "Residential",
    image: "/images/projects/gold-residences.jpg",
    startDate: "Jan 2021",
    endDate: "Mar 2024",
    durationMonths: 38,
    highlights: [
      "300+ luxury apartments",
      "5-star amenities",
      "LEED Gold Certified",
      "Smart home automation",
    ],
    description:
      "A premium residential development redefining luxury living in Bandra with eco-conscious design and world-class amenities.",
    area: "850,000 sq ft",
    status: "Completed",
  },
  {
    id: 2,
    title: "Archcon Towers",
    location: "Bandra Kurla Complex, Mumbai",
    type: "Commercial",
    image: "/images/projects/archcon-towers.jpg",
    startDate: "Feb 2022",
    endDate: "Dec 2024",
    durationMonths: 34,
    highlights: [
      "Mixed-use development",
      "40-storey tower",
      "5 lakh sq ft office",
      "Premium retail spaces",
    ],
    description:
      "State-of-the-art commercial hub featuring modern offices, premium retail, and dining experiences for forward-thinking businesses.",
    area: "1,200,000 sq ft",
    status: "Completed",
  },
  {
    id: 3,
    title: "Industrial Hub Bhiwandi",
    location: "Bhiwandi, Thane",
    type: "Industrial",
    image: "/images/projects/industrial-hub.jpg",
    startDate: "Jun 2022",
    endDate: "Sep 2025",
    durationMonths: 39,
    highlights: [
      "Logistics facility",
      "Smart warehousing",
      "Rail connectivity",
      "ISO compliant",
    ],
    description:
      "Strategic industrial complex with cutting-edge logistics infrastructure, optimizing supply chain efficiency for India's growing economy.",
    area: "2,500,000 sq ft",
    status: "In Progress",
  },
  {
    id: 4,
    title: "Urban Garden Plaza",
    location: "Dadar, Mumbai",
    type: "Commercial",
    image: "/images/projects/urban-garden.jpg",
    startDate: "Mar 2023",
    endDate: "Jun 2025",
    durationMonths: 27,
    highlights: [
      "Sustainable design",
      "Green spaces",
      "Community center",
      "Retail + F&B",
    ],
    description:
      "An innovative community-centric development blending commerce with nature, creating vibrant urban spaces for modern living.",
    area: "450,000 sq ft",
    status: "In Progress",
  },
  {
    id: 5,
    title: "Metropolitan Suites",
    location: "Andheri, Mumbai",
    type: "Residential",
    image: "/images/projects/metropolitan-suites.jpg",
    startDate: "Sep 2022",
    endDate: "Dec 2025",
    durationMonths: 39,
    highlights: [
      "200+ premium units",
      "Wellness center",
      "Rooftop gardens",
      "Co-working spaces",
    ],
    description:
      "Contemporary residential community designed for the modern professional, combining comfort, connectivity, and sustainable living.",
    area: "625,000 sq ft",
    status: "In Progress",
  },
  {
    id: 6,
    title: "Tech Park Powai",
    location: "Powai, Mumbai",
    type: "Commercial",
    image: "/images/projects/tech-park.jpg",
    startDate: "Jan 2023",
    endDate: "Aug 2025",
    durationMonths: 31,
    highlights: [
      "IT hub development",
      "Innovation center",
      "High-speed connectivity",
      "Startup ecosystem",
    ],
    description:
      "A world-class technology park fostering innovation and entrepreneurship with state-of-the-art facilities for next-generation businesses.",
    area: "1,100,000 sq ft",
    status: "In Progress",
  },
];
