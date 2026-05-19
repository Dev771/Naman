'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function TrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
      if (measurementId) {
        const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
        
        // Log standard page view config update to GA4
        (window as any).gtag('config', measurementId, {
          page_path: url,
          page_title: document.title,
        });
      }
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * AnalyticsTracker component listens to client-side route changes and registers
 * them in Google Analytics. Wrapped in a Suspense boundary to prevent layout-level
 * static generation deoptimization in Next.js App Router.
 */
export function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerInner />
    </Suspense>
  );
}
