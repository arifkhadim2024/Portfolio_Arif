import React from 'react';
import { portfolioData } from '../data/portfolioData';

interface FooterCardsProps {
  currentPage: 'home' | 'projects' | 'about' | 'contact';
  onNavigate: (page: 'home' | 'projects' | 'about' | 'contact') => void;
}

export const FooterCards: React.FC<FooterCardsProps> = ({
  currentPage,
  onNavigate,
}) => {
  // Determine which 2 cards to display depending on current page
  let card1: { label: string; page: 'home' | 'projects' | 'about' | 'contact'; image: string };
  let card2: { label: string; page: 'home' | 'projects' | 'about' | 'contact'; image: string };

  if (currentPage === 'projects') {
    card1 = {
      label: 'Home',
      page: 'home',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    };
    card2 = {
      label: 'About',
      page: 'about',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    };
  } else if (currentPage === 'about') {
    card1 = {
      label: 'Home',
      page: 'home',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    };
    card2 = {
      label: 'Projects',
      page: 'projects',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    };
  } else if (currentPage === 'contact') {
    card1 = {
      label: 'Projects',
      page: 'projects',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    };
    card2 = {
      label: 'About',
      page: 'about',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    };
  } else {
    // Default Home footer
    card1 = {
      label: 'Projects',
      page: 'projects',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    };
    card2 = {
      label: 'About',
      page: 'about',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    };
  }

  return (
    <footer className="w-full bg-[var(--color-surface)] pt-16 pb-20 border-t border-[#7C3AED]/20 relative overflow-hidden">
      {/* Subtle Background Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-[#7C3AED]/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#22D3EE]/10 blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1 */}
          <button
            onClick={() => onNavigate(card1.page)}
            className="footer_card group text-left w-full h-[24rem] md:h-[30rem] flex relative p-6 md:p-10 rounded-3xl border border-[#7C3AED]/30 bg-gradient-to-br from-[#1A1438] to-[#120E27] overflow-hidden focus:outline-none hover:border-[#22D3EE] hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] transition-all duration-300"
          >
            {/* Sliding Thumbnail with Gradient Ring */}
            <div className="absolute right-4 md:right-12 bottom-4 md:bottom-8 w-40 md:w-56 h-40 md:h-56 rounded-2xl overflow-hidden opacity-40 md:opacity-75 transition-transform duration-500 ease-out group-hover:translate-x-4 md:group-hover:translate-x-8 group-hover:scale-105 border border-[#7C3AED]/30">
              <img
                src={card1.image}
                alt={card1.label}
                className="w-full h-full object-cover img-vibrant"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/30 to-[#22D3EE]/20 mix-blend-overlay" />
            </div>

            {/* Typography Label */}
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between w-full h-full">
              <div className="flex items-center gap-4">
                <span className="footer_card-label-text font-display font-black text-4xl md:text-6xl uppercase tracking-tighter text-white group-hover:text-gradient-signature transition-colors duration-300">
                  {card1.label}
                </span>
                <span className="w-8 h-[2px] md:w-[2px] md:h-12 bg-current text-[#7C3AED]" />
              </div>

              <div className="mt-auto md:mt-0 flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest text-[#22D3EE] uppercase group-hover:text-white transition-colors font-bold">
                <span>EXPLORE</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#22D3EE]"
                >
                  <path
                    d="M3 13L13 3M13 3H5M13 3V11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </button>

          {/* Card 2 */}
          <button
            onClick={() => onNavigate(card2.page)}
            className="footer_card group text-left w-full h-[24rem] md:h-[30rem] flex relative p-6 md:p-10 rounded-3xl border border-[#F472B6]/30 bg-gradient-to-br from-[#1A1438] to-[#120E27] overflow-hidden focus:outline-none hover:border-[#F472B6] hover:shadow-[0_0_40px_rgba(244,114,182,0.3)] transition-all duration-300"
          >
            {/* Sliding Thumbnail with Gradient Ring */}
            <div className="absolute right-4 md:right-12 bottom-4 md:bottom-8 w-40 md:w-56 h-40 md:h-56 rounded-2xl overflow-hidden opacity-40 md:opacity-75 transition-transform duration-500 ease-out group-hover:translate-x-4 md:group-hover:translate-x-8 group-hover:scale-105 border border-[#F472B6]/30">
              <img
                src={card2.image}
                alt={card2.label}
                className="w-full h-full object-cover img-vibrant"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F472B6]/30 to-[#7C3AED]/20 mix-blend-overlay" />
            </div>

            {/* Typography Label */}
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between w-full h-full">
              <div className="flex items-center gap-4">
                <span className="footer_card-label-text font-display font-black text-4xl md:text-6xl uppercase tracking-tighter text-white group-hover:text-gradient-signature transition-colors duration-300">
                  {card2.label}
                </span>
                <span className="w-8 h-[2px] md:w-[2px] md:h-12 bg-current text-[#F472B6]" />
              </div>

              <div className="mt-auto md:mt-0 flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest text-[#F472B6] uppercase group-hover:text-white transition-colors font-bold">
                <span>EXPLORE</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#F472B6]"
                >
                  <path
                    d="M3 13L13 3M13 3H5M13 3V11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Social Links & Copyright Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {portfolioData.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative py-1 text-xs md:text-sm font-display font-black tracking-widest uppercase text-[#C4C4C4] hover:text-[var(--accent-secondary)] transition-colors group"
              >
                <span>{social.label}</span>
                <span className="text-link_line" />
              </a>
            ))}
          </div>

          <div className="text-xs md:text-sm font-mono text-[var(--color-text-subtle)] tracking-widest uppercase">
            © {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
