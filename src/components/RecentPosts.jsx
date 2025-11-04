import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function RecentPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/api/posts?limit=6`);
        const data = await res.json();
        setPosts(data || []);
      } catch (e) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="mx-auto mt-12 max-w-6xl px-6">
      <div className="mb-4 flex items-end justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Recent posts</h3>
        <p className="text-sm text-gray-500">Latest generated articles</p>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading…</div>
      ) : posts.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-600">
          No posts yet. Generate your first one above.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.id} className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <h4 className="line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-indigo-700">
                {p.title}
              </h4>
              <p className="mt-1 text-sm text-gray-500">{p.topic}</p>
              <div className="mt-3 inline-flex items-center gap-2 text-xs text-gray-500">
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-indigo-700 ring-1 ring-indigo-100">{p.tone}</span>
                {p.length && (
                  <span className="rounded-full bg-gray-50 px-2 py-0.5 text-gray-700 ring-1 ring-gray-100">{p.length}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
