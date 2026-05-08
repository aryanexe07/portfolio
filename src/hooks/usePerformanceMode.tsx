'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { checkIsLowPerformance } from '@/lib/performance';

interface PerformanceContextType {
  isLowPerformance: boolean;
  hasChecked: boolean;
  checkPerformance: () => void;
}

const PerformanceContext = createContext<PerformanceContextType>({
  isLowPerformance: false,
  hasChecked: false,
  checkPerformance: () => {},
});

export const usePerformanceMode = () => useContext(PerformanceContext);

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  const checkPerformance = () => {
    const isLow = checkIsLowPerformance();
    setIsLowPerformance(isLow);
    setHasChecked(true);
  };

  return (
    <PerformanceContext.Provider value={{ isLowPerformance, hasChecked, checkPerformance }}>
      {children}
    </PerformanceContext.Provider>
  );
}
