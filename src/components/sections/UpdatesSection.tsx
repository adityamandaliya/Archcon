"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { UPDATES, Update } from "@/lib/updates";
import { PROJECTS } from "@/lib/projects";
import ProjectUpdateCard from "@/components/ui/ProjectUpdateCard";
import Lightbox from "@/components/ui/Lightbox";

const CATEGORY_CONFIG = {
  milestone: {
    label: "Milestone",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    badge: "bg-purple-100 text-purple-700",
  },
  project: {
    label: "Project",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
  },
  announcement: {
    label: "Announcement",
    color: "from-amber-500 to-amber-600",
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
  },
  news: {
    label: "News",
    color: "from-green-500 to-green-600",
    bg: "bg-green-50",
    badge: "bg-green-100 text-green-700",
  },
};

interface CarouselState {
  [key: number]: number;
}

// Helper component for handling image fallbacks
export const UpdatesImage = ({
  src,
  alt,
  className,
  priority,
}: {
  src: string | null | undefined;
  alt: string;
  className?: string;
  priority?: boolean;
}) => {
  const DEFAULT_IMAGE = "/images/updates/default.png";
  const [imgSrc, setImgSrc] = useState(
    src && src.trim() !== "" ? src : DEFAULT_IMAGE
  );

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      priority={priority}
      onError={() => setImgSrc(DEFAULT_IMAGE)}
    />
  );
};

