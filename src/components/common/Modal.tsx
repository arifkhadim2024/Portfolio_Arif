import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '3xl',
}) => {
  // ESC key listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Content Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full ${maxWidthStyles[maxWidth]} my-8 rounded-3xl bg-[#F2F1ED] dark:bg-[#141414] text-[#111111] dark:text-[#F2F1ED] border border-black/15 dark:border-white/15 shadow-2xl overflow-hidden z-10`}
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-black/10 dark:border-white/10">
                <h3 className="text-xl font-bold font-display uppercase tracking-tight text-[#111111] dark:text-[#F2F1ED]">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-[#666666] hover:text-[#111111] dark:text-[#888888] dark:hover:text-[#F2F1ED] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#111111]/80 text-[#F2F1ED] hover:bg-[#111111] border border-white/20 backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Body */}
            <div className="p-6 sm:p-8 max-h-[82vh] overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
