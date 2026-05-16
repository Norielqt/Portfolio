import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Seo from "./Seo";

// ── Assets ────────────────────────────────────────────────────────────────────
import heroVideo    from "../assets/NorielFulgencioHi.mp4";
import heroImage    from "../assets/NorielFulgencio.webp";
import joelImage    from "../assets/JoelSpolsky.webp";
import aboutImage   from "../assets/NorielFulgencio_AboutMe.webp";
import aboutImage1x from "../assets/NorielFulgencio_AboutMe_1x.webp";
import svc1Image    from "../assets/Verada_preview.webp";
import svc2Image    from "../assets/Project3a.webp";
import svc3Image    from "../assets/n8npreview.webp";

// ── Icons ─────────────────────────────────────────────────────────────────────
import {
  SiJavascript, SiReact, SiTailwindcss, SiPython, SiHtml5, SiPhp,
  SiCplusplus, SiGithub, SiMysql, SiDotnet, SiLaravel, SiAmazon,
  SiPostgresql, SiRailway, SiWordpress, SiShopify, SiWebflow, SiWix,
  SiSquarespace, SiNextdotjs, SiVercel, SiN8N, SiZapier, SiMake, SiElementor,
} from "react-icons/si";
import { FaJava, FaServer, FaRobot } from "react-icons/fa";
import { FiLayout } from "react-icons/fi";

// ── Data ──────────────────────────────────────────────────────────────────────
const services = [
  { image: svc1Image, title: "Website Development" },
  { image: svc2Image, title: "Web Application" },
  { image: svc3Image, title: "Automation", imageZoom: 1.02 },
];

const skillGroups = [
  {
    category: "CMS Platforms",
    items: [
      { name: "WordPress",   icon: <SiWordpress   className="inline-block mr-3 text-blue-600   text-4xl" /> },
      { name: "Shopify",     icon: <SiShopify     className="inline-block mr-3 text-green-600  text-4xl" /> },
      { name: "Elementor",   icon: <FiLayout      className="inline-block mr-3 text-purple-600 text-4xl" /> },
      { name: "Webflow",     icon: <SiWebflow     className="inline-block mr-3 text-blue-500   text-4xl" /> },
      { name: "Wix",         icon: <SiWix         className="inline-block mr-3 text-yellow-500 text-4xl" /> },
      { name: "Squarespace", icon: <SiSquarespace className="inline-block mr-3 text-gray-700   text-4xl" /> },
    ],
  },
  {
    category: "Automation",
    items: [
      { name: "n8n",        icon: <SiN8N  className="inline-block mr-3 text-rose-500    text-4xl" /> },
      { name: "Zapier",     icon: <SiZapier className="inline-block mr-3 text-orange-500  text-4xl" /> },
      { name: "GoHighLevel", icon: <img src={require("../assets/Gohighlevel.ico")} alt="GoHighLevel" className="inline-block mr-3 flex-shrink-0 w-6 h-6 md:w-9 md:h-9" style={{ objectFit: "contain" }} /> },
      { name: "Make.com",   icon: <SiMake className="inline-block mr-3 text-fuchsia-500 text-4xl" /> },
    ],
  },
  {
    category: "Programming Languages",
    items: [
      { name: "C#",         icon: <SiDotnet     className="inline-block mr-3 text-green-600  text-4xl" /> },
      { name: "C++",        icon: <SiCplusplus  className="inline-block mr-3 text-brand      text-4xl" /> },
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
      { name: "Next.js",      icon: <SiNextdotjs   className="inline-block mr-3 text-black    text-4xl" /> },
      { name: "React",        icon: <SiReact       className="inline-block mr-3 text-brand    text-4xl" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="inline-block mr-3 text-teal-400 text-4xl" /> },
    ],
  },
  {
    category: "DevOps",
    items: [
      { name: "AWS",          icon: <SiAmazon  className="inline-block mr-3 text-orange-400 text-4xl" /> },
      { name: "Git & GitHub", icon: <SiGithub  className="inline-block mr-3 text-brand      text-4xl" /> },
      { name: "Railway",      icon: <SiRailway className="inline-block mr-3 text-violet-500  text-4xl" /> },
      { name: "Vercel",       icon: <SiVercel  className="inline-block mr-3 text-black       text-4xl" /> },
      { name: "REST APIs",    icon: <FaServer  className="inline-block mr-3 text-indigo-500  text-4xl" /> },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MySQL",      icon: <SiMysql      className="inline-block mr-3 text-brand   text-4xl" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="inline-block mr-3 text-sky-600 text-4xl" /> },
    ],
  },
];

