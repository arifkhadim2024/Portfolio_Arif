import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Project } from '../../types';
import { ProjectVisualBanner } from './ProjectVisualBanner';
import { NeuroSenseWSN3D } from '../3d/NeuroSenseWSN3D';
import { Radio, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ProjectCard3DProps {
  project: Project;
  projectNumber: string;
  onOpenModal: () => void;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  project,
  projectNumber,
  onOpenModal,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [is3DMode, setIs3DMode] = useState(project.id === 'neurosense-wsn');

  // Mouse tilt physics with spring damping
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 280, mass: 0.4 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-9, 9]);
  const shadowX = useTransform(smoothMouseX, [-0.5, 0.5], [15, -15]);
  const shadowY = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // If interacting directly with 3D canvas on neurosense-wsn, don't over-tilt
    if (is3DMode && project.id === 'neurosense-wsn') return;
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
      style={{ perspective: 1200 }}
      className="relative select-none"
    >
      <motion.div
        style={{
          rotateX: is3DMode && project.id === 'neurosense-wsn' ? 0 : rotateX,
          rotateY: is3DMode && project.id === 'neurosense-wsn' ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered && !(is3DMode && project.id === 'neurosense-wsn') ? 1.015 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="project-card-interactive relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#E8E6E0] dark:bg-[#1A1A1A] shadow-lg group-hover:border-black/30 dark:group-hover:border-white/30 transition-shadow duration-500"
      >
        {/* Render Live 3D Simulation for NeuroSense WSN or Standard Visual Banner */}
        {project.id === 'neurosense-wsn' && is3DMode ? (
          <div className="relative">
            <NeuroSenseWSN3D isCompact />
            {/* 3D Mode Toggle Switcher */}
            <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 p-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono">
              <button
                onClick={() => setIs3DMode(true)}
                className="px-2 py-1 rounded bg-emerald-500 text-black font-bold flex items-center gap-1 cursor-pointer"
              >
                <Radio className="w-3 h-3" /> 3D View
              </button>
              <button
                onClick={() => setIs3DMode(false)}
                className="px-2 py-1 rounded text-white/70 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ImageIcon className="w-3 h-3" /> Photo
              </button>
            </div>
          </div>
        ) : (
          <div
            data-cursor="project"
            onClick={onOpenModal}
            className="cursor-pointer relative overflow-hidden"
          >
            <ProjectVisualBanner project={project} />

            {/* NeuroSense WSN Photo-Mode Toggle */}
            {project.id === 'neurosense-wsn' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIs3DMode(true);
                }}
                className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xl hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Launch 3D Lab</span>
              </button>
            )}

            {/* Dynamic Glare Reflection */}
            <motion.div
              style={{
                transform: 'translateZ(20px)',
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`,
              }}
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        )}

        {/* Top corner metadata tags with 3D elevation */}
        <motion.div
          style={{
            transform: 'translateZ(30px)',
          }}
          className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none"
        >
          <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#111111]/90 text-[#F2F1ED] backdrop-blur-sm shadow-md">
            {projectNumber}
          </span>
          <div className="flex items-center gap-1.5">
            {project.featured && (
              <span className="px-2 py-0.5 rounded-md text-[9px] font-mono uppercase tracking-wider bg-emerald-500 text-black font-bold flex items-center gap-1 shadow-md">
                <Sparkles className="w-2.5 h-2.5" /> FEATURED
              </span>
            )}
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-[#F2F1ED]/90 text-[#111111] dark:bg-[#111111]/90 dark:text-[#F2F1ED] backdrop-blur-sm shadow-md">
              {project.category}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Dynamic 3D Cast Shadow */}
      <motion.div
        style={{
          x: shadowX,
          y: shadowY,
          transform: 'translateZ(-20px)',
        }}
        className="absolute -inset-2 bg-black/10 dark:bg-black/40 rounded-3xl blur-xl -z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
  );
};
