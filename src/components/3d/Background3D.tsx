"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// The isolated mesh component to prevent re-rendering the Canvas provider
const DustParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random particles once
  const { positions, randomFactors } = useMemo(() => {
    const count = 400; // Low count for mobile performance
    const pos = new Float32Array(count * 3);
    const factors = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spread across a wide area: X(-10 to 10), Y(-10 to 10), Z(-5 to 5)
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      factors[i] = Math.random();
    }
    return { positions: pos, randomFactors: factors };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    // Very subtle slow rotation
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = time * 0.02;
  });

  // Use a subtle color that works in both light and dark modes.
  // CSS vars can't be read directly in WebGL without overhead, so we use a neutral/accent color.
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#6366f1" // Accent color
        transparent
        opacity={0.3} // Subtle
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-transparent">
      {/* dpr restriction handles high-density retina displays to prevent mobile battery drain */}
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <DustParticles />
      </Canvas>
    </div>
  );
}
