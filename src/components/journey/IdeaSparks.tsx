import { motion } from 'framer-motion';
import { useMindState } from '@/contexts/MindStateContext';

interface IdeasParksProps {
  scrollProgress: number;
}

export function IdeaSparks({ scrollProgress }: IdeasParksProps) {
  const { colors } = useMindState();
  
  // Visibility range 0.4-0.6
  const sectionStart = 0.4;
  const sectionEnd = 0.6;
  const sectionProgress = (scrollProgress - sectionStart) / (sectionEnd - sectionStart);
  const isVisible = scrollProgress >= sectionStart && scrollProgress <= sectionEnd;
  
  const opacity = isVisible ? Math.min(1, sectionProgress) : 0;

  const ideas = [
    { text: 'Ideas start as signals.', delay: 0 },
    { text: 'Signals become connections.', delay: 0.3 },
    { text: 'Connections become systems.', delay: 0.6 }
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
      style={{ opacity, zIndex: 2 }}
    >
      <div className="max-w-2xl">
        {ideas.map((idea, i) => (
          <motion.div
            key={i}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: idea.delay, duration: 1 }}
          >
            <p
              className="text-3xl md:text-4xl font-light tracking-tight"
              style={{ color: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})` }}
            >
              {idea.text}
            </p>

            {/* Spark effects around text */}
            {Array.from({ length: 8 }).map((_, j) => (
              <motion.div
                key={`spark-${i}-${j}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})`,
                  boxShadow: `0 0 6px rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})`
                }}
                animate={{
                  x: Math.cos((j / 8) * Math.PI * 2) * 80,
                  y: Math.sin((j / 8) * Math.PI * 2) * 80,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: idea.delay + j * 0.1,
                  repeat: Infinity
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
