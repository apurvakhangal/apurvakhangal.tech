import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-[#111625] flex items-center justify-center relative px-4">
      {/* Fixed background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black/20" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Coming Soon
        </h1>

        <p className="text-lg md:text-xl text-white/70 mb-8 leading-relaxed">
          More about my journey coming soon.
        </p>

        <motion.a
          href="/"
          className="inline-block px-8 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-blue-400/30 text-white font-medium transition-all duration-300"
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)',
            borderColor: 'rgba(96, 165, 250, 0.8)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Home
        </motion.a>
      </motion.div>
    </div>
  );
}
