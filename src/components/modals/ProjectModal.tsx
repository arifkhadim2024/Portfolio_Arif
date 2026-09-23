import React from 'react';
import type { Project } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { GitHubIcon } from '../common/BrandIcons';
import { ExternalLink, CheckCircle2, AlertCircle, Sparkles, TrendingUp, Cpu } from 'lucide-react';
import { ProjectVisualBanner } from '../visual/ProjectVisualBanner';

import { NeuroSenseWSN3D } from '../3d/NeuroSenseWSN3D';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="3xl">
      <div className="space-y-6">
        {/* Project Thematic Visual Banner or 3D Interactive Simulation */}
        {project.id === 'neurosense-wsn' ? (
          <div className="space-y-2">
            <NeuroSenseWSN3D isCompact />
            <div className="flex items-center justify-between text-[11px] font-mono text-[#888888]">
              <span>INTERACTIVE 3D SIMULATION ACTIVE</span>
              <span>100 NODES // SINK // ANN CLUSTERS</span>
            </div>
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md">
            <ProjectVisualBanner project={project} isModal />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <span className="px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-[#111111]/90 text-[#F2F1ED] backdrop-blur-sm">
                {project.category}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-[#F2F1ED]/90 text-[#111111] dark:bg-[#111111]/90 dark:text-[#F2F1ED] backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Project
                </span>
              )}
            </div>
          </div>
        )}

        {/* Title & Tagline */}
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display uppercase tracking-tight text-[#111111] dark:text-[#F2F1ED]">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm font-mono uppercase text-[#777777] tracking-wider">
            {project.tagline}
          </p>
        </div>

        {/* Metrics Grid if available */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center p-3 rounded-lg border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                <div className="text-lg sm:text-xl font-bold font-mono text-[#111111] dark:text-[#F2F1ED] flex items-center justify-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#111111] dark:text-[#F2F1ED]" />
                  <span>{metric.value}</span>
                </div>
                <div className="text-[11px] font-mono text-[#888888] uppercase tracking-wider mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Full Description */}
        <div className="text-sm sm:text-base text-[#555555] dark:text-[#AAAAAA] leading-relaxed font-body">
          <p>{project.description}</p>
        </div>

        {/* Problem & Solution Breakdown */}
        {(project.problemSolved || project.solution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.problemSolved && (
              <div className="p-5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#111111] dark:text-[#F2F1ED]">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Engineering Challenge</span>
                </div>
                <p className="text-xs sm:text-sm text-[#555555] dark:text-[#AAAAAA] leading-relaxed font-body">
                  {project.problemSolved}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="p-5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#111111] dark:text-[#F2F1ED]">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span>Architecture & Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-[#555555] dark:text-[#AAAAAA] leading-relaxed font-body">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Key Features List */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#888888] flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#111111] dark:text-[#F2F1ED]" />
              <span>Key Technical Deliverables</span>
            </h4>
            <ul className="space-y-2">
              {project.keyFeatures.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#555555] dark:text-[#AAAAAA]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#111111] dark:text-[#F2F1ED] flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Used */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#888888]">
            Stack & Dependencies
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="neutral" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-end gap-3">
          {project.githubUrl && (
            <Button
              variant="secondary"
              size="md"
              href={project.githubUrl}
              target="_blank"
              icon={<GitHubIcon size={15} />}
            >
              Source Code
            </Button>
          )}

          {project.liveUrl && (
            <Button
              variant="primary"
              size="md"
              href={project.liveUrl}
              target="_blank"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Launch Live Application
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
