import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { profileData } from '../../data/profile';

interface EditorialPortrait3DProps {
  className?: string;
}

export const EditorialPortrait3D: React.FC<EditorialPortrait3DProps> = ({ className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Framer Motion 3D Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 260, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Multi-axis 3D rotations & depth parallax
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-14, 14]);
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* 3D Tilted Card Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative w-64 sm:w-72 lg:w-84 aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8E6E0] dark:bg-[#181818] border border-black/10 dark:border-white/10 shadow-2xl transition-shadow duration-500"
      >
        {/* Layer 1: Photographic Canvas */}
        <motion.img
          src="/editorial-portrait.jpg"
          alt={profileData.name}
          style={{
            transform: 'translateZ(10px)',
          }}
          className="w-full h-full object-cover object-top img-vibrant hover:scale-105 transition-all duration-700 ease-out"
          loading="eager"
        />

        {/* Layer 2: Subtle Studio Lighting Sheen / Dynamic Glare */}
        <motion.div
          style={{
            transform: 'translateZ(25px)',
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 65%)`,
          }}
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Layer 3: Faint Architectural Depth Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

        {/* Layer 4: Floating Minimalist Technical Frame Overlay */}
        <motion.div
          style={{
            transform: 'translateZ(35px)',
          }}
          className="absolute top-3 left-3 right-3 flex items-center justify-between text-[9px] font-mono text-white/70 uppercase tracking-widest pointer-events-none"
        >
          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/15">
            FIG. 01 // PORTRAIT
          </span>
          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/15">
            3D DEPTH
          </span>
        </motion.div>

        {/* Layer 5: Bottom Metadata Bar (Floating at Highest Z) */}
        <motion.div
          style={{
            transform: 'translateZ(45px)',
          }}
          className="absolute bottom-3.5 left-3.5 right-3.5 p-2.5 rounded-xl bg-[#111111]/90 text-[#F2F1ED] backdrop-blur-md border border-white/15 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider shadow-lg"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">{profileData.preferredName} Khadim</span>
          </div>
          <span className="text-[#AAAAAA]">CSE // AI // FULL STACK</span>
        </motion.div>
      </motion.div>

      {/* Floating 3D Depth Shadow Behind Card */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transform: 'translateZ(-30px)',
        }}
        className="absolute -inset-4 bg-black/20 dark:bg-black/60 rounded-3xl blur-xl -z-10 pointer-events-none"
      />
    </div>
  );
};
