import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMindState } from '@/contexts/MindStateContext';

interface EntryPortalProps {
  scrollProgress: number;
}

export function EntryPortal({ scrollProgress }: EntryPortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { colors } = useMindState();

  // Fade out as user scrolls past entry
  const opacity = Math.max(0, 1 - scrollProgress / 0.15);
  const scale = 0.9 + scrollProgress * 0.1;

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create particle elements
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'entry-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.6);
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 ${Math.random() * 12 + 8}px rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.8);
      `;
      
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const endX = window.innerWidth / 2;
      const endY = window.innerHeight / 2;
      const duration = Math.random() * 4 + 3;
      const delay = Math.random() * 2;

      particle.animate([
        { 
          left: startX + 'px', 
          top: startY + 'px',
          opacity: 0,
          transform: 'scale(0)'
        },
        { 
          left: endX + 'px', 
          top: endY + 'px',
          opacity: 1,
          transform: 'scale(1)'
        }
      ], {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });

      containerRef.current?.appendChild(particle);
    }
  }, [colors.primary]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, transform: `scale(${scale})`, zIndex: 5 }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      >
        <motion.p
          className="text-xs tracking-[0.4em] uppercase mb-8"
          style={{ color: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1, duration: 2 }}
        >
          Enter
        </motion.p>
        
        <motion.h1
          className="text-6xl md:text-8xl font-thin tracking-tight leading-tight"
          style={{ color: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})` }}
          initial={{ opacity: 0, blur: '10px' }}
          animate={{ opacity: 1, blur: '0px' }}
          transition={{ delay: 1.2, duration: 2.5 }}
        >
          A Thinking<br />System
        </motion.h1>

        <motion.p
          className="text-xs tracking-[0.3em] uppercase mt-8 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2, duration: 2 }}
        >
          Scroll to explore
        </motion.p>
      </motion.div>
    </div>
  );
}
