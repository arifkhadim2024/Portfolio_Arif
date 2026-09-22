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
  const ringX = useSpring(mouseX, { damping: 24, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 24, stiffness: 200, mass: 0.5 });

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
        setCursorLabel('VIEW');
      } else if (threeDCanvas) {
        setCursorType('3d');
        setCursorLabel('3D');
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
      {/* 1. Ambient Volumetric Lighting Glow Follower (Subtle Warm Accent) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-[#B9A16B]/10 via-[#B9A16B]/5 to-transparent blur-[100px] opacity-50 dark:opacity-50 light:opacity-15"
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
          scale: cursorType === 'project' ? 2.2 : cursorType === '3d' ? 2.0 : cursorType === 'pointer' ? 1.4 : 1,
          borderColor:
            cursorType === 'project'
              ? 'rgba(185, 161, 107, 0.85)'
              : cursorType === '3d'
              ? 'rgba(185, 161, 107, 0.8)'
              : cursorType === 'pointer'
              ? 'rgba(185, 161, 107, 0.7)'
              : 'rgba(242, 240, 234, 0.25)',
          backgroundColor:
            cursorType === 'project'
              ? 'rgba(185, 161, 107, 0.12)'
              : cursorType === '3d'
              ? 'rgba(185, 161, 107, 0.1)'
              : cursorType === 'pointer'
              ? 'rgba(185, 161, 107, 0.08)'
              : 'transparent',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="w-7 h-7 rounded-full border border-[#B9A16B]/30 backdrop-blur-[2px] flex items-center justify-center shadow-lg shadow-black/40"
      >
        {cursorLabel && (
          <span className="text-[7px] font-mono font-bold tracking-widest text-[#F2F0EA] uppercase text-center px-1">
            {cursorLabel}
          </span>
        )}
      </motion.div>

      {/* 3. High-Precision Central Micro-Dot (Subtle Warm Accent) */}
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
        className="w-1.5 h-1.5 rounded-full bg-[#B9A16B] shadow-[0_0_6px_#B9A16B]"
      />
    </div>
  );
};
