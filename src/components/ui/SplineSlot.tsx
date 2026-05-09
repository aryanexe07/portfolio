'use client';
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

export function SplineSlot() {
  const { isLowPerformance } = usePerformanceMode();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] transition-all duration-300" style={{ filter: 'var(--spline-shadow)' }}>
      <div 
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-[20px] blur-xl rounded-[100%] transition-all duration-300" 
        style={{ background: 'var(--spline-floor)' }}
      />
      
      {!isLowPerformance ? (
        <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-muted)] text-sm border border-dashed border-[var(--card-border)] rounded-[30px] bg-[var(--card-bg)]">
          <span>[Spline 3D Model Placeholder]</span>
          <span className="text-[10px] mt-2 opacity-70">Requires Spline URL</span>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center rounded-[30px] bg-gradient-to-br from-[var(--accent-light)]/30 to-[var(--bg-secondary)]/40 border border-[var(--card-border)] transition-all duration-300">
          <span className="text-[var(--accent-deep)] font-medium text-sm">Static Robot Fallback Model</span>
        </div>
      )}
    </div>
  );
}
