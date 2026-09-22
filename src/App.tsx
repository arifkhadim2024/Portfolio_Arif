import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { BackToTop } from './components/layout/BackToTop';
import { Footer } from './components/layout/Footer';
import { CursorGlow } from './components/visual/CursorGlow';
import { CanvasBackground3D } from './components/visual/CanvasBackground3D';
import { LoadingScreen } from './components/visual/LoadingScreen';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Education } from './sections/Education';
import { Certificates } from './sections/Certificates';
import { ResumeCTA } from './sections/ResumeCTA';
import { Contact } from './sections/Contact';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis Ultra-Fluid Smooth Scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
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

  return (
    <div className="relative min-h-screen bg-dark-bg text-dark-text dark:bg-dark-bg dark:text-dark-text light:bg-light-bg light:text-light-text font-sans antialiased selection:bg-gold-500/30 selection:text-gold-200">
      {/* Short Cinematic Loading Sequence */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      {/* Global Interactive 3D WebGL Particle Constellation */}
      <CanvasBackground3D />

      {/* Global Interactive Custom Cursor */}
      <CursorGlow />

      {/* Subtle Analog Film Grain Texture */}
      <div className="fixed inset-0 pointer-events-none z-30 film-grain opacity-30" aria-hidden="true" />

      {/* Scroll indicator bar */}
      <ScrollProgress />

      {/* Sticky Floating Glass Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certificates />
        <ResumeCTA />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to top floating button */}
      <BackToTop />
    </div>
  );
};

export default App;
