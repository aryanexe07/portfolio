'use client';

import { Github } from "@/components/ui/GithubIcon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SplineSlot } from "@/components/ui/SplineSlot";
import { FloatingCard } from "@/components/ui/FloatingCard";

export function Hero() {
  return (
    <section id="home" className="relative w-full min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
      <div className="w-full max-w-[1280px] grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] items-center gap-10 px-6 sm:px-14 pb-16">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-start hero-left animate-[fadeSlideDown_0.9s_ease_forwards] translate-y-[22px] opacity-0" style={{ animationDelay: '1.6s' }}>
          <Badge className="mb-6">Available for work</Badge>
          
          <div className="text-muted text-lg mb-2">
            Hello, I&apos;m <span className="text-navy font-bold">Aryan</span>
          </div>
          
          <h1 className="font-fraunces font-light text-[clamp(36px,4.2vw,60px)] leading-[1.1] tracking-[-0.025em] text-darkest mb-6">
            Crafting digital <br className="hidden md:block" />
            <span className="italic text-accent-blue">experiences</span> that make an <span className="font-bold text-navy">impact.</span>
          </h1>
          
          <p className="text-[14px] text-muted leading-[1.72] max-w-[340px] font-light mb-8">
            I build fast, accessible, and delightful web experiences with clean code and purposeful design.
          </p>
          
          {/* Stats Row */}
          <div className="flex items-center gap-8 mb-8">
            <div className="flex flex-col">
              <span className="font-fraunces text-[26px] font-bold text-navy">
                12<sup className="text-accent-blue text-sm">+</sup>
              </span>
              <span className="text-[10px] uppercase text-muted tracking-wider">Projects</span>
            </div>
            <div className="flex flex-col">
              <span className="font-fraunces text-[26px] font-bold text-navy">
                3<sup className="text-accent-blue text-sm">+</sup>
              </span>
              <span className="text-[10px] uppercase text-muted tracking-wider">Years exp.</span>
            </div>
            <div className="flex flex-col">
              <span className="font-fraunces text-[26px] font-bold text-navy">
                8k
              </span>
              <span className="text-[10px] uppercase text-muted tracking-wider">Lines shipped</span>
            </div>
          </div>
          
          <div className="w-[48px] h-[1px] bg-soft-blue mb-8" />
          
          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <Button className="magnetic">View My Work</Button>
            <Button variant="secondary" className="magnetic group">
              <Github className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
              View on GitHub
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative h-[480px] lg:h-[580px] w-full hero-right animate-[fadeSlideDown_0.9s_ease_forwards] translate-y-[22px] opacity-0 group/cards" style={{ animationDelay: '1.8s' }}>
          <SplineSlot />

          {/* Floating Cards */}
          <FloatingCard 
            className="top-[2%] left-1/2 -translate-x-1/2 w-[196px] group-hover/cards:[&:not(:hover)]:opacity-50 group-hover/cards:[&:not(:hover)]:blur-[0.4px] transition-all duration-300 z-10" 
            delay={0.2} duration={8.5}
          >
            <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-soft-blue/40 to-white/60 border border-soft-blue/50 flex items-center justify-center mb-3">👤</div>
            <h3 className="text-[14.5px] font-medium text-darkest mb-1.5">About Me</h3>
            <p className="text-[12px] text-muted leading-[1.55] font-light">Know more about my journey, skills and values.</p>
          </FloatingCard>

          <FloatingCard 
            className="top-[30%] left-[1%] w-[182px] group-hover/cards:[&:not(:hover)]:opacity-50 group-hover/cards:[&:not(:hover)]:blur-[0.4px] transition-all duration-300 z-10"
            delay={0.8} duration={7.5}
          >
            <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-soft-blue/40 to-white/60 border border-soft-blue/50 flex items-center justify-center mb-3">📁</div>
            <h3 className="text-[14.5px] font-medium text-darkest mb-1.5 flex justify-between items-center">
              Projects
              <span className="text-[9.5px] uppercase bg-[rgba(98,142,203,0.1)] border border-[rgba(98,142,203,0.2)] rounded-full px-2 py-0.5 ml-1">12 projects</span>
            </h3>
            <p className="text-[12px] text-muted leading-[1.55] font-light">A collection of things I&apos;ve built and shipped.</p>
          </FloatingCard>

          <FloatingCard 
            className="top-[24%] right-[1%] w-[194px] group-hover/cards:[&:not(:hover)]:opacity-50 group-hover/cards:[&:not(:hover)]:blur-[0.4px] transition-all duration-300 z-10"
            delay={0.5} duration={9.2}
          >
            <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-soft-blue/40 to-white/60 border border-soft-blue/50 flex items-center justify-center mb-3">
              <Github className="w-5 h-5 text-navy" />
            </div>
            <h3 className="text-[14.5px] font-medium text-darkest mb-1.5 flex justify-between items-center">
              GitHub
              <span className="text-[9.5px] uppercase bg-[rgba(98,142,203,0.1)] border border-[rgba(98,142,203,0.2)] rounded-full px-2 py-0.5 ml-1">open source</span>
            </h3>
            <p className="text-[12px] text-muted leading-[1.55] font-light">Explore my repos and open source work.</p>
          </FloatingCard>

          <FloatingCard 
            className="bottom-[12%] left-[8%] w-[182px] group-hover/cards:[&:not(:hover)]:opacity-50 group-hover/cards:[&:not(:hover)]:blur-[0.4px] transition-all duration-300 z-10"
            delay={1.1} duration={8.1}
          >
            <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-soft-blue/40 to-white/60 border border-soft-blue/50 flex items-center justify-center mb-3">✉️</div>
            <h3 className="text-[14.5px] font-medium text-darkest mb-1.5">Contact</h3>
            <p className="text-[12px] text-muted leading-[1.55] font-light">Let&apos;s connect and build something great.</p>
          </FloatingCard>

          <FloatingCard 
            className="bottom-[9%] right-[2%] w-[190px] group-hover/cards:[&:not(:hover)]:opacity-50 group-hover/cards:[&:not(:hover)]:blur-[0.4px] transition-all duration-300 z-10"
            delay={0} duration={8.8}
          >
            <div className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-soft-blue/40 to-white/60 border border-soft-blue/50 flex items-center justify-center mb-3">
              <span className="text-navy font-bold">{`</>`}</span>
            </div>
            <h3 className="text-[14.5px] font-medium text-darkest mb-1.5 flex justify-between items-center">
              View Work
              <span className="text-[9.5px] uppercase bg-[rgba(98,142,203,0.1)] border border-[rgba(98,142,203,0.2)] rounded-full px-2 py-0.5 ml-1">featured</span>
            </h3>
            <p className="text-[12px] text-muted leading-[1.55] font-light">See my featured work and case studies.</p>
          </FloatingCard>

        </div>
      </div>
    </section>
  );
}
