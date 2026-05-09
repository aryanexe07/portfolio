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

  // Hardcoded values for Fix 3.1
  const COLORS = {
    bg: "#0D1117",
    text: "#FFFFFF",
    accent: "#C0392B",
    muted: "#4A5568",
    track: "rgba(255,255,255,0.08)",
    fill: "linear-gradient(90deg, #7B2A2A, #C0392B)"
  };

  return (
    <div 
      ref={containerRef}
      style={{ backgroundColor: COLORS.bg }}
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center transition-all duration-900 ease-in-out ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <div className="font-mono font-medium tracking-wide flex items-center gap-2 mb-1" style={{ color: COLORS.text }}>
        <span style={{ color: COLORS.accent }}>{">_"}</span>
        <span>aryan<span style={{ color: COLORS.accent }}>.exe</span></span>
      </div>
      <div className="text-[11px] mb-8 tracking-widest font-sans" style={{ color: COLORS.muted }}>
        VERSION 2.6.0
      </div>

      <div className="w-[160px] h-[1px] relative overflow-hidden" style={{ backgroundColor: COLORS.track }}>
        <div 
          className="absolute top-0 left-0 h-full transition-all duration-75 ease-out"
          style={{ width: `${progress}%`, background: COLORS.fill }}
        />
      </div>
      <div className="text-[10px] mt-3 font-mono" style={{ color: COLORS.muted }}>
        {Math.floor(progress)}%
      </div>
    </div>
  );
}
