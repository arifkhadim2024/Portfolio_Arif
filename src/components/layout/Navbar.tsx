import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, ArrowUpRight } from 'lucide-react';
import { profileData } from '../../data/profile';
import { ThemeToggle } from './ThemeToggle';
import { MobileDrawer } from './MobileDrawer';
import { useActiveSection } from '../../hooks/useActiveSection';

const navItems = [
  { id: 'home', label: 'Index' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
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
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav-frosted py-3.5 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Editorial Monogram / Brand Name */}
          <a
            href="#home"
            className="group flex items-center gap-3 text-sm sm:text-base font-bold tracking-tight text-[#111111] dark:text-[#F2F1ED] font-display"
          >
            <span className="w-2 h-2 rounded-full bg-[#111111] dark:bg-[#F2F1ED]" />
            <span className="uppercase tracking-wider font-bold">
              {profileData.name}
            </span>
          </a>

          {/* Minimalist Editorial Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative text-xs font-mono uppercase tracking-widest transition-colors duration-200 py-1 ${
                    isActive
                      ? 'text-[#111111] dark:text-[#F2F1ED] font-bold'
                      : 'text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#F2F1ED]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#111111] dark:bg-[#F2F1ED]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Resume / Contact CTA Link */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider bg-[#111111] text-[#F2F1ED] dark:bg-[#F2F1ED] dark:text-[#111111] hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-black/10 dark:border-white/10 text-[#111111] dark:text-[#F2F1ED] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
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
