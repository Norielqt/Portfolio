import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import projects from "./data/projects";

const Home = () => <div><Hero /><Services /><QuoteBanner /><About /></div>;

const ServicesPage = () => (
  <div>
    <div style={{ backgroundColor: "#f6f8f5" }} className="pt-24 pb-16 px-4 min-h-[40vh] flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <h1 style={{ fontFamily: "DM Sans, sans-serif", fontSize: "76px", letterSpacing: "-3px" }} className="text-brand font-extrabold text-center">
          My Services
        </h1>
      </div>
    </div>
    <Services layout="list" />
    <div style={{ backgroundColor: "#f6f8f5" }} className="py-16 px-4 min-h-[40vh] flex items-start pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <h4 style={{ fontFamily: "Forum, serif", fontSize: "40px" }} className="text-brand text-left">
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

  const categoryTitle = categoryTitles[category] || "Projects";

  return (
    <div>
      <div style={{ backgroundColor: "#f6f8f5" }} className="pt-24 pb-16 px-4 min-h-[40vh] flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-brand hover:opacity-70 transition mb-4"
          >
            <FiArrowLeft size={20} />
            Back to Projects
          </button>
          <h1 style={{ fontFamily: "DM Sans, sans-serif", fontSize: "76px", letterSpacing: "-3px" }} className="text-brand font-extrabold text-center">
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
        <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/timeline" element={<Experience />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/web-development" element={<ProjectCategory category="web-development" />} />
          <Route path="/projects/automation" element={<ProjectCategory category="automation" />} />
          <Route path="/projects/software-development" element={<ProjectCategory category="software-development" />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
      <Analytics />
        </BrowserRouter>
      )}
    </>
  );
}