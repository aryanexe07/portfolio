'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import Lenis from 'lenis';
import { initLenis } from '@/lib/lenis';

export const LenisContext = createContext<Lenis | null>(null);

export default function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const result = initLenis();
    if (result) {
      setLenis(result.lenis);
      return () => {
        result.destroy();
        setLenis(null);
      };
    }
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
