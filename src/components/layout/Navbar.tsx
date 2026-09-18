import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Send } from 'lucide-react';
import { profileData } from '../../data/profile';
import { ThemeToggle } from './ThemeToggle';
import { MobileDrawer } from './MobileDrawer';
import { useActiveSection } from '../../hooks/useActiveSection';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

const sectionIds = navItems.map((item) => item.id);

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds, 120);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav-frosted py-2.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Futuristic Logo & Monogram */}
          <a
            href="#home"
            className="group flex items-center gap-3 font-bold text-lg text-white dark:text-white light:text-slate-900 tracking-tight"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 via-accent-magenta to-accent-gold p-0.5 shadow-lg shadow-primary-600/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[10px] bg-[#070709] flex items-center justify-center font-black text-xs text-white font-mono">
                AK
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-accent-gold rounded-full border-2 border-dark-bg dark:border-dark-bg light:border-white shadow-[0_0_8px_#E5C07B]" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight font-black group-hover:text-primary-300 transition-colors text-gradient-cinematic">
                {profileData.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                portfolio.v2
              </span>
            </div>
          </a>

          {/* Floating Frosted Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-1 bg-dark-card/85 dark:bg-dark-card/85 light:bg-slate-100/85 px-4 py-1.5 rounded-full border border-white/10 dark:border-white/10 light:border-slate-300 backdrop-blur-xl shadow-lg">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-white dark:text-white light:text-primary-600'
                      : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-primary-600/40 border border-primary-500/50 -z-10 shadow-sm shadow-primary-500/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Let's Connect CTA Button */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-primary-600 via-accent-magenta to-accent-gold text-white shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40 hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-accent-gold" />
              <span>Let's Connect</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 light:bg-slate-200/90 light:hover:bg-slate-300/90 border border-slate-700/80 text-slate-300 transition-colors cursor-pointer"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
      />
    </>
  );
};
