import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { MagneticWrapper } from './MagneticWrapper';

interface NavbarProps {
  activePage: 'home' | 'projects' | 'about' | 'contact';
  onNavigate: (page: 'home' | 'projects' | 'about' | 'contact') => void;
  onOpenContactModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenContactModal,
}) => {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'light';
  });

  // Sync theme class on mount
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    const nextTheme = !isLightMode;
    setIsLightMode(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  };

  const navItems: { label: string; page: 'home' | 'projects' | 'about' | 'contact' }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Projects', page: 'projects' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleLinkClick = (page: 'home' | 'projects' | 'about' | 'contact') => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] px-6 md:px-12 py-6 md:py-8 flex items-center justify-between pointer-events-none transition-all duration-300">
      {/* Brand Monogram Badge with Magnetic Pull */}
      <MagneticWrapper strength={0.4} dataCursor="link">
        <button
          onClick={() => handleLinkClick('home')}
          className="pointer-events-auto group relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white bg-[var(--color-surface)] border-2 border-white/20 transition-all duration-300 hover:border-[var(--accent-primary)] hover:shadow-glow-violet focus:outline-none"
          aria-label="Home"
          data-cursor="link"
        >
          <span className="font-display font-black text-sm md:text-base tracking-widest uppercase text-white group-hover:text-gradient-signature">
            {portfolioData.monogram}
          </span>
        </button>
      </MagneticWrapper>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-10 glass-pill-nav px-8 py-3 rounded-full shadow-2xl pointer-events-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.page;
          const isSiblingHovered = hoveredNav !== null && hoveredNav !== item.page;

          return (
            <MagneticWrapper key={item.page} strength={0.3} dataCursor="link">
              <button
                onClick={() => handleLinkClick(item.page)}
                onMouseEnter={() => setHoveredNav(item.page)}
                onMouseLeave={() => setHoveredNav(null)}
                data-cursor="link"
                className={`relative py-1 text-[1.2rem] font-display font-black tracking-[0.3em] uppercase transition-colors duration-300 focus:outline-none ${
                  isActive
                    ? 'text-white'
                    : 'text-[var(--color-text-muted)] hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-gradient-signature font-black' : ''}>
                  {item.label}
                </span>
                {/* Glowing Signature Underline */}
                <div
                  className={`nav-link_line ${
                    isActive ? 'opacity-100' : ''
                  } ${isSiblingHovered ? 'opacity-0 !important' : ''}`}
                />
              </button>
            </MagneticWrapper>
          );
        })}
      </div>

      {/* Desktop Right CTA + Theme Toggle */}
      <div className="hidden md:flex items-center gap-4 pointer-events-auto">
        {/* Light / Dark Mode Toggle Button with Magnetic Pull */}
        <MagneticWrapper strength={0.35} dataCursor="button">
          <button
            onClick={toggleTheme}
            className="w-11 h-11 rounded-full bg-[var(--color-surface)] border border-[#7C3AED]/30 flex items-center justify-center text-[var(--color-text)] hover:text-[var(--accent-secondary)] hover:border-[var(--accent-secondary)] transition-all duration-300 shadow-md focus:outline-none"
            aria-label="Toggle theme mode"
            title={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            data-cursor="button"
          >
            {isLightMode ? (
              /* Moon Icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              /* Sun Icon */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>
        </MagneticWrapper>

        {/* "Get in Touch" Button with Magnetic Pull & 3D Rise */}
        <MagneticWrapper strength={0.3} dataCursor="button">
          <button
            onClick={onOpenContactModal}
            className="button-custom button-gradient shadow-glow-violet text-[1.1rem] px-7 py-3 rounded-[0.8rem]"
            data-cursor="button"
          >
            Get in Touch
          </button>
        </MagneticWrapper>
      </div>

      {/* Mobile Right Action Area (Theme toggle + Hamburger) */}
      <div className="flex md:hidden items-center gap-3 pointer-events-auto">
        <button
          onClick={toggleTheme}
          className="w-11 h-11 rounded-full bg-[var(--color-surface)] border border-white/10 flex items-center justify-center text-[var(--color-text)] focus:outline-none"
          aria-label="Toggle theme"
        >
          {isLightMode ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
            </svg>
          )}
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-12 h-12 rounded-full bg-[var(--color-surface)]/90 border border-white/10 flex flex-col items-center justify-center gap-1.5 focus:outline-none shadow-xl"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-transform duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-transform duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation Fullscreen Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[var(--color-bg)] z-[999] flex flex-col justify-between p-8 pt-28 pointer-events-auto md:hidden animate-fadeIn">
          <div className="flex flex-col gap-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleLinkClick(item.page)}
                className={`text-left font-display font-black text-4xl tracking-wider uppercase transition-colors duration-200 ${
                  activePage === item.page ? 'text-gradient-signature' : 'text-white hover:text-[var(--accent-secondary)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6 pt-10 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContactModal();
              }}
              className="button-custom w-full py-5 text-center text-lg justify-center"
            >
              Get in Touch
            </button>

            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#C4C4C4]">
              <span>{portfolioData.name}</span>
              <a href={`mailto:${portfolioData.email}`} className="text-[var(--accent-secondary)]">
                {portfolioData.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
