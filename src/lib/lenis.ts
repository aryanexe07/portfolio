import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initLenis() {
  if (typeof window === 'undefined') return null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  const lenis = new Lenis({
    duration: prefersReducedMotion.matches ? 0.01 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const update = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy: () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    }
  };
}
