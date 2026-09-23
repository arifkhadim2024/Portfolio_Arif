import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ServicesSection } from '../sections/ServicesSection';
import { SkillsMatrixSection } from '../sections/SkillsMatrixSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { ResumeCTASection } from '../sections/ResumeCTASection';
import { FooterCards } from '../components/FooterCards';
import type { ProjectItem } from '../data/portfolioData';

interface HomePageProps {
  onNavigate: (page: 'home' | 'projects' | 'about' | 'contact') => void;
  onOpenContactModal: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenContactModal,
  onSelectProject,
}) => {
  return (
    <div className="w-full">
      <HeroSection onOpenContactModal={onOpenContactModal} />
      <ProjectsSection
        onViewAllProjects={() => onNavigate('projects')}
        onSelectProject={onSelectProject}
      />
      <ServicesSection />
      <SkillsMatrixSection />
      <TestimonialsSection />
      <ResumeCTASection />
      <FooterCards currentPage="home" onNavigate={onNavigate} />
    </div>
  );
};
