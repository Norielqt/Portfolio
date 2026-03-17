import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaLaptopCode, FaUniversity, FaBriefcase } from "react-icons/fa";

const academicTimeline = [
  {
    date: "May 2025",
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

const professionalTimeline = [
  {
    date: "June 2025 – March 2026",
    icon: <FaBriefcase />,
    description:
      "Worked as a Software Engineer, developing and maintaining the Park Cabins CRM — a full-stack web application for managing customer relationships, bookings, and operational workflows for cabin accommodations.",
  },
];

const TimelineList = ({ items }) => (
  <div className="relative border-l-4 border-blue-500 ml-4 pl-6">
    {items.map((item, index) => (
      <div key={index} className="mb-10">
        <div className="flex items-center mb-2">
          <div className="text-blue-500 mr-3 text-xl">{item.icon}</div>
          <h4 className="text-xl font-semibold">{item.date}</h4>
        </div>
        <p className="text-md text-gray-700 dark:text-gray-300">{item.description}</p>
      </div>
    ))}
  </div>
);

const Experience = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white" id="experience">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-6 border-b-4 inline-block border-blue-500">Experience</h2>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-blue-500">Professional Experience</h3>
          <TimelineList items={professionalTimeline} />
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-blue-500">Academic Experience</h3>
          <TimelineList items={academicTimeline} />
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
