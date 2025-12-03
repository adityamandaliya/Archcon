"use client";

import { useState, useMemo } from "react";
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

export default function UpdatesSection() {
  const [carouselIndices, setCarouselIndices] = useState<CarouselState>(
    Object.fromEntries(UPDATES.map((update) => [update.id, 0]))
  );
  const [hoveredUpdateId, setHoveredUpdateId] = useState<number | null>(null);

  // Animation variants
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

    setCarouselIndices((prev) => ({
      ...prev,
      [updateId]: newIndex,
    }));
  };

  const memoizedUpdates = useMemo(() => UPDATES, []);

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
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-text mb-6 leading-tight"
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

        {/* Updates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8 lg:space-y-12"
        >
          {memoizedUpdates.map((update) => {
            const currentImageIndex = carouselIndices[update.id] || 0;
            const currentImage = update.images[currentImageIndex];
            const categoryConfig = CATEGORY_CONFIG[update.category];

            return (
              <motion.div
                key={update.id}
                variants={cardVariants}
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
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
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
                      className="lg:col-span-2 relative h-80 lg:h-96 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 order-first lg:order-last"
                    >
                      {/* Image Stack */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${update.id}-${currentImageIndex}`}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={currentImage.url}
                            alt={currentImage.alt}
                            fill
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
                            onClick={() => handleCarouselNav(update.id, "prev")}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 text-white transition-all duration-300 group-hover:bg-white/50"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </motion.button>

                          <motion.button
                            onClick={() => handleCarouselNav(update.id, "next")}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm border border-white/30 text-white transition-all duration-300 group-hover:bg-white/50"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ChevronRight className="w-5 h-5" />
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

                  {/* Card Border Glow Effect on Hover */}
                  <motion.div
                    animate={{
                      opacity: hoveredUpdateId === update.id ? 0.1 : 0,
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-maroon via-accent to-maroon rounded-3xl pointer-events-none"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
