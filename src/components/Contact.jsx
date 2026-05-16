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
        style={{ background: "#FFFFFF" }}
        className="pt-20 md:pt-32 pb-10 md:pb-16 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl mx-auto w-full text-center"
        >
          <p className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-brand/60 mb-3">
            Get in touch
          </p>
          <h1
            style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "clamp(-1px, -0.2vw, -2px)", fontSize: "clamp(24px, 4vw, 42px)" }}
            className="text-brand-800 font-extrabold"
          >
            Contact Me
          </h1>
          <p className="mt-4 text-brand-700/70 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hello? I'd love to hear from you. Let's build something great together.
          </p>
        </motion.div>
      </div>
      <section id="contact" className="pb-24 px-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="divide-y"
          style={{ borderTop: "1px solid #E5E5E5", borderBottom: "1px solid #E5E5E5" }}
        >
          {contacts.map(({ label, value, href, icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              className="flex items-center justify-between py-5 group"
              style={{ borderColor: "#E5E5E5" }}
            >
              <div className="flex items-center gap-4">
                <span style={{ color: "#11111140", fontSize: "18px" }}>{icon}</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "#11111166" }}>{label}</p>
                  <p className="font-medium mt-0.5" style={{ fontSize: "15px", color: "#111111" }}>{value}</p>
                </div>
              </div>
              <svg className="shrink-0 transition-transform duration-200 group-hover:translate-x-1" style={{ color: "#11111133" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10 text-sm"
          style={{ color: "#11111155" }}
        >
          Based in the Philippines · Open to remote &amp; freelance work
        </motion.p>
      </section>
    </>
  );
}


