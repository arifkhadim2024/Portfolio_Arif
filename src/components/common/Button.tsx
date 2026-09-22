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
  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B9A16B]/40 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs sm:text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm sm:text-base gap-2",
    lg: "px-7 py-3.5 text-base sm:text-lg gap-2.5",
  };

  const variantStyles = {
    primary: "bg-[#B9A16B] text-[#080808] font-bold shadow-lg shadow-black/70 border border-[#B9A16B] hover:bg-[#9E8652] hover:shadow-[#B9A16B]/20 active:scale-[0.98]",
    glow: "bg-[#B9A16B] text-[#080808] font-bold shadow-editorial-accent hover:bg-[#9E8652] border border-[#B9A16B] active:scale-[0.98]",
    gold: "bg-[#B9A16B] text-[#080808] font-bold shadow-lg shadow-black/70 border border-[#B9A16B] hover:bg-[#9E8652] active:scale-[0.98]",
    secondary: "bg-[#0F0F0F]/90 hover:bg-[#161616] text-[#F2F0EA] border border-[#B9A16B]/25 hover:border-[#B9A16B]/50 shadow-md active:scale-[0.98] backdrop-blur-md",
    outline: "bg-transparent hover:bg-[#B9A16B]/10 text-[#F2F0EA] border border-[#B9A16B]/25 hover:border-[#B9A16B]/60 active:scale-[0.98]",
    ghost: "bg-transparent hover:bg-[#B9A16B]/10 text-slate-300 hover:text-[#F2F0EA] active:scale-[0.98]",
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
