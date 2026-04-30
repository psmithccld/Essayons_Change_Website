declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export const gtag = {
  newsletterSignup: (sourcePage: string) =>
    trackEvent("newsletter_signup", { source_page: sourcePage }),
  contactClick: () => trackEvent("contact_click"),
  pricingView: () => trackEvent("pricing_view"),
  signinClick: () => trackEvent("signin_click"),
  gameStart: (gameName: string) => trackEvent("game_start", { game_name: gameName }),
};
