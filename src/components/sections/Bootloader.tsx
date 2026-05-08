'use client';

import { useEffect, useState, useRef } from "react";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

export function Bootloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { checkPerformance, hasChecked } = usePerformanceMode();

  useEffect(() => {
    if (!hasChecked) {
      checkPerformance();
    }
  }, [hasChecked, checkPerformance]);

  useEffect(() => {
    // 1.5 seconds loader
    const duration = 1500;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const p = Math.min((currentStep / steps) * 100, 100);
      setProgress(p);

      if (p === 100) {
        clearInterval(timer);
        
        // Hide with delay so user sees 100% flag
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 900); // 0.9s transition delay
        }, 150);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-lightest transition-all duration-900 ease-in-out ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <div className="font-mono text-darkest font-medium tracking-wide flex items-center gap-2 mb-1">
        <span className="text-accent-blue">{">_"}</span>
        <span>aryan<span className="text-navy">.exe</span></span>
      </div>
      <div className="text-[11px] text-muted mb-8 tracking-widest font-sans">
        VERSION 2.6.0
      </div>

      <div className="w-[160px] h-[1px] bg-mid-blue/20 relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-navy transition-all duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-[10px] text-muted mt-3 font-mono">
        {Math.floor(progress)}%
      </div>
    </div>
  );
}
