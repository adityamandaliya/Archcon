"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Project } from "@/lib/projects";
import ProjectCarousel from "@/components/ui/ProjectCarousel";
import Lightbox from "@/components/ui/Lightbox";

const TYPE_BADGES: Record<string, string> = {
  Residential: "bg-blue-100 text-blue-700",
  Commercial: "bg-amber-100 text-amber-700",
  Industrial: "bg-slate-100 text-slate-700",
  "Resi.+Commercial": "bg-indigo-100 text-indigo-700",
  "Resi./Comm./Rowhouse": "bg-purple-100 text-purple-700",
};

const STATUS_CONFIG: Record<string, { text: string; color: string }> = {
  Completed: { text: "✓ Completed", color: "text-green-600 bg-green-50" },
  "In Progress": { text: "○ In Progress", color: "text-amber-600 bg-amber-50" },
  Upcoming: { text: "◆ Upcoming", color: "text-slate-700 bg-slate-100" },
};

interface ProjectUpdateCardProps {
  project: Project;
}

export default function ProjectUpdateCard({ project }: ProjectUpdateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const typeBadgeClass =
    TYPE_BADGES[project.type] || "bg-blue-100 text-blue-700";
  const statusConfig =
    STATUS_CONFIG[project.status] || {
      text: project.status,
      color: "text-slate-700 bg-slate-100",
    };

  const carouselImages =
    project.images && project.images.length > 0 && project.images[0] !== ""
      ? project.images
      : project.image && project.image !== ""
      ? [project.image]
      : ["/images/projects/default_project.png"];

  return (
    <>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group h-full flex flex-col w-full"
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.02 : 1,
            boxShadow: isHovered
              ? "0 20px 40px rgba(0,0,0,0.12)"
              : "0 8px 24px rgba(0,0,0,0.06)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-text/10 hover:border-accent/40 transition-colors duration-300"
        >
          {/* Top Image / Carousel */}
          <div className="relative h-48 sm:h-56 overflow-hidden bg-text/5 flex-shrink-0">
            <ProjectCarousel
              images={carouselImages}
              title={project.title}
              isHovered={isHovered}
              onImageClick={() => setLightboxOpen(true)}
            />

            {/* Type Badge */}
            <div
              className={`absolute top-3 left-3 sm:top-4 sm:left-4 z-20 max-w-[48%] truncate px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${typeBadgeClass} pointer-events-none shadow-sm`}
            >
              {project.type}
            </div>

            {/* Status Badge */}
            <div
              className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-20 max-w-[48%] truncate text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg backdrop-blur-md shadow-sm pointer-events-none ${statusConfig.color}`}
            >
              {statusConfig.text}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1 justify-between">
            <div>
              {/* Location */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                <span className="text-text/60 text-xs sm:text-sm font-medium line-clamp-1">
                  {project.location}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-text mb-2 sm:mb-3 leading-tight group-hover:text-maroon transition-colors line-clamp-2">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-text/70 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Pinned Updates Button */}
            <div className="pt-3 sm:pt-4 border-t border-text/10 mt-auto">
              <Link
                href={`/updates/${project.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 sm:px-5 rounded-xl bg-maroon text-white font-semibold text-xs sm:text-sm hover:bg-maroon/90 transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                <span>Updates</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Lightbox Modal */}
      <Lightbox
        images={carouselImages}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={project.title}
      />
    </>
  );
}
