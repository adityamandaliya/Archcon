"use client";

import { useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown, ArrowRight, Construction, Ruler, Hammer } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGES = [
  {
    id: 1,
    src: "/images/construction-1.jpg",
    alt: "Structural Framework",
    className: "w-[280px] h-[380px] md:w-[350px] md:h-[450px]",
    position: "left-[5%] top-[35%]",
    depth: 0.6, // Parallax speed
    zIndex: 20,
  },
  {
    id: 2,
    src: "/images/construction-2.jpg",
    alt: "Architectural Planning",
    className: "w-[240px] h-[320px] md:w-[300px] md:h-[400px]",
    position: "right-[5%] bottom-[0%]",
    depth: 0.8,
    zIndex: 30,
  },
  {
    id: 3,
    src: "/images/construction-3.jpg",
    alt: "Engineering Excellence",
    className: "w-[200px] h-[260px] md:w-[250px] md:h-[320px]",
    position: "left-[20%] bottom-[-10%]",
    depth: 0.4,
    zIndex: 10,
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for tilt effect
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  // Memoize grid lines to prevent recreation
  const horizontalGridLines = useMemo(() => Array.from({ length: 12 }), []);
  const verticalGridLines = useMemo(() => Array.from({ length: 12 }), []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. "Construction" Entrance Animation - Optimized
      // Grid draws in
      tl.fromTo(
        ".grid-line",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1, stagger: 0.08, ease: "power2.out" }
      )
      // Images "Rise" up like a building being constructed
      .fromTo(
        ".hero-image-container",
        { y: 200, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        { 
          y: 0, 
          opacity: 1, 
          clipPath: "inset(0% 0 0 0)", 
          duration: 1.5, 
          stagger: 0.2, 
          ease: "power4.out" 
        },
        "-=0.5"
      )
      // Crane/Slider effect for text
      .fromTo(
        ".text-reveal-mask",
        { x: "-100%" },
        { x: "100%", duration: 1.2, ease: "power2.inOut" },
        "-=1"
      )
      .fromTo(
        ".hero-text",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.1, stagger: 0.1 },
        "-=0.8" // Reveal text as mask passes
      );

      // 2. Scroll Parallax (Deep Layers) - Optimized with will-change
      HERO_IMAGES.forEach((img) => {
        gsap.to(`#hero-img-${img.id}`, {
          y: -150 * img.depth, // Move up based on depth
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Background moves slower
      gsap.to(".bg-grid-layer", {
        y: 50,
        immediateRender: false,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // 3. Mouse Tilt Setup
      xTo.current = gsap.quickTo(tiltRef.current, "rotationY", { duration: 0.5, ease: "power3" });
      yTo.current = gsap.quickTo(tiltRef.current, "rotationX", { duration: 0.5, ease: "power3" });
    },
    { scope: containerRef }
  );

  // Memoize mouse handlers to prevent recreation
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!tiltRef.current) return;
    
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width) - 0.5;
    const y = (clientY / height) - 0.5;

    // Tilt range: -10 to 10 degrees
    xTo.current?.(x * 10);
    yTo.current?.(y * -10); // Invert Y for natural feel
  }, []);

  const handleMouseLeave = useCallback(() => {
    xTo.current?.(0);
    yTo.current?.(0);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen bg-[#0a0a0a] text-white overflow-hidden perspective-1000"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Tilt Container */}
      <div 
        ref={tiltRef} 
        className="relative w-full h-full transform-style-3d will-change-transform"
      >
        
        {/* BACKGROUND LAYERS - Reduced grid lines for performance */}
        <div className="bg-grid-layer absolute inset-0 z-0 opacity-20 pointer-events-none">
          {/* Horizontal Grid Lines */}
          {horizontalGridLines.map((_, i) => (
            <div 
              key={`h-${i}`} 
              className="grid-line absolute w-full h-px bg-white/20" 
              style={{ top: `${i * 8.33}%` }} 
            />
          ))}
          {/* Vertical Grid Lines */}
          {verticalGridLines.map((_, i) => (
            <div 
              key={`v-${i}`} 
              className="grid-line absolute h-full w-px bg-white/20" 
              style={{ left: `${i * 8.33}%`, transformOrigin: "top", transform: "scaleY(0)" }} 
            />
          ))}
        </div>

        {/* Floating Construction Icons (Decorative) */}
        <div className="absolute top-20 left-10 opacity-10 animate-pulse">
          <Ruler size={64} />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10 animate-bounce">
          <Hammer size={64} />
        </div>

        {/* MAIN CONTENT */}
        <div ref={contentRef} className="relative z-40 container mx-auto px-4 h-screen flex flex-col justify-center items-center pointer-events-none">
          <div className="text-center pointer-events-auto bg-black/50 shadow-[0_0_50px_40px_rgba(0,0,0,0.5)] p-6 rounded-[3rem] md:shadow-none md:bg-transparent md:p-0 md:rounded-none md:mix-blend-difference">
            
            {/* Eyebrow with Crane Effect */}
            <div className="relative overflow-hidden mb-4 inline-block">
              <div className="text-reveal-mask absolute inset-0 bg-accent z-10" />
              <div className="hero-text flex items-center gap-3 text-accent text-sm md:text-base tracking-[0.5em] uppercase font-mono">
                <Construction className="w-4 h-4" />
                <span>Under Construction Since 2024</span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="relative mb-6">
              <h1 className="hero-text text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9]">
                ARCH<span className="text-transparent stroke-text">CON</span>
              </h1>
            </div>

            {/* Description */}
            <div className="relative overflow-hidden mb-8 md:mb-12 hidden md:block">
               <p className="hero-text text-xl md:text-2xl text-accent font-light tracking-wide max-w-2xl mx-auto rounded-sm p-1">
                Engineering the future, one beam at a time.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-text flex flex-col md:flex-row gap-6 items-center justify-center">
              <Link
                href="/projects"
                className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-wider overflow-hidden transition-all hover:bg-accent hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(196,164,132,0.6)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/#contact"
                className="px-8 py-4 border border-white/20 text-white uppercase tracking-widest text-sm hover:bg-white/5 transition-colors backdrop-blur-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* PARALLAX IMAGES - Optimized with priority and sizes */}
        <div className="absolute inset-0 pointer-events-none">
          {HERO_IMAGES.map((img, index) => (
            <div
              key={img.id}
              id={`hero-img-${img.id}`}
              className={`hero-image-container absolute ${img.position} ${img.className}`}
              style={{ zIndex: img.zIndex, willChange: "transform" }}
            >
              {/* Image Frame */}
              <div className="relative w-full h-full p-2 bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl transform transition-transform hover:scale-105 duration-500">
                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-accent" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-accent" />
                
                <div className="relative w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={85}
                    sizes="(max-width: 768px) 280px, 350px"
                  />
                  {/* Overlay Scanline */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 animate-scan" />
                </div>
                
                {/* Technical Label */}
                <div className="absolute bottom-4 left-4 bg-black/80 text-white text-[10px] font-mono px-2 py-1 backdrop-blur-md border-l-2 border-accent">
                  LAYER_{img.zIndex} // {img.alt}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-2 opacity-50 animate-bounce pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-accent">Scroll to Build</span>
        <ArrowDown className="w-4 h-4 text-accent" />
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-40 pointer-events-none" />
    </section>
  );
}
