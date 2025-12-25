import React, { useState } from 'react';
import '../styles/SignIn.css';

const SignIn = ({ onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isLogin) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  // LOGIN FUNCTION
  const handleLogin = () => {
    const { email, password } = formData;

    // 1. Get all users from localStorage
    const users = JSON.parse(localStorage.getItem('travelUsers') || '[]');
    
    // 2. Find user with matching email
    const user = users.find(u => u.email === email);
    
    if (!user) {
      setError('User not found. Please sign up first.');
      return;
    }
    
    // 3. Check password (for demo, plain text comparison)
    if (user.password !== password) {
      setError('Incorrect password');
      return;
    }
    
    // 4. Login successful - save session
    const sessionData = {
      email: user.email,
      name: user.name,
      isLoggedIn: true,
      loginTime: Date.now()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(sessionData));
    
    // 5. Remember me option
    if (rememberMe) {
      localStorage.setItem('rememberEmail', email);
    }
    
    // 6. Show success and close
    setSuccess(`Welcome back, ${user.name}! `);
    
    // 7. Call parent callback and close modal
    setTimeout(() => {
      if (onLoginSuccess) onLoginSuccess(sessionData);
      onClose();
    }, 1500);
  };

  // SIGN UP FUNCTION
  const handleSignUp = () => {
    const { name, email, password, confirmPassword } = formData;

    // 1. Validate
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // 2. Check if email already exists
    const users = JSON.parse(localStorage.getItem('travelUsers') || '[]');
    const emailExists = users.some(u => u.email === email);
    
    if (emailExists) {
      setError('Email already registered');
      return;
    }
    
    // 3. Create new user
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password, // ⚠️ For demo only - plain text!
      createdAt: new Date().toISOString(),
      trips: []
    };
    
    // 4. Save to users list
    users.push(newUser);
    localStorage.setItem('travelUsers', JSON.stringify(users));
    
    // 5. Auto login
    const sessionData = {
      email: newUser.email,
      name: newUser.name,
      isLoggedIn: true,
      loginTime: Date.now()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(sessionData));
    
    // 6. Show success
    setSuccess(`Account created successfully, ${name}! 🎉`);
    
    // 7. Call parent callback and close
    setTimeout(() => {
      if (onLoginSuccess) onLoginSuccess(sessionData);
      onClose();
    }, 1500);
  };

  // Forgot password
  const handleForgotPassword = () => {
    const email = prompt('Enter your email to reset password:');
    if (email) {
      const users = JSON.parse(localStorage.getItem('travelUsers') || '[]');
      const user = users.find(u => u.email === email);
      
      if (user) {
        alert(`Password reset instructions sent to ${email} \n(For demo: Your password is "${user.password}")`);
      } else {
        alert('Email not found');
      }
    }
  };

  // Google sign in (demo)
  const handleGoogleSignIn = () => {
    alert('Google sign in would work with real Auth0 setup. For now, please use email sign in.');
  };

  // Pre-fill email if remembered
  React.useEffect(() => {
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
          {isLogin ? 'Welcome ! ' : 'Create Account 🎉'}
        </h2>
        
        <p className="signin-subtitle">
          {isLogin ? 'Sign in to your travel account' : 'Start your travel journey'}
        </p>

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

        {/* Demo Notice */}
        {/* <div className="demo-notice">
          <small>⚠️ Demo: Passwords stored in plain text. For learning only.</small>
        </div> */}

        {/* Google Button */}
        <button className="google-btn" onClick={handleGoogleSignIn}>
          <span className="google-icon">G</span>
          Continue with Google
        </button>

        <div className="divider">
          <span>or use email</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
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
              placeholder="Password"
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
                required
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
              
              <button 
                type="button" 
                className="forgot-password"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? 'Sign In' : 'Create Account'}
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
              }}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Demo Accounts */}
        <div className="demo-accounts">
          <p><small>Demo accounts:</small></p>
          <p><small>Email: test@test.com | Password: test123</small></p>
          <p><small>Email: user@demo.com | Password: demo123</small></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;