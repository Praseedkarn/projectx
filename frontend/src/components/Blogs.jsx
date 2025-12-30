import { useEffect, useState } from "react";

const Blogs = ({ onBlogClick }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData , setFormData] =useState({
    title:"",
    excerpt:"",
    content:"",
    cover:"",
  })
const [submitting, setSubmitting] = useState(false);
const [success, setSuccess] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5001/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  const payload = {
    ...formData,
    slug: formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-"),
    author: "Guest",
    readTime: "4 min read",
    status: "published",
  };

  try {
    const res = await fetch("http://localhost:5001/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed");

    setSuccess(true);
    setFormData({ title: "", excerpt: "", content: "", cover: "" });

    // refresh blogs
    const updated = await fetch("http://localhost:5001/api/blogs");
    setBlogs(await updated.json());
  } catch {
    alert("Failed to submit story");
  } finally {
    setSubmitting(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
        Loading blogs...
      </div>
    );
  }

  return (
    <section className="bg-[#fdfcf7] px-4 pt-32 pb-24">
    <div className="max-w-6xl mx-auto space-y-16">
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg p-6 space-y-4"
            >
            <h2 className="text-xl font-semibold">✍️ Add Your Story</h2>

            <input
                name="title"
                placeholder="Story title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-2"
                required
            />

            <input
                name="cover"
                placeholder="Cover image URL"
                value={formData.cover}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-2"
                required
            />

            <input
                name="excerpt"
                placeholder="Short excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-2"
                required
            />

            <textarea
                name="content"
                placeholder="Write your full story here... 
                Share your experience, places, food, tips, emotions — everything."
                value={formData.content}
                onChange={handleChange}
                rows={10}
                className="w-full border rounded-2xl px-4 py-3
                            resize-y focus:outline-none
                            focus:ring-2 focus:ring-[#5b7c67]/40
                            text-gray-700 leading-relaxed"
                required
                />


            <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-[#5b7c67] px-6 py-2 text-white"
            >
                {submitting ? "Submitting..." : "Submit Story"}
            </button>

            {success && (
                <p className="text-green-600 text-sm">
                ✅ Story submitted successfully!
                </p>
            )}
        </form>

    

        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Travel Stories & Guides
          </h1>
          <p className="text-gray-600">
            Experiences, food trails, and slow travel inspiration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <button
              key={blog._id}
              onClick={() => onBlogClick(blog.slug)}
              className="text-left group bg-white rounded-[28px] shadow-lg overflow-hidden
                         hover:-translate-y-1 transition"
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

      </div>
    </section>
  );
};

export default Blogs;
