import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const scrollReveal = (
  element: string | Element | null, 
  options: {
    y?: number;
    delay?: number;
    stagger?: number;
    duration?: number;
  } = {}
) => {
  if (!element) return;

  const { y = 20, delay = 0, stagger = 0.08, duration = 0.5 } = options;

  return gsap.from(element, {
    opacity: 0,
    y,
    duration,
    delay,
    stagger,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });
};

export const magneticEffect = (element: HTMLElement) => {
  if (!element) return;

  element.addEventListener("mousemove", (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  });
};
