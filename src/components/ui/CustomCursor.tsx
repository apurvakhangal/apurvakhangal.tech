import { useEffect, useState, useRef } from 'react';

export function CustomCursor({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const [rawPos, setRawPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isInteractive, setIsInteractive] = useState(false);
  const requestRef = useRef<number>();
  
  // Use refs to avoid dependency cycle in requestAnimationFrame
  const currentPos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Update actual immediate position
      setRawPos({ x: e.clientX, y: e.clientY });
      currentPos.current = { x: e.clientX, y: e.clientY };
      
      // If we just entered the screen, snap the trail to the cursor
      if (trailPos.current.x === -100) {
        trailPos.current = { x: e.clientX, y: e.clientY };
        setTrailingPos({ x: e.clientX, y: e.clientY });
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        setIsInteractive(true);
      } else {
        setIsInteractive(false);
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    // Smooth trailing animation loop
    const animateTrail = () => {
      // Lerp (linear interpolation) formula for smooth following
      // the lower the factor (0.15), the smoother/slower the follow
      trailPos.current.x += (currentPos.current.x - trailPos.current.x) * 0.15;
      trailPos.current.y += (currentPos.current.y - trailPos.current.y) * 0.15;
      
      setTrailingPos({ x: trailPos.current.x, y: trailPos.current.y });
      requestRef.current = requestAnimationFrame(animateTrail);
    };
    
    requestRef.current = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Trailing Outer Ring */}
      <div
        className="fixed pointer-events-none rounded-full transition-all duration-300 ease-out z-[9998]"
        style={{
          left: trailingPos.x,
          top: trailingPos.y,
          transform: `translate(-50%, -50%) scale(${isInteractive ? 1.5 : 1})`,
          width: '50px',
          height: '50px',
          border: '1.5px solid rgba(255, 255, 255, 0.4)',
          backgroundColor: isInteractive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)',
        }}
      />
      {/* Immediate small center dot */}
      <div
        className="fixed pointer-events-none rounded-full z-[9999]"
        style={{
          left: rawPos.x,
          top: rawPos.y,
          transform: 'translate(-50%, -50%)',
          width: '8px',
          height: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
          opacity: isInteractive ? 0 : 1,
          transition: 'opacity 0.2s',
        }}
      />
    </>
  );
}
