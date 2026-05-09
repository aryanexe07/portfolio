'use client';

import { useState, useEffect } from "react";
import { cn } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
    <nav className="fixed top-[14px] left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[1100px] h-[50px] bg-[var(--navbar-bg)] backdrop-blur-[20px] border border-[var(--navbar-border)] rounded-[14px] shadow-[var(--navbar-shadow)] z-[90] flex items-center justify-between px-5 transition-all duration-300">
      {/* Left */}
      <div className="font-mono text-[14px] font-medium tracking-wide flex items-center gap-1.5 cursor-pointer">
        <span className="text-[var(--accent)]">{">_"}</span>
        <span className="text-[var(--text)]">aryan<span className="text-[var(--accent-deep)]">.exe</span></span>
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
                isActive ? "text-[var(--text)] font-semibold" : "text-[var(--text-muted)] hover:bg-[var(--badge-bg)]"
              )}
            >
              {link.name}
              {isActive && (
                <span 
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full transition-all duration-300" 
                  style={{ backgroundColor: 'var(--nav-dot-bg)', boxShadow: 'var(--nav-dot-shadow)' }}
                />
              )}
            </a>
          );
        })}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a 
          href="#resume" 
          className="magnetic bg-[var(--accent-deep)] text-white text-[12px] font-medium px-4 py-1.5 rounded-lg shadow-[var(--btn-primary-shadow)] hover:opacity-90 transition-all duration-300 will-change-transform"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
