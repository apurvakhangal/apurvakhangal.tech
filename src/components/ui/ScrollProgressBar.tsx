import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ScrollProgressBar({ progress }: { progress: number }) {
  const { scrollY } = useScroll();
  const [winHeight, setWinHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    const handleResize = () => setWinHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sections = ["Hero", "About", "Projects", "Skills", "Footer"];

  // Travel distance needed for the progress bar to scroll from bottom of the screen up to top: 110px
  const scrollDistance = Math.max(winHeight - 150, 1);

  // Animate the Y coordinate so it acts natively anchored to the bottom of the hero section,
  // then sticks to the navbar when it hits position 110px from the top.
  const y = useTransform(scrollY, [0, scrollDistance], [winHeight - 40, 110], { clamp: true });

  // Initial State: "SCROLL DOWN" & crosshairs visible, fades out as it begins docking
  const initialOpacity = useTransform(scrollY, [0, scrollDistance * 0.3], [1, 0], { clamp: true });
  
  // Docked State: Progress bar numbers & glowing dot fade in when fully docked
  const progressOpacity = useTransform(scrollY, [scrollDistance * 0.6, scrollDistance], [0, 1], { clamp: true });

  return (
    <motion.div
      style={{ y }}
      className="fixed top-0 left-0 w-full px-4 md:px-24 z-40 pointer-events-none"
    >
      <div className="relative w-full h-[40px] flex items-center">
        {/* The consistent dotted line spanning the width */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[10px] right-[10px] h-[1px] border-t border-dashed border-white/30" />

        {/* INITIAL STATE: Crosshairs & Scroll Down centered block */}
        <motion.div
          style={{ opacity: initialOpacity }}
          className="absolute left-0 right-0 flex justify-between items-center w-full h-full px-[10px]"
        >
          {/* Fake Background Crosshairs (+) loosely aligned with the line */}
          <div className="flex justify-between w-full opacity-30 select-none">
            {sections.map((_, idx) => (
              <span key={`cross-${idx}`} className="text-white text-sm font-mono leading-none">+</span>
            ))}
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center bg-[#111625] px-4 pointer-events-auto">
            <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">Scroll Down</span>
          </div>
        </motion.div>

        {/* DOCKED STATE: Progress Numbers & Glowing Dot Tracker */}
        <motion.div
          style={{ opacity: progressOpacity }}
          className="absolute left-0 right-0 w-full h-full"
        >
          {/* Section markers */}
          <div className="absolute left-0 right-0 flex justify-between w-full items-center h-full">
            {sections.map((section, idx) => (
               <div key={section} className="flex flex-col items-center justify-center bg-[#111625] px-3">
                 <span className="text-[12px] font-mono text-white/50 tracking-widest">{`0${idx + 1}`}</span>
               </div>
            ))}
          </div>

          {/* Following glowing dot */}
          <motion.div
             className="absolute top-[13px] z-10"
             initial={{ left: '0%' }}
             animate={{ left: `${progress * 100}%` }}
             transition={{ ease: 'linear', duration: 0.1 }}
             style={{ x: '-50%' }}
          >
            <div className="w-[14px] h-[14px] rounded-full" style={{
               background: 'linear-gradient(135deg, #60a5fa, #a855f7, #ec4899)',
               boxShadow: '0 0 12px 2px rgba(168,85,247,0.7)'
            }} />
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
}