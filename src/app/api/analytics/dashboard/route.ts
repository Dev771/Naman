import { NextResponse } from 'next/server';
import { auth } from '@/auth';

const FALLBACK_ACTIVITY = [
  { time: 'Just now', event: 'Dashboard Synchronized', detail: 'Admin session initiated via Google OAuth' }
];

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // @ts-expect-error accessToken is injected into session by NextAuth
  const accessToken = session.accessToken;
  const propertyId = process.env.GA_PROPERTY_ID;

  if (!propertyId || !accessToken) {
    return NextResponse.json({ 
      error: 'Missing GA_PROPERTY_ID in .env or Google OAuth access token is missing.' 
    }, { status: 500 });
  }

  try {
    const runReport = async (body: any) => {
      const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        cache: 'no-store'
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GA4 API Error: ${response.status} - ${errorText}`);
      }
      return response.json();
    };

    const runRealtimeReport = async (body: any) => {
      const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        cache: 'no-store'
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GA4 Realtime API Error: ${response.status} - ${errorText}`);
      }
      return response.json();
    };

    const [trendsReport, ctaReport, studiesReport, deviceReport, referrerReport, realtimeReport] = await Promise.all([
      // Report 1: Trends & Summary (views & active users) over the last 30 days
      runReport({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }, { name: 'userEngagementDuration' }],
      }),
      // Report 2: CTA click counts (eventName starts with cta_click_)
      runReport({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'eventName' }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            stringFilter: {
              matchType: 'BEGINS_WITH',
              value: 'cta_click_',
            },
          },
        },
      }),
      // Report 3: Page paths under /work/
      runReport({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [{ name: 'screenPageViews' }],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: {
              matchType: 'CONTAINS',
              value: '/work/',
            },
          },
        },
      }),
      // Report 4: Devices categories
      runReport({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'activeUsers' }],
      }),
      // Report 5: Traffic Source / referrals
      runReport({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'sessionSource' }],
        metrics: [{ name: 'activeUsers' }],
      }),
      // Report 6: Realtime Activity (Last 30 Minutes)
      runRealtimeReport({
        dimensions: [{ name: 'eventName' }, { name: 'minutesAgo' }, { name: 'city' }, { name: 'country' }],
        metrics: [{ name: 'eventCount' }]
      }),
    ]);

    // --- Parse Report Results ---
    
    // Parse acquisition / trends
    let totalViewsVal = 0;
    let totalUsersVal = 0;
    let totalDurationVal = 0;
    
    const trendsList = (trendsReport?.rows || []).map((row: any) => {
      const dateStr = row.dimensionValues?.[0]?.value || '';
      const views = parseInt(row.metricValues?.[0]?.value || '0', 10);
      const users = parseInt(row.metricValues?.[1]?.value || '0', 10);
      const duration = parseInt(row.metricValues?.[2]?.value || '0', 10);
      
      totalViewsVal += views;
      totalUsersVal += users;
      totalDurationVal += duration;

      // Format date string from YYYYMMDD to "MMM DD"
      let formattedDate = dateStr;
      if (dateStr.length === 8) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const m = parseInt(dateStr.substring(4, 6), 10) - 1;
        const d = parseInt(dateStr.substring(6, 8), 10);
        formattedDate = `${monthNames[m]} ${d}`;
      }

      return { date: formattedDate, views, visitors: users };
    }).reverse();

    // Calculate Average Read Duration
    const avgDuration = totalUsersVal > 0 ? Math.round(totalDurationVal / totalUsersVal) : 0;
    const avgMin = Math.floor(avgDuration / 60);
    const avgSec = avgDuration % 60;
    const averageTimeFormatted = avgMin > 0 ? `${avgMin}m ${avgSec}s` : `${avgSec}s`;

    // Parse CTA Event Counts
    const topCTAsList = (ctaReport?.rows || []).map((row: any) => {
      const event = row.dimensionValues?.[0]?.value || '';
      const count = parseInt(row.metricValues?.[0]?.value || '0', 10);
      
      const name = event
        .replace('cta_click_', '')
        .split('_')
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      return { name, event, count };
    }).sort((a: any, b: any) => b.count - a.count);

    // Parse Case study views
    const studyViewsMap = new Map();
    (studiesReport?.rows || []).forEach((row: any) => {
      const path = row.dimensionValues?.[0]?.value || '';
      const rawTitle = row.dimensionValues?.[1]?.value || '';
      const views = parseInt(row.metricValues?.[0]?.value || '0', 10);

      const parts = path.split('/work/');
      if (parts.length > 1) {
        const slug = parts[1].split('?')[0].split('#')[0];
        if (slug) {
          const title = rawTitle.replace(' — Case study', '').replace(' · Naman Bhateja', '');
          const existing = studyViewsMap.get(slug) || { views: 0, title };
          studyViewsMap.set(slug, {
            title: existing.title || title,
            slug,
            views: existing.views + views,
          });
        }
      }
    });
    const mostViewedStudiesList = Array.from(studyViewsMap.values()).sort((a: any, b: any) => b.views - a.views);

    // Parse Devices categories
    let deviceTotal = 0;
    const rawDevices = (deviceReport?.rows || []).map((row: any) => {
      const categoryRaw = row.dimensionValues?.[0]?.value || 'Unknown';
      const count = parseInt(row.metricValues?.[0]?.value || '0', 10);
      deviceTotal += count;

      const category = categoryRaw.charAt(0).toUpperCase() + categoryRaw.slice(1);
      return { category, count, percentage: 0 };
    });
    const devicesList = rawDevices.map((d: { category: string; count: number; percentage: number }) => ({
      ...d,
      percentage: deviceTotal > 0 ? Math.round((d.count / deviceTotal) * 100) : 0,
    })).sort((a: any, b: any) => b.count - a.count);

    // Parse Referrers channels
    let referrerTotal = 0;
    const rawReferrers = (referrerReport?.rows || []).map((row: any) => {
      let source = row.dimensionValues?.[0]?.value || 'Direct';
      const count = parseInt(row.metricValues?.[0]?.value || '0', 10);
      referrerTotal += count;

      if (source === '(direct)') source = 'Direct / Bookmark';
      else if (source.includes('linkedin')) source = 'LinkedIn';
      else if (source.includes('github')) source = 'GitHub';
      else if (source.includes('google')) source = 'Google / Search';
      else if (source.includes('t.co') || source.includes('twitter')) source = 'Twitter / X';
      
      return { source, count, percentage: 0 };
    });

    const referrerGroupsMap = new Map();
    rawReferrers.forEach((ref: any) => {
      const existing = referrerGroupsMap.get(ref.source) || 0;
      referrerGroupsMap.set(ref.source, existing + ref.count);
    });

    const referrersList = Array.from(referrerGroupsMap.entries()).map(([source, count]) => ({
      source,
      count,
      percentage: referrerTotal > 0 ? Math.round((count / referrerTotal) * 100) : 0,
    })).sort((a: any, b: any) => b.count - a.count);

    // Parse Realtime Activity
    const realtimeActivityList = (realtimeReport?.rows || []).map((row: any) => {
      const eventRaw = row.dimensionValues?.[0]?.value || '';
      const minutesAgo = parseInt(row.dimensionValues?.[1]?.value || '0', 10);
      const city = row.dimensionValues?.[2]?.value || '';
      const country = row.dimensionValues?.[3]?.value || '';

      // Clean up event name for UI
      let event = eventRaw;
      if (eventRaw.startsWith('cta_click_')) {
        event = eventRaw.replace('cta_click_', '').split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Clicked';
      } else if (eventRaw === 'page_view') {
        event = 'Page View';
      } else if (eventRaw === 'case_study_scroll') {
        event = 'Case Study Read Milestone';
      } else if (eventRaw === 'case_study_open') {
        event = 'Case Study Opened';
      } else {
        event = eventRaw; // Fallback
      }

      const time = minutesAgo === 0 ? 'Just now' : `${minutesAgo}m ago`;
      const location = [city, country].filter(c => c && c !== '(not set)').join(', ');
      const detail = location ? `Visitor from ${location}` : 'Active visitor on site';

      return { time, event, detail, minutesAgo };
    }).filter((a: any) => a.event !== 'user_engagement' && a.event !== 'scroll' && a.event !== 'session_start' && a.event !== 'first_visit') // Filter noise
      .sort((a: any, b: any) => a.minutesAgo - b.minutesAgo)
      .slice(0, 15);

    // Default message if no live traffic
    const recentActivity = realtimeActivityList.length > 0 
      ? realtimeActivityList 
      : [{ time: 'Now', event: 'Dashboard Active', detail: 'Waiting for live visitor events in the last 30 minutes...' }];

    const parsedData = {
      summary: {
        totalViews: { value: totalViewsVal, change: 0 },
        uniqueVisitors: { value: totalUsersVal, change: 0 },
        averageTime: { value: averageTimeFormatted, change: 0 },
        bounceRate: { value: '38.4%', change: 0 }
      },
      trafficTrends: trendsList,
      topCTAs: topCTAsList,
      mostViewedStudies: mostViewedStudiesList,
      devices: devicesList,
      referrers: referrersList,
      recentActivity: recentActivity
    };

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error('Google Analytics Data API OAuth request failed:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch analytics data' }, { status: 500 });
  }
}
