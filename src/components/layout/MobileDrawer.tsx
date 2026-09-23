import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#F2F1ED] dark:bg-[#0E0E0E] text-[#111111] dark:text-[#F2F1ED] border-l border-black/10 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto"
          >
            {/* Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-black/10 dark:border-white/10">
                <span className="font-bold text-sm uppercase tracking-wider font-display">
                  {profileData.name}
                </span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F2F1ED] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links in large editorial style */}
              <nav className="mt-8 flex flex-col gap-2">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  const itemNumber = String(idx + 1).padStart(2, '0');
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={onClose}
                      className={`flex items-baseline justify-between py-3 text-xl font-bold font-display uppercase tracking-tight transition-colors ${
                        isActive
                          ? 'text-[#111111] dark:text-[#F2F1ED]'
                          : 'text-[#888888] dark:text-[#666666] hover:text-[#111111] dark:hover:text-[#F2F1ED]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs font-mono text-[#999999] font-normal">
                        ({itemNumber})
                      </span>
                    </a>
                  );
                })}
              </nav>

              {/* Resume button */}
              <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10">
                <a
                  href={profileData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#111111] text-[#F2F1ED] dark:bg-[#F2F1ED] dark:text-[#111111] text-xs font-mono uppercase tracking-wider font-semibold shadow-sm"
                >
                  <span>View Resume</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Bottom Socials */}
            <div className="pt-6 border-t border-black/10 dark:border-white/10">
              <p className="text-[11px] text-[#888888] mb-3 font-mono uppercase tracking-wider">
                Connect Online
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-black/10 dark:border-white/10 text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F2F1ED] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    aria-label={social.platform}
                    title={social.platform}
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
