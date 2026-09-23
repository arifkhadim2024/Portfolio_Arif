import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CursorGlow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'project' | '3d'>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isTouchDevice] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast direct spring for central micro-dot
  const dotX = useSpring(mouseX, { damping: 35, stiffness: 600 });
  const dotY = useSpring(mouseY, { damping: 35, stiffness: 600 });

  // Smooth trailing spring for outer badge/ring
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 300, mass: 0.4 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 300, mass: 0.4 });

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a, button, [role="button"], input, textarea, select');
      const projectCard = target.closest('[data-cursor="project"], .project-card-interactive');
      const threeDCanvas = target.closest('[data-cursor="3d"], .canvas-3d-interactive');

      if (projectCard) {
        setCursorType('project');
        setCursorLabel('VIEW');
      } else if (threeDCanvas) {
        setCursorType('3d');
        setCursorLabel('EXPLORE');
      } else if (clickable) {
        setCursorType('pointer');
        setCursorLabel('');
      } else {
        setCursorType('default');
        setCursorLabel('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Outer Badge / Trailing Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorType === 'project' ? 76 : cursorType === '3d' ? 68 : cursorType === 'pointer' ? 44 : 32,
          height: cursorType === 'project' ? 76 : cursorType === '3d' ? 68 : cursorType === 'pointer' ? 44 : 32,
          backgroundColor:
            cursorType === 'project' || cursorType === '3d'
              ? 'rgba(17, 17, 17, 0.96)'
              : 'transparent',
          borderColor:
            cursorType === 'project' || cursorType === '3d'
              ? 'rgba(17, 17, 17, 1)'
              : cursorType === 'pointer'
              ? 'rgba(17, 17, 17, 0.5)'
              : 'rgba(17, 17, 17, 0.25)',
          scale: 1,
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 350 }}
        className="rounded-full border flex items-center justify-center shadow-lg dark:bg-[#F2F1ED] dark:text-[#111111] dark:border-white/30 backdrop-blur-[1px]"
      >
        {cursorLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-mono font-bold tracking-widest text-[#F2F1ED] dark:text-[#111111] uppercase select-none text-center"
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>

      {/* 2. Precision Central Micro-Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType === 'project' || cursorType === '3d' ? 0 : 1,
          opacity: cursorType === 'project' || cursorType === '3d' ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-[#F2F1ED]"
      />
    </div>
  );
};
