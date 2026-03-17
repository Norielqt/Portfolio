import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-500">
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="font-bold text-xl">Noriel Fulgencio</h1>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <nav className="space-x-4">
              <a href="https://github.com/Norielqt" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
              <a href="https://www.linkedin.com/in/noriel-fulgencio-23887a259/" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
              <a href="https://www.facebook.com/noryeeelqt" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a>
            </nav>
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
          <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 px-4 py-3 flex flex-col space-y-3">
            <a href="https://github.com/Norielqt" target="_blank" rel="noreferrer" className="hover:underline" onClick={() => setMenuOpen(false)}>GitHub</a>
            <a href="https://www.linkedin.com/in/noriel-fulgencio-23887a259/" target="_blank" rel="noreferrer" className="hover:underline" onClick={() => setMenuOpen(false)}>LinkedIn</a>
            <a href="https://www.facebook.com/noryeeelqt" target="_blank" rel="noreferrer" className="hover:underline" onClick={() => setMenuOpen(false)}>Facebook</a>
          </div>
        )}
      </header>

      <main className="pt-20 max-w-5xl mx-auto px-4 space-y-20">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
      </main>

      <Footer />
    </div>
  );
}