import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import Footer from "./Footer";
import ChatBot from "./ChatBot";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Timeline", path: "/timeline" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("darkMode");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (!e.target.closest("#mobile-menu") && !e.target.closest("#hamburger-btn")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <div className="bg-white text-brand min-h-screen">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/75 backdrop-blur-xl border-b border-gray-200/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center relative">

          {/* Desktop nav — pill container - centered */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100/80 border border-gray-200/80 rounded-full px-2 py-1.5 backdrop-blur-sm">
            {NAV_LINKS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  (path === "/" ? location.pathname === "/" : location.pathname === path)
                    ? "bg-white text-brand shadow-sm"
                    : "text-brand/70 hover:text-brand"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions - absolute positioned */}
          <div className="absolute right-6 flex items-center gap-2">
            <a
              href="https://github.com/Norielqt"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-full text-brand/70 hover:text-brand hover:bg-gray-100 transition"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/noriel-fulgencio-23887a259/"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-full text-brand/70 hover:text-brand hover:bg-gray-100 transition"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={18} />
            </a>

            {/* Hamburger */}
            <button
              id="hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-brand/70 hover:text-brand hover:bg-gray-100 transition"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden mx-4 mb-3 rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden"
          >
            <nav className="flex flex-col p-2">
              {NAV_LINKS.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition ${
                    (path === "/" ? location.pathname === "/" : location.pathname === path)
                      ? "text-brand bg-brand/5"
                      : "text-brand hover:bg-gray-50"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-100">
              <a href="https://github.com/Norielqt" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand transition">
                <FiGithub size={16} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/noriel-fulgencio-23887a259/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand transition">
                <FiLinkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
