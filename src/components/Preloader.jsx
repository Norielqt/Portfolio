import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import noriAM from '../assets/NorielFulgencio_AboutMe.jpg';
import noriProfile from '../assets/NorielFulgencio.png';
import nori2 from '../assets/NorielFulgencio2.png';
import robertImage from '../assets/RobertHerjavec.png';
import steveImage from '../assets/SteveJobs.jpg';
// Service card images (actually used in Services.jsx and Projects.jsx)
import webdev from '../assets/webdev.png';
import automation from '../assets/automation.png';
import softdev from '../assets/softdev.png';
// Project thumbnails
import zentraCRM from '../assets/ZentraCRM.png';
import realtorHQ from '../assets/RealtorHQ.png';
import parkCabins from '../assets/ParkCabins.png';
import saasProjectMgmt from '../assets/SaasProjectManagement.png';
import zonify from '../assets/Zonify.png';
// Project detail images
import project1a from '../assets/Project1a.png';
import project1b from '../assets/Project1b.png';
import project1c from '../assets/Project1c.png';
import project1d from '../assets/Project1d.png';
import project1e from '../assets/Project1e.png';
import project1f from '../assets/Project1f.png';
import project1g from '../assets/Project1g.png';
import project1h from '../assets/Project1h.png';
import project1i from '../assets/Project1i.png';
import project1j from '../assets/Project1j.png';
import project1k from '../assets/Project1k.png';
import project2a from '../assets/Project2a.png';
import project2b from '../assets/Project2b.png';
import project2c from '../assets/Project2c.png';
import project2d from '../assets/Project2d.png';
import project3a from '../assets/Project3a.png';
import project3b from '../assets/Project3b.png';
import project3c from '../assets/Project3c.png';
import project3d from '../assets/Project3d.png';
import project3e from '../assets/Project3e.png';
import project3f from '../assets/Project3f.png';
import project3g from '../assets/Project3g.png';
import project4a from '../assets/Project4a.png';
import project4b from '../assets/Project4b.png';
import project4c from '../assets/Project4c.png';
import project4d from '../assets/Project4d.png';
import project4e from '../assets/Project4e.png';
import project4f from '../assets/Project4f.png';
import project5a from '../assets/Project5a.png';
import project5b from '../assets/Project5b.png';
import project5c from '../assets/Project5c.png';
import project5d from '../assets/Project5d.png';
import project5e from '../assets/Project5e.png';
import project5f from '../assets/Project5f.png';
import project5g from '../assets/Project5g.png';
import project5h from '../assets/Project5h.png';
import project6a from '../assets/Project6a.png';
import project6b from '../assets/Project6b.png';
import project6c from '../assets/Project6c.png';
import project6d from '../assets/Project6d.png';
import project6e from '../assets/Project6e.png';
import project6f from '../assets/Project6f.png';
import project6g from '../assets/Project6g.png';
import project6h from '../assets/Project6h.png';

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

    Promise.all(promises).then(() => {
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
