"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
        onClick={onClose} // Close on backdrop click
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        {title && (
            <div className="absolute top-6 left-6 text-white z-50">
                <h3 className="text-xl font-serif font-bold tracking-wide">{title}</h3>
                <p className="text-sm text-white/60 mt-1">{currentIndex + 1} / {images.length}</p>
            </div>
        )}

        {/* Main Image Container */}
        <div 
            className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
            onClick={(e) => e.stopPropagation()} // Prevent close on image click
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh]"
            >
              {images[currentIndex] && (
                <Image
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
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </>
        )}

        {/* Thumbnails (Optional strip at bottom) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] p-2 hide-scrollbar z-50" onClick={(e) => e.stopPropagation()}>
            {images.map((img, idx) => (
                <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-16 h-10 flex-shrink-0 rounded-md overflow-hidden transition-all ${
                        idx === currentIndex ? "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-100"
                    }`}
                >
                    <Image src={img} alt="thumb" fill className="object-cover" sizes="64px" />
                </button>
            ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
