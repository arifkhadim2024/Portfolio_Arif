import React, { useRef, useState } from 'react';

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Distance multiplier (0.1 to 0.5)
  activeScale?: number;
  dataCursor?: string;
}

export const MagneticWrapper: React.FC<MagneticWrapperProps> = ({
  children,
  className = '',
  strength = 0.35,
  activeScale = 1.05,
  dataCursor = 'link',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0, rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const maxPull = 8;
    const rawDeltaX = (e.clientX - centerX) * strength;
    const rawDeltaY = (e.clientY - centerY) * strength;
    const deltaX = Math.max(-maxPull, Math.min(maxPull, rawDeltaX));
    const deltaY = Math.max(-maxPull, Math.min(maxPull, rawDeltaY));

    // Subtle tilt rotation (max 4 degrees)
    const rotateY = Math.max(-4, Math.min(4, ((e.clientX - centerX) / (rect.width / 2)) * 4));
    const rotateX = Math.max(-4, Math.min(4, -((e.clientY - centerY) / (rect.height / 2)) * 4));

    setPosition({
      x: deltaX,
      y: deltaY,
      z: 4,
      rx: rotateX,
      ry: rotateY,
    });
  };

  const handleMouseEnter = () => {
    if (!isTouch) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0, z: 0, rx: 0, ry: 0 });
  };

  if (isTouch) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      className={`inline-block transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: isHovered
          ? `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateX(${position.rx}deg) rotateY(${position.ry}deg) scale(${activeScale})`
          : 'translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};
