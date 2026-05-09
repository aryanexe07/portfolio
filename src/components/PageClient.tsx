'use client';

import { useState, ReactNode } from "react";
import { PerformanceProvider, usePerformanceMode } from "@/hooks/usePerformanceMode";
import { Bootloader } from "@/components/sections/Bootloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

interface PageClientProps {
  githubSection: ReactNode;
}

function AmbientBlobs() {
  const { isLowPerformance } = usePerformanceMode();

  if (isLowPerformance) return null;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute top-[-10%] left-[-5%] w-[var(--blob-size-1)] h-[var(--blob-size-1)] bg-[var(--blob-1)] rounded-full will-change-transform animate-blob-float transition-all duration-700" style={{ filter: 'var(--blob-blur-1, blur(120px))' }} />
      <div className="absolute top-[40%] right-[-10%] w-[var(--blob-size-2)] h-[var(--blob-size-2)] bg-[var(--blob-2)] rounded-full will-change-transform animate-blob-float transition-all duration-700" style={{ animationDelay: '-5s', filter: 'var(--blob-blur-2, blur(100px))' }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[var(--blob-size-3)] h-[var(--blob-size-3)] bg-[var(--blob-3)] rounded-full will-change-transform animate-blob-float transition-all duration-700" style={{ animationDelay: '-10s', filter: 'var(--blob-blur-3, blur(110px))' }} />
    </div>
  );
}

function PageInner({ githubSection }: PageClientProps) {
  const [bootloaderComplete, setBootloaderComplete] = useState(false);

  return (
    <>
      {!bootloaderComplete && (
        <Bootloader onComplete={() => setBootloaderComplete(true)} />
      )}

      <main className="relative flex flex-col min-h-screen">
        <Navbar />
        <AmbientBlobs />

        <Hero />
        <About />
        <Skills />
        <Projects />
        {githubSection}
        <Contact />

        <Footer />
      </main>
    </>
  );
}

export function PageClient({ githubSection }: PageClientProps) {
  return (
    <PerformanceProvider>
      <PageInner githubSection={githubSection} />
    </PerformanceProvider>
  );
}
