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
    primary: 'bg-gold-500/10 text-gold-300 border-gold-500/30 hover:bg-gold-500/20',
    gold: 'bg-gold-500/15 text-gold-300 border-gold-400/40 hover:bg-gold-500/25',
    champagne: 'bg-amber-100/10 text-[#F3E8CB] border-amber-200/30 hover:bg-amber-100/20',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20',
    // Backwards-compatible mappings for old variants
    violet: 'bg-gold-500/10 text-gold-300 border-gold-500/30 hover:bg-gold-500/20',
    magenta: 'bg-gold-500/15 text-gold-400 border-gold-400/40 hover:bg-gold-500/25',
    plum: 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20',
    cyan: 'bg-gold-500/10 text-gold-300 border-gold-500/30 hover:bg-gold-500/20',
    emerald: 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20',
    neutral: 'bg-[#0B0A0E]/90 text-slate-300 border-white/10 hover:bg-[#131118] hover:text-[#FFF8E7]',
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
