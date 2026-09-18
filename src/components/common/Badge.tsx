import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'violet' | 'magenta' | 'plum' | 'gold' | 'amber' | 'cyan' | 'emerald' | 'neutral';
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
    primary: 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20',
    violet: 'bg-violet-500/10 text-violet-300 border-violet-500/30 hover:bg-violet-500/20',
    magenta: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30 hover:bg-fuchsia-500/20',
    plum: 'bg-pink-500/10 text-pink-300 border-pink-500/30 hover:bg-pink-500/20',
    gold: 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20',
    // Backwards-compatible mappings to luxury palette
    cyan: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30 hover:bg-fuchsia-500/20',
    emerald: 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20',
    neutral: 'bg-[#13111C]/90 text-slate-300 border-white/10 hover:bg-[#1A1726] hover:text-[#FDFBF7]',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs font-mono',
    md: 'px-3 py-1 text-xs sm:text-sm font-mono',
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
