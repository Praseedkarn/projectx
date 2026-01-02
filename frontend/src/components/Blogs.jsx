import { useEffect, useState } from "react";

const Blogs = ({ onBlogClick }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    fetch("http://localhost:5001/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setBlogs([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
        Loading blogs...
      </div>
    );
  }

  return (
    <section className="bg-[#fdfcf7] px-4 pt-32 pb-24">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* ===== HEADER ===== */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Travel Blogs & Guides
          </h1>
          <p className="text-gray-600">
            Smart travel insights, budgets, and destination guides
          </p>
        </div>

        {isAdmin && (
          <div className="flex justify-end">
            <button
              onClick={() => onBlogClick("admin")}
              className="rounded-full bg-[#5b7c67]
                        px-5 py-2 text-white text-sm
                        font-medium shadow-md
                        hover:bg-[#4e6b59]"
            >
              🛠 Add New Blog
            </button>
          </div>
        )}


        {/* ===== BLOG GRID ===== */}
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">
            No blogs published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <button
                key={blog._id}
                onClick={() => onBlogClick(blog.slug)}
                className="text-left group bg-white rounded-[28px] shadow-lg
                           overflow-hidden hover:-translate-y-1 transition"
              >
                <img
                  src={blog.cover}
                  alt={blog.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6 space-y-3">
                  <p className="text-xs text-gray-500">
                    {new Date(blog.publishedAt).toDateString()} • {blog.readTime}
                  </p>

                  <h2 className="text-xl font-semibold text-gray-800
                                 group-hover:text-[#5b7c67]">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-gray-600">
                    {blog.excerpt}
                  </p>

                  <span className="inline-block text-sm font-medium
                                   text-[#5b7c67]">
                    Read more →
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
