import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--badge-bg)] border border-[var(--badge-border)] backdrop-blur-md rounded-full shadow-[var(--card-shadow)]", className)}>
      <div className="w-1.5 h-1.5 rounded-full bg-[#34C478] shadow-[0_0_8px_rgba(52,196,120,0.8)] animate-[pulseGlow_2s_infinite]" />
      <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium pt-0.5">
        {children}
      </span>
    </div>
  );
}
