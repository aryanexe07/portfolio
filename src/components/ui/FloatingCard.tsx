'use client';

import { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { cn } from '@/components/ui/Button';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export function FloatingCard({ children, className, delay = 0, duration = 8, onHoverStart, onHoverEnd }: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-9 to 9 deg)
    const xPct = (x / rect.width) - 0.5;
    const yPct = (y / rect.height) - 0.5;
    
    gsap.to(cardRef.current, {
      rotateY: xPct * 18, // max 9 deg each way
      rotateX: -yPct * 18,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 700
    });
  };

  const handleMouseLeave = () => {
    onHoverEnd?.();
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out"
    });
  };

  const handleMouseEnter = () => {
    onHoverStart?.();
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1.03,
      y: -9,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  return (
    <div 
      ref={containerRef}
      className={cn("absolute perspective-700 cursor-none", className)}
      style={{ animation: `cardFloat ${duration}s ease-in-out infinite alternate ${delay}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div 
        ref={cardRef}
        className="w-full h-full bg-[var(--card-bg)] backdrop-blur-[20px] border border-[var(--card-border)] rounded-[18px] p-5 pb-11 shadow-[var(--card-shadow)] transition-all duration-300 hover:border-[var(--card-border-hover)] hover:shadow-[var(--card-shadow-hover)] will-change-transform"
      >
        {children}
        <button className="absolute bottom-4 right-4 w-[26px] h-[26px] rounded-full border border-[var(--card-border)] flex items-center justify-center text-[var(--accent-deep)] transition-all duration-300 hover:border-[var(--accent)] hover:translate-x-0.5 hover:-translate-y-0.5 pointer-events-none">
          <span className="text-[14px]">→</span>
        </button>
      </div>
    </div>
  );
}
