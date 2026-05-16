import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Seo from "./Seo";
import Projects from "./Projects";
import projects from "../data/projects";

const categoryTitles = {
  "web-development": "Web Development",
  "automation": "Automation",
  "software-development": "Software Development",
  "websites": "Websites",
  "web-application": "Web Application"
};

const categoryDescriptions = {
  "web-development": "Web development projects by Noriel Fulgencio — React and Laravel sites and web apps built for clients and personal work.",
  "automation": "Automation projects by Noriel Fulgencio — scripts, integrations, and workflows that replace repetitive manual work for small businesses.",
  "software-development": "Software development projects by Noriel Fulgencio — custom systems, CRMs, and internal tools built from scratch.",
  "websites": "Website projects by Noriel Fulgencio — clean, fast, and professional websites built for real businesses using HTML, CSS, and JavaScript.",
  "web-application": "Web application projects by Noriel Fulgencio — full-stack web applications with rich features, smooth UX, and modern frameworks."
};

const ProjectCategory = ({ category }) => {
  const navigate = useNavigate();
  const categoryTitle = categoryTitles[category] || "Projects";
  const categoryDescription = categoryDescriptions[category] || "Selected projects by Noriel Fulgencio.";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.norielfulgencio.com/" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.norielfulgencio.com/projects" },
      { "@type": "ListItem", "position": 3, "name": categoryTitle, "item": `https://www.norielfulgencio.com/projects/${category}` }
    ]
  };

  const categoryProjects = projects.filter(p => p.category === category);
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${categoryTitle} Projects by Noriel Fulgencio`,
    "itemListElement": categoryProjects.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "CreativeWork",
        "name": p.title,
        "description": p.description,
        "author": { "@type": "Person", "name": "Noriel Fulgencio" },
        "url": p.demo || p.github || `https://www.norielfulgencio.com/projects/${category}`,
        "keywords": (p.stack || []).join(", ")
      }
    }))
  };

  return (
    <div>
      <Seo
        title={`${categoryTitle} Projects — Noriel Fulgencio`}
        description={categoryDescription}
        path={`/projects/${category}`}
        jsonLd={[breadcrumbLd, itemListLd]}
      />
      <div
        style={{ background: "radial-gradient(ellipse at 30% 60%, #ddebd3 0%, #f6f8f5 50%, #f0f4ec 100%)" }}
        className="pt-32 pb-16 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl mx-auto w-full text-center"
        >
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center justify-center gap-2 text-brand/60 hover:text-brand transition mb-6 mx-auto text-sm font-semibold tracking-[0.15em] uppercase"
          >
            <FiArrowLeft size={15} />
            All Projects
          </button>
          <h1
            style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "clamp(-1.5px, -0.4vw, -3px)" }}
            className="text-brand-800 font-extrabold text-5xl md:text-7xl"
          >
            {categoryTitle}
          </h1>
        </motion.div>
      </div>
      <Projects category={category} />
    </div>
  );
};

export default ProjectCategory;
