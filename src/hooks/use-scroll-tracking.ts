'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Custom hook to track user engagement inside a Case Study.
 * - Tracks opening event on mount.
 * - Tracks scroll milestones (25%, 50%, 75%, 90% read completion).
 * - Tracks total reading duration when the user leaves the page.
 *
 * @param slug The unique slug of the case study (e.g. 'veda', 'goodspace')
 * @param title The human-readable title of the case study
 */
export function useScrollTracking(slug: string, title: string) {
  const openTimeRef = useRef<number>(0);
  const sentMilestonesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // 1. Log open event
    openTimeRef.current = Date.now();
    trackEvent('case_study_open', { slug, title });
    sentMilestonesRef.current = new Set(); // Reset milestones for this load

    // 2. Track scroll milestones
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollableHeight = docHeight - winHeight;

      if (scrollableHeight <= 0) return;

      const scrollPos = window.scrollY;
      const scrollPercentage = Math.round((scrollPos / scrollableHeight) * 100);

      // Check milestones
      const milestones = [25, 50, 75, 90];
      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !sentMilestonesRef.current.has(milestone)) {
          sentMilestonesRef.current.add(milestone);
          trackEvent('case_study_scroll', {
            slug,
            title,
            milestone: `${milestone}%`,
            percentage: scrollPercentage,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial scroll check in case page starts scrolled down
    handleScroll();

    // 3. Track duration on unmount (navigation away)
    return () => {
      window.removeEventListener('scroll', handleScroll);

      const endTime = Date.now();
      const durationSeconds = Math.round((endTime - openTimeRef.current) / 1000);

      // Avoid logging duration if user just instantly bounced (less than 2s)
      if (durationSeconds >= 2) {
        trackEvent('case_study_duration', {
          slug,
          title,
          duration_seconds: durationSeconds,
          max_milestone: Math.max(0, ...Array.from(sentMilestonesRef.current)),
        });
      }
    };
  }, [slug, title]);
}
