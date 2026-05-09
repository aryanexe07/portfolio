'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/Card";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const elements = contentRef.current.children;

    gsap.fromTo(elements, 
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full max-w-[1280px] mx-auto px-6 sm:px-14 py-24 min-h-[70vh]">
      <div 
        ref={contentRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
      >
        {/* Left Col: Text */}
        <div className="flex flex-col">
          <h2 className="font-fraunces font-medium text-[clamp(28px,3vw,44px)] text-[var(--accent-deep)] leading-[1.1] mb-8 transition-colors duration-300">
            The person behind <br />
            <span className="italic text-[var(--accent)] font-light">the code.</span>
          </h2>
          
          <div className="space-y-5 text-[15px] font-light text-[var(--text)] leading-[1.7] transition-colors duration-300">
            <p>
              I&apos;m a developer who cares deeply about the intersection of engineering and design. To me, code isn&apos;t just about logic—it&apos;s a medium for creating interfaces that feel intuitive, responsive, and alive.
            </p>
            <p>
              Over the last few years, I&apos;ve built everything from complex PyQt desktop applications and web scrapers to highly interactive web experiences and modern dashboards. I love taking a broad view of product development—working through system architectures while polishing the micro-interactions that define the user experience.
            </p>
            <p>
              When I&apos;m not deep in an IDE, I&apos;m usually exploring new interaction paradigms, optimizing performance bottlenecks, or figuring out how to make technical tools more ergonomic for humans.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-[12px] uppercase tracking-widest text-[var(--text-muted)] mb-4 font-medium transition-colors duration-300">Currently Exploring</h3>
            <div className="flex flex-wrap gap-2.5">
              {['AI tooling', 'shader interfaces', 'interaction systems', 'developer ergonomics'].map((tag) => (
                <span key={tag} className="font-mono text-[11px] px-3 py-1.5 bg-[var(--accent-light)]/10 border border-[var(--accent-light)]/30 rounded text-[var(--accent-deep)] transition-all duration-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Principles */}
        <div className="flex flex-col gap-5 mt-6 lg:mt-0">
          <Card className="p-6 transition-transform hover:-translate-y-1 duration-300">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-light)]/20 flex items-center justify-center text-xl mb-4">⚡</div>
            <h4 className="font-medium text-[var(--accent-deep)] text-[16px] mb-2 transition-colors duration-300">Performance matters</h4>
            <p className="text-sm font-light text-[var(--text-muted)] leading-relaxed transition-colors duration-300">
              Fast load times and 60fps animations aren&apos;t nice-to-haves; they are the foundation of a premium experience.
            </p>
          </Card>
          
          <Card className="p-6 transition-transform hover:-translate-y-1 duration-300 ml-0 lg:ml-6">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-light)]/20 flex items-center justify-center text-xl mb-4">✨</div>
            <h4 className="font-medium text-[var(--accent-deep)] text-[16px] mb-2 transition-colors duration-300">Design should feel alive</h4>
            <p className="text-sm font-light text-[var(--text-muted)] leading-relaxed transition-colors duration-300">
              Interfaces should reward interaction. A subtle hover state or a perfectly timed transition can transform how a product feels.
            </p>
          </Card>

          <Card className="p-6 transition-transform hover:-translate-y-1 duration-300 ml-0 lg:ml-12">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-light)]/20 flex items-center justify-center text-xl mb-4">🔁</div>
            <h4 className="font-medium text-[var(--accent-deep)] text-[16px] mb-2 transition-colors duration-300">Build fast, refine continuously</h4>
            <p className="text-sm font-light text-[var(--text-muted)] leading-relaxed transition-colors duration-300">
              Get the core architecture right, ship a working prototype, and iterate relentlessly on the details.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
