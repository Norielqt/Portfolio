import React, { useEffect } from "react";
import { motion } from "framer-motion";

// Preloader shows a brief brand moment (max 1 second) then hands off.
// Heavy preloading (all project images + video) was removed because:
// - Project images are now lazy-loaded via route code splitting
// - The video preload had a 4s fallback timeout that destroyed LCP
// - Browsers handle progressive image/video loading natively

export default function Preloader({ onComplete }) {
  useEffect(() => {
    // Preload only the two above-the-fold images while showing brand moment
    const critical = [
      '/static/media/NorielFulgencio.webp',
      '/static/media/NorielFulgencio_AboutMe.webp',
    ];
    critical.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Cap total preloader time at 1 second regardless of network
    const timer = setTimeout(onComplete, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: "#ffffff" }}
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ fontFamily: "Forum, serif", fontSize: "28px", color: "#536942", letterSpacing: "-0.5px" }}
      >
        Noriel Fulgencio
      </motion.p>

      <motion.div
        className="mt-5 h-[2px]"
        style={{ background: "linear-gradient(90deg, #7aad5e, #536942)" }}
        initial={{ width: 0 }}
        animate={{ width: 192 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </motion.div>
  );
}

