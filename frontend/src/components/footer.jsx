import React from "react";


const Footer = () => {
  return (
    <footer className="bg-[#d7f26e]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-5 gap-10 text-sm">

        {/* BRAND */}
        <div className="md:col-span-2">
          <h3 className="font-bold text-lg">PROJECT X</h3>
          <p className="mt-2 text-sm">
            Experience the world, your way.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2">
            <li>FAQ</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2">
            <li>Travel Guides</li>
            <li>Immigration Guides</li>
            <li>Destination Guides</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Community</h4>
          <ul className="space-y-2">
            <li>Blog</li>
            <li>Instagram</li>
            <li>TikTok</li>
            <li>Local Guides</li>
          </ul>
        </div>
      </div>

      <div className="text-xs text-center pb-6">
        © 2026 Project X. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
