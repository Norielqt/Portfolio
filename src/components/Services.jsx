import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import service1Image from '../assets/Verada_preview.webp';
import service1Image1x from '../assets/Verada_preview.webp';
import service1Image2x from '../assets/Verada_preview.webp';
import service2Image from '../assets/Project3a.webp';
import service2Image1x from '../assets/Project3a.webp';
import service2Image2x from '../assets/Project3a.webp';
import service3Image from '../assets/n8npreview.webp';
import service3Image1x from '../assets/n8npreview.webp';
import service3Image2x from '../assets/n8npreview.webp';
import {
  SiReact, SiTailwindcss, SiJavascript, SiPhp, SiHtml5,
  SiLaravel, SiMysql, SiPython, SiPostgresql,
  SiAmazon, SiGithub, SiWordpress, SiShopify,
  SiN8N, SiZapier, SiMake, SiElementor, SiWebflow, SiWix, SiSquarespace,
} from "react-icons/si";
import { FaServer, FaRobot } from "react-icons/fa";

function ParallaxImg({ src, srcSet, sizes, alt, imgStyle, className }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  return (
    <div ref={ref} className="overflow-hidden w-full h-full">
      <motion.img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        className={className}
        style={{ ...imgStyle, y, scale: 1.12 }}
      />
    </div>
  );
}

const services = [
  {
    image: service1Image,
    image1x: service1Image1x,
    image2x: service1Image2x,
    title: "Website Development",
    price: "$10",
    description:
      "Responsive websites and web apps built with modern stacks or CMS platforms, clean, fast, and easy to manage.",
    tools: [
      { icon: <SiWordpress />, label: "WordPress" },
      { icon: <SiShopify />, label: "Shopify" },
      { icon: <SiElementor />, label: "Elementor" },
      { icon: <SiWebflow />, label: "Webflow" },
      { icon: <SiWix />, label: "Wix" },
      { icon: <SiSquarespace />, label: "Squarespace" },
      { icon: <SiReact />, label: "React" },
      { icon: <SiTailwindcss />, label: "Tailwind" },
      { icon: <SiHtml5 />, label: "HTML/CSS" },
    ],
    descriptionPage: [
      "If you don't have a website yet or just need one built, I can handle it. Just tell me what you're trying to do and I'll build something clean and responsive that works the way you expect. Nothing overcomplicated, just a solid site you can actually use.",
      "The main thing you get is something you don't have to worry about. I'll handle the build, and you end up with a site that just works. It's easy to manage, does what you need it to do, and you don't have to deal with the technical side every time you want to update something."
    ],
  },
  {
    image: service2Image,
    image1x: service2Image1x,
    image2x: service2Image2x,
    title: "Web Application",
    price: "$15",
    description:
      "Custom systems, CRMs, and SaaS tailored to how your business actually works.",
    tools: [
      { icon: <SiLaravel />, label: "Laravel" },
      { icon: <SiPhp />, label: "PHP" },
      { icon: <SiPython />, label: "Python" },
      { icon: <SiMysql />, label: "MySQL" },
      { icon: <SiPostgresql />, label: "PostgreSQL" },
      { icon: <FaServer />, label: "REST APIs" },
    ],
    descriptionPage: [
      "If your current tools don't really fit how you work, or you're juggling spreadsheets and different apps just to get things done, that usually means you need something custom.",
      "I build systems based on how you actually work, so everything's in one place and makes sense. It saves time, reduces manual work, and you're not forcing your process to fit someone else's software."
    ],
  },
  {
    image: service3Image,
    image1x: service3Image1x,
    image2x: service3Image2x,
    title: "Automation",
    imageZoom: 1.02,
    price: "$12",
    description:
      "Workflows and integrations that handle repetitive tasks so you can focus on real work.",
    tools: [
      { icon: <SiN8N />, label: "n8n" },
      { icon: <SiMake />, label: "Make" },
      { icon: <SiZapier />, label: "Zapier" },
      { icon: <FaRobot />, label: "GHL" },
    ],
    descriptionPage: [
      "If you're doing the same tasks over and over, sending messages, updating data, moving stuff between tools, that's time you're wasting every day. That's usually where automation comes in.",
      "I set things up so those tasks run on their own in the background, so you don't have to keep doing them manually. Less repetitive work, fewer mistakes, and you can focus on the stuff that actually matters."
    ],
  },
];

