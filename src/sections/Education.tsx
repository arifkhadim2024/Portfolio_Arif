import React from 'react';
import { motion } from 'framer-motion';
import { educationData } from '../data/education';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import { TiltCard } from '../components/visual/TiltCard';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 lg:py-32 relative bg-dark-bg/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Academics"
          title="Education & Foundations"
          subtitle="Formal computer science engineering education, core curriculum, and academic milestones."
        />

        <div className="space-y-8">
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <TiltCard maxTilt={6} glareOpacity={0.2}>
                <div className="glass-card-3d p-6 sm:p-8 rounded-3xl space-y-5 border border-white/10 hover:border-purple-500/40 hover:shadow-xl transition-all">
                  {/* Degree & Institution */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div className="flex items-start gap-4">
                      <div className="p-3.5 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 shadow-inner">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#FDFBF7] dark:text-[#FDFBF7] light:text-slate-900">
                          {item.degree}
                        </h3>
                        <div className="text-sm font-semibold text-purple-400 dark:text-purple-400 light:text-purple-600 mt-0.5">
                          {item.field}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mt-1 flex items-center gap-2">
                          <span className="font-medium">{item.institution}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-accent-gold" />
                            {item.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#13111C] text-slate-300 border border-white/10 w-fit">
                        <Calendar className="w-3.5 h-3.5 text-accent-gold" />
                        {item.startDate} — {item.endDate}
                      </span>
                      {item.grade && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 w-fit shadow-sm font-mono">
                          <Award className="w-3.5 h-3.5 text-accent-gold" />
                          {item.grade}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  )}

                  {/* Coursework Tags */}
                  {item.relevantCoursework && item.relevantCoursework.length > 0 && (
                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                        <span>Key Subjects & Engineering Foundations</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.relevantCoursework.map((course, idx) => (
                          <Badge key={idx} variant="neutral" size="sm">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
