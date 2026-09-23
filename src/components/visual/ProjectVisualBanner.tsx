import React from 'react';
import type { Project } from '../../types';
import { Brain, Code, Film, HeartPulse, Activity, BarChart3, ShoppingBag, Sparkles, Radio } from 'lucide-react';

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
  // Minimalist Monochromatic HUD Icon Overlay
  const renderThematicHUD = () => {
    switch (project.id) {
      case 'neurosense-wsn':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 rounded-full bg-[#111111]/90 border border-emerald-500/40 text-emerald-400 shadow-xl flex items-center gap-2">
              <Radio className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white pr-1">3D SIMULATION</span>
            </div>
          </div>
        );

      case 'neurovision-ai':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 rounded-full bg-[#111111]/90 border border-white/20 text-[#F2F1ED] shadow-xl">
              <Brain className="w-5 h-5" />
            </div>
          </div>
        );

      case 'devflow-nexus':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 rounded-full bg-[#111111]/90 border border-white/20 text-[#F2F1ED] shadow-xl">
              <Code className="w-5 h-5" />
            </div>
          </div>
        );

      case 'pulsefit-ai':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 rounded-full bg-[#111111]/90 border border-white/20 text-[#F2F1ED] shadow-xl">
              <HeartPulse className="w-5 h-5" />
            </div>
          </div>
        );

      case 'mediscan':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 rounded-full bg-[#111111]/90 border border-white/20 text-[#F2F1ED] shadow-xl">
              <Activity className="w-5 h-5" />
            </div>
          </div>
        );

      case 'cine-verse':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 rounded-full bg-[#111111]/90 border border-white/20 text-[#F2F1ED] shadow-xl">
              <Film className="w-5 h-5" />
            </div>
          </div>
        );

      case 'ai-resume-matcher':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 rounded-full bg-[#111111]/90 border border-white/20 text-[#F2F1ED] shadow-xl">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        );

      case 'salary-predictor':
      case 'cloudpulse-monitor':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 rounded-full bg-[#111111]/90 border border-white/20 text-[#F2F1ED] shadow-xl">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-3 rounded-full bg-[#111111]/90 border border-white/20 text-[#F2F1ED] shadow-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-[#E8E6E0] dark:bg-[#1A1A1A] select-none ${
        isModal ? 'aspect-video' : 'aspect-[16/10]'
      } ${className}`}
    >
      {/* Background Project Image */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out filter contrast-[1.05]"
        loading="lazy"
      />

      {/* Subtle Bottom Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Thematic HUD Hologram */}
      {renderThematicHUD()}
    </div>
  );
};
