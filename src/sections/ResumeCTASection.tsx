import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const ResumeCTASection: React.FC = () => {
  return (
    <section className="relative w-full py-20 bg-[var(--color-surface)] border-t border-b border-white/5 overflow-hidden">
      <div className="container-custom">
        <div className="relative rounded-3xl bg-gradient-to-r from-[var(--color-surface-card)] via-[var(--color-surface)] to-[var(--color-surface-card)] border border-white/15 p-8 md:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-glow-signature overflow-hidden">
          {/* Background Ambient Violet/Cyan Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#7C3AED]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#22D3EE]/12 blur-3xl pointer-events-none" />

          {/* Left Content */}
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-[0.4em] text-[var(--accent-secondary)] font-bold block mb-3">
              CURRICULUM VITAE & CREDENTIALS
            </span>
            <h3 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-4">
              Looking For A <span className="text-gradient-signature">Detailed Resume?</span>
            </h3>
            <p className="text-xs md:text-sm text-[var(--color-text-muted)] font-sans leading-relaxed">
              Download the comprehensive CV outlining technical skills, research publications, project architectures, and industrial experience.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="relative z-10 flex flex-wrap items-center gap-4">
            <a
              href={portfolioData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-custom button-gradient px-8 py-4 text-xs md:text-sm"
            >
              Preview Resume (PDF) ↗
            </a>
            <a
              href="/Arif_Mohammed_Khadim_Resume.pdf"
              download="Arif_Mohammed_Khadim_Resume.pdf"
              className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--accent-secondary)]/50 text-xs font-mono uppercase tracking-widest text-white transition-all flex items-center gap-2"
            >
              <span>Download File</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[var(--accent-secondary)]">
                <path
                  d="M7 1V10M7 10L3 6M7 10L11 6M1 13H13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
