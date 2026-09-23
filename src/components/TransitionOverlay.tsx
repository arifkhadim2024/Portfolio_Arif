import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TransitionOverlayProps {
  isTransitioning: boolean;
  onTransitionComplete?: () => void;
}

export const TransitionOverlay: React.FC<TransitionOverlayProps> = ({
  isTransitioning,
  onTransitionComplete,
}) => {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTransitioning) {
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current];

      const tl = gsap.timeline({
        onComplete: () => {
          if (onTransitionComplete) onTransitionComplete();
        },
      });

      // 1. Wipe in from right to left
      tl.set(lines, { transformOrigin: 'right center', scaleX: 0 })
        .to(lines, {
          scaleX: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.inOut',
        })
        // 2. Wipe out to left
        .set(lines, { transformOrigin: 'left center' })
        .to(lines, {
          scaleX: 0,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.inOut',
          delay: 0.1,
        });

      return () => {
        tl.kill();
      };
    }
  }, [isTransitioning, onTransitionComplete]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] flex flex-col"
      aria-hidden="true"
    >
      <div
        ref={line1Ref}
        className="flex-1 w-full bg-[#212027] border-b border-[#FF4848]/20"
        style={{ transform: 'scaleX(0)', transformOrigin: 'right center' }}
      />
      <div
        ref={line2Ref}
        className="flex-1 w-full bg-[#1C1B22] border-b border-[#FF4848]/20"
        style={{ transform: 'scaleX(0)', transformOrigin: 'right center' }}
      />
      <div
        ref={line3Ref}
        className="flex-1 w-full bg-[#212027]"
        style={{ transform: 'scaleX(0)', transformOrigin: 'right center' }}
      />
    </div>
  );
};
