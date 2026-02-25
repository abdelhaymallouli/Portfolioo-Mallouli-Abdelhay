"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode, memo } from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

const FadeInContent = ({
  children,
  delay = 0,
  direction = "up",
  duration = 0.5,
  className,
  ...props
}: FadeInProps) => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn = memo(FadeInContent);
