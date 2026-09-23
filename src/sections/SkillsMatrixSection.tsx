import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';

export const SkillsMatrixSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'languages', label: 'Languages' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'aiml', label: 'AI / Machine Learning' },
    { id: 'databases', label: 'Databases' },
    { id: 'tools', label: 'Tools & DevOps' },
  ];

  const filteredSkills =
    activeCategory === 'all'
      ? portfolioData.skills
      : portfolioData.skills.filter((s) => s.category === activeCategory);

  return (
    <section className="relative w-full py-24 bg-[var(--color-bg)] border-t border-white/5 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs md:text-sm font-display font-black tracking-[0.4em] uppercase text-[var(--accent-secondary)] block mb-3">
            TECHNICAL REPERTOIRE
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase">
            Mastered <span className="text-gradient-signature">Stack</span>
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-14 border-b border-white/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 focus:outline-none ${
                activeCategory === cat.id
                  ? 'bg-gradient-signature text-white font-bold shadow-glow-violet scale-105'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid with Color Dots */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSkills.map((skill, index) => {
            const dotColor =
              index % 4 === 0
                ? '#7C3AED'
                : index % 4 === 1
                ? '#22D3EE'
                : index % 4 === 2
                ? '#F472B6'
                : '#A3E635';

            return (
              <div
                key={skill.name}
                className="bg-[var(--color-surface)] border border-white/10 hover:border-[#7C3AED]/60 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-glow-violet group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125"
                    style={{ backgroundColor: dotColor }}
                  />
                  <span className="text-[10px] font-mono text-[var(--color-text-subtle)] uppercase">
                    {skill.level}
                  </span>
                </div>

                <h4 className="text-xs md:text-sm font-display font-black text-white uppercase tracking-tight group-hover:text-gradient-signature transition-colors">
                  {skill.name}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
