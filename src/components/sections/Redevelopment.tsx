"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ShieldCheck,
  Home,
  Zap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Building2,
  ScrollText,
  HardHat,
  Key,
  Truck,
  Users,
  FileSignature,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const BENEFITS = [
  {
    id: 1,
    title: "Safety First",
    subtitle: "No Compromise",
    icon: ShieldCheck,
    description: "Brand-new structure with modern RCC techniques & fire safety.",
    accent: "text-maroon",
    bg: "bg-maroon/5",
    border: "group-hover:border-maroon/30",
  },
  {
    id: 2,
    title: "Bigger & Better",
    subtitle: "Zero Cost Upgrade",
    icon: Home,
    description: "Larger carpet area, minimal wastage, premium layouts, and enhanced ventilation.",
    accent: "text-maroon",
    bg: "bg-maroon/5",
    border: "group-hover:border-maroon/30",
  },
  {
    id: 3,
    title: "Modern Amenities",
    subtitle: "Future-Ready Living",
    icon: Zap,
    description: "Gym,High-speed lifts, solar power, CCTV, terrace deck, and landscaped podiums.",
    accent: "text-maroon",
    bg: "bg-maroon/5",
    border: "group-hover:border-maroon/30",
  },
  {
    id: 4,
    title: "Value Boost",
    subtitle: "Wealth Creation",
    icon: TrendingUp,
    description: "40%-60% increase in property value and higher rental yields.",
    accent: "text-maroon",
    bg: "bg-maroon/5",
    border: "group-hover:border-maroon/30",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understanding Your Vision",
    desc: "We meet your society to understand pain points, expectations, and priorities.",
    icon: Users,
  },
  {
    number: "02",
    title: "Technical Feasibility",
    desc: "Feasibility evaluation, FSI potential analysis, and municipal rule checks.",
    icon: Building2,
  },
  {
    number: "03",
    title: "Member Approvals",
    desc: "Conducting meetings to ensure every member understands rights and benefits, targeting 100% approval.",
    icon: CheckCircle2,
  },
  {
    number: "04",
    title: "Development Agreement",
    desc: "Signing the DA with clear terms on carpet area, corpus fund, rent, and timelines.",
    icon: FileSignature,
  },
  {
    number: "05",
    title: "Smooth Transition",
    desc: "Coordinating shifting, packers & movers, and rent disbursement.",
    icon: Truck,
  },
  {
    number: "06",
    title: "Construction Phase",
    desc: "Regular updates and full transparency during the building process.",
    icon: HardHat,
  },
  {
    number: "07",
    title: "Welcome Home",
    desc: "Return to a brand-new, larger modern home with higher property value.",
    icon: Key,
  },
];

// --- COMPONENTS ---

const MagneticButton = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </button>
  );
};

