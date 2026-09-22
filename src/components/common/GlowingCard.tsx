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
  glowColor = 'gold',
  bordered = true,
  ...props
}) => {
  const glowGradients: Record<string, string> = {
    primary: 'from-gold-500/15 via-transparent to-transparent',
    gold: 'from-gold-500/15 via-transparent to-transparent',
    amber: 'from-amber-500/15 via-transparent to-transparent',
    violet: 'from-gold-500/15 via-transparent to-transparent',
    magenta: 'from-gold-500/15 via-transparent to-transparent',
    plum: 'from-gold-600/15 via-transparent to-transparent',
    cyan: 'from-gold-500/15 via-transparent to-transparent',
    emerald: 'from-amber-500/15 via-transparent to-transparent',
  };

  return (
    <motion.div
      className={`relative group rounded-2xl bg-dark-card/90 dark:bg-dark-card/90 light:bg-white/95 backdrop-blur-xl ${
        bordered ? 'border border-gold-500/15 dark:border-gold-500/15 light:border-slate-200' : ''
      } transition-all duration-300 hover:border-gold-500/40 dark:hover:border-gold-500/40 light:hover:border-gold-300 hover:shadow-xl hover:shadow-gold-950/40 ${className}`}
      {...props}
    >
      {/* Subtle top inner gold gradient */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${glowGradients[glowColor] || glowGradients.gold} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
