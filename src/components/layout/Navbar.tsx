"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Variants } from "framer-motion";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "UPDATES", href: "#updates" },
  { label: "TEAM", href: "#team" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Handle scroll to hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (href: string) => {
    if (href === "#about") return pathname === "/";
    if (href === "/projects") return pathname === "/projects";
    return pathname === href;
  };

  const navbarVariants: Variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.07, delayChildren: 0.1 },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={isVisible ? "visible" : "hidden"}
        variants={navbarVariants}
        className="fixed top-0 left-0 right-0 z-50 font-sans"
      >
        {/* Frosted Glass Background */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md border-b border-white/10" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300 font-sans">
                  Archcon
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => {
                const active = isActive(item.href);
                const isHovered = hoveredItem === item.label;
                const hoveredIndex = navItems.findIndex(
                  (i) => i.label === hoveredItem
                );

                // Determine direction based on hovered item position
                let moveDirection = 0;
                if (hoveredItem && !isHovered) {
                  // If hovering on an item, move items away from it based on their position
                  moveDirection = index < hoveredIndex ? -20 : 20;
                }

                return (
                  <motion.div
                    key={item.label}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="relative"
                  >
                    {/* Invisible container for spacing */}
                    <motion.div
                      animate={{
                        x: moveDirection,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      className="relative px-3 py-2"
                    >
                      <Link
                        href={item.href}
                        className="relative block text-white/80 font-sans text-base font-medium transition-colors duration-200 hover:text-white"
                      >
                        {/* Text with scale animation */}
                        <motion.span
                          animate={{
                            scale: isHovered ? 1.15 : 1,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                          className="inline-block origin-center whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>

                        {/* Active State - Minimalist dot below text */}
                        {active && (
                          <motion.div
                            layoutId="activeDot"
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 40,
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button + Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Contact CTA Button - White/Transparent Default, Maroon on Hover */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden sm:inline-flex px-6 py-2 text-sm font-semibold text-black bg-white/70 rounded-lg font-sans hover:bg-maroon hover:text-white transition-all duration-300"
                >
                  Get In Touch
                </motion.a>
              </motion.div>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden absolute top-full left-0 right-0 bg-black/50 backdrop-blur-lg border-b border-white/10"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-2">
                {navItems.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <motion.div key={item.label} variants={menuItemVariants}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-lg font-sans transition-all duration-300 ${
                          active
                            ? "bg-accent/20 text-white border-l-2 border-accent"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA Button */}
                <motion.div variants={menuItemVariants} className="pt-2">
                  <motion.a
                    href="#contact"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full px-4 py-3 text-center font-semibold text-black bg-white/70 rounded-lg font-sans hover:bg-maroon hover:text-white transition-all duration-300"
                  >
                    Get In Touch
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content jump */}
      <div className="h-20" />
    </>
  );
}
