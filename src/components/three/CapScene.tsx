"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import CapModel from "./CapModel";
import { Suspense, useState } from "react";

export default function CapScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    // Normalize coordinates to a range of -1 to 1 for the 3D rotation input
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = (-(e.clientY - rect.top) / rect.height) * 2 + 1;

    setMousePos({ x, y });
  };

  return (
    <div className="absolute inset-0 z-0" onPointerMove={handlePointerMove}>
      <Canvas
        // FIX: Bring the camera much closer for the small box size (fov: 80, position: [0, 0, 2.5])
        camera={{ position: [0, 0, 2.5], fov: 80 }}
      >
        <Suspense fallback={null}>
          {/* Environment provides subtle reflections on the metal sphere */}
          <Environment preset="night" />

          {/* Lighting for cinematic effect */}
          {/* Increased intensity and moved light source to the front/side */}
          <directionalLight
            position={[10, 5, 10]}
            intensity={3}
            color="#C4A484"
          />
          <directionalLight
            position={[-10, 5, 10]}
            intensity={2}
            color="#F7F5F0"
          />
          <ambientLight intensity={0.5} />

          <CapModel mousePos={mousePos} />
        </Suspense>
      </Canvas>
    </div>
  );
}
