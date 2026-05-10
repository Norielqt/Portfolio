import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroVideo from '../assets/NorielFulgencioHi.mp4';
import heroImage from '../assets/NorielFulgencio.png';

const Hero = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(true);
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);

  useEffect(() => {
    // Play whichever video ref is currently mounted
    if (mobileVideoRef.current) mobileVideoRef.current.play().catch(() => {});
    if (desktopVideoRef.current) desktopVideoRef.current.play().catch(() => {});
  }, []);

  return (
    <div style={{
      background: "radial-gradient(ellipse at 30% 60%, #ddebd3 0%, #f6f8f5 50%, #f0f4ec 100%)",
    }}>
      {/* MOBILE layout: photo → text → buttons */}
      <section className="flex flex-col md:hidden items-center px-6 pt-24 pb-12 gap-y-6">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex justify-center items-center"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-2 border-brand/20 scale-110" />
            <div className="absolute inset-0 rounded-full border border-brand/10 scale-125" />
            {showVideo ? (
              <video
                ref={mobileVideoRef}
                src={heroVideo}
                muted
                autoPlay
                playsInline
                aria-label="Noriel Fulgencio waving hello"
                onEnded={() => setShowVideo(false)}
                className="w-44 h-44 object-cover rounded-full shadow-2xl shadow-brand/20 border-4 border-brand/30"
              />
            ) : (
              <img
                className="w-44 h-44 object-cover rounded-full shadow-2xl shadow-brand/20 border-4 border-brand/30"
                src={heroImage}
                alt="Portrait of Noriel Fulgencio, Software Engineer and Automation Specialist from the Philippines"
                loading="eager"
              />
            )}
          </div>
        </motion.div>

        {/* Text below photo on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-extrabold text-brand-800 leading-[1.05] tracking-tight">
            Noriel Fulgencio
          </h1>
          <p className="text-lg font-medium text-brand !mt-1">
            Software Engineer &amp; Automation Specialist
          </p>
          <p className="text-sm text-brand-700/70 leading-relaxed">
            I build full-stack web apps with React and Laravel and automate workflows for businesses — based in the Philippines, open to freelance and remote work.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-1">
            <a
              href="/NorielFulgencio_CV.pdf"
              download
              className="inline-flex items-center px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-700 transition font-medium shadow-md shadow-brand/20 text-sm"
            >
              Download CV
            </a>
            <button
              onClick={() => navigate('/projects')}
              className="inline-flex items-center px-6 py-3 border border-brand/40 text-brand rounded-lg hover:bg-brand/10 transition font-medium text-sm"
            >
              View My Work
            </button>
          </div>
        </motion.div>
      </section>

      {/* DESKTOP layout: text left, photo right */}
      <section className="hidden md:flex flex-row items-center justify-between px-7 max-w-6xl mx-auto gap-x-20 min-h-screen">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-left md:w-1/2 space-y-5"
      >
        <p className="text-sm font-semibold tracking-[0.2em] uppercase text-brand/60">
          Welcome to my portfolio
        </p>
        <h1 className="text-6xl font-extrabold text-brand-800 leading-[1.05] tracking-tight">
          Hi, I'm<br />Noriel Fulgencio
        </h1>
        <p className="text-2xl font-medium text-brand">
          Software Engineer &amp; Automation Specialist
        </p>
        <p className="text-lg text-brand-700/70 max-w-md leading-relaxed">
          I build full-stack web apps with React and Laravel and automate workflows for businesses — based in the Philippines, open to freelance and remote work.
        </p>
        <div className="flex flex-wrap gap-3 justify-start pt-2">
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
          <div className="absolute inset-0 rounded-full border-2 border-brand/20 scale-110" />
          <div className="absolute inset-0 rounded-full border border-brand/10 scale-125" />
          {showVideo ? (
            <video
              ref={desktopVideoRef}
              src={heroVideo}
              muted
              autoPlay
              playsInline
              aria-label="Noriel Fulgencio waving hello"
              onEnded={() => setShowVideo(false)}
              className="w-80 h-80 object-cover rounded-full shadow-2xl shadow-brand/20 border-4 border-brand/30"
            />
          ) : (
            <img
              className="w-80 h-80 object-cover rounded-full shadow-2xl shadow-brand/20 border-4 border-brand/30"
              src={heroImage}
              alt="Portrait of Noriel Fulgencio, Software Engineer and Automation Specialist from the Philippines"
              loading="eager"
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
