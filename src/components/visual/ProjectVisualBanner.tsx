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
  // Bespoke Thematic Graphic Overlay depending on project ID / category
  const renderThematicHUD = () => {
    switch (project.id) {
      case 'neurovision-ai':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Neural scan laser ring */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-cyan-400/40 animate-ping opacity-30" />
            <div className="absolute w-20 h-20 rounded-full border-2 border-dashed border-cyan-400/60 animate-spin-slow" />
            <div className="absolute p-2.5 rounded-full bg-cyan-950/80 border border-cyan-400/80 shadow-[0_0_20px_#06B6D4] text-cyan-300">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            {/* Scanning Laser Beam */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser-scan opacity-75" />
          </div>
        );

      case 'devflow-nexus':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Synchronized collaborative cursor aura */}
            <div className="absolute top-4 left-6 px-2.5 py-1 rounded-md bg-indigo-600/90 text-[10px] font-mono font-bold text-white shadow-lg backdrop-blur flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE_SYNC (12 peers)</span>
            </div>
            <div className="w-20 h-20 rounded-2xl bg-indigo-950/80 border border-indigo-400/60 shadow-[0_0_20px_#6366F1] flex items-center justify-center text-indigo-300">
              <Code className="w-6 h-6" />
            </div>
          </div>
        );

      case 'pulsefit-ai':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute top-4 right-6 px-2.5 py-1 rounded-md bg-emerald-600/90 text-[10px] font-mono font-bold text-white shadow-lg backdrop-blur flex items-center gap-1">
              <Activity className="w-3 h-3 text-white" />
              <span>BIOMECHANICS 117+</span>
            </div>
            <div className="w-20 h-20 rounded-full bg-emerald-950/80 border border-emerald-400/60 shadow-[0_0_20px_#10B981] flex items-center justify-center text-emerald-300">
              <HeartPulse className="w-6 h-6 animate-bounce" />
            </div>
          </div>
        );

      case 'mediscan':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 border-2 border-cyan-400/50 rounded-lg animate-pulse flex items-center justify-center">
              <div className="w-3 h-3 border-t-2 border-l-2 border-cyan-300 absolute top-1 left-1" />
              <div className="w-3 h-3 border-t-2 border-r-2 border-cyan-300 absolute top-1 right-1" />
              <div className="w-3 h-3 border-b-2 border-l-2 border-cyan-300 absolute bottom-1 left-1" />
              <div className="w-3 h-3 border-b-2 border-r-2 border-cyan-300 absolute bottom-1 right-1" />
              <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded">
                CV OCR
              </span>
            </div>
          </div>
        );

      case 'cine-verse':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full bg-violet-950/80 border border-violet-400/60 shadow-[0_0_20px_#8B5CF6] flex items-center justify-center text-violet-300">
              <Film className="w-6 h-6" />
            </div>
          </div>
        );

      case 'ai-resume-matcher':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="p-3 rounded-2xl bg-amber-950/80 border border-amber-400/60 shadow-[0_0_20px_#F59E0B] flex items-center justify-center text-amber-300">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        );

      case 'salary-predictor':
      case 'cloudpulse-monitor':
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="p-3 rounded-2xl bg-sky-950/80 border border-sky-400/60 shadow-[0_0_20px_#0284C7] flex items-center justify-center text-sky-300">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        );

      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/20 shadow-xl text-primary-300">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-slate-950 select-none ${
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
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/40 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Thematic HUD Hologram */}
      {renderThematicHUD()}
    </div>
  );
};
