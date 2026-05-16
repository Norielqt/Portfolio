import project1a from '../assets/Project1a.webp';
import project1b from '../assets/Project1b.webp';
import project1c from '../assets/Project1c.webp';
import project1d from '../assets/Project1d.webp';
import project1e from '../assets/Project1e.webp';
import project1f from '../assets/Project1f.webp';
import project1g from '../assets/Project1g.webp';
import project1h from '../assets/Project1h.webp';
import project1i from '../assets/Project1i.webp';
import project1j from '../assets/Project1j.webp';
import project1k from '../assets/Project1k.webp';

import project2a from '../assets/Project2a.webp';
import project2b from '../assets/Project2b.webp';
import project2c from '../assets/Project2c.webp';
import project2d from '../assets/Project2d.webp';

import project3a from '../assets/Project3a.webp';
import project3b from '../assets/Project3b.webp';
import project3c from '../assets/Project3c.webp';
import project3d from '../assets/Project3d.webp';
import project3e from '../assets/Project3e.webp';
import project3f from '../assets/Project3f.webp';
import project3g from '../assets/Project3g.webp';

import project4a from '../assets/Project4a.webp';
import project4b from '../assets/Project4b.webp';
import project4c from '../assets/Project4c.webp';
import project4d from '../assets/Project4d.webp';
import project4e from '../assets/Project4e.webp';
import project4f from '../assets/Project4f.webp';

import project5a from '../assets/Project5a.webp';
import project5b from '../assets/Project5b.webp';
import project5c from '../assets/Project5c.webp';
import project5d from '../assets/Project5d.webp';
import project5e from '../assets/Project5e.webp';
import project5f from '../assets/Project5f.webp';
import project5g from '../assets/Project5g.webp';
import project5h from '../assets/Project5h.webp';

import project6a from '../assets/Project6a.webp';
import project6b from '../assets/Project6b.webp';
import project6c from '../assets/Project6c.webp';
import project6d from '../assets/Project6d.webp';
import project6e from '../assets/Project6e.webp';
import project6f from '../assets/Project6f.webp';
import project6g from '../assets/Project6g.webp';
import project6h from '../assets/Project6h.webp';

import zentraCRM from '../assets/ZentraCRM.webp';
import realtorHQ from '../assets/RealtorHQ.webp';
import parkCabins from '../assets/ParkCabins.webp';
import saasProjectManagement from '../assets/SaasProjectManagement.webp';
import zonify from '../assets/Zonify.webp';
import veradaPreview from '../assets/Verada_preview.webp';
import lumierePreview from '../assets/lumiere_preview.webp';

