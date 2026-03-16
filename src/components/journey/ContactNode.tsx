import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMindState } from '@/contexts/MindStateContext';

interface ContactNodeProps {
  scrollProgress: number;
}

export function ContactNode({ scrollProgress }: ContactNodeProps) {
  const { colors } = useMindState();
  const [isActive, setIsActive] = useState(false);

  // Visibility range 0.90-1.0
  const sectionStart = 0.90;
  const sectionEnd = 1.0;
  const sectionProgress = (scrollProgress - sectionStart) / (sectionEnd - sectionStart);
  const isVisible = scrollProgress >= sectionStart && scrollProgress <= sectionEnd;

  const opacity = isVisible ? Math.min(1, sectionProgress * 2) : 0;

  const contacts = [
    { label: 'GitHub', href: '#', emoji: '🔗' },
    { label: 'LinkedIn', href: '#', emoji: '💼' },
    { label: 'Email', href: 'mailto:apurvakhangal29@gmail.com', emoji: '✉️' }
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-auto flex items-center justify-center"
      style={{ opacity, zIndex: 3 }}
    >
      <div className="text-center max-w-xl">
        {/* Central convergence node */}
        <motion.div
          className="relative w-48 h-48 mx-auto mb-12"
          animate={{ rotate: isActive ? 360 : 0 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.3) 0%, transparent 70%)`,
              border: `2px solid rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.6)`,
              boxShadow: `0 0 60px rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.6), inset 0 0 40px rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.2)`
            }}
          />

          {/* Orbiting nodes */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})`,
                left: '50%',
                top: '50%',
                boxShadow: `0 0 15px rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})`
              }}
              animate={{
                x: Math.cos((i / 8) * Math.PI * 2) * 90,
                y: Math.sin((i / 8) * Math.PI * 2) * 90
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}

          {/* Center bright node */}
          <div
            className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full -ml-2 -mt-2"
            style={{
              background: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})`,
              boxShadow: `0 0 30px rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})`
            }}
          />
        </motion.div>

        {/* Message text */}
        <motion.h2
          className="text-4xl md:text-5xl font-light mb-12"
          style={{ color: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})` }}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Let's build intelligent<br />systems together.
        </motion.h2>

        {/* Contact nodes */}
        <motion.div
          className="flex gap-6 justify-center flex-wrap"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              className="relative group cursor-pointer"
              onHoverStart={() => setIsActive(true)}
              onHoverEnd={() => setIsActive(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl"
                style={{
                  background: `radial-gradient(circle, rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.2) 0%, transparent 70%)`,
                  border: `1.5px solid rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.5)`,
                  boxShadow: `0 0 20px rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.3)`,
                  transition: 'all 0.3s ease-out'
                }}
              >
                {contact.emoji}
              </div>
              
              {/* Ripple on hover */}
              <motion.div
                className="absolute inset-0 rounded-full border"
                style={{
                  borderColor: `rgba(${colors.primary.map(c => Math.round(c * 255)).join(',')}, 0.5)`
                }}
                animate={{
                  scale: [1, 2],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />

              {/* Label */}
              <p
                className="text-xs mt-3 font-light opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: `rgb(${colors.primary.map(c => Math.round(c * 255)).join(',')})` }}
              >
                {contact.label}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
