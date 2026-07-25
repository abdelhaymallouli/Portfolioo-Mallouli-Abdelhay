"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sphere, Torus, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const STAR_COUNT = 1200;

// Decide whether the full WebGL scene should render.
// Skips it for users who prefer reduced motion or on low-end / small devices.
function useCanRender3D() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallOrWeak =
      window.matchMedia("(max-width: 768px)").matches ||
      (navigator.hardwareConcurrency ?? 8) <= 4;
    setOk(!reduced && !smallOrWeak);
  }, []);
  return ok;
}

// ─── Ambient Star Field ────────────────────────────────────────────────────────
const StarField = () => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
    return pos;
  }, []);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.getElapsedTime() * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.007} color="#94a3b8" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  );
};

// ─── Orbit Ring of Particles ──────────────────────────────────────────────────
const OrbitParticles = ({ radius, count, speed, color, tilt = 0 }: {
  radius: number; count: number; speed: number; color: string; tilt?: number;
}) => {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 0.12;
      pos[i * 3]     = Math.cos(angle) * (radius + spread);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.18;
      pos[i * 3 + 2] = Math.sin(angle) * (radius + spread);
    }
    return pos;
  }, [count, radius]);

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.rotation.y = s.clock.getElapsedTime() * speed;
    ref.current.rotation.x = tilt;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.016} color={color} transparent opacity={0.75}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false}
      />
    </points>
  );
};

// ─── Glowing Torus Rings ──────────────────────────────────────────────────────
const GlowRings = () => {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (r1.current) { r1.current.rotation.x = t * 0.28; r1.current.rotation.z = t * 0.08; }
    if (r2.current) { r2.current.rotation.y = t * 0.18; r2.current.rotation.x = t * -0.12; }
    if (r3.current) { r3.current.rotation.z = t * 0.22; r3.current.rotation.y = t * -0.09; }
  });

  return (
    <>
      <Torus ref={r1} args={[1.45, 0.007, 32, 220]}>
        <meshBasicMaterial color="#c9a227" transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
      </Torus>
      <Torus ref={r2} args={[1.85, 0.005, 32, 220]}>
        <meshBasicMaterial color="#dbb43a" transparent opacity={0.32} blending={THREE.AdditiveBlending} depthWrite={false} />
      </Torus>
      <Torus ref={r3} args={[2.25, 0.003, 32, 220]}>
        <meshBasicMaterial color="#a1a1aa" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </Torus>
    </>
  );
};

// ─── Central Distorted Sphere ─────────────────────────────────────────────────
const CoreSphere = () => {
  const ref = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.12 + THREE.MathUtils.lerp(0, mouse.x * 0.25, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.y * 0.25, 0.04);
  });

  return (
    <Sphere ref={ref} args={[0.72, 80, 80]}>
      <MeshDistortMaterial
        color="#2a2a2e"
        emissive="#c9a227"
        emissiveIntensity={0.7}
        roughness={0.05}
        metalness={0.9}
        distort={0.32}
        speed={1.8}
        transparent
        opacity={0.92}
      />
    </Sphere>
  );
};

// ─── Scene ────────────────────────────────────────────────────────────────────
const Scene = () => (
  <>
    <ambientLight intensity={0.15} />
    <pointLight position={[4, 4, 4]} intensity={2.2} color="#c9a227" />
    <pointLight position={[-5, -3, -4]} intensity={0.9} color="#a1a1aa" />
    <pointLight position={[0, -4, 2]} intensity={0.4} color="#dbb43a" />

    <StarField />

    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.9}>
      <GlowRings />
      <CoreSphere />
      <OrbitParticles radius={1.15} count={130} speed={0.45}  color="#c9a227" tilt={0.1} />
      <OrbitParticles radius={1.65} count={85}  speed={-0.28} color="#dbb43a" tilt={0.4} />
      <OrbitParticles radius={2.1}  count={55}  speed={0.16}  color="#a1a1aa" tilt={-0.3} />
    </Float>
  </>
);

// ─── Lightweight CSS fallback (reduced-motion / mobile / low-end) ───────────────
const StaticGlow = () => (
  <div className="w-full h-full absolute inset-0 -z-10 pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-accent/10 blur-[100px]" />
  </div>
);

// ─── Export ───────────────────────────────────────────────────────────────────
export default function Hero3D() {
  const canRender = useCanRender3D();

  if (!canRender) return <StaticGlow />;

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[500px] absolute inset-0 -z-10 pointer-events-none opacity-90 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 54 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}