import { motion } from "framer-motion";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectPageShell } from "@/components/layout/ProjectPageShell";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { projects } from "@/data/projects";

const AYASHIELD_CONTENT = {
  solutionPillars: [
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
  ],
  keyFeatures: [
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
  ],
  techStack: [
    "React",
    "TypeScript",
    "Tailwind",
    "Zustand",
    "Express",
    "AI Layer",
    "Recharts",
    "Framer Motion",
  ],
  howItWorks: [
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
  ],
};

const EDURA_CONTENT = {
  problemStats: [
    { value: "73%", label: "of students struggle with learning consistency" },
    { value: "6+", label: "disconnected apps used per student workflow" },
    { value: "40%", label: "drop in engagement without personalisation" },
  ],
  solutionPillars: [
    { title: "AI Guidance", description: "Gemini-powered tutoring and adaptive roadmap generation tailored to your goals." },
    { title: "Smart Planning", description: "AI-prioritised schedules, deadline tracking, and Classroom sync." },
    { title: "Immersive Focus", description: "Pomodoro timers with ambient audio and visual environments for deep work." },
    { title: "Collaborative Learning", description: "Study groups, mentorship matching, and FrameVR-powered virtual spaces." },
    { title: "AI Revision", description: "Auto-generate quizzes, flashcards, and summaries directly from your notes." },
    { title: "Accessibility", description: "30+ language support and inclusive learning features for every student." },
  ],
  coreFeatures: [
    { title: "AI Tutor", description: "Plain-language explanations for any concept, powered by Gemini AI." },
    { title: "Learning Roadmaps", description: "Goal-based adaptive paths that evolve with your progress." },
    { title: "Study Planner", description: "AI-prioritised task lists and smart schedule management." },
    { title: "Focus Room", description: "Pomodoro timer with curated ambient audio for deep concentration." },
    { title: "Study VR", description: "FrameVR-powered virtual study rooms for collaborative sessions." },
    { title: "Notes Workspace", description: "Rich notes with AI summaries and instant flashcard generation." },
    { title: "Judge0 IDE", description: "Integrated coding environment for practice and assignments." },
    { title: "Analytics Dashboard", description: "XP, streaks, progress heatmaps, and mastery tracking." },
    { title: "Community System", description: "Mentorship, discussion forums, and peer study groups." },
  ],
  techStack: ["React", "TypeScript", "Supabase", "Gemini AI", "Tailwind", "Zustand", "TanStack Query", "Framer Motion", "Monaco Editor", "FrameVR", "Express", "Recharts", "shadcn/ui"],
  howItWorks: [
    { step: "01", title: "Personalised Learning", description: "AI analyses your goals and builds adaptive roadmaps that adjust as you progress." },
    { step: "02", title: "Intelligent Planning", description: "Smart scheduling prioritises your deadlines and study time automatically." },
    { step: "03", title: "Active Revision", description: "Generate quizzes and flashcards from your own notes in one click." },
    { step: "04", title: "Immersive Focus", description: "Pomodoro sessions with soundscapes and visual cues that improve concentration." },
    { step: "05", title: "Collaborative Growth", description: "Connect with peers and mentors through VR spaces and community systems." },
  ],
  progressFeatures: [
    { metric: "XP System", description: "Earn experience points for every learning action taken." },
    { metric: "Daily Streaks", description: "Consistency tracking to build long-term learning habits." },
    { metric: "Mastery Scores", description: "Per-topic mastery based on quiz and revision performance." },
    { metric: "AI Insights", description: "Personalised improvement tips generated from your data." },
  ],
  immersiveCards: [
    { title: "Focus Room", description: "A distraction-free environment with Pomodoro timers, ambient soundscapes, and focus-mode UI designed to maximise deep work sessions.", tag: "Productivity", tagColor: "text-indigo-300 bg-indigo-500/10 border-indigo-400/30", gradient: "from-indigo-500/20 to-purple-500/5", border: "border-indigo-400/30" },
    { title: "Study VR", description: "FrameVR-powered virtual study rooms where students collaborate, attend sessions, and explore immersive educational environments together.", tag: "Immersive", tagColor: "text-violet-300 bg-violet-500/10 border-violet-400/30", gradient: "from-violet-500/20 to-pink-500/5", border: "border-violet-400/30" },
    { title: "AI Workspace", description: "A unified smart workspace combining the AI tutor, Monaco-powered IDE, notes editor, and flashcard generator in a single cohesive environment.", tag: "AI-Powered", tagColor: "text-blue-300 bg-blue-500/10 border-blue-400/30", gradient: "from-blue-500/20 to-indigo-500/5", border: "border-blue-400/30" },
  ],
};

