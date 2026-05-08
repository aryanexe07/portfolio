'use client';

import { useContext } from 'react';
import { LenisContext } from '@/components/providers/LenisProvider';

export function useLenis() {
  const context = useContext(LenisContext);
  return context;
}
