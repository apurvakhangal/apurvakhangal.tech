import { useRef, useState, useLayoutEffect, useEffect, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { projects, type Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

// ─── Project Card ─────────────────────────────────────────────────────────────
// Defined outside ProjectsSection so it is never re-created on parent renders.

interface ProjectCardProps {
  project: Project;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}

const ProjectCard = memo(function ProjectCard({ project, hoveredId, onHover }: ProjectCardProps) {
  const navigate = useNavigate();
  const isHovered = hoveredId === project.id;

  const handleClick = useCallback(() => navigate(`/projects/${project.slug}`), [navigate, project.slug]);
  const handleEnter = useCallback(() => onHover(project.id), [onHover, project.id]);
  const handleLeave = useCallback(() => onHover(null), [onHover]);

  const handleButtonClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/projects/${project.slug}`);
  }, [navigate, project.slug]);

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="flex-shrink-0 w-full h-full"
    >
      <div
        className={`relative w-full h-full rounded-3xl bg-white/[0.08] backdrop-blur-xl border p-8 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 ${
          isHovered ? 'border-blue-400/60' : 'border-white/10'
        }`}
        onClick={handleClick}
        style={{
          boxShadow: isHovered
            ? '0 0 50px rgba(96,165,250,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            : 'inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} transition-opacity duration-300 -z-10`}
          style={{ opacity: isHovered ? 0.2 : 0 }}
        />
        {/* Glow effect */}
        <div
          className={`absolute -inset-0.5 bg-gradient-to-br ${project.color} rounded-3xl -z-20 blur-lg transition-opacity duration-300`}
          style={{ opacity: isHovered ? 0.25 : 0 }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Top */}
          <div>
            <div
              className="inline-block text-xs font-mono text-blue-300 uppercase tracking-[0.15em] mb-6 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 transition-all duration-300"
              style={{
                opacity: isHovered ? 1 : 0.7,
                transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
              }}
            >
              {project.category}
            </div>

            <h3
              className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight transition-transform duration-300"
              style={{ transform: isHovered ? 'translateY(-6px)' : 'translateY(0)' }}
            >
              {project.title}
            </h3>

            <p
              className="text-white/70 text-sm leading-relaxed transition-all duration-300 mt-3 mb-6 line-clamp-3"
              style={{
                opacity: isHovered ? 1 : 0.75,
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              {project.shortDescription}
            </p>
          </div>

          {/* Bottom */}
          <div>
            <div className="mb-8">
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
              className="inline-flex items-center gap-2 text-blue-300 font-mono text-sm transition-all duration-300 hover:text-blue-200"
              style={{
                opacity: isHovered ? 1 : 0.6,
                transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
              }}
            >
              <span>Explore Project</span>
              <span style={{ display: 'inline-block', transition: 'transform 0.3s', transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}>
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// ─── CTA Card ─────────────────────────────────────────────────────────────────

const CTA_BOX_SHADOW = '0 0 50px rgba(96,165,250,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';

const CTACard = memo(function CTACard({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="flex-shrink-0 w-[420px] h-[435px] block no-underline"
      onClick={onClick}
    >
      <div
        className="relative w-full h-full rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-blue-400/50 p-8 overflow-hidden flex flex-col justify-center items-center text-center cursor-pointer hover:border-blue-300/80 transition-all duration-300"
        style={{ boxShadow: CTA_BOX_SHADOW }}
      >
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl opacity-0 hover:opacity-20 -z-20 blur-lg transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col h-full justify-center items-center text-center">
          <div className="mb-8">
            <p className="text-xs font-mono text-blue-300 uppercase tracking-[0.15em] mb-4">Explore More</p>
            <h3 className="text-5xl font-bold text-white mb-6">View More Projects</h3>
            <p className="text-white/70 text-lg mb-8 max-w-xs">Discover more experiments, AI systems, and creative builds</p>
          </div>
          <div className="px-8 py-3 rounded-lg bg-blue-500/30 border border-blue-400/60 text-blue-200 font-mono text-sm uppercase tracking-widest hover:bg-blue-500/50 hover:border-blue-300/80 transition-all duration-300 hover:scale-105">
            Explore All →
          </div>
        </div>
      </div>
    </button>
  );
});

// ─── ProjectsSection ──────────────────────────────────────────────────────────

export function ProjectsSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);
  const contextRef = useRef<gsap.Context | null>(null);
  const initializationRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleNavigateProjects = useCallback(() => navigate("/projects"), [navigate]);

  // Setup ScrollTrigger once — no flickering
  useLayoutEffect(() => {
    if (initializationRef.current || isMobile) return;

    if (trackRef.current && sectionRef.current) {
      initializationRef.current = true;
      isMobileRef.current = isMobile;

      const ctx = gsap.context(() => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = Math.max(0, trackWidth - viewportWidth);

        const maxExtraHeight = 1800;
        const extraHeight = Math.min(scrollDistance, maxExtraHeight);
        section.style.height = `calc(100vh + ${extraHeight}px)`;

        gsap.to(track, {
          x: -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${extraHeight}`,
            scrub: true,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      contextRef.current = ctx;
    }

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
        contextRef.current = null;
      }
      initializationRef.current = false;
    };
  }, []);

  // Mobile breakpoint detection — separate effect so it doesn't re-init GSAP
  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobileRef.current) {
        isMobileRef.current = newIsMobile;
        setIsMobile(newIsMobile);
        if (newIsMobile && contextRef.current) {
          contextRef.current.revert();
          contextRef.current = null;
          initializationRef.current = false;
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-[#111625] scroll-mt-40"
      style={{ height: isMobile ? 'auto' : '100vh', overflow: isMobile ? 'auto' : 'hidden' }}
    >
      {/* Desktop — horizontal scroll */}
      {!isMobile && (
        <div className="w-full h-full overflow-hidden relative">
          <div className="absolute top-[96px] left-0 right-0 z-50 px-8 md:px-12 lg:px-24">
            <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
              // Projects
            </h2>
          </div>

          <div
            ref={trackRef}
            className="flex h-screen items-center"
            style={{
              gap: '100px',
              width: 'max-content',
              willChange: 'transform',
              paddingLeft: 'max(10vw, 120px)',
              paddingRight: 'max(10vw, 120px)',
              paddingTop: '96px',
              paddingBottom: '24px',
              boxSizing: 'border-box',
            }}
          >
            {projects.map((project) => (
              <div key={project.id} className="w-[420px] h-[435px] flex-shrink-0">
                <ProjectCard project={project} hoveredId={hoveredId} onHover={setHoveredId} />
              </div>
            ))}
            <div className="w-[420px] h-[435px] flex-shrink-0">
              <CTACard onClick={handleNavigateProjects} />
            </div>
          </div>

          {/* Edge gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#111625] to-transparent pointer-events-none z-30" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#111625] to-transparent pointer-events-none z-30" />

          <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center pointer-events-none z-40">
            <p className="text-white/50 text-sm font-mono">↓ Scroll down to explore →</p>
          </div>
        </div>
      )}

      {/* Mobile — vertical stack */}
      {isMobile && (
        <div className="w-full px-4 py-12">
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-white tracking-tight mb-4">
              // Projects
            </h2>
            <p className="text-white/50 text-base">Explore my latest projects and innovations</p>
          </div>

          <div className="flex flex-col gap-6 items-center">
            {projects.map((project) => (
              <div key={project.id} className="h-[480px] w-full max-w-[480px]">
                <ProjectCard project={project} hoveredId={hoveredId} onHover={setHoveredId} />
              </div>
            ))}

            {/* Mobile CTA */}
            <button
              type="button"
              className="h-[480px] w-full max-w-[480px] block no-underline"
              onClick={handleNavigateProjects}
            >
              <div
                className="relative w-full h-full rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-blue-400/50 p-8 overflow-hidden flex flex-col justify-center items-center text-center hover:border-blue-300/80 transition-all duration-300 cursor-pointer"
                style={{ boxShadow: CTA_BOX_SHADOW }}
              >
                <h3 className="text-4xl font-bold text-white mb-4">View More</h3>
                <p className="text-white/70 text-base mb-8">Discover more AI systems and creative builds</p>
                <div className="px-6 py-2 rounded-lg bg-blue-500/30 border border-blue-400/60 text-blue-200 font-mono text-sm uppercase tracking-widest hover:bg-blue-500/50 hover:border-blue-300/80 transition-all duration-300 hover:scale-105">
                  Explore All →
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}