import { ReactNode } from "react";
import { cn } from "@/components/ui/Button";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      "bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[18px] shadow-[var(--card-shadow)] overflow-hidden transition-all duration-300",
      className
    )}>
      {children}
    </div>
  );
}
