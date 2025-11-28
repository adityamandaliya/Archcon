"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

interface CapModelProps {
  mousePos: { x: number; y: number };
}

export default function CapModel({ mousePos = { x: 0, y: 0 } }: CapModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  // State to track if the cursor is directly over the 3D model
  const [isHovering, setIsHovering] = useState(false);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    let targetXRotation, targetYRotation;

    if (isHovering) {
      // MANUAL CONTROL: Use the mouse position when hovering
      targetXRotation = mousePos.y * 0.7;
      targetYRotation = mousePos.x * 0.7;

      // Use a fast interpolation speed (0.1) for responsive control
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetXRotation,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetYRotation,
        0.1
      );
    } else {
      // IDLE ROTATION: Apply continuous, slow movement when idle using the scene clock
      const time = clock.getElapsedTime();
      const autoRotateX = Math.sin(time * 0.2) * 0.3;
      const autoRotateY = Math.cos(time * 0.2) * 0.3;

      // Use a slower interpolation speed (0.05) for smooth, subtle auto-motion
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        autoRotateX,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        autoRotateY,
        0.05
      );

      // Add a slight continuous spin on the Z-axis
      meshRef.current.rotation.z += 0.002;
    }
  });

  return (
    <TorusKnot
      ref={meshRef}
      args={[1.2, 0.4, 150, 20]}
      scale={0.5}
      position={[0, 0, 0]}
      // Set local state when mouse enters/leaves the model
      onPointerOver={() => {
        setHovered(true);
        setIsHovering(true);
      }}
      onPointerOut={() => {
        setHovered(false);
        setIsHovering(false);
      }}
    >
      <meshStandardMaterial
        color={hovered ? "#7F0000" : "#A00000"}
        roughness={0.5}
        metalness={0.1}
      />
    </TorusKnot>
  );
}
