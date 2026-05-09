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
    <div style={{
      background: "radial-gradient(ellipse at 30% 60%, #ddebd3 0%, #f6f8f5 50%, #f0f4ec 100%)",
    }}>
      <section className="flex flex-col md:flex-row items-center justify-between px-7 max-w-6xl mx-auto gap-y-12 md:gap-x-20 min-h-screen">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center md:text-left md:w-1/2 space-y-5"
      >
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-brand/60">
          Welcome to my portfolio
        </p>
        <h1 className="text-5xl md:text-6xl font-extrabold text-brand-800 leading-[1.05] tracking-tight">
          Hi, I'm<br />Noriel Fulgencio
        </h1>
        <p className="text-xl md:text-2xl font-medium text-brand">
          Software Engineer
        </p>
        <p className="text-base md:text-lg text-brand-700/70 max-w-md leading-relaxed">
          I specialize in building efficient, scalable, and user-friendly websites and web applications.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
          <a
            href="/NorielFulgencio_CV.pdf"
            download
            className="inline-flex items-center px-7 py-3 bg-brand text-white rounded-lg hover:bg-brand-700 transition font-medium shadow-md shadow-brand/20"
          >
            Download CV
          </a>
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center px-7 py-3 border border-brand/40 text-brand rounded-lg hover:bg-brand/10 transition font-medium"
          >
            View My Work
          </button>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        className="md:w-1/2 flex justify-center items-center"
      >
        <div className="relative">
          {/* Decorative ring */}
          <div className="absolute inset-0 rounded-full border-2 border-brand/20 scale-110" />
          <div className="absolute inset-0 rounded-full border border-brand/10 scale-125" />
          {showVideo ? (
            <video
              ref={videoRef}
              src={heroVideo}
              muted
              playsInline
              onEnded={() => setShowVideo(false)}
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl shadow-brand/20 border-4 border-brand/30"
            />
          ) : (
            <img
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl shadow-brand/20 border-4 border-brand/30"
              src={heroImage}
              alt="Noriel Fulgencio"
            />
          )}
        </div>
      </motion.div>
      </section>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex justify-center pb-8"
      >
        <div className="flex flex-col items-center gap-1 text-brand/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="w-px h-8 bg-brand/30"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
