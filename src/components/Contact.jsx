import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";

const contacts = [
  {
    label: "Email",
    value: "norielfulgencio@gmail.com",
    href: "mailto:norielfulgencio@gmail.com",
    icon: <FaEnvelope className="text-blue-500 text-2xl" />,
  },
  {
    label: "GitHub",
    value: "github.com/Norielqt",
    href: "https://github.com/Norielqt",
    icon: <FaGithub className="text-gray-800 dark:text-white text-2xl" />,
  },
  {
    label: "LinkedIn",
    value: "Noriel Fulgencio",
    href: "https://www.linkedin.com/in/noriel-fulgencio-23887a259/",
    icon: <FaLinkedin className="text-blue-600 text-2xl" />,
  },
  {
    label: "Facebook",
    value: "noryeeelqt",
    href: "https://www.facebook.com/noryeeelqt",
    icon: <FaFacebook className="text-blue-500 text-2xl" />,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true, margin: "0px 0px 80px 0px" }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 mb-10">
          I'm open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out through any of the channels below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map(({ label, value, href, icon }) => (
            <a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition group"
            >
              <div className="flex-shrink-0">{icon}</div>
              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
