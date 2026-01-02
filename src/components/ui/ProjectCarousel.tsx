"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectImage from "./ProjectImage";

interface ProjectCarouselProps {
  images: string[];
  title: string;
  onImageClick?: () => void;
  isHovered: boolean;
}

export default function ProjectCarousel({
  images,
  title,
  onImageClick,
  isHovered,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-full w-full group/carousel">
      <div 
        className="relative h-56 overflow-hidden bg-neutral-100 cursor-pointer"
        onClick={onImageClick}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: isHovered ? 1.05 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const swipeThreshold = 50;
              if (info.offset.x > swipeThreshold) {
                prevImage();
              } else if (info.offset.x < -swipeThreshold) {
                nextImage();
              }
            }}
            className="absolute inset-0 overflow-hidden touch-none"
          >
            {/* Blurred Background Layer - Fills the space */}
            <div className="absolute inset-0">
              <ProjectImage
                src={images[currentIndex]}
                alt=""
                fill
                className="object-cover blur-2xl scale-110 opacity-50"
                priority={currentIndex === 0}
              />
            </div>

            {/* Main Image Layer - Shows the full image */}
            <div className="absolute inset-0">
              <ProjectImage
                src={images[currentIndex]}
                alt={`${title} - Image ${currentIndex + 1}`}
                fill
                className="object-contain relative z-10 p-0"
                quality={85}
                priority={currentIndex === 0}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Navigation Arrows - Only show if >1 image and hovered */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 hover:bg-black/50 transition-all z-10 hidden md:block"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 hover:bg-black/50 transition-all z-10 hidden md:block"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-white w-3"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
