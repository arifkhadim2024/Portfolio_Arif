import React from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../data/experience';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Calendar, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-28 lg:py-40 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="04 // CAREER JOURNEY"
          title="Experience & Internships"
          subtitle="Applied machine learning pipelines, predictive modeling projects, and collaborative web development internships."
        />

        {/* Editorial Timeline */}
        <div className="space-y-16">
          {experienceData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="pt-8 border-t border-black/10 dark:border-white/10 space-y-6"
            >
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-[#111111] dark:text-[#F2F1ED]">
                    {item.role}
                  </h3>
                  <div className="text-sm font-mono uppercase tracking-wider text-[#666666] dark:text-[#888888]">
                    {item.company}
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
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#555555] dark:text-[#AAAAAA] leading-relaxed font-body max-w-3xl">
                {item.description}
              </p>

              {/* Key Contributions List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#888888] font-mono">
                  Key Deliverables & Engineering Outcomes
                </h4>
                <ul className="space-y-2 max-w-3xl">
                  {item.achievements.map((ach, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#444444] dark:text-[#CCCCCC]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#111111] dark:text-[#F2F1ED] flex-shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack & Proof Link */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <Badge key={tech} variant="neutral" size="sm">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {item.certificateUrl && (
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#111111] dark:text-[#F2F1ED] hover:underline underline-offset-4"
                  >
                    <span>View Internship Certificate</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
