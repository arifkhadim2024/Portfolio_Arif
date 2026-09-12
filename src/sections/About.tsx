import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, BookOpen } from 'lucide-react';
import { profileData } from '../data/profile';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlowingCard } from '../components/common/GlowingCard';
import { Badge } from '../components/common/Badge';
import { CodeSnippetCard } from '../components/visual/CodeSnippetCard';
import { IconRenderer } from '../components/common/IconRenderer';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 relative bg-dark-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="About Me"
          title="Passion for Engineering & Problem Solving"
          subtitle="A deeper look into my background, technical interests, and what drives my journey as a software developer."
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {profileData.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <GlowingCard className="p-6 text-center" glowColor="primary">
                <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-primary-400 to-accent-cyan bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white dark:text-white light:text-slate-900 mb-1">
                  {stat.label}
                </div>
                {stat.description && (
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">
                    {stat.description}
                  </p>
                )}
              </GlowingCard>
            </motion.div>
          ))}
        </div>

        {/* Split Content: Narrative + Code Window */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left: Bio Narrative (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-cyan" />
                Who I Am
              </h3>
              {profileData.aboutBio.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Career Interests & Currently Learning */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-primary-400 font-bold text-sm mb-3">
                  <Compass className="w-4 h-4" />
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

              <div className="glass-card p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-accent-cyan font-bold text-sm mb-3">
                  <BookOpen className="w-4 h-4" />
                  <span>Currently Learning</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.currentlyLearning.map((item, i) => (
                    <Badge key={i} variant="cyan" size="sm">
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
              <GlowingCard className="p-5 h-full flex flex-col justify-between" glowColor="cyan">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 flex items-center justify-center mb-3">
                    <IconRenderer name={fact.icon} className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white dark:text-white light:text-slate-900 mb-1">
                    {fact.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed">
                    {fact.description}
                  </p>
                </div>
              </GlowingCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
