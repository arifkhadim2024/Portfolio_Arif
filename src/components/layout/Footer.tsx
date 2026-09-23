import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { profileData } from '../../data/profile';
import { socialLinks } from '../../data/social';
import { IconRenderer } from '../common/IconRenderer';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#F2F1ED] dark:bg-[#0E0E0E] text-[#111111] dark:text-[#F2F1ED] border-t border-black/10 dark:border-white/10 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Massive Editorial Display Heading */}
        <div className="pb-16 border-b border-black/10 dark:border-white/10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#888888] mb-4">
            [ NEXT STEPS ]
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter uppercase font-display leading-[0.92]">
              Let's build <br /> together.
            </h2>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-mono uppercase tracking-widest text-[#111111] dark:text-[#F2F1ED] hover:underline underline-offset-8"
            >
              <span>Initiate Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Multi-Column Editorial Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-16 border-b border-black/10 dark:border-white/10 text-xs font-mono">
          {/* Brand / Bio (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="font-bold text-sm font-display tracking-wider uppercase text-[#111111] dark:text-[#F2F1ED]">
              {profileData.name}
            </div>
            <p className="text-xs text-[#666666] dark:text-[#888888] max-w-sm leading-relaxed font-body normal-case">
              {profileData.shortIntro}
            </p>
            <div className="inline-flex items-center gap-2 pt-2 text-[#666666] dark:text-[#888888]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-[#F2F1ED]" />
              <span>Available for engineering opportunities</span>
            </div>
          </div>

          {/* Navigation (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#888888] mb-4">
              Directory
            </h4>
            <ul className="space-y-2.5 text-[#666666] dark:text-[#888888] uppercase tracking-wider">
              <li>
                <a href="#about" className="hover:text-[#111111] dark:hover:text-[#F2F1ED] transition-colors">
                  01. About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#111111] dark:hover:text-[#F2F1ED] transition-colors">
                  02. Technical Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#111111] dark:hover:text-[#F2F1ED] transition-colors">
                  03. Selected Work
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#111111] dark:hover:text-[#F2F1ED] transition-colors">
                  04. Experience
                </a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-[#111111] dark:hover:text-[#F2F1ED] transition-colors">
                  05. Certifications
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Connect (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#888888] mb-4">
              Network
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F2F1ED] hover:border-black/30 dark:hover:border-white/30 transition-colors inline-flex items-center gap-1.5"
                  aria-label={social.platform}
                  title={social.platform}
                >
                  <IconRenderer name={social.icon} className="w-3.5 h-3.5" />
                  <span>{social.platform}</span>
                </a>
              ))}
            </div>

            <div>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F2F1ED] transition-colors cursor-pointer uppercase tracking-wider"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#888888]">
          <p>
            © {currentYear} {profileData.name}. All rights reserved.
          </p>
          <div className="text-right">
            <span>Editorial Edition • React / TypeScript / Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
