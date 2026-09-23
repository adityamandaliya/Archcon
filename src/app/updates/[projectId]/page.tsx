"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { UPDATES, Update } from "@/lib/updates";
import { ProjectUpdatesFeed } from "@/components/sections/UpdatesSection";

export default function ProjectUpdatesPage() {
  const params = useParams();
  const rawId = params?.projectId;
  const projectId = typeof rawId === "string" ? parseInt(rawId, 10) : Number(rawId);

  const project = useMemo(() => {
    return PROJECTS.find((p) => p.id === projectId);
  }, [projectId]);

  // Get specific updates for this project from updates.ts
  const projectUpdates = useMemo(() => {
    if (!project) return [];
    
    const matched = UPDATES.filter((u) => u.projectId === project.id);
    
    // If specific updates are found in updates.ts, return them
    if (matched.length > 0) return matched;

    // Fallback: Create dynamic update card using project's image folder assets
    const validImages =
      project.images && project.images.length > 0 && project.images[0] !== ""
        ? project.images
        : project.image && project.image !== ""
        ? [project.image]
        : ["/images/projects/default_project.png"];

    const dynamicFallbackUpdate: Update = {
      id: project.id * 1000 + 1,
      projectId: project.id,
      date: project.startDate || "2026",
      dateFormatted: project.startDate || "Current Phase",
      heading: `${project.title} - Project Overview & Milestones`,
      description: project.description,
      category: "project",
      featured: true,
      images: validImages.map((imgUrl, index) => ({
        id: index + 1,
        url: imgUrl,
        alt: `${project.title} progress photo ${index + 1}`,
      })),
    };

    return [dynamicFallbackUpdate];
  }, [project]);

  if (!project) {
    return (
      <main className="min-h-screen bg-primary py-24 sm:py-32 flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-accent/20 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-text mb-3 sm:mb-4">
            Project Not Found
          </h2>
          <p className="text-text/60 text-xs sm:text-sm mb-6">
            The project update page you are looking for does not exist or may have been moved.
          </p>
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-maroon text-white font-semibold text-xs sm:text-sm hover:bg-maroon/90 transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Updates</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-primary py-24 lg:py-32 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] z-0"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #000 1px, transparent 1px),
            linear-gradient(0deg, #000 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-maroon/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-text/70 hover:text-maroon font-semibold text-xs sm:text-sm transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Updates</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block text-accent font-sans text-xs sm:text-sm font-semibold tracking-widest mb-2 sm:mb-3 uppercase">
            {project.type} UPDATES
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-text mb-3 sm:mb-4 leading-tight">
            {project.title}
            <span className="block text-maroon text-2xl sm:text-4xl md:text-5xl font-serif font-bold mt-1">
              Construction & Progress Feed
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-2 text-text/60 text-xs sm:text-sm md:text-base font-medium">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
              <span>{project.location}</span>
            </div>
            <span className="text-accent hidden sm:inline">•</span>
            <span className="text-maroon font-semibold">{project.status}</span>
          </div>
        </motion.div>

        {/* Project Specific Updates List */}
        <div className="w-full">
          <ProjectUpdatesFeed updatesList={projectUpdates} />
        </div>
      </div>
    </main>
  );
}
