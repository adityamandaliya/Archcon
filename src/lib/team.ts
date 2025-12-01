export interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  specialties?: string[];
  email?: string;
  phone?: string;
}

export interface TeamCategory {
  id: string;
  name: string;
  title: string;
  description: string;
  members: TeamMember[];
}

// Founder Data
export const FOUNDER: TeamMember = {
  id: 1,
  name: "Snehal Mandaliya",
  title: "Founder & Director",
  image: "/images/team/founder.jpg",
  bio: "Visionary leader with 15+ years of experience in premium construction and redevelopment. Master architect of transformation, turning aging structures into modern residential experiences.",
  specialties: [
    "Strategic Leadership",
    "Project Management",
    "Urban Development",
    "Sustainable Architecture",
  ],
  email: "snmandaliya@gmail.com",
  phone: "+91 9920295559",
};

// Associates Data
export const ASSOCIATES: TeamMember[] = [
  {
    id: 2,
    name: "Rajesh Sharma",
    title: "Senior Associate",
    image: "/images/team/associate-1.jpg",
    bio: "Experienced redevelopment specialist with proven track record of delivering 50+ successful projects across Mumbai.",
    specialties: ["Project Development", "Client Relations", "Site Management"],
    email: "rajesh@archcon.com",
    phone: "+91 98765-43211",
  },
  {
    id: 3,
    name: "Priya Desai",
    title: "Business Development Manager",
    image: "/images/team/associate-2.jpg",
    bio: "Strategic growth expert specializing in market analysis and project structuring for optimal community benefits.",
    specialties: ["Business Development", "Market Research", "Negotiations"],
    email: "priya@archcon.com",
    phone: "+91 98765-43212",
  },
  {
    id: 4,
    name: "Vikram Patel",
    title: "Operations Lead",
    image: "/images/team/associate-3.jpg",
    bio: "Operational excellence champion ensuring seamless project execution and stakeholder satisfaction.",
    specialties: ["Operations", "Process Optimization", "Quality Assurance"],
    email: "vikram@archcon.com",
    phone: "+91 98765-43213",
  },
];

