import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroVideo from '../assets/NorielFulgencioHi.mp4';
import noriAM from '../assets/NorielFulgencio_AboutMe.webp';
import noriProfile from '../assets/NorielFulgencio.webp';
import nori2 from '../assets/NorielFulgencio2.webp';
import robertImage from '../assets/RobertHerjavec.webp';
import steveImage from '../assets/SteveJobs.webp';
// Service card images (actually used in Services.jsx and Projects.jsx)
import webdev from '../assets/webdev.webp';
import automation from '../assets/automation.webp';
import softdev from '../assets/softdev.webp';
// Project thumbnails
import zentraCRM from '../assets/ZentraCRM.webp';
import realtorHQ from '../assets/RealtorHQ.webp';
import parkCabins from '../assets/ParkCabins.webp';
import saasProjectMgmt from '../assets/SaasProjectManagement.webp';
import zonify from '../assets/Zonify.webp';
// Project detail images
import project1a from '../assets/Project1a.webp';
import project1b from '../assets/Project1b.webp';
import project1c from '../assets/Project1c.webp';
import project1d from '../assets/Project1d.webp';
import project1e from '../assets/Project1e.webp';
import project1f from '../assets/Project1f.webp';
import project1g from '../assets/Project1g.webp';
import project1h from '../assets/Project1h.webp';
import project1i from '../assets/Project1i.webp';
import project1j from '../assets/Project1j.webp';
import project1k from '../assets/Project1k.webp';
import project2a from '../assets/Project2a.webp';
import project2b from '../assets/Project2b.webp';
import project2c from '../assets/Project2c.webp';
import project2d from '../assets/Project2d.webp';
import project3a from '../assets/Project3a.webp';
import project3b from '../assets/Project3b.webp';
import project3c from '../assets/Project3c.webp';
import project3d from '../assets/Project3d.webp';
import project3e from '../assets/Project3e.webp';
import project3f from '../assets/Project3f.webp';
import project3g from '../assets/Project3g.webp';
import project4a from '../assets/Project4a.webp';
import project4b from '../assets/Project4b.webp';
import project4c from '../assets/Project4c.webp';
import project4d from '../assets/Project4d.webp';
import project4e from '../assets/Project4e.webp';
import project4f from '../assets/Project4f.webp';
import project5a from '../assets/Project5a.webp';
import project5b from '../assets/Project5b.webp';
import project5c from '../assets/Project5c.webp';
import project5d from '../assets/Project5d.webp';
import project5e from '../assets/Project5e.webp';
import project5f from '../assets/Project5f.webp';
import project5g from '../assets/Project5g.webp';
import project5h from '../assets/Project5h.webp';
import project6a from '../assets/Project6a.webp';
import project6b from '../assets/Project6b.webp';
import project6c from '../assets/Project6c.webp';
import project6d from '../assets/Project6d.webp';
import project6e from '../assets/Project6e.webp';
import project6f from '../assets/Project6f.webp';
import project6g from '../assets/Project6g.webp';
import project6h from '../assets/Project6h.webp';

// All asset images to preload
const IMAGE_ASSETS = [
  // Profile & about
  noriAM, noriProfile, nori2,
  // Quotes
  robertImage, steveImage,
  // Service / category cards
  webdev, automation, softdev,
  // Project thumbnails
  zentraCRM, realtorHQ, parkCabins, saasProjectMgmt, zonify,
  // Project detail images
  project1a, project1b, project1c, project1d, project1e, project1f, project1g, project1h, project1i, project1j, project1k,
  project2a, project2b, project2c, project2d,
  project3a, project3b, project3c, project3d, project3e, project3f, project3g,
  project4a, project4b, project4c, project4d, project4e, project4f,
  project5a, project5b, project5c, project5d, project5e, project5f, project5g, project5h,
  project6a, project6b, project6c, project6d, project6e, project6f, project6g, project6h,
];

function preloadVideo(src) {
  return new Promise((resolve) => {
    const vid = document.createElement('video');
    vid.preload = 'auto';
    vid.muted = true;
    vid.playsInline = true;
    const done = () => resolve();
    vid.addEventListener('canplaythrough', done, { once: true });
    vid.addEventListener('error', done, { once: true });
    // Fallback: resolve after 4 seconds even if canplaythrough never fires
    setTimeout(done, 4000);
    vid.src = src;
    vid.load();
  });
}

function preloadImages(urls) {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // resolve even on error so we never hang
          img.src = src;
        })
    )
  );
}

// Loading resource labels shown progressively
const LOADING_STEPS = [
  "Initializing...",
  "Loading assets...",
  "Loading projects...",
  "Loading experience...",
  "Loading services...",
  "Almost there...",
  "Ready.",
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepLabel, setStepLabel] = useState(LOADING_STEPS[0]);

  useEffect(() => {
    let loaded = 0;
    const total = IMAGE_ASSETS.length;

    const promises = IMAGE_ASSETS.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            loaded++;
            const pct = Math.round((loaded / total) * 100);
            setProgress(pct);
            const stepIndex = Math.min(
              Math.floor((pct / 100) * (LOADING_STEPS.length - 1)),
              LOADING_STEPS.length - 1
            );
            setStepLabel(LOADING_STEPS[stepIndex]);
            resolve();
          };
          img.onerror = () => {
            loaded++;
            const pct = Math.round((loaded / total) * 100);
            setProgress(pct);
            resolve();
          };
          img.src = src;
        })
    );

    Promise.all([...promises, preloadVideo(heroVideo)]).then(() => {
      setStepLabel("Ready.");
      setTimeout(onComplete, 600);
    });
  }, [onComplete]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#ffffff" }}
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{ fontFamily: "Forum, serif", fontSize: "28px", color: "#536942", letterSpacing: "-0.5px" }}
      >
        Noriel Fulgencio
      </motion.p>

      <div className="mt-5 w-48 h-[2px] relative overflow-hidden" style={{ backgroundColor: "rgba(83,105,66,0.12)" }}>
        <motion.div
          className="absolute left-0 top-0 h-full"
          style={{ background: "linear-gradient(90deg, #7aad5e, #536942)", width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between w-48">
        <motion.p
          key={stepLabel}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs"
          style={{ color: "rgba(83,105,66,0.55)" }}
        >
          {stepLabel}
        </motion.p>
        <p className="text-xs tabular-nums" style={{ color: "rgba(83,105,66,0.35)" }}>
          {progress}%
        </p>
      </div>
    </motion.div>
  );
}
