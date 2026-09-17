import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CursorGlow: React.FC = () => {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary-500/10 via-accent-cyan/10 to-transparent blur-[90px] opacity-70 dark:opacity-60 light:opacity-25"
      />
    </div>
  );
};
