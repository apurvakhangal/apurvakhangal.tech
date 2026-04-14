import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { NeuralScene } from "@/components/neural/NeuralScene";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GlowCursorTrail } from "@/components/ui/GlowCursorTrail";
import { Navbar } from "@/components/ui/Navbar";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { projects } from "@/data/projects";

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { progress } = useScrollProgress();
  const mousePosition = { x: 0, y: 0 };

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="flex flex-col w-full">
        <CustomCursor mousePosition={mousePosition} />
        <GlowCursorTrail />
        <div className="fixed top-0 left-0 w-full h-[140px] bg-[#0b1220]/80 backdrop-blur-xl z-30" />
        <Navbar variant="project" />
        <ScrollProgressBar progress={progress} mode="fixed" />

        <div className="fixed inset-0 z-0 pointer-events-none">
          <NeuralScene scrollProgress={progress} mousePosition={mousePosition} />
        </div>

        <div className="relative z-10 w-full pt-[140px]">
          <main className="flex flex-col max-w-5xl mx-auto px-6 md:px-10 lg:px-12 pb-24 gap-10">
            <motion.section
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl font-semibold text-white">
                Project Not Found
              </h1>
              <p className="text-white/70 text-base">
                The project you are looking for does not exist. Try going back to the projects list.
              </p>
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="inline-flex items-center gap-2 text-sm font-mono text-white/70 hover:text-white transition-colors w-fit"
              >
                <span className="text-lg">←</span>
                <span>Back to Projects</span>
              </button>
            </motion.section>
          </main>
        </div>
      </div>
    );
  }

  const isUiUx = project.category === "UI / UX";
  const primaryCta = isUiUx ? "View Case Study" : "Explore Project";

  if (project.slug === "ayashield") {
    const solutionPillars = [
      {
        title: "Transparency",
        description: "Every score exposes its exact formula and weights.",
      },
      {
        title: "Explainability",
        description: "AI explains why risk exists, not just what it is.",
      },
      {
        title: "Simulation",
        description: "Model outcomes before committing capital.",
      },
      {
        title: "Accessibility",
        description: "Risk intelligence for everyone, not just quants.",
      },
    ];

    const keyFeatures = [
      {
        title: "Risk Intelligence Engine",
        description: "Bloomberg-grade risk terminal with transparent scoring and confidence meters.",
      },
      {
        title: "Scenario Simulation",
        description: "Bull, neutral, bear, and crash multipliers for position outcomes.",
      },
      {
        title: "Liquidity Modeling",
        description: "Exit impact at $10k–$500k tiers with slippage projections.",
      },
      {
        title: "AI Copilot",
        description: "Structured explanations for risk drivers and mitigation steps.",
      },
      {
        title: "Voice Assistant",
        description: "Hands-free risk analysis with speech input/output.",
      },
      {
        title: "Security Dashboard",
        description: "Exploit tracking, attack type analytics, and incident insights.",
      },
    ];

    const techStack = [
      "React",
      "TypeScript",
      "Tailwind",
      "Zustand",
      "Express",
      "AI Layer",
      "Recharts",
      "Framer Motion",
    ];

    const howItWorks = [
      {
        title: "Weighted Risk Score",
        description:
          "Volatility, liquidity, contract, behavioral, and scam signals blend into a transparent weighted score.",
      },
      {
        title: "Scenario Multipliers",
        description:
          "Market conditions adjust the base score to reveal worst-case and best-case outcomes.",
      },
      {
        title: "Liquidity Impact",
        description:
          "Exit simulations model slippage at multiple capital tiers to reveal hidden risk.",
      },
    ];

    return (
      <div className="flex flex-col w-full">
        <CustomCursor mousePosition={mousePosition} />
        <GlowCursorTrail />
        <div className="fixed top-0 left-0 w-full h-[140px] bg-[#0b1220]/80 backdrop-blur-xl z-30" />
        <Navbar variant="project" />
        <ScrollProgressBar progress={progress} mode="fixed" />

        <div className="fixed inset-0 z-0 pointer-events-none">
          <NeuralScene scrollProgress={progress} mousePosition={mousePosition} />
        </div>

        <div className="relative z-10 w-full pt-[140px]">
          <main className="flex flex-col max-w-6xl mx-auto px-6 md:px-10 lg:px-12 pb-24 gap-16">
            {/* Hero */}
            <motion.section
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="inline-flex items-center gap-2 text-sm font-mono text-white/60 hover:text-white transition-colors w-fit"
              >
                <span className="text-lg">←</span>
                <span>Back to Projects</span>
              </button>

              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full border bg-blue-500/10 text-blue-300 border-blue-400/30 w-fit">
                  AI / DeFi
                </span>
                <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
                  AyaShield
                </h1>
                <p className="text-white/70 text-base md:text-lg max-w-3xl">
                  Institutional-Grade Explainable Risk Intelligence for DeFi
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://ayashield.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-sm font-mono hover:bg-blue-500/30 transition-all"
                >
                  View Live Project →
                </a>
                <a
                  href="https://github.com/apurvakhangal/AyaShield"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-mono hover:text-white transition-all"
                >
                  View GitHub →
                </a>
              </div>
            </motion.section>

            {/* Problem */}
            <motion.section
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-lg aspect-square w-full max-w-[320px] p-8 md:p-10 flex flex-col items-center justify-center text-center justify-self-center lg:justify-self-start lg:mr-3">
                <p className="text-6xl md:text-7xl font-semibold text-white">$3.8B</p>
                <p className="text-white/60 mt-3 text-sm md:text-base">Lost to DeFi exploits in 2025 alone</p>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">The Problem</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">The Problem That Costs Billions</h2>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  Users sign transactions blind. Dashboards show raw TVL, but not consequences. Risk scores appear without
                  explanation, and transparency is missing when it matters most.
                </p>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  The barrier to safe DeFi participation is not complexity — it is opacity.
                </p>
              </div>
            </motion.section>

            {/* Solution */}
            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">The Solution</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">A Bloomberg Terminal for DeFi Risk</h2>
                <p className="text-white/70 text-sm md:text-base">
                  AyaShield turns opaque on-chain data into explainable, actionable intelligence — before users sign.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {solutionPillars.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5"
                  >
                    <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

            </motion.section>

            {/* Tech Stack */}
            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Tech Stack</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Built with a Full-Stack Intelligence Layer</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm px-4 py-2 rounded-full bg-white/10 text-white/80 border border-white/20 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Architecture */}
            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Architecture</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">System Architecture</h2>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_0_40px_rgba(96,165,250,0.15)]">
                <img
                  src="/AyaShield.png"
                  alt="AyaShield Architecture"
                  className="w-full rounded-2xl border border-white/10 hover:scale-[1.01] transition-transform duration-300"
                />
                <p className="text-white/60 text-sm mt-3 text-center">System Architecture</p>
              </div>
            </motion.section>

            {/* How it Works */}
            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">How It Works</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Risk Intelligence, Explained</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {howItWorks.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5"
                  >
                    <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Key Features */}
            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Key Features</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">What Makes AyaShield Different</h2>
                <p className="text-white/60 text-sm md:text-base">
                  AyaShield turns raw protocol data into consequence-driven intelligence.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keyFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5"
                  >
                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Live Preview */}
            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Live Preview</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Experience AyaShield</h2>
              </div>
              <div className="rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(96,165,250,0.15)]">
                <iframe
                  title="AyaShield Live Preview"
                  src="https://ayashield.vercel.app/"
                  className="w-full h-[600px]"
                  loading="lazy"
                />
              </div>
            </motion.section>

            {/* Bottom CTA */}
            <motion.section
              className="flex flex-col items-center gap-4 text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-white">Ready to explore AyaShield?</h2>
              <p className="text-white/60 text-sm md:text-base max-w-2xl">
                Don’t sign blind. Understand risk before you move capital.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://ayashield.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-sm font-mono hover:bg-blue-500/30 transition-all"
                >
                  View Live Project →
                </a>
                <a
                  href="https://github.com/apurvakhangal/AyaShield"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-mono hover:text-white transition-all"
                >
                  View GitHub →
                </a>
              </div>
            </motion.section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <CustomCursor mousePosition={mousePosition} />
      <GlowCursorTrail />
      <div className="fixed top-0 left-0 w-full h-[140px] bg-[#0b1220]/80 backdrop-blur-xl z-30" />
      <Navbar variant="project" />
      <ScrollProgressBar progress={progress} mode="fixed" />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralScene scrollProgress={progress} mousePosition={mousePosition} />
      </div>

      <div className="relative z-10 w-full pt-[140px]">
        <main className="flex flex-col max-w-5xl mx-auto px-6 md:px-10 lg:px-12 pb-24 gap-12">
          <motion.section
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="inline-flex items-center gap-2 text-sm font-mono text-white/60 hover:text-white transition-colors w-fit"
            >
              <span className="text-lg">←</span>
              <span>Back to Projects</span>
            </button>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <span
                  className={`text-xs font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full border ${
                    isUiUx
                      ? "bg-purple-500/20 text-purple-300 border-purple-400/40"
                      : "bg-blue-500/10 text-blue-300 border-blue-400/30"
                  }`}
                >
                  {project.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
                {project.title}
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-3xl">
                {project.fullDescription}
              </p>
            </div>
          </motion.section>

          <motion.section
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div className="space-y-6">
              <div>
                <h2 className="text-white text-xl font-semibold mb-3">Overview</h2>
                <p className="text-white/70 text-sm leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              {project.features?.length ? (
                <div>
                  <h3 className="text-white text-lg font-semibold mb-3">Highlights</h3>
                  <ul className="text-white/70 text-sm space-y-2 list-disc list-inside">
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-white text-lg font-semibold mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-white/80 border border-white/20 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.links?.demo ? (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-sm font-mono hover:bg-blue-500/30 transition-all"
                  >
                    {primaryCta} →
                  </a>
                ) : null}
                {project.links?.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-mono hover:text-white transition-all"
                  >
                    View Source →
                  </a>
                ) : null}
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
