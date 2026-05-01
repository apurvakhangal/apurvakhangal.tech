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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

  if (project.slug === "burger-king-redesign") {
    const overviewCards = [
      {
        title: "Goal",
        description:
          "Improve UX, navigation, and interface clarity for faster, simpler ordering.",
      },
      {
        title: "Problems",
        description:
          "Cluttered menus, confusing flows, weak CTAs, and limited personalization.",
      },
      {
        title: "Outcome",
        description:
          "A clean, intuitive experience with smarter discovery and ordering.",
      },
    ];

    const keyAdditions = [
      "Personalized home screen",
      "Hamburger menu navigation",
      "Crazy Deals section",
      "Improved store locator",
    ];

    const userStruggles = [
      "Cluttered UI that overwhelms new users",
      "Confusing navigation and inconsistent hierarchy",
      "Weak search and filtering for quick decisions",
      "Low-visibility CTAs during ordering",
      "Lack of personalization for returning users",
      "Order tracking that feels buried and unclear",
    ];

    const researchBlocks = [
      {
        title: "Primary Research",
        label: "Google Forms survey",
        description:
          "Focused on Gen Z users to validate core UX pain points and ordering behavior.",
      },
      {
        title: "Secondary Research",
        label: "App Store, Play Store, Reddit",
        description:
          "Real user reviews revealed consistent frustrations with navigation, speed, and clarity.",
      },
    ];

    const personas = [
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
    ];

    const journeyStages = [
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
    ];

    const insights = [
      "Confusing layout",
      "Unorganized menu",
      "Cluttered UI",
      "Lack of personalization",
      "Weak CTAs",
      "Poor search",
      "Order tracking issues",
    ];

    const designSolutions = [
      "Cleaner layout with stronger visual hierarchy",
      "Simplified navigation with a hamburger menu",
      "Reduced steps from discovery to checkout",
      "Improved visibility for offers and CTAs",
      "Personalized experiences on the home screen",
    ];

    const designScreens = [
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
    ];

    const wireframeNotes = [
      "Full user flow mapped from discovery to tracking.",
      "Iteration cycles focused on speed and clarity.",
      "Layout tests validated hierarchy before UI polish.",
    ];

    const impactPoints = [
      "Reduced cognitive load during browsing",
      "Faster ordering with fewer decision steps",
      "Cleaner UX for first-time and returning users",
      "Better engagement through personalized content",
    ];

    const learningPoints = [
      "UX is built on user behavior, not just visuals.",
      "Balance creativity with usability and speed.",
      "Small changes create measurable impact at scale.",
    ];

    const prototypeUrl = project.links?.demo;
    const prototypeEmbedUrl = prototypeUrl
      ? `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(prototypeUrl)}`
      : "about:blank";

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
                {overviewCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5"
                  >
                    <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{card.description}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-lg p-6">
                <p className="text-white/60 text-xs font-mono uppercase tracking-[0.2em] mb-3">Key Additions</p>
                <div className="flex flex-wrap gap-3">
                  {keyAdditions.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-white/80 border border-white/20 font-mono"
                    >
                      {item}
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
                {personas.map((persona) => (
                  <div
                    key={persona.name}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5"
                  >
                    <h3 className="text-white font-semibold">{persona.name}</h3>
                    <p className="text-white/50 text-sm mb-4">{persona.role}</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-2">Goals</p>
                        <ul className="text-white/70 text-sm space-y-1 list-disc list-inside">
                          {persona.goals.map((goal) => (
                            <li key={goal}>{goal}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-2">Pain Points</p>
                        <ul className="text-white/70 text-sm space-y-1 list-disc list-inside">
                          {persona.painPoints.map((pain) => (
                            <li key={pain}>{pain}</li>
                          ))}
                        </ul>
                      </div>
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
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">Experience Mapping</p>
                <h2 className="text-3xl md:text-4xl font-semibold text-white">Journey pain points across the flow</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {journeyStages.map((stage) => (
                  <div
                    key={stage.stage}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-5"
                  >
                    <h3 className="text-white font-semibold mb-2">{stage.stage}</h3>
                    <p className="text-white/60 text-sm mb-3">{stage.detail}</p>
                    <p className="text-white/70 text-sm">{stage.pain}</p>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {insights.map((item) => (
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
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-6">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-3">Problem Statement</p>
                <h3 className="text-white font-semibold mb-2">The current app creates confusion and friction.</h3>
                <p className="text-white/60 text-sm">
                  A cluttered interface and inconsistent navigation slow users down and reduce confidence during ordering.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-lg p-6">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-3">Goal</p>
                <h3 className="text-white font-semibold mb-2">Deliver a smooth, intuitive experience.</h3>
                <p className="text-white/60 text-sm">
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
