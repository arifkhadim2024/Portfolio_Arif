import React from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../data/experience';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, ExternalLink } from 'lucide-react';
import { TiltCard } from '../components/visual/TiltCard';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 lg:py-32 relative bg-dark-bg/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Career Journey"
          title="Engineering Experience & Internships"
          subtitle="A chronicle of engineering internships, applied data science / ML pipelines, and collaborative web development."
        />

        {/* 3D Glowing Timeline Container */}
        <div className="relative border-l-2 border-primary-500/30 ml-4 sm:ml-8 space-y-14">
          {experienceData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Timeline Glowing Node */}
              <div className="absolute -left-[17px] top-3 w-8 h-8 rounded-full bg-[#05070B] border-2 border-primary-500 flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_16px_#6366F1] z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-ping" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan absolute" />
              </div>

              {/* 3D Experience Glass Card */}
              <TiltCard maxTilt={6} glareOpacity={0.25}>
                <div className="glass-card-3d p-6 sm:p-8 rounded-3xl space-y-5 border border-white/10 hover:border-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/15 transition-all">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white dark:text-white light:text-slate-900 flex items-center gap-2.5">
                        <Briefcase className="w-5 h-5 text-primary-400" />
                        <span>{item.role}</span>
                      </h3>
                      <div className="text-sm font-semibold text-primary-400 dark:text-primary-400 light:text-primary-600 mt-1">
                        {item.company}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-800/90 dark:bg-slate-800/90 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                        {item.startDate} — {item.endDate}
                      </span>
                      <Badge variant={item.type === 'Internship' ? 'cyan' : 'emerald'} size="sm">
                        {item.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Location & Summary */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.location}</span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* Key Contributions List */}
                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 light:text-slate-600">
                      Key Contributions & Engineering Impact
                    </h4>
                    <ul className="space-y-2">
                      {item.achievements.map((ach, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-accent-cyan flex-shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack & Proof Link */}
                  <div className="pt-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-wrap items-center justify-between gap-3">
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
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 hover:text-primary-300 transition-colors p-1"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Internship Proof</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
