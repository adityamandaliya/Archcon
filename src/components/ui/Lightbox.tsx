"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import ProjectImage from "./ProjectImage";
import { useImageZoom, DEFAULT_ZOOM_CONFIG } from "@/hooks/useImageZoom";

export interface LightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  doubleTapZoom?: number;
}

export default function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  title,
  minZoom = DEFAULT_ZOOM_CONFIG.minScale,
  maxZoom = DEFAULT_ZOOM_CONFIG.maxScale,
  zoomStep = DEFAULT_ZOOM_CONFIG.zoomStep,
  doubleTapZoom = DEFAULT_ZOOM_CONFIG.doubleTapScale,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const {
    containerRef,
    imageRef,
    scale,
    isZoomed,
    canZoomIn,
    canZoomOut,
    zoomIn,
    zoomOut,
    resetZoom,
    setZoom,
  } = useImageZoom({
    minScale: minZoom,
    maxScale: maxZoom,
    zoomStep: zoomStep,
    doubleTapScale: doubleTapZoom,
    enableWheel: true,
    enablePinch: true,
    enableDoubleTap: true,
    onSwipeNext: nextImage,
    onSwipePrev: prevImage,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll when open, unlock when closed
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      resetZoom(false);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      resetZoom(false);
    }
  }, [isOpen, initialIndex, resetZoom]);

  // Reset zoom whenever image changes
  useEffect(() => {
    resetZoom(false);
  }, [currentIndex, resetZoom]);

  // Keyboard navigation & zoom shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowRight") {
        if (!isZoomed) nextImage();
      } else if (e.key === "ArrowLeft") {
        if (!isZoomed) prevImage();
      } else if (e.key === "Escape") {
        if (isZoomed) {
          resetZoom(true);
        } else {
          onClose();
        }
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        zoomIn();
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        zoomOut();
      } else if (e.key === "0" || e.key.toLowerCase() === "r") {
        e.preventDefault();
        resetZoom(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isZoomed, nextImage, prevImage, onClose, zoomIn, zoomOut, resetZoom]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center select-none overflow-hidden"
      onClick={() => {
        // Close on backdrop tap only when not zoomed in
        if (!isZoomed) onClose();
      }}
    >
      {/* Full-Screen Zoom Viewport: handles pinch, touch pan, mouse drag, and wheel */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden touch-none"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
          >
            {/* Directly transformed image container (zero React re-renders during active drag/pinch!) */}
            <div
              ref={imageRef}
              className="relative w-full h-full flex items-center justify-center"
            >
              {images[currentIndex] !== undefined && (
                <ProjectImage
                  src={images[currentIndex]}
                  alt={`Image ${currentIndex + 1}`}
                  fill
                  className="object-contain pointer-events-none select-none"
                  quality={90}
                  priority
                  draggable={false}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* -------------------- OVERLAY CONTROLS -------------------- */}

      {/* Close Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-black/60 hover:bg-black/85 active:scale-90 text-white backdrop-blur-md border border-white/20 shadow-2xl transition-transform z-[10000] touch-manipulation cursor-pointer"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Header Title & Counter */}
      {title && (
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-[calc(100%-140px)] sm:max-w-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 shadow-2xl text-white z-[10000] pointer-events-none">
          <h3 className="text-xs sm:text-base font-serif font-bold tracking-wide truncate">
            {title}
          </h3>
          <p className="text-[10px] sm:text-xs text-white/70 mt-0.5 font-sans font-medium">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      )}

      {/* Floating Zoom Controls Toolbar - Hidden on Mobile/Tablet (<1024px), Visible on Desktop */}
      <div
        className="hidden lg:flex absolute top-6 left-1/2 -translate-x-1/2 z-[10000] items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/25 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => zoomOut()}
          disabled={!canZoomOut}
          className={`p-2 rounded-full hover:bg-white/20 active:scale-95 transition-all touch-manipulation cursor-pointer ${
            !canZoomOut ? "opacity-30 cursor-not-allowed" : "opacity-90 hover:opacity-100"
          }`}
          aria-label="Zoom out"
          title="Zoom out (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => {
            if (isZoomed) {
              resetZoom(true);
            } else {
              setZoom(doubleTapZoom);
            }
          }}
          className="px-2 py-0.5 text-xs font-mono font-medium tracking-tight rounded hover:bg-white/15 transition-all text-white/90 hover:text-white touch-manipulation cursor-pointer"
          title={isZoomed ? "Click to reset zoom (0 or R)" : "Click to zoom in (2.5x)"}
        >
          {Math.round(scale * 100)}%
        </button>

        <button
          type="button"
          onClick={() => zoomIn()}
          disabled={!canZoomIn}
          className={`p-2 rounded-full hover:bg-white/20 active:scale-95 transition-all touch-manipulation cursor-pointer ${
            !canZoomIn ? "opacity-30 cursor-not-allowed" : "opacity-90 hover:opacity-100"
          }`}
          aria-label="Zoom in"
          title="Zoom in (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {isZoomed && (
          <button
            type="button"
            onClick={() => resetZoom(true)}
            className="ml-1 px-2.5 py-1 rounded-full bg-accent/90 hover:bg-accent active:scale-95 text-white transition-all flex items-center gap-1 text-[11px] font-sans font-semibold shadow-md touch-manipulation cursor-pointer"
            aria-label="Reset zoom"
            title="Reset zoom (R)"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/85 active:scale-90 text-white backdrop-blur-md border border-white/20 shadow-2xl transition-transform z-[10000] flex items-center justify-center touch-manipulation cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/85 active:scale-90 text-white backdrop-blur-md border border-white/20 shadow-2xl transition-transform z-[10000] flex items-center justify-center touch-manipulation cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>
        </>
      )}

      {/* Thumbnails Strip */}
      <div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 overflow-x-auto max-w-[92vw] p-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 shadow-2xl hide-scrollbar z-[10000] touch-pan-x"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((img, idx) => (
          <button
            type="button"
            key={idx}
            onClick={() => {
              resetZoom(false);
              setCurrentIndex(idx);
            }}
            className={`relative w-12 h-8 sm:w-16 sm:h-10 flex-shrink-0 rounded-md overflow-hidden transition-all touch-manipulation cursor-pointer ${
              idx === currentIndex
                ? "ring-2 ring-white scale-105 opacity-100 shadow-md"
                : "opacity-40 hover:opacity-100"
            }`}
          >
            <ProjectImage
              src={img}
              alt="thumb"
              fill
              className="object-cover pointer-events-none"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}
