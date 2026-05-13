'use client';

import { useHomeContext } from './home-context';
import type { ReactNode } from 'react';

/**
 * Wraps a section and signals to HomeContext when the mouse is over it,
 * so the StickyPhotoFrame can hide itself.
 */
export function SectionHoverWrapper({ children }: { children: ReactNode }) {
  const { onSectionEnter, onSectionLeave } = useHomeContext();
  return (
    <div onMouseEnter={onSectionEnter} onMouseLeave={onSectionLeave}>
      {children}
    </div>
  );
}
