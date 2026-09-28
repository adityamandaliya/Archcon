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
 * Ultra-optimized, zero-overhead image zoom and gesture engine.
 * Mutates DOM transforms directly via GPU compositing during active pinch and drag gestures
 * to guarantee a locked 60fps/120fps with zero React re-renders, preventing UI lockups on mobile/tablet.
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

  // Synchronized callback refs to prevent effect re-subscriptions
  const swipeNextRef = useRef(onSwipeNext);
  const swipePrevRef = useRef(onSwipePrev);
  swipeNextRef.current = onSwipeNext;
  swipePrevRef.current = onSwipePrev;

  // React state for toolbar UI only (updated on gesture completion)
  const [scale, setScale] = useState<number>(minScale);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Mutable state ref: read/written at 120fps with 0ms overhead
  const stateRef = useRef({
    scale: minScale,
    x: 0,
    y: 0,
    isZoomed: false,
  });

  // Direct GPU transform update on DOM element
  const applyTransform = useCallback((x: number, y: number, s: number, animate: boolean) => {
    const el = imageRef.current;
    if (!el) return;
    el.style.transition = animate ? "transform 0.25s cubic-bezier(0.2, 0, 0, 1)" : "none";
    el.style.transform = `translate3d(${x}px, ${y}px, 0px) scale(${s})`;
    el.style.transformOrigin = "center center";
  }, []);

  // Compute pan boundaries for container
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

      // Elastic resistance past boundaries
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

  // Core programmatic zoom function
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
        stateRef.current = { scale: minScale, x: 0, y: 0, isZoomed: false };
        applyTransform(0, 0, minScale, animate);
        setScale(minScale);
        setIsZoomed(false);
        return;
      }

      const currScale = stateRef.current.scale;
      const currX = stateRef.current.x;
      const currY = stateRef.current.y;

      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;

      const focalX = focalPoint ? focalPoint.clientX - centerX : 0;
      const focalY = focalPoint ? focalPoint.clientY - centerY : 0;

      const ratio = clampedScale / currScale;
      const rawX = focalX - (focalX - currX) * ratio;
      const rawY = focalY - (focalY - currY) * ratio;

      const clamped = clampPosition({ x: rawX, y: rawY }, clampedScale, width, height, false);

      stateRef.current = {
        scale: clampedScale,
        x: clamped.x,
        y: clamped.y,
        isZoomed: true,
      };

      applyTransform(clamped.x, clamped.y, clampedScale, animate);
      setScale(clampedScale);
      setIsZoomed(true);
    },
    [minScale, maxScale, clampPosition, applyTransform]
  );

  const resetZoom = useCallback(
    (animate: boolean = true) => {
      stateRef.current = { scale: minScale, x: 0, y: 0, isZoomed: false };
      applyTransform(0, 0, minScale, animate);
      setScale(minScale);
      setIsZoomed(false);
    },
    [minScale, applyTransform]
  );

  const zoomIn = useCallback(() => {
    setZoom(stateRef.current.scale + zoomStep, undefined, true);
  }, [setZoom, zoomStep]);

  const zoomOut = useCallback(() => {
    setZoom(stateRef.current.scale - zoomStep, undefined, true);
  }, [setZoom, zoomStep]);

  // Touch Event Listeners for Mobile & Tablet (Pinch, Pan, Swipe, Double-tap)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let gestureType: "none" | "pinch" | "pan" | "swipe" = "none";
    let initialDist = 0;
    let initialScale = 1;
    let initialCenterX = 0;
    let initialCenterY = 0;
    let initialPosX = 0;
    let initialPosY = 0;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    let lastTapTime = 0;
    let lastTapX = 0;
    let lastTapY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2 && enablePinch) {
        // Multi-touch pinch start
        e.preventDefault();
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        initialDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        initialScale = stateRef.current.scale;
        initialCenterX = (t0.clientX + t1.clientX) / 2;
        initialCenterY = (t0.clientY + t1.clientY) / 2;
        initialPosX = stateRef.current.x;
        initialPosY = stateRef.current.y;
        gestureType = "pinch";
      } else if (e.touches.length === 1) {
        const touch = e.touches[0];
        const now = Date.now();
        const tapDist = Math.hypot(touch.clientX - lastTapX, touch.clientY - lastTapY);

        // Check for double-tap
        if (enableDoubleTap && now - lastTapTime < 300 && tapDist < 35) {
          e.preventDefault();
          lastTapTime = 0;
          if (stateRef.current.scale > 1.05) {
            resetZoom(true);
          } else {
            setZoom(doubleTapScale, { clientX: touch.clientX, clientY: touch.clientY }, true);
          }
          return;
        }

        lastTapTime = now;
        lastTapX = touch.clientX;
        lastTapY = touch.clientY;

        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchStartTime = now;
        initialPosX = stateRef.current.x;
        initialPosY = stateRef.current.y;

        if (stateRef.current.scale > 1.02) {
          gestureType = "pan";
        } else {
          gestureType = "swipe";
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (gestureType === "pinch" && e.touches.length === 2 && enablePinch) {
        e.preventDefault();
        const t0 = e.touches[0];
        const t1 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
        if (initialDist === 0) return;

        const ratio = dist / initialDist;
        const targetScale = Math.min(Math.max(initialScale * ratio, minScale * 0.75), maxScale * 1.3);

        const cx = (t0.clientX + t1.clientX) / 2;
        const cy = (t0.clientY + t1.clientY) / 2;

        const rect = container.getBoundingClientRect();
        const width = rect.width || 1;
        const height = rect.height || 1;
        const centerX = rect.left + width / 2;
        const centerY = rect.top + height / 2;

        const focalX = cx - centerX;
        const focalY = cy - centerY;
        const initFocalX = initialCenterX - centerX;
        const initFocalY = initialCenterY - centerY;

        const scaleRatio = targetScale / initialScale;
        const newX = focalX - (initFocalX - initialPosX) * scaleRatio;
        const newY = focalY - (initFocalY - initialPosY) * scaleRatio;

        stateRef.current.scale = targetScale;
        stateRef.current.x = newX;
        stateRef.current.y = newY;

        // Direct hardware-accelerated transform, ZERO React re-renders during active pinch
        applyTransform(newX, newY, targetScale, false);
      } else if (gestureType === "pan" && e.touches.length === 1 && stateRef.current.scale > 1.02) {
        e.preventDefault();
        const touch = e.touches[0];
        const dx = touch.clientX - touchStartX;
        const dy = touch.clientY - touchStartY;

        const rect = container.getBoundingClientRect();
        const width = rect.width || 1;
        const height = rect.height || 1;

        const clamped = clampPosition(
          { x: initialPosX + dx, y: initialPosY + dy },
          stateRef.current.scale,
          width,
          height,
          true
        );

        stateRef.current.x = clamped.x;
        stateRef.current.y = clamped.y;

        // Direct hardware-accelerated transform, ZERO React re-renders during active pan
        applyTransform(clamped.x, clamped.y, stateRef.current.scale, false);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      // Transition from 2-finger pinch to 1-finger pan if 1 finger is still held
      if (gestureType === "pinch" && e.touches.length === 1 && stateRef.current.scale > 1.02) {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        initialPosX = stateRef.current.x;
        initialPosY = stateRef.current.y;
        gestureType = "pan";
        return;
      }

      if (e.touches.length === 0) {
        const rect = container.getBoundingClientRect();
        const width = rect.width || 1;
        const height = rect.height || 1;

        if (gestureType === "pinch" || gestureType === "pan") {
          let snappedScale = Math.min(Math.max(stateRef.current.scale, minScale), maxScale);

          if (snappedScale <= 1.03) {
            snappedScale = minScale;
            stateRef.current = { scale: minScale, x: 0, y: 0, isZoomed: false };
            applyTransform(0, 0, minScale, true);
            setScale(minScale);
            setIsZoomed(false);
          } else {
            const clamped = clampPosition(
              { x: stateRef.current.x, y: stateRef.current.y },
              snappedScale,
              width,
              height,
              false
            );

            stateRef.current = {
              scale: snappedScale,
              x: clamped.x,
              y: clamped.y,
              isZoomed: true,
            };

            applyTransform(clamped.x, clamped.y, snappedScale, true);
            setScale(snappedScale);
            setIsZoomed(true);
          }
        } else if (gestureType === "swipe" && stateRef.current.scale <= 1.02) {
          const touch = e.changedTouches[0];
          if (touch && touchStartTime > 0) {
            const dx = touch.clientX - touchStartX;
            const dy = touch.clientY - touchStartY;
            const dt = Date.now() - touchStartTime;

            // Clean, natural horizontal swipe check
            if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy) * 0.8 && dt < 500) {
              if (dx > 0) {
                swipePrevRef.current?.();
              } else {
                swipeNextRef.current?.();
              }
            }
          }
        }

        gestureType = "none";
      }
    };

    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: false });
    container.addEventListener("touchcancel", onTouchEnd, { passive: false });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [minScale, maxScale, doubleTapScale, enablePinch, enableDoubleTap, setZoom, resetZoom, clampPosition, applyTransform]);

  // Desktop Mouse / Pointer Dragging
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMouseDown = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let initialPosX = 0;
    let initialPosY = 0;
    let swipeStartX = 0;
    let swipeStartY = 0;
    let swipeStartTime = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || e.pointerType === "touch") return;

      if (stateRef.current.scale > 1.02) {
        e.preventDefault();
        isMouseDown = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        initialPosX = stateRef.current.x;
        initialPosY = stateRef.current.y;
        try {
          container.setPointerCapture(e.pointerId);
        } catch {}
      } else {
        swipeStartX = e.clientX;
        swipeStartY = e.clientY;
        swipeStartTime = Date.now();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      if (isMouseDown && stateRef.current.scale > 1.02) {
        e.preventDefault();
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;

        const rect = container.getBoundingClientRect();
        const width = rect.width || 1;
        const height = rect.height || 1;

        const clamped = clampPosition(
          { x: initialPosX + dx, y: initialPosY + dy },
          stateRef.current.scale,
          width,
          height,
          true
        );

        stateRef.current.x = clamped.x;
        stateRef.current.y = clamped.y;
        applyTransform(clamped.x, clamped.y, stateRef.current.scale, false);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      if (isMouseDown) {
        isMouseDown = false;
        try {
          container.releasePointerCapture(e.pointerId);
        } catch {}

        const rect = container.getBoundingClientRect();
        const width = rect.width || 1;
        const height = rect.height || 1;

        const clamped = clampPosition(
          { x: stateRef.current.x, y: stateRef.current.y },
          stateRef.current.scale,
          width,
          height,
          false
        );

        stateRef.current.x = clamped.x;
        stateRef.current.y = clamped.y;
        applyTransform(clamped.x, clamped.y, stateRef.current.scale, true);
      } else if (stateRef.current.scale <= 1.02 && swipeStartTime > 0) {
        const dx = e.clientX - swipeStartX;
        const dy = e.clientY - swipeStartY;
        const dt = Date.now() - swipeStartTime;
        swipeStartTime = 0;

        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) && dt < 450) {
          if (dx > 0) {
            swipePrevRef.current?.();
          } else {
            swipeNextRef.current?.();
          }
        }
      }
    };

    const onDblClick = (e: MouseEvent) => {
      e.preventDefault();
      if (stateRef.current.scale > 1.05) {
        resetZoom(true);
      } else {
        setZoom(doubleTapScale, { clientX: e.clientX, clientY: e.clientY }, true);
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("dblclick", onDblClick);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("dblclick", onDblClick);
    };
  }, [doubleTapScale, setZoom, resetZoom, clampPosition, applyTransform]);

  // Desktop Mouse Wheel Zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enableWheel) return;

    let wheelTimeout: NodeJS.Timeout;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = -e.deltaY * 0.002 * Math.max(1, stateRef.current.scale * 0.8);
      const targetScale = stateRef.current.scale + zoomDelta;
      setZoom(targetScale, { clientX: e.clientX, clientY: e.clientY }, false);

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        // Sync final scale to React state after wheel scroll finishes
        setScale(stateRef.current.scale);
        setIsZoomed(stateRef.current.scale > 1.02);
      }, 100);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      clearTimeout(wheelTimeout);
      container.removeEventListener("wheel", onWheel);
    };
  }, [enableWheel, setZoom]);

  // Window resize re-clamping
  useEffect(() => {
    const onResize = () => {
      if (!containerRef.current || stateRef.current.scale <= 1.02) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clamped = clampPosition(
        { x: stateRef.current.x, y: stateRef.current.y },
        stateRef.current.scale,
        rect.width || 1,
        rect.height || 1,
        false
      );
      stateRef.current.x = clamped.x;
      stateRef.current.y = clamped.y;
      applyTransform(clamped.x, clamped.y, stateRef.current.scale, false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clampPosition, applyTransform]);

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
