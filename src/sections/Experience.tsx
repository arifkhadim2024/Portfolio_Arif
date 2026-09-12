import React from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../data/experience';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, ExternalLink } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 lg:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Career Journey"
          title="Experience & Internships"
          subtitle="A chronicle of engineering internships, technical leadership, and collaborative development achievements."
        />

        {/* Timeline Container */}
        <div className="relative border-l border-slate-800 dark:border-slate-800 light:border-slate-300 ml-4 sm:ml-8 space-y-12">
          {experienceData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-3 top-1.5 w-6 h-6 rounded-full bg-dark-bg dark:bg-dark-bg light:bg-white border-2 border-primary-500 flex items-center justify-center group-hover:scale-125 transition-transform shadow-md shadow-primary-500/30">
                <div className="w-2 h-2 rounded-full bg-accent-cyan" />
              </div>

              {/* Experience Card */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-4">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary-400" />
                      {item.role}
                    </h3>
                    <div className="text-sm font-semibold text-primary-400 dark:text-primary-400 light:text-primary-600 mt-0.5">
                      {item.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                      {item.startDate} — {item.endDate}
                    </span>
                    <Badge variant={item.type === 'Internship' ? 'cyan' : 'emerald'} size="sm">
                      {item.type}
                    </Badge>
                  </div>
                </div>

                {/* Location & summary */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.location}</span>
                </div>

                <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Achievements Bullet points */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Key Contributions & Impact
                  </h4>
                  <ul className="space-y-2">
                    {item.achievements.map((ach, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-accent-cyan flex-shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies used */}
                <div className="pt-3 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-wrap items-center justify-between gap-3">
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
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Internship Proof</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
