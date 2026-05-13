'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface HomeContextValue {
  sectionHovered: boolean;
  onSectionEnter: () => void;
  onSectionLeave: () => void;
}

const HomeContext = createContext<HomeContextValue>({
  sectionHovered: false,
  onSectionEnter: () => {},
  onSectionLeave: () => {},
});

export function HomeProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const onSectionEnter = useCallback(() => setCount((c) => c + 1), []);
  const onSectionLeave = useCallback(() => setCount((c) => Math.max(0, c - 1)), []);

  return (
    <HomeContext.Provider
      value={{ sectionHovered: count > 0, onSectionEnter, onSectionLeave }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeContext() {
  return useContext(HomeContext);
}
