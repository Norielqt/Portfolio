import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import {
  SiReact, SiVite, SiLaravel, SiMysql, SiTailwindcss, SiPython,
  SiHtml5, SiCss3, SiJavascript, SiTensorflow, SiPhp,
} from "react-icons/si";

const iconMap = {
  React:        { icon: <SiReact />,       color: "text-sky-400",    bg: "bg-sky-400/10 border-sky-400/30" },
  Vite:         { icon: <SiVite />,        color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/30" },
  Laravel:      { icon: <SiLaravel />,     color: "text-red-500",    bg: "bg-red-500/10 border-red-500/30" },
  MySQL:        { icon: <SiMysql />,       color: "text-blue-400",   bg: "bg-blue-400/10 border-blue-400/30" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "text-teal-400", bg: "bg-teal-400/10 border-teal-400/30" },
  Python:       { icon: <SiPython />,      color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  Flask:        { icon: <SiPython />,      color: "text-gray-400",   bg: "bg-gray-400/10 border-gray-400/30" },
  HTML:         { icon: <SiHtml5 />,       color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30" },
  CSS:          { icon: <SiCss3 />,        color: "text-blue-400",   bg: "bg-blue-400/10 border-blue-400/30" },
  JavaScript:   { icon: <SiJavascript />,  color: "text-yellow-300", bg: "bg-yellow-300/10 border-yellow-300/30" },
  TensorFlow:   { icon: <SiTensorflow />,  color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30" },
  PHP:          { icon: <SiPhp />,         color: "text-indigo-400", bg: "bg-indigo-400/10 border-indigo-400/30" },
};
import projects from "../data/projects";

export default function Projects() {
  const [modalProjectId, setModalProjectId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    <section id="projects" className="py-16 px-4 max-w-6xl mx-auto">
      <motion.h3
        className="text-3xl font-semibold mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true, margin: "0px 0px 80px 0px" }}
      >
        Projects
      </motion.h3>

      {projects.map((project, index) => (
        <div
          key={project.id}
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-lg hover:shadow-xl transition mb-16"
        >
          <div
            className="relative w-full h-56 sm:h-72 md:h-96 mb-8 rounded overflow-hidden cursor-pointer group"
            onClick={() => openModal(project.id, 0)}
          >
            <img
              src={project.images[0]}
              alt={`${project.title} screenshot 1`}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity" />
            <div className="absolute top-3 left-3 bg-white text-black text-sm font-semibold px-3 py-1 rounded shadow">
              {project.images.length} image{project.images.length > 1 ? "s" : ""}
            </div>
            <div className="absolute bottom-3 right-3 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm font-medium px-3 py-1 rounded shadow opacity-80 group-hover:opacity-100 transition">
              View Gallery →
            </div>
          </div>

          {project.badge && (
            <span className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-500 dark:text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 inline-block"></span>
              {project.badge}
            </span>
          )}
          <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Built With</p>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 dark:bg-white/10 text-white hover:bg-gray-700 dark:hover:bg-white/20 transition"
              >
                <FiGithub size={13} /> View on GitHub
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => {
            const t = iconMap[tech];
            return (
              <span
                  key={tech}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${t.bg}`}
                >
                  <span className={`text-sm leading-none ${t.color}`}>{t.icon}</span>
                  <span className="text-gray-700 dark:text-gray-200">{tech}</span>
                </span>
              );
            })}
          </div>
        </div>
      ))}

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
  );
}
