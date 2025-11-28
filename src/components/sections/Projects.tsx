"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PROJECTS } from "@/lib/projects";
import { Variants } from "framer-motion";

const TYPE_COLORS = {
  Residential: {
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    accent: "from-blue-500 to-blue-600",
  },
  Commercial: {
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
    accent: "from-amber-500 to-amber-600",
  },
  Industrial: {
    bg: "bg-slate-50",
    badge: "bg-slate-100 text-slate-700",
    accent: "from-slate-500 to-slate-600",
  },
};

const STATUS_CONFIG = {
  Completed: { text: "✓ Completed", color: "text-green-600" },
  "In Progress": { text: "◐ In Progress", color: "text-amber-600" },
  Upcoming: { text: "○ Upcoming", color: "text-slate-600" },
};

// ✅ DEFINE VARIANTS OUTSIDE THE COMPONENT - THIS IS THE FIX
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

interface HoveredProject {
  id: number | null;
}

// ✅ NOW THE COMPONENT STARTS HERE
export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<HoveredProject>({
    id: null,
  });

  return (
    <section className="relative w-full bg-primary py-24 lg:py-32 overflow-hidden">
      {/* Concrete Texture Background */}
      <div
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage: "url('/assets/textures/concrete-abstract.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Grid Background */}
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
              Our Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-text mb-6 leading-tight"
          >
            Transforming
            <span className="block text-maroon">Mumbai's Skyline</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text/60 text-lg md:text-xl max-w-2xl mx-auto"
          >
            From concept to completion, each project represents our commitment
            to excellence, innovation, and sustainable urban development.
          </motion.p>
        </motion.div>

        {/* Projects Grid - ✅ NOW USING THE EXTERNAL VARIANTS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              onMouseEnter={() => setHoveredProject({ id: project.id })}
              onMouseLeave={() => setHoveredProject({ id: null })}
              className="group h-full cursor-pointer"
            >
              {/* Card Container */}
              <motion.div
                animate={{
                  scale: hoveredProject.id === project.id ? 1.05 : 1,
                  y: hoveredProject.id === project.id ? -12 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                className="relative h-full rounded-2xl overflow-hidden bg-white border border-text/10 shadow-lg transition-shadow duration-500 group-hover:shadow-2xl"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-text/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                        TYPE_COLORS[project.type].badge
                      }`}
                    >
                      {project.type}
                    </motion.div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className={`text-xs font-medium ${
                        STATUS_CONFIG[project.status].color
                      }`}
                    >
                      {STATUS_CONFIG[project.status].text}
                    </motion.div>
                  </div>

                  {/* Overlay Gradient */}
                  <motion.div
                    animate={{
                      opacity: hoveredProject.id === project.id ? 0.3 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`absolute inset-0 bg-gradient-to-br ${
                      TYPE_COLORS[project.type].accent
                    }`}
                  />
                </div>

                {/* Content Area */}
                <div className="p-6 lg:p-8">
                  {/* Location */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-2 mb-3"
                  >
                    <span className="text-accent text-lg">📍</span>
                    <span className="text-text/60 text-sm font-medium">
                      {project.location}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl font-serif font-bold text-text mb-4 leading-tight"
                  >
                    {project.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-text/70 text-sm leading-relaxed mb-6"
                  >
                    {project.description}
                  </motion.p>

                  {/* Timeline Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-4 mb-6 pb-6 border-b border-text/10"
                  >
                    {/* Timeline Visual */}
                    <div className="flex items-center justify-between gap-3">
                      {/* Start Date */}
                      <div className="flex-1">
                        <div className="text-xs uppercase tracking-wider text-text/50 font-medium mb-1">
                          Initiation
                        </div>
                        <div className="text-sm font-semibold text-text">
                          {project.startDate}
                        </div>
                      </div>

                      {/* Timeline Connector */}
                      <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-maroon" />
                        <div className="w-0.5 h-6 bg-gradient-to-b from-maroon to-maroon/30" />
                        <div className="text-xs font-bold text-maroon text-center bg-maroon/10 px-2 py-1 rounded-full">
                          {project.durationMonths}M
                        </div>
                        <div className="w-0.5 h-6 bg-gradient-to-b from-maroon/30 to-maroon" />
                        <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                      </div>

                      {/* End Date */}
                      <div className="flex-1 text-right">
                        <div className="text-xs uppercase tracking-wider text-text/50 font-medium mb-1">
                          Completion
                        </div>
                        <div className="text-sm font-semibold text-text">
                          {project.endDate}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project Highlights */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="text-xs uppercase tracking-wider text-text/50 font-medium">
                      Key Highlights
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.highlights.map((highlight, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          className="px-3 py-1.5 bg-text/5 text-text/70 text-xs rounded-lg border border-text/10 hover:bg-maroon/5 hover:border-maroon/30 transition-all"
                        >
                          {highlight}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Project Area Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mt-6 pt-6 border-t border-text/10"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-text/60 text-xs uppercase tracking-wider font-medium">
                        Built Area
                      </span>
                      <span className="text-text font-bold text-sm">
                        {project.area}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  animate={{
                    opacity: hoveredProject.id === project.id ? 0.08 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-br ${
                    TYPE_COLORS[project.type].accent
                  } pointer-events-none`}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 lg:mt-28 text-center"
        >
          <div className="inline-block max-w-2xl">
            <p className="text-text/60 text-lg md:text-xl leading-relaxed">
              Each project is a testament to our dedication to creating spaces
              that inspire, sustain, and transform communities for generations
              to come.
            </p>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="w-16 h-1 bg-gradient-to-r from-transparent via-maroon to-transparent mx-auto mt-8"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
