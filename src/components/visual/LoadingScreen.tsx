import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING ENVIRONMENT');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const statuses = [
      'INITIALIZING ENVIRONMENT',
      'CALIBRATING 3D CORES',
      'LOADING GRAPHICS PIPELINE',
      'SYSTEM READY'
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
    }, 70);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070B] text-white select-none"
        >
          {/* Ambient center pulse */}
          <div className="absolute w-96 h-96 rounded-full bg-primary-600/15 blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 space-y-6">
            {/* Monogram / Logo Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-600 via-accent-cyan to-accent-violet p-0.5 shadow-2xl shadow-primary-500/30"
            >
              <div className="w-full h-full rounded-[14px] bg-[#080B11] flex items-center justify-center">
                <span className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-mono">
                  AK
                </span>
              </div>
            </motion.div>

            {/* Name Heading */}
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-2xl font-black tracking-widest uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Arif Mohammed Khadim
              </h2>
              <p className="text-[11px] font-mono tracking-widest text-primary-400 uppercase">
                Software & AI Engineer
              </p>
            </div>

            {/* Futuristic Progress Bar */}
            <div className="w-full space-y-2">
              <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 via-accent-cyan to-accent-emerald shadow-[0_0_10px_#06B6D4]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
                  {statusText}
                </span>
                <span className="text-primary-300 font-bold">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
