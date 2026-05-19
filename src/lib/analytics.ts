'use client';

/**
 * Reusable helper to send custom events to Google Analytics 4 (GA4).
 * Safely checks if `window.gtag` is initialized before execution.
 *
 * @param eventName Name of the event to track (e.g. 'cta_click_resume')
 * @param eventParams Additional metadata to associate with the event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', eventName, {
        ...eventParams,
        timestamp: new Date().toISOString(),
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    } catch (error) {
      console.warn('Failed to send GA4 event:', error);
    }
  }
}
