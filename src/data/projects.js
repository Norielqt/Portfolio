const projects = [
  {
    id: 1,
    title: "RealtorHQ",
    badge: "Featured Project",
    github: "https://github.com/Norielqt/real-estate-property-system",
    demo: "https://realtor-hq.vercel.app/",
    description:
      "A full-stack real estate listing platform inspired by Zillow and Airbnb. Built a REST API with 24 endpoints, Sanctum token-based auth, and role-based access for buyers, owners, and admins. Supports property listings for sale and rent across the Philippines with advanced search and filtering, an interactive Leaflet map, gallery uploads, a booking request dashboard, and a floating AI chatbot that parses natural language queries and returns matching property cards inline — all across 10+ feature-complete pages.",
    stack: ["React", "Vite", "Laravel", "PHP", "MySQL", "CSS"],
    images: [
      "/Project5a.png",
      "/Project5b.png",
      "/Project5c.png",
      "/Project5d.png",
      "/Project5e.png",
      "/Project5f.png",
      "/Project5g.png",
      "/Project5h.png",
    ],
  },
  {
    id: 2,
    title: "Park Cabins",
    badge: "Built & Deployed for a Real Company",
    description:
      "A production CRM deployed and actively used by a cabin manufacturing company. Covers 6 end-to-end workflows — enquiry, quoting, production tracking, project delivery, invoicing, and payment — replacing manual spreadsheet processes. Features a staff dashboard for managing customers, jobs, financials, and documents, plus a dedicated customer portal for real-time project progress visibility. Built with a fully relational MySQL schema to handle complex job and financial data.",
    stack: ["React", "Vite", "Laravel", "PHP", "MySQL", "Tailwind CSS"],
    images: [
      "/Project3a.png",
      "/Project3b.png",
      "/Project3c.png",
      "/Project3d.png",
      "/Project3e.png",
      "/Project3f.png",
      "/Project3g.png",
    ],
  },
  {
    id: 3,
    title: "SaaS Project Management System",
    github: "https://github.com/Norielqt/saas-project-management",
    description:
      "A multi-tenant SaaS project management platform with role-based access control for admins, project managers, and members. Supports full project and task lifecycle management — creation, assignment, prioritization, status tracking, and progress monitoring — across multiple teams and organizations from a single platform. Built with a RESTful Laravel API, real-time UI updates, and a responsive React dashboard covering 8+ core modules.",
    stack: ["React", "Vite", "Laravel", "PHP", "Tailwind CSS", "MySQL"],
    images: [
      "/Project4a.png",
      "/Project4b.png",
      "/Project4c.png",
      "/Project4d.png",
      "/Project4e.png",
      "/Project4f.png",
    ],
  },
  {
    id: 4,
    title: "Zonify",
    badge: "Best Thesis",
    github: "https://github.com/Norielqt/Zonify",
    description:
      "A web-based zone classification system powered by a TensorFlow deep learning model. Allows users to upload images and receive predicted zone classifications in real time through a Flask REST API. Trained on a custom dataset and deployed as a fully responsive single-page application, covering end-to-end ML integration from model inference to a clean browser UI — no external ML service required.",
    stack: ["Python", "Flask", "TensorFlow", "HTML", "CSS", "JavaScript"],
    images: [
      "/Project1a.png",
      "/Project1b.png",
      "/Project1c.png",
      "/Project1d.png",
      "/Project1e.png",
      "/Project1f.png",
      "/Project1g.png",
      "/Project1h.png",
      "/Project1i.png",
      "/Project1j.png",
      "/Project1k.png",
    ],
  },
];

export default projects;
