import { useState } from 'react';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function BlogForm({ onGenerated }) {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [keywords, setKeywords] = useState('');
  const [length, setLength] = useState('medium');
  const [audience, setAudience] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          tone,
          length,
          audience: audience || undefined,
          keywords: keywords
            .split(',')
            .map((k) => k.trim())
            .filter((k) => k.length > 0),
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.detail || 'Failed to generate');
      }

      const data = await res.json();
      onGenerated?.(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative mx-auto -mt-16 max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">Generate a blog post</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Prompt Engineering for Beginners"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Professional</option>
            <option>Friendly</option>
            <option>Technical</option>
            <option>Persuasive</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Length</label>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Audience (optional)</label>
          <input
            type="text"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. product managers"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Keywords (comma separated)</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="automation, workflows, LLM, prompts"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {error && (
          <div className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="md:col-span-2 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Generating…' : 'Generate Post'}
          </button>
        </div>
      </form>
    </section>
  );
}
