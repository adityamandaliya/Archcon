export interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
  specialties?: string[];
  email?: string;
  phone?: string;
  linkedin?: string;
  company?: string;
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
  id: 3,
  name: "Snehal Mandaliya",
  title: "Founder & Director",
  image: "/images/team/founder1.png",
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
    id: 1,
    name: "Aditya Mandaliya",
    title: "Financial Analyst",
    image: "/images/team/aditya.jpg",
    bio: "Expert in financial planning and cost estimation for large-scale redevelopment projects.  what hrmnorot i am just writing it add more space to existing card for just as an example",
    specialties: ["Financial Planning", "Cost Estimation", "Budgeting"],
    email: "rohan@archcon.com",
    phone: "+91 98765-43226",
    linkedin: "https://www.linkedin.com/in/aditya-mandaliya/",
    company: "ARCHCON",
  },
  {
    id: 2,
    name: "Hitesh Shah",
    title: "Senior Associate",
    image: "",
    bio: "Experienced redevelopment specialist with proven track record of delivering 50+ successful projects across Mumbai.",
    specialties: ["Project Development", "Client Relations", "Site Management"],
    email: "rajesh@archcon.com",
    phone: "+91 98765-43211",
    company: "GLORY CORPORATION",
  },
  {
    id: 17,
    name: "Kunal Thakur",
    title: "Business Development Manager",
    image: "",
    bio: "Strategic growth expert specializing in market analysis and project structuring for optimal community benefits.",
    specialties: ["Business Development", "Market Research", "Negotiations"],
    email: "priya@archcon.com",
    phone: "+91 98765-43212",
    company: "MTM INFRASTRUCTURES",
  },
  {
    id: 4,
    name: "Vishal Mahtre",
    title: "Operations Lead",
    image: "",
    bio: "Operational excellence champion ensuring seamless project execution and stakeholder satisfaction.",
    specialties: ["Operations", "Process Optimization", "Quality Assurance"],
    email: "vikram@archcon.com",
    phone: "+91 98765-43213",
    company: "MTM INFRASTRUCTURES",
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
        name: "Kiran Rokadia",
        title: "Lead Architect",
        image: "",
        bio: "Award-winning architect specializing in sustainable urban development and earthquake-resistant design.",
        specialties: ["Structural Design", "Sustainability", "CAD & BIM"],
        email: "abhishek@archcon.com",
        phone: "+91 98765-43214",
      },
      {
        id: 18,
        name: "Ambar Natekar",
        title: "Senior Architect",
        image: "",
        bio: "Creative designer with expertise in modern residential layouts and space optimization.",
        specialties: [
          "Residential Design",
          "Space Planning",
          "Interior Coordination",
        ],
        email: "neha@archcon.com",
        phone: "+91 98765-43215",
      },
      {
        id: 6,
        name: "Anil Jagad",
        title: "Senior Architect",
        image: "",
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
        name: "Haresh Patel",
        title: "RCC Consultant",
        image: "",
        bio: "Structural engineer with 20+ years expertise in RCC construction and material science.",
        specialties: ["RCC Design", "Structural Analysis", "Building Codes"],
        email: "sudhir@archcon.com",
        phone: "+91 98765-43216",
      },
      {
        id: 8,
        name: "S.S. Bhatt",
        title: "Site Structural Engineer",
        image: "",
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
        name: "Ramesh Deshpakka",
        title: "Project Contractor",
        image: "",
        bio: "Experienced contractor with expertise in large-scale residential construction and management.",
        specialties: [
          "Project Execution",
          "Labor Management",
          "Safety Protocols",
        ],
        email: "",
        phone: "",
      },
      {
        id: 10,
        name: "Jayesh Patel",
        title: "Senior Contractor",
        image: "",
        bio: "Masters in construction logistics with proven ability to manage complex multi-phase projects.",
        specialties: [
          "Construction Management",
          "Cost Control",
          "Timeline Management",
        ],
        email: "",
        phone: "",
      },
            {
        id: 14,
        name: "Vijay Patel",
        title: "Senior Contractor",
        image: "",
        bio: "Masters in construction logistics with proven ability to manage complex multi-phase projects.",
        specialties: [
          "Construction Management",
          "Cost Control",
          "Timeline Management",
        ],
        email: "",
        phone: "",
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
        name: "Adv. Nilanjana Shah",
        title: "Legal Consultant",
        image: "",
        bio: "Senior advocate specializing in real estate law and redevelopment agreements.",
        specialties: ["Real Estate Law", "Agreements", "Regulatory Compliance"],
        email: "",
        phone: "",
      },
      {
        id: 12,
        name: "Adv. Nevil Chedda",
        title: "Compliance Officer",
        image: "",
        bio: "Expert in municipal regulations and legal documentation for housing societies.",
        specialties: ["Municipal Law", "Documentation", "Dispute Resolution"],
        email: "",
        phone: "",
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
        name: "Himanshu",
        title: "Civil Engineer",
        image: "",
        bio: "Expert in site planning, drainage systems, and infrastructure development.",
        specialties: ["Site Planning", "Infrastructure", "Drainage Systems"],
        email: "arun.civil@archcon.com",
        phone: "+91 98765-43222",
      },
    ],
  },
];

