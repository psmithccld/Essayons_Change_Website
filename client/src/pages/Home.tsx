import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="grid gap-8 lg:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Essayons Change Management
          </h1>

          <p className="mt-6 text-lg text-gray-700">
            Combining the Army Engineer Corps' philosophy: Essayons, Let Us Try, with data-driven research into change
            management, Essayons Change bridges theory and practice.
          </p>

          <p className="mt-4 text-base text-gray-600">
            Our Change Management Information System (CMIS) empowers organizations to design, measure, and sustain change
            through integrated leadership tools and evidence-based methodologies.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center rounded-md bg-red-700 hover:bg-red-800 text-white px-5 py-3 text-sm font-medium shadow"
            >
              Get started
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-800 px-5 py-3 text-sm font-medium hover:shadow"
            >
              Learn more
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white border rounded-lg shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700">Design</h3>
              <p className="mt-2 text-xs text-gray-500">Create initiatives, roles, and plans aligned to outcomes.</p>
            </div>
            <div className="p-4 bg-white border rounded-lg shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700">Measure</h3>
              <p className="mt-2 text-xs text-gray-500">Track readiness, tasks, and impact with built-in surveys & reports.</p>
            </div>
            <div className="p-4 bg-white border rounded-lg shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700">Sustain</h3>
              <p className="mt-2 text-xs text-gray-500">Embed practices with coaching and development maps.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          {/* Hero image: add your screenshot to client/public/assets/hero-dashboard.png or serve from /assets/hero-dashboard.png */}
          <div className="w-full rounded-lg overflow-hidden shadow-lg border">
            <img
              src="/assets/hero-dashboard.png"
              alt="Essayons Change dashboard preview"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Brief feature/overview strip */}
      <section className="mt-12">
        <div className="bg-gray-50 border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
          <p className="mt-3 text-gray-600">
            Centralized initiative management, RAIDs, stakeholder maps, readiness surveys, and an AI coach — all connected to
            help your teams deliver and sustain change.
          </p>
        </div>
      </section>
    </div>
  );
}