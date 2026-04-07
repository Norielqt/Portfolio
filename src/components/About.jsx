import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaPlug, FaDatabase, FaWrench } from "react-icons/fa";

const services = [
  {
    icon: <FaCode className="text-3xl text-blue-500" />,
    title: "Web Application Development",
    items: [
      "Build custom web apps tailored to your workflow",
      "React + Laravel stack for fast, maintainable, and scalable results",
    ],
  },
  {
    icon: <FaPlug className="text-3xl text-blue-500" />,
    title: "REST API Development",
    items: [
      "Design and build APIs that are clean, well-structured, and easy to work with",
      "Authentication, role-based access, and endpoint documentation included",
    ],
  },
  {
    icon: <FaDatabase className="text-3xl text-blue-500" />,
    title: "Database Design",
    items: [
      "Structure your data properly from the start so it doesn't become a mess later",
      "MySQL schema design for relational, multi-role, or business-critical systems",
    ],
  },
  {
    icon: <FaWrench className="text-3xl text-blue-500" />,
    title: "Bug Fixes & Feature Additions",
    items: [
      "Jump into an existing codebase and get things working without breaking what's already there",
    ],
  },
];

const About = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white" id="about">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-6">About Me</h2>

        <p className="mb-4 text-lg leading-relaxed max-w-4xl">
          Hi, I'm Noriel Fulgencio, a software engineer from the Philippines. I recently finished my first professional role where I built and maintained a production CRM from the ground up, and I'm currently freelancing while looking for my next full-time opportunity.
        </p>
        <p className="mb-10 text-lg leading-relaxed max-w-4xl">
          I graduated Magna Cum Laude in Information Technology from West Visayas State University in 2025, and my thesis took Best Thesis that same year. I work across the full stack but lean toward the backend: figuring out how data should be structured, building APIs that don't fall apart, and making sure the logic holds up when real people actually use the system.
        </p>

        <div className="mb-10 max-w-4xl">
          <h3 className="text-2xl font-bold mb-6 text-blue-500">Services I Offer</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-3">{item.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-md">
                  {item.items.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
