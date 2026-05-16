import React from "react";
import { motion } from "framer-motion";
import steveImage from '../assets/SteveJobs.webp';
import { FaBriefcase, FaGraduationCap, FaCode } from "react-icons/fa";

const timeline = [
  {
    title: "Freelancer",
    company: "Self-employed",
    date: "March 2026 – Present",
    type: "work",
  },
  {
    title: "Software Engineer",
    company: "Park Cabins",
    date: "June 2025 – March 2026",
    type: "work",
  },
  {
    title: "Graduated as Magna Cum Laude",
    company: "West Visayas State University",
    date: "May 2025",
    type: "education",
  },
  {
    title: "Internship",
    company: "Meralco PowerGen",
    date: "February 2025",
    type: "work",
  },
  {
    title: "BS in Information Technology",
    company: "West Visayas State University",
    date: "August 2021",
    type: "education",
  },
  {
    title: "Hello World",
    company: "Wrote my first line of code.",
    date: "August 2019",
    type: "milestone",
  },
];

const Experience = () => {
  return (
    <>
      <div
        style={{ background: "#FFFFFF" }}
        className="pt-20 md:pt-32 pb-10 md:pb-16 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl mx-auto w-full text-center"
        >
          <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-brand/60 mb-3">
            Timeline
          </p>
          <h1
            style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "clamp(-1px, -0.2vw, -2px)", fontSize: "clamp(24px, 4vw, 42px)" }}
            className="text-brand-800 font-extrabold"
          >
            My Journey
          </h1>
          <p className="mt-4 text-brand-700/70 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            A look back at the experiences, education, and milestones that shaped me into the engineer I am today.
          </p>
        </motion.div>
      </div>
      <section className="pt-8 pb-16 px-4 max-w-3xl mx-auto" id="experience">
        <div className="relative">
          {/* Vertical rail - slightly left of center */}
          <div className="absolute top-0 bottom-0 w-px" style={{ left: "38%", background: "linear-gradient(to bottom, #111111 80%, transparent)", opacity: 0.12 }} />

          {timeline.map((item, index) => {
            const getIcon = () => {
              if (item.type === "work") return <FaBriefcase size={14} />;
              if (item.type === "education") return <FaGraduationCap size={14} />;
              return <FaCode size={14} />;
            };

            return (
              <motion.div
                key={index}
                className="relative flex pb-10"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                {/* Icon dot */}
                <div
                  className="absolute w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-white z-10 shadow-sm"
                  style={{ left: "calc(38% - 20px)", marginTop: "2px" }}
                >
                  {getIcon()}
                </div>

                {/* Content — right of dot */}
                <div className="flex-1 pt-1.5" style={{ marginLeft: "calc(38% + 56px)" }}>
                  <p style={{ fontSize: "12px", color: "#11111166", letterSpacing: "0.06em", textTransform: "uppercase" }} className="font-medium mb-1">{item.date}</p>
                  <h4 style={{ fontFamily: "DM Sans, sans-serif", fontSize: "18px", fontWeight: 700, color: "#111111", letterSpacing: "-0.3px" }} className="leading-snug mb-0.5">{item.title}</h4>
                  <p style={{ fontSize: "14px", color: "#555555" }} className="font-medium">{item.company}</p>
                  {item.description && <p style={{ fontSize: "13px", color: "#888888" }} className="mt-1 leading-relaxed">{item.description}</p>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

    <section style={{ backgroundColor: "#FAFAFA" }} className="w-full py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center"
      >
        {/* Quote mark */}
        <span className="text-8xl leading-none select-none" style={{ fontFamily: "Forum, serif", color: "#D4D4D4" }}>&ldquo;</span>

        {/* Quote text */}
        <h4
          className="text-2xl md:text-3xl mt-2 mb-10 max-w-2xl"
          style={{ fontFamily: "Forum, serif", color: "#111111" }}
        >
          The only way to do great work is to love what you do
        </h4>

        {/* Avatar circle */}
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 mb-3" style={{ borderColor: "#D4D4D4" }}>
          <img
            src={steveImage}
            alt="Steve Jobs"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        {/* Name */}
        <p style={{ fontSize: 14, color: "#737373" }}>Steve Jobs</p>
      </motion.div>
    </section>
    </>
  );
};

export default Experience;
