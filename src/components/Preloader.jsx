import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import noriAM from '../assets/NorielFulgencio_AboutMe.jpg';
import noriProfile from '../assets/NorielFulgencio.png';
import nori2 from '../assets/NorielFulgencio2.png';
import zentraCRM from '../assets/ZentraCRM.png';
import realtorHQ from '../assets/RealtorHQ.png';
import parkCabins from '../assets/ParkCabins.png';
import saasProjectMgmt from '../assets/SaasProjectManagement.png';
import zonify from '../assets/Zonify.png';
import service1 from '../assets/Services1.png';
import service2 from '../assets/Services2.png';
import service3 from '../assets/Services3.png';
import service3a from '../assets/Services3a.png';
import robertImage from '../assets/RobertHerjavec.png';
import steveImage from '../assets/SteveJobs.jpg';

// All asset images to preload
const IMAGE_ASSETS = [
  noriAM,
  noriProfile,
  nori2,
  zentraCRM,
  realtorHQ,
  parkCabins,
  saasProjectMgmt,
  zonify,
  service1,
  service2,
  service3,
  service3a,
  robertImage,
  steveImage,
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

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loaded = 0;
    const total = IMAGE_ASSETS.length;

    const promises = IMAGE_ASSETS.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => { loaded++; setProgress(Math.round((loaded / total) * 100)); resolve(); };
          img.onerror = () => { loaded++; setProgress(Math.round((loaded / total) * 100)); resolve(); };
          img.src = src;
        })
    );

    Promise.all(promises).then(() => {
      setTimeout(onComplete, 500);
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

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-1 text-sm"
        style={{ color: "rgba(83,105,66,0.55)" }}
      >
        Software Engineer
      </motion.p>

      <div className="mt-10 w-48 h-[2px] relative overflow-hidden" style={{ backgroundColor: "rgba(83,105,66,0.12)" }}>
        <motion.div
          className="absolute left-0 top-0 h-full"
          style={{ background: "linear-gradient(90deg, #7aad5e, #536942)", width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.p
        className="mt-3 text-xs tabular-nums"
        style={{ color: "rgba(83,105,66,0.4)" }}
      >
        {progress}%
      </motion.p>
    </motion.div>
  );
}
