import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2022",
    sourcemap: false,
    cssCodeSplit: false,
    assetsInlineLimit: 15000,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Core React runtime
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
              return "vendor-react";
            }
            // 3D & WebGL Engine (Heavy chunk isolated from initial page paint)
            if (id.includes("three") || id.includes("@react-three")) {
              return "vendor-three";
            }
            // Backend & Database
            if (id.includes("@supabase")) {
              return "vendor-supabase";
            }
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});