const projects = [
  {
    id: 6,
    title: "Verada Consulting",
    category: "websites",
    thumbnail: veradaPreview,
    demo: "https://websites.norielfulgencio.com/verada",
    description:
      "A production-ready consulting firm website I designed and developed. Features include a hero section with animated statistics, service cards with hover effects, a 4-step process visualization, client testimonials, and a functional contact form. Built with semantic HTML5, responsive CSS3 Grid/Flexbox, and vanilla JavaScript. Fully accessible and optimized for conversion.",
    stack: ["HTML", "CSS", "JavaScript"],
    images: [],
  },
  {
    id: 7,
    title: "Lumiere",
    category: "websites",
    demo: "https://websites.norielfulgencio.com/lumiere",
    description:
      "A luxury clean beauty brand website I designed and developed. Features a shoppable product grid, editorial journal with category filtering, brand philosophy page, and a functional cart with localStorage persistence. Built with semantic HTML5, CSS3, and vanilla JavaScript, including scroll-triggered animations, parallax effects, and IntersectionObserver-powered reveals.",
    stack: ["HTML", "CSS", "JavaScript"],
    thumbnail: lumierePreview,
    images: [],
  },
  {
    id: 1,
    title: "ZentraCRM",
    category: "web-application",
    badge: "Featured Project",
    thumbnail: project6g,
    github: "https://github.com/Norielqt/Zentra-crm",
    demo: "https://zentra-crm-dun.vercel.app/",
    description:
      "A cloud-based CRM platform designed to help small sales teams stay organised and close more deals. Zentra gives your team a clear view of every lead, client, and task in one place, with a visual pipeline board, automated follow-up workflows, and a smart dashboard that tells you exactly where to focus your attention. Each business gets its own fully isolated workspace, with role-based access so admins and team members only see what's relevant to them.",
    stack: ["React", "Vite", "Laravel", "PHP", "MySQL", "Docker"],
    images: [
      project6a,
      project6b,
      project6c,
      project6d,
      project6e,
      project6f,
      project6g,
      project6h,
    ],
  },
  {
    id: 2,
    title: "RealtorHQ",
    category: "web-application",
    badge: "Featured Project",
    thumbnail: project5a,
    github: "https://github.com/Norielqt/real-estate-property-system",
    demo: "https://realtor-hq.vercel.app/",
    description:
      "A full-stack real estate listing platform inspired by Zillow and Airbnb. Built a REST API with 24 endpoints, Sanctum token-based auth, and role-based access for buyers, owners, and admins. Supports property listings for sale and rent across the Philippines with advanced search and filtering, an interactive Leaflet map, gallery uploads, a booking request dashboard, and a floating AI chatbot that parses natural language queries and returns matching property cards inline. Covers 10+ feature-complete pages.",
    stack: ["React", "Vite", "Laravel", "PHP", "MySQL", "CSS"],
    images: [
      project5a,
      project5b,
      project5c,
      project5d,
      project5e,
      project5f,
      project5g,
      project5h,
    ],
  },
  {
    id: 3,
    title: "Park Cabins",
    category: "web-application",
    badge: "Built & Deployed for a Real Company",
    thumbnail: project3a,
    description:
      "A production CRM deployed and actively used by a cabin manufacturing company. Covers 6 end-to-end workflows: enquiry, quoting, production tracking, project delivery, invoicing, and payment, replacing manual spreadsheet processes. Features a staff dashboard for managing customers, jobs, financials, and documents, plus a dedicated customer portal for real-time project progress visibility. Built with a fully relational MySQL schema to handle complex job and financial data.",
    stack: ["React", "Vite", "Laravel", "PHP", "MySQL", "Tailwind CSS"],
    images: [
      project3a,
      project3b,
      project3c,
      project3d,
      project3e,
      project3f,
      project3g,
    ],
  },
  {
    id: 4,
    title: "SaaS Project Management System",
    category: "web-application",
    thumbnail: project4a,
    github: "https://github.com/Norielqt/saas-project-management",
    description:
      "A multi-tenant SaaS project management platform with role-based access control for admins, project managers, and members. Supports full project and task lifecycle management including creation, assignment, prioritization, status tracking, and progress monitoring across multiple teams and organizations from a single platform. Built with a RESTful Laravel API, real-time UI updates, and a responsive React dashboard covering 8+ core modules.",
    stack: ["React", "Vite", "Laravel", "PHP", "Tailwind CSS", "MySQL"],
    images: [
      project4a,
      project4b,
      project4c,
      project4d,
      project4e,
      project4f,
    ],
  },
  {
    id: 5,
    title: "Zonify",
    category: "web-application",
    badge: "Best Thesis",
    thumbnail: project1b,
    github: "https://github.com/Norielqt/Zonify",
    description:
      "A web-based zone classification system powered by a TensorFlow deep learning model. Allows users to upload images and receive predicted zone classifications in real time through a Flask REST API. Trained on a custom dataset and deployed as a fully responsive single-page application, covering end-to-end ML integration from model inference to a clean browser UI. No external ML service required.",
    stack: ["Python", "Flask", "TensorFlow", "HTML", "CSS", "JavaScript"],
    images: [
      project1a,
      project1b,
      project1c,
      project1d,
      project1e,
      project1f,
      project1g,
      project1h,
      project1i,
      project1j,
      project1k,
    ],
  },
];

export default projects;
