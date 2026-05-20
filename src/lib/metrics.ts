// src/lib/metrics.ts
"use client";

/**
 * Simple client‑side metrics store using localStorage. In a real production
 * environment this would be replaced by a backend service. The store keeps a
 * count of each event name that has been recorded.
 */

const STORAGE_KEY = "resumeMetrics";

type MetricsMap = Record<string, number>;

/** Retrieve the current metrics map from localStorage. Returns an empty map if none exist. */
export function getMetrics(): MetricsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Increment the count for a specific event and persist the updated map. */
export function recordEvent(eventName: string): void {
  if (typeof window === "undefined") return;
  const metrics = getMetrics();
  metrics[eventName] = (metrics[eventName] ?? 0) + 1;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
  } catch (e) {
 console.warn("Failed to persist metrics", e);
  }
}

/** Helper to clear all stored metrics – useful for development/testing. */
export function clearMetrics(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}
