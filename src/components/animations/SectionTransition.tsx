'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  staggerChildren?: number;
  morphBackground?: boolean;
  parallaxIntensity?: number;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  once = true,
  threshold = 0.1,
  staggerChildren = 0.1,
  morphBackground = false,
  parallaxIntensity = 0,
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once,
  });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxIntensity * -100]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const getVariants = () => {
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94] as const,
          staggerChildren,
        }
      }
    };

    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: 100, scale: 0.95 },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
              staggerChildren,
            }
          }
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -100, scale: 0.95 },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
              staggerChildren,
            }
          }
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: 100, rotateY: 15 },
          visible: { 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
              staggerChildren,
            }
          }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -100, rotateY: -15 },
          visible: { 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
              staggerChildren,
            }
          }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8, rotateX: 15 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            rotateX: 0,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
              staggerChildren,
            }
          }
        };
      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: 10, scale: 0.9 },
          visible: { 
            opacity: 1, 
            rotate: 0, 
            scale: 1,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
              staggerChildren,
            }
          }
        };
      default:
        return baseVariants;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={getVariants()}
      className={className}
      style={parallaxIntensity > 0 ? { y: smoothY } : undefined}
    >
      {morphBackground && (
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-3xl" />
        </motion.div>
      )}
      {children}
    </motion.div>
  );
};

export default SectionTransition;