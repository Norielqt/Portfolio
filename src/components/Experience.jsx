import React from "react";
import { motion } from "framer-motion";
import steveImage from '../assets/SteveJobs.jpg';
import { FaBriefcase, FaGraduationCap, FaCode } from "react-icons/fa";

const timeline = [
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
        style={{ background: "radial-gradient(ellipse at 30% 60%, #ddebd3 0%, #f6f8f5 50%, #f0f4ec 100%)" }}
        className="pt-32 pb-16 px-4"
      >
        <div className="max-w-6xl mx-auto w-full text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-brand/60 mb-4">
            Timeline
          </p>
          <h1
            style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "-3px" }}
            className="text-brand-800 font-extrabold text-5xl md:text-7xl"
          >
            My Journey
          </h1>
          <p className="mt-6 text-brand-700/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A look back at the experiences, education, and milestones that shaped me into the engineer I am today.
          </p>
        </div>
      </div>
      <section className="pt-24 pb-16 px-4 max-w-5xl mx-auto text-brand dark:text-white" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >

        <div className="relative max-w-4xl mx-auto">
          {/* Center vertical line — more prominent */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand/0 via-brand/80 to-brand/0 hidden md:block" />

          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            const getIcon = () => {
              if (item.type === "work") return <FaBriefcase />;
              if (item.type === "education") return <FaGraduationCap />;
              return <FaCode />;
            };
            const getColors = () => {
              if (item.type === "work") return { bg: "bg-brand/5 dark:bg-brand/10", border: "border-brand/20 dark:border-brand/30", dot: "bg-brand", icon: "text-brand" };
              if (item.type === "education") return { bg: "bg-brand/8 dark:bg-brand/12", border: "border-brand/25 dark:border-brand/35", dot: "bg-brand-700", icon: "text-brand-700" };
              return { bg: "bg-brand/6 dark:bg-brand/11", border: "border-brand/22 dark:border-brand/32", dot: "bg-brand-600", icon: "text-brand-600" };
            };
            const colors = getColors();
            const card = (
              <motion.div 
                className={`border ${colors.border} rounded-2xl p-6 w-full ${isLeft ? "text-right" : "text-left"} ${colors.bg} backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`flex items-start gap-3 mb-3 ${isLeft ? "justify-end" : "justify-start"}`}>
                  <div className={`text-lg ${colors.icon} ${isLeft ? "order-last" : ""}`}>
                    {getIcon()}
                  </div>
                  <h4 style={{ fontSize: "18px", letterSpacing: "0.01em" }} className="font-bold text-brand-800 leading-tight">{item.title}</h4>
                </div>
                <p style={{ fontSize: "14px" }} className="text-brand-700/80 font-semibold mb-1">{item.company}</p>
                <p style={{ fontSize: "13px" }} className="text-brand-600/60">{item.date}</p>
                {item.description && <p className="text-brand-700/70 text-xs mt-2">{item.description}</p>}
              </motion.div>
            );

            return (
              <motion.div
                key={index}
                className="relative flex items-start mb-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Left slot */}
                <div className="hidden md:flex w-1/2 justify-end pr-10">
                  {isLeft && card}
                </div>

                {/* Center dot — absolutely positioned on the line */}
                <motion.div 
                  className={`hidden md:block absolute left-1/2 -translate-x-1/2 top-6 z-10 w-5 h-5 rounded-full ${colors.dot} shrink-0 shadow-lg ring-4 ring-white dark:ring-gray-900`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                />

                {/* Right slot */}
                <div className="hidden md:flex w-1/2 pl-10">
                  {!isLeft && card}
                </div>

                {/* Mobile: stacked */}
                <div className="flex md:hidden w-full">
                  <motion.div 
                    className={`border-l-4 ${colors.border} pl-5 w-full`}
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className={`flex items-center gap-2 mb-2 ${colors.bg} rounded-lg p-3 ${colors.border}`}>
                      <div className={`text-lg ${colors.icon}`}>
                        {getIcon()}
                      </div>
                      <h4 className="font-bold text-brand-800 text-base">{item.title}</h4>
                    </div>
                    <p className="text-brand-700/80 font-semibold text-sm mb-1">{item.company}</p>
                    <p className="text-xs text-brand-600/60">{item.date}</p>
                    {item.description && <p className="text-brand-700/70 text-sm mt-2">{item.description}</p>}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>

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
          The only way to do great work is to love what you do
        </h4>

        {/* Avatar circle */}
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 mb-3" style={{ borderColor: "#536942" }}>
          <img
            src={steveImage}
            alt="Steve Jobs"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        {/* Name */}
        <p style={{ fontSize: 14, color: "#536942" }}>Steve Jobs</p>
      </motion.div>
    </section>
    </>
  );
};

export default Experience;
