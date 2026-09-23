import React from 'react';
import { portfolioData, getCategoryTheme, getTechTagStyle } from '../data/portfolioData';
import type { ProjectItem } from '../data/portfolioData';
import { TiltCard3D } from '../components/TiltCard3D';

interface ProjectsSectionProps {
  onViewAllProjects: () => void;
  onSelectProject?: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onViewAllProjects,
  onSelectProject,
}) => {
  const featuredProjects = portfolioData.projects.filter((p) => p.featured);

  return (
    <section className="relative w-full py-24 bg-[var(--color-surface)]/80 border-t border-b border-[#7C3AED]/20 overflow-hidden">
      {/* Ambient Section Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#7C3AED]/15 blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] rounded-full bg-[#22D3EE]/15 blur-[130px]" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-[#F472B6]/12 blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs md:text-sm font-display font-black tracking-[0.4em] uppercase text-[var(--accent-secondary)] block mb-3 font-bold">
              SELECTED WORKS
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase">
              Recent <span className="text-gradient-signature">Projects</span>
            </h2>
          </div>

          <button
            onClick={onViewAllProjects}
            data-cursor="link"
            className="self-start md:self-auto flex items-center gap-3 text-xs md:text-sm font-display font-black tracking-widest uppercase text-white hover:text-[var(--accent-secondary)] transition-colors group px-5 py-2.5 rounded-full bg-[var(--color-surface-card)] border border-[#7C3AED]/30 hover:border-[#22D3EE] shadow-md"
          >
            <span>VIEW ALL PROJECTS ({portfolioData.projects.length})</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1 text-[var(--accent-secondary)]"
            >
              <path
                d="M1 8H15M15 8L8 1M15 8L8 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Featured Project Cards Grid with 3D Tilt & Category Color Theming */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {featuredProjects.map((project, idx) => {
            const theme = getCategoryTheme(project.category);

            return (
              <TiltCard3D
                key={project.id}
                onClick={() => onSelectProject && onSelectProject(project)}
                className={`group relative flex flex-col bg-[var(--color-surface)] border ${theme.borderActive} ${theme.borderHover} rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${theme.glowClass}`}
              >
                {/* Image Container with Full Color and Gradient Tint */}
                <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-[#15102A]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover img-vibrant transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Category Accent Colored Bottom Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-75"
                  />

                  {/* Category Badge with Color Tagging */}
                  <div
                    className={`absolute top-6 left-6 px-4 py-1.5 rounded-full backdrop-blur-md border text-[10px] md:text-xs font-mono tracking-widest uppercase font-bold ${theme.badgeClass}`}
                  >
                    {project.category}
                  </div>

                  {/* Metrics Overlay with Tinted Accent Chips */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-3">
                    {project.metrics.slice(0, 2).map((metric) => (
                      <div
                        key={metric.label}
                        className={`backdrop-blur-md border px-3.5 py-1.5 rounded-xl shadow-lg ${theme.metricBorder}`}
                      >
                        <span className="text-[10px] font-mono text-[var(--color-text-subtle)] block uppercase font-semibold">
                          {metric.label}
                        </span>
                        <span className={`text-xs md:text-sm font-display font-black ${theme.metricText}`}>
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1 justify-between gap-6 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-surface-card)]">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight uppercase group-hover:text-gradient-signature transition-all">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono font-bold" style={{ color: theme.primary }}>
                        0{idx + 1}
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-[var(--color-text-muted)] font-sans line-clamp-2 mb-4 leading-relaxed">
                      {project.subtitle}
                    </p>

                    {/* Tech Stack Pills with Category Colors */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-lg border text-[11px] font-mono font-medium transition-all shadow-sm ${getTechTagStyle(tech)}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Row */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs md:text-sm font-display font-black tracking-widest uppercase text-white group-hover:text-[var(--accent-secondary)] transition-colors">
                    <span>EXPLORE CASE STUDY</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-2 shadow-md ${theme.arrowBg} ${theme.arrowText} bg-white/10`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M1 6H11M11 6L6 1M11 6L6 11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
