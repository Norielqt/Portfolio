import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-7 pt-24 md:pt-[10rem] pb-[5rem] max-w-6xl mx-auto gap-y-12 md:gap-x-20">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center md:text-left md:w-2/3 space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Hi, I'm Noriel Fulgencio
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-blue-600 dark:text-blue-400">
          Software Engineer
        </p>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
          I specialize in building efficient, scalable, and user-friendly websites and web applications.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <a
            href="/NorielFulgencio_CV.pdf"
            download
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Download CV
          </a>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition font-medium"
          >
            View My Work
          </button>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-12 md:mt-0 md:w-1/3 flex justify-center"
      >
        <img
          src={hovered ? "/NorielFulgencio2.png" : "/NorielFulgencio.png"}
          alt="Noriel Fulgencio"
          className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-xl border-4 border-blue-500 transition-opacity duration-300 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
