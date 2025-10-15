'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface SectionMorphProps {
  children: React.ReactNode;
  fromGradient: string;
  toGradient: string;
  className?: string;
}

export const SectionMorph: React.FC<SectionMorphProps> = ({
  children,
  fromGradient,
  toGradient,
  className = '',
}) => {
  const { scrollYProgress } = useScroll();
  
  // Create smooth morphing between gradients
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  
  const smoothBackground = useSpring(backgroundOpacity, { stiffness: 100, damping: 30 });
  const smoothOverlay = useSpring(overlayOpacity, { stiffness: 100, damping: 30 });

  return (
    <div className={`relative ${className}`}>
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: fromGradient,
          opacity: smoothBackground,
        }}
      />
      
      {/* Morphing overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: toGradient,
          opacity: smoothOverlay,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Parallax background component
interface ParallaxBackgroundProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  speed = 0.5,
  className = '',
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: smoothY }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Section divider with morphing effect
interface SectionDividerProps {
  variant?: 'wave' | 'diagonal' | 'curve' | 'zigzag';
  height?: number;
  color?: string;
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'wave',
  height = 100,
  color = 'currentColor',
  className = '',
}) => {
  const getSVGPath = () => {
    switch (variant) {
      case 'wave':
        return "M0,0 C150,100 350,20 600,60 C850,100 1050,20 1200,40 L1200,120 L0,120 Z";
      case 'diagonal':
        return "M0,120 L1200,0 L1200,120 Z";
      case 'curve':
        return "M0,120 Q600,0 1200,120 L1200,120 L0,120 Z";
      case 'zigzag':
        return "M0,120 L200,0 L400,120 L600,0 L800,120 L1000,0 L1200,120 L1200,120 L0,120 Z";
      default:
        return "M0,0 C150,100 350,20 600,60 C850,100 1050,20 1200,40 L1200,120 L0,120 Z";
    }
  };

  return (
    <div className={`relative w-full ${className}`} style={{ height }}>
      <motion.svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <motion.path
          d={getSVGPath()}
          fill={color}
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </motion.svg>
    </div>
  );
};

// Reveal text animation
interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const words = children.split(' ');

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          variants={{
            hidden: { opacity: 0, y: 50, rotateX: -90 },
            visible: { 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};