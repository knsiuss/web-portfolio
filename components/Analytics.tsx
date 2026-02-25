'use client';

import Script from 'next/script';

// Google Analytics 4
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: true,
          });
        `}
      </Script>
    </>
  );
}

// Analytics event tracking helper
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
    (window as unknown as { gtag: Function }).gtag('event', eventName, params);
  }
}

// Predefined events
export const AnalyticsEvents = {
  // Project interactions
  PROJECT_VIEW: 'project_view',
  PROJECT_DEMO_CLICK: 'project_demo_click',
  PROJECT_GITHUB_CLICK: 'project_github_click',
  
  // Certificate interactions
  CERTIFICATE_DOWNLOAD: 'certificate_download',
  
  // Contact interactions
  CONTACT_EMAIL_CLICK: 'contact_email_click',
  CONTACT_LINKEDIN_CLICK: 'contact_linkedin_click',
  CONTACT_GITHUB_CLICK: 'contact_github_click',
  CONTACT_WHATSAPP_CLICK: 'contact_whatsapp_click',
  
  // Resume
  RESUME_DOWNLOAD: 'resume_download',
  
  // Navigation
  NAV_MENU_OPEN: 'nav_menu_open',
  SECTION_VIEW: 'section_view',
  
  // Tech stack
  TECH_HOVER: 'tech_hover',
} as const;

// Track button clicks with analytics
export function trackButtonClick(
  buttonName: string,
  location: string,
  destination?: string
) {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
    destination: destination || '',
  });
}

// Track external link clicks
export function trackExternalLink(
  platform: string,
  url: string
) {
  trackEvent('external_link_click', {
    platform: platform,
    url: url,
  });
}
