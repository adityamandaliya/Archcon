"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, InstancedMesh, Object3D } from "three";

const COUNT = 100; // Number of "blocks" in the building
const SIZE = 5; // Spread of the building

export default function ConstructionModel() {
  const meshRef = useRef<InstancedMesh>(null);
  const lightRef = useRef<any>(null);

  // Generate random positions for our "building blocks"
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < COUNT; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xPos = (Math.random() - 0.5) * 10;
      const yPos = (Math.random() - 0.5) * 20; // Taller vertically
      const zPos = (Math.random() - 0.5) * 10;

      temp.push({ t, factor, speed, xPos, yPos, zPos, mx: 0, my: 0 });
    }
    return temp;
  }, []);

  const dummy = new Object3D();
  const color = new Color();

  useFrame((state) => {
    if (!meshRef.current) return;

    // Rotate the entire building slowly
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;

    particles.forEach((particle, i) => {
      let { t, factor, speed, xPos, yPos, zPos } = particle;

      // Animate scale to simulate "construction"
      // We use a sine wave to make blocks grow and shrink slightly like they are breathing
      const s = Math.abs(Math.cos(t));

      // Update particle time
      particle.t += speed;

      // Position logic
      dummy.position.set(xPos, yPos, zPos);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      // Apply the matrix to the instance
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      // Dynamic Lighting Color logic (Gold to Concrete transition)
      if (i % 2 === 0) color.set("#C4A484"); // Gold
      else color.set("#64748B"); // Concrete

      meshRef.current!.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        distance={40}
        intensity={500}
        color="#C4A484"
      />
      <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.2} metalness={0.8} />
      </instancedMesh>
    </>
  );
}
