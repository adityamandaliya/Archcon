"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Project } from "@/lib/projects";
import { UPDATES } from "@/lib/updates";
import ProjectImage from "@/components/ui/ProjectImage";
import ProjectCarousel from "@/components/ui/ProjectCarousel";
import Lightbox from "@/components/ui/Lightbox";

const TYPE_BADGES: Record<string, string> = {
  Residential: "bg-blue-100 text-blue-700",
  Commercial: "bg-amber-100 text-amber-700",
  Industrial: "bg-slate-100 text-slate-700",
  "Resi.+Commercial": "bg-indigo-100 text-indigo-700",
  "Resi./Comm./Rowhouse": "bg-purple-100 text-purple-700",
};

interface ProjectUpdateCardProps {
  project: Project;
}

export default function ProjectUpdateCard({ project }: ProjectUpdateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Extract first image from each update post belonging to this project (without deduplication so each update contributes an image)
  const projectUpdates = UPDATES.filter((u) => u.projectId === project.id);
  const updateImages = projectUpdates
    .map((u) => u.images?.[0]?.url)
    .filter((url): url is string => Boolean(url && url.trim() !== ""))
    .slice(0, 3);

  const typeBadgeClass =
    TYPE_BADGES[project.type] || "bg-blue-100 text-blue-700";

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

            {/* Company Badge */}
            {project.company && project.company.trim() !== "" && (
              <div className="absolute top-0 right-0 z-20 bg-accent text-white px-4 py-2 rounded-bl-2xl font-sans text-xs font-bold tracking-widest shadow-lg">
                {project.company}
              </div>
            )}
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
            <div className="pt-3 sm:pt-4 border-t border-text/10 mt-auto flex items-center justify-center">
              <Link
                href={`/updates/${project.id}`}
                className="group/btn relative inline-flex items-center justify-between gap-3 bg-maroon text-white px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-full overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-maroon/30 hover:scale-[1.02] w-full max-w-[230px] sm:max-w-[240px]"
              >
                {/* Button Text */}
                <span className="text-sm sm:text-base font-semibold tracking-wide relative z-10 flex-shrink-0">
                  Updates
                </span>

                {/* Right Side: Circular Images + Arrow Container */}
                <div className="relative flex items-center gap-1.5 sm:gap-2 z-10 flex-shrink-0">
                  {/* Circular Images Stack (Displays whatever images are available: 1, 2, or up to 3) */}
                  {updateImages.length > 0 && (
                    <div className="relative flex items-center h-8 sm:h-9">
                      {updateImages.slice(0, 3).map((imgUrl, idx) => {
                        const delayClasses = ["", "delay-75", "delay-100"];
                        const marginClasses = ["", "-ml-2.5 sm:-ml-3", "-ml-2.5 sm:-ml-3"];
                        return (
                          <div
                            key={idx}
                            className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-white shadow-lg transition-transform duration-300 ${marginClasses[idx]} ${delayClasses[idx]} group-hover/btn:-translate-x-0.5`}
                          >
                            <ProjectImage
                              src={imgUrl}
                              alt={`${project.title} Update ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Arrow - Slides out on hover */}
                  <div className="relative overflow-hidden">
                    <div className="flex items-center justify-center w-0 h-8 sm:h-9 rounded-full bg-white/20 backdrop-blur-sm transition-all duration-400 ease-out group-hover/btn:w-8 sm:group-hover/btn:w-9 opacity-0 group-hover/btn:opacity-100">
                      <ArrowRight className="h-4 w-4 text-white -translate-x-2 group-hover/btn:translate-x-0 transition-transform duration-300 delay-100" />
                    </div>
                  </div>
                </div>

                {/* Shimmer Effect on Hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 pointer-events-none"
                  style={{ width: "50%" }}
                />
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
