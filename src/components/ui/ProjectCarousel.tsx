"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
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
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-cover object-top"
              quality={75}
            />
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
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 hover:bg-black/50 transition-all z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 hover:bg-black/50 transition-all z-10"
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
