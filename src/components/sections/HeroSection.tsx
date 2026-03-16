import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { HeroLogo } from '@/components/ui/HeroLogo';

interface HeroSectionProps {
  progress: number;
  showLogo?: boolean;
}

export function HeroSection({ progress, showLogo = true }: HeroSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageTilt, setImageTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [roleIndex, setRoleIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  const roles = ['Developer', 'UI/UX Designer', 'ML Enthusiast'];

  // Cycle through roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse position for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) / rect.width;
    const distanceY = (e.clientY - centerY) / rect.height;

    setImageTilt({
      rotateY: distanceX * 10,
      rotateX: distanceY * -10,
    });
  };

  const handleMouseLeave = () => {
    setImageTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section className="relative px-12 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.6fr] gap-2 items-center">
        
{/* LEFT SIDE - Logo & Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col space-y-6 max-w-[640px]"
          style={{ translateY: progress * 20 }}
        >
          {/* Logo */}
          {showLogo && <HeroLogo />}

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
            Hello,<br />I'm Apurva Khangal
          </h1>

          {/* Animated Role Titles */}
          <div className="h-8">
            <motion.div
              key={roleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-mono text-blue-400"
            >
              {roles[roleIndex]}
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 leading-relaxed text-base"
          >
            Hi, I'm Apurva, a developer who enjoys turning ideas into meaningful digital experiences.
            I work at the intersection of technology and creativity, exploring code, design, and intelligent systems.
          </motion.p>
        </motion.div>

        {/* RIGHT SIDE - Profile Image */}
        <motion.div
          ref={imageRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseLeave();
          }}
          initial={{ opacity: 0, x: 100, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            translateY: progress * 20,
            perspective: '1000px',
          }}
          className="flex justify-end items-center"
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.08 : 1,
              y: [0, -10, 0],
            }}
            transition={{
              scale: { duration: 0.4, type: 'spring', stiffness: 100 },
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{
              rotateX: imageTilt.rotateX,
              rotateY: imageTilt.rotateY,
              transformStyle: 'preserve-3d',
            }}
            className="hero-image-wrapper relative w-[280px] md:w-[320px] lg:w-[380px] h-auto max-w-[90%]"
          >
            {/* Glow background */}
            <motion.div
              className="absolute -inset-4 rounded-2xl z-0"
              animate={{
                opacity: isHovered ? 0.6 : 0.2,
                boxShadow: isHovered
                  ? '0 0 60px rgba(96, 165, 250, 0.8), 0 0 100px rgba(168, 85, 247, 0.5)'
                  : '0 0 30px rgba(96, 165, 250, 0.3)',
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Image 1 - Default */}
            <motion.img
              src="/1.png"
              alt="Profile showcase 1"
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.35 }}
              className="relative w-full h-auto object-cover rounded-xl backdrop-blur-sm z-10"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(96, 165, 250, 0.2)',
              }}
            />

            {/* Image 2 - Hover */}
            <motion.img
              src="/2.png"
              alt="Profile showcase 2"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 w-full h-auto object-cover rounded-xl z-20"
              style={{
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(168, 85, 247, 0.3)',
              }}
            />

            {/* Neural particle reaction indicator */}
            <motion.div
              className="absolute -top-6 -right-6 w-8 h-8 rounded-full border border-cyan-400/50 z-30"
              animate={{
                scale: isHovered ? 1.2 : 1,
                opacity: isHovered ? 0.8 : 0.4,
              }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: isHovered ? '0 0 15px rgba(34, 211, 238, 0.6)' : 'none',
              }}
            />
          </motion.div>
        </motion.div>

      </div>
    </div>
    </section>
  );
}