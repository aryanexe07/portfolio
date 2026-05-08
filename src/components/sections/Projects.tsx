'use client';

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { Github } from "@/components/ui/GithubIcon";
import { PROJECTS } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip, ScrollTrigger);
}

const FILTERS = ["All", "Interactive", "Systems", "Open Source", "Tools", "Experiments"];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS);

  // Initial scroll reveal
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelector('.projects-header'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", 
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  const handleFilter = (filter: string) => {
    if (filter === activeFilter) return;
    
    // Capture state
    const state = Flip.getState('.project-card');
    
    // Update state
    setActiveFilter(filter);
    const newFiltered = filter === "All" 
      ? PROJECTS 
      : PROJECTS.filter(p => p.category.includes(filter));
      
    // Needs a slight delay to let React DOM update before Flip animates
    requestAnimationFrame(() => {
      setFilteredProjects(newFiltered);
      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: 0.6,
          ease: "power3.inOut",
          stagger: 0.05,
          absolute: true,
          onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0.9}, {opacity: 1, scale: 1, duration: 0.4}),
          onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0.9, duration: 0.4})
        });
      });
    });
  };

  return (
    <section id="projects" ref={sectionRef} className="w-full max-w-[1280px] mx-auto px-6 sm:px-14 py-24">
      <div className="projects-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <h2 className="font-fraunces font-medium text-[clamp(28px,3vw,38px)] text-navy leading-[1.1]">
          Selected <span className="italic text-accent-blue font-light">works.</span>
        </h2>
        
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                activeFilter === f 
                  ? 'bg-navy text-white shadow-md' 
                  : 'bg-white/60 text-muted hover:bg-white/80 border border-mid-blue/30 backdrop-blur-md'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div 
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 relative group/grid"
      >
        {filteredProjects.map((project, i) => (
          <div 
            key={project.id}
            data-flip-id={project.id}
            className={`project-card group perspective-1000 ${i === 0 && activeFilter === "All" ? 'md:col-span-2' : ''}`}
          >
            {/* 3D Flip Container inner */}
            <div className="relative w-full h-[360px] md:h-[420px] transition-all duration-700 preserve-3d group-hover:rotate-y-180 group-hover/grid:[&:not(:hover)]:opacity-60 group-hover/grid:[&:not(:hover)]:blur-[1px]">
              
              {/* Front Face */}
              <div className="absolute inset-0 backface-hidden w-full h-full bg-white/60 backdrop-blur-xl border border-mid-blue/20 rounded-[20px] shadow-[0_8px_32px_rgba(57,88,134,0.08)] flex flex-col overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:border-accent-blue/50">
                
                {/* Media area */}
                <div className="relative w-full flex-grow bg-gradient-to-br from-soft-blue/20 to-light-mist/40 p-6 flex flex-col justify-end overflow-hidden group-hover:from-soft-blue/30 group-hover:to-mid-blue/20 transition-colors duration-500">
                  <div className="absolute top-4 right-4 flex gap-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/50 backdrop-blur-md border border-white/40 flex items-center justify-center text-navy hover:bg-white transition-colors cursor-none">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-navy border border-navy flex items-center justify-center text-white hover:bg-accent-blue transition-colors cursor-none">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  
                  {/* Category Tags */}
                  <div className="flex gap-2 mb-3">
                    {project.category.slice(0, 2).map(cat => (
                      <span key={cat} className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 bg-white/50 backdrop-blur border border-white/60 rounded text-muted">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content area */}
                <div className="pb-6 px-6 pt-5 bg-white/40">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-fraunces font-medium text-[22px] text-navy truncate">{project.title}</h3>
                    <span className="text-[12px] font-mono text-muted mt-1.5">{project.year}</span>
                  </div>
                  <p className="text-[13px] text-muted line-clamp-2 leading-relaxed mb-4 min-h-[40px]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[11px] font-medium text-navy/80 bg-soft-blue/10 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Back Face */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full bg-navy backdrop-blur-xl border border-mid-blue/30 rounded-[20px] shadow-2xl flex flex-col p-8 text-white transition-transform duration-300 group-hover:-translate-y-2">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <h3 className="font-fraunces text-2xl text-light-mist mb-8">Technical Specs</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-[11px] uppercase tracking-widest text-[#8AAEE0] mb-1">Architecture</div>
                      <div className="font-mono text-sm">{project.designPattern}</div>
                    </div>
                    
                    <div>
                      <div className="text-[11px] uppercase tracking-widest text-[#8AAEE0] mb-1">Scale</div>
                      <div className="font-mono text-sm">{project.linesOfCode} Lines of Code</div>
                    </div>
                    
                    <div>
                      <div className="text-[11px] uppercase tracking-widest text-[#8AAEE0] mb-1">Performance</div>
                      <div className="font-mono text-sm">{project.lighthouseScore} Lighthouse</div>
                    </div>
                    
                    <div className="pt-4 mt-6 border-t border-[#8AAEE0]/20 flex justify-between items-center text-[#8AAEE0]">
                      <span className="text-[10px] font-mono">&lt;system_ready /&gt;</span>
                      <Github className="w-5 h-5 opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
