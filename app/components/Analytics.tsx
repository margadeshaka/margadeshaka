'use client';

import { useEffect } from 'react';
import Script from 'next/script';
// import { ApplicationInsights } from '@microsoft/applicationinsights-web';

interface AnalyticsProps {
  analyticsId?: string;
}

/**
 * Analytics component for monitoring user engagement
 * Supports both Google Analytics and Azure Application Insights
 */
export default function Analytics({ analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID }: AnalyticsProps) {
  // Skip if no analytics ID is provided or in development
  if (!analyticsId || process.env.NODE_ENV === 'development') {
    return null;
  }

  // Determine if it's Google Analytics (starts with G-) or Azure Application Insights
  const isGoogleAnalytics = analyticsId.startsWith('G-');

  // For Google Analytics
  if (isGoogleAnalytics) {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analyticsId}');
          `}
        </Script>
      </>
    );
  }

  // For Azure Application Insights
  useEffect(() => {
    if (!analyticsId) return;

    // Initialize Application Insights
    // const appInsights = new ApplicationInsights({
    //   config: {
    //     instrumentationKey: analyticsId,
    //     enableAutoRouteTracking: true,
    //   },
    // });
    // appInsights.loadAppInsights();
    // appInsights.trackPageView();
    //
    // // Track page views on route change
    // const handleRouteChange = (url: string) => {
    //   appInsights.trackPageView({ name: url });
    // };

    // Clean up on unmount
    return () => {
      // window.removeEventListener('routeChangeComplete', handleRouteChange);
    };
  }, [analyticsId]);

  return null;
}
