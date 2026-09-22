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
                <div className="glass-card-editorial p-6 sm:p-8 rounded-3xl space-y-5 border border-[#B9A16B]/15 hover:border-[#B9A16B]/35 hover:shadow-xl transition-all">
                  {/* Degree & Institution */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#B9A16B]/15">
                    <div className="flex items-start gap-4">
                      <div className="p-3.5 rounded-2xl bg-[#B9A16B]/15 border border-[#B9A16B]/25 text-[#B9A16B] shadow-inner">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#F2F0EA] dark:text-[#F2F0EA] light:text-slate-900 font-display">
                          {item.degree}
                        </h3>
                        <div className="text-sm font-semibold text-[#B9A16B] dark:text-[#B9A16B] light:text-gold-700 mt-0.5">
                          {item.field}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mt-1 flex items-center gap-2 font-mono">
                          <span className="font-medium">{item.institution}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#B9A16B]" />
                            {item.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#161616] text-slate-300 border border-[#B9A16B]/20 w-fit">
                        <Calendar className="w-3.5 h-3.5 text-[#B9A16B]" />
                        {item.startDate} — {item.endDate}
                      </span>
                      {item.grade && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8E6E0] bg-[#B9A16B]/15 px-3 py-1 rounded-full border border-[#B9A16B]/30 w-fit shadow-sm font-mono">
                          <Award className="w-3.5 h-3.5 text-[#B9A16B]" />
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
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600 font-mono">
                        <BookOpen className="w-3.5 h-3.5 text-[#B9A16B]" />
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
