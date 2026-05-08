'use client';
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

export function SplineSlot() {
  const { isLowPerformance } = usePerformanceMode();

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] drop-shadow-[0_32px_64px_rgba(57,88,134,0.18)]">
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-[20px] bg-soft-blue/20 blur-xl rounded-[100%]" />
      
      {!isLowPerformance ? (
        // Replace this div with:
        // <script type="module" src="https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js"></script>
        // <spline-viewer url="YOUR_SPLINE_URL" background="transparent" style="width:340px;height:340px;"></spline-viewer>
        // Spline theme settings: transparent background, robot base color #E8EEF8, emissive #628ECB at 0.3 intensity, point light #B1C9EF intensity 60, rim light #395886 intensity 30
        <div className="w-full h-full flex flex-col items-center justify-center text-muted text-sm border border-dashed border-mid-blue/30 rounded-[30px] bg-white/20">
          <span>[Spline 3D Model Placeholder]</span>
          <span className="text-[10px] mt-2 opacity-70">Requires Spline URL</span>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center rounded-[30px] bg-gradient-to-br from-soft-blue/30 to-white/40 border border-mid-blue/20">
          <span className="text-navy font-medium text-sm">Static Robot Fallback Model</span>
        </div>
      )}
    </div>
  );
}
