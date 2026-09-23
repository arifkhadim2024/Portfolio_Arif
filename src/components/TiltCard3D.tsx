import React, { useRef, useState } from 'react';

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  dataCursor?: string;
  onClick?: () => void;
}

export const TiltCard3D: React.FC<TiltCard3DProps> = ({
  children,
  className = '',
  maxTilt = 6,
  scale = 1.015,
  dataCursor = 'project',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shadowX: 0, shadowY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = Math.max(-maxTilt, Math.min(maxTilt, ((y - centerY) / centerY) * -maxTilt));
    const tiltY = Math.max(-maxTilt, Math.min(maxTilt, ((x - centerX) / centerX) * maxTilt));

    // Dynamic shadow shift in opposite direction
    const shadowX = ((x - centerX) / centerX) * -12;
    const shadowY = ((y - centerY) / centerY) * -15;

    // Glare position percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({
      x: tiltX,
      y: tiltY,
      shadowX,
      shadowY,
      glareX,
      glareY,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, shadowX: 0, shadowY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      style={{
        transform: isHovered
          ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px) scale3d(${scale}, ${scale}, ${scale})`
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)',
        boxShadow: isHovered
          ? `${tilt.shadowX}px ${tilt.shadowY + 12}px 35px -8px rgba(124, 58, 237, 0.35), 0 0 20px rgba(34, 211, 238, 0.15)`
          : '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        transition: isHovered
          ? 'transform 0.15s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.15s ease-out'
          : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className={`relative transform-style-3d will-change-transform overflow-hidden ${className}`}
    >
      {/* Glare Reflection Layer */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.18) 0%, rgba(124, 58, 237, 0.08) 40%, transparent 70%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};
