import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData, skillCategories } from '../data/skills';
import type { SkillCategory } from '../types';
import { SectionHeader } from '../components/common/SectionHeader';
import { IconRenderer } from '../components/common/IconRenderer';
import { SkillEcosystem3D } from '../components/3d/SkillEcosystem3D';
import { Orbit, Grid3X3 } from 'lucide-react';
import { TiltCard } from '../components/visual/TiltCard';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');
  const [viewMode, setViewMode] = useState<'3d-orbit' | 'grid'>('3d-orbit');

  const filteredSkills = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-24 lg:py-32 relative bg-dark-bg/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Technical Ecosystem"
          title="Interactive Technology Architecture"
          subtitle="Explore my full-stack engineering toolkit, deep learning models, databases, and DevOps frameworks in an interactive 3D ecosystem."
        />

        {/* View Mode & Category Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {skillCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as SkillCategory)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#FDFBF7] bg-purple-600 shadow-lg shadow-purple-900/40 border border-purple-400/50'
                      : 'text-slate-400 dark:text-slate-400 light:text-slate-600 bg-[#0D0C12]/80 dark:bg-[#0D0C12]/80 light:bg-slate-100/90 border border-white/10 dark:border-white/10 light:border-slate-300 hover:text-[#FDFBF7] dark:hover:text-[#FDFBF7] light:hover:text-slate-900 hover:bg-[#161421]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* 3D Orbit vs Matrix Grid Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-2xl bg-[#0D0C12]/90 border border-white/10 backdrop-blur">
            <button
              onClick={() => setViewMode('3d-orbit')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === '3d-orbit'
                  ? 'bg-purple-600 text-[#FDFBF7] shadow-md border border-purple-400/40'
                  : 'text-slate-400 hover:text-[#FDFBF7]'
              }`}
            >
              <Orbit className="w-3.5 h-3.5 text-accent-gold" />
              <span>3D Orbit</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-purple-600 text-[#FDFBF7] shadow-md border border-purple-400/40'
                  : 'text-slate-400 hover:text-[#FDFBF7]'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Matrix Grid</span>
            </button>
          </div>
        </div>

        {/* 3D Solar Ecosystem View */}
        {viewMode === '3d-orbit' && (
          <div className="mb-12">
            <SkillEcosystem3D selectedCategory={selectedCategory} />
          </div>
        )}

        {/* Enhanced 3D Perspective Card Grid */}
        <div className={viewMode === '3d-orbit' ? 'block sm:hidden' : 'block'}>
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
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                >
                  <TiltCard maxTilt={10} glareOpacity={0.25} className="h-full">
                    <div className="group relative h-full p-4 rounded-2xl glass-card-3d border border-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/30 transition-all duration-300 flex flex-col items-center text-center justify-between gap-3 cursor-default">
                      {/* Top featured dot */}
                      {skill.featured && (
                        <div className="absolute top-2.5 right-2.5">
                          <span
                            className="w-2 h-2 rounded-full bg-accent-gold block shadow-[0_0_10px_#E5C07B]"
                            title="Featured Skill"
                          />
                        </div>
                      )}

                      {/* Icon with Glowing Halo */}
                      <div className="w-12 h-12 rounded-xl bg-[#13111C] flex items-center justify-center text-purple-400 group-hover:text-fuchsia-300 group-hover:bg-purple-500/15 group-hover:scale-115 transition-all duration-300 border border-white/5 shadow-inner">
                        <IconRenderer name={skill.icon} className="w-5 h-5" />
                      </div>

                      {/* Skill Name */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#FDFBF7] dark:text-[#FDFBF7] light:text-slate-900 group-hover:text-purple-300 transition-colors">
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
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
