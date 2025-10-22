import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg">Essayons</Link>
        <nav className="flex gap-4">
          <Link to="/about">About</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/tutorials">Tutorials</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/games">Games</Link>
          <a href="/app" className="underline">Existing users</a>
        </nav>
      </div>
    </header>
  );
}