const Services = ({ layout = "grid", showDescription = true }) => {
  const navigate = useNavigate();

  const getServiceRoute = (title) => {
    return "/services";
  };

  const handleServiceClick = (title) => {
    if (layout === "grid") {
      navigate(getServiceRoute(title));
    }
  };

  return (
    <section
      className={layout === "grid" ? "py-16 overflow-hidden text-brand dark:text-white" : "py-16 px-4 max-w-5xl mx-auto text-brand dark:text-white"}
      id="services"
    >
      <div>
        {layout === "grid" ? (
          // Marquee layout for home page
          <motion.div
            className="flex gap-6"
            style={{ width: "max-content" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          >
            {[...services, ...services].map((service, index) => (
              <div
                key={index}
                onClick={() => handleServiceClick(service.title)}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0 relative"
                style={{ width: "480px", height: "220px" }}
              >
                <img
                  src={service.image2x}
                  srcSet={`${service.image1x} 313w, ${service.image2x} 626w`}
                  sizes="480px"
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={service.imageZoom ? { transform: `scale(${service.imageZoom})` } : undefined}
                />
                {/* Dark gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}
                />
                {/* Title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-xl font-light text-white">{service.title}</h4>
                  {showDescription && (
                    <p className="text-sm text-white/75 leading-relaxed mt-1">{service.description}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          // List layout for services page
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {/* MOBILE card */}
                <div className="md:hidden rounded-3xl overflow-hidden shadow-md" style={{ background: "#F5F5F5" }}>
                  {/* Image banner — compact height */}
                  <div className="w-full overflow-hidden" style={{ height: "130px" }}>
                    <img
                      src={service.image2x}
                      srcSet={`${service.image1x} 313w, ${service.image2x} 626w`}
                      sizes="313px"
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="px-4 py-4">
                    {/* Price badge */}
                    <span
                      className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
                      style={{ background: "#111111", color: "#fff", opacity: 0.85 }}
                    >
                      Starting at {service.price}/hr
                    </span>

                    {/* Title */}
                    <h4
                      className="mb-3"
                      style={{ fontFamily: "Forum, serif", fontSize: "20px", color: "#1C1C1E", lineHeight: "1.2" }}
                    >
                      {service.title}
                    </h4>

                    {/* Divider */}
                    <div className="w-10 h-0.5 mb-4 rounded-full" style={{ background: "#D4D4D4" }} />

                    {/* Description */}
                    <div className="space-y-3">
                      {Array.isArray(service.descriptionPage) ? (
                        service.descriptionPage.map((para, i) => (
                          <p key={i} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "rgb(64 64 64 / 0.7)", lineHeight: "1.7" }}>
                            {para}
                          </p>
                        ))
                      ) : (
                        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "rgb(64 64 64 / 0.7)", lineHeight: "1.7" }}>
                          {service.descriptionPage || service.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* DESKTOP layout — untouched */}
                <div className="hidden md:flex flex-row gap-8 items-center">
                  <div className="md:w-[50%] flex-shrink-0 md:ml-auto w-full" style={{ height: "clamp(220px, 32vw, 340px)" }}>
                    <ParallaxImg
                      src={service.image2x}
                      srcSet={`${service.image1x} 313w, ${service.image2x} 626w`}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      alt={service.title}
                      className="shadow-lg w-full h-full object-cover block md:max-w-none"
                      imgStyle={service.imageZoom ? { transform: `scale(${service.imageZoom})` } : {}}
                    />
                  </div>
                  <div className="md:w-1/2 md:ml-auto">
                    <h4 style={{ fontFamily: "Forum, serif", fontSize: "28px" }} className="mb-4">{service.title}</h4>
                    <div className="space-y-4">
                      {Array.isArray(service.descriptionPage) ? (
                        service.descriptionPage.map((para, i) => (
                          <p key={i} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "15px", color: "rgb(64 64 64 / 0.7)", letterSpacing: "1px" }}>
                            {para}
                          </p>
                        ))
                      ) : (
                        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "15px", color: "rgb(64 64 64 / 0.7)", letterSpacing: "1px" }}>
                          {service.descriptionPage || service.description}
                        </p>
                      )}
                    </div>
                    <h3 style={{ fontFamily: "DM Sans, sans-serif", fontSize: "21px" }} className="mt-6">Starts at {service.price}/hr</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