// ── Home ──────────────────────────────────────────────────────────────────────
const Home = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(true);
  const mobileVideoRef  = useRef(null);
  const desktopVideoRef = useRef(null);
  const imageRef        = useRef(null);

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroProgress, [0, 1], ["0%", "18%"]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "8%"]);

  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  useEffect(() => {
    if (mobileVideoRef.current)  mobileVideoRef.current.play().catch(() => {});
    if (desktopVideoRef.current) desktopVideoRef.current.play().catch(() => {});
  }, []);

  return (
    <div>
      <Seo
        title="Noriel Fulgencio - Software Engineer & Automation Dev"
        description="Software Engineer from the Philippines building React & Laravel web apps and automations. Available for freelance and remote work worldwide."
        path="/"
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div style={{ background: "#FFFFFF" }}>
        {/* Mobile */}
        <section className="flex flex-col md:hidden items-center justify-center px-6 pb-16 min-h-screen" style={{ paddingTop: "80px" }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }} className="relative mb-7">
            {showVideo ? (
              <video ref={mobileVideoRef} src={heroVideo} muted autoPlay playsInline aria-label="Noriel Fulgencio waving hello" onEnded={() => setShowVideo(false)} className="w-36 h-36 object-cover object-top rounded-full" />
            ) : (
              <img className="w-36 h-36 object-cover object-top rounded-full" src={heroImage} alt="Portrait of Noriel Fulgencio" loading="eager" />
            )}
            <div className="absolute inset-0 rounded-full ring-1 ring-black/15" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }} className="text-center">
            <p style={{ fontSize: "14px", color: "#11111199", textTransform: "uppercase", letterSpacing: "0.08em" }} className="font-medium mb-1">Welcome to my portfolio</p>
            <h1 className="leading-[1.05] tracking-tight mb-2" style={{ fontSize: "clamp(28px, 8vw, 40px)", fontFamily: "Forum, serif", fontWeight: 400 }}>
              Noriel Fulgencio
            </h1>
            <p className="text-base font-medium text-brand-600 mb-4">Software Engineer &amp; Automation Specialist</p>
            <p className="text-sm text-brand-500 leading-relaxed max-w-xs mx-auto">
              Building web apps and automations for businesses, based in the Philippines, open to freelance and remote work.
            </p>
            <div className="flex gap-3 justify-center mt-7">
              <a href="/NorielFulgencio_CV.pdf" download className="inline-flex items-center px-5 py-2.5 bg-black text-white hover:bg-black/85 transition text-sm font-medium tracking-wide">Download CV →</a>
              <button onClick={() => navigate("/projects")} className="inline-flex items-center px-5 py-2.5 border border-black/20 text-black hover:border-black hover:bg-black hover:text-white transition text-sm font-medium tracking-wide">View My Work</button>
            </div>
          </motion.div>
        </section>

        {/* Desktop */}
        <section ref={heroRef} className="hidden md:flex flex-row items-center justify-between px-8 max-w-5xl mx-auto gap-x-16 min-h-screen">
          <motion.div style={{ y: heroTextY }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="flex-1 space-y-7">
            <p style={{ fontSize: "14px", color: "#11111199", textTransform: "uppercase", letterSpacing: "0.08em" }} className="font-medium mb-1">Welcome to my portfolio</p>
            <h1 style={{ fontFamily: "Forum, serif", letterSpacing: "-0.02em", lineHeight: "0.92", fontSize: "clamp(56px, 7vw, 96px)", fontWeight: 400 }} className="text-black">
              Noriel<br />Fulgencio.
            </h1>
            <p className="text-xl font-light text-black/70">Software Engineer &amp; Automation Specialist</p>
            <p className="text-base text-black/50 max-w-md leading-relaxed">
              I build full-stack web apps with React and Laravel and automate workflows for businesses, based in the Philippines, open to freelance and remote work.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="/NorielFulgencio_CV.pdf" download className="inline-flex items-center px-7 py-3 bg-black text-white hover:bg-black/85 transition text-sm font-medium tracking-wide">Download CV →</a>
              <button onClick={() => navigate("/projects")} className="inline-flex items-center px-7 py-3 border border-black/20 text-black hover:border-black hover:bg-black hover:text-white transition text-sm font-medium tracking-wide">View My Work</button>
            </div>
          </motion.div>

          <motion.div style={{ y: heroImgY }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }} className="shrink-0">
            <div className="w-72 h-72 rounded-full overflow-hidden shadow-lg shadow-black/10" style={{ background: "#EBEBEB" }}>
              {showVideo ? (
                <video ref={desktopVideoRef} src={heroVideo} muted autoPlay playsInline aria-label="Noriel Fulgencio waving hello" onEnded={() => setShowVideo(false)} className="w-full h-full object-cover object-top" />
              ) : (
                <img src={heroImage} alt="Portrait of Noriel Fulgencio" className="w-full h-full object-cover object-top" loading="eager" />
              )}
            </div>
          </motion.div>
        </section>
      </div>

      {/* ── WHAT I OFFER ─────────────────────────────────────────────────── */}
      <div style={{ background: "#F8F8F8" }}>
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-4 text-center">
        <h2 style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "-1px", fontSize: "42px" }} className="font-extrabold text-brand-800">
          What I Offer
        </h2>
        <p className="mt-3 text-brand-700/70 max-w-md mx-auto leading-relaxed" style={{ fontSize: "18px" }}>
          Practical solutions tailored to your business, from clean websites to systems that just work.
        </p>
      </div>

      {/* Services marquee */}
      <section className="py-16 overflow-hidden" id="services">
        <motion.div
          className="flex gap-6"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {[...services, ...services].map((service, index) => (
            <div
              key={index}
              onClick={() => navigate("/services")}
              className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 relative"
              style={{ width: "480px", height: "220px" }}
            >
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={service.imageZoom ? { transform: `scale(${service.imageZoom})` } : undefined}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-white">{service.title}</h4>
              </div>
            </div>
          ))}
        </motion.div>
      </section>
      </div>

      {/* ── ABOUT ME ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 max-w-5xl mx-auto dark:text-white" id="about" style={{ color: "#1C1C1E" }}>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-6 text-left">
            <p style={{ fontSize: "14px", color: "#11111199", textTransform: "uppercase", letterSpacing: "0.08em" }} className="font-medium">About Me</p>
            <h2 className="mb-0" style={{ fontFamily: "Forum, serif", fontSize: "clamp(20px, 5.5vw, 30px)", letterSpacing: "clamp(-1px, -0.3vw, -2px)", lineHeight: "1.2" }}>
              I'm Noriel Fulgencio, a Software Engineer and Automation Specialist from the Philippines.
            </h2>
            <div className="flex justify-center">
              <img src={aboutImage} alt="Noriel Fulgencio working at his desk" className="shadow-lg w-full" loading="lazy" style={{ maxWidth: "370px", aspectRatio: "37 / 45", objectFit: "cover" }} />
            </div>
            <p className="leading-relaxed" style={{ fontSize: "13px", color: "#555555" }}>
              I build full-stack web applications with React on the front end and Laravel on the back end, with a bias toward clean APIs, reliable data, and systems that hold up once real users get in. I recently shipped a production CRM from the ground up in my first professional role, and I'm currently freelancing while looking for my next full-time opportunity.
            </p>
            <p className="leading-relaxed" style={{ fontSize: "13px", color: "#555555" }}>
              These days I mostly build websites, custom systems, and business automations that cut down repetitive manual work for small teams. I graduated Magna Cum Laude in IT from West Visayas State University in 2025, where my thesis was awarded Best Thesis. Open to freelance projects and remote engineering roles worldwide — <Link to="/contact" className="underline decoration-brand/40 hover:decoration-brand">get in touch to discuss your project</Link>.
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex flex-row gap-12 items-start">
            <div className="text-left flex-1">
              <p style={{ fontSize: "14px", color: "#11111199", textTransform: "uppercase", letterSpacing: "0.08em" }} className="font-medium mb-3">About Me</p>
              <h2 className="mb-4" style={{ fontFamily: "Forum, serif", fontSize: "clamp(28px, 7vw, 40px)", letterSpacing: "clamp(-1px, -0.3vw, -2px)", lineHeight: "1.2" }}>
                I'm Noriel Fulgencio, a Software Engineer and Automation Specialist from the Philippines.
              </h2>
              <p className="mb-4 leading-relaxed" style={{ fontSize: "16px", color: "#555555" }}>
                I build full-stack web applications with React on the front end and Laravel on the back end, with a bias toward clean APIs, reliable data, and systems that hold up once real users get in. I recently shipped a production CRM from the ground up in my first professional role, and I'm currently freelancing while looking for my next full-time opportunity.
              </p>
              <p className="leading-relaxed" style={{ fontSize: "16px", color: "#555555" }}>
                These days I mostly build websites, custom systems, and business automations that cut down repetitive manual work for small teams. I graduated Magna Cum Laude in IT from West Visayas State University in 2025, where my thesis was awarded Best Thesis. Open to freelance projects and remote engineering roles worldwide — <Link to="/contact" className="underline decoration-brand/40 hover:decoration-brand">get in touch to discuss your project</Link>.
              </p>
            </div>
            <div ref={imageRef} className="flex-1 flex justify-center w-full overflow-hidden" style={{ maxWidth: "370px", aspectRatio: "37 / 45" }}>
              <motion.img
                src={aboutImage}
                alt="Noriel Fulgencio working at his desk"
                className="shadow-lg w-full h-full"
                loading="lazy"
                initial={{ scale: 1.12 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 8, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, amount: 0.2 }}
                style={{ y: imageY, objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Skills */}
          <div className="mt-20">
            <h3 className="text-2xl md:text-4xl font-normal mb-8 md:mb-10 text-left" style={{ color: "#1C1C1E" }}>Skills</h3>
            <div className="space-y-10">
              {skillGroups.map(({ category, items }) => (
                <div key={category}>
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-4">{category}</h4>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 dark:text-gray-300">
                    {items.map(({ name, icon }) => (
                      <motion.li key={name} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="py-2 px-3 md:py-3 md:px-4 shadow-sm flex items-center [&>svg]:text-2xl md:[&>svg]:text-4xl" style={{ backgroundColor: "#F0F0F0" }}>
                        {icon}
                        <span className="text-xs md:text-base font-medium" style={{ color: "#1C1C1E" }}>{name}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── QUOTE ────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#FAFAFA" }} className="w-full py-20 px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="flex flex-col items-center text-center">
          <span className="text-8xl leading-none select-none" style={{ fontFamily: "Forum, serif", color: "#D4D4D4" }}>&ldquo;</span>
          <h4 className="text-2xl md:text-3xl mt-2 mb-10 max-w-2xl" style={{ fontFamily: "Forum, serif", color: "#111111" }}>
            Good software, like wine, takes time
          </h4>
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 mb-3" style={{ borderColor: "#D4D4D4" }}>
            <img src={joelImage} alt="Joel Spolsky" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
          </div>
          <p style={{ fontSize: 14, color: "#737373" }}>Joel Spolsky</p>
        </motion.div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#111111" }} className="w-full py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-2xl mx-auto"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: "#FFFFFF66" }}>
            Let's work together
          </p>
          <h2
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: "clamp(-1px, -0.2vw, -2px)", color: "#FFFFFF" }}
            className="font-extrabold mb-6 leading-tight"
          >
            Ready to build something?
          </h2>
          <p style={{ color: "#FFFFFF99", fontSize: "clamp(14px, 2vw, 17px)" }} className="mb-10 leading-relaxed max-w-lg">
            Whether it's a website, a custom app, or automating your workflow — I'd love to hear about your project.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-300"
            style={{ background: "#FFFFFF", color: "#111111", fontSize: "15px" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#F0F0F0"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; }}
          >
            Get in touch
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
