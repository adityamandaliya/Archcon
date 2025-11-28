"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Hammer,
  Ruler,
  HardHat,
  Factory,
  Landmark,
  Wrench,
  PenTool,
  Home,
  Boxes,
} from "lucide-react";

// Placeholder items - replace with your actual logos/icons later
const SCROLL_ITEMS = [
  { id: 1, Icon: Building2, label: "WE SCALE IT" },
  { id: 2, Icon: Hammer, label: "Work is Play" },
  { id: 3, Icon: Ruler, label: "KASTLE AI" },
  { id: 4, Icon: HardHat, label: "Glyf" },
  { id: 5, Icon: Factory, label: "Outside" },
  { id: 6, Icon: Landmark, label: "ARCHCON" },
  { id: 7, Icon: Wrench, label: "BUILD CO" },
  { id: 8, Icon: PenTool, label: "DESIGN FIRM" },
  { id: 9, Icon: Home, label: "URBAN DEV" },
  { id: 10, Icon: Boxes, label: "CONSTRUCT" },
];

export default function InfiniteScrollBar() {
  // Duplicate the items array to create seamless loop
  const duplicatedItems = [...SCROLL_ITEMS, ...SCROLL_ITEMS];

  return (
    <section className="relative w-full bg-text py-8 overflow-hidden border-y border-primary/10">
      {/* Gradient Fade Effects on Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-text to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-text to-transparent z-10" />

      {/* Scrolling Container */}
      <div className="relative flex">
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 40, // Adjust speed (higher = slower)
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-4 flex-shrink-0"
            >
              {/* Icon Container */}
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>

              {/* Label */}
              <span className="text-primary text-xl md:text-2xl font-bold tracking-wide uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
