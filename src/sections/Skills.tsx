import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData, skillCategories } from '../data/skills';
import type { SkillCategory } from '../types';
import { SectionHeader } from '../components/common/SectionHeader';
import { IconRenderer } from '../components/common/IconRenderer';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');

  const filteredSkills = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Technical Skills"
          title="Tools & Technologies I Work With"
          subtitle="A comprehensive toolkit across modern web architectures, machine learning frameworks, databases, and DevOps pipelines."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {skillCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as SkillCategory)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-primary-600 shadow-md shadow-primary-500/25 border border-primary-500/50'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100/90 border border-slate-800 dark:border-slate-800 light:border-slate-300 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -6, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              >
                <div className="group relative h-full p-4 rounded-2xl bg-dark-card/90 dark:bg-dark-card/90 light:bg-white/95 border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/15 transition-all duration-300 flex flex-col items-center text-center justify-between gap-3 cursor-default">
                  {/* Top featured dot */}
                  {skill.featured && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan block shadow-[0_0_8px_#06B6D4]" title="Featured Skill" />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 flex items-center justify-center text-primary-400 group-hover:text-accent-cyan group-hover:bg-primary-500/10 group-hover:scale-115 transition-all duration-300 shadow-inner">
                    <IconRenderer name={skill.icon} className="w-5 h-5" />
                  </div>

                  {/* Skill Name */}
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white dark:text-white light:text-slate-900 group-hover:text-primary-300 transition-colors">
                      {skill.name}
                    </h4>

                    {/* Level Badge */}
                    {skill.level && (
                      <span className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 font-mono mt-0.5 block">
                        {skill.level}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
