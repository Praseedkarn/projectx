import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/");
      return;
    }

    // ✅ Save token
    localStorage.setItem("token", token);

    // ✅ Just redirect
    navigate("/");
  }, [navigate]);

  return <p style={{ textAlign: "center" }}>Logging you in...</p>;
};

export default AuthSuccess;
