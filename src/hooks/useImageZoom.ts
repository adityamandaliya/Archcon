"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export interface ZoomConfig {
  /** Minimum zoom level (1 = 100% / fitted). Default: 1 */
  minScale?: number;
  /** Maximum zoom level (4 = 400% / 4x). Default: 4 */
  maxScale?: number;
  /** Zoom level to toggle to on double-tap or double-click. Default: 2.5 */
  doubleTapScale?: number;
  /** Incremental scale step for button click or wheel scroll. Default: 0.5 */
  zoomStep?: number;
  /** Enable mouse wheel zoom. Default: true */
  enableWheel?: boolean;
  /** Enable touchscreen finger pinch gesture. Default: true */
  enablePinch?: boolean;
  /** Enable double-tap gesture. Default: true */
  enableDoubleTap?: boolean;
  /** Callback when swiping to next image at 1x scale */
  onSwipeNext?: () => void;
  /** Callback when swiping to previous image at 1x scale */
  onSwipePrev?: () => void;
}

export const DEFAULT_ZOOM_CONFIG = {
  minScale: 1,
  maxScale: 4,
  doubleTapScale: 2.5,
  zoomStep: 0.5,
  enableWheel: true,
  enablePinch: true,
  enableDoubleTap: true,
};

export interface UseImageZoomReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLDivElement | null>;
  scale: number;
  isZoomed: boolean;
  canZoomIn: boolean;
  canZoomOut: boolean;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: (animate?: boolean) => void;
  setZoom: (newScale: number, focalPoint?: { clientX: number; clientY: number }, animate?: boolean) => void;
}

/**
 * Ultra-optimized, high-performance image zoom hook.
 * Uses direct DOM transforms via requestAnimationFrame during active gestures
 * to guarantee 60fps/120fps with zero React re-render lag or main-thread hangs.
 */
