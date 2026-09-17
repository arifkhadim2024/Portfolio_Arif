import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Send, ChevronDown, Brain, Atom, Terminal, Sparkles } from 'lucide-react';
import { profileData } from '../data/profile';
import { Button } from '../components/common/Button';
import { ParticleBackground } from '../components/visual/ParticleBackground';
import { AmbientGlow } from '../components/visual/AmbientGlow';

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const roles = profileData.roles;
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;
    const pauseTime = 1800;

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
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-pattern"
    >
      {/* Background visual layers */}
      <AmbientGlow />
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text & Actions (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Status / Welcome Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-700/70 dark:border-slate-700/70 light:border-slate-300 shadow-sm backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700">
                {profileData.openToWork ? 'Available for new opportunities' : 'Software Developer'}
              </span>
            </div>

            {/* Greeting & Main Headline */}
            <div>
              <p className="text-base sm:text-lg font-medium text-slate-400 dark:text-slate-400 light:text-slate-600 mb-1">
                Hi there, I'm
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900">
                {profileData.name}
              </h1>

              {/* Dynamic Typewriter Role */}
              <div className="mt-3 flex items-center justify-center lg:justify-start gap-2 h-10 sm:h-12">
                <span className="text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-400 via-accent-cyan to-accent-emerald bg-clip-text text-transparent">
                  {currentText}
                </span>
                <span className="w-0.5 h-6 sm:h-8 bg-primary-400 animate-pulse" />
              </div>
            </div>

            {/* Short Bio Introduction */}
            <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
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
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2">
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
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border ${tech.color} backdrop-blur-sm shadow-sm`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Premium Visual Profile Treatment (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <div className="relative w-72 sm:w-80 lg:w-96 aspect-square flex items-center justify-center">
              {/* Outer Rotating Glowing Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-primary-500/30 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-slate-700/60" />

              {/* Pulsing Back Glow */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-primary-600/30 via-accent-cyan/20 to-accent-emerald/20 blur-2xl animate-pulse-slow" />

              {/* Avatar Center Card */}
              <div className="relative w-56 sm:w-64 lg:w-72 aspect-square rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-primary-500 via-accent-cyan to-accent-violet shadow-2xl shadow-primary-500/20">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-950 relative group">
                  <img
                    src={profileData.avatarUrl}
                    alt={profileData.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
              </div>

              {/* Floating Badge 1: React / Frontend */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-2 left-4 px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 shadow-xl backdrop-blur flex items-center gap-2"
              >
                <div className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Atom className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">
                  React & TS
                </span>
              </motion.div>

              {/* Floating Badge 2: AI / PyTorch */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-2 right-4 px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 shadow-xl backdrop-blur flex items-center gap-2"
              >
                <div className="p-1 rounded-lg bg-purple-500/20 text-purple-400">
                  <Brain className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-800">
                  AI & ML
                </span>
              </motion.div>

              {/* Floating Badge 3: Backend / Node */}
              <motion.div
                animate={{ x: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute top-1/2 -left-6 px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 shadow-xl backdrop-blur hidden sm:flex items-center gap-2"
              >
                <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Terminal className="w-4 h-4" />
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
            className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-primary-400 transition-colors group"
            aria-label="Scroll to About section"
          >
            <span className="text-xs font-medium tracking-wider uppercase">Explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-primary-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
