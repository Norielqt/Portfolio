import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white" id="about">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-6 border-b-4 inline-block border-blue-500">About Me</h2>

        <p className="mb-10 text-lg leading-relaxed max-w-4xl">
          I am a passionate software engineer specializing in building efficient, scalable, and user-friendly web applications.
          I enjoy solving complex problems and continuously learning new technologies to improve my craft.
        </p>

        <div className="mb-10 max-w-4xl">
          <h3 className="text-2xl font-bold mb-6 text-blue-500">What I Do</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">Application Development</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-md">
                <li>Build full-stack web applications with responsive interfaces and reliable backend systems</li>
                <li>Translate business requirements into functional software that supports real operational workflows</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">System & Data Architecture</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-md">
                <li>Design structured databases and APIs to manage complex data efficiently</li>
                <li>Develop modular platforms and dashboards for managing projects, users, and operations</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Product & User Experience</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-md">
                <li>Create intuitive user interfaces that make complex tools easy for teams to use</li>
                <li>Improve existing systems by optimizing performance, usability, and maintainability</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Deployment & DevOps</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-md">
                <li>Manage server setup, environment configuration, and application deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
