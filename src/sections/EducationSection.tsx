import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 bg-[var(--color-surface)]/40 border-t border-white/5 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs md:text-sm font-display font-black tracking-[0.4em] uppercase text-[var(--accent-secondary)] block mb-3">
            ACADEMIC FOUNDATIONS
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase">
            Education & <span className="text-gradient-signature">Degrees</span>
          </h2>
        </div>

        {/* Education Timeline */}
        <div className="flex flex-col border-t border-white/10">
          {portfolioData.education.map((edu, index) => (
            <div
              key={edu.id}
              className="py-10 border-b border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
              <div className="md:col-span-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-secondary)] font-bold block mb-1">
                  {edu.startDate} — {edu.endDate}
                </span>
                <span className="text-xs font-mono text-[var(--color-text-subtle)] block">
                  Grade: <strong className="text-white">{edu.grade}</strong>
                </span>
              </div>

              <div className="md:col-span-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-subtle)] block mb-1">
                  ACADEMIC DEGREE 0{index + 1}
                </span>
                <h3 className="text-2xl font-display font-black text-white uppercase mb-1">
                  {edu.degree}
                </h3>
                <h4 className="text-sm font-mono text-[var(--accent-tertiary)] font-bold mb-2">
                  {edu.field}
                </h4>
                <p className="text-xs text-[var(--color-text-muted)] font-sans">
                  {edu.institution}, {edu.location}
                </p>
              </div>

              <div className="md:col-span-5">
                <p className="text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
                  {edu.description}
                </p>

                {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-text-subtle)] block mb-2">
                      CORE COURSEWORK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.relevantCoursework.map((course) => (
                        <span
                          key={course}
                          className="px-2.5 py-1 rounded-md bg-[var(--color-surface)] border border-white/10 text-[11px] font-mono text-[var(--color-text)]"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
