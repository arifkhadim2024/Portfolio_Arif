import React from 'react';
import { ArrowUp } from 'lucide-react';
import { profileData } from '../../data/profile';
import { socialLinks } from '../../data/social';
import { IconRenderer } from '../common/IconRenderer';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#06080E] dark:bg-[#06080E] light:bg-slate-100 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-300 pt-16 pb-12 overflow-hidden">
      {/* Ambient gradient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-cyan flex items-center justify-center font-bold text-white text-sm shadow-md">
                AK
              </div>
              <span className="font-extrabold text-xl text-white dark:text-white light:text-slate-900 tracking-tight">
                {profileData.name}
              </span>
            </div>

            <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-md leading-relaxed">
              {profileData.shortIntro}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for internships & full-time roles</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 dark:text-slate-200 light:text-slate-800 mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
              <li>
                <a href="#about" className="hover:text-primary-400 transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-primary-400 transition-colors">
                  Skills & Tools
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary-400 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-primary-400 transition-colors">
                  Experience & Timeline
                </a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-primary-400 transition-colors">
                  Certifications
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary-400 transition-colors">
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
                  className="p-2.5 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white text-slate-400 hover:text-white dark:hover:text-white light:hover:text-primary-600 border border-slate-800 dark:border-slate-800 light:border-slate-300 hover:border-primary-500/40 transition-all hover:scale-105"
                  aria-label={social.platform}
                  title={social.platform}
                >
                  <IconRenderer name={social.icon} className="w-4 h-4" />
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {profileData.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span>Engineered with React, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
