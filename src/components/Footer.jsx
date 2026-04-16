import React from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";

const links = [
  { icon: <FaEnvelope />,  href: "mailto:norielfulgencio@gmail.com",                        label: "Email" },
  { icon: <FaGithub />,   href: "https://github.com/Norielqt",                             label: "GitHub" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/noriel-fulgencio-23887a259/", label: "LinkedIn" },
  { icon: <FaFacebook />, href: "https://www.facebook.com/noryeeelqt",                     label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="py-10 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-4">
        <div className="flex items-center gap-5">
          {links.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="text-xl hover:text-brand transition"
            >
              {icon}
            </a>
          ))}
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Noriel Fulgencio — All rights reserved.</p>
      </div>
    </footer>
  );
}
