import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiGlobe } from "react-icons/fi";
import {
  SiReact, SiVite, SiLaravel, SiMysql, SiTailwindcss, SiPython,
  SiHtml5, SiCss3, SiJavascript, SiTensorflow, SiPhp, SiDocker, SiVercel,
} from "react-icons/si";
import Services from "./Services";

const iconMap = {
  React:        { icon: <SiReact />,       color: "text-sky-400",    bg: "bg-sky-400/10 border-sky-400/30" },
  Vite:         { icon: <SiVite />,        color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/30" },
  Laravel:      { icon: <SiLaravel />,     color: "text-red-500",    bg: "bg-red-500/10 border-red-500/30" },
  MySQL:        { icon: <SiMysql />,       color: "text-brand",      bg: "bg-brand/10 border-brand/30" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "text-teal-400", bg: "bg-teal-400/10 border-teal-400/30" },
  Python:       { icon: <SiPython />,      color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  Flask:        { icon: <SiPython />,      color: "text-gray-400",   bg: "bg-gray-400/10 border-gray-400/30" },
  HTML:         { icon: <SiHtml5 />,       color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30" },
  CSS:          { icon: <SiCss3 />,        color: "text-brand",      bg: "bg-brand/10 border-brand/30" },
  JavaScript:   { icon: <SiJavascript />,  color: "text-yellow-300", bg: "bg-yellow-300/10 border-yellow-300/30" },
  TensorFlow:   { icon: <SiTensorflow />,  color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30" },
  PHP:          { icon: <SiPhp />,         color: "text-indigo-400", bg: "bg-indigo-400/10 border-indigo-400/30" },
  Docker:       { icon: <SiDocker />,      color: "text-brand",      bg: "bg-brand/10 border-brand/30" },
  Vercel:       { icon: <SiVercel />,      color: "text-gray-100",   bg: "bg-gray-100/10 border-gray-100/30" },
};
import projects from "../data/projects";

export default function Projects({ category = null }) {
  const [modalProjectId, setModalProjectId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter projects by category if provided
  const filteredProjects = category ? projects.filter(p => p.category === category) : projects;

  const openModal = (projectId, index) => {
    setModalProjectId(projectId);
    setCurrentImageIndex(index);
  };

  const closeModal = () => {
    setModalProjectId(null);
  };

  const showNextImage = useCallback(() => {
    const project = projects.find((p) => p.id === modalProjectId);
    if (project) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  }, [modalProjectId]);

  const showPrevImage = useCallback(() => {
    const project = projects.find((p) => p.id === modalProjectId);
    if (project) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  }, [modalProjectId]);

  useEffect(() => {
    const handleKey = (e) => {
      if (modalProjectId === null) return;
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "ArrowLeft") showPrevImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalProjectId, showNextImage, showPrevImage]);

  return (
    <>
      {!category && (
        <>
          <div style={{ backgroundColor: "#f6f8f5" }} className="pt-24 pb-16 px-4 min-h-[40vh] flex items-center">
            <div className="max-w-6xl mx-auto w-full">
              <h1 style={{ fontFamily: "DM Sans, sans-serif", fontSize: "76px", letterSpacing: "-3px" }} className="text-brand font-extrabold text-center">
                My Projects
              </h1>
            </div>
          </div>
          <Services layout="grid" showDescription={false} />
        </>
      )}
      {category && (
        <section id="projects" className="pt-24 pb-16 px-4 max-w-6xl mx-auto">

          {filteredProjects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 items-start mb-20"
              >
                {/* Image - Always Left */}
                <div className="md:w-1/2 flex-shrink-0 flex justify-center">
                  <div
                    className="relative w-2/3 h-80 sm:h-96 md:h-[450px] overflow-hidden cursor-pointer group shadow-lg"
                    onClick={() => openModal(project.id, 0)}
                  >
                    <img
                      src={project.thumbnail || project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity" />
                    <div className="absolute top-3 left-3 bg-white text-black text-sm font-semibold px-3 py-1 rounded shadow">
                      {project.images.length} image{project.images.length > 1 ? "s" : ""}
                    </div>
                  </div>
                </div>

                {/* Content - Always Right */}
                <div className="md:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <h4 style={{ fontFamily: "Forum, serif", fontSize: "28px" }} className="font-normal text-brand">{project.title}</h4>
                    {project.badge && (
                      <span style={{ fontSize: "15px", color: "#536942" }} className="font-normal flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand inline-block"></span>
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "15px", color: "#536941E3" }} className="mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => {
                      const t = iconMap[tech];
                      return (
                        <span
                          key={tech}
                          className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-brand"
                        >
                          <span className="text-sm leading-none text-brand">{t.icon}</span>
                          <span>{tech}</span>
                        </span>
                      );
                    })}
                  </div>

                  {(project.github || project.demo) && (
                    <div className="flex flex-wrap gap-0">
                      {project.demo && (
                        <span style={{ fontSize: "15px" }} className="text-brand">
                          Live: <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:opacity-70 transition"
                          >
                            {project.demo}
                          </a>
                        </span>
                      )}
                      {project.github && (
                        <span style={{ fontSize: "15px" }} className="text-brand">
                          Github: <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="underline hover:opacity-70 transition"
                          >
                            {project.github}
                          </a>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

      {modalProjectId !== null && (() => {
        const project = projects.find((p) => p.id === modalProjectId);
        const total = project.images.length;
        return (
          <div
            onClick={closeModal}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          >
            {/* Close button */}
            <button
              onClick={(e) => { e.stopPropagation(); closeModal(); }}
              className="absolute top-4 right-5 z-10 text-white text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-opacity-30 transition focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-white text-sm font-medium bg-black bg-opacity-40 px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {total}
            </div>

            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); showPrevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-opacity-30 text-white transition focus:outline-none"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* Image */}
            <div
              className="relative flex items-center justify-center w-full h-full px-20"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  className="max-w-[80vw] max-h-[80vh] rounded-lg shadow-2xl object-contain"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            </div>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); showNextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-10 hover:bg-opacity-30 text-white transition focus:outline-none"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                  className={`w-2.5 h-2.5 rounded-full transition-all focus:outline-none ${
                    i === currentImageIndex
                      ? "bg-white scale-110"
                      : "bg-white bg-opacity-40 hover:bg-opacity-70"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        );
      })()}
        </section>
      )}
      
      <section style={{ backgroundColor: "#f6f8f5" }} className="w-full py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          {/* Quote mark */}
          <span className="text-8xl leading-none select-none" style={{ fontFamily: "Forum, serif", color: "#536942" }}>&ldquo;</span>

          {/* Quote text */}
          <h4
            className="text-2xl md:text-3xl mt-2 mb-10 max-w-2xl"
            style={{ fontFamily: "Forum, serif", color: "#536942" }}
          >
            A goal without a timeline is just a dream
          </h4>

          {/* Avatar circle */}
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 mb-3" style={{ borderColor: "#536942" }}>
            <img
              src="/RobertHerjavec.png"
              alt="Robert Herjavec"
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>

          {/* Name */}
          <p style={{ fontSize: 14, color: "#536942" }}>Robert Herjavec</p>
        </motion.div>
      </section>
    </>
  );
}
