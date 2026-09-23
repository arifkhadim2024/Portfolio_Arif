import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import type { CertificateItem } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  return (
    <section className="relative w-full py-24 bg-[var(--color-bg)] border-t border-white/5 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs md:text-sm font-display font-black tracking-[0.4em] uppercase text-[var(--accent-secondary)] block mb-3">
            VERIFIED CREDENTIALS
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase">
            Industry <span className="text-gradient-signature">Certifications</span>
          </h2>
        </div>

        {/* Certifications Grid with Vibrant Card Accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.certificates.map((cert, index) => {
            const tagGlow =
              index % 3 === 0
                ? 'text-[#7C3AED]'
                : index % 3 === 1
                ? 'text-[#22D3EE]'
                : 'text-[#F472B6]';

            return (
              <div
                key={cert.id}
                onClick={() => setActiveCert(cert)}
                className="group bg-[var(--color-surface)] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-[#7C3AED]/50 hover:shadow-glow-signature"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: index % 2 === 0 ? '#7C3AED' : '#22D3EE' }}>
                      0{index + 1}
                    </span>
                    <span className="text-xs font-mono text-[var(--color-text-subtle)]">
                      {cert.issueDate}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-display font-black text-white uppercase leading-snug mb-3 group-hover:text-gradient-signature transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-xs md:text-sm font-mono text-[var(--color-text-muted)] mb-4">
                    {cert.issuer}
                  </p>

                  {cert.credentialId && (
                    <div className="text-[11px] font-mono text-[var(--color-text-subtle)] mb-4">
                      ID: <span className="text-white font-bold">{cert.credentialId}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cert.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-[var(--color-surface-card)] border border-white/10 text-[10px] font-mono text-[var(--color-text)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-display font-black tracking-widest uppercase text-[var(--color-text)] group-hover:text-[var(--accent-secondary)] transition-colors">
                  <span>VIEW CERTIFICATE</span>
                  <span className={`${tagGlow} font-bold`}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8">
          <div
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 bg-[#0E0E12]/85 backdrop-blur-md"
          />

          <div className="relative w-full max-w-2xl bg-[var(--color-surface)] border border-white/15 rounded-3xl p-6 md:p-8 shadow-glow-signature z-10 max-h-[90vh] overflow-y-auto animate-fadeIn">
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[var(--accent-tertiary)] transition-colors focus:outline-none"
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

            <div className="mb-6 pr-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-secondary)] block mb-1 font-bold">
                {activeCert.issuer}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase">
                {activeCert.title}
              </h3>
            </div>

            <div className="w-full rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black/40">
              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="w-full h-auto object-contain max-h-[450px] mx-auto"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="text-xs font-mono text-[var(--color-text-subtle)]">
                {activeCert.credentialId && <span>ID: {activeCert.credentialId}</span>}
              </div>

              {activeCert.credentialUrl && (
                <a
                  href={activeCert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-custom button-gradient px-6 py-2.5 text-xs"
                >
                  Open Verification Source ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
