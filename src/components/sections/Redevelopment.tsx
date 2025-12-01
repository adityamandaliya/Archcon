"use client";
import { Variants } from "framer-motion";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Home,
  Zap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

// Benefit Cards Data
const BENEFITS = [
  {
    id: 1,
    title: "Safety First",
    subtitle: "With No Compromise",
    icon: ShieldCheck,
    points: [
      "Brand-new structure with modern RCC techniques",
      "Fire safety compliance as per current laws",
      "Earthquake-resistant engineering",
      "Safer lifts, electrical systems & emergency exits",
    ],
    highlight: `Your family deserves a home built for today's standards, not yesterday's compromises`,
  },
  {
    id: 2,
    title: "Bigger, Better, Modern",
    subtitle: "At Zero Cost",
    icon: Home,
    points: [
      "A larger flat with extra carpet area",
      "Brand-new, premium interior layout",
      "Enhanced ventilation & natural light",
      "Modern amenities without touching your savings",
    ],
    highlight: `Upgrade your lifestyle without spending a single rupee`,
  },
  {
    id: 3,
    title: "Modern Amenities",
    subtitle: `Tailored for Today's Living`,
    icon: Zap,
    points: [
      "Modern lifts & reserved parking",
      "CCTV & access control systems",
      "Landscaped areas & solar panels",
      "Clubhouse, gym & rainwater harvesting",
    ],
    highlight: `Get a future-ready society—something repair work can never achieve`,
  },
  {
    id: 4,
    title: "Property Value Boost",
    subtitle: `Massive Wealth Creation`,
    icon: TrendingUp,
    points: [
      "25–40% increase in property value on average",
      "Higher rental income potential",
      "Faster resale demand in the market",
      "Single biggest wealth opportunity in lifetime",
    ],
    highlight: `For many families, redevelopment is the ultimate wealth-creation opportunity`,
  },
];

// Process Steps
const PROCESS_STEPS = [
  {
    number: "01",
    title: `Understanding Your Society's Vision`,
    description: `We meet your committee, understand pain points, expectations, and member priorities. This is where we listen—and design a solution that works for everyone.`,
  },
  {
    number: "02",
    title: "Technical & Feasibility Study",
    description: `Our team inspects structural conditions, plot potential, FSI availability, DP remarks, and municipal rules. Members get a clear roadmap and realistic proposal.`,
  },
  {
    number: "03",
    title: "Member Approvals",
    description: `We help conduct meetings, provide documents, and ensure all members understand their rights, benefits, and timelines. Transparency builds peace of mind and unity.`,
  },
  {
    number: "04",
    title: "Signing the Development Agreement",
    description: `Ensures carpet area increase, amenities, rent, deposit, corpus fund, timelines, and legal protections. All documented and registered to safeguard members.`,
  },
  {
    number: "05",
    title: "Smooth Transition to Temporary Homes",
    description: `We coordinate shifting, packers & movers, rental agreements, and monthly rent—ensuring a comfortable temporary stay without stress.`,
  },
  {
    number: "06",
    title: "Construction Phase",
    description: `Members receive regular updates, site progress reports, and full transparency at each stage. You stay informed throughout the entire process.`,
  },
  {
    number: "07",
    title: "Welcome Home",
    description: `You return to a brand-new building, larger flat, premium construction, modern amenities, and higher property value. It's a reinvention of your life.`,
  },
];

