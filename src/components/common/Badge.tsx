import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'violet' | 'magenta' | 'plum' | 'gold' | 'amber' | 'cyan' | 'emerald' | 'champagne' | 'neutral';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
}) => {
  const variantStyles = {
    primary: 'bg-black/[0.04] text-[#111111] border-black/15 dark:bg-white/[0.06] dark:text-[#F2F1ED] dark:border-white/15',
    gold: 'bg-black/[0.04] text-[#111111] border-black/15 dark:bg-white/[0.06] dark:text-[#F2F1ED] dark:border-white/15',
    champagne: 'bg-black/[0.03] text-[#444444] border-black/10 dark:bg-white/[0.04] dark:text-[#CCCCCC] dark:border-white/10',
    amber: 'bg-black/[0.04] text-[#111111] border-black/15 dark:bg-white/[0.06] dark:text-[#F2F1ED] dark:border-white/15',
    violet: 'bg-black/[0.04] text-[#111111] border-black/15 dark:bg-white/[0.06] dark:text-[#F2F1ED] dark:border-white/15',
    magenta: 'bg-black/[0.04] text-[#111111] border-black/15 dark:bg-white/[0.06] dark:text-[#F2F1ED] dark:border-white/15',
    plum: 'bg-black/[0.04] text-[#111111] border-black/15 dark:bg-white/[0.06] dark:text-[#F2F1ED] dark:border-white/15',
    cyan: 'bg-black/[0.04] text-[#111111] border-black/15 dark:bg-white/[0.06] dark:text-[#F2F1ED] dark:border-white/15',
    emerald: 'bg-black/[0.04] text-[#111111] border-black/15 dark:bg-white/[0.06] dark:text-[#F2F1ED] dark:border-white/15',
    neutral: 'bg-black/[0.03] text-[#555555] border-black/10 dark:bg-white/[0.04] dark:text-[#AAAAAA] dark:border-white/10',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider',
    md: 'px-3 py-1 text-xs font-mono uppercase tracking-wider',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
