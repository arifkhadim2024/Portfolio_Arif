import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { profileData } from '../../data/profile';
import { socialLinks } from '../../data/social';
import { IconRenderer } from '../common/IconRenderer';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080808] dark:bg-[#080808] light:bg-slate-100 border-t border-[#B9A16B]/15 dark:border-[#B9A16B]/15 light:border-slate-300 pt-16 pb-12 overflow-hidden">
      {/* Ambient gradient top beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#B9A16B]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#B9A16B]/15 dark:border-[#B9A16B]/15 light:border-slate-200">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#B9A16B] via-[#222222] to-[#B9A16B]/60 flex items-center justify-center font-bold text-[#F2F0EA] text-sm shadow-md shadow-black/80">
                AK
              </div>
              <span className="font-extrabold text-xl text-white dark:text-white light:text-slate-900 tracking-tight text-gradient-editorial font-display">
                {profileData.name}
              </span>
            </div>

            <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-md leading-relaxed font-normal">
              {profileData.shortIntro}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-[#E8E6E0] bg-[#161616] px-3 py-1.5 rounded-xl border border-[#B9A16B]/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#B9A16B] animate-pulse shadow-[0_0_6px_#B9A16B]" />
              <span>Available for engineering internships & full-time roles</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 dark:text-slate-200 light:text-slate-800 mb-4 font-mono">
              System Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
              <li>
                <a href="#about" className="hover:text-[#B9A16B] transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#B9A16B] transition-colors">
                  Skills & Architecture
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#B9A16B] transition-colors">
                  Featured Case Studies
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#B9A16B] transition-colors">
                  Experience Timeline
                </a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-[#B9A16B] transition-colors">
                  Certifications
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#B9A16B] transition-colors">
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 dark:text-slate-200 light:text-slate-800 mb-4 font-mono">
              Connect Online
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#0D0D0D] dark:bg-[#0D0D0D] light:bg-white text-slate-400 hover:text-[#F2F0EA] dark:hover:text-[#F2F0EA] light:hover:text-gold-700 border border-[#B9A16B]/15 hover:border-[#B9A16B]/40 transition-all hover:scale-105"
                  aria-label={social.platform}
                  title={social.platform}
                >
                  <IconRenderer name={social.icon} className="w-4 h-4 text-[#B9A16B]" />
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#B9A16B] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#B9A16B]" />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>
            © {currentYear} {profileData.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#B9A16B]" />
            <span>Built with React, TypeScript, Three.js & Tailwind CSS • Editorial Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
