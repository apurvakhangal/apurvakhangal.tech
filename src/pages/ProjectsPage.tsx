import { memo, useCallback, useMemo, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ProjectPageShell } from "@/components/layout/ProjectPageShell";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { projects, type Project } from "@/data/projects";

const FILTERS = ["All", "AI", "Web", "ML", "UI/UX"] as const;

type Filter = (typeof FILTERS)[number];
type Tag = Exclude<Filter, "All">;

const ProjectGridCard = memo(function ProjectGridCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (slug: string) => void;
}) {
  const isUiUx = project.category === "UI / UX";
  const badgeClass = isUiUx
    ? "bg-purple-500/20 text-purple-300 border-purple-400/40"
    : "bg-blue-500/10 text-blue-300 border-blue-400/30";
  const ctaText = isUiUx ? "View Case Study" : "Explore Project";

  const handleSelect = useCallback(() => onSelect(project.slug), [onSelect, project.slug]);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleSelect();
      }
    },
    [handleSelect],
  );
  const handleButtonClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      handleSelect();
    },
    [handleSelect],
  );

  return (
    <motion.article
      className="group w-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      style={{ willChange: "transform" }}
    >
      <div className="relative w-full h-[460px] rounded-3xl bg-white/[0.05] backdrop-blur-lg border border-white/10 p-8 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 group-hover:border-blue-400/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_50px_rgba(96,165,250,0.35),inset_0_1px_0_rgba(255,255,255,0.1)]">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} transition-opacity duration-300 -z-10 opacity-0 group-hover:opacity-20`}
        />
        <div
          className={`absolute -inset-0.5 bg-gradient-to-br ${project.color} rounded-3xl -z-20 blur-lg transition-opacity duration-300 opacity-0 group-hover:opacity-25`}
        />
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div
              className={`inline-block text-xs font-mono uppercase tracking-[0.15em] mb-5 px-3 py-1 rounded-full border transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:-translate-y-1 ${badgeClass}`}
            >
              {project.category}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight transition-transform duration-300 group-hover:-translate-y-1 min-h-[72px]">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed transition-all duration-300 mb-4 line-clamp-4 min-h-[110px] group-hover:-translate-y-1">
              {project.fullDescription}
            </p>
          </div>
          <div>
            <div className="mb-6">
              <p className="text-xs font-mono text-white/50 uppercase tracking-widest mb-3">Tech Stack</p>
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
            <button
              type="button"
              onClick={handleButtonClick}
              className="inline-flex items-center gap-2 text-blue-300 font-mono text-sm transition-all duration-300 hover:text-blue-200 opacity-70 group-hover:opacity-100 group-hover:translate-x-2"
            >
              <span>{ctaText}</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

function ProjectsExperience() {
  const navigate = useNavigate();
  const { progress } = useScrollProgress();
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.tags?.includes(activeFilter as Tag));
  }, [activeFilter]);

  const handleSelectProject = useCallback(
    (slug: string) => {
      navigate(`/projects/${slug}`);
    },
    [navigate],
  );

  return (
    <ProjectPageShell
      progress={progress}
      mainClassName="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 pb-40 gap-10"
    >
      <motion.section
        className="flex flex-col gap-4 md:gap-5"
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

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            // Projects
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl">
            A collection of my work across AI, systems, and full-stack development.
          </p>
        </div>
      </motion.section>

      <section className="flex flex-wrap gap-3">
        {FILTERS.map((filter) => {
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
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch relative z-20">
        {filteredProjects.map((project, index) => (
          <ProjectGridCard
            key={project.id}
            project={project}
            index={index}
            onSelect={handleSelectProject}
          />
        ))}
      </section>
      <div aria-hidden="true" className="h-10" />
    </ProjectPageShell>
  );
}

const ProjectsPage = () => {
  return <ProjectsExperience />;
};

export default ProjectsPage;
