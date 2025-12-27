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
    description: "Larger carpet area, premium layouts, and enhanced ventilation.",
    accent: "text-maroon",
    bg: "bg-maroon/5",
    border: "group-hover:border-maroon/30",
  },
  {
    id: 3,
    title: "Modern Amenities",
    subtitle: "Future-Ready Living",
    icon: Zap,
    description: "High-speed lifts, solar power, CCTV, and landscaped podiums.",
    accent: "text-maroon",
    bg: "bg-maroon/5",
    border: "group-hover:border-maroon/30",
  },
  {
    id: 4,
    title: "Value Boost",
    subtitle: "Wealth Creation",
    icon: TrendingUp,
    description: "25-40% increase in property value and higher rental yields.",
    accent: "text-maroon",
    bg: "bg-maroon/5",
    border: "group-hover:border-maroon/30",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understanding Your Vision",
    desc: "We meet your committee to understand pain points, expectations, and priorities.",
    icon: Users,
  },
  {
    number: "02",
    title: "Technical Feasibility",
    desc: "Structural inspection, FSI potential analysis, and municipal rule checks.",
    icon: Building2,
  },
  {
    number: "03",
    title: "Member Approvals",
    desc: "Conducting meetings to ensure every member understands rights and benefits.",
    icon: CheckCircle2,
  },
  {
    number: "04",
    title: "Development Agreement",
    desc: "Signing the DA with clear terms on carpet area, rent, and timelines.",
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
    desc: "Return to a brand-new, modern home with higher property value.",
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
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
      overwrite: "auto",
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
  className="relative z-10 h-full p-3 md:p-10 flex flex-col items-center justify-center text-center gap-2 md:gap-4"
  style={{ transform: "translateZ(20px)" }}
>
  {/* Icon Container */}
  <div
    className={`mb-1 md:mb-2 inline-flex p-3 md:p-5 rounded-2xl ${item.bg} ${item.accent}
    border border-accent/60
    shadow-[0_10px_30px_rgba(0,0,0,0.05)]
    group-hover:shadow-[0_15px_40px_rgba(127,0,0,0.12)]
    transition-all duration-500`}
  >
    <item.icon size={28} className="w-5 h-5 md:w-8 md:h-8" strokeWidth={1.5} />
  </div>

  {/* Title */}
  <h3 className="text-base md:text-2xl font-serif font-bold text-black tracking-tight">
    {item.title}
  </h3>

  {/* Subtitle */}
  <p className="text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-maroon/80">
    {item.subtitle}
  </p>

  {/* Divider Line */}
  <div className="w-8 md:w-12 h-[2px] bg-maroon/20 rounded-full my-1 md:my-2" />

  {/* Description */}
  <p className="text-gray-600 text-xs md:text-base leading-tight md:leading-relaxed font-medium max-w-[95%] md:max-w-[90%]">
    {item.description}
  </p>
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
        className={`flex-1 p-6 md:p-10 rounded-2xl md:rounded-[2rem] bg-white border border-accent/20 shadow-lg hover:shadow-2xl transition-all duration-500 w-full group hover:-translate-y-2 ${
          index % 2 === 0 ? "text-left" : "text-left md:text-right"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          <div
            className={`flex items-center gap-4 md:gap-6 mb-4 md:mb-6 ${
              index % 2 === 0 ? "flex-row" : "flex-row md:flex-row-reverse"
            }`}
          >
            <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-maroon/5 text-maroon group-hover:bg-maroon group-hover:text-white transition-colors duration-300">
              <step.icon size={22} className="md:w-7 md:h-7" />
            </div>
            <h4 className="text-xl md:text-3xl font-serif font-bold">{step.title}</h4>
          </div>
          <p className="text-gray-600 text-sm md:text-lg leading-relaxed">{step.desc}</p>
        </div>
      </div>

      <div className="hidden md:block flex-1" />
    </div> 
  );
};

// --- ANIMATED WHY CHOOSE US CARDS ---

const TrustedEcosystemCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);
  const node4Ref = useRef<HTMLDivElement>(null);
  const node5Ref = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<SVGLineElement>(null);
  const line2Ref = useRef<SVGLineElement>(null);
  const line3Ref = useRef<SVGLineElement>(null);
  const line4Ref = useRef<SVGLineElement>(null);
  const line5Ref = useRef<SVGLineElement>(null);
  const line6Ref = useRef<SVGLineElement>(null);

  useGSAP(() => {
    // Idle: Nodes pulsing with stagger
    const nodes = [node1Ref, node2Ref, node3Ref, node4Ref, node5Ref];
    nodes.forEach((ref, i) => {
      gsap.to(ref.current, {
        scale: 1.2,
        boxShadow: "0 0 30px rgba(127, 0, 0, 0.8)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });
    });

    // Idle: Connection lines drawing and fading
    const lines = [line1Ref, line2Ref, line3Ref, line4Ref, line5Ref, line6Ref];
    lines.forEach((ref, i) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { strokeDashoffset: 200 },
          {
            strokeDashoffset: 0,
            duration: 2,
            repeat: -1,
            ease: "none",
            delay: i * 0.3,
          }
        );
      }
    });
  }, { scope: cardRef });

  const handleHover = () => {
    // All nodes glow brighter
    const nodes = [node1Ref, node2Ref, node3Ref, node4Ref, node5Ref];
    nodes.forEach((ref) => {
      gsap.to(ref.current, {
        backgroundColor: "#FF6835",
        boxShadow: "0 0 40px rgba(255, 104, 53, 1)",
        duration: 0.3,
      });
    });

    // Lines become more visible
    const lines = [line1Ref, line2Ref, line3Ref, line4Ref, line5Ref, line6Ref];
    lines.forEach((ref) => {
      gsap.to(ref.current, {
        stroke: "#FF6835",
        strokeWidth: 3,
        duration: 0.3,
      });
    });
  };

  const handleLeave = () => {
    const nodes = [node1Ref, node2Ref, node3Ref, node4Ref, node5Ref];
    nodes.forEach((ref) => {
      gsap.to(ref.current, {
        backgroundColor: "#7f0000",
        boxShadow: "0 0 20px rgba(127, 0, 0, 0.6)",
        duration: 0.3,
      });
    });

    const lines = [line1Ref, line2Ref, line3Ref, line4Ref, line5Ref, line6Ref];
    lines.forEach((ref) => {
      gsap.to(ref.current, {
        stroke: "#7f0000",
        strokeWidth: 2,
        duration: 0.3,
      });
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="relative h-[260px] md:h-[500px] bg-maroon/5 backdrop-blur-md border border-maroon/10 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-12 overflow-hidden group"
    >
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Network Visualization */}
        <div className="flex items-center justify-center flex-1 relative scale-75 md:scale-100 origin-center">
          {/* SVG for connection lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
            {/* Center to top-left */}
            <line
              ref={line1Ref}
              x1="50%"
              y1="50%"
              x2="25%"
              y2="20%"
              stroke="#7f0000"
              strokeWidth="2"
              strokeDasharray="200"
              strokeDashoffset="200"
            />
            {/* Center to top-right */}
            <line
              ref={line2Ref}
              x1="50%"
              y1="50%"
              x2="75%"
              y2="20%"
              stroke="#7f0000"
              strokeWidth="2"
              strokeDasharray="200"
              strokeDashoffset="200"
            />
            {/* Center to left */}
            <line
              ref={line3Ref}
              x1="50%"
              y1="50%"
              x2="15%"
              y2="50%"
              stroke="#7f0000"
              strokeWidth="2"
              strokeDasharray="200"
              strokeDashoffset="200"
            />
            {/* Center to right */}
            <line
              ref={line4Ref}
              x1="50%"
              y1="50%"
              x2="85%"
              y2="50%"
              stroke="#7f0000"
              strokeWidth="2"
              strokeDasharray="200"
              strokeDashoffset="200"
            />
            {/* Top-left to top-right */}
            <line
              ref={line5Ref}
              x1="25%"
              y1="20%"
              x2="75%"
              y2="20%"
              stroke="#7f0000"
              strokeWidth="2"
              strokeDasharray="200"
              strokeDashoffset="200"
            />
            {/* Left to right */}
            <line
              ref={line6Ref}
              x1="15%"
              y1="50%"
              x2="85%"
              y2="50%"
              stroke="#7f0000"
              strokeWidth="2"
              strokeDasharray="200"
              strokeDashoffset="200"
            />
          </svg>

          {/* Network Nodes */}
          {/* Center node - Main hub */}
          <div
            ref={node1Ref}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 bg-maroon rounded-full flex items-center justify-center shadow-lg"
          >
            <Building2 size={18} className="text-white md:w-7 md:h-7" strokeWidth={2} />
          </div>

          {/* Top-left node */}
          <div
            ref={node2Ref}
            className="absolute top-[20%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-maroon rounded-full flex items-center justify-center shadow-lg"
          >
            <Users size={14} className="text-white md:w-5 md:h-5" strokeWidth={2} />
          </div>

          {/* Top-right node */}
          <div
            ref={node3Ref}
            className="absolute top-[20%] left-[75%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-maroon rounded-full flex items-center justify-center shadow-lg"
          >
            <ScrollText size={14} className="text-white md:w-5 md:h-5" strokeWidth={2} />
          </div>

          {/* Left node */}
          <div
            ref={node4Ref}
            className="absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-maroon rounded-full flex items-center justify-center shadow-lg"
          >
            <ShieldCheck size={14} className="text-white md:w-5 md:h-5" strokeWidth={2} />
          </div>

          {/* Right node */}
          <div
            ref={node5Ref}
            className="absolute top-1/2 left-[85%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-maroon rounded-full flex items-center justify-center shadow-lg"
          >
            <HardHat size={14} className="text-white md:w-5 md:h-5" strokeWidth={2} />
          </div>
        </div>

        <div>
          <div className="text-3xl md:text-6xl font-serif font-bold text-maroon/20 mb-2 md:mb-4">01</div>
          <h4 className="text-lg md:text-4xl font-serif font-bold mb-2 md:mb-4 text-text">Trusted Ecosystem</h4>
          <p className="text-xs md:text-xl opacity-70 leading-tight md:leading-relaxed font-light">
            Deep relationships with Mumbai's redevelopment authorities.
          </p>
        </div>
      </div>
    </div>
  );
};

const TransparencyCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const bar1Ref = useRef<HTMLDivElement>(null);
  const bar2Ref = useRef<HTMLDivElement>(null);
  const bar3Ref = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const trendLineRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    // Idle: Pulsing bars
    [bar1Ref, bar2Ref, bar3Ref].forEach((ref, i) => {
      gsap.to(ref.current, {
        scaleY: 1.1,
        duration: 1 + i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Idle: Trend line animation
    if (trendLineRef.current) {
      const length = trendLineRef.current.getTotalLength();
      gsap.fromTo(
        trendLineRef.current,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 2,
          repeat: -1,
          ease: "power1.inOut",
        }
      );
    }
  }, { scope: cardRef });

  const handleHover = () => {
    // Bars change to orange
    [bar1Ref, bar2Ref, bar3Ref].forEach((ref) => {
      gsap.to(ref.current, {
        backgroundColor: "#FF6835",
        duration: 0.3,
      });
    });

    // Badge appears
    gsap.to(badgeRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.7)",
    });
  };

  const handleLeave = () => {
    [bar1Ref, bar2Ref, bar3Ref].forEach((ref) => {
      gsap.to(ref.current, {
        backgroundColor: "#7f0000",
        duration: 0.3,
      });
    });

    gsap.to(badgeRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="relative h-[260px] md:h-[500px] bg-maroon/5 backdrop-blur-md border border-maroon/10 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-12 overflow-hidden group"
    >
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex items-end justify-center gap-2 md:gap-4 flex-1 relative scale-75 md:scale-100 origin-bottom">
          {/* Growth Bars */}
          <div ref={bar1Ref} className="w-8 md:w-16 bg-maroon rounded-t-lg" style={{ height: "60px", maxHeight: "120px", transformOrigin: "bottom" }} />
          <div ref={bar2Ref} className="w-8 md:w-16 bg-maroon rounded-t-lg" style={{ height: "90px", maxHeight: "180px", transformOrigin: "bottom" }} />
          <div ref={bar3Ref} className="w-8 md:w-16 bg-maroon rounded-t-lg" style={{ height: "120px", maxHeight: "240px", transformOrigin: "bottom" }} />

          {/* Trend Line SVG */}
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
            <path
              ref={trendLineRef}
              d="M 50 200 L 120 150 L 190 80"
              stroke="#FF6835"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="50" cy="200" r="4" fill="#FF6835" />
            <circle cx="120" cy="150" r="4" fill="#FF6835" />
            <circle cx="190" cy="80" r="4" fill="#FF6835" />
          </svg>

          {/* Growth Badge */}
          <div
            ref={badgeRef}
            className="absolute top-4 right-4 bg-[#FF6835] text-white px-4 py-2 rounded-full font-bold text-lg"
            style={{ scale: 0, opacity: 0 }}
          >
            +47%
          </div>
        </div>

        <div>
          <div className="text-3xl md:text-6xl font-serif font-bold text-maroon/20 mb-2 md:mb-4">02</div>
          <h4 className="text-lg md:text-4xl font-serif font-bold mb-2 md:mb-4 text-text">100% Transparency</h4>
          <p className="text-xs md:text-xl opacity-70 leading-tight md:leading-relaxed font-light">
            Every decision documented and accessible to members.
          </p>
        </div>
      </div>
    </div>
  );
};

const LegalClarityCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const paper1Ref = useRef<HTMLDivElement>(null);
  const paper2Ref = useRef<HTMLDivElement>(null);
  const paper3Ref = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<SVGPathElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Idle: Rotating seal
    gsap.to(sealRef.current, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none",
    });

    // Idle: Signature line animation
    if (signatureRef.current) {
      const length = signatureRef.current.getTotalLength();
      gsap.fromTo(
        signatureRef.current,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 2,
          repeat: -1,
          repeatDelay: 1,
          ease: "power1.inOut",
        }
      );
    }
  }, { scope: cardRef });

  const handleHover = () => {
    // Papers spread out
    gsap.to(paper1Ref.current, {
      x: -20,
      y: -10,
      rotation: -5,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(paper2Ref.current, {
      x: 0,
      y: -5,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(paper3Ref.current, {
      x: 20,
      y: -10,
      rotation: 5,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to([paper1Ref.current, paper2Ref.current, paper3Ref.current], {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="relative h-[260px] md:h-[500px] bg-maroon/5 backdrop-blur-md border border-maroon/10 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-12 overflow-hidden group"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex items-center justify-center flex-1 relative scale-75 md:scale-100 origin-center">
          {/* Stacked Papers */}
          <div className="relative" style={{ transformStyle: "preserve-3d" }}>
            <div
              ref={paper1Ref}
              className="absolute w-20 h-28 md:w-40 md:h-52 bg-maroon/10 border border-maroon/20 rounded-lg shadow-xl"
              style={{ transform: "translateZ(0px)" }}
            />
            <div
              ref={paper2Ref}
              className="absolute w-20 h-28 md:w-40 md:h-52 bg-maroon/15 border border-maroon/30 rounded-lg shadow-xl"
              style={{ transform: "translateZ(10px)" }}
            />
            <div
              ref={paper3Ref}
              className="w-20 h-28 md:w-40 md:h-52 bg-maroon/20 border border-maroon/40 rounded-lg shadow-xl relative"
              style={{ transform: "translateZ(20px)" }}
            >
              {/* Signature SVG */}
              <svg className="absolute bottom-4 left-4 w-32 h-12">
                <path
                  ref={signatureRef}
                  d="M 10 30 Q 30 10, 50 30 T 90 30"
                  stroke="#7f0000"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Official Seal */}
          <div ref={sealRef} className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4">
            <FileSignature size={40} className="text-maroon opacity-30 md:w-[80px] md:h-[80px]" strokeWidth={1.5} />
          </div>
        </div>

        <div>
          <div className="text-3xl md:text-6xl font-serif font-bold text-maroon/20 mb-2 md:mb-4">03</div>
          <h4 className="text-lg md:text-4xl font-serif font-bold mb-2 md:mb-4 text-text">Legal Clarity</h4>
          <p className="text-xs md:text-xl opacity-70 leading-tight md:leading-relaxed font-light">
            Top-tier legal framework protecting society interests.
          </p>
        </div>
      </div>
    </div>
  );
};

const ZeroStressCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const craneArmRef = useRef<HTMLDivElement>(null);
  const hookRef = useRef<HTMLDivElement>(null);
  const floor1Ref = useRef<HTMLDivElement>(null);
  const floor2Ref = useRef<HTMLDivElement>(null);
  const floor3Ref = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Idle: Building floors construct upward
    gsap.fromTo(
      [floor1Ref.current, floor2Ref.current, floor3Ref.current],
      { scaleY: 0, transformOrigin: "bottom" },
      {
        scaleY: 1,
        duration: 2,
        stagger: 0.3,
        repeat: -1,
        repeatDelay: 1,
        ease: "power2.out",
      }
    );

    // Idle: Crane hook moving
    gsap.to(hookRef.current, {
      y: 20,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Idle: Construction particles rising
    gsap.to(particlesRef.current?.children || [], {
      y: -100,
      opacity: 0,
      duration: 2,
      stagger: 0.2,
      repeat: -1,
      ease: "power1.out",
    });

    // Idle: Floors light up sequentially
    gsap.to([floor1Ref.current, floor2Ref.current, floor3Ref.current], {
      backgroundColor: "#FF6835",
      duration: 0.5,
      stagger: 0.3,
      repeat: -1,
      yoyo: true,
      repeatDelay: 1,
    });
  }, { scope: cardRef });

  const handleHover = () => {
    // Crane arm rotates
    gsap.to(craneArmRef.current, {
      rotation: 15,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(craneArmRef.current, {
      rotation: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="relative h-[260px] md:h-[500px] bg-maroon/5 backdrop-blur-md border border-maroon/10 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-12 overflow-hidden group"
    >
      {/* Construction Particles */}
      <div ref={particlesRef} className="absolute bottom-0 left-0 right-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FF6835] rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              bottom: "20%",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex items-end justify-center gap-1 md:gap-2 flex-1 relative scale-75 md:scale-100 origin-bottom">
          {/* Crane */}
          <div className="absolute top-0 right-2 md:right-12">
            <div ref={craneArmRef} className="relative" style={{ transformOrigin: "bottom left" }}>
              <div className="w-16 h-1 md:w-32 md:h-2 bg-maroon rounded" />
              <div ref={hookRef} className="absolute right-0 top-1 md:top-2 w-0.5 md:w-1 h-8 md:h-16 bg-maroon/50">
                <div className="absolute bottom-0 w-1.5 h-1.5 md:w-3 md:h-3 bg-[#FF6835] rounded-full -left-0.5 md:-left-1" />
              </div>
            </div>
          </div>

          {/* Building Floors */}
          <div ref={floor1Ref} className="w-10 h-8 md:w-20 md:h-16 bg-maroon border-2 border-white/20 rounded-t" style={{ transformOrigin: "bottom" }} />
          <div ref={floor2Ref} className="w-10 h-8 md:w-20 md:h-16 bg-maroon border-2 border-white/20 rounded-t" style={{ transformOrigin: "bottom" }} />
          <div ref={floor3Ref} className="w-10 h-8 md:w-20 md:h-16 bg-maroon border-2 border-white/20 rounded-t" style={{ transformOrigin: "bottom" }} />
        </div>

        <div>
          <div className="text-3xl md:text-6xl font-serif font-bold text-maroon/20 mb-2 md:mb-4">04</div>
          <h4 className="text-lg md:text-4xl font-serif font-bold mb-2 md:mb-4 text-text">Zero Stress</h4>
          <p className="text-xs md:text-xl opacity-70 leading-tight md:leading-relaxed font-light">
            We handle everything from paperwork to possession.
          </p>
        </div>
      </div>
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
          <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Transforming aging structures into landmarks of tomorrow. 
            Experience a seamless journey from concept to keys.
          </p>
          
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
          <div className="absolute left-[24px] md:left-1/2 top-40 bottom-0 w-[2px] -translate-x-1/2 h-full z-0 pointer-events-none">
            <svg className="w-[4px] h-full overflow-visible">
              <path
                ref={lineRef}
                d="M 2 0 V 2200"
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

      {/* --- WHY CHOOSE US (Animated Cards Grid) --- */}
      <div className="bg-primary/0 text-text py-32 relative overflow-hidden">
       
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h3 className="text-sm font-bold text-accent tracking-[0.5em] uppercase mb-4">
              Our Promise
            </h3>
            <h2 className="text-4xl md:text-8xl font-serif font-bold mb-8">
              Why Choose <span className="text-maroon">Us</span>
            </h2>
            <p className="text-lg md:text-2xl opacity-60 max-w-3xl mx-auto font-light">
              We don't just build structures; we build relationships that last generations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto">
            <TrustedEcosystemCard />
            <TransparencyCard />
            <LegalClarityCard />
            <ZeroStressCard />
          </div>
        </div>
      </div>
    </section>
  );
}
