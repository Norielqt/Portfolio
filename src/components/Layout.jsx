import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import Footer from "./Footer";
import ChatBot from "./ChatBot";
import grainTexture from "../assets/subtle-grain-noise.png";

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

  // Close mobile menu on outside click or touch
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (!e.target.closest("#mobile-menu") && !e.target.closest("#hamburger-btn")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [menuOpen]);

  return (
    <div className="text-brand min-h-screen" style={{ background: '#FFFFFF' }}>
      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{
          backgroundImage: `url(${grainTexture})`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          opacity: 0.04,
        }}
        aria-hidden="true"
      />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-black/8 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center relative">

          {/* Desktop nav — pill container - centered */}
          <nav className="hidden md:flex items-center gap-1 border border-brand-800/15 rounded-full px-2 py-1.5">
            {NAV_LINKS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  (path === "/" ? location.pathname === "/" : location.pathname === path)
                    ? "bg-brand text-white shadow-sm"
                    : "text-brand-800/60 hover:text-brand-800"
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
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-full text-brand-800/50 hover:text-brand-800 hover:bg-brand-800/8 transition"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/noriel-fulgencio-23887a259/"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex w-9 h-9 items-center justify-center rounded-full text-brand-800/50 hover:text-brand-800 hover:bg-brand-800/8 transition"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={18} />
            </a>

            {/* Hamburger */}
            <button
              id="hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-brand-800/60 hover:text-brand-800 hover:bg-brand-800/8 transition"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

      </header>

      {/* Mobile menu — full screen overlay (outside header to avoid backdrop-filter stacking context bug) */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-50 flex flex-col"
          style={{ background: "#FFFFFF" }}
        >
          {/* Close button */}
          <div className="flex justify-end px-6 pt-5">
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-black/50 hover:text-black hover:bg-black/8 transition"
              aria-label="Close menu"
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Nav links — centered, large */}
          <nav className="flex flex-col items-center justify-center flex-1 gap-2">
            {NAV_LINKS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`text-3xl font-bold tracking-tight transition py-2 ${
                  (path === "/" ? location.pathname === "/" : location.pathname === path)
                    ? "text-black font-bold"
                    : "text-black/50 hover:text-black"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Social links at bottom */}
          <div className="flex items-center justify-center gap-6 pb-12">
            <a href="https://github.com/Norielqt" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-black/50 hover:text-black transition">
              <FiGithub size={18} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/noriel-fulgencio-23887a259/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-black/50 hover:text-black transition">
              <FiLinkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>
      )}

      <main>
        <Outlet />
      </main>

      <Footer />
      {!menuOpen && <ChatBot />}
    </div>
  );
}
