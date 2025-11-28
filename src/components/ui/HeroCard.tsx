"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface HeroCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function HeroCard({
  icon: Icon,
  title,
  description,
}: HeroCardProps) {
  return (
    <motion.div
      // Base styles for the "Modern Architectural Card"
      className="p-6 md:p-8 border border-secondary/10 bg-white shadow-xl rounded-lg cursor-pointer transform transition-all duration-300 relative overflow-hidden"
      // Framer Motion interactive effects
      whileHover={{
        y: -10, // Lifts the card up
        boxShadow:
          "0 20px 25px -5px rgba(127, 0, 0, 0.1), 0 10px 10px -5px rgba(127, 0, 0, 0.04)", // Maroon-tinted shadow
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <Icon className="h-8 w-8 text-secondary" />
        <h3 className="text-xl font-semibold text-text">{title}</h3>
      </div>
      <p className="text-text/70">{description}</p>

      {/* Decorative Maroon Strip */}
      <div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}
