import project1a from '../assets/Project1a.png';
import project1b from '../assets/Project1b.png';
import project1c from '../assets/Project1c.png';
import project1d from '../assets/Project1d.png';
import project1e from '../assets/Project1e.png';
import project1f from '../assets/Project1f.png';
import project1g from '../assets/Project1g.png';
import project1h from '../assets/Project1h.png';
import project1i from '../assets/Project1i.png';
import project1j from '../assets/Project1j.png';
import project1k from '../assets/Project1k.png';

import project2a from '../assets/Project2a.png';
import project2b from '../assets/Project2b.png';
import project2c from '../assets/Project2c.png';
import project2d from '../assets/Project2d.png';

import project3a from '../assets/Project3a.png';
import project3b from '../assets/Project3b.png';
import project3c from '../assets/Project3c.png';
import project3d from '../assets/Project3d.png';
import project3e from '../assets/Project3e.png';
import project3f from '../assets/Project3f.png';
import project3g from '../assets/Project3g.png';

import project4a from '../assets/Project4a.png';
import project4b from '../assets/Project4b.png';
import project4c from '../assets/Project4c.png';
import project4d from '../assets/Project4d.png';
import project4e from '../assets/Project4e.png';
import project4f from '../assets/Project4f.png';

import project5a from '../assets/Project5a.png';
import project5b from '../assets/Project5b.png';
import project5c from '../assets/Project5c.png';
import project5d from '../assets/Project5d.png';
import project5e from '../assets/Project5e.png';
import project5f from '../assets/Project5f.png';
import project5g from '../assets/Project5g.png';
import project5h from '../assets/Project5h.png';

import project6a from '../assets/Project6a.png';
import project6b from '../assets/Project6b.png';
import project6c from '../assets/Project6c.png';
import project6d from '../assets/Project6d.png';
import project6e from '../assets/Project6e.png';
import project6f from '../assets/Project6f.png';
import project6g from '../assets/Project6g.png';
import project6h from '../assets/Project6h.png';

import zentraCRM from '../assets/ZentraCRM.png';
import realtorHQ from '../assets/RealtorHQ.png';
import parkCabins from '../assets/ParkCabins.png';
import saasProjectManagement from '../assets/SaasProjectManagement.png';
import zonify from '../assets/Zonify.png';

const projects = [
  {
    id: 1,
    title: "ZentraCRM",
    category: "software-development",
    badge: "Featured Project",
    thumbnail: zentraCRM,
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
    category: "software-development",
    badge: "Featured Project",
    thumbnail: realtorHQ,
    github: "https://github.com/Norielqt/real-estate-property-system",
    demo: "https://realtor-hq.vercel.app/",
    description:
      "A full-stack real estate listing platform inspired by Zillow and Airbnb. Built a REST API with 24 endpoints, Sanctum token-based auth, and role-based access for buyers, owners, and admins. Supports property listings for sale and rent across the Philippines with advanced search and filtering, an interactive Leaflet map, gallery uploads, a booking request dashboard, and a floating AI chatbot that parses natural language queries and returns matching property cards inline — all across 10+ feature-complete pages.",
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
    category: "software-development",
    badge: "Built & Deployed for a Real Company",
    thumbnail: parkCabins,
    description:
      "A production CRM deployed and actively used by a cabin manufacturing company. Covers 6 end-to-end workflows — enquiry, quoting, production tracking, project delivery, invoicing, and payment — replacing manual spreadsheet processes. Features a staff dashboard for managing customers, jobs, financials, and documents, plus a dedicated customer portal for real-time project progress visibility. Built with a fully relational MySQL schema to handle complex job and financial data.",
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
    category: "software-development",
    thumbnail: saasProjectManagement,
    github: "https://github.com/Norielqt/saas-project-management",
    description:
      "A multi-tenant SaaS project management platform with role-based access control for admins, project managers, and members. Supports full project and task lifecycle management — creation, assignment, prioritization, status tracking, and progress monitoring — across multiple teams and organizations from a single platform. Built with a RESTful Laravel API, real-time UI updates, and a responsive React dashboard covering 8+ core modules.",
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
    category: "software-development",
    badge: "Best Thesis",
    thumbnail: zonify,
    github: "https://github.com/Norielqt/Zonify",
    description:
      "A web-based zone classification system powered by a TensorFlow deep learning model. Allows users to upload images and receive predicted zone classifications in real time through a Flask REST API. Trained on a custom dataset and deployed as a fully responsive single-page application, covering end-to-end ML integration from model inference to a clean browser UI — no external ML service required.",
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
