import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'cyan' | 'emerald' | 'violet' | 'amber' | 'neutral';
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
    primary: 'bg-primary-500/10 text-primary-400 border-primary-500/25 hover:bg-primary-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25 hover:bg-cyan-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20',
    violet: 'bg-purple-500/10 text-purple-400 border-purple-500/25 hover:bg-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25 hover:bg-amber-500/20',
    neutral: 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs sm:text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
