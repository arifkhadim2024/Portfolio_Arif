import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, projectCategories } from '../data/projects';
import type { Project, ProjectCategory } from '../types';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { ProjectModal } from '../components/modals/ProjectModal';
import { ProjectVisualBanner } from '../components/visual/ProjectVisualBanner';
import { GitHubIcon } from '../components/common/BrandIcons';
import { ExternalLink, Eye, TrendingUp, Sparkles, Layers } from 'lucide-react';
import { TiltCard } from '../components/visual/TiltCard';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 lg:py-32 relative bg-dark-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Featured Work"
          title="Engineered Projects & Applications"
          subtitle="Explore selected applications featuring full-stack architecture, machine learning models, and real-time systems."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {projectCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProjectCategory)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#FDFBF7] bg-purple-600 shadow-lg shadow-purple-900/40 border border-purple-400/50'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 bg-[#0D0C12]/80 dark:bg-[#0D0C12]/80 light:bg-slate-100/90 border border-white/10 dark:border-white/10 light:border-slate-300 hover:text-[#FDFBF7] dark:hover:text-[#FDFBF7] light:hover:text-slate-900 hover:bg-[#161421]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects 3D Perspective Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard maxTilt={8} glareOpacity={0.3} className="h-full">
                  <div
                    data-cursor="project"
                    onClick={() => setActiveProject(project)}
                    className="project-card-interactive group flex flex-col h-full rounded-3xl glass-card-3d border border-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/25 transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    {/* Thematic Visual Banner Header */}
                    <div className="relative">
                      <ProjectVisualBanner project={project} />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                        <Badge variant="magenta" size="sm">
                          {project.category}
                        </Badge>
                        {project.featured && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-purple-900/90 text-amber-300 backdrop-blur shadow-md border border-amber-400/30">
                            <Sparkles className="w-3 h-3 text-accent-gold" />
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Hover Overlay Button */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-sm z-20">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 via-fuchsia-600 to-amber-500 text-[#FDFBF7] shadow-xl">
                          <Eye className="w-4 h-4" />
                          View Case Study
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#FDFBF7] dark:text-[#FDFBF7] light:text-slate-900 group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-purple-400 font-medium mt-0.5">
                          {project.tagline}
                        </p>
                        <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mt-2.5 line-clamp-2 leading-relaxed font-normal">
                          {project.description}
                        </p>
                      </div>

                      {/* Metrics if available */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-xs">
                          {project.metrics.slice(0, 2).map((m, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-slate-400 font-mono">
                              <TrendingUp className="w-3.5 h-3.5 text-accent-gold" />
                              <span className="font-semibold text-[#FDFBF7] dark:text-[#FDFBF7] light:text-slate-800">
                                {m.value}
                              </span>
                              <span className="text-[11px] text-slate-500">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-[#13111C] text-purple-300 dark:text-purple-300 light:text-slate-700 border border-purple-500/25"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono text-slate-400">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Actions Footer */}
                      <div
                        className="pt-4 border-t border-white/10 flex items-center justify-between gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => setActiveProject(project)}
                          className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Layers className="w-3.5 h-3.5 text-accent-gold" />
                          <span>Explore Details</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-[#13111C] hover:bg-[#1C182A] text-slate-300 hover:text-[#FDFBF7] border border-white/10 transition-all hover:scale-105"
                              title="View Source on GitHub"
                              aria-label={`Source code for ${project.title}`}
                            >
                              <GitHubIcon size={16} />
                            </a>
                          )}

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-[#FDFBF7] border border-purple-500/40 transition-all hover:scale-105"
                              title="Open Live Preview"
                              aria-label={`Live demo for ${project.title}`}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Deep-Dive Case Study Modal */}
      <ProjectModal
        project={activeProject}
        isOpen={Boolean(activeProject)}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
