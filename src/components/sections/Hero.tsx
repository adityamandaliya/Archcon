"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
              onClick={() => {
                router.push("/projects");
                window.scrollTo(0, 0);
              }}
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
