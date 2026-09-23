import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 bg-[var(--color-surface)]/40 border-t border-white/5 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs md:text-sm font-display font-black tracking-[0.4em] uppercase text-[var(--accent-secondary)] block mb-3">
            CLIENT & PEER VOICES
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase">
            What's The <span className="text-gradient-signature">Gossip?</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.testimonials.map((item, index) => {
            const glowColor =
              index === 0
                ? 'hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:border-[#7C3AED]/60 border-[#7C3AED]/20'
                : index === 1
                ? 'hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:border-[#22D3EE]/60 border-[#22D3EE]/20'
                : 'hover:shadow-[0_0_40px_rgba(244,114,182,0.3)] hover:border-[#F472B6]/60 border-[#F472B6]/20';

            const quoteColor =
              index === 0 ? 'text-[#7C3AED]' : index === 1 ? 'text-[#22D3EE]' : 'text-[#F472B6]';

            return (
              <div
                key={item.id}
                className={`bg-[var(--color-surface)] border rounded-3xl p-8 flex flex-col justify-between relative shadow-xl transition-all duration-300 ${glowColor}`}
              >
                {/* Quote Mark with Accent Color */}
                <div className={`${quoteColor} mb-6`}>
                  <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor">
                    <path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0L16 3.2C10.4 4.8 8 8 8 11.2H16V24H0ZM16 24V14.4C16 6.4 20.8 1.6 30.4 0L32 3.2C26.4 4.8 24 8 24 11.2H32V24H16Z" />
                  </svg>
                </div>

                {/* Quote Text */}
                <p className="text-sm md:text-base text-[var(--color-text)] font-sans leading-relaxed mb-8 flex-1">
                  "{item.quote}"
                </p>

                {/* Author Row */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#7C3AED] to-[#22D3EE] flex-shrink-0">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-full h-full rounded-full object-cover img-vibrant"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-black text-white uppercase">
                      {item.author}
                    </h4>
                    <p className="text-xs font-mono text-[var(--color-text-subtle)]">
                      {item.role}, <span className="text-[var(--accent-secondary)]">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
