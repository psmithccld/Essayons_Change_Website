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
  gameComplete: (gameName: string, params?: Record<string, string | number>) =>
    trackEvent("game_complete", { game_name: gameName, ...params }),
  gameGateShown: (sourcePage: string) =>
    trackEvent("game_gate_shown", { source_page: sourcePage }),
  gameGateCompleted: (sourcePage: string) =>
    trackEvent("game_gate_completed", { source_page: sourcePage }),
  gameGateSkipped: (sourcePage: string) =>
    trackEvent("game_gate_skipped", { source_page: sourcePage }),
  gameCompleted: (gameName: string, score: string | number) =>
    trackEvent("game_completed", { game_name: gameName, score }),
};
