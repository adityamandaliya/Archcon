"use client";

import { motion } from "framer-motion";
import { LucideArrowRight } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Updates", href: "#updates" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
      // Outer div remains fixed
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 lg:px-8 py-4"
    >
      <div
        // CHANGE 1: Darker background (bg-gray-900/60) and darker border (border-gray-700/50)
        className="w-full bg-gray-900/60 backdrop-blur-md rounded-2xl py-3 md:py-4 lg:py-5 flex items-center justify-between border border-gray-700/50 shadow-xl"
      >
        {/* Left Section: Archcon Brand (text color must be light for dark background) */}
        <div className="flex items-center space-x-4 ml-6 lg:ml-8">
          <div className="text-2xl font-bold text-white font-serif">
            <span className="text-accent">A</span>rchcon
          </div>
        </div>

        {/* Middle Section: Navigation Links (text color must be light for dark background) */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              // Text color changed to light gray/white (text-gray-200) for contrast
              className="relative text-gray-200 font-medium text-lg px-2 py-1"
              whileHover="hover"
            >
              {link.name}
              <motion.span
                className="absolute inset-0 bg-maroon rounded-md -z-10"
                variants={{
                  hover: { scaleX: 1, opacity: 1 },
                  rest: { scaleX: 0, opacity: 0.5 },
                }}
                initial="rest"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ scaleX: 0, originX: 0.5 }}
              />
            </motion.a>
          ))}
        </div>

        {/* Right Section: Contact Button */}
        <div className="flex items-center space-x-4 mr-6 lg:mr-8">
          <motion.button
            // CHANGE 2: Text color changed to black (text-gray-900)
            // Button background changed to white (bg-white) for high contrast with dark navbar
            className="flex items-center bg-white text-gray-900 font-bold py-2 px-5 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CONTACT US <LucideArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
