"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import Map, { Marker, Popup, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { LucideMapPin, ArrowRight, X } from "lucide-react";
import ProjectImage from "../ui/ProjectImage";
import { motion } from "framer-motion";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";


const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function ProjectMap() {
  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      console.error("Mapbox token is missing! Please set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in Vercel environment variables.");
    }
  }, []);

  const [viewport, setViewport] = useState({
    latitude: 19.076,
    longitude: 72.8777,
    zoom: 10,
  });
  const [popupInfo, setPopupInfo] = useState<typeof PROJECTS[0] | null>(null);
  const [isMapActive, setIsMapActive] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapRef>(null);
  const lastTapRef = useRef<number>(0);

  // Handle double tap or double click to activate the map
  const handleInteractionTrigger = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      setIsMapActive(true);
    }
    lastTapRef.current = now;
  };


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
            mapRef.current?.flyTo({
              center: [project.lon!, project.lat!],
              duration: 1000,
              padding: { top: 300 } // Add padding to top to push map center down, leaving room for popup above
            });
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
                From residential redevelopments to industrial
                complexes, our projects shape the city&apos;s landscape.
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
                20+
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
              className="relative h-[450px] md:h-[550px] lg:h-[650px] w-full rounded-3xl overflow-hidden shadow-2xl border border-text/10"
              onClick={handleInteractionTrigger}
              // Prevent lenis scroll only when map is active
              {...(isMapActive ? { "data-lenis-prevent": "true" } : {})}
            >
              {/* Interaction Overlay - Unified for all devices */}
              {!isMapActive && (
                <div className="absolute inset-0 z-[50] bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6 transition-opacity duration-300 cursor-pointer group/overlay">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 mb-4 scale-110 group-hover/overlay:scale-125 transition-transform duration-500">
                    <LucideMapPin className="text-white w-8 h-8 animate-bounce" />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">Map is locked</h3>
                  <p className="text-white/80 text-sm max-w-[280px]">
                    <span className="hidden md:inline">Double click</span>
                    <span className="md:hidden">Double tap</span>
                    {" "}to explore map. Scroll outside the map area to continue browsing.
                  </p>
                </div>
              )}

              {/* Exit Interaction Button - Unified */}
              {isMapActive && (
                <div className="absolute top-4 right-4 z-[60] flex flex-col items-end gap-2 animate-in fade-in slide-in-from-top-4 duration-500">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMapActive(false);
                      setPopupInfo(null);
                    }}
                    className="flex items-center gap-2 bg-maroon text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-xl font-medium active:scale-95 hover:bg-maroon/90 transition-all pointer-events-auto"
                  >
                    <span className="text-xs md:text-sm">Exit Map</span>
                    <X className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                  <span className="hidden md:inline-block bg-black/40 backdrop-blur-md text-white/90 text-[10px] px-2 py-1 rounded-md border border-white/10 uppercase tracking-wider">
                    Interaction Active
                  </span>
                </div>
              )}

              {MAPBOX_TOKEN ? (
                <Map
                  ref={mapRef}
                  {...viewport}
                  onMove={(evt) => setViewport(evt.viewState)}
                  style={{ width: "100%", height: "100%" }}
                  mapStyle="mapbox://styles/mapbox/dark-v11"
                  mapboxAccessToken={MAPBOX_TOKEN}
                  minZoom={9}
                  maxZoom={15}
                  dragPan={isMapActive}
                  scrollZoom={isMapActive}
                  touchZoomRotate={isMapActive}
                  doubleClickZoom={isMapActive}
                >
                  {markers}

                  {popupInfo && popupInfo.lat && popupInfo.lon && (
                    <Popup
                      latitude={popupInfo.lat}
                      longitude={popupInfo.lon}
                      closeButton={false}
                      closeOnClick={false}
                      onClose={() => setPopupInfo(null)}
                      anchor="bottom"
                      offset={25}
                      focusAfterOpen={false}
                      className="custom-popup !p-0 !bg-transparent !max-w-none shadow-none border-none z-50"
                      style={{ maxWidth: 'none', padding: 0, background: 'transparent' }}
                    >
                      <div className="w-[75vw] max-w-[280px] md:w-[320px] p-0 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 font-sans">
                        {/* Image Header */}
                        <div className="relative h-36 md:h-48 w-full overflow-hidden bg-neutral-100">
                          {/* Blurred Background Layer - Fills the space */}
                          <div className="absolute inset-0">
                            <ProjectImage
                              src={popupInfo.images && popupInfo.images.length > 0 ? popupInfo.images[0] : (popupInfo.image || "")}
                              alt=""
                              fill
                              className="h-full w-full object-cover blur-xl scale-125 opacity-60"
                            />
                          </div>

                           {/* Main Image Layer - Shows the full image */}
                           <div className="absolute inset-0 p-1">
                              <ProjectImage
                                src={popupInfo.images && popupInfo.images.length > 0 ? popupInfo.images[0] : (popupInfo.image || "")}
                                alt={popupInfo.title}
                                fill
                                className="h-full w-full object-contain relative z-10"
                              />
                           </div>
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20 pointer-events-none" />
                          
                          {/* Status Badge */}
                          <div className="absolute bottom-3 left-3 z-30">
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
                            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all z-30 cursor-pointer"
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
                            <h3 className="font-serif font-bold text-lg md:text-xl text-gray-900 leading-tight">
                              {popupInfo.title}
                            </h3>
                          </div>

                          <div className="flex items-start gap-1.5 text-gray-500">
                            <LucideMapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <p className="text-[11px] md:text-xs leading-relaxed line-clamp-2">
                              {popupInfo.location}
                            </p>
                          </div>

                          {/* Footer / CTA */}
                          <div className="pt-3 border-t border-gray-100">
                            <Link
                              href={`/projects?projectId=${popupInfo.id}`}
                              className="group flex items-center justify-between w-full text-sm font-medium text-maroon hover:text-accent transition-colors transition-all pointer-events-auto"
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
              ) : (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center p-8 text-center">
                  <div className="max-w-md space-y-4">
                    <div className="bg-amber-50 text-amber-600 p-4 rounded-xl border border-amber-200 inline-block">
                      <LucideMapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="font-medium">Map configuration missing</p>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Please ensure <code className="bg-gray-200 px-1 rounded text-[10px]">NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN</code> is set in your environment variables.
                    </p>
                  </div>
                </div>
              )}

              {/* Map Overlay Badge */}
              <div className="absolute top-6 left-6 bg-primary/95 backdrop-blur-sm px-4 py-2 rounded-full border border-text/10 shadow-lg pointer-events-none hidden md:block">
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
