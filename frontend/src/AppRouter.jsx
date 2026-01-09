import React from "react";
import App from "./App";
import QrTripPage from "./components/QrTripPage";

const AppRouter = () => {
  const path = window.location.pathname;

  // 🔥 QR SHARE PAGE
  if (path.startsWith("/qr-trip/")) {
    return <QrTripPage />;
  }

  // 🔥 NORMAL APP
  return <App />;
};

export default AppRouter;