// Why Choose Us
const WHY_CHOOSE_US = [
  {
    title: `Trusted by Mumbai's Redevelopment Ecosystem`,
    description: `We understand how important trust, clarity, and timely delivery are for every society.`,
  },
  {
    title: "100% Transparent Communication",
    description: `Every member stays informed. Every decision is documented and accessible.`,
  },
  {
    title: "Clear Legal & Technical Framework",
    description: `We work with top-tier architects, lawyers, and project management consultants.`,
  },
  {
    title: "Zero Stress for Members",
    description: `We handle everything from paperwork to possession. You focus on your family.`,
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Benefit Card Component
function BenefitCard({
  benefit,
  index,
}: {
  benefit: (typeof BENEFITS)[0];
  index: number;
}) {
  const Icon = benefit.icon;

  return (
    <motion.div
      variants={cardVariants}
      className="group relative h-full"
      whileHover="hover"
    >
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-full"
      >
        <div className="relative h-full rounded-3xl border border-text/10 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-md p-8 lg:p-10 overflow-hidden group-hover:border-accent/40 transition-all duration-500">
          {/* Gradient Background Accent - Animated */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-maroon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Animated Corner Orb */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-maroon/15 to-transparent rounded-full blur-3xl"
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Content Container */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Header with Icon and Badge */}
            <div className="mb-6 flex items-start justify-between">
              <div className="flex-1">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.1 + index * 0.15,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-maroon via-maroon to-maroon/70 text-white shadow-lg shadow-maroon/20"
                >
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </motion.div>

                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-text leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-sm text-accent font-semibold mt-2 tracking-wide">
                  {benefit.subtitle}
                </p>
              </div>

              {/* Animated Check Circle */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="text-maroon/20 flex-shrink-0"
              >
                <CheckCircle2 className="w-8 h-8" strokeWidth={1} />
              </motion.div>
            </div>

            {/* Key Points with Staggered Animation */}
            <div className="space-y-3 mb-8 flex-1">
              {benefit.points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.2,
                    }}
                    className="mt-2 inline-block w-2 h-2 rounded-full bg-gradient-to-br from-accent to-maroon/60 flex-shrink-0"
                  />
                  <span className="text-sm text-text/80 leading-relaxed">
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Highlight Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-6 border-t border-accent/20"
            >
              <p className="text-sm italic text-accent font-medium leading-relaxed">
                "{benefit.highlight}"
              </p>
            </motion.div>
          </div>

          {/* Border Glow on Hover */}
          <motion.div
            className="absolute inset-0 rounded-3xl border border-accent/30 opacity-0 group-hover:opacity-100 pointer-events-none"
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
// Process Step Component
function ProcessStep({
  step,
  index,
}: {
  step: (typeof PROCESS_STEPS)[0];
  index: number;
}) {
  return (
    <motion.div variants={stepVariants} className="group relative">
      <div className="flex gap-6 lg:gap-10 items-start">
        {/* Sticky Number Circle */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="flex-shrink-0 pt-2"
        >
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-maroon via-maroon to-maroon/60 text-white flex items-center justify-center font-bold text-lg lg:text-xl shadow-lg shadow-maroon/30 group-hover:shadow-maroon/50 transition-all duration-300 sticky top-24 lg:top-32">
            {step.number}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="flex-1 pt-2 lg:pt-4"
          whileHover={{ x: 12 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        >
          <div className="relative">
            {/* Background on Hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute -left-4 -right-4 -top-2 -bottom-2 rounded-2xl bg-gradient-to-r from-accent/5 to-transparent -z-10"
            />

            <h4 className="text-xl lg:text-2xl font-bold text-text mb-3 leading-tight">
              {step.title}
            </h4>
            <p className="text-text/70 leading-relaxed lg:text-lg">
              {step.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Animated Connector Line */}
      {index < PROCESS_STEPS.length - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute left-8 lg:left-10 top-20 lg:top-24 w-0.5 h-24 lg:h-32 bg-gradient-to-b from-accent/40 via-accent/20 to-transparent origin-top group-hover:from-accent/60 transition-all duration-300"
        />
      )}
    </motion.div>
  );
}

// Why Choose Us Card
function WhyChooseCard({
  item,
  index,
}: {
  item: (typeof WHY_CHOOSE_US)[0];
  index: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="relative rounded-2xl border border-accent/20 bg-white/5 backdrop-blur-sm p-6 lg:p-8 h-full overflow-hidden hover:border-accent/40 transition-all duration-300">
        {/* Accent Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Check Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-maroon/20 text-maroon"
        >
          <CheckCircle2 className="w-6 h-6" strokeWidth={2} />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h4 className="text-lg font-bold text-text mb-2">{item.title}</h4>
          <p className="text-sm text-text/70 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Corner Accent */}
        <motion.div
          animate={{ rotate: [0, 180] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-maroon/10 to-transparent rounded-full blur-2xl"
        />
      </div>
    </motion.div>
  );
}

// Main Component
export default function Redevelopment() {
  return (
    <section className="relative w-full min-h-screen bg-primary py-24 lg:py-32 overflow-hidden">
      {/* Background Gradient Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 right-1/4 w-96 h-96 bg-maroon/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========== HERO SECTION ========== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-20 lg:mb-28 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-6 px-4 py-2.5 rounded-full bg-gradient-to-r from-accent/10 to-maroon/5 border border-accent/30 hover:border-accent/50 transition-all duration-300"
          >
            <span className="text-xs lg:text-sm font-bold text-accent tracking-widest uppercase">
              ✨ Our Core Service
            </span>
          </motion.div>

          {/* Main Heading */}
          <div className="mb-6 lg:mb-8">
            <h2 className="text-5xl lg:text-7xl font-serif font-bold text-text leading-tight mb-4">
              Redevelopment
            </h2>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block"
            >
              <span className="text-5xl lg:text-7xl font-serif font-bold bg-gradient-to-r from-maroon via-maroon to-accent bg-clip-text text-transparent">
                Excellence
              </span>
            </motion.div>
          </div>

          {/* Subheading */}
          <p className="text-lg lg:text-2xl text-text/70 max-w-3xl mx-auto leading-relaxed">
            Transform aging buildings into modern residential experiences that
            families deserve.
            <span className="text-accent font-semibold">
              {" "}
              Zero paperwork stress. 100% transparency. Pure results.
            </span>
          </p>
        </motion.div>

        {/* ========== BENEFITS GRID ========== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-28 lg:mb-36"
        >
          {BENEFITS.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </motion.div>

        {/* ========== PROCESS SECTION ========== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-28 lg:mb-32"
        >
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block mb-6 px-4 py-2.5 rounded-full bg-gradient-to-r from-accent/10 to-maroon/5 border border-accent/30 hover:border-accent/50 transition-all duration-300"
            >
              <span className="text-xs lg:text-sm font-bold text-accent tracking-widest uppercase">
                📋 The Journey
              </span>
            </motion.div>

            <h3 className="text-4xl lg:text-6xl font-serif font-bold text-text mb-6">
              Transparent <span className="text-maroon">Process</span>
            </h3>
            <p className="text-text/70 max-w-2xl mx-auto text-lg">
              Seven simple, clearly-defined steps ensuring complete clarity and
              member peace of mind throughout the redevelopment journey
            </p>
          </div>

          {/* Process Steps Timeline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            className="space-y-10 lg:space-y-14"
          >
            {PROCESS_STEPS.map((step, index) => (
              <ProcessStep key={step.number} step={step} index={index} />
            ))}
          </motion.div>
        </motion.div>

        {/* ========== WHY CHOOSE US SECTION ========== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block mb-6 px-4 py-2.5 rounded-full bg-gradient-to-r from-accent/10 to-maroon/5 border border-accent/30 hover:border-accent/50 transition-all duration-300"
            >
              <span className="text-xs lg:text-sm font-bold text-accent tracking-widest uppercase">
                ⭐ Why Societies Choose Us
              </span>
            </motion.div>

            <h3 className="text-4xl lg:text-6xl font-serif font-bold text-text mb-6">
              Trust & <span className="text-maroon">Experience</span>
            </h3>
            <p className="text-text/70 max-w-2xl mx-auto text-lg">
              Built on years of delivering exceptional results and building
              lifelong relationships with Mumbai`s residential communities
            </p>
          </div>

          {/* Why Choose Us Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16"
          >
            {WHY_CHOOSE_US.map((item, index) => (
              <WhyChooseCard key={index} item={item} index={index} />
            ))}
          </motion.div>

          {/* Final CTA Vision */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-accent/30 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-md p-10 lg:p-14 text-center overflow-hidden relative"
          >
            {/* Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-maroon/5 via-transparent to-accent/5" />

            <div className="relative z-10">
              <h4 className="text-3xl lg:text-5xl font-serif font-bold text-text mb-4 leading-tight">
                A Vision Beyond{" "}
                <span className="text-maroon">Construction</span>
              </h4>
              <p className="text-lg text-text/70 max-w-2xl mx-auto mb-8">
                We don`t rebuild buildings—we rebuild experiences, upgrade
                lifestyles, and secure futures. Your redevelopment is our
                passion, and your peace of mind is our priority.
              </p>

              {/* Animated Line Accent */}
              <motion.div
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="h-1 w-16 bg-gradient-to-r from-maroon to-accent mx-auto origin-center"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
