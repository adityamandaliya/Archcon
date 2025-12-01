"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[0-9\s\-\+()]+$/.test(formData.phone) ||
      formData.phone.replace(/\D/g, "").length < 10
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to backend API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitStatus("success");
      setSubmitMessage(
        "Thank you for reaching out! We will get back to you within 24 hours."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Something went wrong. Please try again later.");
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const contactInfoData = useMemo(
    () => [
      {
        id: 1,
        icon: Mail,
        title: "Email",
        value: "contact@archcon.in",
        link: "mailto:contact@archcon.in",
      },
      {
        id: 2,
        icon: Phone,
        title: "Phone",
        value: "+91 (98) 9999-9999",
        link: "tel:+919899999999",
      },
      {
        id: 3,
        icon: MapPin,
        title: "Address",
        value: "Mumbai, Maharashtra, India",
        link: "https://maps.google.com/?q=Mumbai",
      },
    ],
    []
  );

  const projectTypes = useMemo(
    () => [
      { id: 1, value: "residential", label: "Residential Project" },
      { id: 2, value: "commercial", label: "Commercial Project" },
      { id: 3, value: "industrial", label: "Industrial Project" },
      { id: 4, value: "redevelopment", label: "Redevelopment" },
      { id: 5, value: "consultation", label: "Consultation" },
      { id: 6, value: "other", label: "Other" },
    ],
    []
  );

  return (
    <section
      className="relative min-h-screen bg-gradient-to-b from-primary to-white py-20 px-4 sm:px-6 lg:px-8"
      id="contact"
    >
      {/* Background Gradient Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-maroon/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="inline-block text-accent font-sans text-sm font-semibold tracking-widest mb-4">
            LET'S CONNECT
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text mb-6">
            Get In Touch <span className="text-maroon">With Us</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Have a project in mind? We'd love to hear from you. Reach out to our
            team and let's turn your vision into reality.
          </p>
        </motion.div>

        {/* Main Content Grid - FIXED LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Contact Info Cards - LEFT SIDE (Fixed Width) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-4 space-y-6"
          >
            {contactInfoData.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.a
                  key={info.id}
                  href={info.link}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  target={info.id === 3 ? "_blank" : undefined}
                  rel={info.id === 3 ? "noopener noreferrer" : undefined}
                  className="group block p-6 bg-white/50 backdrop-blur-md border border-accent/30 rounded-2xl hover:bg-white/70 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-accent to-maroon rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans font-semibold text-text mb-2">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 text-sm hover:text-maroon transition-colors line-clamp-2">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Contact Form - RIGHT SIDE (Fixed Width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-8 bg-white/50 backdrop-blur-xl border border-accent/30 rounded-3xl p-8 md:p-12 shadow-xl hover:shadow-2xl hover:border-accent/50 transition-shadow duration-300"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success/Error Message */}
              {submitStatus !== "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl flex items-start gap-3 ${
                    submitStatus === "success"
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  {submitStatus === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={`text-sm ${
                      submitStatus === "success"
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {submitMessage}
                  </p>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <label className="block text-sm font-semibold text-text mb-3 font-sans">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white/60 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon focus:border-transparent transition-all duration-300 placeholder-gray-400 disabled:opacity-50"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.05 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <label className="block text-sm font-semibold text-text mb-3 font-sans">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white/60 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon focus:border-transparent transition-all duration-300 placeholder-gray-400 disabled:opacity-50"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Field */}
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <label className="block text-sm font-semibold text-text mb-3 font-sans">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 (98) 9999-9999"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white/60 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon focus:border-transparent transition-all duration-300 placeholder-gray-400 disabled:opacity-50"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </motion.div>

                {/* Project Type */}
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: 0.15 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <label className="block text-sm font-semibold text-text mb-3 font-sans">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white/60 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon focus:border-transparent transition-all duration-300 text-gray-700 appearance-none cursor-pointer disabled:opacity-50"
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type.id} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.projectType}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Message Field */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <label className="block text-sm font-semibold text-text mb-3 font-sans">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  disabled={isSubmitting}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/60 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon focus:border-transparent transition-all duration-300 placeholder-gray-400 resize-none disabled:opacity-50"
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: 0.25 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-maroon to-maroon/80 hover:from-maroon/90 hover:to-maroon text-white font-serif font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Additional Info */}
              <p className="text-center text-xs text-gray-500 mt-6">
                We respect your privacy. Your information is safe with us.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
