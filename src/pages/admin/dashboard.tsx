// src/pages/admin/dashboard.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { getMetrics, clearMetrics } from '@/lib/metrics';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Record<string, number>>({});

  useEffect(() => {
    const data = getMetrics();
    setMetrics(data);
  }, []);

  const handleClear = () => {
    clearMetrics();
    setMetrics({});
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Resume Interaction Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <MetricCard title="Resume Clicks" value={metrics['resume_cta_click'] ?? 0} />
        <MetricCard title="Resume Views" value={metrics['resume_view'] ?? 0} />
        <MetricCard title="Resume Downloads" value={metrics['resume_download_click'] ?? 0} />
      </div>
      <button
        onClick={handleClear}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Clear Metrics
      </button>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-medium mb-2">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
