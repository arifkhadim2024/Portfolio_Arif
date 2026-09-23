import React, { useEffect, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { ContactModal } from './components/ContactModal';
import { TransitionOverlay } from './components/TransitionOverlay';
import { Cursor3D } from './components/Cursor3D';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import type { ProjectItem } from './data/portfolioData';

const getInitialPage = (): 'home' | 'projects' | 'about' | 'contact' => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace('/', '') || window.location.hash.replace('#/', '');
  if (['projects', 'about', 'contact'].includes(path)) {
    return path as 'projects' | 'about' | 'contact';
  }
  return 'home';
};

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<'home' | 'projects' | 'about' | 'contact'>(getInitialPage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Listen to popstate (browser back/forward button)
  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle page transitions with 3-bar wipe
  const handleNavigate = useCallback((page: 'home' | 'projects' | 'about' | 'contact') => {
    if (page === activePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsTransitioning(true);

    // Switch active page during the middle of the transition wipe
    setTimeout(() => {
      setActivePage(page);
      window.scrollTo(0, 0);
      const newUrl = page === 'home' ? '/' : `/${page}`;
      window.history.pushState({}, '', newUrl);
    }, 450);
  }, [activePage]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans antialiased relative selection:bg-[#7C3AED] selection:text-white">
      {/* Real Fullscreen 3D Cursor Engine */}
      <Cursor3D />

      {/* 3-Bar Wipe Transition Overlay */}
      <TransitionOverlay
        isTransitioning={isTransitioning}
        onTransitionComplete={() => setIsTransitioning(false)}
      />

      {/* Global Navigation Header */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Active Page View */}
      <main className="relative z-10">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenContactModal={() => setIsContactModalOpen(true)}
            onSelectProject={(project) => {
              setSelectedProject(project);
              handleNavigate('projects');
            }}
          />
        )}

        {activePage === 'projects' && (
          <ProjectsPage
            onNavigate={handleNavigate}
            onOpenContactModal={() => setIsContactModalOpen(true)}
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />
        )}
      </main>

      {/* "Let's meet" Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default App;
