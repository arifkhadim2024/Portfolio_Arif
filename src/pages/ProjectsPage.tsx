import React, { useState } from 'react';
import { portfolioData, getCategoryTheme, getTechTagStyle } from '../data/portfolioData';
import type { ProjectItem } from '../data/portfolioData';
import { TiltCard3D } from '../components/TiltCard3D';
import { ResumeCTASection } from '../sections/ResumeCTASection';
import { FooterCards } from '../components/FooterCards';

interface ProjectsPageProps {
  onNavigate: (page: 'home' | 'projects' | 'about' | 'contact') => void;
  onOpenContactModal: () => void;
  selectedProject: ProjectItem | null;
  onSelectProject: (project: ProjectItem | null) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  onOpenContactModal: _onOpenContactModal,
  selectedProject,
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', '3D & AI/ML', 'AI / ML', 'Full Stack', 'Web Apps', 'Tools / Cloud'];

  const filteredProjects =
    activeCategory === 'All'
      ? portfolioData.projects
      : portfolioData.projects.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full pt-32 pb-16">
      {/* Background Animated Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[#7C3AED]/15 blur-[120px]" />
        <div className="absolute top-1/2 right-1/10 w-[30rem] h-[30rem] rounded-full bg-[#22D3EE]/12 blur-[130px]" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-[#F472B6]/12 blur-[110px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Page Hero Title */}
        <div className="mb-16">
          <span className="text-xs md:text-sm font-display font-black tracking-[0.4em] uppercase text-[var(--accent-secondary)] block mb-3 font-bold">
            PORTFOLIO SHOWCASE
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-white uppercase mb-6">
            Recent <span className="text-gradient-signature">Projects</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--color-text-muted)] font-sans max-w-2xl leading-relaxed">
            A comprehensive catalog of production applications, scientific 3D spatial simulations, computer vision diagnostic engines, collaborative developer studios, and ML pipelines.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 mb-16 border-b border-[#7C3AED]/20 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 focus:outline-none ${
                activeCategory === cat
                  ? 'bg-gradient-signature text-white font-bold shadow-glow-violet scale-105'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-white border border-white/10 hover:border-[#7C3AED]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with 3D Tilt & Category Themed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          {filteredProjects.map((project, idx) => {
            const theme = getCategoryTheme(project.category);

            return (
              <TiltCard3D
                key={project.id}
                onClick={() => onSelectProject(project)}
                className={`group relative flex flex-col bg-[var(--color-surface)] border ${theme.borderActive} ${theme.borderHover} rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${theme.glowClass}`}
              >
                {/* Image Container */}
                <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden bg-[#15102A]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover img-vibrant transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Category Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-75" />

                  {/* Category Badge with Color Tagging */}
                  <div
                    className={`absolute top-6 left-6 px-4 py-1.5 rounded-full backdrop-blur-md border text-[10px] md:text-xs font-mono tracking-widest uppercase font-bold shadow-lg ${theme.badgeClass}`}
                  >
                    {project.category}
                  </div>

                  {/* Metrics */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4">
                    {project.metrics.map((metric) => (
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

                {/* Content */}
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

                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-lg border text-[11px] font-mono font-medium transition-all shadow-sm ${getTechTagStyle(tech)}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs md:text-sm font-display font-black tracking-widest uppercase text-white group-hover:text-[var(--accent-secondary)] transition-colors">
                    <span>VIEW CASE STUDY</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-2 shadow-md ${theme.arrowBg} ${theme.arrowText} bg-white/10`}>
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

      {/* Case Study Deep Modal with Vibrant Accents */}
      {selectedProject && (() => {
        const modalTheme = getCategoryTheme(selectedProject.category);
        return (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
            <div
              onClick={() => onSelectProject(null)}
              className="fixed inset-0 bg-[#0B0819]/85 backdrop-blur-md"
            />

            <div className="relative w-full max-w-4xl bg-[var(--color-surface)] border border-[#7C3AED]/40 rounded-3xl p-6 md:p-10 shadow-[0_0_60px_rgba(124,58,237,0.35)] z-10 max-h-[90vh] overflow-y-auto animate-fadeIn">
              {/* Close Button */}
              <button
                onClick={() => onSelectProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-[var(--accent-tertiary)] transition-colors focus:outline-none"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1L13 13M1 13L13 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <span className={`inline-block px-4 py-1.5 rounded-full border text-xs font-mono uppercase tracking-widest font-bold mb-3 ${modalTheme.badgeClass}`}>
                  {selectedProject.category}
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase mb-3">
                  {selectedProject.title}
                </h2>
                <p className="text-sm md:text-base text-[var(--color-text-muted)] font-sans">
                  {selectedProject.subtitle}
                </p>
              </div>

              {/* Main Image */}
              <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 border border-[#7C3AED]/30 shadow-lg">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover img-vibrant"
                />
              </div>

              {/* Problem & Solution Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 rounded-2xl bg-[var(--color-surface-card)] border border-[#F472B6]/30 shadow-inner">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#F472B6] font-bold mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                    THE CHALLENGE
                  </h4>
                  <p className="text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {selectedProject.problemSolved}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[var(--color-surface-card)] border border-[#22D3EE]/30 shadow-inner">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#22D3EE] font-bold mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
                    THE ARCHITECTURAL SOLUTION
                  </h4>
                  <p className="text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Key Features List */}
              {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                <div className="mb-8 p-6 rounded-2xl bg-[var(--color-surface-card)] border border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-4 font-bold">
                    KEY HIGHLIGHTS & CAPABILITIES
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.keyFeatures.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-xs md:text-sm text-[var(--color-text)]"
                      >
                        <span className="text-[#A3E635] font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-3 font-bold">
                  TECHNOLOGIES UTILIZED
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium shadow-sm ${getTechTagStyle(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Action Links */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-custom button-gradient px-6 py-3 text-xs font-bold shadow-glow-violet"
                  >
                    Visit Live Application ↗
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-white/10 border border-white/15 hover:border-[#22D3EE] text-xs font-mono uppercase tracking-widest text-white transition-colors"
                  >
                    View GitHub Source
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Resume CTA */}
      <ResumeCTASection />

      {/* Footer */}
      <FooterCards currentPage="projects" onNavigate={onNavigate} />
    </div>
  );
};
