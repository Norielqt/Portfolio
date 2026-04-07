import React from "react";
import { motion } from "framer-motion";

const timeline = [
  {
    title: "Software Engineer",
    company: "Park Cabins",
    date: "June 2025 – March 2026",
    description:
      "Developed and maintained a full-stack CRM for managing customer relationships, bookings, and operational workflows for cabin accommodations.",
  },
  {
    title: "Graduated Magna Cum Laude",
    company: "West Visayas State University",
    date: "May 2025",
    description:
      "Earned a Bachelor of Science in Information Technology, graduating Magna Cum Laude with Best Thesis.",
  },
  {
    title: "Internship",
    company: "Meralco PowerGen",
    date: "February – May 2025",
    description:
      "Completed a 3-month internship at the IT Department, gaining exposure to enterprise systems and IT operations.",
  },
  {
    title: "Started University",
    company: "West Visayas State University",
    date: "August 2021",
    description:
      "Began pursuing a Bachelor of Science in Information Technology.",
  },
];

const Experience = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-12">My Career Timeline</h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Center vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-500 hidden md:block" />

          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            const card = (
              <div className={`bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 w-full ${isLeft ? "text-right" : "text-left"}`}>
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-blue-500 font-semibold text-sm mt-0.5">{item.company}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-2">{item.date}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
              </div>
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
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 z-10 w-4 h-4 rounded-full bg-blue-500 shrink-0" />

                {/* Right slot */}
                <div className="hidden md:flex w-1/2 pl-10">
                  {!isLeft && card}
                </div>

                {/* Mobile: stacked */}
                <div className="flex md:hidden w-full pl-5 border-l-4 border-blue-500">
                  <div className="w-full">
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-blue-500 font-semibold text-sm mt-0.5">{item.company}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-2">{item.date}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
