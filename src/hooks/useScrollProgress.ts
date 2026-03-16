import { useState, useEffect, useRef, useCallback } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far the user has scrolled down natively
      const scrollTop = window.scrollY;
      // Calculate the maximum possible scroll amount
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll > 0) {
        setProgress(scrollTop / maxScroll);
      } else {
        setProgress(0);
      }
    };

    // Attach native scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial run
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { progress };
}
