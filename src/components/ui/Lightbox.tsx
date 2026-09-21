"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ProjectImage from "./ProjectImage";

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  title,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      // Disable scrolling on both html and body
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Prevent touch scroll on mobile devices
      const handleTouchMove = (e: TouchEvent) => {
        // Allow touch drag on thumbnail strip if scrolling thumbnails
        const isThumbnailStrip = (e.target as HTMLElement)?.closest(".hide-scrollbar");
        if (!isThumbnailStrip) {
          e.preventDefault();
        }
      };

      document.addEventListener("touchmove", handleTouchMove, { passive: false });

      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        document.removeEventListener("touchmove", handleTouchMove);
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [isOpen, initialIndex]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, nextImage, prevImage, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center select-none"
        onClick={onClose} // Close on backdrop click
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all z-[10000]"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Header Title & Counter */}
        {title && (
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-[calc(100%-80px)] text-white z-[10000] pointer-events-none">
            <h3 className="text-sm sm:text-xl font-serif font-bold tracking-wide truncate">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-0.5">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        )}

        {/* Main Image Container */}
        <div
          className="relative w-full h-full flex items-center justify-center pt-16 pb-20 px-2 sm:p-8 md:p-12 z-[9999]"
          onClick={(e) => e.stopPropagation()} // Prevent close on image click
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
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
              className="relative w-full h-full max-w-6xl max-h-[75vh] sm:max-h-[85vh] touch-none flex items-center justify-center"
            >
              {images[currentIndex] !== undefined && (
                <ProjectImage
                  src={images[currentIndex]}
                  alt={`Image ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  quality={90}
                  priority
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/40 sm:bg-white/10 hover:bg-white/20 active:scale-95 text-white backdrop-blur-sm transition-all z-[10000] flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/40 sm:bg-white/10 hover:bg-white/20 active:scale-95 text-white backdrop-blur-sm transition-all z-[10000] flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </>
        )}

        {/* Thumbnails Strip */}
        <div
          className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 overflow-x-auto max-w-[92vw] p-1.5 hide-scrollbar z-[10000]"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-12 h-8 sm:w-16 sm:h-10 flex-shrink-0 rounded-md overflow-hidden transition-all ${
                idx === currentIndex
                  ? "ring-2 ring-white scale-105 opacity-100"
                  : "opacity-40 hover:opacity-100"
              }`}
            >
              <ProjectImage
                src={img}
                alt="thumb"
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
