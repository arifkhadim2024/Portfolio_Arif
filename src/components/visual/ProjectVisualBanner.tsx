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
  // Bespoke Restrained Editorial HUD Hologram
  const renderThematicHUD = () => {
    switch (project.id) {
      case 'neurovision-ai':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-[#B9A16B]/30 animate-ping opacity-25" />
            <div className="absolute w-20 h-20 rounded-full border-2 border-dashed border-[#B9A16B]/40 animate-spin-slow" />
            <div className="absolute p-2.5 rounded-full bg-[#0D0D0D]/90 border border-[#B9A16B]/60 shadow-[0_0_20px_#B9A16B] text-[#B9A16B]">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#B9A16B] to-transparent animate-laser-scan opacity-60" />
          </div>
        );

      case 'devflow-nexus':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute top-4 left-6 px-2.5 py-1 rounded-md bg-[#0D0D0D]/90 border border-[#B9A16B]/30 text-[10px] font-mono font-bold text-[#F2F0EA] shadow-lg backdrop-blur flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B9A16B] animate-ping" />
              <span>DEV_SYNC (12 peers)</span>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-[#0D0D0D]/90 border border-[#B9A16B]/50 shadow-[0_0_20px_#B9A16B] flex items-center justify-center text-[#B9A16B]">
              <Code className="w-6 h-6" />
            </div>
          </div>
        );

      case 'pulsefit-ai':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute top-4 right-6 px-2.5 py-1 rounded-md bg-[#0D0D0D]/90 border border-[#B9A16B]/30 text-[10px] font-mono font-bold text-[#F2F0EA] shadow-lg backdrop-blur flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-[#B9A16B]" />
              <span>BIOMECHANICS 117+</span>
            </div>
            <div className="w-20 h-20 rounded-full bg-[#0D0D0D]/90 border border-[#B9A16B]/50 shadow-[0_0_20px_#B9A16B] flex items-center justify-center text-[#B9A16B]">
              <HeartPulse className="w-6 h-6 animate-bounce" />
            </div>
          </div>
        );

      case 'mediscan':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 border-2 border-[#B9A16B]/40 rounded-lg animate-pulse flex items-center justify-center">
              <div className="w-3 h-3 border-t-2 border-l-2 border-[#B9A16B] absolute top-1 left-1" />
              <div className="w-3 h-3 border-t-2 border-r-2 border-[#B9A16B] absolute top-1 right-1" />
              <div className="w-3 h-3 border-b-2 border-l-2 border-[#B9A16B] absolute bottom-1 left-1" />
              <div className="w-3 h-3 border-b-2 border-r-2 border-[#B9A16B] absolute bottom-1 right-1" />
              <span className="text-[10px] font-mono font-bold text-[#F2F0EA] bg-[#0D0D0D]/90 px-2 py-0.5 rounded border border-[#B9A16B]/25">
                CV OCR
              </span>
            </div>
          </div>
        );

      case 'cine-verse':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-[#0D0D0D]/90 border border-[#B9A16B]/50 shadow-[0_0_20px_#B9A16B] flex items-center justify-center text-[#B9A16B]">
              <Film className="w-6 h-6" />
            </div>
          </div>
        );

      case 'ai-resume-matcher':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="p-3 rounded-2xl bg-[#0D0D0D]/90 border border-[#B9A16B]/50 shadow-[0_0_20px_#B9A16B] flex items-center justify-center text-[#B9A16B]">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        );

      case 'salary-predictor':
      case 'cloudpulse-monitor':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="p-3 rounded-2xl bg-[#0D0D0D]/90 border border-[#B9A16B]/50 shadow-[0_0_20px_#B9A16B] flex items-center justify-center text-[#B9A16B]">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="p-3 rounded-2xl bg-[#0D0D0D]/90 border border-[#B9A16B]/30 shadow-xl text-[#B9A16B]">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#080808] select-none ${
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
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/75 pointer-events-none" />

      {/* Thematic HUD Hologram */}
      {renderThematicHUD()}
    </div>
  );
};
