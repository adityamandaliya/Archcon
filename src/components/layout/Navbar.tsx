"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "/projects" },
    { label: "Updates", href: "#updates" },
    { label: "Contact", href: "#contact" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  // ... rest of component stays the same, but update nav links:
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-text/95 backdrop-blur-md border-b border-text/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold text-accent">
                Archcon
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className={`text-sm tracking-wide uppercase font-medium transition-colors duration-300 ${
                    isActive(item.href)
                      ? "text-accent"
                      : "text-primary hover:text-accent"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <button className="px-6 py-2 bg-accent text-text font-semibold rounded-lg hover:bg-accent/90 transition-all duration-300">
              CONTACT US
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-text/5 border-t border-text/10"
        >
          <div className="flex flex-col gap-4 p-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm tracking-wide uppercase font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-accent"
                    : "text-primary hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button className="w-full px-6 py-2 bg-accent text-text font-semibold rounded-lg hover:bg-accent/90 transition-all mt-4">
              CONTACT US
            </button>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
