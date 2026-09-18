import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, BookOpen, Code2, Brain, Database, Cpu } from 'lucide-react';
import { profileData } from '../data/profile';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { CodeSnippetCard } from '../components/visual/CodeSnippetCard';
import { IconRenderer } from '../components/common/IconRenderer';
import { TiltCard } from '../components/visual/TiltCard';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 lg:py-32 relative bg-dark-bg/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="About Me"
          title="Passion for Engineering & Intelligent Systems"
          subtitle="A deeper look into my background, technical interests, and what drives my journey as a software developer."
        />

        {/* 3D Smoked Glass Core Focus Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            {
              title: 'Full Stack Engineering',
              desc: 'End-to-end web apps with React, Vite, Node.js & FastAPI.',
              icon: <Code2 className="w-5 h-5 text-purple-400" />,
              border: 'group-hover:border-purple-500/50',
              gradient: 'from-purple-500/10 to-transparent',
            },
            {
              title: 'AI & Machine Learning',
              desc: 'Deep learning pipelines, CV models & NLP semantic matchers.',
              icon: <Brain className="w-5 h-5 text-fuchsia-400" />,
              border: 'group-hover:border-fuchsia-500/50',
              gradient: 'from-fuchsia-500/10 to-transparent',
            },
            {
              title: 'Distributed Systems',
              desc: 'High-throughput APIs, Redis caching & WebSockets.',
              icon: <Cpu className="w-5 h-5 text-amber-400" />,
              border: 'group-hover:border-amber-500/50',
              gradient: 'from-amber-500/10 to-transparent',
            },
            {
              title: 'Modern Database Design',
              desc: 'Relational & NoSQL architectures with Postgres & MongoDB.',
              icon: <Database className="w-5 h-5 text-pink-400" />,
              border: 'group-hover:border-pink-500/50',
              gradient: 'from-pink-500/10 to-transparent',
            },
          ].map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <TiltCard maxTilt={10} glareOpacity={0.2} className="h-full">
                <div className={`glass-card-3d group p-5 rounded-2xl h-full flex flex-col justify-between border border-white/10 hover:border-purple-500/40 relative overflow-hidden`}>
                  <div className={`absolute -right-6 -bottom-6 w-28 h-28 bg-gradient-to-br ${pillar.gradient} rounded-full blur-2xl pointer-events-none`} />
                  <div className="relative z-10 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#13111C] flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-110 transition-transform">
                      {pillar.icon}
                    </div>
                    <h4 className="text-base font-bold text-[#FDFBF7] dark:text-[#FDFBF7] light:text-slate-900 group-hover:text-purple-300 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid with 3D Specular Lighting */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {profileData.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <TiltCard maxTilt={8} glareOpacity={0.25} className="h-full">
                <div className="glass-card-3d p-6 text-center rounded-2xl h-full flex flex-col justify-center border border-white/10 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-900/20">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-purple-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent mb-1 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-[#FDFBF7] dark:text-[#FDFBF7] light:text-slate-900 mb-1">
                    {stat.label}
                  </div>
                  {stat.description && (
                    <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                      {stat.description}
                    </p>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Split Content: Narrative + Interactive Developer Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left: Bio Narrative (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="glass-card-3d p-6 sm:p-8 rounded-3xl space-y-4 border border-white/10">
              <h3 className="text-xl sm:text-2xl font-bold text-[#FDFBF7] dark:text-[#FDFBF7] light:text-slate-900 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-accent-gold" />
                <span>Architecting Software with Purpose</span>
              </h3>
              {profileData.aboutBio.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed font-normal"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Career Interests & Currently Learning */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card-3d p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-sm mb-3">
                  <Compass className="w-4 h-4 text-accent-gold" />
                  <span>Career Interests</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.careerInterests.map((interest, i) => (
                    <Badge key={i} variant="primary" size="sm">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="glass-card-3d p-5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-fuchsia-300 font-bold text-sm mb-3">
                  <BookOpen className="w-4 h-4 text-accent-magenta" />
                  <span>Currently Learning</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.currentlyLearning.map((item, i) => (
                    <Badge key={i} variant="magenta" size="sm">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive Terminal (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <CodeSnippetCard />
          </motion.div>
        </div>

        {/* Quick Highlights / Core Strengths Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profileData.quickFacts.map((fact, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <TiltCard maxTilt={8} glareOpacity={0.2} className="h-full">
                <div className="glass-card-3d p-5 h-full flex flex-col justify-between rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center mb-3">
                      <IconRenderer name={fact.icon} className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#FDFBF7] dark:text-[#FDFBF7] light:text-slate-900 mb-1">
                      {fact.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                      {fact.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
