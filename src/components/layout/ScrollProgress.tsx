import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const ScrollProgress: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary-500 via-accent-cyan to-accent-emerald transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
