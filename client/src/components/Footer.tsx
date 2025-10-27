import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12" role="contentinfo">
      <div className="container mx-auto px-4 py-10 text-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-3">
              <img src="/assets/logo.png" alt="Essayons Change logo" className="h-10 w-10 object-contain" />
              <div>
                <div className="text-lg font-semibold text-essayons-text">Essayons Change, LLC</div>
                <div className="text-sm text-gray-600">Emmitsburg, MD 21727</div>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <div>psmith@essayonschange.com | 240-446-1093</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-essayons-text mb-2">Connect</h4>
            <ul className="text-sm space-y-1">
              <li>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  YouTube
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-essayons-text mb-2">Legal</h4>
            <ul className="text-sm space-y-1">
              <li>
                <Link to="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4 text-sm text-gray-600">
          <div>© 2025 Essayons Change LLC. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}