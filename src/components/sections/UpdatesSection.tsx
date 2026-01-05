"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { UPDATES, Update, UpdateImage } from "@/lib/updates";
import { Variants } from "framer-motion";

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
const UpdatesImage = ({ src, alt, className, priority }: { src: string|null|undefined, alt: string, className?: string, priority?: boolean }) => {
  const DEFAULT_IMAGE = "/images/updates/default.png";
  const [imgSrc, setImgSrc] = useState(src && src.trim() !== "" ? src : DEFAULT_IMAGE);

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
  const [carouselIndices, setCarouselIndices] = useState<CarouselState>(
    Object.fromEntries(UPDATES.map((update) => [update.id, 0])) as unknown as CarouselState
  );
  const [carouselDirections, setCarouselDirections] = useState<CarouselState>(
    Object.fromEntries(UPDATES.map((update) => [update.id, 0])) as unknown as CarouselState
  );
  const [hoveredUpdateId, setHoveredUpdateId] = useState<number | null>(null);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };

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

  // Handle carousel navigation
  const handleCarouselNav = (updateId: number, direction: "prev" | "next") => {
    const update = UPDATES.find((u) => u.id === updateId);
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const UPDATES_PER_PAGE = 5;

  const memoizedUpdates = useMemo(() => UPDATES, []);

  // Calculate pagination values
  const totalPages = Math.ceil(memoizedUpdates.length / UPDATES_PER_PAGE);
  const displayedUpdates = useMemo(() => {
    const startIndex = (currentPage - 1) * UPDATES_PER_PAGE;
    return memoizedUpdates.slice(startIndex, startIndex + UPDATES_PER_PAGE);
  }, [currentPage, memoizedUpdates]);

  // Scroll to top of window when page changes (with delay for layout shift)
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="relative w-full bg-primary py-24 lg:py-32 overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* Header */}
        {currentPage === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-accent font-sans text-sm font-semibold tracking-widest mb-4"
            >
               LATEST NEWS & UPDATES
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-7xl font-serif font-bold text-text mb-6 leading-tight"
            >
              Stay Updated
              <motion.span className="block text-maroon">
                with Archcon
              </motion.span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-text/60 text-lg md:text-xl max-w-2xl mx-auto font-light"
            >
              Discover the latest milestones, project updates, and announcements
              from Archcon as we continue to shape Mumbai's urban landscape.
            </motion.p>
          </motion.div>
        )}

        {/* Updates Grid */}
        <div id="updates-grid" className="scroll-mt-32">
          <div
            className="space-y-8 lg:space-y-12 mb-16"
          >
            {displayedUpdates.map((update) => {
              const currentImageIndex = carouselIndices[update.id] || 0;
              const currentImage = update.images[currentImageIndex];
              const categoryConfig = CATEGORY_CONFIG[update.category];

              return (
                <div
                  key={update.id}
                  onMouseEnter={() => setHoveredUpdateId(update.id)}
                  onMouseLeave={() => setHoveredUpdateId(null)}
                  className="group relative"
                >
                  {/* Card Container */}
                  <motion.div
                    animate={{
                      boxShadow:
                        hoveredUpdateId === update.id
                          ? "0 20px 60px rgba(0,0,0,0.15)"
                          : "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white rounded-3xl overflow-hidden border border-accent/30 hover:border-accent/50 backdrop-blur-sm"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 items-stretch">

                      {/* Image Carousel Section (Right on Desktop, Top on Mobile) */}
                      <motion.div
                        animate={{
                          scale: hoveredUpdateId === update.id ? 1.02 : 1,
                        }}
                        transition={{
                          duration: 0.4,
                          type: "spring",
                          stiffness: 300,
                        }}
                        className="lg:col-span-2 relative h-80 lg:h-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 order-first lg:order-last flex"

                      >
                        {/* Image Stack */}
                        <AnimatePresence mode="popLayout" custom={carouselDirections[update.id] || 0}>
                          <motion.div
                            key={`${update.id}-${currentImageIndex}`}
                            custom={carouselDirections[update.id] || 0}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                              x: { type: "spring", stiffness: 300, damping: 30 },
                              opacity: { duration: 0.3 }
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
                              src={currentImage.url}
                              alt={currentImage.alt}
                              className="object-cover"
                              priority={false}
                            />
                            {/* Image Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.div>
                        </AnimatePresence>

                        {/* Carousel Navigation Dots - Bottom */}
                        {update.images.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                            {update.images.map((_, idx) => (
                              <motion.button
                                key={idx}
                                onClick={() => {
                                  setCarouselIndices((prev) => ({
                                    ...prev,
                                    [update.id]: idx,
                                  }));
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  idx === currentImageIndex
                                    ? "bg-white w-8"
                                    : "bg-white/50 w-2 hover:bg-white/80"
                                }`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Carousel Arrow Navigation - Sides */}
                        {update.images.length > 1 && (
                          <>
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCarouselNav(update.id, "prev");
                              }}
                              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-black/50 transition-all duration-300 hidden md:flex items-center justify-center"
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
                              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-black/50 transition-all duration-300 hidden md:flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label="Next image"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </motion.button>
                          </>
                        )}

                        {/* Image Counter */}
                        {update.images.length > 1 && (
                          <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold">
                            {currentImageIndex + 1} / {update.images.length}
                          </div>
                        )}
                      </motion.div>

                      {/* Content Section (Left on Desktop, Bottom on Mobile) */}
                      <div className="lg:col-span-3 p-8 md:p-10 lg:p-12 flex flex-col justify-between order-last lg:order-first">
                        {/* Top Section: Date and Category */}
                        <div>
                          {/* Date */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex items-center gap-2 mb-4"
                          >
                            <Calendar className="w-4 h-4 text-accent" />
                            <span className="text-sm font-semibold text-accent tracking-wide">
                              {update.dateFormatted}
                            </span>
                          </motion.div>

                          {/* Category Badge */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="flex items-center gap-2 mb-6"
                          >
                            <div
                              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${categoryConfig.badge}`}
                            >
                              <Tag className="w-3 h-3" />
                              {categoryConfig.label}
                            </div>
                          </motion.div>

                          {/* Heading */}
                          <motion.h3
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-3xl md:text-4xl font-serif font-bold text-text mb-4 leading-tight"
                          >
                            {update.heading}
                          </motion.h3>

                          {/* Description */}
                          <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="text-text/70 text-base md:text-lg leading-relaxed max-w-xl"
                          >
                            {update.description}
                          </motion.p>
                        </div>

                        {/* Bottom Section: Image Info and CTA */}
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          className="mt-8 pt-6 border-t border-gray-200"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-text/60">
                              <span className="font-semibold">
                                {update.images.length}
                              </span>{" "}
                              images
                            </div>
                          </div>
                        </motion.div>
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
          <div 
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
          </div>
        )}
      </div>
    </section>
  );
}