export function useImageZoom(config?: ZoomConfig): UseImageZoomReturn {
  const minScale = config?.minScale ?? DEFAULT_ZOOM_CONFIG.minScale;
  const maxScale = config?.maxScale ?? DEFAULT_ZOOM_CONFIG.maxScale;
  const doubleTapScale = config?.doubleTapScale ?? DEFAULT_ZOOM_CONFIG.doubleTapScale;
  const zoomStep = config?.zoomStep ?? DEFAULT_ZOOM_CONFIG.zoomStep;
  const enableWheel = config?.enableWheel ?? DEFAULT_ZOOM_CONFIG.enableWheel;
  const enablePinch = config?.enablePinch ?? DEFAULT_ZOOM_CONFIG.enablePinch;
  const enableDoubleTap = config?.enableDoubleTap ?? DEFAULT_ZOOM_CONFIG.enableDoubleTap;
  const onSwipeNext = config?.onSwipeNext;
  const onSwipePrev = config?.onSwipePrev;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  // State only updated when zoom changes at rest to update button/badge UI
  const [scale, setScale] = useState<number>(minScale);

  // Mutable refs for zero-overhead animation loop
  const scaleRef = useRef<number>(minScale);
  const posRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  // Keep callback refs fresh
  const onSwipeNextRef = useRef(onSwipeNext);
  const onSwipePrevRef = useRef(onSwipePrev);
  onSwipeNextRef.current = onSwipeNext;
  onSwipePrevRef.current = onSwipePrev;

  // Apply transform directly to DOM element (no React re-render overhead!)
  const applyTransform = useCallback((animate = false) => {
    if (!imageRef.current) return;
    const el = imageRef.current;
    const { x, y } = posRef.current;
    const s = scaleRef.current;

    el.style.transition = animate ? "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)" : "none";
    el.style.transform = `translate3d(${x}px, ${y}px, 0px) scale(${s})`;
    el.style.transformOrigin = "center center";
    el.style.willChange = "transform";
    el.style.cursor = s > 1.05 ? "grab" : "default";
  }, []);

  // Compute maximum pan boundaries based on scale
  const clampPos = useCallback(
    (x: number, y: number, currentScale: number, width: number, height: number) => {
      if (currentScale <= 1.01) return { x: 0, y: 0 };
      const maxX = Math.max(0, (width * (currentScale - 1)) / 2);
      const maxY = Math.max(0, (height * (currentScale - 1)) / 2);
      return {
        x: Math.min(Math.max(x, -maxX), maxX),
        y: Math.min(Math.max(y, -maxY), maxY),
      };
    },
    []
  );

  // Set zoom programmatically (buttons / double-tap)
  const setZoom = useCallback(
    (
      targetScale: number,
      focalPoint?: { clientX: number; clientY: number },
      animate: boolean = true
    ) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width || 1;
      const height = rect.height || 1;

      const newScale = Math.min(Math.max(targetScale, minScale), maxScale);

      if (newScale <= 1.01) {
        scaleRef.current = minScale;
        posRef.current = { x: 0, y: 0 };
        applyTransform(animate);
        setScale(minScale);
        return;
      }

      const currScale = scaleRef.current;
      const currPos = posRef.current;
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;

      const focalX = focalPoint ? focalPoint.clientX - centerX : 0;
      const focalY = focalPoint ? focalPoint.clientY - centerY : 0;

      const ratio = newScale / currScale;
      const rawX = focalX - (focalX - currPos.x) * ratio;
      const rawY = focalY - (focalY - currPos.y) * ratio;

      const clamped = clampPos(rawX, rawY, newScale, width, height);
      scaleRef.current = newScale;
      posRef.current = clamped;

      applyTransform(animate);
      setScale(newScale);
    },
    [minScale, maxScale, clampPos, applyTransform]
  );

  const resetZoom = useCallback(
    (animate: boolean = true) => {
      scaleRef.current = minScale;
      posRef.current = { x: 0, y: 0 };
      applyTransform(animate);
      setScale(minScale);
    },
    [minScale, applyTransform]
  );

  const zoomIn = useCallback(() => {
    setZoom(scaleRef.current + zoomStep, undefined, true);
  }, [setZoom, zoomStep]);

  const zoomOut = useCallback(() => {
    setZoom(scaleRef.current - zoomStep, undefined, true);
  }, [setZoom, zoomStep]);

  // Touch Event Handling (Pinch-to-zoom, touch pan, double-tap, slide swipe)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchMode: "none" | "pinch" | "pan" | "swipe" = "none";
    let initialDist = 0;
    let initialScale = minScale;
    let initialCenter = { x: 0, y: 0 };
    let initialPos = { x: 0, y: 0 };
    let panStart = { x: 0, y: 0 };
    let swipeStart = { x: 0, y: 0, time: 0 };
    let lastTapTime = 0;
    let lastTapPos = { x: 0, y: 0 };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2 && enablePinch) {
        // Multi-touch Pinch Initiated
        e.preventDefault();
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        initialDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        initialScale = scaleRef.current;
        initialCenter = {
          x: (t0.clientX + t1.clientX) / 2,
          y: (t0.clientY + t1.clientY) / 2,
        };
        initialPos = { ...posRef.current };
        touchMode = "pinch";
      } else if (e.touches.length === 1) {
        const touch = e.touches[0];
        const now = Date.now();
        const tapDist = Math.hypot(touch.clientX - lastTapPos.x, touch.clientY - lastTapPos.y);

        // Double-tap detection
        if (enableDoubleTap && now - lastTapTime < 300 && tapDist < 35) {
          e.preventDefault();
          lastTapTime = 0;
          if (scaleRef.current > 1.05) {
            resetZoom(true);
          } else {
            setZoom(doubleTapScale, { clientX: touch.clientX, clientY: touch.clientY }, true);
          }
          return;
        }

        lastTapTime = now;
        lastTapPos = { x: touch.clientX, y: touch.clientY };

        if (scaleRef.current > 1.05) {
          // Pan when zoomed in
          e.preventDefault();
          touchMode = "pan";
          panStart = { x: touch.clientX, y: touch.clientY };
          initialPos = { ...posRef.current };
        } else {
          // Track horizontal swipe when at 1x
          touchMode = "swipe";
          swipeStart = { x: touch.clientX, y: touch.clientY, time: now };
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchMode === "pinch" && e.touches.length === 2 && enablePinch) {
        e.preventDefault();
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        if (initialDist === 0) return;

        const ratio = dist / initialDist;
        const targetScale = Math.min(Math.max(initialScale * ratio, minScale * 0.8), maxScale * 1.25);

        const cx = (t0.clientX + t1.clientX) / 2;
        const cy = (t0.clientY + t1.clientY) / 2;

        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const focalX = cx - centerX;
        const focalY = cy - centerY;
        const initialFocalX = initialCenter.x - centerX;
        const initialFocalY = initialCenter.y - centerY;

        const scaleRatio = targetScale / initialScale;
        const rawX = focalX - (initialFocalX - initialPos.x) * scaleRatio;
        const rawY = focalY - (initialFocalY - initialPos.y) * scaleRatio;

        scaleRef.current = targetScale;
        posRef.current = { x: rawX, y: rawY };

        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => applyTransform(false));
      } else if (touchMode === "pan" && e.touches.length === 1 && scaleRef.current > 1.05) {
        e.preventDefault();
        const touch = e.touches[0];
        const dx = touch.clientX - panStart.x;
        const dy = touch.clientY - panStart.y;

        const rect = container.getBoundingClientRect();
        const clamped = clampPos(
          initialPos.x + dx,
          initialPos.y + dy,
          scaleRef.current,
          rect.width,
          rect.height
        );

        posRef.current = clamped;

        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => applyTransform(false));
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchMode === "pinch" && e.touches.length === 1 && scaleRef.current > 1.05) {
        // Smoothly continue panning if 1 finger is still held down
        touchMode = "pan";
        panStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        initialPos = { ...posRef.current };
        return;
      }

      if (e.touches.length === 0) {
        if (touchMode === "swipe" && scaleRef.current <= 1.05) {
          const touch = e.changedTouches[0];
          if (touch && swipeStart.time > 0) {
            const dx = touch.clientX - swipeStart.x;
            const dy = touch.clientY - swipeStart.y;
            const dt = Date.now() - swipeStart.time;

            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3 && dt < 400) {
              if (dx < 0 && onSwipeNextRef.current) {
                onSwipeNextRef.current();
              } else if (dx > 0 && onSwipePrevRef.current) {
                onSwipePrevRef.current();
              }
            }
          }
        }

        touchMode = "none";

        // Snap back if pinched out of bounds
        const rect = container.getBoundingClientRect();
        const currentScale = scaleRef.current;
        let finalScale = Math.min(Math.max(currentScale, minScale), maxScale);

        if (finalScale <= 1.05) {
          finalScale = minScale;
          posRef.current = { x: 0, y: 0 };
        } else {
          posRef.current = clampPos(posRef.current.x, posRef.current.y, finalScale, rect.width, rect.height);
        }

        scaleRef.current = finalScale;
        applyTransform(true);
        setScale(finalScale);
      }
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });
    container.addEventListener("touchcancel", handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchEnd);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [
    minScale,
    maxScale,
    doubleTapScale,
    enablePinch,
    enableDoubleTap,
    setZoom,
    resetZoom,
    clampPos,
    applyTransform,
  ]);

  // Desktop Mouse Drag & Wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMouseDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let posStartX = 0;
    let posStartY = 0;
    let activePointerId: number | null = null;
    let mouseSwipeStart = { x: 0, y: 0, time: 0 };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || e.pointerType === "touch") return;

      if (scaleRef.current > 1.05) {
        e.preventDefault();
        isMouseDragging = true;
        activePointerId = e.pointerId;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        posStartX = posRef.current.x;
        posStartY = posRef.current.y;

        if (imageRef.current) {
          imageRef.current.style.cursor = "grabbing";
          imageRef.current.style.transition = "none";
        }

        try {
          container.setPointerCapture(e.pointerId);
        } catch {}
      } else {
        mouseSwipeStart = { x: e.clientX, y: e.clientY, time: Date.now() };
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      if (isMouseDragging && scaleRef.current > 1.05) {
        e.preventDefault();
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;

        const rect = container.getBoundingClientRect();
        const clamped = clampPos(
          posStartX + dx,
          posStartY + dy,
          scaleRef.current,
          rect.width,
          rect.height
        );

        posRef.current = clamped;

        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => applyTransform(false));
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      if (isMouseDragging) {
        isMouseDragging = false;
        if (activePointerId !== null) {
          try {
            container.releasePointerCapture(activePointerId);
          } catch {}
          activePointerId = null;
        }

        if (imageRef.current) {
          imageRef.current.style.cursor = scaleRef.current > 1.05 ? "grab" : "default";
        }

        const rect = container.getBoundingClientRect();
        posRef.current = clampPos(posRef.current.x, posRef.current.y, scaleRef.current, rect.width, rect.height);
        applyTransform(true);
      } else if (scaleRef.current <= 1.05 && mouseSwipeStart.time > 0) {
        const dx = e.clientX - mouseSwipeStart.x;
        const dy = e.clientY - mouseSwipeStart.y;
        const dt = Date.now() - mouseSwipeStart.time;
        mouseSwipeStart.time = 0;

        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3 && dt < 400) {
          if (dx < 0 && onSwipeNextRef.current) {
            onSwipeNextRef.current();
          } else if (dx > 0 && onSwipePrevRef.current) {
            onSwipePrevRef.current();
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!enableWheel) return;
      e.preventDefault();

      const delta = -e.deltaY * 0.002 * Math.max(1, scaleRef.current * 0.8);
      setZoom(scaleRef.current + delta, { clientX: e.clientX, clientY: e.clientY }, false);
    };

    const handleDblClick = (e: MouseEvent) => {
      e.preventDefault();
      if (scaleRef.current > 1.05) {
        resetZoom(true);
      } else {
        setZoom(doubleTapScale, { clientX: e.clientX, clientY: e.clientY }, true);
      }
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointercancel", handlePointerUp);
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("dblclick", handleDblClick);

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointercancel", handlePointerUp);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("dblclick", handleDblClick);
    };
  }, [doubleTapScale, enableWheel, setZoom, resetZoom, clampPos, applyTransform]);

  const isZoomed = scale > 1.05;
  const canZoomIn = scale < maxScale - 0.01;
  const canZoomOut = scale > minScale + 0.01;

  return {
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
  };
}
