import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-7 pt-[10rem] pb-[5rem] max-w-6xl mx-auto gap-y-12 md:gap-x-20">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
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

        {/* Download CV Button */}
        <div>
          <a
            href="/NorielFulgencio_CV.pdf"
            download
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Download CV
          </a>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="mt-12 md:mt-0 md:w-1/3 flex justify-center"
      >
        <img
          src="/NorielFulgencio.jpg"
          alt="Noriel Fulgencio"
          className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-xl border-4 border-blue-500"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
