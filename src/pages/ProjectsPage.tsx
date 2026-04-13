import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { NeuralScene } from "@/components/neural/NeuralScene";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GlowCursorTrail } from "@/components/ui/GlowCursorTrail";
import { Navbar } from "@/components/ui/Navbar";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { projects, type Project } from "@/data/projects";

function ProjectsExperience() {
  const navigate = useNavigate();
  const { progress } = useScrollProgress();
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const overlayOpacity = useTransform(scrollY, [200, 400], [0, 1], { clamp: true });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const;

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  type Filter = "All" | "AI" | "Web" | "ML";
  type Tag = Exclude<Filter, "All">;

  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    const tags = project.tags ?? [];
    return tags.includes(activeFilter as Tag);
  });

  const ProjectGridCard = ({ project }: { project: Project }) => (
    <motion.article
      variants={cardVariants}
      className="w-full h-full"
      onMouseEnter={() => setHoveredId(project.id)}
      onMouseLeave={() => setHoveredId(null)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div
        className={`relative w-full h-full rounded-3xl bg-white/[0.08] backdrop-blur-xl border p-8 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 ${
          hoveredId === project.id ? "border-blue-400/60" : "border-white/10"
        }`}
        style={{
          boxShadow:
            hoveredId === project.id
              ? "0 0 50px rgba(96, 165, 250, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
              : "inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} transition-opacity duration-300 -z-10`}
          style={{ opacity: hoveredId === project.id ? 0.2 : 0 }}
        />

        {/* Glow effect background */}
        <div
          className={`absolute -inset-0.5 bg-gradient-to-br ${project.color} rounded-3xl -z-20 blur-lg transition-opacity duration-300`}
          style={{ opacity: hoveredId === project.id ? 0.25 : 0 }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div
              className="inline-block text-xs font-mono text-blue-300 uppercase tracking-[0.15em] mb-6 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 transition-all duration-300"
              style={{
                opacity: hoveredId === project.id ? 1 : 0.7,
                transform: hoveredId === project.id ? "translateY(-6px)" : "translateY(0)",
              }}
            >
              {project.category}
            </div>

            <h3
              className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight transition-transform duration-300"
              style={{
                transform: hoveredId === project.id ? "translateY(-6px)" : "translateY(0)",
              }}
            >
              {project.title}
            </h3>

            <p
              className="text-white/80 text-sm leading-relaxed transition-all duration-300 mb-4"
              style={{
                opacity: hoveredId === project.id ? 1 : 0.8,
                transform: hoveredId === project.id ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              {project.fullDescription}
            </p>

            {project.features?.length ? (
              <ul className="text-white/60 text-xs md:text-sm space-y-1 mb-6 list-disc list-inside">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            ) : null}
          </div>

          <div>
            <div className="mb-6">
              <p className="text-xs font-mono text-white/50 uppercase tracking-widest mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-white/80 border border-white/20 font-mono transition-all duration-300 hover:bg-white/20 hover:border-blue-400/50 hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={project.links?.demo || project.links?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-300 font-mono text-sm transition-all duration-300 hover:text-blue-200"
              style={{
                opacity: hoveredId === project.id ? 1 : 0.6,
                transform: hoveredId === project.id ? "translateX(8px)" : "translateX(0)",
              }}
            >
              <span>Explore Project</span>
              <span
                style={{
                  display: "inline-block",
                  transition: "transform 0.3s",
                  transform: hoveredId === project.id ? "translateX(4px)" : "translateX(0)",
                }}
              >
                
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );

  return (
    <div className="flex flex-col w-full">
      <CustomCursor mousePosition={mousePosition} />
      <GlowCursorTrail />
      <Navbar />
      <ScrollProgressBar progress={progress} />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralScene scrollProgress={progress} mousePosition={mousePosition} />
      </div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="fixed top-0 left-0 right-0 h-[160px] z-30 pointer-events-none bg-[#111625]"
      />

      <div className="relative z-10 w-full mt-[160px]">
        <main className="flex flex-col min-h-screen px-4 md:px-12 lg:px-24 pb-24">
          {/* Top section / header */}
          <motion.div
            className="mb-12 md:mb-16 flex flex-col gap-4 md:gap-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-sm font-mono text-white/60 hover:text-white transition-colors w-fit"
            >
              <span className="text-lg">←</span>
              <span>Back to Home</span>
            </button>

            <div className="space-y-4 mt-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
                // Projects
              </h1>
              <p className="text-white/70 text-base md:text-lg max-w-2xl">
                A collection of my work across AI, systems, and full-stack development.
              </p>
            </div>
          </motion.div>

          {/* Filter tabs */}
          <div className="mb-10 flex flex-wrap gap-3">
            {["All", "AI", "Web", "ML"].map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter as Filter)}
                  className={`px-4 py-1.5 rounded-full border text-xs font-mono tracking-[0.16em] uppercase transition-all duration-300 ${
                    isActive
                      ? "border-blue-400 bg-blue-500/20 text-blue-200 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                      : "border-white/15 bg-white/5 text-white/60 hover:border-blue-400/60 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Projects grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {filteredProjects.map((project) => (
              <ProjectGridCard key={project.id} project={project} />
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

const ProjectsPage = () => {
  return <ProjectsExperience />;
};

export default ProjectsPage;
