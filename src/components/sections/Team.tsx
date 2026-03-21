"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Linkedin, ArrowRight } from "lucide-react";
import { FOUNDER, ASSOCIATES, TEAM_CATEGORIES, ALL_ASSOCIATES, TeamMember } from "@/lib/team";
import { Variants } from "framer-motion";

// Animation Variants
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },

  visible: {
    opacity: 1,
    scale: 1,
    filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.08))",
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    },
  },

  hover: {
    scale: 1.05,
    filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.15))",
    transition: {
      duration: 0.3,
      type: "tween",
      ease: "easeOut",
    },
  },
};


// Team Member Card Component
interface TeamCardProps {
  member: TeamMember;
  isFounder?: boolean;
  variant?: "default" | "large";
}

function TeamCard({
  member,
  isFounder = false,
  variant = "default",
}: TeamCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      variants={cardVariants}
      whileHover="hover"
      className={`group relative ${
        isFounder ? "col-span-full md:col-span-1" : ""
      }`}
    >
      <div className="relative h-full rounded-2xl overflow-hidden bg-white border border-accent/30 group-hover:border-accent/50 transition-all duration-300 backdrop-blur-sm">
        {/* Image Container */}
        <div className="relative h-80 md:h-96 overflow-hidden bg-black/50">
          {/* Company Badge */}
          {member.company && (
            <div className="absolute top-0 right-0 z-20 bg-accent text-white px-4 py-2 rounded-bl-2xl font-sans text-xs font-bold tracking-widest shadow-lg">
              {member.company}
            </div>
          )}
          <Image
            src={member.image || "/images/team/user.png"}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            quality={90}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Name & Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl lg:text-3xl font-serif font-bold text-white mb-2"
            >
              {member.name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`font-semibold ${
                isFounder ? "text-accent" : "text-accent/80"
              }`}
            >
              {member.title}
            </motion.p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 lg:p-8">
          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-black/70 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300"
          >
            {member.bio}
          </motion.p>

          {/* Specialties - Animated on expand */}
          <AnimatePresence>
            {member.specialties && member.specialties.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-3">
                  Specialties
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty, idx) => (
                    <motion.span
                      key={specialty}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/30 hover:border-accent/60 transition-colors duration-300"
                    >
                      {specialty}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Info - Hidden by default, shown on hover/expand */}
          <motion.div
            variants={{
              hover: { opacity: 1, height: "auto" }
            }}
            initial={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 pt-6 border-t border-black/10 overflow-hidden"
          >
            {member.email && (
              <motion.a
                href={`mailto:${member.email}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white/10 hover:bg-accent/20 text-black hover:text-accent transition-all duration-300"
                title={member.email}
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            )}

            {member.phone && (
              <motion.a
                href={`tel:${member.phone}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white/10 hover:bg-accent/20 text-black hover:text-accent transition-all duration-300"
                title={member.phone}
              >
                <Phone className="w-4 h-4" />
              </motion.a>
            )}

            {member.linkedin && (
              <motion.a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white/10 hover:bg-accent/20 text-black hover:text-accent transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          whileHover={{ opacity: 0.1 }}
          initial={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-br from-accent/20 to-maroon/20 pointer-events-none"
        />
      </div>
    </motion.div>
  );
}

// Main Team Section Component
export default function Team() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isAllAssociatesExpanded, setIsAllAssociatesExpanded] = useState(false);

  return (
    <section
      className="relative w-full bg-primary py-24 lg:py-32 overflow-hidden"
      id="team"
    >
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
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-1/4 w-96 h-96 bg-maroon/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-accent font-sans text-sm font-semibold tracking-widest mb-4"
          >
            OUR EXCELLENCE TEAM
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-serif font-bold text-text mb-6 leading-tight"
          >
            Expertise Behind
            <motion.span className="block text-maroon">
              Success
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-text/60 text-lg md:text-xl max-w-2xl mx-auto font-light"
          >
            A powerhouse of architects, engineers, and consultants dedicated to
            transforming buildings and communities.
          </motion.p>
        </motion.div> */}
        {/* ========== FOUNDER SECTION ========== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-28 lg:mb-36"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-block text-accent font-sans text-sm font-semibold tracking-widest mb-4">
                LEADERSHIP
              </div>
            </motion.div>
            <h3 className="text-3xl lg:text-5xl font-serif font-bold text-text">
              Meet the <span className="text-maroon">Founder</span>
            </h3>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto"
          >
            <TeamCard member={FOUNDER} isFounder={true} />
          </motion.div>
        </motion.div>
        {/* ========== ASSOCIATES SECTION ========== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-28 lg:mb-36"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-block text-accent font-sans text-sm font-semibold tracking-widest mb-4">
                CORE TEAM
              </div>
            </motion.div>
            <h3 className="text-3xl lg:text-5xl font-serif font-bold text-text">
              Our Active <span className="text-maroon">Associates</span>
            </h3>
            {/* <p className="text-text/60 text-lg mt-4">
              Seasoned professionals driving strategic initiatives
            </p> */}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          >
            {ASSOCIATES.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </motion.div>
        </motion.div>
        {/* ========== ALL ASSOCIATES EXPANDABLE SECTION ========== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-28 lg:mb-36"
        >
          {/* Header */}
          <motion.div
            onClick={() => setIsAllAssociatesExpanded(!isAllAssociatesExpanded)}
            className="group cursor-pointer mb-8"
            whileHover={{ x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start justify-between p-6 lg:p-8 rounded-xl bg-gradient-to-r from-white/5 to-white/0 border border-accent/30 group-hover:border-accent/50 transition-all duration-300">
              <div className="flex-1">
                <motion.h4
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl lg:text-3xl font-bold text-text mb-2"
                >
                  All Associates
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-black/60 text-sm lg:text-base"
                >
                  View our complete network of 12+ associate partners driving success across projects
                </motion.p>
              </div>

              {/* Expand Icon */}
              <motion.div
                animate={{
                  rotate: isAllAssociatesExpanded ? 180 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="ml-4 flex-shrink-0 mt-2"
              >
                <ArrowRight className="w-6 h-6 text-accent" />
              </motion.div>
            </div>
          </motion.div>

          {/* Grid - Expandable */}
          <AnimatePresence>
            {isAllAssociatesExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12 pl-4 lg:pl-8 pt-6 border-l-2 border-accent/30">
                  {ALL_ASSOCIATES.map((member, memberIndex) => (
                    <motion.div
                      layout
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: memberIndex * 0.05 }}
                    >
                      <TeamCard member={member} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ========== TEAM CATEGORIES SECTION ========== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-block text-accent font-sans text-sm font-semibold tracking-widest mb-4">
                SPECIALIZED TEAM
              </div>
            </motion.div>
            <h3 className="text-3xl lg:text-5xl font-serif font-bold text-text">
              Departments & <span className="text-maroon">Experts</span>
            </h3>
            {/* <p className="text-text/60 text-lg mt-4">
              Specialized professionals in every domain of construction
              excellence
            </p> */}
          </div>

          {/* Team Categories */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16 lg:space-y-20"
          >
            {TEAM_CATEGORIES.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Category Header */}
                <motion.div
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === category.id ? null : category.id
                    )
                  }
                  className="group cursor-pointer mb-8"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start justify-between p-6 lg:p-8 rounded-xl bg-gradient-to-r from-white/5 to-white/0 border border-accent/30 group-hover:border-accent/50 transition-all duration-300">
                    <div className="flex-1">
                      <motion.h4
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl lg:text-3xl font-bold text-text mb-2"
                      >
                        {category.name}
                      </motion.h4>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-black/60 text-sm lg:text-base"
                      >
                        {category.description}
                      </motion.p>
                    </div>

                    {/* Expand Icon */}
                    <motion.div
                      animate={{
                        rotate: expandedCategory === category.id ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 flex-shrink-0 mt-2"
                    >
                      <ArrowRight className="w-6 h-6 text-accent" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Team Members Grid - Expandable */}
                <AnimatePresence>
                  {expandedCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap justify-center gap-8 lg:gap-10 mb-12 pl-4 lg:pl-8 pt-6 border-l-2 border-accent/30">
                        {category.members.map((member, memberIndex) => (
                          <motion.div
                            layout
                            key={member.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: memberIndex * 0.1 }}
                            className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.875rem)]"
                          >
                            <TeamCard member={member} />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
