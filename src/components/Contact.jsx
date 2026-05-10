import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";

const contacts = [
  {
    label: "Email",
    value: "norielfulgencio246@gmail.com",
    href: "mailto:norielfulgencio246@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    label: "GitHub",
    value: "github.com/Norielqt",
    href: "https://github.com/Norielqt",
    icon: <FaGithub />,
  },
  {
    label: "LinkedIn",
    value: "Noriel Fulgencio",
    href: "https://www.linkedin.com/in/noriel-fulgencio-23887a259/",
    icon: <FaLinkedin />,
  },
  {
    label: "Facebook",
    value: "noryeeelqt",
    href: "https://www.facebook.com/noryeeelqt",
    icon: <FaFacebook />,
  },
];

export default function Contact() {
  return (
    <>
      <div
        style={{ background: "radial-gradient(ellipse at 30% 60%, #ddebd3 0%, #f6f8f5 50%, #f0f4ec 100%)" }}
        className="pt-32 pb-16 px-4"
      >
        <div className="max-w-6xl mx-auto w-full text-center">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-brand/60 mb-4">
            Get in touch
          </p>
          <h1
            style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "clamp(-1.5px, -0.4vw, -3px)" }}
            className="text-brand-800 font-extrabold text-5xl md:text-7xl"
          >
            Contact Me
          </h1>
          <p className="mt-6 text-brand-700/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hello? I'd love to hear from you. Let's build something great together.
          </p>
        </div>
      </div>
      <section id="contact" className="pt-16 pb-16 px-4 max-w-5xl mx-auto text-brand dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true, margin: "0px 0px 80px 0px" }}
        className="max-w-2xl mx-auto"
      >
        {/* MOBILE cards */}
        <div className="flex flex-col gap-4 md:hidden">
          {contacts.map(({ label, value, href, icon }) => (
            <a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-5 px-6 py-5 rounded-3xl shadow-sm group transition-all hover:shadow-md"
              style={{ background: "linear-gradient(160deg, #f6f8f5 60%, #ddebd3 100%)" }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm" style={{ background: "#536942" }}>
                <span className="text-white text-xl">{icon}</span>
              </div>
              <div className="text-left min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest text-brand/50 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-brand-800 truncate">{value}</p>
              </div>
              <svg className="ml-auto shrink-0 text-brand/30 group-hover:text-brand transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </a>
          ))}
        </div>

        {/* DESKTOP grid — untouched */}
        <div className="hidden md:block text-center">
          <h2 className="text-4xl font-normal mb-4">Get In Touch</h2>
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
                <div className="flex-shrink-0 text-brand text-2xl">{icon}</div>
                <div className="text-left">
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-semibold text-brand dark:text-gray-100 group-hover:text-brand-600 transition">{value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
    </>
  );
}
