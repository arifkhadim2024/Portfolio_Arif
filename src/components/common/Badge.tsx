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
    primary: 'bg-[#B9A16B]/15 text-[#F2F0EA] border-[#B9A16B]/30 hover:bg-[#B9A16B]/25',
    gold: 'bg-[#B9A16B]/15 text-[#E8E6E0] border-[#B9A16B]/35 hover:bg-[#B9A16B]/25',
    champagne: 'bg-[#161616] text-[#E8E6E0] border-[#B9A16B]/20 hover:bg-[#222222]',
    amber: 'bg-[#161616] text-[#B9A16B] border-[#B9A16B]/25 hover:bg-[#222222]',
    // Backwards-compatible mappings for old variants
    violet: 'bg-[#B9A16B]/15 text-[#F2F0EA] border-[#B9A16B]/30 hover:bg-[#B9A16B]/25',
    magenta: 'bg-[#B9A16B]/15 text-[#F2F0EA] border-[#B9A16B]/30 hover:bg-[#B9A16B]/25',
    plum: 'bg-[#161616] text-[#E8E6E0] border-[#B9A16B]/20 hover:bg-[#222222]',
    cyan: 'bg-[#B9A16B]/15 text-[#F2F0EA] border-[#B9A16B]/30 hover:bg-[#B9A16B]/25',
    emerald: 'bg-[#161616] text-[#E8E6E0] border-[#B9A16B]/20 hover:bg-[#222222]',
    neutral: 'bg-[#161616] text-slate-300 border-[#B9A16B]/15 hover:bg-[#222222] hover:text-[#F2F0EA]',
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
