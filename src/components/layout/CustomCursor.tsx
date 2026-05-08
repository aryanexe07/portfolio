'use client';

import { useCursor } from '@/hooks/useCursor';

export default function CustomCursor() {
  const { dotRef, ringRef } = useCursor();

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[26px] h-[26px] border border-[rgba(98,142,203,0.5)] rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference will-change-transform"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[5px] h-[5px] bg-[#395886] rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference will-change-transform shadow-[0_0_8px_rgba(57,88,134,0.4)]"
      />
    </>
  );
}
