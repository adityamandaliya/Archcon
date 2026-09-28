"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, Maximize2 } from "lucide-react";
import ProjectImage from "./ProjectImage";
import { useImageZoom } from "@/hooks/useImageZoom";

export interface ProjectCarouselProps {
  images: string[];
  title: string;
  onImageClick?: () => void;
  isHovered: boolean;
  /** Minimum zoom scale (default: 1) */
  minZoom?: number;
  /** Maximum zoom scale (default: 3.5) */
  maxZoom?: number;
  /** Zoom scale on double-tap (default: 2.2) */
  doubleTapZoom?: number;
}

export default function ProjectCarousel({
  images,
  title,
  onImageClick,
  isHovered,
  minZoom = 1,
  maxZoom = 3.5,
  doubleTapZoom = 2.2,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const {
    containerRef,
    scale,
    isZoomed,
    resetZoom,
    transformStyle,
  } = useImageZoom({
    minScale: minZoom,
    maxScale: maxZoom,
    doubleTapScale: doubleTapZoom,
    // Keep page scroll intact on desktop wheel while hovering card
    enableWheel: false,
    enablePinch: true,
    enableDoubleTap: true,
    onSwipeNext: nextImage,
    onSwipePrev: prevImage,
  });

  // Reset zoom on slide change
  useEffect(() => {
    resetZoom(false);
  }, [currentIndex, resetZoom]);

  const handleNextClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    resetZoom(false);
    nextImage();
  };

  const handlePrevClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    resetZoom(false);
    prevImage();
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only open lightbox if not actively zoomed in and examining details
    if (isZoomed) {
      e.stopPropagation();
      return;
    }
    onImageClick?.();
  };

  return (
    <div className="relative h-full w-full group/carousel select-none">
      <div
        ref={containerRef}
        data-zoom-container="true"
        className="relative h-56 overflow-hidden bg-neutral-100 cursor-pointer touch-none"
        onClick={handleCardClick}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: isHovered && !isZoomed ? 1.05 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 overflow-hidden flex items-center justify-center"
          >
            {/* Blurred Background Layer */}
            <div className="absolute inset-0 pointer-events-none">
              <ProjectImage
                src={images[currentIndex]}
                alt=""
                fill
                className="object-cover blur-2xl scale-110 opacity-50 pointer-events-none"
                priority={currentIndex === 0}
                draggable={false}
              />
            </div>

            {/* Main Scalable & Click-Draggable Image Layer */}
            <div
              style={transformStyle}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <ProjectImage
                src={images[currentIndex]}
                alt={`${title} - Image ${currentIndex + 1}`}
                fill
                className="object-contain relative z-10 p-0 pointer-events-none select-none"
                quality={85}
                priority={currentIndex === 0}
                draggable={false}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Overlay gradient when not zoomed */}
        {!isZoomed && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}

        {/* Zoom Status & Control Pill when zoomed */}
        {isZoomed && (
          <div
            className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 text-white backdrop-blur-md border border-white/20 shadow-lg text-[11px] font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            <span>{Math.round(scale * 100)}%</span>
            <button
              onClick={() => resetZoom(true)}
              className="p-1 rounded-full hover:bg-white/20 active:scale-95 transition-all text-accent"
              title="Reset zoom"
              aria-label="Reset zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
            <button
              onClick={() => onImageClick?.()}
              className="p-1 rounded-full hover:bg-white/20 active:scale-95 transition-all text-white/90"
              title="Open full-screen carousel"
              aria-label="Open full-screen carousel"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Arrows - Only show if >1 image, hovered, and not zoomed */}
      {images.length > 1 && !isZoomed && (
        <>
          <button
            onClick={handlePrevClick}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 hover:bg-black/50 transition-all z-10 hidden md:block"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextClick}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 text-white backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 hover:bg-black/50 transition-all z-10 hidden md:block"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10 pointer-events-none">
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
