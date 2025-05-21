import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaLaptopCode, FaUniversity } from "react-icons/fa";

const timeline = [
  {
    date: "June 2025",
    icon: <FaGraduationCap />,
    description:
      "Graduated Magna Cum Laude with a Bachelor of Science in Information Technology from West Visayas State University.",
  },
  {
    date: "May 2025",
    icon: <FaLaptopCode />,
    description: "Completed internship at Meralco PowerGen - IT Department.",
  },
  {
    date: "February 2025",
    icon: <FaLaptopCode />,
    description: "Started internship at Meralco PowerGen - IT Department.",
  },
  {
    date: "August 2021",
    icon: <FaUniversity />,
    description:
      "Started pursuing a Bachelor of Science in Information Technology at West Visayas State University.",
  },
];

const About = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white" id="about">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-6 border-b-4 inline-block border-blue-500">About Me</h2>

        <p className="mb-10 text-lg leading-relaxed max-w-4xl">
          I am a passionate software engineer specializing in building efficient, scalable, and user-friendly web applications.
          I enjoy solving complex problems and continuously learning new technologies to improve my craft.
        </p>

        <div className="relative border-l-4 border-blue-500 ml-4 pl-6">
          {timeline.map((item, index) => (
            <div key={index} className="mb-10">
              <div className="flex items-center mb-2">
                <div className="text-blue-500 mr-3 text-xl">{item.icon}</div>
                <h4 className="text-xl font-semibold">{item.date}</h4>
              </div>
              <p className="text-md text-gray-700 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
