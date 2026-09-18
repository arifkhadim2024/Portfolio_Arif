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
  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/40 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs sm:text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm sm:text-base gap-2",
    lg: "px-7 py-3.5 text-base sm:text-lg gap-2.5",
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-purple-700 via-purple-600 to-fuchsia-600 text-[#FDFBF7] shadow-lg shadow-purple-900/40 border border-purple-400/30 hover:shadow-purple-700/50 hover:border-purple-300/60 hover:brightness-110 active:scale-[0.98]",
    glow: "bg-purple-600 text-[#FDFBF7] shadow-glow-primary hover:bg-purple-700 hover:shadow-purple-500/50 border border-purple-400/40 active:scale-[0.98]",
    gold: "bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-[#070709] font-bold shadow-lg shadow-amber-900/30 border border-amber-300/50 hover:brightness-110 active:scale-[0.98]",
    secondary: "bg-[#0D0C12]/90 hover:bg-[#161421] text-[#FDFBF7] border border-purple-500/25 hover:border-purple-400/50 shadow-md active:scale-[0.98] backdrop-blur-md",
    outline: "bg-transparent hover:bg-purple-500/10 text-[#FDFBF7] border border-purple-500/30 hover:border-purple-400/60 active:scale-[0.98]",
    ghost: "bg-transparent hover:bg-purple-500/10 text-slate-300 hover:text-[#FDFBF7] active:scale-[0.98]",
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
