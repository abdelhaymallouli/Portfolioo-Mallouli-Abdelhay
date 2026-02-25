"use client";
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

const InteractiveMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Base rotation
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;

    // Interactive rotation based on mouse or device tilt (handled by R3F's normalized pointer coordinates)
    // We use a lerp to make the movement silky smooth
    const targetX = (mouse.x * viewport.width) / 4;
    const targetY = (mouse.y * viewport.height) / 4;

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      0.05,
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.05,
    );
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[1, 4]}>
        <MeshDistortMaterial
          color="#6366f1" // Accent color
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.8}
          roughness={0.2}
          distort={0.4}
          speed={3}
          wireframe={true}
        />
      </Icosahedron>
    </Float>
  );
};

export default function Hero3D() {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[500px] absolute inset-0 -z-10 pointer-events-none opacity-50 dark:opacity-80 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <InteractiveMesh />
      </Canvas>
    </div>
  );
}
