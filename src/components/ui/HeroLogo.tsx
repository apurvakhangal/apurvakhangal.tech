import { motion, useScroll, useTransform } from 'framer-motion';

export function HeroLogo() {
  const { scrollYProgress } = useScroll();
  
  // Animation values
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.35]);
  const y = useTransform(scrollYProgress, [0, 0.15], [0, -120]);
  const x = useTransform(scrollYProgress, [0, 0.15], [0, -140]);

  return (
    <motion.div 
      style={{
        scale,
        x,
        y,
        transformOrigin: 'left center',
      }}
      className="relative z-40 mb-8 cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <img 
        src="/logo.svg" 
        alt="Apurva Khangal Logo" 
        className="w-[120px] md:w-[150px] lg:w-[180px] object-contain drop-shadow-[0_0_25px_rgba(96,165,250,0.25)]" 
      />
    </motion.div>
  );
}