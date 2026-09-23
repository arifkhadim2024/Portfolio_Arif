import { useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface UseMagneticOptions {
  strength?: number; // 0 to 1 scale
  radius?: number;
}

export function useMagnetic({ strength = 0.35 }: UseMagneticOptions = {}) {
  const ref = useRef<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    x: smoothX,
    y: smoothY,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  };
}
