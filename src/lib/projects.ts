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
    title: "Shelter CHS",
    location: "Shraddhanand Road, Vile Parle (E), Mumbai",
    type: "Residential",
    image: "/images/projects/tech-park.jpg",
    startDate: "---",
    endDate: "---",
    durationMonths: 0,
    highlights: [
      "IT hub development",
      "Innovation center",
      "High-speed connectivity",
      "Startup ecosystem",
    ],
    description:
      "A world-class technology park fostering innovation and entrepreneurship with state-of-the-art facilities for next-generation businesses.",
    area: "15,000 sq ft",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Saideep Apartment",
    location: "Rajasthan Society, J.B Nagar, Andheri (E), Mumbai",
    type: "Residential",
    image: "/images/projects/gold-residences.jpg",
    startDate: "Jun 2022",
    endDate: "Jun 2024",
    durationMonths: 24,
    highlights: [
      "300+ luxury apartments",
      "5-star amenities",
      "LEED Gold Certified",
      "Smart home automation",
    ],
    description:
      "A premium residential development redefining luxury living in Andheri with eco-conscious design and world-class amenities.",
    area: "25,000 sq ft",
    status: "Completed",
  },
  {
    id: 3,
    title: "Vijay Apartment",
    location: "M.G. Cross Road No. 2, Kandiwali (W), Mumbai",
    type: "Residential",
    image: "/images/projects/archcon-towers.jpg",
    startDate: "Dec 2016",
    endDate: "Nov 2018",
    durationMonths: 23,
    highlights: [
      "Mixed-use development",
      "40-storey tower",
      "5 lakh sq ft office",
      "Premium retail spaces",
    ],
    description:
      "State-of-the-art commercial hub featuring modern offices, premium retail, and dining experiences for forward-thinking businesses.",
    area: "28,500 sq ft",
    status: "Completed",
  },
  {
    id: 4,
    title: "Krish Royale",
    location: "Shimpoli Road, Borivali (W), Mumbai",
    type: "Residential",
    image: "/images/projects/industrial-hub.jpg",
    startDate: "April 2010",
    endDate: "Dec 2012",
    durationMonths: 33,
    highlights: [
      "Logistics facility",
      "Smart warehousing",
      "Rail connectivity",
      "ISO compliant",
    ],
    description:
      "Strategic industrial complex with cutting-edge logistics infrastructure, optimizing supply chain efficiency for India's growing economy.",
    area: "15,000 sq ft",
    status: "Completed",
  },
  {
    id: 5,
    title: "Vastubh Apartment",
    location: "Dattapada, Borivali (E), Mumbai",
    type: "Residential",
    image: "/images/projects/urban-garden.jpg",
    startDate: "Mar 2005",
    endDate: "Dec 2006",
    durationMonths: 24,
    highlights: [
      "Sustainable design",
      "Green spaces",
      "Community center",
      "Retail + F&B",
    ],
    description:
      "An innovative community-centric development blending commerce with nature, creating vibrant urban spaces for modern living.",
    area: "7,000 sq ft",
    status: "Completed",
  },
  {
    id: 6,
    title: "Bhailal Steel Impex",
    location: "Kashimira, Mira Road, Mumbai",
    type: "Industrial",
    image: "/images/projects/metropolitan-suites.jpg",
    startDate: "Apr 2002",
    endDate: "Feb 2004",
    durationMonths: 22,
    highlights: [
      "200+ premium units",
      "Wellness center",
      "Rooftop gardens",
      "Co-working spaces",
    ],
    description:
      "Contemporary residential community designed for the modern professional, combining comfort, connectivity, and sustainable living.",
    area: "22,000 sq ft",
    status: "Completed",
  },
  {
    id: 7,
    title: "Parikh Industrial Estate",
    location: "Kashimira, Mira Road, Mumbai",
    type: "Industrial",
    image: "/images/projects/tech-park.jpg",
    startDate: "Jan 2000",
    endDate: "Dec 2002",
    durationMonths: 36,
    highlights: [
      "IT hub development",
      "Innovation center",
      "High-speed connectivity",
      "Startup ecosystem",
    ],
    description:
      "A world-class technology park fostering innovation and entrepreneurship with state-of-the-art facilities for next-generation businesses.",
    area: "35,000 sq ft",
    status: "Completed",
  },
  {
    id: 8,
    title: "Hatkesh Udyog Nagar (12 Buildings)",
    location: "Hatkesh, Mira-Bhayandar Road, Mira Road, Mumbai",
    type: "Industrial",
    image: "/images/projects/gold-residences.jpg",
    startDate: "April 1998",
    endDate: "March 2004",
    durationMonths: 72,
    highlights: ["Architectural design", "Consulting Work"],
    description:
      "A premium residential development redefining luxury living in Bandra with eco-conscious design and world-class amenities.",
    area: "2,50,000 sq ft",
    status: "Completed",
  },
  {
    id: 9,
    title: "Patel Precision Engineering Pvt. Ltd.",
    location: "Nehroli, Wada",
    type: "Industrial",
    image: "/images/projects/archcon-towers.jpg",
    startDate: "Apr 1998",
    endDate: "Dec 1999",
    durationMonths: 21,
    highlights: ["Industrial Shed", "40-storey tower", "5 lakh sq ft office"],
    description:
      "State-of-the-art commercial hub featuring modern offices, premium retail, and dining experiences for forward-thinking businesses.",
    area: "20,000 sq ft",
    status: "Completed",
  },
  {
    id: 10,
    title: "Al-Pack Paper Packaging Pvt. Ltd.",
    location: "Nehroli, Wada",
    type: "Industrial",
    image: "/images/projects/industrial-hub.jpg",
    startDate: "Feb 1997",
    endDate: "Dec 1998",
    durationMonths: 23,
    highlights: [
      "Logistics facility",
      "Smart warehousing",
      "Rail connectivity",
      "ISO compliant",
    ],
    description:
      "Strategic industrial complex with cutting-edge logistics infrastructure, optimizing supply chain efficiency for India's growing economy.",
    area: "30,000 sq ft",
    status: "Completed",
  },
  {
    id: 11,
    title: "Kohinoor Apartment",
    location: "Satellite Park, Mira Road (E), Mumbai",
    type: "Residential",
    image: "/images/projects/urban-garden.jpg",
    startDate: "Feb 1999",
    endDate: "Jan 2002",
    durationMonths: 35,
    highlights: [
      "Sustainable design",
      "Green spaces",
      "Community center",
      "Retail + F&B",
    ],
    description:
      "An innovative community-centric development blending commerce with nature, creating vibrant urban spaces for modern living.",
    area: "12,000 sq ft",
    status: "Completed",
  },
  {
    id: 12,
    title: "Glory Apartment",
    location: "Satellite Park, Mira Road (E), Mumbai",
    type: "Residential",
    image: "/images/projects/metropolitan-suites.jpg",
    startDate: "Dec 1998",
    endDate: "Dec 2000",
    durationMonths: 24,
    highlights: [
      "200+ premium units",
      "Wellness center",
      "Rooftop gardens",
      "Co-working spaces",
    ],
    description:
      "Contemporary residential community designed for the modern professional, combining comfort, connectivity, and sustainable living.",
    area: "8,000 sq ft",
    status: "Completed",
  },
  {
    id: 13,
    title: "Satellite Park (Com/Resi/Row-Houses)",
    location: "Hatkesh, Mira Road (E), Mumbai",
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
    area: "1,50,000 sq ft",
    status: "Completed",
  },
  {
    id: 14,
    title: "Dev-Ashish",
    location: "Shirdi Nagar, Bhayandar (E), Thane",
    type: "Residential",
    image: "/images/projects/metropolitan-suites.jpg",
    startDate: "Mar 1987",
    endDate: "Dec 1989",
    durationMonths: 33,
    highlights: [
      "200+ premium units",
      "Wellness center",
      "Rooftop gardens",
      "Co-working spaces",
    ],
    description:
      "Contemporary residential community designed for the modern professional, combining comfort, connectivity, and sustainable living.",
    area: "10,000 sq ft",
    status: "Completed",
  },
];
