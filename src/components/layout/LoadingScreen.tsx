"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Construction } from "lucide-react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    const minLoadTime = 2000; // Minimum 2 seconds for premium feel

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Slow down as we approach 90%
        if (prev >= 90) return prev;
        const increment = Math.random() * 10;
        return Math.min(prev + increment, 90);
      });
    }, 100);

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("loading-exit-start"));
          setIsLoading(false);
          document.body.style.overflow = "unset";
        }, 500); // Wait a bit at 100% before exiting
      }, remainingTime);
    };

    // Check if already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", handleLoad);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0E0E0E] flex flex-col items-center justify-center text-white"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          onAnimationComplete={(definition) => {
            if (definition === "exit" || (typeof definition === "object" && !Array.isArray(definition) && (definition as any).y === "-100%")) {
              window.dispatchEvent(new CustomEvent("loading-complete"));
            }
          }}
        >
          <div className="w-full max-w-sm px-8">
            {/* Logo/Brand Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 text-accent mb-4 opacity-80">
                <Construction size={24} strokeWidth={1.5} />
                <span className="text-sm tracking-[0.5em] uppercase font-light">Loading Experience</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tighter text-white">
                ARCH<span className="text-accent">CON</span>
              </h1>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden mb-4">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-maroon to-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            {/* Percentage & Status */}
            <div className="flex justify-between items-end">
              <span className="text-xs text-white/40 font-mono tracking-wider uppercase">
                {progress < 100 ? "Building Structure..." : "Welcome Home"}
              </span>
              <span className="text-4xl font-serif text-accent font-bold">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Background Decor */}
          <div className="absolute inset-0 pointer-events-none opacity-20" 
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
