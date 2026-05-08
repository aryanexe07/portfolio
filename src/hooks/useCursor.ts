'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function useCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Track mouse position
    const mouse = { x: 0, y: 0 };
    // Track laggy ring position
    const ringPos = { x: 0, y: 0 };
    
    // Initial setup hidden until first move
    gsap.set([dot, ring], { opacity: 0 });
    
    let isHovering = false;
    let isInteractiveHover = false;
    let magneticTarget: HTMLElement | null = null;
    
    // Quick setters for performance
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');
    const setRingX = gsap.quickSetter(ring, 'x', 'px');
    const setRingY = gsap.quickSetter(ring, 'y', 'px');

    const handleMouseMove = (e: MouseEvent) => {
      // Show cursor on first move
      if (!isHovering) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        isHovering = true;
        // Snap ring to mouse on first move
        ringPos.x = e.clientX;
        ringPos.y = e.clientY;
      }

      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Handle magnetic logic
      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Pull dot towards center slightly
        const pullX = (centerX - mouse.x) * 0.2;
        const pullY = (centerY - mouse.y) * 0.2;
        
        setDotX(mouse.x + pullX);
        setDotY(mouse.y + pullY);
      } else {
        // Direct snappy dot
        setDotX(mouse.x);
        setDotY(mouse.y);
      }
    };

    const findMagneticTargets = (e: MouseEvent) => {
      // Find nearby interactive elements for magnetic pull
      const elements = Array.from(document.querySelectorAll('a, button, [role="button"], input, textarea, .magnetic'));
      
      let closestElement: HTMLElement | null = null;
      let minDistance = 80; // 80px pull radius
      isInteractiveHover = false;
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        const distance = Math.hypot(e.clientX - elX, e.clientY - elY);
        
        // Exact hover flag
        if (
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom
        ) {
          isInteractiveHover = true;
        }
        
        if (distance < minDistance) {
          minDistance = distance;
          closestElement = el as HTMLElement;
        }
      });
      
      magneticTarget = closestElement;
      
      // Update ring style based on interactive state
      if (isInteractiveHover || magneticTarget) {
        gsap.to(ring, { width: 40, height: 40, borderColor: 'rgba(98,142,203,0.8)', duration: 0.3, overwrite: 'auto' });
        gsap.to(dot, { scale: 1.5, duration: 0.3, overwrite: 'auto' });
      } else {
        gsap.to(ring, { width: 26, height: 26, borderColor: 'rgba(98,142,203,0.5)', duration: 0.3, overwrite: 'auto' });
        gsap.to(dot, { scale: 1, duration: 0.3, overwrite: 'auto' });
      }
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
      isHovering = false;
    };

    // Render loop for ring lerp
    const render = () => {
      // lerp factor 0.11
      ringPos.x += (mouse.x - ringPos.x) * 0.11;
      ringPos.y += (mouse.y - ringPos.y) * 0.11;
      
      setRingX(ringPos.x);
      setRingY(ringPos.y);
    };

    gsap.ticker.add(render);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', findMagneticTargets);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', findMagneticTargets);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return { dotRef, ringRef };
}
