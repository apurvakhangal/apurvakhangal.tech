import { useEffect, useRef, useState } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;

        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;

        if (nextProgress !== lastProgressRef.current) {
          lastProgressRef.current = nextProgress;
          setProgress(nextProgress);
        }
      });
    };

    // Attach native scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return { progress };
}
