import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import aboutImage from '../assets/NorielFulgencio_AboutMe.webp';
import aboutImage1x from '../assets/NorielFulgencio_AboutMe_1x.webp';
import {
  SiJavascript, SiReact, SiTailwindcss, SiPython,
  SiHtml5, SiPhp, SiCplusplus, SiGithub, SiMysql,
  SiDotnet, SiLaravel, SiAmazon, SiPostgresql, SiRailway,
  SiWordpress, SiShopify, SiWebflow, SiWix, SiSquarespace, SiNextdotjs, SiVercel,
  SiN8N, SiZapier, SiMake,
} from "react-icons/si";
import { FaJava, FaServer, FaRobot } from "react-icons/fa";
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
    category: "Automation",
    items: [
      { name: "n8n",          icon: <SiN8N         className="inline-block mr-3 text-rose-500    text-4xl" /> },
      { name: "Zapier",       icon: <SiZapier      className="inline-block mr-3 text-orange-500  text-4xl" /> },
      { name: "GoHighLevel",  icon: <img src={require("../assets/Gohighlevel.ico")} alt="GoHighLevel" className="inline-block mr-3 flex-shrink-0 w-6 h-6 md:w-9 md:h-9" style={{objectFit:"contain"}} /> },
      { name: "Make.com",     icon: <SiMake        className="inline-block mr-3 text-fuchsia-500 text-4xl" /> },
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
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto dark:text-white" id="about" style={{ color: '#1C1C1E' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        {/* MOBILE layout: h2 → image → paragraphs */}
        <div className="md:hidden flex flex-col gap-6 text-left">
          <p style={{ fontSize: "14px", color: "#11111199", textTransform: "uppercase", letterSpacing: "0.08em" }} className="font-medium">About Me</p>
          <h2 className="mb-0" style={{ fontFamily: "Forum, serif", fontSize: "clamp(20px, 5.5vw, 30px)", letterSpacing: "clamp(-1px, -0.3vw, -2px)", lineHeight: "1.2" }}>
            I'm Noriel Fulgencio, a Software Engineer and Automation Specialist from the Philippines.
          </h2>
          <div className="flex justify-center">
            <img
              src={aboutImage}
              srcSet={`${aboutImage1x} 370w, ${aboutImage} 740w`}
              sizes="370px"
              alt="Noriel Fulgencio working at his desk — Software Engineer and Automation Specialist from Western Visayas, Philippines"
              className="shadow-lg w-full"
              loading="lazy"
              style={{ maxWidth: "370px", aspectRatio: "37 / 45", objectFit: "cover" }}
            />
          </div>
          <p className="leading-relaxed" style={{ fontSize: "13px", color: '#555555' }}>
            I build full-stack web applications with React on the front end and Laravel on the back end, with a bias toward clean APIs, reliable data, and systems that hold up once real users get in. See my React and Laravel web development projects or browse my automation work. I recently shipped a production CRM from the ground up in my first professional role, and I'm currently freelancing while looking for my next full-time opportunity.
          </p>
          <p className="leading-relaxed" style={{ fontSize: "13px", color: '#555555' }}>
            These days I mostly build websites, custom systems, and business automations that cut down repetitive manual work for small teams. I graduated Magna Cum Laude in IT from West Visayas State University in 2025, where my thesis was awarded Best Thesis. Open to freelance projects and remote engineering roles worldwide — <Link to="/contact" className="underline decoration-brand/40 hover:decoration-brand">get in touch to discuss your project</Link>.
          </p>
        </div>

        {/* DESKTOP layout: text left, image right — untouched */}
        <div className="hidden md:flex flex-row gap-12 items-start">
          {/* Text Column */}
          <div className="text-left flex-1">
            <p style={{ fontSize: "14px", color: "#11111199", textTransform: "uppercase", letterSpacing: "0.08em" }} className="font-medium mb-3">About Me</p>
            <h2 className="mb-4" style={{ fontFamily: "Forum, serif", fontSize: "clamp(28px, 7vw, 40px)", letterSpacing: "clamp(-1px, -0.3vw, -2px)", lineHeight: "1.2" }}>
              I'm Noriel Fulgencio, a Software Engineer and Automation Specialist from the Philippines.
            </h2>
            <p className="mb-4 leading-relaxed" style={{ fontSize: "16px", color: '#555555' }}>
              I build full-stack web applications with React on the front end and Laravel on the back end, with a bias toward clean APIs, reliable data, and systems that hold up once real users get in. See my React and Laravel web development projects or browse my automation work. I recently shipped a production CRM from the ground up in my first professional role, and I'm currently freelancing while looking for my next full-time opportunity.
            </p>
            <p className="leading-relaxed" style={{ fontSize: "16px", color: '#555555' }}>
              These days I mostly build websites, custom systems, and business automations that cut down repetitive manual work for small teams. I graduated Magna Cum Laude in IT from West Visayas State University in 2025, where my thesis was awarded Best Thesis. Open to freelance projects and remote engineering roles worldwide — <Link to="/contact" className="underline decoration-brand/40 hover:decoration-brand">get in touch to discuss your project</Link>.
            </p>
          </div>

          {/* Image Column */}
          <div ref={imageRef} className="flex-1 flex justify-center w-full overflow-hidden">
            <motion.img
              src={aboutImage}
              srcSet={`${aboutImage1x} 370w, ${aboutImage} 740w`}
              sizes="370px"
              alt="Noriel Fulgencio working at his desk — Software Engineer and Automation Specialist from Western Visayas, Philippines"
              className="shadow-lg w-full"
              loading="lazy"
              style={{ y: imageY, maxWidth: "370px", aspectRatio: "37 / 45", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20">
          <h3 className="text-2xl md:text-4xl font-normal mb-8 md:mb-10 text-left" style={{ color: '#1C1C1E' }}>Skills</h3>
          <div className="space-y-10">
            {skillGroups.map(({ category, items }) => (
              <div key={category}>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-4">{category}</h4>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 dark:text-gray-300">
                  {items.map(({ name, icon }) => (
                    <motion.li
                      key={name}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="py-2 px-3 md:py-3 md:px-4 shadow-sm flex items-center [&>svg]:text-2xl md:[&>svg]:text-4xl"
                      style={{ backgroundColor: "#F0F0F0" }}
                    >
                      {icon}
                      <span className="text-xs md:text-base font-medium" style={{ color: '#1C1C1E' }}>{name}</span>
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

