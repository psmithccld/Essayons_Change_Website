import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/image_1758211685824_1761593188026.png";
import { gtag } from "@/lib/gtag";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/model", label: "The Model" },
  { path: "/blog", label: "Blog" },
  { path: "/tutorials", label: "Tutorials" },
  { path: "/games", label: "Learning" },
  { path: "/offerings", label: "Offerings" },
  { path: "/pricing", label: "Pricing" },
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
    <header className="sticky top-0 z-50 w-full border-b bg-gray-100">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" data-testid="link-home">
          <div className="flex flex-col">
            <img src={logoImage} alt="Essayons Change logo" className="h-10 object-contain" />
            <span className="hidden sm:block text-xs font-medium text-muted-foreground tracking-wide mt-0.5">Research-Driven Change Management</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button
                variant={location === item.path ? "secondary" : "ghost"}
                size="sm"
                onClick={() => handleNavClick(item.label)}
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://app.essayonschange.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-app"
          >
            <Button
              variant="default"
              size="sm"
              onClick={() => gtag.signinClick()}
            >
              Sign In
            </Button>
          </a>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t bg-gray-100 md:hidden">
          <nav className="container flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick(item.label);
                  }}
                  data-testid={`mobile-link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
