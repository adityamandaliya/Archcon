"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const VALUES = [
  {
    id: 1,
    title: "Design Excellence",
    subtitle: "Architectural Mastery",
    description:
      "We believe in the extraordinary power of design to influence quality of life. Every structure tells a story of precision, vision, and purpose.",
    image: "/images/value-design.jpg", // 600x400px
    icon: "✦",
    accent: "from-maroon to-accent",
  },
  {
    id: 2,
    title: "Integrity & Trust",
    subtitle: "Built on Honesty",
    description:
      "Transparency and honesty are the foundation of our relationships. We stake our reputation on ethical practices and transparent dealings.",
    image: "/images/value-integrity.jpg", // 600x400px
    icon: "◆",
    accent: "from-accent to-maroon",
  },
  {
    id: 3,
    title: "Innovation Forward",
    subtitle: "Challenging Status Quo",
    description:
      "We explore both traditional and cutting-edge methods to yield experientially innovative spaces that redefine urban living.",
    image: "/images/value-innovation.jpg", // 600x400px
    icon: "▲",
    accent: "from-maroon/60 to-accent/60",
  },
  {
    id: 4,
    title: "Community First",
    subtitle: "Social Responsibility",
    description:
      "Our commitment extends beyond buildings. We create spaces that enrich communities and contribute positively to society.",
    image: "/images/value-community.jpg", // 600x400px
    icon: "●",
    accent: "from-accent/70 to-maroon/70",
  },
];

export default function CorporateIdentity() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-primary py-24 lg:py-32 overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] z-0"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #000 1px, transparent 1px),
            linear-gradient(0deg, #000 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
              Our Foundation
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-text mb-6 leading-tight"
          >
            Guiding Principles
            <span className="block text-maroon">That Define Us</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text/60 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Our values aren't just words on a page—they're woven into every
            decision, every project, and every interaction with our clients and
            community.
          </motion.p>
        </motion.div>

        {/* Values Grid - Premium Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {VALUES.map((value, idx) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(value.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full rounded-2xl overflow-hidden bg-white border border-text/10 transition-all duration-500">
                {/* Image Background */}
                <div className="relative h-56 overflow-hidden bg-text/5">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.accent} opacity-0 group-hover:opacity-40 transition-opacity duration-700`}
                  />

                  {/* Icon Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 + 0.3 }}
                    className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-xl font-light text-maroon border border-text/10 shadow-lg"
                  >
                    {value.icon}
                  </motion.div>
                </div>

                {/* Content Area */}
                <div className="p-8 lg:p-10">
                  {/* Subtitle */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 + 0.1 }}
                    className="flex items-center gap-2 mb-3"
                  >
                    <div className="w-6 h-px bg-gradient-to-r from-maroon to-transparent" />
                    <span className="text-accent text-xs uppercase tracking-[0.2em] font-medium">
                      {value.subtitle}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 + 0.15 }}
                    className="text-2xl md:text-3xl font-serif font-bold text-text mb-4 leading-tight"
                  >
                    {value.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.15 + 0.2 }}
                    className="text-text/70 leading-relaxed text-sm md:text-base"
                  >
                    {value.description}
                  </motion.p>

                  {/* Bottom Accent Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: idx * 0.15 + 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-maroon via-accent to-maroon origin-left"
                  />
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === value.id ? 0.1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-br ${value.accent} pointer-events-none`}
                />
              </div>

              {/* Floating particles on hover */}
              {hoveredId === value.id && (
                <>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 w-24 h-24 bg-maroon rounded-full blur-3xl pointer-events-none"
                  />
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -bottom-2 -left-2 w-32 h-32 bg-accent rounded-full blur-3xl pointer-events-none"
                  />
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 lg:mt-28 text-center"
        >
          <div className="inline-block max-w-3xl">
            <p className="text-text/60 text-lg md:text-xl leading-relaxed mb-6">
              These values aren't aspirational—they're operational. They guide
              every project from conception to completion, ensuring we deliver
              not just buildings, but legacies.
            </p>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="w-16 h-1 bg-gradient-to-r from-transparent via-maroon to-transparent mx-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
