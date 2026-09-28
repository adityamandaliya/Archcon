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

export const DEFAULT_ZOOM_CONFIG: Required<Omit<ZoomConfig, "onSwipeNext" | "onSwipePrev">> = {
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
  scale: number;
  position: { x: number; y: number };
  isZoomed: boolean;
  isDragging: boolean;
  canZoomIn: boolean;
  canZoomOut: boolean;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: (animate?: boolean) => void;
  setZoom: (newScale: number, focalPoint?: { clientX: number; clientY: number }, animate?: boolean) => void;
  transformStyle: React.CSSProperties;
}

/**
 * High-performance hook for desktop click-drag panning, mouse wheel zoom,
 * touchscreen finger pinch-to-zoom, and double-tap with configurable boundaries.
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

  // State for rendering UI (scale badge, button states)
  const [scale, setScale] = useState<number>(minScale);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Mutable refs to prevent closure staleness in active event listeners
  const scaleRef = useRef<number>(minScale);
  const positionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  scaleRef.current = scale;
  positionRef.current = position;

  // Active touch gesture tracking
  const touchGestureRef = useRef<{
    type: "none" | "pan" | "pinch" | "swipe";
    initialDistance: number;
    initialScale: number;
    initialCenter: { x: number; y: number };
    initialPosition: { x: number; y: number };
    panStart: { x: number; y: number };
    swipeStart: { x: number; y: number; time: number };
    lastTapTime: number;
    lastTapPos: { x: number; y: number };
  }>({
    type: "none",
    initialDistance: 0,
    initialScale: minScale,
    initialCenter: { x: 0, y: 0 },
    initialPosition: { x: 0, y: 0 },
    panStart: { x: 0, y: 0 },
    swipeStart: { x: 0, y: 0, time: 0 },
    lastTapTime: 0,
    lastTapPos: { x: 0, y: 0 },
  });

  // Calculate pan boundaries based on current scale and container size
  const getPanBounds = useCallback((currScale: number, width: number, height: number) => {
    if (currScale <= 1.01) {
      return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    }
    const maxX = Math.max(0, (width * (currScale - 1)) / 2);
    const maxY = Math.max(0, (height * (currScale - 1)) / 2);
    return { minX: -maxX, maxX, minY: -maxY, maxY };
  }, []);

  const clampPosition = useCallback(
    (
      pos: { x: number; y: number },
      currScale: number,
      width: number,
      height: number,
      allowOvershoot = false
    ) => {
      const bounds = getPanBounds(currScale, width, height);
      if (!allowOvershoot) {
        return {
          x: Math.min(Math.max(pos.x, bounds.minX), bounds.maxX),
          y: Math.min(Math.max(pos.y, bounds.minY), bounds.maxY),
        };
      }

      // Subtle elastic resistance past boundaries
      const resistance = 0.35;
      let x = pos.x;
      let y = pos.y;

      if (x < bounds.minX) {
        x = bounds.minX + (x - bounds.minX) * resistance;
      } else if (x > bounds.maxX) {
        x = bounds.maxX + (x - bounds.maxX) * resistance;
      }

      if (y < bounds.minY) {
        y = bounds.minY + (y - bounds.minY) * resistance;
      } else if (y > bounds.maxY) {
        y = bounds.maxY + (y - bounds.maxY) * resistance;
      }

      return { x, y };
    },
    [getPanBounds]
  );

  // Core zoom function with focal-point tracking
  const setZoom = useCallback(
    (
      newTargetScale: number,
      focalPoint?: { clientX: number; clientY: number },
      animate: boolean = true
    ) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width || 1;
      const height = rect.height || 1;

      const clampedScale = Math.min(Math.max(newTargetScale, minScale), maxScale);

      if (clampedScale <= 1.01) {
        setIsDragging(!animate);
        setScale(minScale);
        setPosition({ x: 0, y: 0 });
        scaleRef.current = minScale;
        positionRef.current = { x: 0, y: 0 };
        return;
      }

      const currScale = scaleRef.current;
      const currPos = positionRef.current;

      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;

      // Focal point relative to container center
      const focalX = focalPoint ? focalPoint.clientX - centerX : 0;
      const focalY = focalPoint ? focalPoint.clientY - centerY : 0;

      const ratio = clampedScale / currScale;
      const rawX = focalX - (focalX - currPos.x) * ratio;
      const rawY = focalY - (focalY - currPos.y) * ratio;

      const clampedPos = clampPosition({ x: rawX, y: rawY }, clampedScale, width, height, false);

      setIsDragging(!animate);
      setScale(clampedScale);
      setPosition(clampedPos);
      scaleRef.current = clampedScale;
      positionRef.current = clampedPos;
    },
    [minScale, maxScale, clampPosition]
  );

  const resetZoom = useCallback(
    (animate: boolean = true) => {
      setIsDragging(!animate);
      setScale(minScale);
      setPosition({ x: 0, y: 0 });
      scaleRef.current = minScale;
      positionRef.current = { x: 0, y: 0 };
    },
    [minScale]
  );

  const zoomIn = useCallback(() => {
    setZoom(scaleRef.current + zoomStep, undefined, true);
  }, [setZoom, zoomStep]);

  const zoomOut = useCallback(() => {
    setZoom(scaleRef.current - zoomStep, undefined, true);
  }, [setZoom, zoomStep]);

  // Desktop Mouse / Pointer Dragging
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isPointerDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let posStartX = 0;
    let posStartY = 0;
    let activePointerId: number | null = null;
    let swipeStartX = 0;
    let swipeStartY = 0;
    let swipeStartTime = 0;

    const handlePointerDown = (e: PointerEvent) => {
      // Only handle primary mouse clicks (skip touch as it is handled by touch listeners)
      if (e.button !== 0 || e.pointerType === "touch") return;

      const currentScale = scaleRef.current;

      if (currentScale > 1.02) {
        // Zoomed in: enable click-drag panning
        e.preventDefault();
        isPointerDragging = true;
        activePointerId = e.pointerId;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        posStartX = positionRef.current.x;
        posStartY = positionRef.current.y;
        setIsDragging(true);

        try {
          container.setPointerCapture(e.pointerId);
        } catch {
          // fallback
        }
      } else {
        // At 1x: track potential mouse swipe
        swipeStartX = e.clientX;
        swipeStartY = e.clientY;
        swipeStartTime = Date.now();
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      if (isPointerDragging && scaleRef.current > 1.02) {
        e.preventDefault();
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;

        const rect = container.getBoundingClientRect();
        const width = rect.width || 1;
        const height = rect.height || 1;

        const rawX = posStartX + dx;
        const rawY = posStartY + dy;

        const clamped = clampPosition(
          { x: rawX, y: rawY },
          scaleRef.current,
          width,
          height,
          true
        );

        positionRef.current = clamped;
        setPosition(clamped);
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      if (isPointerDragging) {
        isPointerDragging = false;
        setIsDragging(false);

        if (activePointerId !== null) {
          try {
            container.releasePointerCapture(activePointerId);
          } catch {}
          activePointerId = null;
        }

        // Snap back strictly within visible boundaries
        const rect = container.getBoundingClientRect();
        const width = rect.width || 1;
        const height = rect.height || 1;
        const strictlyClamped = clampPosition(
          positionRef.current,
          scaleRef.current,
          width,
          height,
          false
        );

        positionRef.current = strictlyClamped;
        setPosition(strictlyClamped);
      } else if (scaleRef.current <= 1.02 && swipeStartTime > 0) {
        const dx = e.clientX - swipeStartX;
        const dy = e.clientY - swipeStartY;
        const dt = Date.now() - swipeStartTime;
        swipeStartTime = 0;

        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 450) {
          if (dx > 0 && onSwipePrev) {
            onSwipePrev();
          } else if (dx < 0 && onSwipeNext) {
            onSwipeNext();
          }
        }
      }
    };

    const handlePointerCancel = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      if (isPointerDragging) {
        isPointerDragging = false;
        setIsDragging(false);
        if (activePointerId !== null) {
          try {
            container.releasePointerCapture(activePointerId);
          } catch {}
          activePointerId = null;
        }
      }
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
    container.addEventListener("pointercancel", handlePointerCancel);
    container.addEventListener("dblclick", handleDblClick);

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointercancel", handlePointerCancel);
      container.removeEventListener("dblclick", handleDblClick);
    };
  }, [doubleTapScale, setZoom, resetZoom, clampPosition, onSwipeNext, onSwipePrev]);

  // Touch Event Listeners (non-passive to reliably intercept browser zoom)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2 && enablePinch) {
        e.preventDefault();
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        const cx = (t0.clientX + t1.clientX) / 2;
        const cy = (t0.clientY + t1.clientY) / 2;

        touchGestureRef.current = {
          ...touchGestureRef.current,
          type: "pinch",
          initialDistance: dist,
          initialScale: scaleRef.current,
          initialCenter: { x: cx, y: cy },
          initialPosition: { ...positionRef.current },
        };
        setIsDragging(true);
      } else if (e.touches.length === 1) {
        const touch = e.touches[0];
        const now = Date.now();
        const lastTap = touchGestureRef.current.lastTapTime;
        const lastPos = touchGestureRef.current.lastTapPos;
        const tapDist = Math.hypot(touch.clientX - lastPos.x, touch.clientY - lastPos.y);

        if (enableDoubleTap && now - lastTap < 300 && tapDist < 30) {
          e.preventDefault();
          if (scaleRef.current > 1.05) {
            resetZoom(true);
          } else {
            setZoom(doubleTapScale, { clientX: touch.clientX, clientY: touch.clientY }, true);
          }
          touchGestureRef.current.lastTapTime = 0;
          return;
        }

        touchGestureRef.current.lastTapTime = now;
        touchGestureRef.current.lastTapPos = { x: touch.clientX, y: touch.clientY };

        if (scaleRef.current > 1.02) {
          e.preventDefault();
          touchGestureRef.current = {
            ...touchGestureRef.current,
            type: "pan",
            panStart: { x: touch.clientX, y: touch.clientY },
            initialPosition: { ...positionRef.current },
          };
          setIsDragging(true);
        } else {
          touchGestureRef.current = {
            ...touchGestureRef.current,
            type: "swipe",
            swipeStart: { x: touch.clientX, y: touch.clientY, time: now },
          };
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const gesture = touchGestureRef.current;

      if (gesture.type === "pinch" && e.touches.length === 2 && enablePinch) {
        e.preventDefault();
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        if (gesture.initialDistance === 0) return;

        const ratio = dist / gesture.initialDistance;
        const rawScale = gesture.initialScale * ratio;
        const elasticMin = minScale * 0.75;
        const elasticMax = maxScale * 1.35;
        const targetScale = Math.min(Math.max(rawScale, elasticMin), elasticMax);

        const cx = (t0.clientX + t1.clientX) / 2;
        const cy = (t0.clientY + t1.clientY) / 2;

        const rect = container.getBoundingClientRect();
        const width = rect.width || 1;
        const height = rect.height || 1;
        const centerX = rect.left + width / 2;
        const centerY = rect.top + height / 2;

        const focalX = cx - centerX;
        const focalY = cy - centerY;
        const initialFocalX = gesture.initialCenter.x - centerX;
        const initialFocalY = gesture.initialCenter.y - centerY;

        const scaleChangeRatio = targetScale / gesture.initialScale;
        const newX = focalX - (initialFocalX - gesture.initialPosition.x) * scaleChangeRatio;
        const newY = focalY - (initialFocalY - gesture.initialPosition.y) * scaleChangeRatio;

        scaleRef.current = targetScale;
        positionRef.current = { x: newX, y: newY };
        setScale(targetScale);
        setPosition({ x: newX, y: newY });
      } else if (gesture.type === "pan" && e.touches.length === 1 && scaleRef.current > 1.02) {
        e.preventDefault();
        const touch = e.touches[0];
        const dx = touch.clientX - gesture.panStart.x;
        const dy = touch.clientY - gesture.panStart.y;

        const rawX = gesture.initialPosition.x + dx;
        const rawY = gesture.initialPosition.y + dy;

        const rect = container.getBoundingClientRect();
        const width = rect.width || 1;
        const height = rect.height || 1;

        const clamped = clampPosition(
          { x: rawX, y: rawY },
          scaleRef.current,
          width,
          height,
          true
        );

        positionRef.current = clamped;
        setPosition(clamped);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Transition from 2 fingers to 1 finger smoothly
      if (touchGestureRef.current.type === "pinch" && e.touches.length === 1 && scaleRef.current > 1.02) {
        touchGestureRef.current = {
          ...touchGestureRef.current,
          type: "pan",
          panStart: { x: e.touches[0].clientX, y: e.touches[0].clientY },
          initialPosition: { ...positionRef.current },
        };
        return;
      }

      if (e.touches.length === 0) {
        const gesture = touchGestureRef.current;
        setIsDragging(false);

        if (gesture.type === "swipe" && scaleRef.current <= 1.02) {
          const touch = e.changedTouches[0];
          if (touch && gesture.swipeStart.time > 0) {
            const dx = touch.clientX - gesture.swipeStart.x;
            const dy = touch.clientY - gesture.swipeStart.y;
            const dt = Date.now() - gesture.swipeStart.time;

            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 450) {
              if (dx > 0 && onSwipePrev) {
                onSwipePrev();
              } else if (dx < 0 && onSwipeNext) {
                onSwipeNext();
              }
            }
          }
        }

        gesture.type = "none";

        // Snap back if pinched beyond limits
        const rect = container.getBoundingClientRect();
        const width = rect.width || 1;
        const height = rect.height || 1;

        let snappedScale = Math.min(Math.max(scaleRef.current, minScale), maxScale);
        if (snappedScale <= 1.02) {
          snappedScale = minScale;
          setScale(minScale);
          setPosition({ x: 0, y: 0 });
          scaleRef.current = minScale;
          positionRef.current = { x: 0, y: 0 };
        } else {
          const clampedPos = clampPosition(positionRef.current, snappedScale, width, height, false);
          setScale(snappedScale);
          setPosition(clampedPos);
          scaleRef.current = snappedScale;
          positionRef.current = clampedPos;
        }
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
    };
  }, [
    minScale,
    maxScale,
    doubleTapScale,
    enablePinch,
    enableDoubleTap,
    setZoom,
    resetZoom,
    clampPosition,
    onSwipeNext,
    onSwipePrev,
  ]);

  // Mouse Wheel Zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enableWheel) return;

    let rafId: number | null = null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const zoomDelta = -e.deltaY * 0.0018 * Math.max(1, scaleRef.current * 0.8);
        const targetScale = scaleRef.current + zoomDelta;
        setZoom(targetScale, { clientX: e.clientX, clientY: e.clientY }, false);
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [enableWheel, setZoom]);

  // Handle window resize to re-clamp bounds
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || scaleRef.current <= 1.02) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clamped = clampPosition(
        positionRef.current,
        scaleRef.current,
        rect.width || 1,
        rect.height || 1,
        false
      );
      setPosition(clamped);
      positionRef.current = clamped;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [clampPosition]);

  const isZoomed = scale > 1.02;
  const canZoomIn = scale < maxScale - 0.01;
  const canZoomOut = scale > minScale + 0.01;

  const transformStyle: React.CSSProperties = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0px) scale(${scale})`,
    transformOrigin: "center center",
    transition: isDragging
      ? "none"
      : "transform 0.28s cubic-bezier(0.25, 1, 0.5, 1)",
    willChange: "transform",
    cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "default",
    touchAction: "none",
    userSelect: "none",
  };

  return {
    containerRef,
    scale,
    position,
    isZoomed,
    isDragging,
    canZoomIn,
    canZoomOut,
    zoomIn,
    zoomOut,
    resetZoom,
    setZoom,
    transformStyle,
  };
}
