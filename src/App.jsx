import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { FiCheckCircle, FiUsers, FiMail, FiAward, FiArrowLeft } from "react-icons/fi";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Services from "./components/Services";
import QuoteBanner from "./components/QuoteBanner";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Preloader from "./components/Preloader";
import Seo from "./components/Seo";
import projects from "./data/projects";

const Home = () => (
  <div>
    <Seo
      title="Noriel Fulgencio — Software Engineer & Automation Dev"
      description="Software Engineer from the Philippines building React & Laravel web apps and automations. Available for freelance and remote work worldwide."
      path="/"
    />
    <Hero />
    <About />
    <QuoteBanner />
    <div className="max-w-6xl mx-auto px-6 pt-20 pb-4 text-center">
      <h2
        style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "-2px" }}
        className="text-4xl md:text-5xl font-extrabold text-brand-800"
      >
        What I Offer
      </h2>
      <p className="mt-4 text-brand-700/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
        Practical solutions tailored to your business, from clean websites to systems that just work.
      </p>
    </div>
    <Services />
  </div>
);

const ServicesPage = () => (
  <div>
    <Seo
      title="Services — Web Development & Automation | Noriel Fulgencio"
      description="Freelance web development, custom software, and business automation services by a Software Engineer in the Philippines. React, Laravel, and more."
      path="/services"
    />
    <div
      style={{ background: "radial-gradient(ellipse at 30% 60%, #ddebd3 0%, #f6f8f5 50%, #f0f4ec 100%)" }}
      className="pt-32 pb-16 px-4"
    >
      <div className="max-w-6xl mx-auto w-full text-center">
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-brand/60 mb-4">
          What I do
        </p>
        <h1
          style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "clamp(-1.5px, -0.4vw, -3px)" }}
          className="text-brand-800 font-extrabold text-5xl md:text-7xl"
        >
          My Services
        </h1>
        <p className="mt-6 text-brand-700/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          From web development to automations and custom software, here's how I help businesses build, scale, and streamline.
        </p>
      </div>
    </div>
    <Services layout="list" />
    <div style={{ backgroundColor: "#f6f8f5" }} className="py-16 px-4 min-h-[40vh] flex items-start pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <h4 style={{ fontFamily: "Forum, serif", fontSize: "clamp(28px, 7vw, 40px)" }} className="text-brand text-left">
          Why Choose Me
        </h4>
        <div className="flex flex-col md:flex-row gap-12 mt-6">
          {/* Description on left */}
          <div className="md:w-1/2">
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "18px" }} className="text-brand">
              I've been working as a developer for about 2+ years now, and I've handled real projects including building custom software from scratch tailored to client needs, building websites, and automations. I keep things simple and make sure everything runs the way it should.
              <br />
              <br />
              The badges illustrate this. I also focus on key benefits they will get while using my services, namely Client-Focused Approach and Delivered as Expected.
            </p>
          </div>

          {/* Badges on right */}
          <div className="md:w-1/2 grid grid-cols-2 gap-8">
            {[
              { icon: <FiAward size={32} />, label: "2+ Years of Experience" },
              { icon: <FiUsers size={32} />, label: "Client-Focused Approach" },
              { icon: <FiCheckCircle size={32} />, label: "Delivered as Expected" },
              { icon: <FiMail size={32} />, label: "Clear Communication" }
            ].map((badge, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-brand flex items-center justify-center mb-3">
                  <div className="text-brand">{badge.icon}</div>
                </div>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px" }} className="text-brand">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectCategory = ({ category }) => {
  const navigate = useNavigate();
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

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
      {loaded && (
        <HelmetProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route
                  path="/timeline"
                  element={
                    <>
                      <Seo
                        title="Experience & Timeline — Noriel Fulgencio"
                        description="Career timeline and experience of Noriel Fulgencio, Software Engineer and Automation Specialist from the Philippines."
                        path="/timeline"
                      />
                      <Experience />
                    </>
                  }
                />
                <Route path="/services" element={<ServicesPage />} />
                <Route
                  path="/projects"
                  element={
                    <>
                      <Seo
                        title="Projects — Noriel Fulgencio"
                        description="Web development, automation, and software development projects by Noriel Fulgencio. React, Laravel, and custom systems."
                        path="/projects"
                      />
                      <Projects />
                    </>
                  }
                />
                <Route path="/projects/web-development" element={<ProjectCategory category="web-development" />} />
                <Route path="/projects/automation" element={<ProjectCategory category="automation" />} />
                <Route path="/projects/software-development" element={<ProjectCategory category="software-development" />} />
                <Route
                  path="/contact"
                  element={
                    <>
                      <Seo
                        title="Contact — Hire Noriel Fulgencio"
                        description="Get in touch with Noriel Fulgencio for freelance web development, automation, and software projects. Open to remote work worldwide."
                        path="/contact"
                      />
                      <Contact />
                    </>
                  }
                />
              </Route>
            </Routes>
            <Analytics />
          </BrowserRouter>
        </HelmetProvider>
      )}
    </>
  );
}