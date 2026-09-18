import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface GlowingCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'primary' | 'violet' | 'magenta' | 'gold' | 'plum' | 'cyan' | 'emerald';
  bordered?: boolean;
}

export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  className = '',
  glowColor = 'primary',
  bordered = true,
  ...props
}) => {
  const glowGradients: Record<string, string> = {
    primary: 'from-primary-500/10 via-transparent to-transparent',
    violet: 'from-primary-500/10 via-transparent to-transparent',
    magenta: 'from-fuchsia-500/10 via-transparent to-transparent',
    gold: 'from-amber-500/10 via-transparent to-transparent',
    plum: 'from-purple-900/15 via-transparent to-transparent',
    cyan: 'from-fuchsia-500/10 via-transparent to-transparent',
    emerald: 'from-amber-500/10 via-transparent to-transparent',
  };

  return (
    <motion.div
      className={`relative group rounded-2xl bg-dark-card/90 dark:bg-dark-card/90 light:bg-white/95 backdrop-blur-xl ${
        bordered ? 'border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200' : ''
      } transition-all duration-300 hover:border-slate-700/90 dark:hover:border-slate-700/90 light:hover:border-slate-300 hover:shadow-xl ${className}`}
      {...props}
    >
      {/* Subtle top inner gradient */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${glowGradients[glowColor]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
