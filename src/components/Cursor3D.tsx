import React, { useRef, useState, useEffect } from 'react';

export type CursorMode = 'default' | 'link' | 'button' | 'project' | 'text';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const Cursor3D: React.FC = () => {
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Mouse position and smooth lerped ring position
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  // Detect touch and reduced motion
  const [isTouch, setIsTouch] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
  });

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaTouch = window.matchMedia('(pointer: coarse)');
    const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMedia = () => {
      setIsTouch(mediaTouch.matches || 'ontouchstart' in window);
      setReducedMotion(mediaMotion.matches);
    };

    mediaTouch.addEventListener('change', updateMedia);
    mediaMotion.addEventListener('change', updateMedia);

    return () => {
      mediaTouch.removeEventListener('change', updateMedia);
      mediaMotion.removeEventListener('change', updateMedia);
    };
  }, []);

  useEffect(() => {
    if (isTouch || reducedMotion) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Direct instant position for the 10px solid dot (0 lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Determine hover state from data-cursor attribute or semantic tag
      const target = e.target as HTMLElement | null;
      if (!target) {
        setCursorMode('default');
        return;
      }

      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const mode = cursorTarget.getAttribute('data-cursor') as CursorMode;
        setCursorMode(mode || 'link');
        return;
      }

      // Semantic element fallbacks
      if (target.closest('button, a, input, select, textarea, [role="button"], .footer_card')) {
        setCursorMode('link');
      } else if (target.closest('h1, h2, h3, h4, h5, p, span, li')) {
        setCursorMode('text');
      } else {
        setCursorMode('default');
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp animation loop for the outer ring
    const render = () => {
      // Lerp factor ~0.22 for a slight, silky smooth lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouch, reducedMotion, isVisible]);

  // Clean up old ripples automatically
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 350);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (isTouch || reducedMotion) {
    return null;
  }

  // Ring dimension & style based on active hover mode
  let ringSizeClasses = 'w-[32px] h-[32px] border-[1.5px] border-[#22D3EE]/80 bg-transparent';
  let showViewLabel = false;
  let isRingHidden = false;

  if (cursorMode === 'link' || cursorMode === 'button') {
    ringSizeClasses = 'w-[56px] h-[56px] border-[1.5px] border-[#F472B6]/90 bg-[#7C3AED]/15 shadow-[0_0_12px_rgba(124,58,237,0.25)]';
  } else if (cursorMode === 'project') {
    ringSizeClasses = 'w-[80px] h-[80px] border-[1.5px] border-[#22D3EE] bg-[#22D3EE]/15 shadow-[0_0_15px_rgba(34,211,238,0.3)]';
    showViewLabel = true;
  } else if (cursorMode === 'text') {
    isRingHidden = true;
    ringSizeClasses = 'w-0 h-0 border-0 opacity-0';
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Click Ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="absolute rounded-full border border-[#7C3AED] pointer-events-none animate-ping"
          style={{
            left: r.x,
            top: r.y,
            width: 36,
            height: 36,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 10px rgba(124, 58, 237, 0.6)',
          }}
        />
      ))}

      {/* Outer Smooth Lag Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none will-change-transform transition-[width,height,background-color,border-color,opacity,box-shadow] duration-250 ease-out ${ringSizeClasses} ${
          isRingHidden ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
        style={{
          boxSizing: 'border-box',
        }}
      >
        {showViewLabel && (
          <span className="text-[11px] font-mono font-bold tracking-widest text-white uppercase select-none animate-fadeIn">
            VIEW
          </span>
        )}
      </div>

      {/* Central Solid 10px Dot (Instant 0-Lag Positioning) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-[10px] h-[10px] rounded-full bg-[#7C3AED] pointer-events-none will-change-transform shadow-[0_0_10px_rgba(124,58,237,0.5)] transition-opacity duration-200 ${
          showViewLabel ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
