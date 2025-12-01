"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PROJECTS, Project } from "@/lib/projects";
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
  "In Progress": { text: "○ In Progress", color: "text-amber-600" },
  Upcoming: { text: "◆ Upcoming", color: "text-slate-600" },
};

interface HoveredProject {
  id: number | null;
}

// Container variants with reduced stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

// Optimized card variants - immediate visibility
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

function ProjectCard({ project, isHovered, onHover, onLeave }: any) {
  const typeColor = TYPE_COLORS[project.type as keyof typeof TYPE_COLORS];
  const statusConfig =
    STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG];

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onLeave()}
      className="group h-full cursor-pointer"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? -12 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        className="h-full"
      >
        <div className="relative h-full rounded-2xl overflow-hidden bg-white border border-text/10 shadow-lg transition-shadow duration-500 group-hover:shadow-2xl">
          {/* Image */}
          <div className="relative h-56 overflow-hidden bg-text/5">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              quality={75}
              loading="lazy"
            />
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-700">
            {project.type}
          </div>
          <div className="absolute top-4 right-4 z-20 text-xs font-medium text-green-600">
            {statusConfig.text}
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8">
            {/* Location */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-accent text-lg">📍</span>
              <span className="text-text/60 text-sm font-medium">
                {project.location}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-serif font-bold text-text mb-4 leading-tight">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-text/70 text-sm leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Timeline */}
            <div className="space-y-4 mb-6 pb-6 border-b border-text/10">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wider text-text/50 font-medium mb-1">
                    Initiation
                  </div>
                  <div className="text-sm font-semibold text-text">
                    {project.startDate}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-maroon" />
                  <div className="w-0.5 h-6 bg-gradient-to-b from-maroon to-maroon/30" />
                  <div className="text-xs font-bold text-maroon bg-maroon/10 px-2 py-1 rounded-full">
                    {project.durationMonths}M
                  </div>
                  <div className="w-0.5 h-6 bg-gradient-to-b from-maroon/30 to-maroon" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                </div>

                <div className="flex-1 text-right">
                  <div className="text-xs uppercase tracking-wider text-text/50 font-medium mb-1">
                    Completion
                  </div>
                  <div className="text-sm font-semibold text-text">
                    {project.endDate}
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-3 mb-6">
              <div className="text-xs uppercase tracking-wider text-text/50 font-medium">
                Key Highlights
              </div>
              <div className="flex flex-wrap gap-2">
                {project.highlights.map((highlight: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-text/5 text-text/70 text-xs rounded-lg border border-text/10 hover:bg-maroon/5 hover:border-maroon/30 transition-all"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* Area Info */}
            <div className="mt-6 pt-6 border-t border-text/10">
              <div className="flex items-center justify-between">
                <span className="text-text/60 text-xs uppercase tracking-wider font-medium">
                  Built Area
                </span>
                <span className="text-text font-bold text-sm">
                  {project.area}
                </span>
              </div>
            </div>
          </div>

          {/* Hover Glow */}
          <motion.div
            animate={{ opacity: isHovered ? 0.08 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-br from-accent/20 to-maroon/20 pointer-events-none"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);

  // Memoize to prevent unnecessary recalculations
  const memoizedProjects = useMemo(() => PROJECTS, []);

  return (
    <section className="relative w-full bg-primary py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/assets/textures/concrete-abstract.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - No animation on page load */}
        <div className="mb-20 lg:mb-28 text-center">
          <div className="mb-6">
            <span className="text-accent text-sm tracking-0.3em uppercase font-medium">
              Our Portfolio
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-text mb-6 leading-tight">
            Transforming{" "}
            <span className="block text-maroon">Mumbai's Skyline</span>
          </h2>
          <p className="text-text/60 text-lg md:text-xl max-w-2xl mx-auto">
            From concept to completion, each project represents our commitment
            to excellence, innovation, and sustainable urban development.
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {memoizedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isHovered={hoveredProjectId === project.id}
              onHover={setHoveredProjectId}
              onLeave={() => setHoveredProjectId(null)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
