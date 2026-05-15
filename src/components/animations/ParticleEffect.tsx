'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface ParticleEffectProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  className?: string;
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({
  count = 50,
  color = '#1B6EF3',
  size = 2,
  speed = 1,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    opacity: Math.random() * 0.7 + 0.3,
    scale: Math.random() * 0.5 + 0.5,
  }));

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            opacity: particle.opacity,
            scale: particle.scale,
          }}
          animate={{
            x: [`${particle.x}%`, `${(particle.x + particle.vx * 100) % 100}%`],
            y: [`${particle.y}%`, `${(particle.y + particle.vy * 100) % 100}%`],
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
            scale: [particle.scale, particle.scale * 1.2, particle.scale],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
};

// Magnetic hover effect component
interface MagneticProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  intensity = 0.3,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * intensity;
    const deltaY = (e.clientY - centerY) * intensity;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

// Floating elements component
export const FloatingElements: React.FC<{ className?: string }> = ({ className = '' }) => {
  const floatingElements = [
    { icon: '✦', size: 'text-2xl', delay: 0 },
    { icon: '◆', size: 'text-lg', delay: 0.5 },
    { icon: '★', size: 'text-xl', delay: 1 },
    { icon: '▲', size: 'text-sm', delay: 1.5 },
    { icon: '●', size: 'text-base', delay: 2 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} text-white/10`}
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            rotate: 0,
            scale: 0,
          }}
          animate={{
            y: [null, '-20%', '120%'],
            rotate: [0, 180, 360],
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: element.delay + Math.random() * 2,
            ease: "linear",
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default ParticleEffect;