import { useEffect, useRef } from 'react';

/**
 * CustomCursor — zero-React-state cursor implementation.
 *
 * All position updates go directly to the DOM via style.transform.
 * No useState → no React re-renders on mouse movement.
 * Uses requestAnimationFrame for smooth lerp on the trailing ring.
 * Uses translate3d() for GPU-composited positioning.
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let animFrameId: number;

    // Current raw cursor position (updated immediately on mousemove)
    let rawX = -100;
    let rawY = -100;

    // Trailing ring position (lerped each RAF)
    let trailX = -100;
    let trailY = -100;

    // Interactive-element state
    let interactive = false;

    const onMove = (e: MouseEvent) => {
      rawX = e.clientX;
      rawY = e.clientY;

      // Snap trail on first appearance
      if (trailX === -100) {
        trailX = rawX;
        trailY = rawY;
      }

      // Update dot immediately (no lerp needed for the precise dot)
      dot.style.transform = `translate3d(${rawX - 4}px, ${rawY - 4}px, 0)`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!(target.closest('a') || target.closest('button'));
      if (isInteractive !== interactive) {
        interactive = isInteractive;
        // Ring scale + fill
        ring.style.transform = `translate3d(${trailX - 25}px, ${trailY - 25}px, 0) scale(${interactive ? 1.5 : 1})`;
        ring.style.backgroundColor = interactive ? 'rgba(255,255,255,0.1)' : 'transparent';
        // Dot visibility
        dot.style.opacity = interactive ? '0' : '1';
      }
    };

    const animate = () => {
      // Lerp trail toward raw cursor
      trailX += (rawX - trailX) * 0.15;
      trailY += (rawY - trailY) * 0.15;

      ring.style.transform = `translate3d(${trailX - 25}px, ${trailY - 25}px, 0) scale(${interactive ? 1.5 : 1})`;

      animFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    animFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <>
      {/* Trailing outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full z-[9998]"
        style={{
          width: '50px',
          height: '50px',
          border: '1.5px solid rgba(255,255,255,0.4)',
          boxShadow: '0 0 15px rgba(255,255,255,0.1)',
          transition: 'background-color 0.2s, opacity 0.2s',
          willChange: 'transform',
        }}
      />
      {/* Immediate dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full z-[9999]"
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          boxShadow: '0 0 8px rgba(255,255,255,0.8)',
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
