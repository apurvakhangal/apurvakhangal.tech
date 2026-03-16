import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Project } from './ProjectsSection';

interface ProjectSquareCardProps {
  project: Project;
  index: number;
  onExpand: () => void;
}

export function ProjectSquareCard({ project, index, onExpand }: ProjectSquareCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onExpand}
        className="relative w-80 h-80 md:w-96 md:h-96 group cursor-pointer"
      >
        {/* Card Container */}
        <motion.div
          className={`project-card relative w-full h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 overflow-hidden flex flex-col justify-between transition-all duration-500`}
          whileHover={{
            borderColor: 'rgba(96, 165, 250, 0.5)',
            boxShadow: '0 0 30px rgba(96, 165, 250, 0.3)',
          }}
        >
          {/* Animated gradient background */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 -z-10`}
            animate={{
              opacity: isHovered ? 0.15 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Glow border effect */}
          <motion.div
            className={`absolute -inset-1 bg-gradient-to-br ${project.color} rounded-2xl opacity-0 -z-20 blur`}
            animate={{
              opacity: isHovered ? 0.2 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Category Label */}
            <motion.div
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-mono text-blue-400/80 uppercase tracking-widest mb-3"
            >
              {project.category}
            </motion.div>

            {/* Title */}
            <motion.h3
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
            >
              {project.title}
            </motion.h3>
          </div>

          {/* Description - Bottom */}
          <motion.div
            animate={{ y: isHovered ? -4 : 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <p className="text-white/70 text-sm mb-6">
              {project.shortDescription}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tech) => (
                <motion.span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/20"
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-xs px-2 py-1 text-white/60">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </motion.div>

          {/* Expand Indicator */}
          <motion.div
            className="absolute bottom-6 right-6 pointer-events-none"
            animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center">
              <span className="text-lg text-white/60">+</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating animation */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4 + index * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
