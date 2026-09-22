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
      'ALIGNING MAGNETIC CORE',
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
          }, 250);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 18) + 12;
        const boundedNext = Math.min(next, 100);

        if (boundedNext > 75) setStatusText(statuses[3]);
        else if (boundedNext > 50) setStatusText(statuses[2]);
        else if (boundedNext > 25) setStatusText(statuses[1]);

        return boundedNext;
      });
    }, 65);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] text-[#F2F0EA] select-none"
        >
          {/* Ambient center pulse */}
          <div className="absolute w-96 h-96 rounded-full bg-[#B9A16B]/5 blur-[140px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 space-y-6">
            {/* Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#B9A16B] via-[#222222] to-[#B9A16B]/60 p-0.5 shadow-2xl shadow-black/90"
            >
              <div className="w-full h-full rounded-[14px] bg-[#080808] flex items-center justify-center">
                <span className="text-xl font-black tracking-wider bg-gradient-to-r from-[#F2F0EA] via-[#E8E6E0] to-[#B9A16B] bg-clip-text text-transparent font-mono">
                  AK
                </span>
              </div>
            </motion.div>

            {/* Name Heading */}
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-2xl font-black tracking-widest uppercase text-gradient-editorial font-display">
                Arif Mohammed Khadim
              </h2>
              <p className="text-[11px] font-mono tracking-widest text-[#B9A16B] uppercase">
                Software & AI Engineer • Editorial Edition
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full space-y-2">
              <div className="h-1 w-full bg-[#161616] rounded-full overflow-hidden border border-[#B9A16B]/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#B9A16B] via-[#E8E6E0] to-[#B9A16B] shadow-[0_0_10px_#B9A16B]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B9A16B] animate-ping" />
                  {statusText}
                </span>
                <span className="text-[#B9A16B] font-bold">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
