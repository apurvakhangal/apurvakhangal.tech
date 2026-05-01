import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });

  const paragraphs = [
    "I've always been fascinated by the space where logic meets creativity. As a Computer Engineering student at Sardar Patel Institute of Technology in Mumbai, my focus naturally gravitated toward building things that are not just functional, but meaningful.",
    "For me, the best digital experiences happen when thoughtful design is powered by complex, intelligent systems—whether that's through AI, data analytics, or seamless HCI. I enjoy making the intricate feel intuitive.",
    "After gaining hands-on experience as a Data Analyst Intern at Sysnet Global Technologies, I'm currently preparing for my next chapter at UBS, pushing my boundaries in engineering and problem-solving.",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  // Left-to-right animation for text
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section ref={sectionRef} id="about" className="relative px-4 md:px-12 lg:px-24 py-20 scroll-mt-40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {/* Heading with Glow */}
          <motion.div variants={itemVariants}>
            <motion.h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
              // My Story
            </motion.h2>
            <motion.div
              className="h-1 bg-white/30 rounded-full mt-4"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          {/* Staggered Paragraphs */}
          {paragraphs.map((paragraph, idx) => (
            <motion.p
              key={idx}
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-white/80 text-lg leading-relaxed transition-all duration-300 hover:text-white hover:text-blue-300"
            >
              {paragraph}
            </motion.p>
          ))}

          {/* CTA Button */}
          <motion.div variants={textVariants}>
            <motion.a
              href="/about"
              className="inline-block px-8 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-blue-400/30 text-white font-medium transition-all duration-300 hover:border-blue-400"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 20px rgba(96, 165, 250, 0.4)',
                borderColor: 'rgba(96, 165, 250, 0.8)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Know More →
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}