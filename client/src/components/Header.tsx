import { Link, useLocation } from "wouter";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/image_1758211685824_1761593188026.png";
import { gtag } from "@/lib/gtag";

const QUIZ_PATH = "/change-readiness-quiz";

const navItems = [
  { path: "/method", label: "The Method" },
  { path: "/offerings", label: "Offerings" },
  { path: "/partners", label: "Partners" },
  { path: "/blog", label: "Blog" },
  { path: "/games", label: "Free Tools" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

function handleNavClick(label: string) {
  if (label === "Contact") gtag.contactClick();
  if (label === "Pricing") gtag.pricingView();
}

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-[#213030] text-sm text-white">
        <div className="container flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center">
          <span>Announcing a change in the next 90 days? See where it is likely to break.</span>
          <Link
            href={QUIZ_PATH}
            className="inline-flex items-center gap-1.5 font-bold text-white underline-offset-4 hover:underline"
            data-testid="link-announcement-quiz"
          >
            Take the 5-minute check
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" data-testid="link-home">
            <div className="flex flex-col">
              <img src={logoImage} alt="Essayons Change logo" className="h-10 object-contain" />
              <span className="mt-0.5 hidden text-xs font-medium tracking-wide text-muted-foreground sm:block">
                Research-Driven Change Management
              </span>
            </div>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => handleNavClick(item.label)}
                  data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://app.essayonschange.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline"
              onClick={() => gtag.signinClick()}
              data-testid="link-app"
            >
              Sign In
            </a>
            <Link
              href={QUIZ_PATH}
              className="hidden min-h-[40px] items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:inline-flex"
              data-testid="button-header-quiz"
            >
              Free Readiness Check
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t bg-white lg:hidden">
            <nav aria-label="Mobile" className="container flex flex-col gap-2 py-4">
              {[{ path: "/", label: "Home" }, ...navItems].map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={location === item.path ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleNavClick(item.label);
                    }}
                    data-testid={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Link
                href={QUIZ_PATH}
                className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-md bg-primary px-4 font-semibold text-primary-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Free Readiness Check
              </Link>
              <a
                href="https://app.essayonschange.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center text-sm font-medium text-muted-foreground"
              >
                Sign In
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
