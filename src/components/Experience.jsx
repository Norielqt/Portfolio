import React from "react";
import { motion } from "framer-motion";
import steveImage from '../assets/SteveJobs.jpg';

const timeline = [
  {
    title: "Software Engineer",
    company: "Park Cabins",
    date: "June 2025 – March 2026",
  },
  {
    title: "Graduated as Magna Cum Laude",
    company: "West Visayas State University",
    date: "May 2025",
  },
  {
    title: "Internship",
    company: "Meralco PowerGen",
    date: "February 2025",
  },
  {
    title: "BS in Information Technology",
    company: "West Visayas State University",
    date: "August 2021",
  },
  {
    title: "Hello World",
    company: "Wrote my first line of code.",
    date: "August 2019",
  },
];

const Experience = () => {
  return (
    <>
      <div style={{ backgroundColor: "#f6f8f5" }} className="pt-24 pb-16 px-4 min-h-[40vh] flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <h1 style={{ fontFamily: "DM Sans, sans-serif", fontSize: "76px", letterSpacing: "-3px" }} className="text-brand font-extrabold text-center">
            My Journey
          </h1>
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
          {/* Center vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-brand hidden md:block" />

          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            const card = (
              <div className={`border border-gray-200 dark:border-gray-700 p-3 w-full ${isLeft ? "text-right" : "text-left"}`} style={{ backgroundColor: "#f6f8f5" }}>
                <h4 style={{ fontSize: "21px" }} className="font-normal">{item.title}</h4>
                <p style={{ fontSize: "16px" }} className="text-brand font-normal">{item.company}</p>
                <p style={{ fontSize: "14px" }} className="text-gray-500 dark:text-gray-400 mt-1">{item.date}</p>
                {item.description && <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">{item.description}</p>}
              </div>
            );

            return (
              <motion.div
                key={index}
                className="relative flex items-start mb-8"
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
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 z-10 w-4 h-4 rounded-full bg-brand shrink-0" />

                {/* Right slot */}
                <div className="hidden md:flex w-1/2 pl-10">
                  {!isLeft && card}
                </div>

                {/* Mobile: stacked */}
                <div className="flex md:hidden w-full pl-5 border-l-4 border-brand">
                  <div className="w-full">
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-brand font-semibold text-sm mt-0.5">{item.company}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-2">{item.date}</p>
                    {item.description && <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>}
                  </div>
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
