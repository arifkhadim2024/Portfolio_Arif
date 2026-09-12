import React from 'react';

export const AmbientGlow: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Top Left Indigo Blob */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-600/15 rounded-full blur-[120px] animate-blob" />

      {/* Top Right Cyan Blob */}
      <div className="absolute top-20 -right-32 w-[28rem] h-[28rem] bg-accent-cyan/10 rounded-full blur-[140px] animate-blob [animation-delay:4s]" />

      {/* Center Subtle Violet Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-accent-violet/10 rounded-full blur-[160px] animate-blob [animation-delay:8s]" />
    </div>
  );
};
