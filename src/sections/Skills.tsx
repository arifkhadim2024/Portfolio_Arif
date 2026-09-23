import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData, skillCategories } from '../data/skills';
import type { SkillCategory } from '../types';
import { SectionHeader } from '../components/common/SectionHeader';
import { IconRenderer } from '../components/common/IconRenderer';
import { SkillEcosystem3D } from '../components/3d/SkillEcosystem3D';
import { Orbit, Grid3X3 } from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');
  const [viewMode, setViewMode] = useState<'3d-orbit' | 'grid'>('3d-orbit');

  const filteredSkills = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter((skill) => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-28 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="02 // TECHNICAL ECOSYSTEM"
          title="Skills & Technologies"
          subtitle="A comprehensive index of programming languages, full-stack frameworks, AI / ML libraries, and cloud developer tools."
        />

        {/* View Mode & Category Controls Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12 pb-6 border-b border-black/10 dark:border-white/10">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {skillCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as SkillCategory)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-[#F2F1ED] dark:bg-[#F2F1ED] dark:text-[#111111] font-bold shadow-sm'
                      : 'text-[#666666] dark:text-[#888888] hover:text-[#111111] dark:hover:text-[#F2F1ED] border border-black/10 dark:border-white/10 hover:border-black/30'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* 3D Orbit vs Matrix Grid Switcher */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50">
            <button
              onClick={() => setViewMode('3d-orbit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === '3d-orbit'
                  ? 'bg-[#111111] text-[#F2F1ED] dark:bg-[#F2F1ED] dark:text-[#111111] font-bold shadow-sm'
                  : 'text-[#666666] dark:text-[#888888] hover:text-[#111111]'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>3D Orbit</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#111111] text-[#F2F1ED] dark:bg-[#F2F1ED] dark:text-[#111111] font-bold shadow-sm'
                  : 'text-[#666666] dark:text-[#888888] hover:text-[#111111]'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Grid Index</span>
            </button>
          </div>
        </div>

        {/* 3D Constellation View */}
        {viewMode === '3d-orbit' && (
          <div className="mb-14">
            <SkillEcosystem3D selectedCategory={selectedCategory} />
          </div>
        )}

        {/* Enhanced Clean Skill Cards Grid */}
        <div className={viewMode === '3d-orbit' ? 'block sm:hidden' : 'block'}>
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
          >
            <AnimatePresence>
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 hover:border-black/30 dark:hover:border-white/30 transition-all flex flex-col items-center text-center justify-between gap-3 group"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg border border-black/10 dark:border-white/10 flex items-center justify-center text-[#111111] dark:text-[#F2F1ED] bg-black/[0.02] dark:bg-white/[0.03] group-hover:scale-105 transition-transform">
                    <IconRenderer name={skill.icon} className="w-4 h-4" />
                  </div>

                  {/* Skill Name & Level */}
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold font-display uppercase tracking-tight text-[#111111] dark:text-[#F2F1ED]">
                      {skill.name}
                    </h4>
                    {skill.level && (
                      <span className="text-[10px] text-[#888888] font-mono mt-0.5 block uppercase tracking-wider">
                        {skill.level}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
