"use client";

import { motion } from "framer-motion";

import dynamic from "next/dynamic";

const DynamicCapScene = dynamic(() => import("../three/CapScene"), {
  ssr: false,

  loading: () => <div className="absolute inset-0 bg-text/10 z-0" />,
});

export default function MotionStatement() {
  return (
    <section className="relative h-[800px] w-full bg-primary flex items-center justify-center">
      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-0 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-text text-left ml-auto max-w-md lg:pr-8"
          >
            <h1 className="text-[10vw] md:text-[6rem] lg:text-[8rem] font-medium leading-none tracking-tight mb-2">
              BUILT
            </h1>
            <p className="text-text font-medium text-sm tracking-wide leading-relaxed max-w-[280px]">
              EVERY STRUCTURE WE BUILD BEGINS WITH PURPOSE. IF IT'S WORTH
              BUILDING, IT'S WORTH BUILDING RIGHT. WE ARE ALL IN EVERY TIME.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-text text-left pt-6 lg:pt-0"
          >
            <div className="flex items-center gap-4 mb-0">
              <div className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 bg-secondary rounded-lg relative overflow-hidden flex items-center justify-center shadow-2xl flex-shrink-0">
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(127, 0, 0, 0.9) 0%, rgba(41, 41, 41, 1) 100%)",
                  }}
                />

                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <DynamicCapScene />
                </div>
              </div>

              <h1 className="text-[10vw] md:text-[6rem] lg:text-[8rem] font-medium leading-none tracking-tight">
                BY
              </h1>
            </div>

            <h1 className="text-[10vw] md:text-[6rem] lg:text-[8rem] font-medium leading-none tracking-tight -mt-2">
              PURPOSE
            </h1>
          </motion.div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.0 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-text/70 text-sm tracking-widest"
      >
        [ MOVING FORWARD TOGETHER ]
      </motion.p>
    </section>
  );
}
