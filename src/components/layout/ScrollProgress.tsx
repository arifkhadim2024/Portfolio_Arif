import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const ScrollProgress: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-amber-300 transition-all duration-100 ease-out shadow-[0_0_8px_rgba(212,175,55,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