const BURGER_KING_CASE_STUDY = {
  overviewCards: [
    {
      title: "Goal",
      description: "Improve UX, navigation, and interface clarity for faster, simpler ordering.",
    },
    {
      title: "Problems",
      description: "Cluttered menus, confusing flows, weak CTAs, and limited personalization.",
    },
    {
      title: "Outcome",
      description: "A clean, intuitive experience with smarter discovery and ordering.",
    },
  ],
  keyAdditions: [
    "Personalized home screen",
    "Hamburger menu navigation",
    "Crazy Deals section",
    "Improved store locator",
  ],
  userStruggles: [
    "Cluttered UI that overwhelms new users",
    "Confusing navigation and inconsistent hierarchy",
    "Weak search and filtering for quick decisions",
    "Low-visibility CTAs during ordering",
    "Lack of personalization for returning users",
    "Order tracking that feels buried and unclear",
  ],
  researchBlocks: [
    {
      title: "Primary Research",
      label: "Google Forms survey",
      description: "Focused on Gen Z users to validate core UX pain points and ordering behavior.",
    },
    {
      title: "Secondary Research",
      label: "App Store, Play Store, Reddit",
      description: "Real user reviews revealed consistent frustrations with navigation, speed, and clarity.",
    },
  ],
  personas: [
    {
      name: "Budget Benny",
      role: "Deal-focused student",
      goals: ["Find the best deals fast", "Compare bundles easily"],
      painPoints: ["Deals feel hidden", "Too many taps to checkout"],
    },
    {
      name: "Late Nate",
      role: "Impatient late-night user",
      goals: ["Reorder quickly", "Track delivery in one place"],
      painPoints: ["Navigation slows him down", "Tracking lacks clarity"],
    },
    {
      name: "Fit Krit",
      role: "Health-conscious user",
      goals: ["Find lighter options", "Customize ingredients"],
      painPoints: ["Filters are weak", "Customization feels buried"],
    },
  ],
  journeyStages: [
    {
      stage: "Discover",
      detail: "Users hunt for deals and decide what to order.",
      pain: "Navigation hides the best offers.",
    },
    {
      stage: "Customize",
      detail: "Users adjust items and add sides.",
      pain: "Customization feels dense and unclear.",
    },
    {
      stage: "Pay",
      detail: "Users complete checkout quickly.",
      pain: "Too many steps before confirmation.",
    },
    {
      stage: "Track",
      detail: "Users check order status and ETA.",
      pain: "Tracking is buried in the UI.",
    },
  ],
  insights: [
    "Confusing layout",
    "Unorganized menu",
    "Cluttered UI",
    "Lack of personalization",
    "Weak CTAs",
    "Poor search",
    "Order tracking issues",
  ],
  designSolutions: [
    "Cleaner layout with stronger visual hierarchy",
    "Simplified navigation with a hamburger menu",
    "Reduced steps from discovery to checkout",
    "Improved visibility for offers and CTAs",
    "Personalized experiences on the home screen",
  ],
  designScreens: [
    {
      title: "Landing Page",
      description: "A black-and-white palette sets a premium, focused tone.",
      image: "/uiux/onboarding.png",
      alt: "Burger King onboarding screen",
    },
    {
      title: "Login / Signup",
      description: "A welcoming entry with clear value and action.",
      image: "/uiux/login%20page.png",
      alt: "Burger King login screen",
    },
    {
      title: "Home Page",
      description: "Greeting, search, and deals are surfaced instantly.",
      image: "/uiux/home.png",
      alt: "Burger King home screen",
    },
    {
      title: "Crown Rewards",
      description: "Centralized rewards with a bold crown hero.",
      image: "/uiux/Crown%20Rewards.png",
      alt: "Burger King crown rewards screen",
    },
    {
      title: "Store Locator",
      description: "Clean cards improve scanability and clarity.",
      image: "/uiux/finding%20nearby%20stores.png",
      alt: "Burger King store locator screen",
    },
    {
      title: "Crazy Deals",
      description: "A dedicated deals hub for high-intent users.",
      image: "/uiux/Crazy%20app%20deals.png",
      alt: "Burger King crazy deals screen",
    },
    {
      title: "Customize Order",
      description: "A focused customization flow with fewer steps.",
      image: "/uiux/Customise%20Order-1.png",
      alt: "Burger King order customization screen",
    },
    {
      title: "Menu",
      description: "Reduced clutter with organized categories.",
      image: "/uiux/menu.png",
      alt: "Burger King menu screen",
    },
    {
      title: "Category Pages",
      description: "Focused browsing with stronger visual grouping.",
      image: "/uiux/burgers.png",
      alt: "Burger King category listing screen",
    },
  ],
  wireframeNotes: [
    "Full user flow mapped from discovery to tracking.",
    "Iteration cycles focused on speed and clarity.",
    "Layout tests validated hierarchy before UI polish.",
  ],
  impactPoints: [
    "Reduced cognitive load during browsing",
    "Faster ordering with fewer decision steps",
    "Cleaner UX for first-time and returning users",
    "Better engagement through personalized content",
  ],
  learningPoints: [
    "UX is built on user behavior, not just visuals.",
    "Balance creativity with usability and speed.",
    "Small changes create measurable impact at scale.",
  ],
};

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { progress } = useScrollProgress();
  const project = useMemo(() => projects.find((item) => item.slug === slug), [slug]);

  if (!project) {
    return (
      <ProjectPageShell
        progress={progress}
        mainClassName="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 pb-24 gap-10"
      >
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
      </ProjectPageShell>
    );
  }

  const isUiUx = project.category === "UI / UX";
  const primaryCta = isUiUx ? "View Case Study" : "Explore Project";

  if (project.slug === "ayashield") {
    const { solutionPillars, keyFeatures, techStack, howItWorks } = AYASHIELD_CONTENT;

    return (
      <ProjectPageShell
        progress={progress}
        mainClassName="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 pb-24 gap-16"
      >
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
                <a href="https://ayashield.vercel.app/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-200 text-sm font-mono hover:bg-blue-500/30 transition-all">
                  View Live Project →
                </a>
                <a href="https://github.com/apurvakhangal/AyaShield" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-mono hover:text-white transition-all">
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
              <div className="rounded-3xl border border-red-500/30 bg-red-500/5 backdrop-blur-lg w-full max-w-[320px] p-8 md:p-10 flex flex-col items-center justify-center text-center justify-self-center lg:justify-self-start lg:mr-3 shadow-[0_0_40px_rgba(239,68,68,0.15)]" style={{ aspectRatio: '1' }}>
                <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">⚠ Total Lost</p>
                <p className="text-6xl md:text-7xl font-semibold text-white">$3.8B</p>
                <p className="text-red-300/80 mt-3 text-sm md:text-base">to DeFi exploits in 2025 alone</p>
                <div className="flex gap-3 mt-5 flex-wrap justify-center">
                  <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 border border-red-400/20 text-red-300/70 font-mono">127 incidents</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 border border-red-400/20 text-red-300/70 font-mono">avg $30M/event</span>
                </div>
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
                {solutionPillars.map((item, i) => {
                  const colors = [
                    { border: "border-cyan-400/30",    bg: "bg-cyan-500/5",    icon: "◈", iconColor: "text-cyan-400"    },
                    { border: "border-purple-400/30",  bg: "bg-purple-500/5",  icon: "✦", iconColor: "text-purple-400"  },
                    { border: "border-blue-400/30",    bg: "bg-blue-500/5",    icon: "⟳", iconColor: "text-blue-400"    },
                    { border: "border-emerald-400/30", bg: "bg-emerald-500/5", icon: "◎", iconColor: "text-emerald-400" },
                  ][i];
                  return (
                    <div key={item.title} className={`rounded-2xl border ${colors.border} ${colors.bg} backdrop-blur-lg p-5`}>
                      <span className={`text-xl mb-3 block ${colors.iconColor}`}>{colors.icon}</span>
                      <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
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
                {howItWorks.map((step, i) => (
                  <div key={step.title} className="rounded-2xl border border-blue-400/15 bg-blue-500/5 backdrop-blur-lg p-5">
                    <p className="text-xs font-mono text-blue-400/60 mb-3 tracking-[0.2em]">{String(i + 1).padStart(2, "0")}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {keyFeatures.map((feature, i) => {
                  const icons = ["⬡", "⟳", "⬇", "✦", "◉", "⬡"];
                  return (
                    <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5 hover:border-blue-400/30 hover:bg-blue-500/5 transition-all duration-300">
                      <span className="text-blue-400/70 text-lg mb-3 block font-mono">{icons[i]}</span>
                      <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
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
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-white/[0.02] to-cyan-500/10 backdrop-blur-lg p-10 md:p-14 flex flex-col items-center gap-5 text-center shadow-[0_0_60px_rgba(96,165,250,0.12)]">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-blue-400/60">Don't Sign Blind</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Ready to explore AyaShield?</h2>
                <p className="text-white/60 text-sm md:text-base max-w-xl">
                  Understand risk before you move capital. Institutional-grade intelligence, now accessible to everyone.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <a href="https://ayashield.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-500/25 border border-blue-400/50 text-blue-200 text-sm font-mono hover:bg-blue-500/35 transition-all">
                    View Live Project →
                  </a>
                  <a href="https://github.com/apurvakhangal/AyaShield" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/15 text-white/70 text-sm font-mono hover:text-white transition-all">
                    View GitHub →
                  </a>
                </div>
              </div>
            </motion.section>
      </ProjectPageShell>
    );
  }

  if (project.slug === "edura") {
    const { problemStats, solutionPillars, coreFeatures, techStack: eduraTech, howItWorks, progressFeatures, immersiveCards } = EDURA_CONTENT;
    return (
      <ProjectPageShell progress={progress} mainClassName="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 pb-24 gap-20">

        {/* HERO */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-6">
            <button type="button" onClick={() => navigate("/projects")} className="inline-flex items-center gap-2 text-sm font-mono text-white/60 hover:text-white transition-colors w-fit">
              <span className="text-lg">←</span><span>Back to Projects</span>
            </button>
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full border bg-violet-500/15 text-violet-300 border-violet-400/40 w-fit">AI / Education</span>
              <h1 className="text-5xl md:text-7xl font-semibold text-white leading-[1.05] tracking-tight">Edura</h1>
              <p className="text-white/70 text-base md:text-lg max-w-lg leading-relaxed">An AI-powered study and learning companion designed for intelligent, immersive, and personalised education.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://edura-geminihack.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/20 border border-violet-400/40 text-violet-200 text-sm font-mono hover:bg-violet-500/30 transition-all">View Live Project →</a>
              <a href="https://github.com/apurvakhangal/edura" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-mono hover:text-white transition-all">View GitHub →</a>
            </div>
          </div>

          {/* Floating Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="hidden lg:flex flex-col gap-3 relative"
          >
            <div className="absolute -inset-8 bg-violet-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-lg p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-500/30 border border-violet-400/40 flex items-center justify-center flex-shrink-0 text-violet-300 text-xs">✦</div>
              <div>
                <p className="text-white text-sm font-medium">AI Tutor</p>
                <p className="text-white/40 text-xs mt-0.5">Explain dynamic programming simply…</p>
                <p className="text-violet-300 text-xs mt-2 leading-relaxed">Dynamic programming breaks complex problems into smaller overlapping subproblems, solving each once and storing results…</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-lg p-4">
                <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-1">Streak</p>
                <p className="text-3xl font-semibold text-white">🔥 12</p>
                <p className="text-white/30 text-xs mt-1">days in a row</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-lg p-4">
                <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-1">XP Earned</p>
                <p className="text-3xl font-semibold text-violet-300">4,820</p>
                <p className="text-white/30 text-xs mt-1">+340 today</p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-lg p-4">
              <p className="text-white/40 text-xs font-mono uppercase tracking-wider mb-3">Today's Plan</p>
              <div className="space-y-2">
                {[{ label: "Data Structures — Chapter 5", done: true }, { label: "Practice 3 LeetCode problems", done: true }, { label: "Review flashcards: Algorithms", done: false }].map((task) => (
                  <div key={task.label} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${task.done ? "border-violet-400 bg-violet-500/30" : "border-white/20"}`}>{task.done && <span className="text-violet-300 text-[8px]">✓</span>}</div>
                    <p className={`text-xs ${task.done ? "text-white/30 line-through" : "text-white/70"}`}>{task.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-indigo-400/30 bg-indigo-500/10 backdrop-blur-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-white/40 text-xs font-mono uppercase tracking-wider">Focus Room</p>
                <p className="text-white text-xl font-semibold mt-1">24:00</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <p className="text-indigo-300 text-xs font-mono">Active Session</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* PROBLEM */}
        <motion.section className="space-y-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {problemStats.map((stat) => (
              <div key={stat.value} className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-8 text-center" style={{ boxShadow: "0 0 40px rgba(139,92,246,0.07)" }}>
                <p className="text-5xl md:text-6xl font-semibold text-white mb-3">{stat.value}</p>
                <p className="text-white/55 text-sm leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">The Problem</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-white leading-snug">The Modern Learning Experience Is Fragmented</h2>
            </div>
            <div className="space-y-4 text-white/70 text-sm md:text-base leading-relaxed">
              <p>Students juggle notes apps, schedulers, flashcard tools, tutorial platforms, and productivity timers — none of which talk to each other. The result is context-switching fatigue and zero personalisation.</p>
              <p>Without a unified system, accountability breaks down, progress is invisible, and engagement fades. The barrier to effective learning isn't content — it's fragmentation.</p>
            </div>
          </div>
        </motion.section>

        {/* SOLUTION */}
        <motion.section className="space-y-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">The Solution</p>
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-white">An Intelligent Learning Ecosystem</h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">Edura unifies AI tutoring, planning, collaboration, revision, analytics, and immersive focus into one cohesive platform — so students never have to leave their learning environment.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutionPillars.map((pillar) => (
              <div key={pillar.title} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5 hover:border-violet-400/40 transition-colors duration-300">
                <h3 className="text-white font-semibold mb-2">{pillar.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CORE FEATURES */}
        <motion.section className="space-y-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Core Features</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white">Built for the Entire Learning Journey</h2>
            <p className="text-white/60 text-sm md:text-base">Every feature serves a specific need in a student's day — from morning planning to late-night revision.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreFeatures.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5 hover:border-violet-400/30 transition-colors duration-300">
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* TECH STACK */}
        <motion.section className="space-y-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Tech Stack</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white">Full-Stack AI Learning Infrastructure</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {eduraTech.map((tech) => (
              <span key={tech} className="text-sm px-4 py-2 rounded-full bg-white/10 text-white/80 border border-white/20 font-mono hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-200 transition-all duration-200">{tech}</span>
            ))}
          </div>
        </motion.section>

        {/* HOW IT WORKS */}
        <motion.section className="space-y-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white">How Edura Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {howItWorks.slice(0, 3).map((step) => (
              <div key={step.step} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5">
                <p className="text-xs font-mono text-violet-400/70 mb-3 tracking-[0.2em]">{step.step}</p>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto w-full">
            {howItWorks.slice(3).map((step) => (
              <div key={step.step} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5">
                <p className="text-xs font-mono text-violet-400/70 mb-3 tracking-[0.2em]">{step.step}</p>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PROGRESS INTELLIGENCE */}
        <motion.section className="space-y-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Progress Intelligence</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-white">Data-Driven Learning Progress</h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">Edura transforms every study session into measurable progress. Students see exactly how they're improving — and where to focus next.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {progressFeatures.map((item) => (
                <div key={item.metric} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5" style={{ boxShadow: "0 0 30px rgba(139,92,246,0.06)" }}>
                  <h3 className="text-white font-semibold mb-2">{item.metric}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* IMMERSIVE EXPERIENCE */}
        <motion.section className="space-y-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Immersive Learning</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white">Beyond Traditional Study Tools</h2>
            <p className="text-white/60 text-sm md:text-base">Edura creates environments that make learning feel natural, focused, and collaborative.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {immersiveCards.map((card) => (
              <div key={card.title} className={`rounded-3xl border ${card.border} bg-gradient-to-br ${card.gradient} backdrop-blur-lg p-6 space-y-4`}>
                <span className={`text-xs font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full border w-fit inline-block ${card.tagColor}`}>{card.tag}</span>
                <h3 className="text-white font-semibold text-lg">{card.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ARCHITECTURE */}
        <motion.section className="space-y-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Architecture</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white">System Architecture</h2>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_0_40px_rgba(139,92,246,0.12)]">
            <img src="/edura-architecture.png" alt="Edura System Architecture" className="w-full rounded-2xl border border-white/10 hover:scale-[1.01] transition-transform duration-300" />
            <p className="text-white/50 text-sm mt-3 text-center">System Architecture</p>
          </div>
        </motion.section>

        {/* LIVE PREVIEW */}
        <motion.section className="space-y-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Live Preview</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-white">Experience Edura</h2>
          </div>
          <div className="rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(139,92,246,0.15)]">
            <iframe title="Edura Live Preview" src="https://edura-geminihack.vercel.app/" className="w-full h-[650px]" loading="lazy" />
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section className="flex flex-col items-center gap-5 text-center" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <h2 className="text-3xl md:text-4xl font-semibold text-white max-w-2xl leading-snug">Education Should Adapt to the Student — Not the Other Way Around.</h2>
          <p className="text-white/60 text-sm md:text-base max-w-2xl">Edura combines AI, productivity, collaboration, and immersive learning into one intelligent platform.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://edura-geminihack.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/20 border border-violet-400/40 text-violet-200 text-sm font-mono hover:bg-violet-500/30 transition-all">View Live Project →</a>
            <a href="https://github.com/apurvakhangal/edura" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-mono hover:text-white transition-all">View GitHub →</a>
          </div>
        </motion.section>

      </ProjectPageShell>
    );
  }

  if (project.slug === "burger-king-redesign") {
    const {
      overviewCards,
      keyAdditions,
      userStruggles,
      researchBlocks,
      personas,
      journeyStages,
      insights,
      designSolutions,
      designScreens,
      wireframeNotes,
      impactPoints,
      learningPoints,
    } = BURGER_KING_CASE_STUDY;

    const prototypeUrl = project.links?.demo;
    const prototypeEmbedUrl = prototypeUrl
      ? `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(prototypeUrl)}`
      : "about:blank";

    return (
      <ProjectPageShell
        progress={progress}
        mainClassName="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 pb-24 gap-16"
      >
            <motion.section
              className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <button
                  type="button"
                  onClick={() => navigate("/projects")}
                  className="inline-flex items-center gap-2 text-sm font-mono text-white/60 hover:text-white transition-colors w-fit"
                >
                  <span className="text-lg">←</span>
                  <span>Back to Projects</span>
                </button>

                <div className="space-y-4">
                  <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full border bg-orange-500/15 text-orange-200 border-orange-400/40 w-fit">
                    UI / UX
                  </span>
                  <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
                    Burger King App Redesign
                  </h1>
                  <p className="text-white/70 text-base md:text-lg max-w-2xl">
                    Enhancing user experience through cleaner design, better navigation, and smarter interactions.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {prototypeUrl ? (
                    <a
                      href={prototypeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-100 text-sm font-mono hover:bg-orange-500/30 transition-all"
                    >
                      View Prototype →
                    </a>
                  ) : null}
                  <a
                    href="#case-study"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-mono hover:text-white transition-all"
                  >
                    Scroll to Case Study ↓
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-500/20 blur-3xl" />
                <div className="rounded-[2.75rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 shadow-[0_0_40px_rgba(248,113,113,0.2)] max-w-[324px] mx-auto">
                  <div className="rounded-[2.5rem] border border-white/10 bg-black/60 p-2">
                    <div className="relative rounded-[2.25rem] border border-white/10 bg-black aspect-[9/19] overflow-hidden">
                      <img
                        src="/uiux/home.png"
                        alt="Burger King redesign home screen"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2.5 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              id="case-study"
              className="space-y-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Project Overview</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">A clearer, faster ordering experience</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {overviewCards.map((card, i) => {
                  const accent = i === 0 ? "border-orange-400/40 bg-orange-500/5" : i === 1 ? "border-red-400/30 bg-red-500/5" : "border-emerald-400/30 bg-emerald-500/5";
                  const labelColor = i === 0 ? "text-orange-300" : i === 1 ? "text-red-300" : "text-emerald-300";
                  return (
                    <div key={card.title} className={`rounded-2xl border ${accent} backdrop-blur-lg p-5`}>
                      <p className={`text-xs font-mono uppercase tracking-widest mb-2 ${labelColor}`}>{card.title}</p>
                      <p className="text-white/70 text-sm leading-relaxed">{card.description}</p>
                    </div>
                  );
                })}
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-lg p-6">
                <p className="text-white/60 text-xs font-mono uppercase tracking-[0.2em] mb-3">Key Additions</p>
                <div className="flex flex-wrap gap-3">
                  {keyAdditions.map((item) => (
                    <span key={item} className="text-xs px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-200 border border-orange-400/30 font-mono">
                      + {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">The Problem</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">What users struggle with</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userStruggles.map((item) => (
                  <div key={item} className="rounded-2xl border border-red-400/20 bg-red-500/5 backdrop-blur-lg p-4 flex items-start gap-3">
                    <span className="text-red-400 text-base mt-0.5 flex-shrink-0">✕</span>
                    <p className="text-white/75 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Research</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Listening to real user feedback</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {researchBlocks.map((block) => (
                  <div
                    key={block.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5"
                  >
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-orange-200/70 mb-2">
                      {block.title}
                    </p>
                    <h3 className="text-white font-semibold mb-2">{block.label}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{block.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">User Personas</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Three core user types</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {personas.map((persona, i) => {
                  const avatarBorder = ["border-orange-400/30", "border-blue-400/30", "border-emerald-400/30"][i];
                  const avatarBg = ["bg-orange-500/10", "bg-blue-500/10", "bg-emerald-500/10"][i];
                  const avatarSvgs = [
                    // Benny – student with glasses
                    <svg key="benny" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="40" cy="84" rx="22" ry="12" fill="#ea580c" opacity="0.85"/>
                      <rect x="35" y="70" width="10" height="10" rx="5" fill="#fde8c8"/>
                      <circle cx="40" cy="47" r="24" fill="#fde8c8"/>
                      <path d="M16 41 Q20 18 40 16 Q60 18 64 41 Q58 26 40 24 Q22 26 16 41Z" fill="#7c3a10"/>
                      <rect x="19" y="43" width="16" height="12" rx="5" stroke="#1f2937" strokeWidth="2.2" fill="rgba(200,220,255,0.2)"/>
                      <rect x="45" y="43" width="16" height="12" rx="5" stroke="#1f2937" strokeWidth="2.2" fill="rgba(200,220,255,0.2)"/>
                      <line x1="35" y1="49" x2="45" y2="49" stroke="#1f2937" strokeWidth="2.2"/>
                      <circle cx="27" cy="49" r="2.8" fill="#1f2937"/>
                      <circle cx="53" cy="49" r="2.8" fill="#1f2937"/>
                      <circle cx="28.2" cy="47.8" r="1.1" fill="white"/>
                      <circle cx="54.2" cy="47.8" r="1.1" fill="white"/>
                      <path d="M39 58 Q40 60 41 58" stroke="#d4a574" strokeWidth="1.5" fill="none"/>
                      <path d="M32 64 Q40 71 48 64" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round"/>
                      <ellipse cx="25" cy="59" rx="5" ry="3" fill="#fca5a5" opacity="0.5"/>
                      <ellipse cx="55" cy="59" rx="5" ry="3" fill="#fca5a5" opacity="0.5"/>
                    </svg>,
                    // Nate – tired night-owl in hoodie
                    <svg key="nate" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 90 Q18 74 40 74 Q62 74 62 90Z" fill="#1e3a5f" opacity="0.9"/>
                      <rect x="35" y="67" width="10" height="10" rx="5" fill="#fde8c8"/>
                      <circle cx="40" cy="47" r="24" fill="#fde8c8"/>
                      <path d="M16 43 Q15 20 40 17 Q65 20 64 43 Q60 23 55 26 Q50 16 40 16 Q30 16 25 26 Q20 23 16 43Z" fill="#1f2937"/>
                      <ellipse cx="30" cy="48" rx="7" ry="5" fill="white" stroke="#1f2937" strokeWidth="1.5"/>
                      <ellipse cx="30" cy="49.5" rx="6" ry="3" fill="#1f2937"/>
                      <ellipse cx="50" cy="48" rx="7" ry="5" fill="white" stroke="#1f2937" strokeWidth="1.5"/>
                      <ellipse cx="50" cy="49.5" rx="6" ry="3" fill="#1f2937"/>
                      <path d="M23 44.5 Q30 42 37 44.5" stroke="#1f2937" strokeWidth="2" fill="none"/>
                      <path d="M43 44.5 Q50 42 57 44.5" stroke="#1f2937" strokeWidth="2" fill="none"/>
                      <ellipse cx="30" cy="53" rx="8" ry="3" fill="#93c5fd" opacity="0.22"/>
                      <ellipse cx="50" cy="53" rx="8" ry="3" fill="#93c5fd" opacity="0.22"/>
                      <path d="M39 58 Q40 60 41 58" stroke="#d4a574" strokeWidth="1.5" fill="none"/>
                      <path d="M33 64 Q40 62 47 64" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>,
                    // Krit – sporty with ponytail
                    <svg key="krit" viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="40" cy="84" rx="22" ry="12" fill="#16a34a" opacity="0.85"/>
                      <rect x="35" y="70" width="10" height="10" rx="5" fill="#fde8c8"/>
                      <circle cx="40" cy="47" r="24" fill="#fde8c8"/>
                      <path d="M16 42 Q18 18 40 16 Q62 18 64 42 Q60 24 40 22 Q20 24 16 42Z" fill="#92400e"/>
                      <ellipse cx="63" cy="27" rx="8" ry="6" fill="#92400e"/>
                      <path d="M61 33 Q70 40 66 50" stroke="#92400e" strokeWidth="5" strokeLinecap="round"/>
                      <path d="M16 40 Q40 33 64 40" stroke="#15803d" strokeWidth="5" strokeLinecap="round"/>
                      <ellipse cx="30" cy="48" rx="6" ry="6.5" fill="white" stroke="#1f2937" strokeWidth="1.5"/>
                      <circle cx="31" cy="48" r="3.5" fill="#1f2937"/>
                      <circle cx="32" cy="46.5" r="1.2" fill="white"/>
                      <ellipse cx="50" cy="48" rx="6" ry="6.5" fill="white" stroke="#1f2937" strokeWidth="1.5"/>
                      <circle cx="51" cy="48" r="3.5" fill="#1f2937"/>
                      <circle cx="52" cy="46.5" r="1.2" fill="white"/>
                      <path d="M39 57 Q40 59 41 57" stroke="#d4a574" strokeWidth="1.5" fill="none"/>
                      <path d="M30 63 Q40 72 50 63" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                      <ellipse cx="22" cy="57" rx="6" ry="3.5" fill="#fca5a5" opacity="0.6"/>
                      <ellipse cx="58" cy="57" rx="6" ry="3.5" fill="#fca5a5" opacity="0.6"/>
                    </svg>,
                  ];
                  return (
                    <div key={persona.name} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5">
                      <div className={`w-24 h-24 rounded-2xl border ${avatarBorder} ${avatarBg} mx-auto mb-3 flex items-center justify-center overflow-hidden p-1`}>
                        {avatarSvgs[i]}
                      </div>
                      <div className="text-center mb-4">
                        <h3 className="text-white font-semibold text-sm">{persona.name}</h3>
                        <p className="text-white/45 text-xs">{persona.role}</p>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400/70 mb-2">Goals</p>
                          <ul className="text-white/70 text-sm space-y-1">
                            {persona.goals.map((goal: string) => (
                              <li key={goal} className="flex items-start gap-2"><span className="text-emerald-400 mt-0.5 flex-shrink-0">›</span>{goal}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-mono uppercase tracking-[0.2em] text-red-400/70 mb-2">Pain Points</p>
                          <ul className="text-white/70 text-sm space-y-1">
                            {persona.painPoints.map((pain: string) => (
                              <li key={pain} className="flex items-start gap-2"><span className="text-red-400 mt-0.5 flex-shrink-0">›</span>{pain}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Experience Mapping</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Journey pain points across the flow</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {journeyStages.map((stage, i) => (
                  <div key={stage.stage} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-white/30">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="text-white font-semibold">{stage.stage}</h3>
                    </div>
                    <p className="text-white/60 text-sm mb-3 leading-relaxed">{stage.detail}</p>
                    <div className="flex items-start gap-2 rounded-xl bg-orange-500/8 border border-orange-400/20 px-3 py-2">
                      <span className="text-orange-400 text-xs mt-0.5 flex-shrink-0">!</span>
                      <p className="text-orange-200/80 text-xs leading-relaxed">{stage.pain}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">UX Insights</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Validated themes from research</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {insights.map((item) => (
                  <span key={item} className="text-sm px-4 py-2 rounded-full bg-orange-500/10 text-orange-200 border border-orange-400/25 font-mono">{item}</span>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="rounded-2xl border border-red-400/30 bg-red-500/5 backdrop-blur-lg p-6">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-red-300/70 mb-3">Problem Statement</p>
                <h3 className="text-white font-semibold mb-2">The current app creates confusion and friction.</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  A cluttered interface and inconsistent navigation slow users down and reduce confidence during ordering.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/5 backdrop-blur-lg p-6">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-300/70 mb-3">Goal</p>
                <h3 className="text-white font-semibold mb-2">Deliver a smooth, intuitive experience.</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Make discovery, customization, and tracking feel effortless with clear structure and personalization.
                </p>
              </div>
            </motion.section>

            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Design Solution</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">How we solved it</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {designSolutions.map((item) => (
                  <div key={item} className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 backdrop-blur-lg p-4 flex items-start gap-3">
                    <span className="text-emerald-400 text-base mt-0.5 flex-shrink-0">✓</span>
                    <p className="text-white/75 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              id="design-screens"
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Design Screens</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Core UI moments</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designScreens.map((screen) => (
                  <div
                    key={screen.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5 space-y-4"
                  >
                    <div className="rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-orange-500/15 via-white/5 to-red-500/10 p-3 w-[90%] mx-auto">
                      <div className="rounded-[2rem] border border-white/10 bg-black/60 p-2">
                        <div className="relative rounded-[1.75rem] border border-white/10 bg-black aspect-[9/19] overflow-hidden">
                          <img
                            src={screen.image}
                            alt={screen.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-2 rounded-full bg-white/10" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">{screen.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{screen.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Wireframes</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Mapping the full flow</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wireframeNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5"
                  >
                    <p className="text-white/70 text-sm leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Final Impact</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Results that improve the experience</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {impactPoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-4"
                  >
                    <p className="text-white/70 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Learnings</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">What this project reinforced</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {learningPoints.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-4"
                  >
                    <p className="text-white/70 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Tools</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Design toolkit</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tool) => (
                  <span
                    key={tool}
                    className="text-sm px-4 py-2 rounded-full bg-white/10 text-white/80 border border-white/20 font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Case Study Video</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Watch the redesign flow</h2>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-lg p-4 shadow-[0_0_40px_rgba(248,113,113,0.15)]">
                <div className="max-w-[324px] mx-auto">
                  <div className="rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-orange-500/15 via-white/5 to-red-500/10 p-3">
                    <div className="rounded-[2rem] border border-white/10 bg-black/60 p-2">
                      <div className="relative rounded-[1.75rem] border border-white/10 bg-black aspect-[9/19] overflow-hidden">
                        <video
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                          preload="metadata"
                        >
                          <source src="/uiux/BK-Video.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-2 rounded-full bg-white/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              id="prototype"
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Prototype</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Explore the interactive flow</h2>
              </div>
              <div className="rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_40px_rgba(248,113,113,0.15)]">
                <iframe
                  title="Burger King Redesign Prototype"
                  src={prototypeEmbedUrl}
                  className="w-full h-[600px]"
                  loading="lazy"
                />
              </div>
            </motion.section>

            <motion.section
              className="flex flex-col items-center gap-4 text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-white">
                Designed to make ordering faster, simpler, and more enjoyable
              </h2>
              <p className="text-white/60 text-sm md:text-base max-w-2xl">
                A premium UX case study focused on clarity, speed, and personalization.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {prototypeUrl ? (
                  <a
                    href={prototypeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-100 text-sm font-mono hover:bg-orange-500/30 transition-all"
                  >
                    View Prototype →
                  </a>
                ) : null}
                <a
                  href="#design-screens"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-mono hover:text-white transition-all"
                >
                  View Full Design ↓
                </a>
              </div>
            </motion.section>
      </ProjectPageShell>
    );
  }

  return (
    <ProjectPageShell
      progress={progress}
      mainClassName="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 pb-24 gap-12"
    >
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
    </ProjectPageShell>
  );
};

export default ProjectDetailPage;
