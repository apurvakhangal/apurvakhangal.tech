import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Project } from './ProjectsSection';

interface FullscreenProjectViewProps {
  project: Project;
  onClose: () => void;
}

export function FullscreenProjectView({ project, onClose }: FullscreenProjectViewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 overflow-y-auto"
    >
      {/* Close Button */}
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-8 right-8 z-50 p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
      >
        <X className="w-6 h-6" />
      </motion.button>

      {/* Content */}
      <div className="min-h-screen flex flex-col justify-center px-4 md:px-12 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            {/* Category & Title */}
            <motion.div variants={itemVariants}>
              <div className="text-sm font-mono text-blue-400/80 uppercase tracking-widest mb-4">
                {project.category}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                {project.title}
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-white/80 leading-relaxed mb-8"
            >
              {project.fullDescription}
            </motion.p>

            {/* Features */}
            <motion.div variants={itemVariants} className="space-y-4 w-full mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest">Key Features</h3>
              <div className="space-y-3">
                {project.features.map((feature) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all justify-center"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-white/80">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4 mb-8 justify-center">
              {project.links?.github && (
                <motion.a
                  href={project.links.github}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full bg-blue-500/20 border border-blue-400/50 text-white font-medium hover:bg-blue-500/30 hover:border-blue-400 transition-all"
                >
                  GitHub
                </motion.a>
              )}
              {project.links?.demo && (
                <motion.a
                  href={project.links.demo}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/20 text-white font-medium hover:bg-white/10 hover:border-white/40 transition-all"
                >
                  View Demo
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Tech Stack - Centered Below */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 text-center"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-widest">Tech Stack</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {project.techStack.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-white/10 to-white/5 border border-white/20 text-white/90 text-sm font-medium hover:border-white/40 transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-20 text-center"
          >
            <p className="text-white/60 text-sm mb-2">Scroll to explore more</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center"
            >
              <div className="w-6 h-10 border border-white/30 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-2 bg-blue-400 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
