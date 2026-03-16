import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMindState } from '@/contexts/MindStateContext';

interface SkillConstellationsProps {
  scrollProgress: number;
}

const skills = [
  { name: 'Machine Learning', icon: '🧠' },
  { name: 'Human-Computer\nInteraction', icon: '🖥️' },
  { name: 'Creative\nDevelopment', icon: '✨' },
  { name: 'Data Systems', icon: '📊' }
];

export function SkillConstellations({ scrollProgress }: SkillConstellationsProps) {
  const { colors } = useMindState();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Visibility range 0.6-0.75
  const sectionStart = 0.6;
  const sectionEnd = 0.75;
  const sectionProgress = (scrollProgress - sectionStart) / (sectionEnd - sectionStart);
  const isVisible = scrollProgress >= sectionStart && scrollProgress <= sectionEnd;

  const baseOpacity = isVisible ? Math.min(1, sectionProgress * 2) : 0;

  return (
    <div
      className="fixed inset-0 pointer-events-auto flex items-center justify-center"
      style={{ opacity: baseOpacity, zIndex: 3 }}
    >
      <div className="relative w-full h-full">
        {/* Constellations grid */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-96 h-96">
            {skills.map((skill, i) => {
              const angle = (i / skills.length) * Math.PI * 2;
              const x = Math.cos(angle) * 150;
              const y = Math.sin(angle) * 150;
              const isHovered = hoveredIndex === i;

              return (
                <motion.div
                  key={i}
                  className="absolute cursor-pointer"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-40px',
                    marginTop: '-40px'
                  }}
                  animate={{ x, y }}
                  transition={{ duration: 1 }}
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  {/* Skill node cluster */}
                  <div
                    className="relative w-32 h-32 rounded-full cursor-pointer"
                    style={{
                      background: `radial-gradient(circle, rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.2) 0%, transparent 70%)`,
                      border: `1px solid rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.4)`,
                      boxShadow: isHovered 
                        ? `0 0 30px rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.8)` 
                        : `0 0 15px rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.3)`,
                      transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                      transition: 'all 0.4s ease-out'
                    }}
                  >
                    {/* Inner nodes */}
                    {Array.from({ length: 6 }).map((_, j) => (
                      <motion.div
                        key={`node-${i}-${j}`}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                          background: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})`,
                          left: '50%',
                          top: '50%'
                        }}
                        animate={{
                          x: Math.cos((j / 6) * Math.PI * 2) * (isHovered ? 45 : 35),
                          y: Math.sin((j / 6) * Math.PI * 2) * (isHovered ? 45 : 35)
                        }}
                        transition={{ duration: 0.6 }}
                      />
                    ))}

                    {/* Center glow */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle, rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.4) 0%, transparent 70%)`,
                        filter: 'blur(4px)'
                      }}
                    />
                  </div>

                  {/* Skill label */}
                  <motion.div
                    className="absolute top-full mt-4 text-center whitespace-pre-line text-sm font-light"
                    style={{ color: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})` }}
                    animate={{ opacity: isHovered ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.name}
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Center connection point */}
            <div
              className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full -ml-1 -mt-1"
              style={{
                background: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})`,
                boxShadow: `0 0 20px rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})`
              }}
            />

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              {skills.map((_, i) => {
                const angle = (i / skills.length) * Math.PI * 2;
                const x1 = 192 + Math.cos(angle) * 150;
                const y1 = 192 + Math.sin(angle) * 150;
                return (
                  <line
                    key={`line-${i}`}
                    x1="192"
                    y1="192"
                    x2={x1}
                    y2={y1}
                    stroke={`rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.2)`}
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
