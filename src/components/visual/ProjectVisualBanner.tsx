import React from 'react';
import type { Project } from '../../types';
import { Brain, Code, Film, HeartPulse, Activity, BarChart3, ShoppingBag, Sparkles } from 'lucide-react';

interface ProjectVisualBannerProps {
  project: Project;
  className?: string;
  isModal?: boolean;
}

export const ProjectVisualBanner: React.FC<ProjectVisualBannerProps> = ({
  project,
  className = '',
  isModal = false,
}) => {
  // Bespoke Luxury Thematic Graphic Overlay
  const renderThematicHUD = () => {
    switch (project.id) {
      case 'neurovision-ai':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Violet + Deep Magenta scanning halo */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-purple-400/40 animate-ping opacity-30" />
            <div className="absolute w-20 h-20 rounded-full border-2 border-dashed border-fuchsia-400/60 animate-spin-slow" />
            <div className="absolute p-2.5 rounded-full bg-[#1a0b2e]/90 border border-purple-400/80 shadow-[0_0_24px_#9333ea] text-fuchsia-300">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            {/* Laser Beam in soft magenta/violet */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent animate-laser-scan opacity-70" />
          </div>
        );

      case 'devflow-nexus':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Purple + Plum + Soft Ivory Sync Badge */}
            <div className="absolute top-4 left-6 px-2.5 py-1 rounded-md bg-purple-950/90 border border-purple-500/40 text-[10px] font-mono font-bold text-[#FDFBF7] shadow-lg backdrop-blur flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-magenta animate-ping" />
              <span>DEV_SYNC (12 peers)</span>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-[#1a0b2e]/90 border border-purple-400/60 shadow-[0_0_22px_#7e22ce] flex items-center justify-center text-purple-200">
              <Code className="w-6 h-6" />
            </div>
          </div>
        );

      case 'pulsefit-ai':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute top-4 right-6 px-2.5 py-1 rounded-md bg-fuchsia-950/90 border border-fuchsia-500/40 text-[10px] font-mono font-bold text-[#FDFBF7] shadow-lg backdrop-blur flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-accent-gold" />
              <span>BIOMECHANICS 117+</span>
            </div>
            <div className="w-20 h-20 rounded-full bg-[#1e0a24]/90 border border-fuchsia-400/60 shadow-[0_0_22px_#c026d3] flex items-center justify-center text-fuchsia-300">
              <HeartPulse className="w-6 h-6 animate-bounce" />
            </div>
          </div>
        );

      case 'mediscan':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 border-2 border-purple-400/50 rounded-lg animate-pulse flex items-center justify-center">
              <div className="w-3 h-3 border-t-2 border-l-2 border-accent-gold absolute top-1 left-1" />
              <div className="w-3 h-3 border-t-2 border-r-2 border-accent-gold absolute top-1 right-1" />
              <div className="w-3 h-3 border-b-2 border-l-2 border-accent-gold absolute bottom-1 left-1" />
              <div className="w-3 h-3 border-b-2 border-r-2 border-accent-gold absolute bottom-1 right-1" />
              <span className="text-[10px] font-mono font-bold text-fuchsia-200 bg-[#160a22]/90 px-2 py-0.5 rounded border border-purple-500/30">
                CV OCR
              </span>
            </div>
          </div>
        );

      case 'cine-verse':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-[#1b0826]/90 border border-fuchsia-400/60 shadow-[0_0_22px_#a21caf] flex items-center justify-center text-fuchsia-300">
              <Film className="w-6 h-6" />
            </div>
          </div>
        );

      case 'ai-resume-matcher':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="p-3 rounded-2xl bg-[#1c1208]/90 border border-amber-400/60 shadow-[0_0_22px_#d97706] flex items-center justify-center text-amber-300">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        );

      case 'salary-predictor':
      case 'cloudpulse-monitor':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="p-3 rounded-2xl bg-[#160a22]/90 border border-purple-400/60 shadow-[0_0_22px_#7c3aed] flex items-center justify-center text-purple-300">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="p-3 rounded-2xl bg-[#140b20]/90 border border-purple-400/40 shadow-xl text-accent-gold">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#070709] select-none ${
        isModal ? 'aspect-video' : 'aspect-[16/10]'
      } ${className}`}
    >
      {/* Background Project Image with Contrast Grade */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.08] brightness-[0.92]"
        loading="lazy"
      />

      {/* Deep Vignette & Studio Lighting Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/50 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />

      {/* Thematic HUD Hologram */}
      {renderThematicHUD()}
    </div>
  );
};
