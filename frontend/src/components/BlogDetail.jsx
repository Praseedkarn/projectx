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
        Loading blog…
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
    <section className="bg-[#fdfcf7] px-4 pt-28 pb-24">
      <article className="max-w-[720px] mx-auto space-y-10">

        {/* BACK */}
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:underline"
        >
          ← Back to blogs
        </button>

        {/* TITLE */}
        <header className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            {blog.title}
          </h1>

          <p className="text-sm text-gray-500">
            {new Date(blog.publishedAt).toDateString()} • {blog.readTime}
          </p>
        </header>

        {/* HERO IMAGE */}
        {blog.cover && (
          <img
            src={blog.cover}
            alt={blog.title}
            className="w-full rounded-2xl object-cover max-h-[420px]"
          />
        )}

        {/* CONTENT */}
        <div className="space-y-8 text-[17px] leading-relaxed text-gray-800">

          {blog.content.split("\n\n").map((block, i) => {
            // IMAGE BLOCK
            if (block.startsWith("img:")) {
              return (
                <img
                  key={i}
                  src={block.replace("img:", "").trim()}
                  alt=""
                  className="w-full rounded-2xl"
                />
              );
            }

            // HEADING BLOCK
            if (block.startsWith("##")) {
              return (
                <h2
                  key={i}
                  className="text-2xl font-semibold text-gray-900 pt-4"
                >
                  {block.replace("##", "").trim()}
                </h2>
              );
            }

            // NORMAL PARAGRAPH
            return <p key={i}>{block}</p>;
          })}

        </div>
      </article>
    </section>
  );
};

export default BlogDetail;
