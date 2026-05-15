import { memo } from 'react';
import { motion } from 'framer-motion';

// All data and variants outside the component — zero recreation on render

const MAIN_SKILL_SECTIONS = [
  {
    title: "FRONTEND & DESIGN",
    color: "text-blue-400",
    border: "border-blue-400/40",
    pill: "hover:border-blue-400/50 hover:text-blue-200 hover:bg-blue-500/10",
    skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "Vite", "Recharts", "Figma", "Adobe XD", "Illustrator", "Photoshop", "Canva", "Design Systems", "User Experience Design"],
  },
  {
    title: "BACKEND & DATABASES",
    color: "text-emerald-400",
    border: "border-emerald-400/40",
    pill: "hover:border-emerald-400/50 hover:text-emerald-200 hover:bg-emerald-500/10",
    skills: ["Python", "Java", "C++", "Node.js", "Express.js", "REST APIs", "MySQL", "MongoDB", "Oracle", "SQLite", "Database Design", "Supabase"],
  },
  {
    title: "AI / MACHINE LEARNING & DATA",
    color: "text-purple-400",
    border: "border-purple-400/40",
    pill: "hover:border-purple-400/50 hover:text-purple-200 hover:bg-purple-500/10",
    skills: ["Machine Learning", "Deep Learning", "Neural Networks", "TensorFlow / Keras", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Data Analysis"],
  },
];

const TOOLS_SECTION = {
  title: "TOOLS & TECHNOLOGIES",
  skills: ["Git", "GitHub", "Power BI", "Web3 Concepts", "DeFi Risk Analysis", "Smart Contract Risk Evaluation", "Radix UI", "shadcn UI"],
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const sectionTitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

// Chip hover — applied directly on motion.span, no inner wrapper needed
const chipHoverVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.08, transition: { type: 'spring' as const, stiffness: 300, damping: 20 } },
};

const TITLE_VIEWPORT = { once: false, amount: 0.5 as const };
const SECTION_VIEWPORT = { once: false, amount: 0.4 as const };
const LINE_VIEWPORT = { once: false, amount: 0.5 as const };

export const SkillsSection = memo(function SkillsSection() {
  return (
    <section id="skills" className="flex flex-col justify-center items-center relative px-4 md:px-8 py-20 z-10 scroll-mt-40">
      <div className="max-w-7xl w-full">

        {/* Title */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={TITLE_VIEWPORT}
          variants={sectionTitleVariants}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
            SKILLS
          </h2>
          <motion.div
            className="h-px bg-gradient-to-r from-white/30 via-white/10 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={LINE_VIEWPORT}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ originX: 0 }}
          />
        </motion.div>

        {/* Main skills — 3 columns desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-16">
          {MAIN_SKILL_SECTIONS.map((section, idx) => (
            <motion.div
              key={idx}
              className="space-y-6"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={SECTION_VIEWPORT}
            >
              <h3 className={`uppercase tracking-widest text-xs font-medium pb-4 border-b ${section.border} ${section.color}`}>
                {section.title}
              </h3>

              <motion.div
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={SECTION_VIEWPORT}
              >
                {section.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={chipHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    className={`skill-chip rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm px-4 py-2 text-sm text-white/60 cursor-pointer font-medium transition-colors duration-200 ${section.pill}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Tools row */}
        <motion.div
          className="flex flex-col items-center w-full"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={SECTION_VIEWPORT}
        >
          <h3 className="uppercase tracking-widest text-white/80 text-xs font-medium mb-6">
            {TOOLS_SECTION.title}
          </h3>

          <motion.div
            className="flex flex-wrap justify-between gap-4 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={SECTION_VIEWPORT}
          >
            {TOOLS_SECTION.skills.map((skill) => (
              <motion.span
                key={skill}
                variants={chipHoverVariants}
                initial="rest"
                whileHover="hover"
                className="skill-chip rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-sm px-4 py-2 text-sm text-white/70 cursor-pointer font-medium transition-all duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
});