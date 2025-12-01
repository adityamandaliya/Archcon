"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { LucideMapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Mock Data for Mumbai Projects
const PROJECTS = [
  {
    id: 1,
    name: "Saideep Apartment",
    type: "Residential",
    lat: 19.11024717154869,
    lon: 72.8695991008313,
    status: "Completed",
    year: "2024",
  },
  {
    id: 2,
    name: "Vijay Apartment",
    type: "Residential",
    lat: 19.204512896893068,
    lon: 72.8439046695957,
    status: "Completed",
    year: "2018",
  },
  {
    id: 3,
    name: "Krish Royale",
    type: "Residential",
    lat: 19.22137813840749,
    lon: 72.84599410987323,
    status: "Completed",
    year: "2013",
  },
  {
    id: 4,
    name: "Vastubh Apartment",
    type: "Residential",
    lat: 19.222972112820834,
    lon: 72.85639335819292,
    status: "Completed",
    year: "2007",
  },
  {
    id: 5,
    name: "Bhailal Steel Impex",
    type: "Industrial",
    lat: 19.27208114776594,
    lon: 72.8840193495014,
    status: "Completed",
    year: "2004",
  },
  {
    id: 6,
    name: "Parikh Ind. Estate",
    type: "Industrial",
    lat: 19.270566565741046,
    lon: 72.8819504183833,
    status: "Completed",
    year: "2002",
  },
  {
    id: 7,
    name: "Hatkesh Udyog Nagar",
    type: "Industrial",
    lat: 19.28140709396304,
    lon: 72.87885187018514,
    status: "Completed",
    year: "2004",
  },
  {
    id: 8,
    name: "Patel Precision Eng. Pvt. Ltd.",
    type: "Industrial",
    lat: 19.59686778047216,
    lon: 73.11860314406887,
    status: "Completed",
    year: "1999",
  },
  {
    id: 9,
    name: "Al-Pack Paper Packaging Pvt. Ltd.",
    type: "Industrial",
    lat: 19.597890010662127,
    lon: 73.11898960756184,
    status: "Completed",
    year: "1998",
  },
  {
    id: 10,
    name: "Kohinoor Apartment",
    type: "Resi.+Commercial",
    lat: 19.284740216460868,
    lon: 72.87973961535695,
    status: "Completed",
    year: "2002",
  },
  {
    id: 11,
    name: "Glory Apartment",
    type: "Residential",
    lat: 19.285594463513803,
    lon: 72.88039072728012,
    status: "Completed",
    year: "2000",
  },
  {
    id: 12,
    name: "Satellite Park",
    type: "Resi./Comm./Rowhouse",
    lat: 19.28511054504845,
    lon: 72.880150289423,
    status: "Completed",
    year: "2000",
  },
  {
    id: 13,
    name: "Dev-Ashish",
    type: "Residential",
    lat: 19.305541741218736,
    lon: 72.86219516590693,
    status: "Completed",
    year: "1989",
  },
  {
    id: 14,
    name: "Shelter CHS",
    type: "Resi.+Commercial",
    lat: 19.09310813701736,
    lon: 72.84631502269733,
    status: "Upcoming",
    year: "-",
  },
];

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
    };
  }, []);

  const markers = useMemo(
    () =>
      PROJECTS.map((project) => (
        <Marker
          key={`marker-${project.id}`}
          latitude={project.lat}
          longitude={project.lon}
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
  const router = useRouter();
  return (
    <section className="relative w-full bg-primary py-12 lg:py-16 overflow-hidden">
      {/* Container with equal padding on all sides */}
      <div className="px-4 lg:px-8 max-w-[1600px] mx-auto">
        {/* Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
          {/* LEFT COLUMN - Text Content (5 columns on large screens) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6 lg:pr-12"
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text leading-tight mb-4">
                Building Across
                <span className="text-maroon block">Mumbai</span>
              </h2>
              <p className="text-text/70 text-base lg:text-lg leading-relaxed max-w-md">
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
            <button
              onClick={() => {
                router.push("/projects");
                setTimeout(() => window.scrollTo(0, 0), 0);
              }}
              className="group flex items-center gap-3 text-text font-medium hover:text-maroon transition-colors duration-300 pt-2"
            >
              <span className="text-lg">View All Projects</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
            </button>
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
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setPopupInfo(null)}
                    anchor="bottom"
                    offset={25}
                    className="custom-popup"
                  >
                    <div className="p-3 min-w-[200px]">
                      <h3 className="font-bold text-lg text-text mb-2">
                        {popupInfo.name}
                      </h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-text/70">
                          <span className="font-medium">Type:</span>{" "}
                          {popupInfo.type}
                        </p>
                        <p className="text-text/70">
                          <span className="font-medium">Year:</span>{" "}
                          {popupInfo.year}
                        </p>
                        <p>
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              popupInfo.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {popupInfo.status}
                          </span>
                        </p>
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
