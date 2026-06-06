import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Preloader from "./components/Preloader";
import Seo from "./components/Seo";

// Route-only components — loaded only when the user navigates to that route
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const ProjectCategory = lazy(() => import("./components/ProjectCategory"));


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

