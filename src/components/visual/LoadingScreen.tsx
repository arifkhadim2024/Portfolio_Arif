import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING NEURAL SYSTEM');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const statuses = [
      'INITIALIZING NEURAL SYSTEM',
      'ALIGNING MAGNETIC GEOMETRY',
      'SYNTHESIZING 3D FERROFLUID',
      'NEURAL SYSTEM READY'
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030304] text-[#FFF8E7] select-none"
        >
          {/* Ambient center pulse in subtle metallic gold */}
          <div className="absolute w-96 h-96 rounded-full bg-gold-500/10 blur-[130px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 space-y-6">
            {/* Monogram / Logo Mark with Gold rim */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-200 p-0.5 shadow-2xl shadow-gold-950/50"
            >
              <div className="w-full h-full rounded-[14px] bg-[#070709] flex items-center justify-center">
                <span className="text-xl font-black tracking-wider bg-gradient-to-r from-[#FFF8E7] via-gold-300 to-gold-500 bg-clip-text text-transparent font-mono">
                  AK
                </span>
              </div>
            </motion.div>

            {/* Name Heading */}
            <div className="text-center space-y-1">
              <h2 className="text-xl sm:text-2xl font-black tracking-widest uppercase text-gradient-cinematic">
                Arif Mohammed Khadim
              </h2>
              <p className="text-[11px] font-mono tracking-widest text-accent-gold uppercase">
                Software & AI Engineer • Deep Space Core
              </p>
            </div>

            {/* Futuristic Progress Bar */}
            <div className="w-full space-y-2">
              <div className="h-1 w-full bg-[#0B0A0E] rounded-full overflow-hidden border border-gold-500/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-700 via-gold-400 to-gold-200 shadow-[0_0_12px_#D4AF37]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-ping" />
                  {statusText}
                </span>
                <span className="text-gold-400 font-bold">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
