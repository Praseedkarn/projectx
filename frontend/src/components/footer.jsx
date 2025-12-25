import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleQuickLink = (link) => {
    alert(`Navigating to ${link}`);
  };

  const handleSocialClick = (platform) => {
    alert(`Opening ${platform}`);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    alert(`Thank you! You'll receive updates at ${email}`);
    e.target.reset();
  };

  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-top">
        {/* <div className="footer-column">
          <h4 className="column-title">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <button 
                className="footer-link"
                onClick={() => handleQuickLink('Home')}
              >
                🏠 Home
              </button>
            </li>
            <li>
              <button 
                className="footer-link"
                onClick={() => handleQuickLink('Plan Trip')}
              >
                📋 Plan Trip
              </button>
            </li>
            <li>
              <button 
                className="footer-link"
                onClick={() => handleQuickLink('Destinations')}
              >
                🗺️ Destinations
              </button>
            </li>
            <li>
              <button 
                className="footer-link"
                onClick={() => handleQuickLink('Blog')}
              >
                📝 Blog
              </button>
            </li>
          </ul>
        </div> */}

        {/* <div className="footer-column">
          <h4 className="column-title">Support</h4>
          <ul className="footer-links">
            <li>
              <button 
                className="footer-link"
                onClick={() => handleQuickLink('Help Center')}
              >
                ❓ Help Center
              </button>
            </li>
            <li>
              <button 
                className="footer-link"
                onClick={() => handleQuickLink('Contact Us')}
              >
                📞 Contact Us
              </button>
            </li>
            <li>
              <button 
                className="footer-link"
                onClick={() => handleQuickLink('FAQ')}
              >
                ❔ FAQ
              </button>
            </li>
            <li>
              <button 
                className="footer-link"
                onClick={() => handleQuickLink('Privacy Policy')}
              >
                🔒 Privacy Policy
              </button>
            </li>
          </ul>
        </div>*/}
      </div> 

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            © {currentYear} Project X.
          </div>
          
          <div className="footer-bottom-links">
            <button 
              className="bottom-link"
              onClick={() => handleQuickLink('Terms of Service')}
            >
              Terms
            </button>
            <span className="separator">•</span>
            <button 
              className="bottom-link"
              onClick={() => handleQuickLink('Privacy Policy')}
            >
              Privacy
            </button>
            <span className="separator">•</span>
            <button 
              className="bottom-link"
              onClick={() => handleQuickLink('Cookies')}
            >
              Cookies
            </button>
          </div>
          
          <div className="language-selector">
            <select className="language-select">
              <option>🌐 English</option>
              <option>🇮🇳 हिन्दी</option>
              <option>🇮🇳 தமிழ்</option>
              <option>🇮🇳 తెలుగు</option>
              <option>🇮🇳 മലയാളം</option>
            </select>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;