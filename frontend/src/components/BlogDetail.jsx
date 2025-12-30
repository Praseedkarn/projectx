import blogs from "../data/blogs";

const BlogDetail = ({ slug, onBack }) => {
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-600">
        <p className="mb-4">Blog not found</p>
        <button
          onClick={onBack}
          className="rounded-full border px-6 py-2 hover:bg-gray-50"
        >
          ← Back to blogs
        </button>
      </div>
    );
  }

  return (
    <section className="bg-[#fdfcf7] px-4 pt-32 pb-24">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* BACK BUTTON */}
        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back to blogs
        </button>

        {/* COVER IMAGE */}
        <img
          src={blog.cover}
          alt={blog.title}
          className="w-full rounded-3xl max-h-[420px] object-cover"
        />

        {/* TITLE & META */}
        <div className="space-y-3">
          <p className="text-xs text-gray-500">
            {blog.date} • {blog.readTime}
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
            {blog.title}
          </h1>
        </div>

        {/* CONTENT */}
        <article className="prose prose-gray max-w-none">
          {blog.content
            .trim()
            .split("\n")
            .filter(Boolean)
            .map((line, i) => (
              <p key={i}>{line}</p>
            ))}
        </article>

      </div>
    </section>
  );
};

export default BlogDetail;
