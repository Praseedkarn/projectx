import { useState } from "react";

const AdminBlog = ({ onBack }) => {
  /* ================= HOOKS FIRST ================= */
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    cover: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  /* ================================================= */

  /* ================= ADMIN CHECK ================= */
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const token = localStorage.getItem("token");

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        🚫 Admin access only
      </div>
    );
  }
  /* ================================================= */

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const payload = {
      ...formData,
      slug: formData.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-"),
      author: "Project X",
      readTime: "5 min read",
      status: "published",
    };

    try {
      const res = await fetch("https://projectx-yzu3.onrender.com/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      setSuccess(true);
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        cover: "",
      });
    } catch {
      alert("❌ Failed to publish blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#fdfcf7] min-h-screen px-4 pt-32 pb-24">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8 space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            🛠 Admin – Add Blog
          </h1>

          {onBack && (
            <button
              onClick={onBack}
              className="text-sm text-gray-600 hover:underline"
            >
              ← Back
            </button>
          )}
        </div>

        {/* FORM */}
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <input
            name="title"
            placeholder="Blog title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3 text-lg font-medium"
            required
          />

          {/* COVER IMAGE */}
          <input
            name="cover"
            placeholder="Cover image URL (hero image)"
            value={formData.cover}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2"
            required
          />

          {/* EXCERPT */}
          <textarea
            name="excerpt"
            placeholder="Short excerpt (shown in blog list & SEO)"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-xl px-4 py-3 resize-none"
            required
          />

          {/* CONTENT EDITOR */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Blog content (free writing)
            </label>

            <textarea
              name="content"
              placeholder={`Write freely like a travel article...

Formatting tips:
• Use blank lines between paragraphs
• Use ## for headings
• Use img:IMAGE_URL on a new line to insert images

Example:

Belize is a paradise for beach lovers.

## Best Hotels in Ambergris Caye
This island is famous for its reef.

img:https://images.unsplash.com/xxxxx
`}
              value={formData.content}
              onChange={handleChange}
              rows={18}
              className="w-full border rounded-2xl px-4 py-4
                 text-[15px] leading-relaxed
                 resize-y focus:outline-none
                 focus:ring-2 focus:ring-[#5b7c67]/40"
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="rounded-full bg-[#5b7c67] px-6 py-3
               text-white font-medium disabled:opacity-60"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>

          {success && (
            <p className="text-green-600 text-sm">
              ✅ Blog published successfully
            </p>
          )}
        </form>


      </div>
    </section>
  );
};

export default AdminBlog;
