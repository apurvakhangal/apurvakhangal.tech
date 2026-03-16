import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HeroLogo } from './HeroLogo';

export function ScrollLogo() {
  const { scrollY } = useScroll();
  
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate dynamic start and end positions
  // HeroLogo is now 200x200 (md) or 280x280 (lg)
  
  const isMobile = dimensions.width < 768;
  const boxHeight = isMobile ? 200 : 280; // Match the physical height of the logo
  
  // Initial state: Bottom left corner
  const initialX = isMobile ? 20 : 80;
  const initialY = dimensions.height - boxHeight - (isMobile ? 30 : 60);
  
  // Final state docks directly inside the floating rounded Navbar
  const finalX = isMobile ? 36 : 124; 
  const finalY = isMobile ? 34 : 37; 

  // Animation values - HeroLogo is now smaller, so scale to navbar needs adjustment
  const finalScale = isMobile ? 0.28 : 0.2; // Scale down 200/280px logo to navbar size (~56px)
  const scale = useTransform(scrollY, [0, 400], [1, finalScale], { clamp: true });
  const y = useTransform(scrollY, [0, 400], [initialY, finalY], { clamp: true });
  const x = useTransform(scrollY, [0, 400], [initialX, finalX], { clamp: true });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        scale,
        transformOrigin: 'top left',
        zIndex: 60,
        willChange: 'transform',
      }}
      className="pointer-events-auto cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <HeroLogo />
    </motion.div>
  );
}