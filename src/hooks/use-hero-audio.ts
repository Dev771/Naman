'use client';

/**
 * useHeroAudio
 *
 * Attach to any hero <section> ref. Uses IntersectionObserver to notify
 * the AmbientAudioContext when the section enters / leaves the viewport.
 *
 * @param sectionRef  React ref pointing at the hero <section> element
 * @param key         Unique string key for this section (e.g. 'home-hero')
 * @param threshold   Fraction of the section that must be visible (default 0.15)
 */

import { useEffect, useRef } from 'react';
import { useAmbientAudio } from '@/lib/ambient-audio';

export function useHeroAudio(
  sectionRef: React.RefObject<HTMLElement | null>,
  key: string,
  threshold = 0.15,
) {
  const { setHeroVisible } = useAmbientAudio();

  // Keep a stable copy of setHeroVisible so the effect never re-runs
  const setRef = useRef(setHeroVisible);
  useEffect(() => { setRef.current = setHeroVisible; }, [setHeroVisible]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { setRef.current(key, entry.isIntersecting); },
      { threshold },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      // Make sure we clean up visibility when component unmounts
      setRef.current(key, false);
    };
  }, [sectionRef, key, threshold]);
}
