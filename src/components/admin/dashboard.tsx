'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  RefreshCw, 
  LogOut, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Link2, 
  Award,
  Download,
  Share2,
  Calendar,
  Layers,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

interface SummaryMetric {
  value: string | number;
  change: number;
}

interface AnalyticsData {
  summary: {
    totalViews: SummaryMetric;
    uniqueVisitors: SummaryMetric;
    averageTime: SummaryMetric;
    bounceRate: SummaryMetric;
  };
  trafficTrends: Array<{ date: string; views: number; visitors: number }>;
  topCTAs: Array<{ name: string; event: string; count: number }>;
  mostViewedStudies: Array<{ title: string; slug: string; views: number }>;
  devices: Array<{ category: string; percentage: number; count: number }>;
  referrers: Array<{ source: string; percentage: number; count: number }>;
  recentActivity: Array<{ time: string; event: string; detail: string }>;
}

export function AdminDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);
    setError('');

    try {
      const res = await fetch('/api/analytics/dashboard');
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const dashboardData = await res.json();
      if (!res.ok) {
        throw new Error(dashboardData.error || 'Failed to fetch analytics data');
      }
      setData(dashboardData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-[#2f5bff]" />
        <p className="font-sans text-[15px] font-medium text-ink-subtle">Loading analytics dashboard...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-12 text-center">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <h3 className="font-sans text-[20px] font-semibold text-ink">Something went wrong</h3>
        <p className="max-w-md font-sans text-[15px] text-ink-subtle">{error || 'Unable to retrieve analytics data.'}</p>
        <button
          onClick={() => fetchData()}
          className="mt-2 flex items-center gap-2 rounded-[8px] bg-[#2f5bff] px-4 py-2 text-[14px] font-medium text-white transition-all hover:bg-blue-600"
        >
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    );
  }

  // Calculate SVG line points for trends (views & visitors)
  const maxTrendVal = Math.max(...data.trafficTrends.map(t => Math.max(t.views, t.visitors)), 100);
  const width = 800;
  const height = 220;
  const paddingX = 40;
  const paddingY = 20;

  const pointsViews = data.trafficTrends.map((t, idx) => {
    const x = paddingX + (idx / (data.trafficTrends.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (t.views / maxTrendVal) * (height - paddingY * 2);
    return `${x},${y}`;
  }).join(' ');

  const pointsVisitors = data.trafficTrends.map((t, idx) => {
    const x = paddingX + (idx / (data.trafficTrends.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (t.visitors / maxTrendVal) * (height - paddingY * 2);
    return `${x},${y}`;
  }).join(' ');

  // Icon mapping for devices
  const getDeviceIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'desktop': return <Monitor size={16} className="text-ink-subtle" />;
      case 'tablet': return <Tablet size={16} className="text-ink-subtle" />;
      default: return <Smartphone size={16} className="text-ink-subtle" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* ── TOP BAR / NAV ── */}
      <div className="flex flex-col gap-4 border-b border-[rgba(186,169,148,0.15)] pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-sans text-[26px] font-bold tracking-[-0.7px] text-ink">
              Analytics Cockpit
            </h1>
          </div>
          <p className="mt-1 font-sans text-[14px] text-ink-subtle">
            Overview of your portfolio performance, conversion funnel, and recruiter events.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchData(true)}
            disabled={refreshing}
            className="flex h-[38px] items-center justify-center gap-1.5 rounded-[8px] border border-[rgba(186,169,148,0.3)] bg-white px-3 font-sans text-[13px] font-medium text-ink transition-colors hover:bg-neutral-50 active:scale-[0.98] disabled:opacity-50"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Syncing...' : 'Sync'}
          </button>
          
          <button
            onClick={handleLogout}
            className="flex h-[38px] items-center justify-center gap-1.5 rounded-[8px] bg-red-50 px-3 font-sans text-[13px] font-medium text-red-600 transition-colors hover:bg-red-100 active:scale-[0.98]"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>



      {/* ── SUMMARY STATS GRID ── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {/* Metric 1 */}
        <div className="rounded-[12px] border border-[rgba(186,169,148,0.25)] bg-[#fffefc] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform duration-300 hover:scale-[1.01]">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="font-sans text-[12px] font-bold uppercase tracking-wider">Total Views</span>
            <Eye size={18} className="stroke-[1.8]" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-sans text-[26px] font-bold tracking-tight text-ink">
              {data.summary.totalViews.value.toLocaleString()}
            </span>
            {data.summary.totalViews.change !== 0 && (
              <span className="font-sans text-[12px] font-semibold text-emerald-600">
                +{data.summary.totalViews.change}%
              </span>
            )}
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-[12px] border border-[rgba(186,169,148,0.25)] bg-[#fffefc] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform duration-300 hover:scale-[1.01]">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="font-sans text-[12px] font-bold uppercase tracking-wider">Unique Visitors</span>
            <Users size={18} className="stroke-[1.8]" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-sans text-[26px] font-bold tracking-tight text-ink">
              {data.summary.uniqueVisitors.value.toLocaleString()}
            </span>
            {data.summary.uniqueVisitors.change !== 0 && (
              <span className="font-sans text-[12px] font-semibold text-emerald-600">
                +{data.summary.uniqueVisitors.change}%
              </span>
            )}
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-[12px] border border-[rgba(186,169,148,0.25)] bg-[#fffefc] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform duration-300 hover:scale-[1.01]">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="font-sans text-[12px] font-bold uppercase tracking-wider">Avg Read Duration</span>
            <Clock size={18} className="stroke-[1.8]" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-sans text-[26px] font-bold tracking-tight text-ink">
              {data.summary.averageTime.value}
            </span>
            {data.summary.averageTime.change !== 0 && (
              <span className="font-sans text-[12px] font-semibold text-emerald-600">
                +{data.summary.averageTime.change}%
              </span>
            )}
          </div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-[12px] border border-[rgba(186,169,148,0.25)] bg-[#fffefc] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-transform duration-300 hover:scale-[1.01]">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="font-sans text-[12px] font-bold uppercase tracking-wider">Bounce Rate</span>
            <TrendingUp size={18} className="stroke-[1.8]" />
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-sans text-[26px] font-bold tracking-tight text-ink">
              {data.summary.bounceRate.value}
            </span>
            {data.summary.bounceRate.change !== 0 && (
              <span className="font-sans text-[12px] font-semibold text-emerald-600">
                {data.summary.bounceRate.change}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── TRAFFIC TRENDS CHART ── */}
      <div className="rounded-[12px] border border-[rgba(186,169,148,0.25)] bg-[#fffefc] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
        <div className="flex flex-col gap-2 border-b border-[rgba(186,169,148,0.1)] pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-sans text-[16px] font-bold tracking-tight text-ink">Traffic Trends</h3>
            <p className="font-sans text-[13px] text-ink-subtle">Aggregated views and visitors count across the conversion pipeline</p>
          </div>
          <div className="flex items-center gap-4 text-[12px] font-medium font-sans">
            <span className="flex items-center gap-1.5 text-[#2f5bff]">
              <span className="h-2 w-2 rounded-full bg-[#2f5bff]"></span> Views
            </span>
            <span className="flex items-center gap-1.5 text-ink-subtle">
              <span className="h-2 w-2 rounded-full bg-ink-subtle/50"></span> Visitors
            </span>
          </div>
        </div>

        {/* Custom SVG Line Chart */}
        <div className="relative mt-6 w-full overflow-x-auto select-none">
          <div className="min-w-[700px] h-[220px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
              {/* Chart Grid Lines */}
              <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="rgba(186,169,148,0.15)" strokeDasharray="3,3" />
              <line x1={paddingX} y1={(height - paddingY * 2) / 2 + paddingY} x2={width - paddingX} y2={(height - paddingY * 2) / 2 + paddingY} stroke="rgba(186,169,148,0.15)" strokeDasharray="3,3" />
              <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="rgba(186,169,148,0.25)" />

              {/* Views Polyline & Area */}
              <path
                d={`M ${paddingX},${height - paddingY} L ${pointsViews} L ${width - paddingX},${height - paddingY} Z`}
                fill="url(#viewsGrad)"
                opacity="0.08"
              />
              <polyline
                fill="none"
                stroke="#2f5bff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsViews}
              />

              {/* Visitors Polyline */}
              <polyline
                fill="none"
                stroke="rgba(186,169,148,0.6)"
                strokeWidth="1.8"
                strokeDasharray="4,2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsVisitors}
              />

              {/* Data Node Points (Views) */}
              {data.trafficTrends.map((t, idx) => {
                const x = paddingX + (idx / (data.trafficTrends.length - 1)) * (width - paddingX * 2);
                const y = height - paddingY - (t.views / maxTrendVal) * (height - paddingY * 2);
                return (
                  <g key={idx} className="group/node cursor-pointer">
                    <circle cx={x} cy={y} r="4" fill="#2f5bff" stroke="#fff" strokeWidth="1.5" />
                    <circle cx={x} cy={y} r="8" fill="#2f5bff" opacity="0" className="transition-opacity group-hover/node:opacity-20" />
                  </g>
                );
              })}

              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2f5bff" />
                  <stop offset="100%" stopColor="#2f5bff" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* X-Axis Dates */}
        <div className="mt-2 flex justify-between px-8 font-sans text-[12px] font-medium text-ink-subtle">
          {data.trafficTrends.map((t, idx) => (
            <span key={idx}>{t.date}</span>
          ))}
        </div>
      </div>

      {/* ── TWO COLUMN MIDDLE BLOCK ── */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Left Column: CTA Funnel & Case Studies */}
        <div className="space-y-6 md:col-span-7">
          {/* TOP CTAs */}
          <div className="rounded-[12px] border border-[rgba(186,169,148,0.25)] bg-[#fffefc] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <div>
              <h3 className="font-sans text-[16px] font-bold tracking-tight text-ink">Recruiter CTA Actions</h3>
              <p className="font-sans text-[13px] text-ink-subtle text-ink-muted">Funnel click events on resume downloads & professional connections</p>
            </div>
            
            <div className="mt-6 space-y-4">
              {data.topCTAs.map((cta, idx) => {
                const maxCount = Math.max(...data.topCTAs.map(c => c.count), 1);
                const percent = Math.round((cta.count / maxCount) * 100);

                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between font-sans text-[13.5px] font-medium">
                      <span className="text-ink">{cta.name}</span>
                      <span className="text-ink-muted">{cta.count} clicks</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-cream overflow-hidden">
                      <div 
                        style={{ width: `${percent}%` }}
                        className="h-full rounded-full bg-[#2f5bff] transition-all duration-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOST VIEWED CASE STUDIES */}
          <div className="rounded-[12px] border border-[rgba(186,169,148,0.25)] bg-[#fffefc] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <div>
              <h3 className="font-sans text-[16px] font-bold tracking-tight text-ink">Most Viewed Case Studies</h3>
              <p className="font-sans text-[13px] text-ink-subtle">Aggregated reader interest across key design projects</p>
            </div>

            <div className="mt-6 divide-y divide-[rgba(186,169,148,0.15)]">
              {data.mostViewedStudies.map((study, idx) => (
                <div key={idx} className="flex items-center justify-between py-3.5 font-sans text-[14px]">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream text-[11px] font-bold text-ink-muted">
                      {idx + 1}
                    </span>
                    <span className="truncate font-medium text-ink hover:text-[#2f5bff] transition-colors">{study.title}</span>
                  </div>
                  <span className="shrink-0 font-semibold text-ink-muted">{study.views} reads</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Devices, Traffic Sources & Referrer */}
        <div className="space-y-6 md:col-span-5">
          {/* REFERRER SOURCES */}
          <div className="rounded-[12px] border border-[rgba(186,169,148,0.25)] bg-[#fffefc] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <div>
              <h3 className="font-sans text-[16px] font-bold tracking-tight text-ink">Acquisition Channels</h3>
              <p className="font-sans text-[13px] text-ink-subtle">Primary entry pathways and referrers for site sessions</p>
            </div>

            <div className="mt-6 space-y-4 font-sans text-[13.5px]">
              {data.referrers.slice(0, 5).map((ref, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Link2 size={15} className="text-ink-muted/60" />
                    <span className="font-medium text-ink">{ref.source}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-ink-subtle">{ref.count}</span>
                    <span className="inline-block w-10 text-right font-bold text-ink-muted">{ref.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DEVICE BREAKDOWN */}
          <div className="rounded-[12px] border border-[rgba(186,169,148,0.25)] bg-[#fffefc] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <div>
              <h3 className="font-sans text-[16px] font-bold tracking-tight text-ink">Device Categories</h3>
              <p className="font-sans text-[13px] text-ink-subtle">Active user hardware distribution statistics</p>
            </div>

            <div className="mt-6 space-y-4">
              {data.devices.map((device, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream">
                    {getDeviceIcon(device.category)}
                  </div>
                  <div className="flex-1 font-sans text-[13.5px]">
                    <div className="flex justify-between font-medium">
                      <span className="text-ink">{device.category}</span>
                      <span className="font-bold text-ink-muted">{device.percentage}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-cream overflow-hidden">
                      <div 
                        style={{ width: `${device.percentage}%` }}
                        className="h-full rounded-full bg-[#2f5bff]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RECENT ACTIVITY FEED ── */}
      <div className="rounded-[12px] border border-[rgba(186,169,148,0.25)] bg-[#fffefc] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
        <div>
          <h3 className="font-sans text-[16px] font-bold tracking-tight text-ink">Live Recruiter Activity</h3>
          <p className="font-sans text-[13px] text-ink-subtle">Chronological overview of engagement events inside your internet corner</p>
        </div>

        <div className="mt-6 relative border-l-2 border-cream pl-6 ml-3 space-y-6">
          {data.recentActivity.map((activity, idx) => (
            <div key={idx} className="relative group/activity">
              {/* Bullet Node */}
              <div className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-[#2f5bff] group-hover/activity:scale-110 transition-transform" />
              
              {/* Activity Details */}
              <div className="font-sans text-[14px]">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-ink">{activity.event}</span>
                  <span className="text-[12px] font-medium text-ink-subtle">{activity.time}</span>
                </div>
                <p className="mt-1 text-[13.5px] leading-relaxed text-ink-subtle font-medium">
                  {activity.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
