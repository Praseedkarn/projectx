import React, { useState } from "react";


import { Link } from "react-router-dom";



// const captchaRef= useRef(null);
const SignIn = ({ onClose, onLoginSuccess }) => {
  const handleGoogleLogin = () => {
  window.location.href = `${API_URL}/api/auth/google`;
};
const API_URL = process.env.REACT_APP_API_URL;
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const[ rememberMe , setRememberMe] = useState(false);
//   const [captchaToken, setCaptchaToken] = useState(null);
// const captchaRef= useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= LOGIN ================= */
const handleLogin = async () => {
  const { email, password } = formData;

  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }), // ✅ NO captcha
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }

  const data = await res.json();
  const storage = rememberMe ? localStorage : sessionStorage;

  storage.setItem("token", data.token);
  storage.setItem("user", JSON.stringify(data.user));

  onLoginSuccess(data.user);
  onClose();
};


  /* ================= SIGN UP ================= */
  const handleRegister = async () => {
  const { name, username, email, password, confirmPassword } = formData;

  if (!name || !username || !email || !password) {
    throw new Error("All fields required");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  

  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      username,
      email,
      password,
      // captchaToken,
    }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg);
  }

  setIsLogin(true);
  // setCaptchaToken(null);
  onClose();
};


  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } catch (err) {
      setError(err.message.replace(/["{}]/g, ""));
    } finally {
      setLoading(false);
      // setCaptchaToken(null);
      // captchaRef.current?.reset();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-700"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        <p className="mt-1 text-sm text-center text-gray-500">
          {isLogin
            ? "Sign in to your Expeditio account"
            : "Join Expeditio and start planning"}
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 px-4 py-2 text-sm text-red-600">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {!isLogin && (
            <>
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b7c67]/40"
                required
              />

              <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b7c67]/40"
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b7c67]/40"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b7c67]/40"
            required
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5b7c67]/40"
              required
            />
          )}

          {isLogin && (
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#5b7c67]"
              />
              Remember me
            </label>
          )}

       {/* {!isLogin && (
  <ReCAPTCHA
    ref={captchaRef}
    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
    onChange={(token) => setCaptchaToken(token)}
    onExpired={() => setCaptchaToken(null)}
    onErrored={() => {
      setCaptchaToken(null);
      setError("Captcha failed to load. Refresh and try again.");
    }}
  />
)} */}




         <button
            type="submit"
            disabled={loading}

            className="w-full rounded-full bg-[#5b7c67] py-3 font-medium text-white
                      hover:bg-[#4a6a58] transition disabled:opacity-60"
          >

            {loading
              ? "Processing..."
              : isLogin
                ? "Sign In"
                : "Create Account"}
          </button>

          <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full rounded-full border py-3 font-medium text-gray-700
                    hover:bg-gray-100 transition flex items-center justify-center gap-3"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
        <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
          By continuing, you agree to our{" "}
          <Link
            to="/terms"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Privacy Policy
          </Link>.
        </p>


        </form>

        {/* Switch */}
        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "No account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              // setCaptchaToken(null);
              setError("");
            }}
            className="font-medium text-[#5b7c67] hover:underline"
            type="button"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
