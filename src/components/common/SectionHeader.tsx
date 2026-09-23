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
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-16 md:mb-24 ${isCenter ? 'text-center mx-auto max-w-4xl' : 'max-w-5xl'} ${className}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-4 text-xs font-mono font-medium tracking-widest uppercase text-[#888888] dark:text-[#777777]"
        >
          <span>[ {badge} ]</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[#111111] dark:text-[#F2F1ED] leading-[0.92] uppercase font-display"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#666666] dark:text-[#999999] leading-relaxed font-normal max-w-2xl font-body"
        >
          {subtitle}
        </motion.p>
      )}

      <div className={`mt-8 md:mt-12 w-full border-b border-black/10 dark:border-white/10`} />
    </div>
  );
};
