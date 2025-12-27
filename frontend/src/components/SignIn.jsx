import React, { useState, useEffect } from 'react';
import '../styles/SignIn.css';

const SignIn = ({ onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    username: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleSignUp();
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  // LOCAL LOGIN FUNCTION - No backend needed
  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      throw new Error('Please fill in all fields');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Create mock user from form data
    const mockUser = {
      id: Date.now(),
      username: email.split('@')[0],
      email: email,
      name: email.split('@')[0],
      fullName: email.split('@')[0],
      isLoggedIn: true,
      loginTime: Date.now()
    };

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));

    // Remember me option
    if (rememberMe) {
      localStorage.setItem('rememberEmail', email);
    } else {
      localStorage.removeItem('rememberEmail');
    }

    setSuccess(`🎉 Welcome back, ${mockUser.username}! (Demo Mode)`);

    // Call parent callback and close modal
    setTimeout(() => {
      if (onLoginSuccess) onLoginSuccess(mockUser);
      onClose();
    }, 1500);
  };

  // LOCAL SIGN UP FUNCTION - No backend needed
  const handleSignUp = async () => {
    const { name, email, password, confirmPassword, username } = formData;

    // Validation
    if (!name || !email || !password || !username) {
      throw new Error('All fields are required');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Create mock user
    const mockUser = {
      id: Date.now(),
      username: username,
      email: email,
      name: name,
      fullName: name,
      isLoggedIn: true,
      loginTime: Date.now()
    };

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));

    setSuccess(`🎉 Account created successfully, ${mockUser.username}! (Demo Mode)`);

    // Call parent callback and close
    setTimeout(() => {
      if (onLoginSuccess) onLoginSuccess(mockUser);
      onClose();
    }, 1500);
  };

  // Demo login buttons
  const handleDemoLogin = async (email, password) => {
    setFormData({
      email: email,
      password: password,
      confirmPassword: '',
      name: '',
      username: ''
    });
    setIsLogin(true);

    // Auto-submit after 500ms
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
        form.dispatchEvent(submitEvent);
      }
    }, 500);
  };

  // Pre-fill email if remembered
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="signin-modal">
      <div className="signin-content">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2 className="signin-title">
          {isLogin ? 'Welcome Back! 👋' : 'Create Account 🎉'}
        </h2>

        <p className="signin-subtitle">
          {isLogin ? 'Sign in to your travel account' : 'Start your travel journey with us'}
          <span className="demo-notice"> (Demo Mode)</span>
        </p>

        {/* Connection Status */}
        <div className="connection-status">
          <div className="status-dot connected"></div>
          <span>Mode: Local Demo ✅</span>
        </div>

        {/* Success Message */}
        {success && (
          <div className="success-message">
            ✅ {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Demo Quick Login Buttons */}
        <div className="demo-quick-login">
          <p className="demo-title">Quick Demo Logins:</p>
          <div className="demo-buttons">
            <button
              type="button"
              className="demo-btn"
              onClick={() => handleDemoLogin('test@test.com', 'test123')}
            >
              👤 Test Account
            </button>
            <button
              type="button"
              className="demo-btn"
              onClick={() => handleDemoLogin('demo@user.com', 'demo123')}
            >
              🎯 Demo Account
            </button>
          </div>
        </div>

        <div className="divider">
          <span>or use your own demo credentials</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required={!isLogin}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 chars)"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </div>
          )}

          {isLogin && (
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Processing...
              </>
            ) : (
              isLogin ? 'Sign In (Demo)' : 'Create Account (Demo)'
            )}
          </button>
        </form>

        {/* Switch between Login/Signup */}
        <div className="switch-mode">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              className="switch-btn"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
                setFormData({
                  email: formData.email,
                  password: '',
                  confirmPassword: '',
                  name: '',
                  username: ''
                });
              }}
              type="button"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Demo Info */}
        <div className="api-info">
          <p><small>Mode: Local Demo (No backend needed)</small></p>
          <p><small>Data saved in browser localStorage</small></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;