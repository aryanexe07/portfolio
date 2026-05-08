export const checkIsLowPerformance = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  let isLow = false;
  
  // Hardware checks
  if ('deviceMemory' in navigator) {
    if ((navigator as any).deviceMemory < 4) {
      isLow = true;
    }
  }
  
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    isLow = true;
  }
  
  // prefers-reduced-motion as a performance mode heuristic
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isLow = true;
  }

  return isLow;
};
