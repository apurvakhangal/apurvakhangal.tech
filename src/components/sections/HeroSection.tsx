import { motion } from 'framer-motion';
import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { HeroLogo } from '@/components/ui/HeroLogo';

interface HeroSectionProps {
  progress: number;
  showLogo?: boolean;
}

const ROLES = ['Developer', 'UI/UX Designer', 'ML Enthusiast'] as const;

// Stable animation variants — declared outside component to avoid recreation
const leftVariant = { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } };
const rightVariant = { initial: { opacity: 0, x: 100, filter: 'blur(8px)' }, animate: { opacity: 1, x: 0, filter: 'blur(0px)' } };
const badgeVariant = { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 } };
const descVariant = { initial: { opacity: 0 }, animate: { opacity: 1 } };
const glowRest = { opacity: 0.2, boxShadow: '0 0 30px rgba(96, 165, 250, 0.3)' };
const glowHover = { opacity: 0.6, boxShadow: '0 0 60px rgba(96, 165, 250, 0.8), 0 0 100px rgba(168, 85, 247, 0.5)' };
const floatAnimation = { y: [0, -10, 0] };
const floatTransition = { duration: 4, repeat: Infinity, ease: 'easeInOut' as const };

export const HeroSection = memo(function HeroSection({ progress, showLogo = true }: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Use refs for tilt to avoid re-renders on every mouse move
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef({ rotateX: 0, rotateY: 0 });

  // Cycle roles every 3 s
  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Mouse tilt — write directly to the motion values via DOM ref trick
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = imageWrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const distX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const distY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    tiltRef.current = { rotateX: distY * -10, rotateY: distX * 10 };
    // Apply directly to the inner tilt div without a React state update
    const inner = el.querySelector<HTMLDivElement>('[data-tilt-inner]');
    if (inner) {
      inner.style.transform = `rotateX(${tiltRef.current.rotateX}deg) rotateY(${tiltRef.current.rotateY}deg)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    tiltRef.current = { rotateX: 0, rotateY: 0 };
    const inner = imageWrapperRef.current?.querySelector<HTMLDivElement>('[data-tilt-inner]');
    if (inner) {
      inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const translateY = progress * 20;

  return (
    <section className="relative px-12 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-4 items-center">

          {/* LEFT — Logo & Text */}
          <motion.div
            {...leftVariant}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col space-y-3 max-w-[640px]"
            style={{ translateY }}
          >
            {showLogo && <HeroLogo />}

            {/* Status badge */}
            <motion.div
              {...badgeVariant}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs font-mono text-emerald-400/80 tracking-widest uppercase">Available for opportunities</span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-semibold text-white leading-[1.08] tracking-tight">
              Hello,<br />I'm Apurva Khangal
            </h1>

            {/* Animated role */}
            <div className="h-8 flex items-center gap-1.5">
              <span className="text-blue-400/50 font-mono text-lg">›</span>
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-lg font-mono text-blue-400"
              >
                {ROLES[roleIndex]}
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              {...descVariant}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/60 leading-relaxed text-base max-w-md"
            >
              Developer working at the intersection of technology and creativity — building things that are not just functional, but meaningful.
            </motion.p>

            {/* Social links */}
            <motion.div
              {...descVariant}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <a href="https://github.com/apurvakhangal" target="_blank" rel="noopener noreferrer"
                className="text-xs font-mono text-white/40 hover:text-white/80 transition-colors tracking-widest uppercase">GitHub ↗</a>
              <span className="w-px h-3 bg-white/20" />
              <a href="https://linkedin.com/in/apurvakhangal" target="_blank" rel="noopener noreferrer"
                className="text-xs font-mono text-white/40 hover:text-white/80 transition-colors tracking-widest uppercase">LinkedIn ↗</a>
            </motion.div>
          </motion.div>

          {/* RIGHT — Profile Image */}
          <motion.div
            ref={imageWrapperRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...rightVariant}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ translateY, perspective: '1000px' }}
            className="flex justify-center items-center"
          >
            {/* Inner tilt wrapper — mutated via DOM, not React state */}
            <motion.div
              animate={{
                scale: isHovered ? 1.08 : 1,
                ...floatAnimation,
              }}
              transition={{
                scale: { duration: 0.4, type: 'spring', stiffness: 100 },
                ...floatTransition,
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative w-[280px] md:w-[320px] lg:w-[380px] h-auto max-w-[90%]"
            >
              {/* Inner tilt element — manipulated directly via querySelector */}
              <div
                data-tilt-inner
                style={{ transition: 'transform 0.1s ease-out', transformStyle: 'preserve-3d' }}
              >
                {/* Glow background */}
                <motion.div
                  className="absolute -inset-4 rounded-2xl z-0"
                  animate={isHovered ? glowHover : glowRest}
                  transition={{ duration: 0.4 }}
                />

                {/* Image 1 — default */}
                <motion.img
                  src="/1.png"
                  alt="Profile showcase 1"
                  animate={{ opacity: isHovered ? 0 : 1 }}
                  transition={{ duration: 0.35 }}
                  className="relative w-full h-auto object-cover rounded-xl z-10"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(96,165,250,0.2)' }}
                />

                {/* Image 2 — hover */}
                <motion.img
                  src="/2.png"
                  alt="Profile showcase 2"
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 w-full h-auto object-cover rounded-xl z-20"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(168,85,247,0.3)' }}
                />

                {/* Neural particle indicator */}
                <motion.div
                  className="absolute -top-6 -right-6 w-8 h-8 rounded-full border border-cyan-400/50 z-30"
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                    opacity: isHovered ? 0.8 : 0.4,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ boxShadow: isHovered ? '0 0 15px rgba(34,211,238,0.6)' : 'none' }}
                />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});