import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Seo from "./Seo";
import Projects from "./Projects";
import projects from "../data/projects";

const categoryTitles = {
  "web-development": "Web Development",
  "automation": "Automation",
  "software-development": "Software Development"
};

const categoryDescriptions = {
  "web-development": "Web development projects by Noriel Fulgencio — React and Laravel sites and web apps built for clients and personal work.",
  "automation": "Automation projects by Noriel Fulgencio — scripts, integrations, and workflows that replace repetitive manual work for small businesses.",
  "software-development": "Software development projects by Noriel Fulgencio — custom systems, CRMs, and internal tools built from scratch."
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
      <div style={{ backgroundColor: "#f6f8f5" }} className="pt-24 pb-16 px-4 min-h-[40vh] flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-brand hover:opacity-70 transition mb-4"
          >
            <FiArrowLeft size={20} />
            Back to Projects
          </button>
          <h1 style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(40px, 12vw, 76px)", letterSpacing: "clamp(-1.5px, -0.4vw, -3px)" }} className="text-brand font-extrabold text-center">
            {categoryTitle}
          </h1>
        </div>
      </div>
      <Projects category={category} />
    </div>
  );
};

export default ProjectCategory;
