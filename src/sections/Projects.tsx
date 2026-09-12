import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, projectCategories } from '../data/projects';
import type { Project, ProjectCategory } from '../types';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ProjectModal } from '../components/modals/ProjectModal';
import { GitHubIcon } from '../components/common/BrandIcons';
import { ExternalLink, Eye, TrendingUp, Sparkles, Layers } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-dark-bg/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Featured Work"
          title="Engineered Projects & Applications"
          subtitle="Explore selected applications featuring full-stack architecture, machine learning models, and real-time systems."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {projectCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProjectCategory)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-primary-600 shadow-md shadow-primary-500/25 border border-primary-500/50'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100/90 border border-slate-800 dark:border-slate-800 light:border-slate-300 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col rounded-2xl bg-dark-card/90 dark:bg-dark-card/90 light:bg-white/95 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 hover:border-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300 overflow-hidden"
              >
                {/* Thumbnail Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <Badge variant="cyan" size="sm">
                      {project.category}
                    </Badge>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary-600/90 text-white backdrop-blur shadow-md">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 backdrop-blur-sm">
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={() => setActiveProject(project)}
                      icon={<Eye className="w-4 h-4" />}
                    >
                      View Case Study
                    </Button>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 group-hover:text-primary-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-primary-400 font-medium mt-0.5">
                      {project.tagline}
                    </p>
                    <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics if available */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 text-xs">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-slate-400">
                          <TrendingUp className="w-3.5 h-3.5 text-accent-cyan" />
                          <span className="font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800">{m.value}</span>
                          <span className="text-[11px] text-slate-500">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-800/90 dark:bg-slate-800/90 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="text-xs font-semibold text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
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
                          className="p-2 rounded-lg bg-primary-600/20 hover:bg-primary-600/30 text-primary-300 hover:text-white border border-primary-500/30 transition-colors"
                          title="Open Live Preview"
                          aria-label={`Live demo for ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
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