// Team Categories
export const TEAM_CATEGORIES: TeamCategory[] = [
  {
    id: "architects",
    name: "Architects",
    title: "Design & Architecture",
    description:
      "Visionary architects crafting innovative structural designs and transformative spaces",
    members: [
      {
        id: 5,
        name: "Dr. Abhishek Kumar",
        title: "Lead Architect",
        image: "/images/team/architect-1.jpg",
        bio: "Award-winning architect specializing in sustainable urban development and earthquake-resistant design.",
        specialties: ["Structural Design", "Sustainability", "CAD & BIM"],
        email: "abhishek@archcon.com",
        phone: "+91 98765-43214",
      },
      {
        id: 6,
        name: "Neha Mehta",
        title: "Senior Architect",
        image: "/images/team/architect-2.jpg",
        bio: "Creative designer with expertise in modern residential layouts and space optimization.",
        specialties: [
          "Residential Design",
          "Space Planning",
          "Interior Coordination",
        ],
        email: "neha@archcon.com",
        phone: "+91 98765-43215",
      },
    ],
  },
  {
    id: "rcc-consultants",
    name: "RCC Consultants",
    title: "Structural & RCC Expertise",
    description:
      "Expert consultants ensuring structural integrity and compliance with latest building codes",
    members: [
      {
        id: 7,
        name: "Prof. Sudhir Nair",
        title: "RCC Consultant",
        image: "/images/team/rcc-1.jpg",
        bio: "Structural engineer with 20+ years expertise in RCC construction and material science.",
        specialties: ["RCC Design", "Structural Analysis", "Building Codes"],
        email: "sudhir@archcon.com",
        phone: "+91 98765-43216",
      },
      {
        id: 8,
        name: "Anita Singh",
        title: "Site Structural Engineer",
        image: "/images/team/rcc-2.jpg",
        bio: "Quality control expert ensuring structural excellence and safety compliance on all projects.",
        specialties: [
          "Quality Control",
          "Site Supervision",
          "Testing & Certification",
        ],
        email: "anita@archcon.com",
        phone: "+91 98765-43217",
      },
    ],
  },
  {
    id: "contractors",
    name: "Contractors",
    title: "Construction & Execution",
    description:
      "Skilled contractors delivering projects on time with precision and excellence",
    members: [
      {
        id: 9,
        name: "Ramesh Yadav",
        title: "Project Contractor",
        image: "/images/team/contractor-1.jpg",
        bio: "Experienced contractor with expertise in large-scale residential construction and management.",
        specialties: [
          "Project Execution",
          "Labor Management",
          "Safety Protocols",
        ],
        email: "ramesh@archcon.com",
        phone: "+91 98765-43218",
      },
      {
        id: 10,
        name: "Deepak Gupta",
        title: "Senior Contractor",
        image: "/images/team/contractor-2.jpg",
        bio: "Masters in construction logistics with proven ability to manage complex multi-phase projects.",
        specialties: [
          "Construction Management",
          "Cost Control",
          "Timeline Management",
        ],
        email: "deepak@archcon.com",
        phone: "+91 98765-43219",
      },
    ],
  },
  {
    id: "legal-consultants",
    name: "Legal Consultants",
    title: "Legal & Compliance",
    description:
      "Expert legal advisors ensuring seamless regulatory compliance and member protection",
    members: [
      {
        id: 11,
        name: "Adv. Meera Joshi",
        title: "Legal Consultant",
        image: "/images/team/legal-1.jpg",
        bio: "Senior advocate specializing in real estate law and redevelopment agreements.",
        specialties: ["Real Estate Law", "Agreements", "Regulatory Compliance"],
        email: "meera@archcon.com",
        phone: "+91 98765-43220",
      },
      {
        id: 12,
        name: "Adv. Vikram Singh",
        title: "Compliance Officer",
        image: "/images/team/legal-2.jpg",
        bio: "Expert in municipal regulations and legal documentation for housing societies.",
        specialties: ["Municipal Law", "Documentation", "Dispute Resolution"],
        email: "vikram.legal@archcon.com",
        phone: "+91 98765-43221",
      },
    ],
  },
  {
    id: "civil-engineers",
    name: "Civil Engineers",
    title: "Civil Engineering",
    description:
      "Skilled civil engineers managing site development and infrastructure excellence",
    members: [
      {
        id: 13,
        name: "Arun Kumar",
        title: "Civil Engineer",
        image: "/images/team/civil-1.jpg",
        bio: "Expert in site planning, drainage systems, and infrastructure development.",
        specialties: ["Site Planning", "Infrastructure", "Drainage Systems"],
        email: "arun.civil@archcon.com",
        phone: "+91 98765-43222",
      },
      {
        id: 14,
        name: "Priya Nair",
        title: "Senior Civil Engineer",
        image: "/images/team/civil-2.jpg",
        bio: "Specialist in environmental compliance and sustainable infrastructure solutions.",
        specialties: [
          "Environmental Compliance",
          "Sustainability",
          "Utility Planning",
        ],
        email: "priya.civil@archcon.com",
        phone: "+91 98765-43223",
      },
    ],
  },
  {
    id: "site-engineers",
    name: "Site Engineers",
    title: "On-Site Engineering",
    description:
      "Dedicated site engineers ensuring seamless execution and daily project oversight",
    members: [
      {
        id: 15,
        name: "Harsh Patel",
        title: "Site Engineer",
        image: "/images/team/site-1.jpg",
        bio: "Detail-oriented engineer overseeing daily construction activities and quality standards.",
        specialties: [
          "Site Management",
          "Quality Monitoring",
          "Progress Tracking",
        ],
        email: "harsh.site@archcon.com",
        phone: "+91 98765-43224",
      },
      {
        id: 16,
        name: "Kavya Sharma",
        title: "Junior Site Engineer",
        image: "/images/team/site-2.jpg",
        bio: "Dedicated engineer focused on safety compliance and worker coordination on site.",
        specialties: ["Safety Management", "Worker Coordination", "Reporting"],
        email: "kavya.site@archcon.com",
        phone: "+91 98765-43225",
      },
    ],
  },
];
