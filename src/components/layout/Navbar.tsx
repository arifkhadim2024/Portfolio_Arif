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
          {/* Futuristic Logo & Monogram in Black + Gold */}
          <a
            href="#home"
            className="group flex items-center gap-3 font-bold text-lg text-white dark:text-white light:text-slate-900 tracking-tight"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-200 p-0.5 shadow-lg shadow-gold-950/40 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[10px] bg-[#070709] flex items-center justify-center font-black text-xs text-gold-300 font-mono">
                AK
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-accent-gold rounded-full border-2 border-dark-bg dark:border-dark-bg light:border-white shadow-[0_0_8px_#D4AF37]" />
            </div>
            <div className="flex flex-col">
              <span className="leading-tight font-black group-hover:text-gold-300 transition-colors text-gradient-cinematic">
                {profileData.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 light:text-slate-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
                neural.cosmos.v3
              </span>
            </div>
          </a>

          {/* Floating Frosted Navigation Bar in Obsidian & Gold */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0B0A0E]/85 dark:bg-[#0B0A0E]/85 light:bg-slate-100/85 px-4 py-1.5 rounded-full border border-gold-500/20 dark:border-gold-500/20 light:border-slate-300 backdrop-blur-xl shadow-lg">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-[#FFF8E7] dark:text-[#FFF8E7] light:text-gold-700 font-bold'
                      : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-[#FFF8E7] dark:hover:text-[#FFF8E7] light:hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-gold-500/20 border border-gold-400/50 -z-10 shadow-sm shadow-gold-500/30"
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
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-[#070709] shadow-lg shadow-gold-950/40 hover:shadow-gold-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-[#070709]" />
              <span>Let's Connect</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-[#0B0A0E]/80 hover:bg-[#17120A] dark:bg-[#0B0A0E]/80 dark:hover:bg-[#17120A] light:bg-slate-200/90 light:hover:bg-slate-300/90 border border-gold-500/20 text-slate-300 transition-colors cursor-pointer"
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