const TiltCard = ({ item, index }: { item: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.1,
      ease: "none",
      transformPerspective: 1000,
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[260px] md:h-[360px] rounded-3xl bg-white/40 backdrop-blur-xl border border-accent/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] overflow-hidden group hover:shadow-[0_20px_50px_0_rgba(127,0,0,0.1)] transition-shadow duration-500 ${item.border}`}
      style={{ 
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
    >
      {/* Internal Gradient Glow */}
      {/* Soft Glass Gradient */}
<div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/40 to-maroon/5 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

{/* Premium Card Content */}
<div
  className="relative z-10 w-full h-full p-4 flex flex-col items-center justify-center text-center"
  style={{ transform: "translateZ(30px)" }}
>
  {/* Main Content (Icon, Title, Subtitle) - Centers initially, moves up on hover */}
  <div className="flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-8 md:group-hover:-translate-y-12">
    {/* Icon Container */}
    <div
      className={`mb-3 md:mb-4 inline-flex p-4 md:p-5 rounded-2xl ${item.bg} ${item.accent}
      border border-accent/60
      shadow-[0_10px_30px_rgba(0,0,0,0.05)]
      group-hover:shadow-[0_15px_40px_rgba(127,0,0,0.15)]
      group-hover:scale-110 group-hover:-rotate-3
      transition-all duration-500 ease-out`}
    >
      <item.icon size={28} className="w-6 h-6 md:w-8 md:h-8 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
    </div>

    {/* Title */}
    <h3 className="text-lg md:text-2xl font-serif font-bold text-black tracking-tight mb-2">
      {item.title}
    </h3>

    {/* Subtitle */}
    <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-maroon/80">
      {item.subtitle}
    </p>

    {/* Divider Line */}
    <div className="w-8 md:w-12 h-[2px] bg-maroon/20 rounded-full mt-4 transition-all duration-500 group-hover:w-16 md:group-hover:w-20 group-hover:bg-maroon" />
  </div>

  {/* Description - Hidden initially, fades and slides in on hover */}
  <div className="absolute bottom-6 md:bottom-12 left-0 w-full px-4 flex justify-center pointer-events-none">
    <div className="opacity-0 translate-y-4 blur-[4px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:blur-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] delay-75">
      <p className="text-gray-700 text-[11px] md:text-sm leading-snug md:leading-relaxed font-medium bg-transparent backdrop-blur-md p-3 md:p-4 rounded-xl border border-white/0 shadow-[0_8px_32px_rgba(0,0,0,0.05)] w-full max-w-[280px] md:max-w-[300px] mx-auto">
        {item.description}
      </p>
    </div>
  </div>
</div>

    </div>
  );
};

const ProcessStep = ({
  step,
  index,
}: {
  step: (typeof PROCESS_STEPS)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.05,
      ease: "power0.none",
      transformPerspective: 1000,
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.2, ease: "power2.out" });
  };

  return (
   
     <div
      className={`process-step-${index} flex flex-col md:flex-row gap-8 md:gap-24 items-center ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
       {/* Number Bubble */} 
      <div className="relative shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-maroon text-white flex items-center justify-center font-bold text-lg md:text-2xl shadow-xl z-10 border-2 md:border-4 border-[#fdfbf7] ring-4 ring-maroon/10">
        {step.number}
      </div>

       {/* Content Card with Tilt  */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`flex-1 relative p-6 md:p-10 h-[200px] md:h-[260px] flex flex-col justify-center rounded-2xl md:rounded-[2rem] bg-white border border-accent/20 shadow-lg hover:shadow-2xl transition-all duration-500 w-full group hover:-translate-y-2 ${
          index % 2 === 0 ? "text-left" : "text-left md:text-right"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative z-10 w-full h-full" style={{ transform: "translateZ(30px)" }}>
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 group-hover:top-0 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
            <div
              className={`flex items-center gap-4 md:gap-6 ${
                index % 2 === 0 ? "flex-row" : "flex-row md:flex-row-reverse"
              }`}
            >
              <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-maroon/5 text-maroon group-hover:bg-maroon group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm group-hover:shadow-[0_8px_16px_rgba(127,0,0,0.2)]">
                <step.icon size={26} className="md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <h4 className="text-xl md:text-3xl font-serif font-bold text-black group-hover:text-maroon transition-colors duration-300">
                {step.title}
              </h4>
            </div>
          </div>

          <div className="absolute left-0 bottom-0 w-full pointer-events-none">
            <div className={`opacity-0 translate-y-6 blur-[4px] group-hover:opacity-100 group-hover:translate-y-0 group-hover:blur-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] delay-75 w-full ${
              index % 2 === 0 ? "text-left" : "text-left md:text-right"
            }`}>
              <p className="text-gray-600 text-sm md:text-[16px] leading-relaxed font-medium bg-transparent backdrop-blur-md p-4 rounded-xl border border-white/0 shadow-[0_8px_32px_rgba(0,0,0,0.08)] inline-block w-full">
                {step.desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block flex-1" />
    </div> 
  );
};


export default function Redevelopment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const bgLayer1 = useRef<HTMLDivElement>(null);
  const bgLayer2 = useRef<HTMLDivElement>(null);
  const colorOverlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax background layers - Enhanced for visibility
      gsap.to(bgLayer1.current, {
        y: -300,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(bgLayer2.current, {
        y: -500,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Rainbow color transition on scroll - Enhanced
      gsap.to(colorOverlayRef.current, {
        backgroundPosition: "0% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Header Reveal
      gsap.fromTo(
        ".redev-title-char",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Process Timeline Drawing
      if (lineRef.current && processRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        });
      }

      // Process Steps - slide in from alternating sides
      PROCESS_STEPS.forEach((step, i) => {
        const fromSide = i % 2 === 0 ?
 -300 : 300;
        
        gsap.fromTo(
          `.process-step-${i}`,
          { x: fromSide, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.process-step-${i}`,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section
      id="redevelopment"
      ref={containerRef}
      className="relative w-full bg-[#fdfbf7] text-black overflow-hidden"
    >
      {/* --- PARALLAX BACKGROUND LAYERS --- */}
      
      {/* Layer 1: Subtle grid - Enhanced visibility */}
      <div
        ref={bgLayer1}
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(#7f0000 1px, transparent 1px), linear-gradient(90deg, #7f0000 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          willChange: 'transform',
        }}
      />

      {/* Layer 2: Diagonal pattern - Enhanced visibility */}
      <div
        ref={bgLayer2}
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(45deg, transparent 48%, #c4a484 49%, #c4a484 51%, transparent 52%)',
          backgroundSize: '60px 60px',
          willChange: 'transform',
        }}
      />

      {/* Rainbow color overlay - transitions on scroll - Enhanced */}
      <div
        ref={colorOverlayRef}
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.15]"
        style={{
          background: 'linear-gradient(180deg, rgba(127,0,0,0.2) 0%, rgba(196,164,132,0.15) 25%, rgba(127,0,0,0.25) 50%, rgba(196,164,132,0.15) 75%, rgba(127,0,0,0.2) 100%)',
          backgroundSize: '100% 200%',
          backgroundPosition: '0% 0%',
          willChange: 'background-position',
        }}
      />

      <div className="container mx-auto px-4 relative z-10 py-32">
        {/* --- HEADER --- */}
        <div className="mb-32 text-center relative">
          <div className="overflow-hidden mb-4">
            <h2 className="text-sm font-bold text-accent tracking-[0.5em] uppercase">
              Core Expertise
            </h2>
          </div>
          <h2 className="text-4xl md:text-8xl font-serif font-bold tracking-tight mb-8 text-black relative z-10">
            {"Redevelopment".split("").map((char, i) => (
              <span
      key={i}
      className={`redev-title-char inline-block ${
        i < 2 ? "text-black" : "text-maroon"
      }`}
    >
                {char}
              </span>
            ))}
          </h2>

          {/* <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Transforming aging structures into landmarks of tomorrow. 
            Experience a seamless journey from concept to keys.
          </p> */}
          
          {/* Decorative Line */}
          <div className="w-24 h-1 bg-maroon mx-auto mt-10 rounded-full opacity-20" />
        </div>

        {/* --- BENEFITS GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-48">
          {BENEFITS.map((item, i) => (
            <div key={item.id} className="perspective-1000">
              <TiltCard item={item} index={i} />
            </div>
          ))}
        </div>

        {/* --- PROCESS TIMELINE --- */}
        <div ref={processRef} className="relative max-w-5xl mx-auto mb-48">
          <div className="text-center mb-32">
            <h3 className="text-4xl md:text-8xl font-serif font-bold mb-8">The <span className="text-maroon">Journey</span></h3>
            <p className="text-lg md:text-xl text-gray-500">Seven steps to your new home.</p>
          </div>

          {/* SVG Line */}
          <div className="absolute left-1/2 top-40 bottom-0 w-[2px] -translate-x-1/2 h-full z-0 pointer-events-none">
            <svg className="w-[4px] h-full overflow-visible">
              <path
                ref={lineRef}
                d="M 2 0 V 2300"
                className="stroke-maroon/30"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10 5"
              />
            </svg>
          </div>

          <div className="space-y-24 relative z-10">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

