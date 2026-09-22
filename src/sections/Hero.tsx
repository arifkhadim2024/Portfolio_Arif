import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Send, ChevronDown, Sparkles, Terminal, Layers, Activity } from 'lucide-react';
import { profileData } from '../data/profile';
import { socialLinks } from '../data/social';
import { Button } from '../components/common/Button';
import { NeuralCore3D } from '../components/3d/NeuralCore3D';
import { IconRenderer } from '../components/common/IconRenderer';
import { TiltCard } from '../components/visual/TiltCard';

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const roles = profileData.roles;
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;
    const pauseTime = 2200;

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
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-spatial-grid"
    >
      {/* Radial vignette mask for depth blending */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* Left Minimalist Vertical Social Bar (Desktop) */}
      <div className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-30 pointer-events-auto">
        <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-gold-500/40 to-gold-500/80" />
        <div className="flex flex-col gap-4 text-slate-400">
          {socialLinks.slice(0, 4).map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#0D0C0A]/80 hover:bg-[#17120A] border border-gold-500/20 hover:border-gold-400/60 text-slate-400 hover:text-gold-300 transition-all hover:scale-110 shadow-lg backdrop-blur"
              title={social.platform}
              aria-label={social.platform}
            >
              <IconRenderer name={social.icon} className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
        <div className="w-[1px] h-14 bg-gradient-to-t from-transparent via-gold-500/40 to-gold-500/80" />
      </div>

      {/* Seamless 3D Neural Core Interactive Layer (Backdrop Technology) */}
      <div className="absolute top-1/2 right-2 lg:right-20 -translate-y-1/2 w-[340px] sm:w-[480px] lg:w-[600px] h-[340px] sm:h-[480px] lg:h-[600px] opacity-80 dark:opacity-80 light:opacity-30 pointer-events-auto z-0 hidden md:block">
        <NeuralCore3D />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Display Typography & Manifesto (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-center lg:text-left space-y-6 relative"
          >
            {/* Status / Availability Pill with Smoked Glass Depth */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0D0C0A]/90 dark:bg-[#0D0C0A]/90 light:bg-white/90 border border-gold-500/30 dark:border-gold-500/30 light:border-slate-300 shadow-lg shadow-gold-950/40 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-gold shadow-[0_0_6px_#D4AF37]" />
              </span>
              <span className="text-xs font-mono font-medium text-slate-200 dark:text-slate-200 light:text-slate-800 tracking-wide">
                {profileData.openToWork ? 'Available for new engineering opportunities' : 'Software Developer'}
              </span>
            </motion.div>

            {/* Greeting & Grand Editorial Display Heading */}
            <div className="space-y-2">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono tracking-widest uppercase text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-accent-gold" />
                <span>STUDIO.ARCH // PORTFOLIO EDITORIAL</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-[#FFF8E7] dark:text-[#FFF8E7] light:text-slate-900 leading-[1.08]">
                <span className="text-gradient-cinematic">{profileData.name}</span>
              </h1>

              {/* Dynamic Typewriter Role in Metallic Gold to Radiant Gold */}
              <div className="pt-1 flex items-center justify-center lg:justify-start gap-2 h-10 sm:h-12">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif italic text-gradient-gold drop-shadow-sm">
                  {currentText}
                </span>
                <span className="w-0.5 h-6 sm:h-8 bg-accent-gold animate-pulse shadow-[0_0_12px_#D4AF37] rounded-full" />
              </div>
            </div>

            {/* Short Bio Introduction in Soft Warm Ivory */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {profileData.shortIntro}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                href="#projects"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                View My Projects
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href={profileData.resumeUrl}
                target="_blank"
                icon={<Download className="w-4 h-4" />}
              >
                Download Resume
              </Button>

              <Button
                variant="outline"
                size="lg"
                href="#contact"
                icon={<Send className="w-4 h-4" />}
              >
                Contact Me
              </Button>
            </div>

            {/* Core Tech Stack Strip */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-gold" /> Core Stack:
              </span>
              {[
                { name: 'Python', color: 'border-gold-500/40 text-gold-300 bg-gold-500/10' },
                { name: 'FastAPI', color: 'border-gold-500/40 text-gold-300 bg-gold-500/10' },
                { name: 'React', color: 'border-gold-400/40 text-gold-200 bg-gold-400/10' },
                { name: 'PyTorch / AI', color: 'border-amber-500/40 text-amber-300 bg-amber-500/10' },
                { name: 'TypeScript', color: 'border-gold-500/40 text-gold-300 bg-gold-500/10' },
                { name: 'Docker', color: 'border-amber-500/40 text-amber-300 bg-amber-500/10' },
              ].map((tech) => (
                <span
                  key={tech.name}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-medium border ${tech.color} backdrop-blur-md shadow-sm transition-all hover:scale-105 hover:shadow-lg cursor-default`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Layered Double-Exposure Editorial Portrait (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <div className="relative w-72 sm:w-88 lg:w-[26rem] aspect-[3/4] flex items-center justify-center select-none">
              {/* Layer 1: Artistic Double-Exposure Enlarged Background Silhouette */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: [1.12, 1.15, 1.12],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 -top-4 -right-4 w-full h-full rounded-3xl overflow-hidden opacity-30 blur-[2px] pointer-events-none z-0"
              >
                <img
                  src="/editorial-portrait.jpg"
                  alt="Arif Khadim Silhouette"
                  className="w-full h-full object-cover filter contrast-[1.25] brightness-[0.75] grayscale"
                />
              </motion.div>

              {/* Ambient Golden Halo Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-gold-600/20 via-gold-400/15 to-transparent blur-2xl pointer-events-none" />

              {/* Layer 2: Main Editorial Frame Container with 3D Tilt */}
              <TiltCard maxTilt={10} glareOpacity={0.3} className="relative z-10 w-full h-full">
                <div className="w-full h-full rounded-3xl p-1 bg-gradient-to-tr from-gold-600/70 via-gold-400/40 to-amber-500/60 shadow-2xl shadow-black/90 editorial-frame group">
                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#0D0C0A] relative">
                    {/* Primary Editorial Photograph */}
                    <img
                      src="/editorial-portrait.jpg"
                      alt={profileData.name}
                      className="w-full h-full object-cover object-top scale-102 group-hover:scale-106 transition-transform duration-700 ease-out filter contrast-[1.08] brightness-[0.96]"
                      loading="eager"
                    />

                    {/* Gradient Overlay for Editorial Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-75 pointer-events-none" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-gold-400/20 rounded-[22px] pointer-events-none" />

                    {/* Laser scan line effect in gold */}
                    <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent animate-laser-scan pointer-events-none opacity-60" />

                    {/* Bottom Metadata Plate */}
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-[#050505]/85 border border-gold-500/20 backdrop-blur-md flex items-center justify-between text-[10px] font-mono text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-gold shadow-[0_0_6px_#D4AF37]" />
                        <span className="font-bold text-[#FFF8E7]">ARIF KHADIM</span>
                      </div>
                      <span className="text-gold-400">DEV // ML // CSE</span>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Floating Badge 1: 15+ Projects (Top Left) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -left-3 sm:-left-4 px-3.5 py-1.5 rounded-xl bg-[#0D0C0A]/95 dark:bg-[#0D0C0A]/95 light:bg-white/95 border border-gold-500/35 shadow-xl backdrop-blur-md flex items-center gap-2 z-20 hover:scale-105 transition-transform"
              >
                <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-300">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#FFF8E7] font-mono">15+ Projects</div>
                  <div className="text-[9px] text-slate-400">Full-Stack & AI</div>
                </div>
              </motion.div>

              {/* Floating Badge 2: 94.6% Accuracy (Bottom Right) */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-3 -right-3 sm:-right-4 px-3.5 py-1.5 rounded-xl bg-[#0D0C0A]/95 dark:bg-[#0D0C0A]/95 light:bg-white/95 border border-gold-500/35 shadow-xl backdrop-blur-md flex items-center gap-2 z-20 hover:scale-105 transition-transform"
              >
                <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-300">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#FFF8E7] font-mono">94.6% Accuracy</div>
                  <div className="text-[9px] text-slate-400">NeuroVision AI</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator at Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 flex flex-col items-center justify-center gap-2"
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-accent-gold transition-colors group"
            aria-label="Scroll to About section"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase">Explore System</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-accent-gold" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
