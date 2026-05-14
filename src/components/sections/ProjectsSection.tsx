import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { projects, type Project } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export function ProjectsSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);
  const contextRef = useRef<gsap.Context | null>(null);
  const initializationRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Setup ScrollTrigger once and only once - no flickering
  useLayoutEffect(() => {
    // Skip if already initialized or on mobile
    if (initializationRef.current || isMobile) return;

    if (trackRef.current && sectionRef.current) {
      initializationRef.current = true;
      isMobileRef.current = isMobile;

      const ctx = gsap.context(() => {
        const track = trackRef.current;
        const section = sectionRef.current;

        if (!track || !section) return;

        // Calculate exact horizontal scroll distance
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = Math.max(0, trackWidth - viewportWidth);

        // STABLE FIX: Set a capped, reasonable section height
        // - Allows animation to complete without overlap
        // - Prevents enormous page height
        // - Uses proportional scaling capped at 1800px max extra height
        const maxExtraHeight = 1800;
        const extraHeight = Math.min(scrollDistance, maxExtraHeight);
        section.style.height = `calc(100vh + ${extraHeight}px)`;

        // Animate the track's translateX based on scroll
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

  // Check mobile separately - this triggers re-render but doesn't reinit ScrollTrigger
  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobileRef.current) {
        isMobileRef.current = newIsMobile;
        setIsMobile(newIsMobile);

        // Kill ScrollTrigger if transitioning to mobile
        if (newIsMobile && contextRef.current) {
          contextRef.current.revert();
          contextRef.current = null;
          initializationRef.current = false;
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ProjectCard component - CLEAN VERSION - no animations except hover
  const ProjectCard = ({ project }: { project: Project }) => {
    return (
      <div
        onMouseEnter={() => setHoveredId(project.id)}
        onMouseLeave={() => setHoveredId(null)}
        className="flex-shrink-0 w-full h-full"
      >
        {/* Card Container with glass effect */}
        <div
          className={`relative w-full h-full rounded-3xl bg-white/[0.08] backdrop-blur-xl border p-8 overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 ${
            hoveredId === project.id ? 'border-blue-400/60' : 'border-white/10'
          }`}
          onClick={() => navigate(`/projects/${project.slug}`)}
          style={{
            boxShadow:
              hoveredId === project.id
                ? '0 0 50px rgba(96, 165, 250, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                : 'inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.color} transition-opacity duration-300 -z-10`}
            style={{
              opacity: hoveredId === project.id ? 0.2 : 0,
            }}
          />

          {/* Glow effect background */}
          <div
            className={`absolute -inset-0.5 bg-gradient-to-br ${project.color} rounded-3xl -z-20 blur-lg transition-opacity duration-300`}
            style={{
              opacity: hoveredId === project.id ? 0.25 : 0,
            }}
          />

          {/* Content Container */}
          <div className="relative z-10 flex flex-col h-full justify-between">
            {/* Top Content */}
            <div>
              {/* Category Badge */}
              <div
                className="inline-block text-xs font-mono text-blue-300 uppercase tracking-[0.15em] mb-6 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 transition-all duration-300"
                style={{
                  opacity: hoveredId === project.id ? 1 : 0.7,
                  transform: hoveredId === project.id ? 'translateY(-6px)' : 'translateY(0)',
                }}
              >
                {project.category}
              </div>

              {/* Title */}
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight transition-transform duration-300"
                style={{
                  transform: hoveredId === project.id ? 'translateY(-6px)' : 'translateY(0)',
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                className="text-white/70 text-sm leading-relaxed transition-all duration-300 mt-3 mb-6 line-clamp-3"
                style={{
                  opacity: hoveredId === project.id ? 1 : 0.75,
                  transform: hoveredId === project.id ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {project.shortDescription}
              </p>
            </div>

            {/* Bottom Content */}
            <div>
              {/* Tech Stack */}
              <div className="mb-8">
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

              {/* Explore Arrow */}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(`/projects/${project.slug}`);
                }}
                className="inline-flex items-center gap-2 text-blue-300 font-mono text-sm transition-all duration-300 hover:text-blue-200"
                style={{
                  opacity: hoveredId === project.id ? 1 : 0.6,
                  transform: hoveredId === project.id ? 'translateX(8px)' : 'translateX(0)',
                }}
              >
                <span>Explore Project</span>
                <span
                  style={{
                    display: 'inline-block',
                    transition: 'transform 0.3s',
                    transform: hoveredId === project.id ? 'translateX(4px)' : 'translateX(0)',
                  }}
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // CTA Card Component - CLEAN VERSION
  const CTACard = () => (
    <button
      type="button"
      className="flex-shrink-0 w-[420px] h-[435px] block no-underline"
      onClick={() => navigate("/projects")}
    >
      <div
        className="relative w-full h-full rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-blue-400/50 p-8 overflow-hidden flex flex-col justify-center items-center text-center cursor-pointer hover:border-blue-300/80 transition-all duration-300"
        style={{
          boxShadow: '0 0 50px rgba(96, 165, 250, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl opacity-0 hover:opacity-20 -z-20 blur-lg transition-opacity duration-300" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-center items-center text-center">
          <div className="mb-8">
            <p className="text-xs font-mono text-blue-300 uppercase tracking-[0.15em] mb-4">
              Explore More
            </p>
            <h3 className="text-5xl font-bold text-white mb-6">
              View More Projects
            </h3>
            <p className="text-white/70 text-lg mb-8 max-w-xs">
              Discover more experiments, AI systems, and creative builds
            </p>
          </div>

          <div
            className="px-8 py-3 rounded-lg bg-blue-500/30 border border-blue-400/60 text-blue-200 font-mono text-sm uppercase tracking-widest hover:bg-blue-500/50 hover:border-blue-300/80 transition-all duration-300 hover:scale-105"
          >
            Explore All →
          </div>
        </div>
      </div>
    </button>
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-[#111625] scroll-mt-40"
      style={{
        height: isMobile ? 'auto' : '100vh',
        overflow: isMobile ? 'auto' : 'hidden',
      }}
    >
      {/* Desktop: Pinned horizontal scroll */}
      {!isMobile && (
        <div className="w-full h-full overflow-hidden relative">
          {/* Section Header */}
          <div className="absolute top-[96px] left-0 right-0 z-50 px-8 md:px-12 lg:px-24">
            <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
              // Projects
            </h2>
          </div>

          {/* Horizontal Scroll Track */}
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
                <ProjectCard project={project} />
              </div>
            ))}
            
            {/* CTA Card at the end */}
            <div className="w-[420px] h-[435px] flex-shrink-0">
              <CTACard />
            </div>
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#111625] to-transparent pointer-events-none z-30" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#111625] to-transparent pointer-events-none z-30" />

          {/* Scroll Hint */}
          <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center pointer-events-none z-40">
            <p className="text-white/50 text-sm font-mono">
              ↓ Scroll down to explore →
            </p>
          </div>
        </div>
      )}

      {/* Mobile: Vertical Stack */}
      {isMobile && (
        <div className="w-full px-4 py-12">
          {/* Mobile Header */}
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-white font-['Inter_Var'] tracking-tight mb-4">
              // Projects
            </h2>
            <p className="text-white/50 text-base">
              Explore my latest projects and innovations
            </p>
          </div>

          {/* Vertical Cards Stack */}
          <div className="flex flex-col gap-6 items-center">
            {projects.map((project, idx) => (
              <div key={project.id} className="h-[480px] w-full max-w-[480px]">
                <ProjectCard project={project} index={idx} />
              </div>
            ))}

            {/* Mobile CTA Card */}
            <button
              type="button"
              className="h-[480px] w-full max-w-[480px] block no-underline"
              onClick={() => navigate("/projects")}
            >
              <div
                className="relative w-full h-full rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-blue-400/50 p-8 overflow-hidden flex flex-col justify-center items-center text-center hover:border-blue-300/80 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: '0 0 50px rgba(96, 165, 250, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <h3 className="text-4xl font-bold text-white mb-4">
                  View More
                </h3>
                <p className="text-white/70 text-base mb-8">
                  Discover more AI systems and creative builds
                </p>
                <div
                  className="px-6 py-2 rounded-lg bg-blue-500/30 border border-blue-400/60 text-blue-200 font-mono text-sm uppercase tracking-widest hover:bg-blue-500/50 hover:border-blue-300/80 transition-all duration-300 hover:scale-105"
                >
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