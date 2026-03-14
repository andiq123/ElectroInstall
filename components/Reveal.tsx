"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
}

export default function Reveal({ 
  children, 
  className, 
  delay = 0,
  yOffset = 40,
  duration = 0.6
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={cn("w-full h-full", className)}
    >
      {children}
    </motion.div>
  );
}
