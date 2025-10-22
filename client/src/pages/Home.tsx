import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="prose mx-auto">
      <h1>Essayons Change Management</h1>
      <p>
        A lightweight Change Management Information System — your trusted place for tracking and auditing changes.
      </p>

      <div className="flex gap-4 mt-6">
        <a
          className="btn bg-blue-600 text-white px-4 py-2 rounded"
          href="/app"
        >
          Existing users? Click here
        </a>
        <button
          className="btn border px-4 py-2 rounded"
          onClick={() => navigate('/about')}
        >
          About us
        </button>
      </div>

      <section className="mt-10">
        <h2>Featured</h2>
        <p>Quick intro, a short screenshot, and links to pricing, tutorials, and a blog to build credibility.</p>
      </section>
    </div>
  );
}