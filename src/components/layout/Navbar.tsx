'use client';

import { useState, useEffect } from "react";
import { cn } from "@/components/ui/Button";

const LINKS = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "GitHub", href: "#github" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" }
];

export function Navbar() {
  const [activeHash, setActiveHash] = useState("#home");

  // On mount and scroll, update active hash
  useEffect(() => {
    const handleScroll = () => {
      const sections = LINKS.map(l => document.querySelector(l.href)).filter(Boolean);
      let current = "#home";
      sections.forEach((sec: any) => {
        const rect = sec.getBoundingClientRect();
        // If section's top is past the middle of the screen
        if (rect.top <= window.innerHeight / 2) {
          current = `#${sec.id}`;
        }
      });
      setActiveHash(current);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveHash(href);
    }
  };

  return (
    <nav className="fixed top-[14px] left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[1100px] h-[50px] bg-[rgba(240,243,250,0.76)] backdrop-blur-[20px] border border-[rgba(177,201,239,0.5)] rounded-[14px] shadow-[0_4px_24px_rgba(57,88,134,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] z-[90] flex items-center justify-between px-5">
      {/* Left */}
      <div className="font-mono text-[14px] font-medium tracking-wide flex items-center gap-1.5 cursor-pointer">
        <span className="text-accent-blue">{">_"}</span>
        <span>aryan<span className="text-navy">.exe</span></span>
      </div>

      {/* Center */}
      <div className="hidden md:flex items-center gap-1">
        {LINKS.map(link => {
          const isActive = activeHash === link.href;
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={cn(
                "relative px-4 py-1.5 rounded-md text-[13px] transition-all duration-300",
                isActive ? "text-navy font-medium" : "text-muted hover:bg-[rgba(98,142,203,0.1)]"
              )}
            >
              {link.name}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-accent-blue" />
              )}
            </a>
          );
        })}
      </div>

      {/* Right */}
      <a 
        href="#resume" 
        className="magnetic bg-navy text-white text-[12px] font-medium px-4 py-1.5 rounded-lg shadow-sm hover:bg-accent-blue transition-colors will-change-transform"
      >
        Resume
      </a>
    </nav>
  );
}
