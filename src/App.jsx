import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { FiCheckCircle, FiUsers, FiMail, FiAward } from "react-icons/fi";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Services from "./components/Services";
import Preloader from "./components/Preloader";
import Seo from "./components/Seo";

// Route-only components — loaded only when the user navigates to that route
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const ProjectCategory = lazy(() => import("./components/ProjectCategory"));

const ServicesPage = () => (
  <div>
    <Seo
      title="Services - Web Development & Automation | Noriel Fulgencio"
      description="Freelance web development, custom software, and business automation services by a Software Engineer in the Philippines. React, Laravel, and more."
      path="/services"
    />
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
          What I do
        </p>
        <h1
          style={{ fontFamily: "DM Sans, sans-serif", letterSpacing: "clamp(-1px, -0.2vw, -2px)", fontSize: "clamp(24px, 4vw, 42px)" }}
          className="text-brand-800 font-extrabold"
        >
          My Services
        </h1>
        <p className="mt-4 text-brand-700/70 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
          From web development to automations and custom software, here's how I help businesses build, scale, and streamline.
        </p>
      </motion.div>
    </div>
    <Services layout="list" />
    <div style={{ backgroundColor: "#FAFAFA" }} className="py-12 md:py-16 px-4 min-h-[40vh] flex items-start pt-14 md:pt-20">
      <div className="max-w-6xl mx-auto w-full">
        <h4 style={{ fontFamily: "Forum, serif", fontSize: "clamp(22px, 5vw, 40px)" }} className="text-brand text-left">
          Why Choose Me
        </h4>
        <div className="flex flex-col md:flex-row gap-12 mt-6">
          {/* Description on left */}
          <div className="md:w-1/2">
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(14px, 3.5vw, 18px)" }} className="text-brand">
              I've been working as a developer for about 2+ years now, and I've handled real projects including building custom software from scratch tailored to client needs, building websites, and automations. I keep things simple and make sure everything runs the way it should.
              <br />
              <br />
              The badges illustrate this. I also focus on key benefits they will get while using my services, namely Client-Focused Approach and Delivered as Expected.
            </p>
          </div>

          {/* Badges on right */}
          <div className="md:w-1/2 grid grid-cols-2 gap-8">
            {[
              { icon: <FiAward size={32} />, label: "2+ Years of Experience" },
              { icon: <FiUsers size={32} />, label: "Client-Focused Approach" },
              { icon: <FiCheckCircle size={32} />, label: "Delivered as Expected" },
              { icon: <FiMail size={32} />, label: "Clear Communication" }
            ].map((badge, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-2 border-brand flex items-center justify-center mb-3">
                  <div className="text-brand">{badge.icon}</div>
                </div>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px" }} className="text-brand">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
      {loaded && (
        <HelmetProvider>
          <BrowserRouter>
            <Suspense fallback={null}>
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route
                    path="/timeline"
                    element={
                      <>
                        <Seo
                          title="Experience & Timeline - Noriel Fulgencio"
                          description="Career timeline and experience of Noriel Fulgencio, Software Engineer and Automation Specialist from the Philippines."
                          path="/timeline"
                        />
                        <Experience />
                      </>
                    }
                  />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route
                    path="/projects"
                    element={
                      <>
                        <Seo
                          title="Projects - Noriel Fulgencio"
                          description="Web development, automation, and software development projects by Noriel Fulgencio. React, Laravel, and custom systems."
                          path="/projects"
                        />
                        <Projects />
                      </>
                    }
                  />
                  <Route path="/projects/web-development" element={<ProjectCategory category="web-development" />} />
                  <Route path="/projects/automation" element={<ProjectCategory category="automation" />} />
                  <Route path="/projects/software-development" element={<ProjectCategory category="software-development" />} />
                  <Route path="/projects/websites" element={<ProjectCategory category="websites" />} />
                  <Route path="/projects/web-application" element={<ProjectCategory category="web-application" />} />
                  <Route
                    path="/contact"
                    element={
                      <>
                        <Seo
                          title="Contact - Hire Noriel Fulgencio"
                          description="Get in touch with Noriel Fulgencio for freelance web development, automation, and software projects. Open to remote work worldwide."
                          path="/contact"
                        />
                        <Contact />
                      </>
                    }
                  />
                </Route>
              </Routes>
            </Suspense>
            <Analytics />
          </BrowserRouter>
        </HelmetProvider>
      )}
    </>
  );
}

