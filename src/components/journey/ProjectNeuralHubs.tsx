import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMindState } from '@/contexts/MindStateContext';

interface ProjectNeuralHubsProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
}

const projects = [
  {
    id: 1,
    name: 'Phishing Detection AI',
    description: 'End-to-end phishing URL detection using ML (SVM, Logistic Regression, Random Forest). 99.94% accuracy on 233K+ URLs.',
    technologies: ['Python', 'Scikit-learn', 'SVM', 'PCA'],
    position: { x: -120, y: -80 }
  },
  {
    id: 2,
    name: 'Brain-Operated Wheelchair',
    description: 'Hands-free automation system using EEG brainwave signals. Real-time neural classification for assistive IoT.',
    technologies: ['EEG Processing', 'ML', 'Hardware Integration'],
    position: { x: 120, y: -80 }
  }
];

export function ProjectNeuralHubs({ scrollProgress, mousePosition }: ProjectNeuralHubsProps) {
  const { colors } = useMindState();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Visibility range 0.75-0.90
  const sectionStart = 0.75;
  const sectionEnd = 0.90;
  const sectionProgress = (scrollProgress - sectionStart) / (sectionEnd - sectionStart);
  const isVisible = scrollProgress >= sectionStart && scrollProgress <= sectionEnd;

  const baseOpacity = isVisible ? Math.min(1, sectionProgress * 2) : 0;

  return (
    <div
      className="fixed inset-0 pointer-events-auto flex items-center justify-center"
      style={{ opacity: baseOpacity, zIndex: 3 }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {projects.map((project) => {
          const isHovered = hoveredProject === project.id;
          const isSelected = selectedProject === project.id;

          return (
            <motion.div
              key={project.id}
              className="absolute cursor-pointer"
              style={{
                x: project.position.x,
                y: project.position.y
              }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              {/* Project hub node */}
              <motion.div
                className="relative w-40 h-40 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.15) 0%, transparent 70%)`,
                  border: `2px solid rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, ${isHovered ? 0.9 : 0.4})`,
                  boxShadow: isHovered 
                    ? `0 0 50px rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.9), inset 0 0 30px rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.3)`
                    : `0 0 25px rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.5)`,
                  transform: isHovered ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all 0.4s ease-out',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedProject(isSelected ? null : project.id)}
              >
                {/* Inner pulsing nodes */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={`pulse-${i}`}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      background: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})`,
                      left: '50%',
                      top: '50%'
                    }}
                    animate={{
                      x: Math.cos((i / 12) * Math.PI * 2) * (isHovered ? 65 : 50),
                      y: Math.sin((i / 12) * Math.PI * 2) * (isHovered ? 65 : 50),
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity
                    }}
                  />
                ))}

                {/* Center text */}
                <motion.div
                  className="text-center text-xs font-light px-4"
                  style={{ color: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})` }}
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.name}
                </motion.div>
              </motion.div>

              {/* Info panel */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    className="absolute left-full ml-8 w-80 glass-panel rounded-lg p-6"
                    style={{
                      background: 'rgba(10, 10, 20, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.3)`,
                      boxShadow: `0 0 30px rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.2)`
                    }}
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold mb-2" style={{ color: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})` }}>
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded border"
                          style={{
                            borderColor: `rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.4)`,
                            color: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
