import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroVideo from '../assets/NorielFulgencioHi.mp4';
import heroImage from '../assets/NorielFulgencio.png';

const Hero = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#f6f8f5" }}>
      <section className="flex flex-col md:flex-row items-center justify-between px-7 pt-24 md:pt-[20rem] pb-[16rem] max-w-6xl mx-auto gap-y-12 md:gap-x-20">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center md:text-left md:w-2/3 space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-brand leading-tight">
          Hi, I'm Noriel Fulgencio
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-brand">
          Software Engineer
        </p>
        <p className="text-lg md:text-xl text-brand max-w-2xl">
          I specialize in building efficient, scalable, and user-friendly websites and web applications.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <a
            href="/NorielFulgencio_CV.pdf"
            download
            className="inline-flex items-center px-6 py-3 bg-white text-brand rounded-lg hover:bg-gray-100 transition font-medium"
          >
            Download CV
          </a>
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center px-6 py-3 border-2 border-brand text-brand rounded-lg hover:bg-brand/10 transition font-medium"
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
        {showVideo ? (
          <video
            ref={videoRef}
            src={heroVideo}
            muted
            playsInline
            onEnded={() => setShowVideo(false)}
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-xl border-4 border-brand"
          />
        ) : (
          <img
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-xl border-4 border-brand"
            src={heroImage}
            alt="Noriel Fulgencio"
          />
        )}
      </motion.div>
      </section>
    </div>
  );
};

export default Hero;
