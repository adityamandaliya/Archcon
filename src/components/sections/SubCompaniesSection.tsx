"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { SUB_COMPANIES } from "@/lib/companies";
import { ChevronDown, Building2 } from "lucide-react";

const SubCompaniesSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [isExpanded, setIsExpanded] = useState(false);

  // Mobile: Show only first 4 items initially
  // Desktop: Show all items
  const INITIAL_VISIBLE_COUNT = 4;
  
  // Decide which items to show based on state and screen size (handled via CSS/JS logic combo or just JS)
  // Since this is a responsive design requirement, we'll render all but hide some with CSS or conditional rendering.
  // Ideally for "retractable" ensuring smooth animation, we can control the list rendering.
  const visibleCompanies = isExpanded ? SUB_COMPANIES : SUB_COMPANIES.slice(0, INITIAL_VISIBLE_COUNT);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative py-24 lg:py-32 bg-[var(--color-primary)] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--color-maroon)]/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-maroon) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[1px] w-8 bg-[var(--color-accent)]" />
            <span className="text-[var(--color-accent)] text-xs md:text-sm tracking-[0.4em] uppercase font-bold">
              Our Network
            </span>
            <div className="h-[1px] w-8 bg-[var(--color-accent)]" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-[var(--color-text)] mb-6 tracking-tight"
          >
            The <span className="text-[var(--color-maroon)] relative inline-block">
              Ecosystem
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-2 left-0 h-3 bg-[var(--color-accent)]/20 -z-10"
              />
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--color-text)]/60 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            A synergistic alliance of specialized companies, united to deliver engineering excellence and architectural innovation across every project.
          </motion.p>
        </div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {/* Desktop: Always show all. Mobile: Show limited unless expanded */}
            {(isExpanded ? SUB_COMPANIES : SUB_COMPANIES).map((company, index) => {
               // Logic to hide items on mobile if not expanded
               const isHiddenOnMobile = !isExpanded && index >= INITIAL_VISIBLE_COUNT;
               
               return (
                <motion.div
                  key={company.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`${isHiddenOnMobile ? 'hidden md:block' : 'block'} group relative w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] xl:w-[calc(20%-1rem)] min-w-[150px]`}
                >
                  <div className="h-full w-full bg-white/60 backdrop-blur-sm border border-[var(--color-accent)]/10 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-white/80">
                    
                    {/* Icon Container */}
                    <div className="relative mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)] flex items-center justify-center border border-[var(--color-accent)]/20 text-[var(--color-maroon)] shadow-[var(--color-maroon)]/5">
                        <Building2 strokeWidth={1.5} className="w-7 h-7" />
                      </div>
                    </div>

                    <h3 className="relative z-10 text-sm font-bold text-[var(--color-text)] uppercase tracking-wide">
                      {company.name}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {/* Mobile "View All" Toggle */}
        <div className="md:hidden mt-8 flex justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--color-maroon)] text-white rounded-full font-medium text-sm shadow-lg shadow-[var(--color-maroon)]/20 hover:bg-[var(--color-maroon)]/90 transition-colors"
          >
            <span>{isExpanded ? "Show Less" : "View All Companies"}</span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} 
            />
          </motion.button>
        </div>

      </div>
    </section>
  );
};

export default SubCompaniesSection;
