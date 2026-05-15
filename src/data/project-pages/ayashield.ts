export const AYASHIELD_CONTENT = {
  solutionPillars: [
    { title: "Transparency",   description: "Every score exposes its exact formula and weights." },
    { title: "Explainability", description: "AI explains why risk exists, not just what it is." },
    { title: "Simulation",     description: "Model outcomes before committing capital." },
    { title: "Accessibility",  description: "Risk intelligence for everyone, not just quants." },
  ],
  keyFeatures: [
    { title: "Risk Intelligence Engine",  description: "Bloomberg-grade risk terminal with transparent scoring and confidence meters." },
    { title: "Scenario Simulation",       description: "Bull, neutral, bear, and crash multipliers for position outcomes." },
    { title: "Liquidity Modeling",        description: "Exit impact at $10k–$500k tiers with slippage projections." },
    { title: "AI Copilot",               description: "Structured explanations for risk drivers and mitigation steps." },
    { title: "Voice Assistant",           description: "Hands-free risk analysis with speech input/output." },
    { title: "Security Dashboard",        description: "Exploit tracking, attack type analytics, and incident insights." },
  ],
  techStack: ["React", "TypeScript", "Tailwind", "Zustand", "Express", "AI Layer", "Recharts", "Framer Motion"],
  howItWorks: [
    {
      title: "Weighted Risk Score",
      description: "Volatility, liquidity, contract, behavioral, and scam signals blend into a transparent weighted score.",
    },
    {
      title: "Scenario Multipliers",
      description: "Market conditions adjust the base score to reveal worst-case and best-case outcomes.",
    },
    {
      title: "Liquidity Impact",
      description: "Exit simulations model slippage at multiple capital tiers to reveal hidden risk.",
    },
  ],
} as const;
