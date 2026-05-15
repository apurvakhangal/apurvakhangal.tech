import { useCallback, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NeuralScene } from '@/components/neural/NeuralScene';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { GlowCursorTrail } from '@/components/ui/GlowCursorTrail';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { Navbar } from '@/components/ui/Navbar';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';

// Import newly created sections
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { Footer } from '@/components/sections/Footer';

function NeuralExperience() {
  const { progress } = useScrollProgress();
  const { scrollY } = useScroll();
  const mousePositionRef = useRef({ x: 0, y: 0 });
  
  // Overlay opacity matches navbar background appearance
  const overlayOpacity = useTransform(scrollY, [200, 400], [0, 1], { clamp: true });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePositionRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mousePositionRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Infinite scroll loop - detect when duplicate hero appears and reset scroll
  useEffect(() => {
    const loopHero = document.getElementById('hero-loop');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset scroll to top instantly when duplicate hero becomes visible
            window.scrollTo({
              top: 0,
              behavior: 'instant'
            });
          }
        });
      },
      {
        threshold: 0.6
      }
    );

    if (loopHero) {
      observer.observe(loopHero);
    }

    return () => observer.disconnect();
  }, []);

    return (
    <div className="flex flex-col w-full">
      <CustomCursor />
      <GlowCursorTrail />
      <Navbar />
      <ScrollProgressBar progress={progress} />
      
      {/* Container for NeuralScene that stays fixed in background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralScene scrollProgress={progress} mousePosition={mousePositionRef.current} />
      </div>
      
      {/* Content Mask Overlay - prevents content from appearing above navbar/progress area */}
      <motion.div 
        style={{ opacity: overlayOpacity }}
        className="fixed top-0 left-0 right-0 h-[160px] z-30 pointer-events-none bg-[#111625]" 
      />
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full mt-[160px]">
        {/* Native scrollable layout */}
        <main className="flex flex-col">
          <HeroSection progress={progress} />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
        </main>
      </div>
      
      {/* Footer - absolute end of page */}
      <Footer />

      {/* Infinite scroll loop - duplicate hero section */}
      <div id="hero-loop" className="relative z-10 w-full">
        <HeroSection progress={progress} showLogo={false} />
      </div>
    </div>
  );
}

const Index = () => {
  return (
    <NeuralExperience />
  );
};

export default Index;
