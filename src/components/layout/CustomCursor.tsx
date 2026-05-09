'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot snaps instantly - Fix 2.4
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };

    const loop = () => {
      // Lerp factor exactly 0.12 - Fix 2.3
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      rafId = requestAnimationFrame(loop);
    };

    // Passive listener for performance - Fix 2.5
    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    // Hover state management
    const onEnter = () => ring.classList.add('hovering');
    const onLeave = () => ring.classList.remove('hovering');

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .magnetic');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // MutationObserver to sync with theme changes - Fix 5
    const observer = new MutationObserver(() => {
      // When theme changes, the CSS variables will update the styles automatically
      // since we're using CSS variables for size, border, and glow.
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        id="cursor-ring"
        ref={ringRef}
        className="cursor-ring"
      />
      <div
        id="cursor-dot"
        ref={dotRef}
        className="cursor-dot"
      />
      <style jsx global>{`
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: var(--cursor-dot-size);
          height: var(--cursor-dot-size);
          background-color: var(--cursor-dot);
          box-shadow: var(--cursor-dot-glow);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          margin-left: calc(var(--cursor-dot-size) / -2);
          margin-top: calc(var(--cursor-dot-size) / -2);
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          width: var(--cursor-ring-size);
          height: var(--cursor-ring-size);
          border: var(--cursor-ring-border);
          box-shadow: var(--cursor-ring-glow);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          margin-left: calc(var(--cursor-ring-size) / -2);
          margin-top: calc(var(--cursor-ring-size) / -2);
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .cursor-ring.hovering {
          width: calc(var(--cursor-ring-size) * 1.5);
          height: calc(var(--cursor-ring-size) * 1.5);
          margin-left: calc(var(--cursor-ring-size) * 1.5 / -2);
          margin-top: calc(var(--cursor-ring-size) * 1.5 / -2);
          border-color: var(--cursor-ring-hover-border);
          box-shadow: var(--cursor-ring-hover-glow);
        }
      `}</style>
    </>
  );
}
