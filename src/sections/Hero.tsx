import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Send, ArrowDown } from 'lucide-react';
import { profileData } from '../data/profile';
import { socialLinks } from '../data/social';
import { Button } from '../components/common/Button';
import { IconRenderer } from '../components/common/IconRenderer';
import { Hero3DScene } from '../components/3d/Hero3DScene';
import { EditorialPortrait3D } from '../components/visual/EditorialPortrait3D';

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const roles = profileData.roles;
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 65;
    const pauseTime = 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentRole.length) {
          setCurrentText(currentRole.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentRole.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 overflow-hidden bg-spatial-grid"
    >
      {/* Subtle Studio 3D Floating Geometry & Lighting Environment */}
      <Hero3DScene />

      {/* Subtle paper vignette overlay */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* Left Minimalist Vertical Social Rail (Desktop) */}
      <div className="hidden 2xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-30 pointer-events-auto">
        <div className="w-[1px] h-12 bg-black/15 dark:bg-white/15" />
        <div className="flex flex-col gap-3 text-[#666666] dark:text-[#888888]">
          {socialLinks.slice(0, 4).map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-black/10 dark:border-white/10 text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F2F1ED] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title={social.platform}
              aria-label={social.platform}
            >
              <IconRenderer name={social.icon} className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
        <div className="w-[1px] h-12 bg-black/15 dark:bg-white/15" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        {/* Top Meta Header Row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-black/10 dark:border-white/10 text-xs font-mono"
        >
          <div className="inline-flex items-center gap-2 text-[#111111] dark:text-[#F2F1ED] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{profileData.openToWork ? 'Available for new engineering opportunities' : 'Software Developer'}</span>
          </div>

          <div className="text-[#888888] uppercase tracking-widest hidden sm:block">
            LOCATION: {profileData.location.toUpperCase()} // 2026 EDITION
          </div>
        </motion.div>

        {/* Monumental Display Name Header (Michael Aust Inspired) */}
        <div className="py-10 sm:py-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] sm:text-[13vw] lg:text-[11.5vw] font-bold tracking-tighter text-[#111111] dark:text-[#F2F1ED] leading-[0.84] uppercase font-display select-none"
          >
            <span className="block">ARIF</span>
            <span className="block text-[#777777] dark:text-[#999999] hover:text-[#111111] dark:hover:text-[#F2F1ED] transition-colors duration-500">
              KHADIM
            </span>
          </motion.h1>
        </div>

        {/* Split Editorial Manifesto & Portrait Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end pt-4 pb-8 border-b border-black/10 dark:border-white/10">
          {/* Left Column: Bio & Actions (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Dynamic Typewriter Role */}
            <div className="flex items-center gap-2 h-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#888888]">Focus:</span>
              <span className="text-lg sm:text-xl font-bold font-display uppercase tracking-tight text-[#111111] dark:text-[#F2F1ED]">
                {currentText}
              </span>
              <span className="w-1.5 h-4 bg-[#111111] dark:bg-[#F2F1ED] animate-pulse" />
            </div>

            {/* Short Bio Paragraph */}
            <p className="text-base sm:text-lg text-[#555555] dark:text-[#AAAAAA] max-w-xl leading-relaxed font-body">
              {profileData.shortIntro}
            </p>

            {/* Minimalist Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                href="#projects"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                View Selected Work
              </Button>

              <Button
                variant="secondary"
                size="md"
                href={profileData.resumeUrl}
                target="_blank"
                icon={<Download className="w-3.5 h-3.5" />}
              >
                Download Resume
              </Button>

              <Button
                variant="ghost"
                size="md"
                href="#contact"
                icon={<Send className="w-3.5 h-3.5" />}
              >
                Contact
              </Button>
            </div>

            {/* Core Tech Stack Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-[#888888] uppercase tracking-wider mr-1">Core Stack:</span>
              {[
                'Python',
                'FastAPI',
                'React',
                'Next.js',
                'PyTorch',
                'TypeScript',
                'Docker',
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md border border-black/10 dark:border-white/10 text-[#555555] dark:text-[#AAAAAA] bg-black/[0.02] dark:bg-white/[0.03]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Depth Profile Portrait (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-start lg:justify-end"
          >
            <EditorialPortrait3D />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-6 flex items-center justify-between text-xs font-mono text-[#888888] uppercase tracking-widest">
          <a
            href="#about"
            className="inline-flex items-center gap-2 hover:text-[#111111] dark:hover:text-[#F2F1ED] transition-colors"
          >
            <span>Explore Index</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
          <span className="hidden sm:inline">SCROLL TO NAVIGATE ↓</span>
        </div>
      </div>
    </section>
  );
};
