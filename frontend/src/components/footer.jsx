import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleQuickLink = (link) => {
    alert(`Navigating to ${link}`);
  };

  return (
    <footer className="bg-[#d7f26e]/80 w-full mt-auto">
      
      {/* ===== WHITE CARD FOOTER ===== */}
      <div
        className="bg-white
                   shadow-[0_-20px_40px_rgba(0,0,0,0.08)]
                   rounded-t-[32px]
                   px-6 md:px-16
                   py-6 md:py-8
                   flex flex-col md:flex-row
                   items-center justify-between gap-6"
      >

        {/* LEFT */}
        <div className="text-sm font-medium text-gray-700">
          © {currentYear} Project X
        </div>

        {/* CENTER LINKS */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <button onClick={() => handleQuickLink("Terms")} className="hover:underline">
            Terms
          </button>

          <span className="text-gray-300">•</span>

          <button onClick={() => handleQuickLink("Privacy")} className="hover:underline">
            Privacy
          </button>

          <span className="text-gray-300">•</span>

          <button onClick={() => handleQuickLink("Cookies")} className="hover:underline">
            Cookies
          </button>
        </div>

        {/* RIGHT – LANGUAGE */}
        <select
          className="rounded-full border border-gray-300
                     bg-white px-3 py-1.5 text-sm
                     focus:outline-none"
        >
          <option>🌐 English</option>
          <option>🇮🇳 हिन्दी</option>
          <option>🇮🇳 தமிழ்</option>
          <option>🇮🇳 తెలుగు</option>
          <option>🇮🇳 മലയാളം</option>
        </select>
      </div>

      {/* ===== BACK TO TOP BUTTON ===== */}
      
    </footer>
  );
};

export default Footer;
