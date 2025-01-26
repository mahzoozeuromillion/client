import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <Analytics />
        <Router>
          {/* setup different route  */}
          <Toaster />
          <App />
        </Router>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
