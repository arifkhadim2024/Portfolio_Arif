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
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#080808] dark:bg-[#080808] light:bg-white border-l border-[#B9A16B]/20 dark:border-[#B9A16B]/20 light:border-slate-200 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto"
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#B9A16B]/15 dark:border-[#B9A16B]/15 light:border-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#B9A16B] via-[#222222] to-[#B9A16B]/60 flex items-center justify-center font-bold text-[#F2F0EA] text-sm">
                    AK
                  </div>
                  <span className="font-bold text-base text-[#F2F0EA] dark:text-[#F2F0EA] light:text-slate-900 font-display">
                    {profileData.name}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#161616] transition-colors"
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
                          ? 'bg-[#B9A16B]/15 text-[#B9A16B] font-semibold border border-[#B9A16B]/30'
                          : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-[#161616] hover:text-[#F2F0EA]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#B9A16B] shadow-[0_0_6px_#B9A16B]" />}
                    </a>
                  );
                })}
              </nav>

              {/* Resume button */}
              <div className="mt-6 pt-6 border-t border-[#B9A16B]/15 dark:border-[#B9A16B]/15 light:border-slate-200">
                <a
                  href={profileData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#B9A16B] text-[#080808] text-sm font-bold shadow-md shadow-black/60"
                >
                  <span>View Resume</span>
                  <ExternalLink className="w-4 h-4 text-[#080808]" />
                </a>
              </div>
            </div>

            {/* Bottom Socials */}
            <div className="pt-6 border-t border-[#B9A16B]/15 dark:border-[#B9A16B]/15 light:border-slate-200">
              <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wider font-mono">
                Connect with me
              </p>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#0D0D0D] hover:bg-[#161616] text-slate-300 hover:text-white border border-[#B9A16B]/15 transition-colors"
                    aria-label={social.platform}
                  >
                    <IconRenderer name={social.icon} className="w-4 h-4 text-[#B9A16B]" />
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
