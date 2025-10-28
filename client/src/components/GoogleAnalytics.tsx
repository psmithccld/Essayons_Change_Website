import { useEffect } from 'react';

export function GoogleAnalytics() {
  useEffect(() => {
    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
    
    if (!trackingId) {
      return;
    }

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    
    gtag('js', new Date());
    gtag('config', trackingId);

    // Expose gtag globally
    (window as any).gtag = gtag;
  }, []);

  return null;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}