export default function UpdatesSection() {
  // Filter projects where status is "Upcoming" or "In progress"
  const activeProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const status = project.status.toLowerCase().trim();
      return status === "upcoming" || status === "in progress";
    });
  }, []);

  return (
    <section className="relative w-full bg-primary py-24 lg:py-32 overflow-hidden">
      {/* Background Grid Pattern */}
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
      {/* Background Blur Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-maroon/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-accent font-sans text-xs sm:text-sm font-semibold tracking-widest mb-3 uppercase"
          >
            LATEST NEWS & UPDATES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-text mb-4 sm:mb-6 leading-tight"
          >
            Stay Updated
            <motion.span className="block text-maroon">
              with Archcon
            </motion.span>
          </motion.h2>

        </motion.div>

        {/* Project Cards Grid */}
        {activeProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-16 sm:mb-24"
          >
            {/* Responsive flex layout (1 col mobile, 2 cols tablet, max 3 cols desktop, centered when < 3) */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 items-stretch">
              {activeProjects.map((project) => (
                <div
                  key={project.id}
                  className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm sm:max-w-md md:max-w-none flex flex-col"
                >
                  <ProjectUpdateCard project={project} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// Reusable Project Updates Feed component matching UpdatesSection UI & animations exactly
export function ProjectUpdatesFeed({ updatesList }: { updatesList: Update[] }) {
  const [carouselIndices, setCarouselIndices] = useState<CarouselState>(
    Object.fromEntries(updatesList.map((update) => [update.id, 0])) as unknown as CarouselState
  );
  const [carouselDirections, setCarouselDirections] = useState<CarouselState>(
    Object.fromEntries(updatesList.map((update) => [update.id, 0])) as unknown as CarouselState
  );
  const [hoveredUpdateId, setHoveredUpdateId] = useState<number | null>(null);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxTitle, setLightboxTitle] = useState("");
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);

  const handleOpenLightbox = (update: Update, initialIdx: number = 0) => {
    const validImages = update.images
      .map((img) => img.url)
      .filter((url) => url && url.trim() !== "");
    if (validImages.length > 0) {
      setLightboxImages(validImages);
      setLightboxTitle(update.heading);
      setLightboxInitialIndex(initialIdx);
      setLightboxOpen(true);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const handleCarouselNav = (updateId: number, direction: "prev" | "next") => {
    const update = updatesList.find((u) => u.id === updateId);
    if (!update) return;

    const currentIndex = carouselIndices[updateId] || 0;
    const totalImages = update.images.length;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % totalImages;
    } else {
      newIndex = (currentIndex - 1 + totalImages) % totalImages;
    }

    setCarouselDirections((prev) => ({
      ...prev,
      [updateId]: direction === "next" ? 1 : -1,
    }));

    setCarouselIndices((prev) => ({
      ...prev,
      [updateId]: newIndex,
    }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const UPDATES_PER_PAGE = 5;

  const memoizedUpdates = useMemo(() => updatesList, [updatesList]);
  const totalPages = Math.ceil(memoizedUpdates.length / UPDATES_PER_PAGE);

  const displayedUpdates = useMemo(() => {
    const startIndex = (currentPage - 1) * UPDATES_PER_PAGE;
    return memoizedUpdates.slice(startIndex, startIndex + UPDATES_PER_PAGE);
  }, [currentPage, memoizedUpdates]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById("updates-feed-grid");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentPage]);

  if (updatesList.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-accent/20 text-center max-w-2xl mx-auto shadow-sm">
        <p className="text-text/70 text-base sm:text-lg font-serif font-medium mb-2">
          No specific updates posted yet.
        </p>
        <p className="text-text/50 text-xs sm:text-sm">
          Please check back soon for progress photos, structural milestones, and announcements!
        </p>
      </div>
    );
  }

  return (
    <div>
      <div id="updates-feed-grid" className="scroll-mt-32">
        <div className="space-y-6 sm:space-y-8 lg:space-y-12 mb-12 sm:mb-16">
          {displayedUpdates.map((update) => {
            const currentImageIndex = carouselIndices[update.id] || 0;
            const currentImage = update.images[currentImageIndex];
            const categoryConfig =
              CATEGORY_CONFIG[update.category] || CATEGORY_CONFIG.project;

            return (
              <div
                key={update.id}
                onMouseEnter={() => setHoveredUpdateId(update.id)}
                onMouseLeave={() => setHoveredUpdateId(null)}
                className="group relative"
              >
                <motion.div
                  animate={{
                    boxShadow:
                      hoveredUpdateId === update.id
                        ? "0 20px 60px rgba(0,0,0,0.15)"
                        : "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-accent/30 hover:border-accent/50 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 items-stretch">
                    {/* Image Carousel Section */}
                    <motion.div
                      animate={{
                        scale: hoveredUpdateId === update.id ? 1.01 : 1,
                      }}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 300,
                      }}
                      onClick={() => handleOpenLightbox(update, currentImageIndex)}
                      className="lg:col-span-2 relative h-64 sm:h-80 lg:h-full min-h-[220px] sm:min-h-[280px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 order-first lg:order-last flex cursor-pointer"
                    >
                      <AnimatePresence
                        mode="popLayout"
                        custom={carouselDirections[update.id] || 0}
                      >
                        <motion.div
                          key={`${update.id}-${currentImageIndex}`}
                          custom={carouselDirections[update.id] || 0}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 },
                          }}
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.2}
                          onDragEnd={(_, info) => {
                            const swipeThreshold = 50;
                            if (info.offset.x > swipeThreshold) {
                              handleCarouselNav(update.id, "prev");
                            } else if (info.offset.x < -swipeThreshold) {
                              handleCarouselNav(update.id, "next");
                            }
                          }}
                          className="relative w-full h-full touch-none"
                        >
                          <UpdatesImage
                            src={currentImage?.url}
                            alt={currentImage?.alt || update.heading}
                            className="object-cover"
                            priority={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                      </AnimatePresence>

                      {/* Dots Indicator */}
                      {update.images.length > 1 && (
                        <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
                          {update.images.map((_, idx) => (
                            <motion.button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCarouselIndices((prev) => ({
                                  ...prev,
                                  [update.id]: idx,
                                }));
                              }}
                              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                                idx === currentImageIndex
                                  ? "bg-white w-6 sm:w-8"
                                  : "bg-white/50 w-1.5 sm:w-2 hover:bg-white/80"
                              }`}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.95 }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Arrows Navigation */}
                      {update.images.length > 1 && (
                        <>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCarouselNav(update.id, "prev");
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-80 sm:opacity-0 group-hover:opacity-100 hover:bg-black/60 transition-all duration-300 flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </motion.button>

                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCarouselNav(update.id, "next");
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-80 sm:opacity-0 group-hover:opacity-100 hover:bg-black/60 transition-all duration-300 flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </motion.button>
                        </>
                      )}

                      {/* Counter */}
                      {update.images.length > 1 && (
                        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white text-[11px] sm:text-xs font-semibold">
                          {currentImageIndex + 1} / {update.images.length}
                        </div>
                      )}
                    </motion.div>

                    {/* Content Section */}
                    <div className="lg:col-span-3 p-5 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between order-last lg:order-first">
                      <div>
                        {/* Date */}
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                          <span className="text-xs sm:text-sm font-semibold text-accent tracking-wide">
                            {update.dateFormatted}
                          </span>
                        </div>

                        {/* Category Badge */}
                        <div className="flex items-center gap-2 mb-4 sm:mb-6">
                          <div
                            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold ${categoryConfig.badge}`}
                          >
                            <Tag className="w-3 h-3" />
                            {categoryConfig.label}
                          </div>
                        </div>

                        {/* Heading */}
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-text mb-3 sm:mb-4 leading-tight">
                          {update.heading}
                        </h3>

                        {/* Description */}
                        <p className="text-text/70 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                          {update.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="text-xs sm:text-sm text-text/60">
                            <span className="font-semibold">
                              {update.images.length}
                            </span>{" "}
                            {update.images.length === 1 ? "image" : "images"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 sm:gap-4 relative z-20 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
              currentPage === 1
                ? "border-text/10 text-text/30 cursor-not-allowed"
                : "border-text/20 text-text hover:border-maroon hover:text-maroon hover:bg-maroon/5"
            }`}
          >
            PREVIOUS
          </button>

          <div className="flex items-center gap-1 sm:gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center ${
                  currentPage === page
                    ? "bg-maroon text-white shadow-lg scale-105 sm:scale-110"
                    : "text-text/60 hover:bg-text/5"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
              currentPage === totalPages
                ? "border-text/10 text-text/30 cursor-not-allowed"
                : "border-text/20 text-text hover:border-maroon hover:text-maroon hover:bg-maroon/5"
            }`}
          >
            NEXT
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxInitialIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={lightboxTitle}
      />
    </div>
  );
}
