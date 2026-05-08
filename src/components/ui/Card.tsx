import { ReactNode } from "react";
import { cn } from "@/components/ui/Button";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      "bg-white/60 backdrop-blur-xl border border-mid-blue/20 rounded-[18px] shadow-[0_8px_32px_rgba(57,88,134,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] overflow-hidden",
      className
    )}>
      {children}
    </div>
  );
}
