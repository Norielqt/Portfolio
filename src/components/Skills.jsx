import React from "react";
import { motion } from "framer-motion";
import {
  SiJavascript, SiReact, SiTailwindcss, SiPython,
  SiHtml5, SiPhp, SiCplusplus, SiGithub, SiMysql,
  SiDotnet, SiLaravel, SiAmazon, SiPostgresql, SiRailway,
} from "react-icons/si";
import { FaJava, FaServer } from "react-icons/fa";

const skillGroups = [
  {
    category: "Languages",
    items: [
      { name: "C#",         icon: <SiDotnet     className="inline-block mr-3 text-green-600  text-4xl" /> },
      { name: "C++",        icon: <SiCplusplus  className="inline-block mr-3 text-blue-600   text-4xl" /> },
      { name: "HTML & CSS", icon: <SiHtml5      className="inline-block mr-3 text-orange-500 text-4xl" /> },
      { name: "Java",       icon: <FaJava       className="inline-block mr-3 text-red-600    text-4xl" /> },
      { name: "JavaScript", icon: <SiJavascript className="inline-block mr-3 text-yellow-400 text-4xl" /> },
      { name: "PHP",        icon: <SiPhp        className="inline-block mr-3 text-purple-600 text-4xl" /> },
      { name: "Python",     icon: <SiPython     className="inline-block mr-3 text-yellow-600 text-4xl" /> },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "Laravel",      icon: <SiLaravel     className="inline-block mr-3 text-red-500  text-4xl" /> },
      { name: "React",        icon: <SiReact       className="inline-block mr-3 text-blue-500 text-4xl" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="inline-block mr-3 text-teal-400 text-4xl" /> },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "AWS",          icon: <SiAmazon      className="inline-block mr-3 text-orange-400 text-4xl" /> },
      { name: "Git & GitHub", icon: <SiGithub      className="inline-block mr-3 text-gray-800 dark:text-white text-4xl" /> },
      { name: "MySQL",        icon: <SiMysql       className="inline-block mr-3 text-blue-700  text-4xl" /> },
      { name: "PostgreSQL",   icon: <SiPostgresql  className="inline-block mr-3 text-sky-600   text-4xl" /> },
      { name: "Railway",      icon: <SiRailway     className="inline-block mr-3 text-violet-500 text-4xl" /> },
      { name: "REST APIs",    icon: <FaServer      className="inline-block mr-3 text-indigo-500 text-4xl" /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-semibold mb-10 border-b-4 inline-block border-blue-500">
          Skills
        </h3>

        <div className="space-y-10">
          {skillGroups.map(({ category, items }) => (
            <div key={category}>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-4">{category}</h4>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
                {items.map(({ name, icon }) => {
                  return (
                    <motion.li
                      key={name}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="bg-gray-100 dark:bg-gray-800 rounded-xl py-3 px-4 shadow-sm flex items-center"
                    >
                      {icon}
                      <span className="text-base font-medium">{name}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
