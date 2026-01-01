"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function MotionStatement() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Mouse position state for React updates if needed, though we mostly use refs for perf
  const mouse = useRef({ x: 0, y: 0 });

  // --- CANVAS DOT GRID ANIMATION ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    
    // Dot configuration - Optimized for performance
    const gap = 50; 
    const dots: { x: number; y: number; originX: number; originY: number }[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Re-initialize dots
      dots.length = 0;
      const cols = Math.ceil(width / gap);
      const rows = Math.ceil(height / gap);
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap + (gap / 2);
          const y = j * gap + (gap / 2);
          dots.push({ x, y, originX: x, originY: y });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw dots
      ctx.fillStyle = "#7f0000"; // Maroon
      
      dots.forEach(dot => {
        // Calculate distance to mouse
        const dx = mouse.current.x - dot.originX;
        const dy = mouse.current.y - dot.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Magnetic repulsion effect
        const maxDist = 200;
        let tx = dot.originX;
        let ty = dot.originY;
        let scale = 1;
        let alpha = 0.15;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          // Move AWAY from mouse
          const moveDist = force * 40; 
          tx -= Math.cos(angle) * moveDist;
          ty -= Math.sin(angle) * moveDist;
          scale = 1 + force; // Grow slightly
          alpha = 0.15 + force * 0.3; // Brighten
        }

        // Lerp for smooth movement
        dot.x += (tx - dot.x) * 0.1;
        dot.y += (ty - dot.y) * 0.1;

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.5 * scale, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      // Get relative position in the section if needed, but fixed canvas covers screen
      // For this full-screen section, client coordinates work well if it covers viewport
      // But let's adjust if the canvas is inside a relative container
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouse.current.x = e.clientX - rect.left;
        mouse.current.y = e.clientY - rect.top;
      }
    });

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- CUBE & TEXT ANIMATIONS ---
  useGSAP(
    () => {
      // 1. Cube Interaction
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current || !cubeRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Rotate cube based on mouse position
        const rotateX = ((y - centerY) / centerY) * -45; // -45 to 45 deg
        const rotateY = ((x - centerX) / centerX) * 45;

        gsap.to(cubeRef.current, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 1,
          ease: "power2.out",
        });
      };

      containerRef.current?.addEventListener("mousemove", handleMouseMove);

      // 2. Text Reveal Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });

      // Split text reveal
      const words = gsap.utils.toArray<HTMLElement>(".reveal-text");
      tl.fromTo(
        words,
        { y: 100, opacity: 0, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Line drawing effect
      tl.fromTo(
        ".separator-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power3.inOut" },
        "-=0.8"
      );

      return () => {
        containerRef.current?.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#fdfbf7] overflow-hidden flex items-center justify-center perspective-1000 cursor-crosshair"
    >
      {/* --- INTERACTIVE DOT GRID --- */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* --- FLOATING WIREFRAME CUBE --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] opacity-60">
        <div
          ref={cubeRef}
          className="relative preserve-3d"
          style={{ 
            transformStyle: "preserve-3d",
            width: "min(50vw, 500px)",
            height: "min(50vw, 500px)",
          }}
        >
          {/* Cube Faces - Wireframe */}
          {[
            "translateZ(calc(min(25vw, 250px)))", // Front
            "rotateY(180deg) translateZ(calc(min(25vw, 250px)))", // Back
            "rotateY(90deg) translateZ(calc(min(25vw, 250px)))", // Right
            "rotateY(-90deg) translateZ(calc(min(25vw, 250px)))", // Left
            "rotateX(90deg) translateZ(calc(min(25vw, 250px)))", // Top
            "rotateX(-90deg) translateZ(calc(min(25vw, 250px)))", // Bottom
          ].map((transform, i) => (
            <div
              key={i}
              className="absolute border-2 border-maroon/20 bg-maroon/5 backdrop-blur-[1px]"
              style={{ 
                transform: transform,
                width: "min(50vw, 500px)",
                height: "min(50vw, 500px)",
                top: 0,
                left: 0,
              }}
            >
              {/* Inner Crosshairs for "Blueprint" look */}
              <div className="absolute top-0 left-1/2 w-px h-full bg-maroon/10" />
              <div className="absolute top-1/2 left-0 w-full h-px bg-maroon/10" />
            </div>
          ))}
        </div>
      </div>

      {/* --- CONTENT --- */}
      <div ref={textRef} className="relative z-10 text-center mix-blend-multiply">
        <div className="overflow-hidden mb-2">
          <h2 className="reveal-text text-lg md:text-xl font-medium tracking-[0.5em] text-accent uppercase">
            Architectural Precision
          </h2>
        </div>
        
        <div className="overflow-hidden mb-6">
          <h1 className="reveal-text text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-black leading-[0.9]">
            BUILT BY <br />
            <span className="text-maroon">PURPOSE</span>
          </h1>
        </div>

        <div className="separator-line w-24 h-1 bg-maroon mx-auto mb-8 origin-center" />

        <div className="overflow-hidden max-w-2xl mx-auto px-6">
          <p className="reveal-text text-black/70 text-lg md:text-xl leading-relaxed font-light">
          Where redevelopment meets architectural clarity.
Every line is intentional, every angle engineered, and every space rebuilt to perform better, last longer, and mean more.
            {/* Where engineering meets artistry. We don't just fill space; we define it.
            Every line, every angle, every structure is calculated for legacy. */}
          </p>
        </div>
      </div>

      {/* --- DECORATIVE CORNERS --- */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-maroon/30" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-maroon/30" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-maroon/30" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-maroon/30" />
    </section>
  );
}
