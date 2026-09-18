import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-widest uppercase mb-4 bg-purple-950/70 text-purple-300 border border-purple-500/30 backdrop-blur-md shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
          {badge}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#FDFBF7] dark:text-[#FDFBF7] light:text-slate-900"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-normal"
        >
          {subtitle}
        </motion.p>
      )}

      <div className={`mt-5 flex items-center gap-1.5 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-amber-400" />
        <div className="h-0.5 w-2 rounded-full bg-accent-gold" />
      </div>
    </div>
  );
};
