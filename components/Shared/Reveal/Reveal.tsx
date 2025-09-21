"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { RevealProps } from "./Reveal.types";

export const fadeIn = (position: "up" | "down" | "left" | "right", delay: number = 0): Variants => {
  const initialPositions = {
    up: { y: 100, x: 0 },
    down: { y: -100, x: 0 },
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
  };

  return {
    hidden: {
      ...initialPositions[position],
      opacity: 0,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export function Reveal(props: RevealProps) {
  const { children, position, className, delay } = props;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeIn(position, delay)}
      initial="hidden"
      animate={mainControls}
    >
      {children}
    </motion.div>
  );
}
