import React from "react";
import { motion } from "framer-motion";

const QuoteBanner = () => {
  return (
    <section style={{ backgroundColor: "#f6f8f5" }} className="w-full py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center"
      >
        {/* Quote mark */}
        <span className="text-8xl leading-none select-none" style={{ fontFamily: "Forum, serif", color: "#536942" }}>&ldquo;</span>

        {/* Quote text */}
        <h4
          className="text-2xl md:text-3xl mt-2 mb-10 max-w-2xl"
          style={{ fontFamily: "Forum, serif", color: "#536942" }}
        >
          Good software, like wine, takes time
        </h4>

        {/* Avatar circle */}
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 mb-3" style={{ borderColor: "#536942" }}>
          <img
            src="/JoelSpolsky.jpg"
            alt="Joel Spolsky"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        {/* Name */}
        <p style={{ fontSize: 14, color: "#536942" }}>Joel Spolsky</p>
      </motion.div>
    </section>
  );
};

export default QuoteBanner;
