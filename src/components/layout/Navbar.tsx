"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Variants } from "framer-motion";
import Image from "next/image";
import { UPDATES } from "@/lib/updates";
import { PROJECTS } from "@/lib/projects";

const navItems = [
  { label: "ABOUT", href: "/#redevelopment" },
  { label: "PROJECTS", href: "/projects" },
  { label: "UPDATES", href: "/updates" },
  { label: "TEAM", href: "/team" },
];

// Generate a unique fingerprint of all updates and project statuses
const getUpdatesSignature = () => {
  const updatesSummary = UPDATES.map((u) => `${u.id}:${u.date || ""}`).join("|");
  const projectsSummary = PROJECTS.map((p) => `${p.id}:${p.status || ""}`).join("|");
  return `v1_${UPDATES.length}_${PROJECTS.length}_${updatesSummary}_${projectsSummary}`;
};

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hasNewUpdates, setHasNewUpdates] = useState(false);

  // Check if there are new updates that the user hasn't seen yet
  useEffect(() => {
    try {
      const currentSignature = getUpdatesSignature();
      const lastSeenSignature = localStorage.getItem("archcon_last_seen_updates_signature");

      if (pathname.startsWith("/updates")) {
        // Automatically mark as seen when viewing the updates page
        localStorage.setItem("archcon_last_seen_updates_signature", currentSignature);
        setHasNewUpdates(false);
      } else if (lastSeenSignature !== currentSignature) {
        // Appears on first visit AND whenever any new update is added!
        setHasNewUpdates(true);
      } else {
        setHasNewUpdates(false);
      }
    } catch {
      // In case localStorage is blocked in private browsing
    }
  }, [pathname]);

  const handleUpdatesClick = () => {
    try {
      const currentSignature = getUpdatesSignature();
      localStorage.setItem("archcon_last_seen_updates_signature", currentSignature);
    } catch {}
    setHasNewUpdates(false);
  };

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

  const isActive = (href: string): boolean => {
    if (href === "/#redevelopment") return pathname === "/";
    if (href === "/projects") return pathname === "/projects";
    if (href === "/updates") return pathname === "/updates";
    if (href === "/team") return pathname === "/team";
    return pathname === href;
  };

  // Handle Get In Touch button click
  const handleGetInTouch = () => {
    const currentPath = pathname;

    if (currentPath === "/") {
      // Already on home, scroll to contact
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On different page, navigate to home with contact hash
      window.location.href = "/#contact";
    }
  };

  const navbarVariants: Variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const menuItemVariants: Variants = {
    closed: {
      opacity: 0,
      x: -20,
    },
    open: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <motion.nav
      initial={false}
      animate={isVisible ? "visible" : "hidden"}
      variants={navbarVariants}
      className="fixed top-0 left-0 right-0 z-50 font-sans"
    >
      {/* Frosted Glass Background */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-md border-b border-text/1" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >


            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/images/Logo/Archcon_logo_wt_red.png"
                alt="Archcon Logo"
                width={45}
                height={45}
                className="w-12 h-12 object-contain"
              />
              <span className="text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300 font-serif">
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
                    animate={{ x: moveDirection }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="relative px-3 py-2"
                  >
                    <Link
                      href={item.href}
                      onClick={item.href === "/updates" ? handleUpdatesClick : undefined}
                      className={`relative block font-sans text-base font-medium transition-colors duration-200 ${
                        active ? "text-white" : "text-white/80 hover:text-white"
                      }`}
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
                        className="relative inline-block origin-center whitespace-nowrap"
                      >
                        {item.label}

                        {/* Minimalist Notification Indicator for Updates */}
                        <AnimatePresence>
                          {item.href === "/updates" && hasNewUpdates && (
                            <motion.span
                              key="updates-indicator"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="absolute -top-1 -right-2.5 flex h-2 w-2 pointer-events-none"
                            >
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 duration-1000" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)] border border-black/40" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.span>
                    </Link>

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
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Contact CTA Button - White/Transparent Default, Maroon on Hover */}
            <motion.button
              onClick={handleGetInTouch}
              type="button"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:inline-flex px-6 py-2 text-sm font-semibold text-black bg-white/70 rounded-lg font-sans hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer"
            >
              Get In Touch
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
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
              <AnimatePresence>
                {!isOpen && hasNewUpdates && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-1.5 right-1.5 flex h-2 w-2 pointer-events-none"
                  >
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 duration-1000" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)] border border-black/40" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
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
              className="md:hidden absolute top-full left-0 right-0 bg-black/45 backdrop-blur-md border-b border-text/1"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-2">
                {navItems.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <motion.div key={item.label} variants={menuItemVariants}>
                      <Link
                        href={item.href}
                        onClick={() => {
                          if (item.href === "/updates") handleUpdatesClick();
                          setIsOpen(false);
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg font-sans transition-all duration-300 ${
                          active
                            ? "bg-text/20 text-white "
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {item.label}
                          {item.href === "/updates" && hasNewUpdates && (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 duration-1000" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]" />
                            </span>
                          )}
                        </span>
                        {item.href === "/updates" && hasNewUpdates && (
                          <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                            New
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA Button */}
                <motion.div variants={menuItemVariants} className="pt-2">
                  <motion.button
                    onClick={() => {
                      handleGetInTouch();
                      setIsOpen(false);
                    }}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full px-4 py-3 text-center font-semibold text-black bg-white/70 rounded-lg font-sans hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    Get In Touch
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
