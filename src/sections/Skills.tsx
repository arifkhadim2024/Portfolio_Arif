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
                      ? 'text-[#080808] bg-[#B9A16B] shadow-lg shadow-black/60 border border-[#B9A16B] font-bold'
                      : 'text-slate-400 dark:text-slate-400 light:text-slate-600 bg-[#0F0F0F]/80 dark:bg-[#0F0F0F]/80 light:bg-slate-100/90 border border-[#B9A16B]/15 dark:border-[#B9A16B]/15 light:border-slate-300 hover:text-[#F2F0EA] dark:hover:text-[#F2F0EA] light:hover:text-slate-900 hover:bg-[#161616]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* 3D Orbit vs Matrix Grid Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-2xl bg-[#0F0F0F]/90 border border-[#B9A16B]/20 backdrop-blur">
            <button
              onClick={() => setViewMode('3d-orbit')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === '3d-orbit'
                  ? 'bg-[#B9A16B] text-[#080808] font-bold shadow-md border border-[#B9A16B]'
                  : 'text-slate-400 hover:text-[#F2F0EA]'
              }`}
            >
              <Orbit className="w-3.5 h-3.5 text-[#B9A16B]" />
              <span>3D Constellation</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#B9A16B] text-[#080808] font-bold shadow-md border border-[#B9A16B]'
                  : 'text-slate-400 hover:text-[#F2F0EA]'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Matrix Grid</span>
            </button>
          </div>
        </div>

        {/* 3D Constellation View */}
        {viewMode === '3d-orbit' && (
          <div className="mb-12">
            <SkillEcosystem3D selectedCategory={selectedCategory} />
          </div>
        )}

        {/* Enhanced Perspective Card Grid */}
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
                  <TiltCard maxTilt={10} glareOpacity={0.2} className="h-full">
                    <div className="group relative h-full p-4 rounded-2xl glass-card-editorial border border-[#B9A16B]/15 hover:border-[#B9A16B]/45 hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center justify-between gap-3 cursor-default">
                      {/* Top featured dot */}
                      {skill.featured && (
                        <div className="absolute top-2.5 right-2.5">
                          <span
                            className="w-2 h-2 rounded-full bg-[#B9A16B] block shadow-[0_0_8px_#B9A16B]"
                            title="Featured Skill"
                          />
                        </div>
                      )}

                      {/* Icon with Glowing Halo */}
                      <div className="w-12 h-12 rounded-xl bg-[#161616] flex items-center justify-center text-[#B9A16B] group-hover:text-[#F2F0EA] group-hover:bg-[#B9A16B]/20 group-hover:scale-110 transition-all duration-300 border border-[#B9A16B]/20 shadow-inner">
                        <IconRenderer name={skill.icon} className="w-5 h-5" />
                      </div>

                      {/* Skill Name */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#F2F0EA] dark:text-[#F2F0EA] light:text-slate-900 group-hover:text-[#B9A16B] transition-colors">
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
