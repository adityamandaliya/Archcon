
"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { PROJECTS, Project } from "@/lib/projects";
import { Variants } from "framer-motion";
import ProjectCarousel from "@/components/ui/ProjectCarousel";
import Lightbox from "@/components/ui/Lightbox";

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

// Animation variants matching UpdatesSection pattern
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Card variants with slide-in from bottom
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function ProjectCard({ project, isHighlighted, isHovered, onHover, onLeave, onOpenLightbox }: any) {
  const typeColor = TYPE_COLORS[project.type as keyof typeof TYPE_COLORS];
  const statusConfig =
    STATUS_CONFIG[project.status as keyof typeof STATUS_CONFIG];

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onLeave()}
      className="group h-full cursor-pointer"
      style={{ willChange: "transform, opacity" }}
    >
      <motion.div
          animate={{
    scale: isHovered || isHighlighted ? 1.05 : 1,
    filter: isHovered || isHighlighted
      ? "drop-shadow(0 20px 60px rgba(0,0,0,0.15))"
      : "drop-shadow(0 10px 30px rgba(0,0,0,0.08))",
  }}
  transition={{
    duration: 0.3,
    type: "tween",
    ease: "easeOut",
  }}
       
        className="h-full relative"
      >
        {/* Highlight Glow Effect */}
        {isHighlighted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -inset-[3px] bg-gradient-to-r from-maroon via-accent to-maroon rounded-2xl z-0 blur-sm animate-pulse"
          />
        )}
        
        <div className={`relative h-full rounded-2xl overflow-hidden bg-white hover:border-accent/30 transition-colors duration-300 ${isHighlighted ? 'border-transparent z-10' : 'border-text/10 border'}`}>
          {/* Carousel Image Area */}
          <div className="relative h-56 overflow-hidden bg-text/5">
             <ProjectCarousel 
                images={project.images && project.images.length > 0 ? project.images : [project.image]}
                title={project.title}
                isHovered={isHovered}
                onImageClick={() => onOpenLightbox(project.id)}
             />
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-100 text-blue-700 pointer-events-none">
            {project.type}
          </div>
          <div className="absolute top-4 right-4 z-20 text-xs font-medium text-green-600 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm pointer-events-none">
            {statusConfig.text}
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8" onClick={() => onOpenLightbox(project.id)}>
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
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
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="text-2xl font-serif font-bold text-text mb-4 leading-tight group-hover:text-maroon transition-colors"
            >
              {project.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-text/70 text-sm leading-relaxed mb-6"
            >
              {project.description}
            </motion.p>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              viewport={{ once: true }}
              className="space-y-4 mb-6 pb-6 border-b border-text/10"
            >
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
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-3 mb-6"
            >
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
            </motion.div>

            {/* Area Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              viewport={{ once: true }}
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

          {/* Hover Glow - matching UpdatesSection */}
          <motion.div
            animate={{ opacity: isHovered ? 0.1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <Suspense fallback={<div className="h-screen bg-primary" />}>
      <ProjectsContent />
    </Suspense>
  );
}

function ProjectsContent() {
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxTitle, setLightboxTitle] = useState("");
  
  const PROJECTS_PER_PAGE = 6;
  
  const searchParams = useSearchParams();

  // Handle Deep Linking
  useEffect(() => {
    const projectIdParam = searchParams.get("projectId");
    if (projectIdParam) {
      const projectId = parseInt(projectIdParam);
      const projectIndex = PROJECTS.findIndex(p => p.id === projectId);
      
      if (projectIndex !== -1) {
        // Calculate which page this project is on
        const targetPage = Math.ceil((projectIndex + 1) / PROJECTS_PER_PAGE);
        setCurrentPage(targetPage);
        setHighlightedId(projectId);
        
        // Scroll to grid after a short delay to allow rendering
        setTimeout(() => {
          const gridElement = document.getElementById('projects-grid');
          if (gridElement) {
            gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);

        // Clear highlight after 2.5 seconds
        setTimeout(() => {
          setHighlightedId(null);
        }, 2500);
      }
    }
  }, [searchParams]);

  // Memoize to prevent unnecessary recalculations
  const memoizedProjects = useMemo(() => PROJECTS, []);

  // Calculate pagination values
  const totalPages = Math.ceil(memoizedProjects.length / PROJECTS_PER_PAGE);
  
  const displayedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    return memoizedProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [currentPage, memoizedProjects]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optional: Scroll to top of grid
    const gridElement = document.getElementById('projects-grid');
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenLightbox = (projectId: number) => {
    const project = PROJECTS.find(p => p.id === projectId);
    if (project) {
        const rawImages = project.images && project.images.length > 0 ? project.images : [project.image];
        const validImages = rawImages.filter(img => img && img.trim() !== "");
        
        if (validImages.length > 0) {
            setLightboxImages(validImages);
            setLightboxTitle(project.title);
            setLightboxOpen(true);
        }
    }
  };

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

      {/* Background Gradient Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-maroon/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with animations matching UpdatesSection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 lg:mb-28 text-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-accent font-sans text-sm font-semibold tracking-widest mb-4"
          >
            OUR PORTFOLIO
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-text mb-6 leading-tight"
          >
            Transforming
            <motion.span className="block text-maroon">
              Mumbai's Skyline
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text/60 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            From concept to completion, each project represents our commitment
            to excellence, innovation, and sustainable urban development.
          </motion.p>
        </motion.div>

        {/* Projects Grid with staggered animations */}
        <div id="projects-grid" className="scroll-mt-32">
          <motion.div
            key={currentPage} // Force re-render animation on page change
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16"
          >
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isHighlighted={highlightedId === project.id}
                isHovered={hoveredProjectId === project.id}
                onHover={setHoveredProjectId}
                onLeave={() => setHoveredProjectId(null)}
                onOpenLightbox={handleOpenLightbox}
              />
            ))}
          </motion.div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-4 relative z-20"
          >
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-6 py-3 rounded-full border text-sm font-semibold tracking-wide transition-all duration-300 ${
                currentPage === 1
                  ? "border-text/10 text-text/30 cursor-not-allowed"
                  : "border-text/20 text-text hover:border-maroon hover:text-maroon hover:bg-maroon/5"
              }`}
            >
              PREVIOUS
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center ${
                    currentPage === page
                      ? "bg-maroon text-white shadow-lg scale-110"
                      : "text-text/60 hover:bg-text/5"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-6 py-3 rounded-full border text-sm font-semibold tracking-wide transition-all duration-300 ${
                currentPage === totalPages
                  ? "border-text/10 text-text/30 cursor-not-allowed"
                  : "border-text/20 text-text hover:border-maroon hover:text-maroon hover:bg-maroon/5"
              }`}
            >
              NEXT
            </button>
          </motion.div>
        )}
      </div>

      <Lightbox 
        images={lightboxImages}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={lightboxTitle}
      />
    </section>
  );
}

