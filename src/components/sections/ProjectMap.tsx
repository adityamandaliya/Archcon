"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { LucideMapPin, ArrowRight, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";


const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function ProjectMap() {
  const [viewport, setViewport] = useState({
    latitude: 19.076,
    longitude: 72.8777,
    zoom: 10,
  });
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Disable Lenis when hovering over the map
  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer) return;

    const handleMouseEnter = () => {
      // Access Lenis instance and stop it
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.stop();
      }
    };

    const handleMouseLeave = () => {
      // Re-enable Lenis scrolling
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.start();
      }
    };

    mapContainer.addEventListener("mouseenter", handleMouseEnter);
    mapContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      mapContainer.removeEventListener("mouseenter", handleMouseEnter);
      mapContainer.removeEventListener("mouseleave", handleMouseLeave);
      // Ensure Lenis is restarted when component unmounts
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.start();
      }
    };
  }, []);

  const markers = useMemo(
    () =>
      PROJECTS.filter((p) => p.lat && p.lon).map((project) => (
        <Marker
          key={`marker-${project.id}`}
          latitude={project.lat!}
          longitude={project.lon!}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(project);
          }}
        >
          <LucideMapPin
            className={`h-8 w-8 cursor-pointer transition-all hover:scale-110 ${
              project.status === "Completed" ? "text-accent" : "text-maroon"
            }`}
            strokeWidth={2}
          />
        </Marker>
      )),
    []
  );

  return (
    <section id="projects" className="relative w-full bg-primary py-12 lg:py-16 overflow-hidden">
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
      {/* Container with equal padding on all sides */}
      <div className="px-4 lg:px-8 max-w-[1600px] mx-auto relative z-10">
        {/* Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          {/* LEFT COLUMN - Text Content (5 columns on large screens) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6 lg:pr-12 relative z-20"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-accent" />
              <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium">
                Our Footprint
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-text leading-tight mb-4">
                Building Across
                <span className="text-maroon block">Mumbai</span>
              </h2>
              <p className="text-text/70 text-lg md:text-lg leading-relaxed max-w-md">
                From residential redevelopments in Bandra to industrial
                complexes in Bhiwandi, our projects shape the city's landscape.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-text/10">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-maroon mb-1">
                  50+
                </div>
                <div className="text-text/60 text-sm uppercase tracking-wider">
                  Projects Completed
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-maroon mb-1">
                  35+
                </div>
                <div className="text-text/60 text-sm uppercase tracking-wider">
                  Active Years
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/projects"
              className="group flex items-center gap-3 text-text font-medium hover:text-maroon transition-colors duration-300 pt-2"
            >
              <span className="text-lg">View All Projects</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Link>

          </motion.div>

          {/* RIGHT COLUMN - Map (7 columns on large screens) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div
              ref={mapContainerRef}
              className="relative h-[550px] lg:h-[650px] w-full rounded-3xl overflow-hidden shadow-2xl border border-text/10"
            >
              <Map
                {...viewport}
                onMove={(evt) => setViewport(evt.viewState)}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
                minZoom={9}
                maxZoom={15}
                scrollZoom={true}
              >
                {markers}

                {popupInfo && (
                  <Popup
                    latitude={popupInfo.lat}
                    longitude={popupInfo.lon}
                    closeButton={false}
                    closeOnClick={false}
                    onClose={() => setPopupInfo(null)}
                    anchor="bottom"
                    offset={25}
                    className="custom-popup !p-0 !bg-transparent !max-w-none shadow-none border-none"
                    style={{ maxWidth: 'none', padding: 0, background: 'transparent' }}
                  >
                    <div className="w-[300px] p-0 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 font-sans">
                      {/* Image Header */}
                      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={popupInfo.image}
                          alt={popupInfo.title}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        
                        {/* Status Badge */}
                        <div className="absolute bottom-3 left-3">
                           <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm ${
                              popupInfo.status === "Completed"
                                ? "bg-green-500/90 text-white"
                                : "bg-amber-500/90 text-white"
                            }`}
                          >
                            {popupInfo.status}
                          </span>
                        </div>

                        {/* Custom Close Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPopupInfo(null);
                          }}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all z-10"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 space-y-3">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-accent/80">
                              {popupInfo.type}
                            </span>
                          </div>
                          <h3 className="font-serif font-bold text-xl text-gray-900 leading-tight">
                            {popupInfo.title}
                          </h3>
                        </div>

                        <div className="flex items-start gap-1.5 text-gray-500">
                          <LucideMapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                          <p className="text-xs leading-relaxed line-clamp-2">
                            {popupInfo.location}
                          </p>
                        </div>

                        {/* Footer / CTA */}
                        <div className="pt-3 border-t border-gray-100">
                           <Link
                            href={`/projects?projectId=${popupInfo.id}`}
                            className="group flex items-center justify-between w-full text-sm font-medium text-maroon hover:text-accent transition-colors"
                          >
                            <span>View Project Details</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Popup>
                )}
              </Map>

              {/* Map Overlay Badge */}
              <div className="absolute top-6 left-6 bg-primary/95 backdrop-blur-sm px-4 py-2 rounded-full border border-text/10 shadow-lg pointer-events-none">
                <span className="text-text text-sm font-medium">
                  📍 Mumbai, India
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}