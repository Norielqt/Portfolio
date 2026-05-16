import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroVideo from '../assets/NorielFulgencioHi.mp4';
import heroImage from '../assets/NorielFulgencio.webp';

const Hero = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(true);
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);

  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 600], [0, -70]);

  useEffect(() => {
    // Play whichever video ref is currently mounted
    if (mobileVideoRef.current) mobileVideoRef.current.play().catch(() => {});
    if (desktopVideoRef.current) desktopVideoRef.current.play().catch(() => {});
  }, []);

  return (
    <div style={{
      background: "radial-gradient(ellipse at 30% 60%, #ddebd3 0%, #f6f8f5 50%, #f0f4ec 100%)",
    }}>
      {/* MOBILE layout */}
      <section className="flex flex-col md:hidden items-center justify-center px-6 pb-16 min-h-screen" style={{ paddingTop: "64px" }}>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
          className="relative mb-7"
        >
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
              className="w-36 h-36 object-cover rounded-full shadow-2xl shadow-brand/20 border-4 border-brand/30"
            />
          ) : (
            <img
              className="w-36 h-36 object-cover rounded-full shadow-2xl shadow-brand/20 border-4 border-brand/30"
              src={heroImage}
              alt="Portrait of Noriel Fulgencio, Software Engineer and Automation Specialist from the Philippines"
              loading="eager"
            />
          )}
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="text-center"
        >
          <h1
            className="font-extrabold text-brand-800 leading-[1.05] tracking-tight mb-2"
            style={{ fontSize: "clamp(28px, 8vw, 40px)" }}
          >
            Noriel Fulgencio
          </h1>
          <p className="text-base font-medium text-brand mb-4">
            Software Engineer &amp; Automation Specialist
          </p>
          <div className="w-10 h-px bg-brand/30 mx-auto mb-4" />
          <p className="text-sm text-brand-700/60 leading-relaxed max-w-xs mx-auto">
            Building web apps and automations for businesses — based in the Philippines, open to freelance and remote work.
          </p>
          <div className="flex gap-3 justify-center mt-7">
            <a
              href="/NorielFulgencio_CV.pdf"
              download
              className="inline-flex items-center px-5 py-2.5 bg-brand text-white rounded-lg hover:bg-brand-700 transition font-medium shadow-md shadow-brand/20 text-sm"
            >
              Download CV
            </a>
            <button
              onClick={() => navigate('/projects')}
              className="inline-flex items-center px-5 py-2.5 border border-brand/40 text-brand rounded-lg hover:bg-brand/10 transition font-medium text-sm"
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
        style={{ y: heroImageY }}
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
