import { motion } from 'framer-motion';

export function ScrollHint({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{ zIndex: 20 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 4, duration: 1 }}
    >
      <span className="neural-text">Scroll to explore</span>
      <motion.div
        className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
