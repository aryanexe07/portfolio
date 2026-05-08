'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SKILL_CATEGORIES } from "@/data/skills";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Select all skill pills
    const pills = sectionRef.current.querySelectorAll('.skill-pill');
    
    gsap.fromTo(pills, 
      { opacity: 0, x: -20 },
      {
        opacity: 1, 
        x: 0,
        duration: 0.5,
        stagger: 0.03, // 30ms stagger
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="w-full max-w-[1280px] mx-auto px-6 sm:px-14 py-20 border-t border-soft-blue/20 relative">
      <h2 className="font-fraunces font-medium text-[clamp(28px,3vw,38px)] text-navy mb-12 text-center md:text-left">
        Tools of <span className="italic text-accent-blue font-light">the trade.</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {SKILL_CATEGORIES.map((category) => (
          <div key={category.name} className="flex flex-col">
            <h3 className="text-[14px] text-navy font-medium mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue inline-block" />
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map(skill => (
                <div 
                  key={skill} 
                  className="skill-pill opacity-0 px-3 py-1.5 bg-white/60 border border-mid-blue/30 backdrop-blur-md rounded-full text-[13px] text-darkest font-light shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-blue hover:shadow-md cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
