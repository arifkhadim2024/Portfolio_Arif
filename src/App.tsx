import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { BackToTop } from './components/layout/BackToTop';
import { Footer } from './components/layout/Footer';
import { CursorGlow } from './components/visual/CursorGlow';
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
  return (
    <div className="relative min-h-screen bg-dark-bg text-dark-text dark:bg-dark-bg dark:text-dark-text light:bg-light-bg light:text-light-text font-sans antialiased selection:bg-primary-500/30 selection:text-primary-300">
      {/* Global Interactive Cursor Spotlight */}
      <CursorGlow />

      {/* Scroll indicator bar */}
      <ScrollProgress />

      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative">
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
