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

  const hasStarted = useRef(false);

  useGSAP(
    () => {
      // Function to start the intro animation
      const startIntro = () => {
        if (hasStarted.current) return;
        hasStarted.current = true;
        
        const tl = gsap.timeline();

        // 1. Grid Entrance
        tl.fromTo(
          ".grid-line",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, stagger: { amount: 0.4, grid: [12, 12], from: "center" }, ease: "power2.out" }
        )
        // 2. Headline Reveal: "ARCH" appears, "CON" slides out
        .fromTo(
          ".arch-text",
          { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "expo.out" },
          "-=0.4"
        )
        .fromTo(
          ".con-text",
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "expo.out" },
          "-=0.8"
        )
        // 3. Image Rise
        .fromTo(
          ".hero-image-container",
          { y: 80, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            stagger: 0.1, 
            ease: "power3.out" 
          },
          "-=1"
        )
        // 4. Other text elements
        .fromTo(
          ".hero-reveal-el",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
          "-=0.6"
        );
      };

      // Listener for loading completion
      const handleLoadingExit = () => {
        startIntro();
      };

      window.addEventListener("loading-exit-start", handleLoadingExit);
      window.addEventListener("loading-complete", handleLoadingExit); // Fallback

      // Check if loading might already be complete
      if (typeof document !== 'undefined') {
        const loader = document.querySelector('[class*="fixed inset-0 z-[9999]"]');
        if (document.body.style.overflow === "unset" || !loader) {
          // If no loader found or already unlocked, start (fallback)
          setTimeout(() => {
            if (!hasStarted.current) startIntro();
          }, 500);
        }
      }

      // Parallax IMAGES ...


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

      return () => {
        window.removeEventListener("loading-exit-start", handleLoadingExit);
        window.removeEventListener("loading-complete", handleLoadingExit);
      };
    },
    { scope: containerRef }
  );

  // Optimized mouse handlers with requestAnimationFrame-like behavior via gsap
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!tiltRef.current) return;
    
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width) - 0.5;
    const y = (clientY / height) - 0.5;

    xTo.current?.(x * 8); // Reduced range for subtler/faster feel
    yTo.current?.(y * -8);
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
              className="grid-line opacity-0 absolute w-full h-px bg-white/20" 
              style={{ top: `${i * 8.33}%` }} 
            />
          ))}
          {/* Vertical Grid Lines */}
          {verticalGridLines.map((_, i) => (
            <div 
              key={`v-${i}`} 
              className="grid-line opacity-0 absolute h-full w-px bg-white/20" 
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
          <div className="text-center pointer-events-auto p-6 relative">
            {/* Mobile dark overlay to improve readability against hero images */}
            <div className="absolute inset-0 -inset-y-10 bg-black/40 -z-10 rounded-[3rem] md:hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />
            
            {/* Eyebrow */}
            <div className="hero-reveal-el opacity-0 flex items-center gap-3 text-accent text-sm md:text-base tracking-[0.5em] uppercase font-mono mb-4">
              <Construction className="w-4 h-4" />
              <span>Under Construction Since 1989</span>
            </div>

            {/* Main Heading with Slide-Out Effect */}
            <div className="relative mb-6 flex justify-center">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] flex">
                <span className="arch-text opacity-0 relative z-20">ARCH</span>
                <span className="con-text opacity-0 relative z-10 text-transparent stroke-text">CON</span>
              </h1>
            </div>

            {/* Description */}
            <div className="mb-8 md:mb-12 hidden md:block">
               <p className="hero-reveal-el opacity-0 text-xl md:text-2xl text-accent font-light tracking-wide max-w-2xl mx-auto rounded-sm p-1">
                Engineering the future, one beam at a time.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-reveal-el opacity-0 flex flex-col md:flex-row gap-6 items-center justify-center">
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
              className={`hero-image-container opacity-0 absolute ${img.position} ${img.className}`}
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
                    priority={true} // Priority for all hero images to avoid LCP delay
                    quality={75} // Slightly lower quality for much faster load
                    sizes="(max-width: 768px) 280px, 400px"
                  />
                  {/* Overlay Scanline - Opacity based reveal for performance */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
