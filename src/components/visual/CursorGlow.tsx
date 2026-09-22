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

  // High responsiveness for the central micro-dot
  const dotX = useSpring(mouseX, { damping: 30, stiffness: 450 });
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 450 });

  // Spring with slight trailing inertia for the outer ring
  const ringX = useSpring(mouseX, { damping: 24, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 24, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element for cursor type
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('a, button, [role="button"], input, textarea, select');
      const projectCard = target.closest('[data-cursor="project"], .project-card-interactive');
      const threeDCanvas = target.closest('[data-cursor="3d"], .canvas-3d-interactive');

      if (projectCard) {
        setCursorType('project');
        setCursorLabel('EXPLORE');
      } else if (threeDCanvas) {
        setCursorType('3d');
        setCursorLabel('DEFORM');
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
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* 1. Ambient Volumetric Lighting Glow Follower (Metallic Gold to Warm Champagne) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-gold-500/15 via-gold-400/10 to-transparent blur-[110px] opacity-60 dark:opacity-60 light:opacity-20"
      />

      {/* 2. Trailing Outer Ring / Badge */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType === 'project' ? 2.4 : cursorType === '3d' ? 2.2 : cursorType === 'pointer' ? 1.5 : 1,
          borderColor:
            cursorType === 'project'
              ? 'rgba(245, 197, 66, 0.9)'
              : cursorType === '3d'
              ? 'rgba(212, 175, 55, 0.9)'
              : cursorType === 'pointer'
              ? 'rgba(212, 175, 55, 0.8)'
              : 'rgba(243, 232, 203, 0.3)',
          backgroundColor:
            cursorType === 'project'
              ? 'rgba(245, 197, 66, 0.15)'
              : cursorType === '3d'
              ? 'rgba(212, 175, 55, 0.15)'
              : cursorType === 'pointer'
              ? 'rgba(212, 175, 55, 0.1)'
              : 'transparent',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="w-8 h-8 rounded-full border border-gold-400/40 backdrop-blur-[3px] flex items-center justify-center shadow-xl shadow-gold-900/30"
      >
        {cursorLabel && (
          <span className="text-[7px] font-mono font-bold tracking-widest text-[#FFF8E7] uppercase text-center px-1">
            {cursorLabel}
          </span>
        )}
      </motion.div>

      {/* 3. High-Precision Central Micro-Dot (Metallic Gold) */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType !== 'default' ? 0 : 1,
          opacity: cursorType !== 'default' ? 0 : 1,
        }}
        className="w-1.5 h-1.5 rounded-full bg-accent-gold shadow-[0_0_8px_#D4AF37]"
      />
    </div>
  );
};
