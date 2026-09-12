import React from 'react';
import type { Project } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { GitHubIcon } from '../common/BrandIcons';
import { ExternalLink, CheckCircle2, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';

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
        {/* Project Cover Image */}
        <div className="relative rounded-xl overflow-hidden border border-slate-700/60 aspect-video bg-slate-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <Badge variant="cyan" size="sm">
              {project.category}
            </Badge>
          </div>
        </div>

        {/* Title & Tagline */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white dark:text-white light:text-slate-900">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-primary-400 font-medium mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Metrics Grid if available */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100/90 border border-slate-800 dark:border-slate-800 light:border-slate-300">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="text-lg sm:text-xl font-extrabold text-accent-cyan flex items-center justify-center gap-1">
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
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400 font-semibold text-sm mb-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Challenge</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.problemSolved}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>The Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Key Features List */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 dark:text-slate-200 light:text-slate-800 mb-3">
              Key Features & Architectural Highlights
            </h4>
            <ul className="space-y-2">
              {project.keyFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Used */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 dark:text-slate-200 light:text-slate-800 mb-3">
            Technologies & Libraries
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
