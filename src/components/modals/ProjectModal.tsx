import React from 'react';
import type { Project } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { GitHubIcon } from '../common/BrandIcons';
import { ExternalLink, CheckCircle2, AlertCircle, Sparkles, TrendingUp, Cpu } from 'lucide-react';
import { ProjectVisualBanner } from '../visual/ProjectVisualBanner';

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
        {/* Project Thematic Visual Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <ProjectVisualBanner project={project} isModal />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
            <Badge variant="cyan" size="md">
              {project.category}
            </Badge>
            {project.featured && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-600/90 text-white backdrop-blur shadow-lg border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
                Featured Project
              </span>
            )}
          </div>
        </div>

        {/* Title & Tagline */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-primary-400 font-medium mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Metrics Grid if available */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100/90 border border-slate-800 dark:border-slate-800 light:border-slate-300 shadow-inner">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center p-2 rounded-xl bg-slate-800/40">
                <div className="text-lg sm:text-xl font-extrabold text-accent-cyan flex items-center justify-center gap-1.5 font-mono">
                  <TrendingUp className="w-4 h-4 text-accent-cyan" />
                  <span>{metric.value}</span>
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Full Description */}
        <div className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
          <p>{project.description}</p>
        </div>

        {/* Problem & Solution Breakdown */}
        {(project.problemSolved || project.solution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.problemSolved && (
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/25 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>The Engineering Challenge</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                  {project.problemSolved}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4 flex-shrink-0" />
                  <span>Architecture & Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Key Features List */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary-400" />
              <span>Key Technical Highlights</span>
            </h4>
            <ul className="space-y-2">
              {project.keyFeatures.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Used */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
            Stack & Dependencies
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="primary" size="sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-wrap items-center justify-end gap-3">
          {project.githubUrl && (
            <Button
              variant="secondary"
              size="md"
              href={project.githubUrl}
              target="_blank"
              icon={<GitHubIcon size={16} />}
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
              icon={<ExternalLink className="w-4 h-4" />}
              iconPosition="right"
            >
              Launch Live App
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
