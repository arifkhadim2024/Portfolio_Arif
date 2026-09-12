import React from 'react';
import { motion } from 'framer-motion';
import { educationData } from '../data/education';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 lg:py-28 relative bg-dark-bg/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Academics"
          title="Education & Foundations"
          subtitle="Formal computer science education, relevant engineering coursework, and academic milestones."
        />

        <div className="space-y-8">
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-5 hover:border-slate-700 transition-colors">
                {/* Degree & Institution */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900">
                        {item.degree}
                      </h3>
                      <div className="text-sm font-semibold text-primary-400 dark:text-primary-400 light:text-primary-600 mt-0.5">
                        {item.field}
                      </div>
                      <div className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 mt-1 flex items-center gap-2">
                        <span>{item.institution}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 w-fit">
                      <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                      {item.startDate} — {item.endDate}
                    </span>
                    {item.grade && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 w-fit">
                        <Award className="w-3 h-3" />
                        {item.grade}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Coursework Tags */}
                {item.relevantCoursework && item.relevantCoursework.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <BookOpen className="w-3.5 h-3.5 text-primary-400" />
                      <span>Key Subjects & Coursework</span>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
