import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Brain, Database, Cpu, Compass, BookOpen } from 'lucide-react';
import { profileData } from '../data/profile';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { CodeSnippetCard } from '../components/visual/CodeSnippetCard';
import { IconRenderer } from '../components/common/IconRenderer';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-28 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="01 // ABOUT ME"
          title="Background & Engineering Philosophy"
          subtitle="A perspective on software craftsmanship, artificial intelligence, and building tools that deliver meaningful impact."
        />

        {/* Narrative Columns (Editorial Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column: Monumental Lead & Bio Narrative (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111111] dark:text-[#F2F1ED] font-display uppercase leading-snug">
              Developing modern digital experiences at the intersection of full-stack engineering and intelligent machine learning.
            </h3>

            <div className="space-y-5 text-base sm:text-lg text-[#555555] dark:text-[#AAAAAA] leading-relaxed font-body">
              {profileData.aboutBio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Career Interests & Current Research */}
            <div className="pt-6 border-t border-black/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#888888]">
                  <Compass className="w-3.5 h-3.5 text-[#111111] dark:text-[#F2F1ED]" />
                  <span>Core Focus Areas</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {profileData.careerInterests.map((interest, i) => (
                    <Badge key={i} variant="neutral" size="sm">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#888888]">
                  <BookOpen className="w-3.5 h-3.5 text-[#111111] dark:text-[#F2F1ED]" />
                  <span>Currently Exploring</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {profileData.currentlyLearning.map((item, i) => (
                    <Badge key={i} variant="neutral" size="sm">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Code Terminal & Stats (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            <CodeSnippetCard />

            {/* Clean Stats Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {profileData.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50"
                >
                  <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-[#111111] dark:text-[#F2F1ED]">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#666666] dark:text-[#888888] mt-1 font-semibold">
                    {stat.label}
                  </div>
                  {stat.description && (
                    <p className="text-[11px] text-[#888888] dark:text-[#777777] mt-0.5">
                      {stat.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 4 Pillars of Engineering Focus */}
        <div className="pt-12 border-t border-black/10 dark:border-white/10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#888888] mb-8">
            [ TECHNICAL CAPABILITIES ]
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Full Stack Architecture',
                desc: 'End-to-end web apps with React, Vite, Node.js, FastAPI & TypeScript.',
                icon: <Code2 className="w-5 h-5 text-[#111111] dark:text-[#F2F1ED]" />,
              },
              {
                title: 'AI & Machine Learning',
                desc: 'Deep learning pipelines, CV models & NLP semantic matching algorithms.',
                icon: <Brain className="w-5 h-5 text-[#111111] dark:text-[#F2F1ED]" />,
              },
              {
                title: 'Distributed Systems',
                desc: 'High-throughput APIs, Redis state caching, Docker & WebSockets.',
                icon: <Cpu className="w-5 h-5 text-[#111111] dark:text-[#F2F1ED]" />,
              },
              {
                title: 'Modern Database Design',
                desc: 'Relational & document databases with PostgreSQL, MongoDB & Supabase.',
                icon: <Database className="w-5 h-5 text-[#111111] dark:text-[#F2F1ED]" />,
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60 space-y-3 hover:border-black/30 dark:hover:border-white/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center bg-black/[0.02] dark:bg-white/[0.03]">
                  {pillar.icon}
                </div>
                <h4 className="text-base font-bold font-display uppercase tracking-tight text-[#111111] dark:text-[#F2F1ED]">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[#666666] dark:text-[#999999] leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Highlights / Core Strengths Grid */}
        <div className="mt-16 pt-12 border-t border-black/10 dark:border-white/10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#888888] mb-8">
            [ PROFESSIONAL VALUES ]
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profileData.quickFacts.map((fact, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-neutral-900/40 space-y-2 hover:border-black/30 dark:hover:border-white/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-[#111111] dark:text-[#F2F1ED] mb-3">
                  <IconRenderer name={fact.icon} className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold font-display uppercase tracking-tight text-[#111111] dark:text-[#F2F1ED]">
                  {fact.title}
                </h4>
                <p className="text-xs text-[#666666] dark:text-[#999999] leading-relaxed">
                  {fact.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
