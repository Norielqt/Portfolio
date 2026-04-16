import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// All public assets to preload
const IMAGE_ASSETS = [
  "/NorielFulgencio_AboutMe.jpg",
  "/NorielFulgencio.png",
  "/NorielFulgencio2.png",
  "/ZentraCRM.png",
  "/RealtorHQ.png",
  "/ParkCabins.png",
  "/SaasProjectManagement.png",
  "/Zonify.png",
  "/Services1.png",
  "/Services2.png",
  "/Services3.png",
  "/Services3a.png",
  "/RobertHerjavec.png",
  "/SteveJobs.jpg",
  "/Project1a.png", "/Project1b.png", "/Project1c.png", "/Project1d.png",
  "/Project1e.png", "/Project1f.png", "/Project1g.png", "/Project1h.png",
  "/Project1i.png", "/Project1j.png", "/Project1k.png",
  "/Project2a.png", "/Project2b.png", "/Project2c.png", "/Project2d.png",
  "/Project3a.png", "/Project3b.png", "/Project3c.png", "/Project3d.png",
  "/Project3e.png", "/Project3f.png", "/Project3g.png",
  "/Project4a.png", "/Project4b.png", "/Project4c.png", "/Project4d.png",
  "/Project4e.png", "/Project4f.png",
  "/Project5a.png", "/Project5b.png", "/Project5c.png", "/Project5d.png",
  "/Project5e.png", "/Project5f.png", "/Project5g.png", "/Project5h.png",
  "/Project6a.png", "/Project6b.png", "/Project6c.png", "/Project6d.png",
  "/Project6e.png", "/Project6f.png", "/Project6g.png", "/Project6h.png",
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
