import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { FooterCards } from '../components/FooterCards';
import { MagneticWrapper } from '../components/MagneticWrapper';
import { FloatingAccents3D } from '../components/FloatingAccents3D';

interface ContactPageProps {
  onNavigate: (page: 'home' | 'projects' | 'about' | 'contact') => void;
  onOpenContactModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenContactModal,
}) => {
  return (
    <div className="w-full pt-32 pb-16">
      {/* Background Animated Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[#7C3AED]/15 blur-[120px]" />
        <div className="absolute top-1/2 right-1/10 w-[30rem] h-[30rem] rounded-full bg-[#22D3EE]/12 blur-[130px]" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-[#F472B6]/12 blur-[110px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          {/* Left Column: Big Headline & Labeled Contact List */}
          <div className="lg:col-span-7">
            <span className="text-xs md:text-sm font-display font-black tracking-[0.4em] uppercase text-[var(--accent-secondary)] block mb-3 font-bold">
              LET'S START A CONVERSATION
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-white uppercase mb-12" data-cursor="text">
              Ready To <span className="text-gradient-signature">Roll?</span>
            </h1>

            {/* Labeled Contact Items with Signature Casing & Vivid Colors */}
            <div className="flex flex-col gap-8 mb-12">
              {/* mAIL */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 pb-6 border-b border-[#7C3AED]/20" data-cursor="link">
                <span className="w-28 text-xs font-mono font-bold uppercase tracking-widest text-[#7C3AED] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                  mAIL
                </span>
                <MagneticWrapper strength={0.3} dataCursor="link">
                  <a
                    href={`mailto:${portfolioData.email}`}
                    className="relative group text-lg md:text-2xl font-display font-black text-white hover:text-[#22D3EE] transition-colors"
                  >
                    <span>{portfolioData.email}</span>
                    <span className="text-link_line" />
                  </a>
                </MagneticWrapper>
              </div>

              {/* gITHUB / pROFILE */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 pb-6 border-b border-[#7C3AED]/20" data-cursor="link">
                <span className="w-28 text-xs font-mono font-bold uppercase tracking-widest text-[#22D3EE] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22D3EE]" />
                  gITHUB
                </span>
                <MagneticWrapper strength={0.3} dataCursor="link">
                  <a
                    href="https://github.com/arifkhadim2024"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group text-lg md:text-2xl font-display font-black text-white hover:text-[#F472B6] transition-colors"
                  >
                    <span>github.com/arifkhadim2024</span>
                    <span className="text-link_line" />
                  </a>
                </MagneticWrapper>
              </div>

              {/* lINKEDIN */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 pb-6 border-b border-[#7C3AED]/20" data-cursor="link">
                <span className="w-28 text-xs font-mono font-bold uppercase tracking-widest text-[#F472B6] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                  lINKEDIN
                </span>
                <MagneticWrapper strength={0.3} dataCursor="link">
                  <a
                    href="https://www.linkedin.com/in/arif-mohammed-khadim/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group text-lg md:text-2xl font-display font-black text-white hover:text-[#22D3EE] transition-colors"
                  >
                    <span>in/arif-mohammed-khadim</span>
                    <span className="text-link_line" />
                  </a>
                </MagneticWrapper>
              </div>

              {/* Cin */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 pb-6 border-b border-[#7C3AED]/20">
                <span className="w-28 text-xs font-mono font-bold uppercase tracking-widest text-[#A3E635] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A3E635]" />
                  Cin
                </span>
                <span className="text-lg md:text-2xl font-display font-black text-[var(--color-text)]">
                  {portfolioData.cin}
                </span>
              </div>
            </div>

            {/* Direct Meeting Button */}
            <div>
              <MagneticWrapper strength={0.35} dataCursor="button">
                <button
                  onClick={onOpenContactModal}
                  className="button-custom button-gradient px-10 py-5 text-sm md:text-base tracking-widest shadow-glow-violet"
                  data-cursor="button"
                >
                  Schedule A Meeting / Brief Project
                </button>
              </MagneticWrapper>
            </div>
          </div>

          {/* Right Column: Visual Portrait Card with Glowing Gradient Frame */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* 3D Floating Accents Layer */}
            <div className="absolute -inset-10 pointer-events-none z-0">
              <FloatingAccents3D />
            </div>

            <div
              className="relative p-1 rounded-3xl bg-gradient-to-tr from-[#7C3AED] via-[#F472B6] to-[#22D3EE] shadow-[0_0_50px_rgba(124,58,237,0.35)] z-10 transition-transform duration-500 hover:scale-[1.02]"
              data-cursor="project"
            >
              <div className="relative w-72 sm:w-80 md:w-96 h-96 md:h-[520px] rounded-[22px] overflow-hidden bg-[#15102A]">
                <img
                  src={portfolioData.avatarUrl}
                  alt={portfolioData.name}
                  className="w-full h-full object-cover img-vibrant transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-75" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#22D3EE] block mb-1 font-bold">
                    AVAILABILITY
                  </span>
                  <span className="text-xl font-display font-black text-white block">
                    Open for Selected Projects
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)] font-sans mt-1 block">
                    Response guaranteed within 24 hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterCards currentPage="contact" onNavigate={onNavigate} />
    </div>
  );
};
