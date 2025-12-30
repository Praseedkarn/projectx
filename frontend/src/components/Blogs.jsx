import blogs from "../data/blogs";

const Blogs = ({ onBlogClick }) => {
  return (
    <section className="bg-[#fdfcf7] px-4 pt-32 pb-24">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Travel Stories & Guides
          </h1>
          <p className="text-gray-600">
            Experiences, food trails, and slow travel inspiration
          </p>
        </div>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <button
              key={blog.id}
              onClick={() => onBlogClick(blog.slug)}   // ✅ THIS IS THE KEY
              className="group text-left bg-white rounded-[28px]
                         shadow-lg overflow-hidden
                         hover:-translate-y-1 transition
                         focus:outline-none"
            >
              <img
                src={blog.cover}
                alt={blog.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6 space-y-3">
                <p className="text-xs text-gray-500">
                  {blog.date} • {blog.readTime}
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
