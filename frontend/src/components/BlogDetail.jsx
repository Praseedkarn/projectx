import { useEffect, useState } from "react";

const BlogDetail = ({ slug, onBack }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch(`http://localhost:5001/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        Blog not found
      </div>
    );
  }

  return (
    <section className="bg-[#fdfcf7] px-4 pt-32 pb-24">
      <div className="max-w-3xl mx-auto space-y-8">

        <button
          onClick={onBack}
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back to blogs
        </button>

        <img
          src={blog.cover}
          alt={blog.title}
          className="w-full rounded-3xl max-h-[420px] object-cover"
        />

        <div className="space-y-3">
          <p className="text-xs text-gray-500">
            {new Date(blog.publishedAt).toDateString()} • {blog.readTime}
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
            {blog.title}
          </h1>
        </div>

        <article className="prose prose-gray max-w-none">
          {blog.content.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </article>

      </div>
    </section>
  );
};

export default BlogDetail;
