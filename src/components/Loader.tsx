import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoaderProps {
  onLoadingComplete: () => void;
}

const BOOT_MESSAGES = [
  'Initializing environment...',
  'Loading modules...',
  'Compiling interface...',
  'Boot sequence ready',
] as const;

const MESSAGE_DELAY = BOOT_MESSAGES.length * 400 + 500;

export function Loader({ onLoadingComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  // Show progress bar after all boot messages have appeared
  useEffect(() => {
    const timer = setTimeout(() => setShowProgress(true), MESSAGE_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // Progress counter animation
  useEffect(() => {
    if (!showProgress) return;

    const startTime = Date.now();
    const duration = 1200; // 1.2 seconds for progress

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        // Fade out after progress completes
        setTimeout(() => {
          onLoadingComplete();
        }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [showProgress, onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-b from-[#0a0e27] via-[#111625] to-[#0a0e27] z-50 flex items-center justify-center overflow-hidden"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-12 px-4">
        {/* Boot Messages */}
        <div className="space-y-3 text-center">
          {BOOT_MESSAGES.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: index * 0.4 + 0.2,
                duration: 0.6,
              }}
              className="text-white/70 font-mono text-sm md:text-base tracking-widest"
            >
              {message}
            </motion.div>
          ))}
        </div>

        {/* Progress Section */}
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center space-y-6"
          >
            {/* Progress Bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden border border-white/20">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                style={{
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.05 }}
              />
            </div>

            {/* Progress Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/80 font-mono text-sm tracking-widest"
            >
              {Math.round(progress)}%
            </motion.div>
          </motion.div>
        )}

        {/* Animated dots */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-400/50"
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.15,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
