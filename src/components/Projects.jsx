import React, { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
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
    id: 2,
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

  const showNextImage = () => {
    const project = projects.find((p) => p.id === modalProjectId);
    if (project) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const showPrevImage = () => {
    const project = projects.find((p) => p.id === modalProjectId);
    if (project) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

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
            className="relative w-full h-96 mb-8 rounded overflow-hidden cursor-pointer group"
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
            <div className="absolute bottom-3 right-3 bg-blue-600 text-white text-sm px-3 py-1 rounded shadow opacity-80 group-hover:opacity-100 transition">
              View Gallery →
            </div>
          </div>

          <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
          <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
        </motion.div>
      ))}

      {modalProjectId !== null && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
        >
          <div className="relative max-w-[65vw] max-h-[65vh]">
            <img
              src={
                projects.find((p) => p.id === modalProjectId).images[currentImageIndex]
              }
              alt="Project screenshot preview"
              className="max-w-full max-h-full rounded shadow-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white text-4xl font-bold focus:outline-none"
              aria-label="Close image preview"
            >
              &times;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrevImage();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold px-3"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNextImage();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold px-3"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
