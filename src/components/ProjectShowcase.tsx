"use client";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Cpu } from "lucide-react";
import { useState } from "react";

export default function ProjectShowcase({
  image,
  title,
  status,
}: {
  image?: string;
  title: string;
  status?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  // Mouse parallax → 3D tilt (with a resting tilt so it reads 3D at rest)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-9deg", "9deg"]);
  const rotateX = useTransform(sy, [-0.5, 0.5], ["9deg", "3deg"]); // biased toward a resting downward tilt

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative overflow-hidden px-6 pt-28 pb-20">
      {/* Background depth */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Aurora glow blobs */}
        <motion.div
          className="absolute top-[-10%] left-1/2 h-[420px] w-[520px] -translate-x-1/2 rounded-full bg-accent/25 blur-[130px]"
          animate={{ x: [-40, 40, -40], y: [-10, 20, -10] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[10%] right-[8%] h-[300px] w-[300px] rounded-full bg-blue-400/15 blur-[120px]"
          animate={{ x: [20, -30, 20], y: [10, -20, 10] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Fading grid */}
        <div
          className="absolute inset-0 opacity-[0.15] dark:opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-accent) 1px, transparent 1px), linear-gradient(to bottom, var(--color-accent) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 40%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 40%, black 30%, transparent 75%)",
          }}
        />
      </div>

      {/* Back button */}
      <Link
        href="/#projects"
        className="absolute top-8 left-6 md:left-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card)] backdrop-blur-md border border-[var(--card-border)] text-[var(--muted)] hover:text-accent hover:border-accent/50 transition-all text-xs font-mono font-bold uppercase tracking-wider"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      {/* Status pill */}
      {status && (
        <div className="absolute top-8 right-6 md:right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card)] backdrop-blur-md border border-[var(--card-border)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--foreground)]">
            {status}
          </span>
        </div>
      )}

      {/* Floating 3D frame */}
      <div
        className="mx-auto max-w-5xl"
        style={{ perspective: "1200px" }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative rounded-2xl border border-white/10 bg-[var(--card)] shadow-[0_40px_90px_-24px_rgba(0,0,0,0.65)]"
        >
          {/* Accent glow under the frame */}
          <div className="absolute -inset-x-8 -bottom-8 top-1/2 -z-10 rounded-[3rem] bg-accent/25 blur-[80px]" />

          {/* Browser bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
          </div>

          {/* Screenshot */}
          <div className="relative aspect-video overflow-hidden rounded-b-2xl bg-neutral-900">
            {image && !imgFailed ? (
              <Image
                src={image}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover object-top"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Cpu size={72} strokeWidth={0.8} className="text-white/10" />
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Fade into content */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}
