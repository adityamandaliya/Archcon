/* "use client";

import { motion } from "framer-motion";
import HeroCard from "../ui/HeroCard";
import { LucideHardHat, LucideRuler, LucideLandmark } from "lucide-react";

// Data for the interactive architectural cards

const SERVICE_CARDS = [
  // ... (SERVICE_CARDS array remains unchanged)
  {
    icon: LucideHardHat,
    title: "Residential Redevelopment",
    description:
      "Transforming old Mumbai properties into modern, safe, and luxurious homes.",
  },
  {
    icon: LucideRuler,
    title: "Commercial Architecture",
    description:
      "Designing and building high-performance commercial spaces for future businesses.",
  },
  {
    icon: LucideLandmark,
    title: "Industrial & Logistics Hubs",
    description:
      "Creating large-scale, efficient infrastructure for India's growing economy.",
  },
];

export default function Hero() {
  return (
    // CHANGE 1: Main Section: Remove py-20, use justify-start, and set bottom padding only (pb-20).
    // The background (bg-primary + grid pattern) will now start flush at the top.
    <section className="relative min-h-screen w-full bg-primary flex flex-col justify-start items-center pb-20 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 text-center max-w-7xl pt-28 md:pt-32 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-accent text-lg tracking-[0.2em] uppercase mb-4 font-semibold">
            Mumbai's Premier Architectural & Development Firm
          </h2>

          <h1 className="text-6xl md:text-8xl font-serif font-extrabold text-secondary mb-8 leading-tight">
            Building the <span className="text-text">Next Generation</span> of
            Mumbai
          </h1>

          <p className="max-w-3xl mx-auto text-text/80 text-xl mb-12">
            Blending timeless design with future-proof engineering. Archcon is
            your partner in large-scale urban transformation.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICE_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }} // Staggered entry
            >
              <HeroCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-grid-pattern [background-size:20px_20px] [background-image:linear-gradient(to_right,var(--color-text)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-text)_1px,transparent_1px)]" />
      </div>
    </section>
  );
}
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface MousePosition {
  x: number;
  y: number;
}

const SERVICES = [
  {
    id: 1,
    title: "Residential Redevelopment",
    icon: "🏢",
  },
  {
    id: 2,
    title: "Commercial Architecture",
    icon: "🏗️",
  },
  {
    id: 3,
    title: "Industrial & Logistics Hubs",
    icon: "⚙️",
  },
];

// Construction images with positions and dimensions
const HERO_IMAGES = [
  {
    id: 1,
    src: "/images/construction-1.jpg",
    alt: "Construction Site",
    position: "left-[5%] top-[15%]",
    size: "w-48 h-56", // 400x560px (4:5 ratio)
    rotation: "-rotate-6",
  },
  {
    id: 2,
    src: "/images/construction-2.jpg",
    alt: "Building Blueprint",
    position: "right-[8%] top-[20%]",
    size: "w-40 h-52", // 320x416px (4:5 ratio)
    rotation: "rotate-3",
  },
  {
    id: 3,
    src: "/images/construction-3.jpg",
    alt: "Construction Tools",
    position: "left-[12%] bottom-[8%]",
    size: "w-44 h-56", // 352x448px (4:5 ratio)
    rotation: "rotate-2",
  },
  {
    id: 4,
    src: "/images/construction-4.jpg",
    alt: "Development Progress",
    position: "right-[5%] bottom-[15%]",
    size: "w-52 h-64", // 416x512px (4:5 ratio)
    rotation: "-rotate-4",
  },
  {
    id: 5,
    src: "/images/construction-5.jpg",
    alt: "Modern Architecture",
    position: "left-[35%] bottom-[5%]",
    size: "w-40 h-48", // 320x384px (4:5 ratio)
    rotation: "rotate-1",
  },
];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePosition({ x: 0, y: 0 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-primary overflow-hidden pt-32"
    >
      {/* Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #000 1px, transparent 1px),
            linear-gradient(0deg, #000 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* DECORATIVE IMAGES - Positioned around the hero */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {HERO_IMAGES.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 + idx * 0.1 }}
            className={`absolute ${img.position} ${img.rotation}`}
          >
            <div
              className={`${img.size} relative shadow-lg rounded-xl overflow-hidden border-4 border-text/10`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                priority={idx < 2}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* DECORATIVE LINES (Hand-drawn sketch effect) */}
      <svg
        className="absolute inset-0 w-full h-full z-4 pointer-events-none opacity-20"
        preserveAspectRatio="none"
      >
        <defs>
          <style>{`
            .sketch-line {
              stroke: #7f0000;
              stroke-width: 2;
              fill: none;
              stroke-linecap: round;
              stroke-dasharray: 5, 5;
            }
          `}</style>
        </defs>
        {/* Lines connecting to images */}
        <path d="M 100 200 Q 300 250 400 300" className="sketch-line" />
        <path d="M 1300 250 Q 1000 350 800 400" className="sketch-line" />
        <path d="M 150 1000 Q 400 800 600 600" className="sketch-line" />
        <path d="M 1200 900 Q 900 700 700 500" className="sketch-line" />
      </svg>

      {/* CURSOR TRACKING DOT */}
      {isHovering && (
        <motion.div
          className="fixed w-6 h-6 bg-accent rounded-full z-40 pointer-events-none"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
            mass: 0.5,
          }}
          style={{
            boxShadow: "0 0 20px rgba(196, 164, 132, 0.6)",
          }}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="relative z-20 container mx-auto px-4 max-w-6xl">
        {/* Heading Section */}
        <div className="flex flex-col items-center justify-center text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
                Mumbai's Premier Architectural & Development Firm
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.2] mb-6 text-text"
            >
              Building the Next
              <span className="block text-maroon">Generation of Mumbai</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-text/70 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              Blending timeless design with future-proof engineering. Archcon is
              your partner in large-scale urban transformation.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-maroon text-primary font-semibold rounded-lg hover:bg-maroon/80 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Explore Our Work
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* SERVICE CARDS - Positioned lower to avoid overlap */}
      {/* <div className="relative z-20 px-4 pb-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
          >
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + idx * 0.1 }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(127, 0, 0, 0.2)",
                }}
                className="group relative bg-white border border-text/10 rounded-2xl p-8 hover:border-maroon/30 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{service.icon}</div>
                  <motion.div
                    className="text-maroon opacity-0 group-hover:opacity-100"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>

                <h3 className="text-text font-bold text-lg mb-3">
                  {service.title}
                </h3>

                <p className="text-text/60 text-sm leading-relaxed">
                  {service.id === 1
                    ? "Transforming old Mumbai properties into modern, safe, and luxurious homes."
                    : service.id === 2
                    ? "Designing and building high-performance commercial spaces for future businesses."
                    : "Creating large-scale, efficient infrastructure for India's growing economy."}
                </p>

                
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-r from-maroon to-transparent pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div> */}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-text/50 text-xs uppercase tracking-wider">
            Scroll to explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
