import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow' | 'gold';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  href,
  target,
  rel,
  download,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-500/40 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs sm:text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm sm:text-base gap-2",
    lg: "px-7 py-3.5 text-base sm:text-lg gap-2.5",
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-gold-700 via-gold-500 to-gold-400 text-[#070709] font-bold shadow-lg shadow-gold-950/40 border border-gold-300/60 hover:shadow-gold-500/30 hover:brightness-110 active:scale-[0.98]",
    glow: "bg-gold-500 text-[#070709] font-bold shadow-glow-gold hover:bg-gold-400 hover:shadow-gold-400/60 border border-gold-300/70 active:scale-[0.98]",
    gold: "bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300 text-[#030304] font-bold shadow-lg shadow-gold-950/50 border border-gold-200/80 hover:brightness-110 active:scale-[0.98]",
    secondary: "bg-[#0B0A0E]/90 hover:bg-[#131118] text-[#FFF8E7] border border-gold-500/30 hover:border-gold-400/60 shadow-md active:scale-[0.98] backdrop-blur-md",
    outline: "bg-transparent hover:bg-gold-500/10 text-[#FFF8E7] border border-gold-500/30 hover:border-gold-400/70 active:scale-[0.98]",
    ghost: "bg-transparent hover:bg-gold-500/10 text-slate-300 hover:text-[#FFF8E7] active:scale-[0.98]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        download={download}
        className={combinedClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={combinedClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </motion.button>
  );
};
