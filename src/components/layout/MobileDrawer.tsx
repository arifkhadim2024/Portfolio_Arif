import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { profileData } from '../../data/profile';
import { socialLinks } from '../../data/social';
import { IconRenderer } from '../common/IconRenderer';

interface NavItem {
  id: string;
  label: string;
}

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeSection: string;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  navItems,
  activeSection,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-dark-bg dark:bg-dark-bg light:bg-white border-l border-slate-800 dark:border-slate-800 light:border-slate-200 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto"
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 via-accent-magenta to-accent-gold flex items-center justify-center font-bold text-white text-sm">
                    AK
                  </div>
                  <span className="font-bold text-base text-white dark:text-white light:text-slate-900">
                    {profileData.name}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="mt-6 flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={onClose}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-primary-500/15 text-primary-400 font-semibold border border-primary-500/30'
                          : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-800/50 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />}
                    </a>
                  );
                })}
              </nav>

              {/* Resume button */}
              <div className="mt-6 pt-6 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
                <a
                  href={profileData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-primary-600 via-accent-magenta to-accent-gold text-white text-sm font-semibold shadow-md shadow-primary-500/20"
                >
                  <span>View Resume</span>
                  <ExternalLink className="w-4 h-4 text-accent-gold" />
                </a>
              </div>
            </div>

            {/* Bottom Socials */}
            <div className="pt-6 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
              <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wider">
                Connect with me
              </p>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
                    aria-label={social.platform}
                  >
                    <IconRenderer name={social.icon} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
