import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, projectCategories } from '../data/projects';
import type { Project, ProjectCategory } from '../types';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { ProjectModal } from '../components/modals/ProjectModal';
import { ProjectCard3D } from '../components/visual/ProjectCard3D';
import { GitHubIcon } from '../components/common/BrandIcons';
import { ExternalLink, ArrowUpRight, TrendingUp } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-28 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="03 // SELECTED WORK"
          title="Featured Engineering Works"
          subtitle="A curated selection of full-stack web applications, machine learning architectures, and interactive digital experiences."
        />

        {/* Minimal Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-16 pb-6 border-b border-black/10 dark:border-white/10">
          {projectCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? projectsData.length 
              : projectsData.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ProjectCategory)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#111111] text-[#F2F1ED] dark:bg-[#F2F1ED] dark:text-[#111111] font-bold shadow-sm'
                    : 'text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#F2F1ED] border border-black/10 dark:border-white/10 hover:border-black/30'
                }`}
              >
                {cat.label} <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Editorial Project Showcase (Alternating / Large Exhibition Layout) */}
        <motion.div layout className="space-y-24 sm:space-y-32">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const projectNumber = String(index + 1).padStart(2, '0');
              const isEven = index % 2 === 1;

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="group pt-8 border-t border-black/10 dark:border-white/10"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    {/* Project Visual 3D Object (7 cols) */}
                    <div
                      className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                    >
                      <ProjectCard3D
                        project={project}
                        projectNumber={projectNumber}
                        onOpenModal={() => setActiveProject(project)}
                      />
                    </div>

                    {/* Project Editorial Content & Metadata (5 cols) */}
                    <div
                      className={`lg:col-span-5 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                    >
                      {/* Monospace Metadata Row */}
                      <div className="flex items-center justify-between text-xs font-mono text-[#888888] uppercase tracking-widest pb-3 border-b border-black/10 dark:border-white/10">
                        <span>PROJECT // {projectNumber}</span>
                        <span>{project.category.toUpperCase()}</span>
                      </div>

                      {/* Project Title */}
                      <div
                        onClick={() => setActiveProject(project)}
                        className="cursor-pointer space-y-1"
                        data-cursor="project"
                      >
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111] dark:text-[#F2F1ED] group-hover:text-[#555555] dark:group-hover:text-[#CCCCCC] transition-colors font-display uppercase leading-[0.95]">
                          {project.title}
                        </h3>
                        <p className="text-xs font-mono text-[#777777] uppercase tracking-wider pt-1">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Project Description */}
                      <p className="text-sm sm:text-base text-[#555555] dark:text-[#AAAAAA] leading-relaxed font-body">
                        {project.description}
                      </p>

                      {/* Metrics if available */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="flex flex-wrap items-center gap-4 py-3 border-y border-black/10 dark:border-white/10 text-xs font-mono">
                          {project.metrics.map((m, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[#555555] dark:text-[#AAAAAA]">
                              <TrendingUp className="w-3.5 h-3.5 text-[#111111] dark:text-[#F2F1ED]" />
                              <span className="font-bold text-[#111111] dark:text-[#F2F1ED]">
                                {m.value}
                              </span>
                              <span className="text-[#888888] text-[11px]">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="neutral" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="pt-4 flex items-center justify-between gap-4">
                        <button
                          onClick={() => setActiveProject(project)}
                          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#111111] dark:text-[#F2F1ED] hover:underline underline-offset-4 cursor-pointer"
                        >
                          <span>Explore Case Study</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg border border-black/10 dark:border-white/10 text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F2F1ED] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                              title="Source code on GitHub"
                              aria-label={`Source code for ${project.title}`}
                            >
                              <GitHubIcon size={15} />
                            </a>
                          )}

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg border border-black/10 dark:border-white/10 text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F2F1ED] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                              title="Live application"
                              aria-label={`Live demo for ${project.title}`}
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeProject}
        isOpen={Boolean(activeProject)}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
