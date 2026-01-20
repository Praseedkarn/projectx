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

    // ✅ SAVE TOKEN IN BOTH PLACES
    localStorage.setItem("token", token);
    sessionStorage.setItem("token", token);

    // ✅ Mark login success (for popup)
    sessionStorage.setItem("loginSuccess", "true");

    // ✅ Redirect home
    navigate("/");
  }, [navigate]);

  return <p style={{ textAlign: "center" }}>Logging you in…</p>;
};

export default AuthSuccess;
