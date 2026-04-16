import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const services = [
  {
    image: "/Services1.png",
    title: "Web Development",
    price: "$10",
    description:
      "WordPress, Elementor, Shopify, or other CMS platforms, tell me what you need, I'll build it.",
    descriptionPage: [
      "If you don't have a website yet or just need one built, I can handle it. Just tell me what you're trying to do and I'll build something clean and responsive that works the way you expect—nothing overcomplicated, just a solid site you can actually use.",
      "The main thing you get is something you don't have to worry about—I'll handle the build, and you end up with a site that just works. It's easy to manage, does what you need it to do, and you don't have to deal with the technical side every time you want to update something."
    ],
  },
  {
    image: "/Services3.png",
    title: "Automation",
    price: "$12",
    description:
      "GoHighLevel, n8n, Make.com, Zapier, etc. if it's repetitive, I'll automate it.",
    descriptionPage: [
      "If you're doing the same tasks over and over, sending messages, updating data, moving stuff between tools, that's time you're wasting every day. That's usually where automation comes in.",
      "I set things up so those tasks run on their own in the background, so you don't have to keep doing them manually. Less repetitive work, fewer mistakes, and you can focus on the stuff that actually matters."
    ],
  },
  {
    image: "/Services2.png",
    title: "Software Development",
    price: "$15",
    description:
      "Custom systems, CRM, SaaS, etc. if you need something tailored on your business, I got it.",
    descriptionPage: [
      "If your current tools don't really fit how you work, or you're juggling spreadsheets and different apps just to get things done, that usually means you need something custom.",
      "I build systems based on how you actually work, so everything's in one place and makes sense. It saves time, reduces manual work, and you're not forcing your process to fit someone else's software."
    ],
  },
];

const Services = ({ layout = "grid" }) => {
  const navigate = useNavigate();

  const getServiceRoute = (title) => {
    const routes = {
      "Web Development": "/projects/web-development",
      "Automation": "/projects/automation",
      "Software Development": "/projects/software-development"
    };
    return routes[title] || "#";
  };

  const handleServiceClick = (title) => {
    if (layout === "grid") {
      navigate(getServiceRoute(title));
    }
  };

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto text-brand dark:text-white" id="services">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {layout === "grid" ? (
          // Grid layout for home page
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col items-start ${layout === "grid" ? "cursor-pointer" : ""}`}
                onClick={() => handleServiceClick(service.title)}
              >
                <div className={`w-full overflow-hidden ${layout === "grid" ? "hover:opacity-80 transition-opacity" : ""}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="shadow-lg w-full object-cover block hover:scale-105 transition-transform"
                    style={{ height: "clamp(260px, 40vw, 550px)", maxWidth: "none" }}
                  />
                </div>
                <h4 className="mt-5 text-xl">{service.title}</h4>
              </motion.div>
            ))}
          </div>
        ) : (
          // List layout for services page
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                {/* Image on left */}
                <div className="md:w-1/3 flex-shrink-0 md:ml-auto">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="shadow-lg w-full object-cover block"
                    style={{ height: "450px", maxWidth: "none" }}
                  />
                </div>

                {/* Title and description on right */}
                <div className="md:w-1/2 md:ml-auto">
                  <h4 style={{ fontFamily: "Forum, serif", fontSize: "28px" }} className="mb-4">{service.title}</h4>
                  <div className="space-y-4">
                    {Array.isArray(service.descriptionPage) ? (
                      service.descriptionPage.map((para, i) => (
                        <p key={i} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "15px", color: "#536941E3", letterSpacing: "1px" }}>
                          {para}
                        </p>
                      ))
                    ) : (
                      <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "15px", color: "#536941E3", letterSpacing: "1px" }}>
                        {service.descriptionPage || service.description}
                      </p>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "DM Sans, sans-serif", fontSize: "21px" }} className="mt-6">For {service.price}/hr</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Services;
