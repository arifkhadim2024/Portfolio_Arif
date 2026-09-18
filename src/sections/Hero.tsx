import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Send, ChevronDown, Brain, Atom, Sparkles, Layers, Zap, Terminal } from 'lucide-react';
import { profileData } from '../data/profile';
import { Button } from '../components/common/Button';
import { HeroCore3D } from '../components/3d/HeroCore3D';
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
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-spatial-grid"
    >
      {/* Radial vignette mask for depth blending */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* Floating 3D WebGL Background Scene */}
      <div className="absolute top-1/2 right-4 lg:right-16 -translate-y-1/2 w-[320px] sm:w-[420px] lg:w-[540px] h-[320px] sm:h-[420px] lg:h-[540px] opacity-75 dark:opacity-75 light:opacity-30 pointer-events-auto z-0 hidden md:block">
        <HeroCore3D />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text & Actions (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-center lg:text-left space-y-6 relative"
          >
            {/* Status / Availability Pill with Glass Depth */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-900/80 light:bg-white/90 border border-slate-700/70 dark:border-slate-700/70 light:border-slate-300 shadow-lg shadow-emerald-500/5 backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 tracking-wide">
                {profileData.openToWork ? 'Available for new engineering opportunities' : 'Software Developer'}
              </span>
            </motion.div>

            {/* Greeting & Cinematic Heading */}
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono tracking-widest uppercase text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
                <span>Developer_Portfolio.v2</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white dark:text-white light:text-slate-900 leading-[1.1]">
                <span className="text-gradient-cinematic">{profileData.name}</span>
              </h1>

              {/* Dynamic Typewriter Role */}
              <div className="pt-1 flex items-center justify-center lg:justify-start gap-2 h-10 sm:h-12">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gradient-cyan drop-shadow-sm">
                  {currentText}
                </span>
                <span className="w-1 h-7 sm:h-9 bg-accent-cyan animate-pulse shadow-[0_0_12px_#06B6D4] rounded-full" />
              </div>
            </div>

            {/* Short Bio Introduction */}
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
                <Sparkles className="w-3.5 h-3.5 text-accent-cyan" /> Core Stack:
              </span>
              {[
                { name: 'Python', color: 'border-yellow-500/30 text-yellow-300 bg-yellow-500/10' },
                { name: 'FastAPI', color: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10' },
                { name: 'React', color: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10' },
                { name: 'PyTorch / AI', color: 'border-purple-500/30 text-purple-300 bg-purple-500/10' },
                { name: 'TypeScript', color: 'border-blue-500/30 text-blue-300 bg-blue-500/10' },
                { name: 'Docker', color: 'border-sky-500/30 text-sky-300 bg-sky-500/10' },
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

          {/* Right Column: 3D Holographic Portrait Hub (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <div className="relative w-80 sm:w-96 lg:w-[27rem] aspect-square flex items-center justify-center select-none">
              {/* Outer Orbit Ring 1 (Smooth Clockwise Spin) */}
              <div className="absolute inset-0 rounded-full border border-dashed border-primary-500/25 animate-orbit-cw">
                {/* Orbiting Satellite Particle */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-accent-cyan shadow-[0_0_15px_#06B6D4]" />
              </div>

              {/* Outer Orbit Ring 2 (Counter Clockwise Spin) */}
              <div className="absolute inset-6 rounded-full border border-slate-700/50 animate-orbit-ccw">
                {/* Second Satellite Particle */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-accent-violet shadow-[0_0_12px_#8B5CF6]" />
              </div>

              {/* Pulsing Ambient Back Glow */}
              <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-primary-600/30 via-accent-cyan/25 to-accent-emerald/20 blur-3xl animate-pulse-slow pointer-events-none" />

              {/* 3D Tilt Card Container */}
              <TiltCard maxTilt={14} glareOpacity={0.45} className="relative z-10 w-64 sm:w-72 lg:w-80 aspect-square">
                {/* Multi-gradient frame border */}
                <div className="w-full h-full rounded-3xl p-1 bg-gradient-to-tr from-primary-500 via-accent-cyan to-accent-violet shadow-2xl shadow-primary-500/25 relative group">
                  <div className="w-full h-full rounded-[22px] overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-[#05070B] relative">
                    {/* Portrait Image with studio lighting & subtle vignette */}
                    <img
                      src={profileData.avatarUrl}
                      alt={profileData.name}
                      className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700 ease-out filter contrast-[1.05] brightness-[0.98]"
                      loading="eager"
                    />

                    {/* Studio Gradient Overlay for Seamless Dark Integration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-transparent to-transparent opacity-80 pointer-events-none" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[22px] pointer-events-none" />

                    {/* Laser scan line effect */}
                    <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser-scan pointer-events-none" />
                  </div>
                </div>
              </TiltCard>

              {/* Floating Badge 1: React & TS (Top Left) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -left-2 sm:left-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/95 border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 shadow-xl backdrop-blur-md flex items-center gap-2 z-20 hover:scale-110 transition-transform cursor-pointer"
              >
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Atom className="w-4 h-4 animate-spin-slow" />
                </div>
                <span className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">
                  React & TS
                </span>
              </motion.div>

              {/* Floating Badge 2: AI & ML (Bottom Right) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-3 right-0 sm:right-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/95 border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 shadow-xl backdrop-blur-md flex items-center gap-2 z-20 hover:scale-110 transition-transform cursor-pointer"
              >
                <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                  <Brain className="w-4 h-4 animate-pulse" />
                </div>
                <span className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">
                  AI & ML
                </span>
              </motion.div>

              {/* Floating Badge 3: FastAPI & Python (Top Right) */}
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute top-6 -right-4 sm:-right-6 px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/95 border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2 z-20 hover:scale-110 transition-transform cursor-pointer"
              >
                <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">
                  FastAPI
                </span>
              </motion.div>

              {/* Floating Badge 4: Full-Stack (Bottom Left) */}
              <motion.div
                animate={{ x: [0, -6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-6 -left-4 sm:-left-6 px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/95 border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2 z-20 hover:scale-110 transition-transform cursor-pointer"
              >
                <div className="p-1 rounded-lg bg-primary-500/20 text-primary-400">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">
                  Full Stack
                </span>
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
            className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-primary-400 transition-colors group"
            aria-label="Scroll to About section"
          >
            <span className="text-[11px] font-mono tracking-widest uppercase">Explore System</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-accent-cyan" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
