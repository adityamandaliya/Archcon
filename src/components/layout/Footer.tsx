"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUp, Mail, MapPin } from "lucide-react";
import { Variants } from "framer-motion";

const footerLinks = {
  index: [
    { label: "Home", href: "#" },
    { label: "Projects", href: "/projects" },
    { label: "Updates", href: "#updates" },
    { label: "Teams", href: "/team" },
  ],
  policies: [
    { label: "License Agreement", href: "#license" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Cookie Setting", href: "#cookies" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "Behance", href: "https://behance.net" },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const linkHoverVariants = {
  rest: { x: 0 },
  hover: { x: 5 },
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-black overflow-hidden">
      {/* Top Gradient Fade - Dark gradient that blends downward */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-maroon rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-accent rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-20">
        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            variants={containerVariants}
          >
            {/* Top Section - Company Info + Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 pb-20 border-b border-white/10">
              {/* Company Info */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-8">
                    Archcon Group
                  </h2>

                  {/* Location */}
                  <div className="flex items-start gap-3 mb-6 group cursor-pointer">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1 group-hover:text-maroon transition-colors duration-300" />
                    <div>
                      <p className="text-white/80 font-serif text-sm">
                        Mumbai, Borivali - India
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        Premier Redevelopment & Construction
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 group cursor-pointer mb-8">
                    <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-1 group-hover:text-maroon transition-colors duration-300" />
                    <motion.a
                      href="mailto:archcorealty@gmail.com"
                      whileHover={{ x: 5 }}
                      className="text-white/80 font-serif text-sm hover:text-accent transition-colors duration-300"
                    >
                      archcorealty@gmail.com
                    </motion.a>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-8 mt-12">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col"
                  >
                    <span className="text-2xl font-bold text-accent">50+</span>
                    <span className="text-xs text-white/60 uppercase tracking-wider mt-1">
                      Projects
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col"
                  >
                    <span className="text-2xl font-bold text-accent">35+</span>
                    <span className="text-xs text-white/60 uppercase tracking-wider mt-1">
                      Active Years
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Hero Image - Mumbai Sea-Link */}
              <motion.div
                variants={itemVariants}
                className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/20 group"
              >
                <Image
                  src="/images/mumbai-sealink.jpg"
                  alt="Mumbai Sea-Link - Iconic Symbol of Development"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                  quality={90}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Hover Glow */}
                <motion.div
                  whileHover={{ opacity: 0.1 }}
                  initial={{ opacity: 0 }}
                  className="absolute inset-0 bg-white"
                />
              </motion.div>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-20 pb-20 border-b border-white/10">
              {/* Index */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-white mb-6 font-serif">
                  Index
                </h3>
                <ul className="space-y-3">
                  {footerLinks.index.map((link) => (
                    <motion.li key={link.label}>
                      <motion.a
                        href={link.href}
                        variants={linkHoverVariants}
                        initial="rest"
                        whileHover="hover"
                        className="text-white/70 hover:text-accent text-sm font-serif transition-colors duration-300 inline-block"
                      >
                        {link.label}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Terms & Policies */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-white mb-6 font-serif">
                  Terms & Policies
                </h3>
                <ul className="space-y-3">
                  {footerLinks.policies.map((link) => (
                    <motion.li key={link.label}>
                      <motion.a
                        href={link.href}
                        variants={linkHoverVariants}
                        initial="rest"
                        whileHover="hover"
                        className="text-white/70 hover:text-accent text-sm font-serif transition-colors duration-300 inline-block"
                      >
                        {link.label}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Socials */}
              <motion.div variants={itemVariants}>
                <h3 className="text-xs uppercase tracking-widest font-semibold text-white mb-6 font-serif">
                  Socials
                </h3>
                <ul className="space-y-3">
                  {footerLinks.socials.map((link) => (
                    <motion.li key={link.label}>
                      <motion.a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={linkHoverVariants}
                        initial="rest"
                        whileHover="hover"
                        className="text-white/70 hover:text-accent text-sm font-serif transition-colors duration-300 inline-block"
                      >
                        {link.label} ↗
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6">
              {/* Copyright */}
              <motion.p
                variants={itemVariants}
                className="text-white/50 text-xs md:text-sm font-serif"
              >
                © 2025 Archcon Group. All rights reserved.
              </motion.p>

              {/* Back to Top Button */}
              <motion.button
                variants={itemVariants}
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-accent/20 border border-white/20 hover:border-accent/40 text-white hover:text-accent transition-all duration-300 font-serif text-sm font-semibold"
              >
                <span>Back to the Top</span>
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-maroon/10 via-transparent to-transparent pointer-events-none"
      />
    </footer>
  );
}
