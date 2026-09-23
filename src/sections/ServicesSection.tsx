import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';

export const ServicesSection: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>(portfolioData.services[0].id);

  return (
    <section className="relative w-full py-24 bg-[var(--color-bg)] overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs md:text-sm font-display font-black tracking-[0.4em] uppercase text-[var(--accent-secondary)] block mb-3">
            CAPABILITIES & EXPERTISE
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase">
            What I <span className="text-gradient-signature">Love To Do</span>
          </h2>
        </div>

        {/* Services Accordion / Grid */}
        <div className="flex flex-col border-t border-white/10">
          {portfolioData.services.map((service, index) => {
            const isOpen = activeServiceId === service.id;
            const accentColor =
              index === 0 ? '#7C3AED' : index === 1 ? '#22D3EE' : index === 2 ? '#F472B6' : '#A3E635';

            return (
              <div
                key={service.id}
                className={`border-b border-white/10 transition-colors duration-300 ${
                  isOpen ? 'bg-[var(--color-surface)]' : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => setActiveServiceId(isOpen ? '' : service.id)}
                  className="w-full py-8 md:py-10 px-4 md:px-8 flex items-center justify-between text-left focus:outline-none group"
                >
                  <div className="flex items-center gap-6 md:gap-12">
                    <span
                      className="text-xs md:text-sm font-mono font-bold"
                      style={{ color: accentColor }}
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <span
                        className="text-xs font-mono uppercase tracking-widest block mb-1 font-bold"
                        style={{ color: accentColor }}
                      >
                        {service.casingLabel}
                      </span>
                      <h3 className="text-xl md:text-3xl lg:text-4xl font-display font-black text-white uppercase tracking-tight group-hover:text-gradient-signature transition-colors">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 group-hover:border-[var(--accent-primary)] group-hover:shadow-glow-violet">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className={`transition-transform duration-300 ${
                        isOpen ? 'rotate-45 text-[var(--accent-secondary)]' : ''
                      }`}
                    >
                      <path
                        d="M7 1V13M1 7H13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </button>

                {/* Expanded Content Panel */}
                {isOpen && (
                  <div className="px-4 md:px-8 pb-10 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 animate-fadeIn">
                    <div className="md:col-span-4 md:col-start-2">
                      <p className="text-sm md:text-base text-[var(--color-text-muted)] font-sans leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="md:col-span-6 md:col-start-7">
                      <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-subtle)] block mb-3">
                        CORE STACK & TOOLS
                      </span>
                      <div className="flex flex-wrap gap-2.5">
                        {service.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 rounded-lg bg-[var(--color-surface-card)] border border-white/10 text-xs md:text-sm font-mono text-white shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
