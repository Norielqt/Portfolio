import React from "react";
import { motion } from "framer-motion";
import aboutImage from '../assets/NorielFulgencio_AboutMe.jpg';
import {
  SiJavascript, SiReact, SiTailwindcss, SiPython,
  SiHtml5, SiPhp, SiCplusplus, SiGithub, SiMysql,
  SiDotnet, SiLaravel, SiAmazon, SiPostgresql, SiRailway,
  SiWordpress, SiShopify, SiWebflow, SiWix, SiSquarespace, SiNextdotjs, SiVercel,
} from "react-icons/si";
import { FaJava, FaServer } from "react-icons/fa";
import { FiLayout } from "react-icons/fi";

const skillGroups = [
  {
    category: "CMS Platforms",
    items: [
      { name: "WordPress",    icon: <SiWordpress   className="inline-block mr-3 text-blue-600 text-4xl" /> },
      { name: "Shopify",      icon: <SiShopify     className="inline-block mr-3 text-green-600 text-4xl" /> },
      { name: "Elementor",    icon: <FiLayout      className="inline-block mr-3 text-purple-600 text-4xl" /> },
      { name: "Webflow",      icon: <SiWebflow     className="inline-block mr-3 text-blue-500 text-4xl" /> },
      { name: "Wix",          icon: <SiWix         className="inline-block mr-3 text-yellow-500 text-4xl" /> },
      { name: "Squarespace",  icon: <SiSquarespace className="inline-block mr-3 text-gray-700 text-4xl" /> },
    ],
  },
  {
    category: "Programming Languages",
    items: [
      { name: "C#",         icon: <SiDotnet     className="inline-block mr-3 text-green-600  text-4xl" /> },
      { name: "C++",        icon: <SiCplusplus  className="inline-block mr-3 text-brand text-4xl" /> },
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
      { name: "Next.js",      icon: <SiNextdotjs   className="inline-block mr-3 text-black dark:text-white text-4xl" /> },
      { name: "React",        icon: <SiReact       className="inline-block mr-3 text-brand text-4xl" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="inline-block mr-3 text-teal-400 text-4xl" /> },
    ],
  },
  {
    category: "DevOps",
    items: [
      { name: "AWS",          icon: <SiAmazon      className="inline-block mr-3 text-orange-400 text-4xl" /> },
      { name: "Git & GitHub", icon: <SiGithub      className="inline-block mr-3 text-brand dark:text-white text-4xl" /> },
      { name: "Railway",      icon: <SiRailway     className="inline-block mr-3 text-violet-500 text-4xl" /> },
      { name: "Vercel",       icon: <SiVercel      className="inline-block mr-3 text-black dark:text-white text-4xl" /> },
      { name: "REST APIs",    icon: <FaServer      className="inline-block mr-3 text-indigo-500 text-4xl" /> },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL",        icon: <SiMysql       className="inline-block mr-3 text-brand text-4xl" /> },
      { name: "PostgreSQL",   icon: <SiPostgresql  className="inline-block mr-3 text-sky-600   text-4xl" /> },
    ],
  },
];

const About = () => {
  return (
    <section className="py-16 px-4 max-w-5xl mx-auto text-brand dark:text-white" id="about">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-left mb-2 text-brand font-medium uppercase" style={{ fontSize: "12px" }}>About Me</p>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Text Column */}
          <div className="text-left flex-1">
            <h4 className="mb-4" style={{ fontFamily: "Forum, serif", fontSize: "40px", letterSpacing: "-2px", lineHeight: "1.2" }}>
              I'm Noriel Fulgencio, a software engineer from the Philippines.
            </h4>
            <p className="mb-4 leading-relaxed" style={{ fontSize: "16px" }}>
              I recently finished my first professional role where I built and maintained a production CRM from scratch, and I'm currently freelancing while looking for my next full-time opportunity. I graduated Magna Cum Laude in IT from West Visayas State University in 2025, and my thesis was awarded Best Thesis that same year.
            </p>
            <p className="leading-relaxed" style={{ fontSize: "16px" }}>
              I work across the full stack but lean more toward the backend, structuring data, building APIs, and making sure things don't break once people actually start using the system. These days, I mostly build websites, custom systems, and automations to help businesses run things smoother and cut down manual work.
            </p>
          </div>

          {/* Image Column */}
          <div className="flex-1 flex justify-center">
            <img
              src={aboutImage}
              alt="Noriel Fulgencio"
              className="shadow-lg"
              style={{ width: "370px", height: "450px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20">
          <h3 className="text-4xl font-normal mb-10 text-left">Skills</h3>
          <div className="space-y-10">
            {skillGroups.map(({ category, items }) => (
              <div key={category}>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-brand mb-4">{category}</h4>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-brand dark:text-gray-300">
                  {items.map(({ name, icon }) => (
                    <motion.li
                      key={name}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="py-3 px-4 shadow-sm flex items-center"
                      style={{ backgroundColor: "#f6f8f5" }}
                    >
                      {icon}
                      <span className="text-base font-medium">{name}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;