// Additional Associates for the Expandable Section
export const ALL_ASSOCIATES: TeamMember[] = [
  {
    id: 100,
    name: "Shehkar Shinde",
    title: "Associate Partner",
    image: "",
    bio: "Dedicated professional contributing to the firm's strategic goals and project excellence with years of industry experience.",
    specialties: ["Strategy", "Planning", "Management"],
    email: "associate1@archcon.com",
    phone: "+91 98765-43210",
    company: "ARCHCON REALTY",
  },
  {
    id: 101,
    name: "Pravin Vora",
    title: "Associate Partner",
    image: "",
    bio: "Dedicated professional contributing to the firm's strategic goals and project excellence with years of industry experience.",
    specialties: ["Strategy", "Planning", "Management"],
    email: "",
    phone: "",
    company: "",
  },
  {
    id: 102,
    name: "Neela Vora",
    title: "Associate Partner",
    image: "",
    bio: "Dedicated professional contributing to the firm's strategic goals and project excellence with years of industry experience.",
    specialties: ["Strategy", "Planning", "Management"],
    email: "",
    phone: "",
    company: "",
  },
  {
    id: 103,
    name: "Ronak Vora",
    title: "Associate Partner",
    image: "",
    bio: "Dedicated professional contributing to the firm's strategic goals and project excellence with years of industry experience.",
    specialties: ["Strategy", "Planning", "Management"],
    email: "associate4@archcon.com",
    phone: "+91 98765-43213",
    company: "ARCHCON ASSO./REALTY",
  },
  {
    id: 104,
    name: "Hareesh Mehta",
    title: "Associate Partner",
    image: "",
    bio: "Dedicated professional contributing to the firm's strategic goals and project excellence with years of industry experience.",
    specialties: ["Strategy", "Planning", "Management"],
    email: "associate5@archcon.com",
    phone: "+91 98765-43214",
    company: "VASTUBH/ARCHCON INDIA",
  },
  {
    id: 105,
    name: "Bharat Vora",
    title: "Associate Partner",
    image: "",
    bio: "Dedicated professional contributing to the firm's strategic goals and project excellence with years of industry experience.",
    specialties: ["Strategy", "Planning", "Management"],
    email: "associate6@archcon.com",
    phone: "+91 98765-43215",
    company: "VASTUBH DEVELOPERS",
  },
  {
    id: 106,
    name: "Shatish Shah",
    title: "Associate Partner",
    image: "",
    bio: "Dedicated professional contributing to the firm's strategic goals and project excellence with years of industry experience.",
    specialties: ["Strategy", "Planning", "Management"],
    email: "associate7@archcon.com",
    phone: "+91 98765-43216",
    company: "DARSHAN INFRA",
  },
  {
    id: 107,
    name: "Darshan Shah",
    title: "Associate Partner",
    image: "",
    bio: "Dedicated professional contributing to the firm's strategic goals and project excellence with years of industry experience.",
    specialties: ["Strategy", "Planning", "Management"],
    email: "associate8@archcon.com",
    phone: "+91 98765-43217",
    company: "DARSHAN INFRA",
  },
  {
    id: 108,
    name: "Dhirajbhai Sangoi",
    title: "Associate Partner",
    image: "",
    bio: "Dedicated professional contributing to the firm's strategic goals and project excellence with years of industry experience.",
    specialties: ["Strategy", "Planning", "Management"],
    email: "associate9@archcon.com",
    phone: "+91 98765-43218",
    company: "VASTUBH/ARCHCON INDIA",
  },
  {
    id: 109,
    name: "Ajay Agrawal",
    title: "Associate Partner",
    image: "",
    bio: "Dedicated professional contributing to the firm's strategic goals and project excellence with years of industry experience.",
    specialties: ["Strategy", "Planning", "Management"],
    email: "associate10@archcon.com",
    phone: "+91 98765-43219",
    company: "GRACE",
  },
  {
    id: 110,
    name: "Sanjay Agrawal",
    title: "Associate Partner",
    image: "",
    bio: "Dedicated professional contributing to the firm's strategic goals and project excellence with years of industry experience.",
    specialties: ["Strategy", "Planning", "Management"],
    email: "associate11@archcon.com",
    phone: "+91 98765-43220",
    company: "GRACE",
  },
  {
    id: 111,
    name: "Devendra Chowdhari",
    title: "Associate Partner",
    image: "",
    bio: "Dedicated professional contributing to the firm's strategic goals and project excellence with years of industry experience.",
    specialties: ["Strategy", "Planning", "Management"],
    email: "associate12@archcon.com",
    phone: "+91 98765-43221",
    company: "GRACE",
  },
];
