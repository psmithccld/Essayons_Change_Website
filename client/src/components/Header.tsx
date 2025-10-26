import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '@/assets/logo.png';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/games', label: 'Games' },
  { to: '/tutorials', label: 'Tutorials' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' }
];

function NavLinkItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        'px-3 py-2 rounded-md text-sm font-medium transition-colors ' +
        (isActive ? 'text-essayons-text bg-essayons-muted/10' : 'text-essayons-text/85 hover:text-essayons-primary')
      }
    >
      {children}
    </NavLink>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu on outside click or on resize > md
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (open && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    window.addEventListener('click', onClick);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  // Track scroll to add subtle shadow / background for the sticky header
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={
        'w-full transition-shadow transition-colors duration-200 sticky top-0 z-40 bg-gray-100 border-b border-gray-200 ' +
        (scrolled ? 'shadow-sm' : '')
      }
      role="banner"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Essayons logo" className="h-10 w-10 object-contain" />
            <span className="hidden sm:inline-block text-2xl font-semibold text-essayons-text tracking-wider">
              Essayons
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-2" aria-label="Primary navigation">
          {NAV_ITEMS.map((it) => (
            <NavLinkItem key={it.to} to={it.to}>
              {it.label}
            </NavLinkItem>
          ))}
        </nav>

        <div className="ml-4 flex items-center gap-3">
          <a
            href="/app"
            className="btn-primary inline-flex items-center px-3 py-2 rounded-md text-sm font-medium shadow-sm"
            aria-label="Open app"
          >
            Existing users
          </a>

          {/* Mobile menu button */}
          <div className="md:hidden" ref={menuRef}>
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
              className="btn-ghost p-2 rounded-md text-essayons-text/90 hover:bg-essayons-muted/10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </button>

            {/* Mobile panel with slide/opacity animation */}
            <div
              className={`absolute right-4 top-16 w-56 bg-white/95 backdrop-blur-sm border border-essayons-muted/10 rounded-md shadow-lg transform transition-all duration-200 origin-top-right ${
                open ? 'translate-y-0 opacity-100 pointer-events-auto animate-slideDown' : '-translate-y-2 opacity-0 pointer-events-none'
              }`}
            >
              <div className="flex flex-col p-2">
                {NAV_ITEMS.map((it) => (
                  <Link
                    key={it.to}
                    to={it.to}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 rounded text-essayons-text hover:bg-essayons-muted/5"
                  >
                    {it.label}
                  </Link>
                ))}
                <a
                  href="/app"
                  className="mt-2 mx-2 px-3 py-2 rounded bg-essayons-primary text-white text-center"
                  onClick={() => setOpen(false)}
                >
                  Existing users
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
