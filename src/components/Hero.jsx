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

  useEffect(() => {
    // Play whichever video ref is currently mounted
    if (mobileVideoRef.current) mobileVideoRef.current.play().catch(() => {});
    if (desktopVideoRef.current) desktopVideoRef.current.play().catch(() => {});
  }, []);

  return (
    <div style={{
      background: "#FFFFFF",
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
          {showVideo ? (
            <video
              ref={mobileVideoRef}
              src={heroVideo}
              muted
              autoPlay
              playsInline
              aria-label="Noriel Fulgencio waving hello"
              onEnded={() => setShowVideo(false)}
              className="w-36 h-36 object-cover object-top rounded-full"
            />
          ) : (
            <img
              className="w-36 h-36 object-cover object-top rounded-full"
              src={heroImage}
              alt="Portrait of Noriel Fulgencio, Software Engineer and Automation Specialist from the Philippines"
              loading="eager"
            />
          )}
          {/* Dark ring */}
          <div className="absolute inset-0 rounded-full ring-1 ring-black/15" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="text-center"
        >
          <p style={{ fontSize: "14px", color: "#11111199", textTransform: "uppercase", letterSpacing: "0.08em" }} className="font-medium mb-1">Welcome to my portfolio</p>
          <h1
            className="font-extrabold text-brand-800 leading-[1.05] tracking-tight mb-2"
            style={{ fontSize: "clamp(28px, 8vw, 40px)", fontFamily: "Forum, serif", fontWeight: 400 }}
          >
            Noriel Fulgencio
          </h1>
          <p className="text-base font-medium text-brand-600 mb-4">
            Software Engineer &amp; Automation Specialist
          </p>
          <p className="text-sm text-brand-500 leading-relaxed max-w-xs mx-auto">
            Building web apps and automations for businesses — based in the Philippines, open to freelance and remote work.
          </p>
          <div className="flex gap-3 justify-center mt-7">
            <a
              href="/NorielFulgencio_CV.pdf"
              download
              className="inline-flex items-center px-5 py-2.5 bg-black text-white hover:bg-black/85 transition text-sm font-medium tracking-wide"
            >
              Download CV →
            </a>
            <button
              onClick={() => navigate('/projects')}
              className="inline-flex items-center px-5 py-2.5 border border-black/20 text-black hover:border-black hover:bg-black hover:text-white transition text-sm font-medium tracking-wide"
            >
              View My Work
            </button>
          </div>
        </motion.div>
      </section>

      {/* DESKTOP layout: text left, circle photo right */}
      <section className="hidden md:flex flex-row items-center justify-between px-8 max-w-5xl mx-auto gap-x-16 min-h-screen">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex-1 space-y-7"
        >
          <p style={{ fontSize: "14px", color: "#11111199", textTransform: "uppercase", letterSpacing: "0.08em" }} className="font-medium mb-1">Welcome to my portfolio</p>
          <h1
            style={{ fontFamily: "Forum, serif", letterSpacing: "-0.02em", lineHeight: "0.92", fontSize: "clamp(56px, 7vw, 96px)", fontWeight: 400 }}
            className="text-black"
          >
            Noriel<br />Fulgencio.
          </h1>

          <p className="text-xl font-light text-black/70">
            Software Engineer &amp; Automation Specialist
          </p>

          <p className="text-base text-black/50 max-w-md leading-relaxed">
            I build full-stack web apps with React and Laravel and automate workflows for businesses — based in the Philippines, open to freelance and remote work.
          </p>

          <div className="flex gap-3 pt-2">
            <a
              href="/NorielFulgencio_CV.pdf"
              download
              className="inline-flex items-center px-7 py-3 bg-black text-white hover:bg-black/85 transition text-sm font-medium tracking-wide"
            >
              Download CV →
            </a>
            <button
              onClick={() => navigate('/projects')}
              className="inline-flex items-center px-7 py-3 border border-black/20 text-black hover:border-black hover:bg-black hover:text-white transition text-sm font-medium tracking-wide"
            >
              View My Work
            </button>
          </div>
        </motion.div>

        {/* Circle photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="shrink-0"
        >
          <div
            className="w-72 h-72 rounded-full overflow-hidden shadow-lg shadow-black/10"
            style={{ background: "#EBEBEB" }}
          >
            {showVideo ? (
              <video
                ref={desktopVideoRef}
                src={heroVideo}
                muted
                autoPlay
                playsInline
                aria-label="Noriel Fulgencio waving hello"
                onEnded={() => setShowVideo(false)}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <img
                src={heroImage}
                alt="Portrait of Noriel Fulgencio, Software Engineer and Automation Specialist from the Philippines"
                className="w-full h-full object-cover object-top"
                loading="eager"
              />
            )}
          </div>
        </motion.div>
      </section>

      {/* Scroll cue */}
    </div>
  );
};

export default Hero;


