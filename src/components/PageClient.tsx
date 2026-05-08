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
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#D5DEEF]/30 rounded-full blur-[120px] will-change-transform animate-blob-float" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#B1C9EF]/20 rounded-full blur-[100px] will-change-transform animate-blob-float" style={{ animationDelay: '-5s' }} />
      <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] bg-[#8AAEE0]/15 rounded-full blur-[110px] will-change-transform animate-blob-float" style={{ animationDelay: '-10s' }} />
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
