import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
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
  magnetic?: boolean;
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
  magnetic = true,
  ...props
}) => {
  const elementRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  // Magnetic Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 18, stiffness: 220, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!magnetic || !elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.25;
    const deltaY = (e.clientY - centerY) * 0.25;
    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handlePointerLeave = () => {
    if (!magnetic) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const baseStyles = "relative inline-flex items-center justify-center font-mono font-medium tracking-wider uppercase transition-colors duration-200 select-none cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-[11px] gap-1.5 rounded-lg",
    md: "px-5 py-2.5 text-xs gap-2 rounded-xl",
    lg: "px-6 py-3.5 text-xs sm:text-sm gap-2.5 rounded-xl",
  };

  const variantStyles = {
    primary: "bg-[#111111] text-[#F2F1ED] border border-[#111111] hover:bg-neutral-800 dark:bg-[#F2F1ED] dark:text-[#111111] dark:border-[#F2F1ED] dark:hover:bg-neutral-200 shadow-sm",
    glow: "bg-[#111111] text-[#F2F1ED] border border-[#111111] hover:bg-neutral-800 dark:bg-[#F2F1ED] dark:text-[#111111] dark:border-[#F2F1ED] shadow-sm",
    gold: "bg-[#111111] text-[#F2F1ED] border border-[#111111] hover:bg-neutral-800 dark:bg-[#F2F1ED] dark:text-[#111111] dark:border-[#F2F1ED] shadow-sm",
    secondary: "bg-transparent text-[#111111] border border-black/20 hover:border-black hover:bg-[#111111] hover:text-[#F2F1ED] dark:text-[#F2F1ED] dark:border-white/20 dark:hover:border-white dark:hover:bg-[#F2F1ED] dark:hover:text-[#111111]",
    outline: "bg-transparent text-[#111111] border border-black/20 hover:border-black hover:bg-[#111111] hover:text-[#F2F1ED] dark:text-[#F2F1ED] dark:border-white/20 dark:hover:border-white dark:hover:bg-[#F2F1ED] dark:hover:text-[#111111]",
    ghost: "bg-transparent text-[#111111] hover:text-[#666666] dark:text-[#F2F1ED] dark:hover:text-[#999999]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <motion.a
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        download={download}
        style={{ x: smoothX, y: smoothY }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={combinedClasses}
        whileTap={{ scale: 0.98 }}
      >
        {icon && iconPosition === 'left' && <span className="flex-shrink-0 transition-transform group-hover:-translate-x-0.5">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="flex-shrink-0 transition-transform group-hover:translate-x-0.5">{icon}</span>}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      style={{ x: smoothX, y: smoothY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={combinedClasses}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0 transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0 transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </motion.button>
  );
};
