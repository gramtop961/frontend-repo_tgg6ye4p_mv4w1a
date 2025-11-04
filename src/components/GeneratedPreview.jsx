export default function GeneratedPreview({ post }) {
  if (!post) return null;

  return (
    <section className="mx-auto mt-8 max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow">
      <h3 className="mb-2 text-2xl font-bold text-gray-900">{post.title}</h3>
      <p className="mb-6 text-sm text-gray-500">Tone: {post.tone} • Length: {post.length}</p>

      <div className="prose prose-indigo max-w-none">
        {post.outline?.map((h) => (
          <h4 key={h} className="mt-6">{h}</h4>
        ))}
        <article className="whitespace-pre-wrap leading-7 text-gray-800">
          {post.content}
        </article>
      </div>
    </section>
  );
}
