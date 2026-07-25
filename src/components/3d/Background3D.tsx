"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DustParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const geoRef    = useRef<THREE.BufferGeometry | null>(null);
  const matRef    = useRef<THREE.PointsMaterial | null>(null);

  const { positions } = useMemo(() => {
    const count = 400;
    const pos   = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return { positions: pos };
  }, []);

  // Fix #7 — dispose WebGL resources on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      geoRef.current?.dispose();
      matRef.current?.dispose();
    };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.05;
    pointsRef.current.rotation.x = t * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.03}
        color="#c9a227"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-transparent">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <DustParticles />
      </Canvas>
    </div>
  );
}