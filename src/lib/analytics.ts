'use client';

import { recordEvent } from '@/lib/metrics';

/**
 * Reusable helper to send custom events to Google Analytics 4 (GA4).
 * Safely checks if `window.gtag` is initialized before execution.
 *
 * @param eventName Name of the event to track (e.g. 'cta_click_resume')
 * @param eventParams Additional metadata to associate with the event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  // Always record locally — works even without GA4
  try {
    recordEvent(eventName);
  } catch (e) {
    console.warn('Failed to record local metric:', e);
  }

  // Send to GA4 if available
  try {
    const getDeviceType = () => {
      const ua = navigator.userAgent;
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'Tablet';
      if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'Mobile';
      return 'Desktop';
    };

    const getBrowser = () => {
      const ua = navigator.userAgent;
      if (ua.includes('Firefox')) return 'Firefox';
      if (ua.includes('SamsungBrowser')) return 'Samsung Internet';
      if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
      if (ua.includes('Trident') || ua.includes('MSIE')) return 'Internet Explorer';
      if (ua.includes('Edge') || ua.includes('Edg')) return 'Edge';
      if (ua.includes('Chrome')) return 'Chrome';
      if (ua.includes('Safari')) return 'Safari';
      return 'Other';
    };

    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, {
        ...eventParams,
        timestamp: new Date().toISOString(),
        page_location: window.location.href,
        page_path: window.location.pathname,
        device_type: getDeviceType(),
        browser: getBrowser(),
        referrer: document.referrer || 'Direct',
      });
    }
  } catch (error) {
    console.warn('Failed to send GA4 event:', error);
  }
}
