import { motion } from 'framer-motion';
import { useMindState, MindState } from '@/contexts/MindStateContext';

const STATES: { id: MindState; label: string; description: string }[] = [
  { id: 'neural', label: 'Neural', description: 'Scientific & Precise' },
  { id: 'cyber', label: 'Cyber', description: 'Digital & Fast' },
  { id: 'dream', label: 'Dream', description: 'Fluid & Ethereal' },
];

export function MindStateSwitcher() {
  const { mindState, setMindState, isTransitioning, colors } = useMindState();
  const primaryColor = `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})`;

  return (
    <motion.div
      className="fixed top-8 right-8 pointer-events-auto"
      style={{ zIndex: 50 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.8 }}
    >
      <div
        className="rounded-lg p-1 backdrop-blur-md"
        style={{
          background: 'rgba(10, 10, 20, 0.6)',
          border: `1px solid ${primaryColor}`,
          boxShadow: `0 0 30px rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.2)`,
          transition: 'all 0.3s ease-out'
        }}
      >
        <div className="flex gap-1 items-center px-2 py-1">
          <span
            className="text-xs tracking-widest uppercase font-light"
            style={{ color: primaryColor, opacity: 0.7 }}
          >
            Mindstate
          </span>

          {STATES.map((s) => (
            <motion.button
              key={s.id}
              onClick={() => setMindState(s.id)}
              disabled={isTransitioning}
              className="relative px-3 py-1.5 rounded text-xs tracking-widest uppercase font-light transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: mindState === s.id ? `${primaryColor}20` : 'transparent',
                color: mindState === s.id ? primaryColor : 'rgba(255,255,255,0.5)',
                cursor: isTransitioning ? 'not-allowed' : 'pointer',
                opacity: isTransitioning ? 0.5 : 1
              }}
            >
              {mindState === s.id && (
                <motion.div
                  className="absolute inset-0 rounded"
                  style={{
                    border: `1px solid ${primaryColor}`,
                    boxShadow: `0 0 15px ${primaryColor}`,
                    pointerEvents: 'none'
                  }}
                  layoutId="active-mindstate"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{s.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Floating description on active state */}
      {!isTransitioning && (
        <motion.div
          className="absolute -bottom-10 left-1/2 text-center"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          key={mindState}
        >
          <p
            className="text-xs tracking-wide"
            style={{ color: `${primaryColor}99` }}
          >
            {STATES.find(s => s.id === mindState)?.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

