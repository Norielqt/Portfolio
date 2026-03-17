import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Park Cabins",
    description:
      "A CRM built for a cabin manufacturing company. It manages the full customer lifecycle — from initial enquiry and quoting, through production and project delivery, to invoicing and payment — giving staff a centralised platform to track customers, jobs, financials, and documents, while also providing customers their own portal to follow their project's progress. Built with React, Vite, Laravel (PHP), MySQL, and more.",
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
    id: 2,
    title: "SaaS Project Management System",
    description:
      "A full-featured SaaS project management platform that enables teams to collaborate, track tasks, manage projects, and monitor progress in real time. Built with Laravel, PHP, React, Vite, Tailwind CSS, and Laravel Sanctum.",
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
    id: 3,
    title: "Zonify",
    description:
      "A responsive web app built with Python (Flask), HTML, CSS, JavaScript, and Tensorflow for Machine Learning.",
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
  {
    id: 4,
    title: "CICTScape",
    description:
      "A simple Room Management with Create, Delete, Update, and Delete functionality, using HTML, CSS, and  Javascript.",
    images: ["/Project2a.png", "/Project2b.png", "/Project2c.png", "/Project2d.png"],
  },
];

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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h3>

      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded shadow-lg hover:shadow-xl transition mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
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

          <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
          <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
        </motion.div>
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
