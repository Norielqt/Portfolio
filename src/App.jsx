import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

const NAV_SECTIONS = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-500">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow border-b border-gray-200/50 dark:border-gray-700/50"
            : "bg-white dark:bg-gray-800 shadow"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="font-bold text-xl">Noriel Fulgencio</h1>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-1">
              {NAV_SECTIONS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    activeSection === id
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
            <div className="flex items-center space-x-3 border-l pl-4 border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
              <a href="https://github.com/Norielqt" target="_blank" rel="noreferrer" className="text-sm hover:underline">GitHub</a>
              <a href="https://www.linkedin.com/in/noriel-fulgencio-23887a259/" target="_blank" rel="noreferrer" className="text-sm hover:underline">LinkedIn</a>
            </div>
          </div>

          {/* Mobile: dark mode + hamburger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-2 py-1 border rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span className="block w-5 h-0.5 bg-current mb-1"></span>
              <span className="block w-5 h-0.5 bg-current mb-1"></span>
              <span className="block w-5 h-0.5 bg-current"></span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 px-4 py-3 flex flex-col space-y-1">
            {NAV_SECTIONS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition ${
                  activeSection === id
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
            <div className="flex space-x-4 pt-2 border-t dark:border-gray-700">
              <a href="https://github.com/Norielqt" target="_blank" rel="noreferrer" className="text-sm hover:underline">GitHub</a>
              <a href="https://www.linkedin.com/in/noriel-fulgencio-23887a259/" target="_blank" rel="noreferrer" className="text-sm hover:underline">LinkedIn</a>
              <a href="https://www.facebook.com/noryeeelqt" target="_blank" rel="noreferrer" className="text-sm hover:underline">Facebook</a>
            </div>
          </div>
        )}
      </header>

      <main className="pt-20 max-w-5xl mx-auto px-4 space-y-20">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}