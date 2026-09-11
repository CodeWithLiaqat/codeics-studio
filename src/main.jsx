import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Global keyboard skip link for accessibility */}
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-emerald-500 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[#050505] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#030303]"
    >
      Skip to main content
    </a>
    <App />
  </StrictMode>
);