import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING EDITORIAL SYSTEM');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const statuses = [
      'INITIALIZING EDITORIAL SYSTEM',
      'ALIGNING TYPOGRAPHIC GRID',
      'SYNTHESIZING 3D FERROFLUID',
      'EXPERIENCE READY'
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            onLoaded?.();
          }, 200);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 22) + 14;
        const boundedNext = Math.min(next, 100);

        if (boundedNext > 75) setStatusText(statuses[3]);
        else if (boundedNext > 50) setStatusText(statuses[2]);
        else if (boundedNext > 25) setStatusText(statuses[1]);

        return boundedNext;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F2F1ED] dark:bg-[#0E0E0E] text-[#111111] dark:text-[#F2F1ED] select-none"
        >
          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 space-y-6">
            {/* Monogram */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-12 h-12 rounded-xl border border-black/15 dark:border-white/15 flex items-center justify-center font-bold text-sm font-mono uppercase tracking-widest bg-white dark:bg-neutral-900 shadow-sm"
            >
              AK
            </motion.div>

            {/* Name Heading */}
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold tracking-tight uppercase font-display text-[#111111] dark:text-[#F2F1ED]">
                Arif Mohammed Khadim
              </h2>
              <p className="text-[11px] font-mono tracking-widest text-[#777777] uppercase">
                Software & AI Engineer • 2026
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full space-y-2">
              <div className="h-[2px] w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#111111] dark:bg-[#F2F1ED]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-[#777777]">
                <span>{statusText}</span>
                <span className="font-bold text-[#111111] dark:text-[#F2F1ED]">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
