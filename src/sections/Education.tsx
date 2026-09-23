import React from 'react';
import { motion } from 'framer-motion';
import { educationData } from '../data/education';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Calendar, MapPin } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-28 lg:py-40 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="05 // ACADEMICS"
          title="Education & Foundations"
          subtitle="Formal computer science engineering foundations, academic coursework, and degree milestones."
        />

        <div className="space-y-16">
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="pt-8 border-t border-black/10 dark:border-white/10 space-y-5"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-[#111111] dark:text-[#F2F1ED]">
                    {item.degree}
                  </h3>
                  <div className="text-sm font-mono uppercase tracking-wider text-[#666666] dark:text-[#888888]">
                    {item.field} • {item.institution}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#888888]">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.startDate} — {item.endDate}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </span>
                  {item.grade && (
                    <>
                      <span>•</span>
                      <span className="font-bold text-[#111111] dark:text-[#F2F1ED]">
                        {item.grade}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-sm sm:text-base text-[#555555] dark:text-[#AAAAAA] leading-relaxed font-body max-w-3xl">
                  {item.description}
                </p>
              )}

              {/* Relevant Coursework */}
              {item.relevantCoursework && item.relevantCoursework.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#888888]">
                    Relevant Coursework & Core Modules
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
