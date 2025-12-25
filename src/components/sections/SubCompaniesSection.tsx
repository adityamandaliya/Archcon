"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { SUB_COMPANIES } from "@/lib/companies";

const SubCompaniesSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-24 bg-[var(--color-primary)] overflow-hidden">
      {/* Background Grid Pattern (matching CorporateIdentity) */}
      <div
        className="absolute inset-0 opacity-[0.02] z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #000 1px, transparent 1px),
            linear-gradient(0deg, #000 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-[var(--color-accent)] text-sm tracking-[0.3em] uppercase font-medium">
              Network
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-text)] mb-4"
          >
            Our <span className="text-[var(--color-maroon)]">Ecosystem</span>
          </motion.h2>
          
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[var(--color-text)]/70 mt-6 max-w-2xl mx-auto text-lg md:text-lg"
          >
            A unified network of specialized entities delivering excellence across every dimension of construction and development.
          </motion.p>
        </div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-4"
        >
          {SUB_COMPANIES.map((company) => (
            <motion.div
              key={company.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative bg-white border border-[var(--color-accent)]/20 rounded-xl p-6 flex flex-col items-center justify-center min-h-[160px] transition-all duration-300 hover:border-[var(--color-maroon)]/50 hover:shadow-xl hover:shadow-[var(--color-maroon)]/5 w-[calc(50%-8px)] md:w-[calc(33.33%-11px)] lg:w-[calc(20%-13px)]"
            >
              <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                 {/* Glow effect backing */}
                 <div className="absolute inset-0 bg-[var(--color-accent)]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                 <div className="relative z-10 w-full h-full flex items-center justify-center text-[var(--color-maroon)]">
                    {/* Placeholder Icon or Logo Render */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-10 h-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                    >
                        <path d="M3 21h18" />
                        <path d="M5 21V7l8-4 8 4v14" />
                        <path d="M8 21v-2" />
                        <path d="M8 15v-2" />
                        <path d="M8 11v-2" />
                        <path d="M16 21v-2" />
                        <path d="M16 15v-2" />
                        <path d="M16 11v-2" />
                    </svg>
                 </div>
              </div>
              
              <h3 className="text-sm md:text-base font-serif font-bold text-[var(--color-text)] text-center group-hover:text-[var(--color-maroon)] transition-colors duration-300 tracking-wide leading-tight">
                {company.name}
              </h3>
              
              <div className="absolute bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                  <span className="text-[9px] text-[var(--color-accent)] uppercase tracking-[0.2em] font-bold">Partner</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SubCompaniesSection;
