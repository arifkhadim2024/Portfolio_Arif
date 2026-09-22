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
    <footer className="relative bg-[#030304] dark:bg-[#030304] light:bg-slate-100 border-t border-gold-500/15 dark:border-gold-500/15 light:border-slate-300 pt-16 pb-12 overflow-hidden">
      {/* Ambient gradient top gold beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gold-500/15 dark:border-gold-500/15 light:border-slate-200">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-gold-600 via-gold-500 to-gold-300 flex items-center justify-center font-bold text-[#070709] text-sm shadow-md shadow-gold-950/40">
                AK
              </div>
              <span className="font-extrabold text-xl text-white dark:text-white light:text-slate-900 tracking-tight text-gradient-cinematic">
                {profileData.name}
              </span>
            </div>

            <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-md leading-relaxed font-normal">
              {profileData.shortIntro}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-accent-gold bg-gold-500/10 px-3 py-1.5 rounded-xl border border-gold-500/25 w-fit">
              <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse shadow-[0_0_6px_#D4AF37]" />
              <span>Available for engineering internships & full-time roles</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 dark:text-slate-200 light:text-slate-800 mb-4">
              System Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
              <li>
                <a href="#about" className="hover:text-gold-300 transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-gold-300 transition-colors">
                  Skills & Ecosystem
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-gold-300 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-gold-300 transition-colors">
                  Experience Timeline
                </a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-gold-300 transition-colors">
                  Certifications
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold-300 transition-colors">
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 dark:text-slate-200 light:text-slate-800 mb-4">
              Connect Online
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#0B0A0E] dark:bg-[#0B0A0E] light:bg-white text-slate-400 hover:text-[#FFF8E7] dark:hover:text-[#FFF8E7] light:hover:text-gold-600 border border-gold-500/15 hover:border-gold-500/40 transition-all hover:scale-105"
                  aria-label={social.platform}
                  title={social.platform}
                >
                  <IconRenderer name={social.icon} className="w-4 h-4 text-gold-400" />
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-gold-300 transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-accent-gold" />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>
            © {currentYear} {profileData.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
            <span>Built with React, TypeScript, Three.js & Tailwind CSS • Deep Space Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
