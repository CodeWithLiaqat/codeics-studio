import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// Custom Vite Plugin: Eliminates external CSS file to remove render-blocking warnings
const inlineCssPlugin = () => ({
  name: "inline-css",
  enforce: "post",
  generateBundle(opts, bundle) {
    let cssCode = "";
    for (const key in bundle) {
      if (bundle[key].fileName.endsWith(".css")) {
        cssCode += bundle[key].source;
        delete bundle[key]; // Remove separate CSS file
      }
    }
    for (const key in bundle) {
      if (bundle[key].fileName.endsWith(".js") && bundle[key].isEntry) {
        const injector = `(function(){var s=document.createElement('style');s.textContent=${JSON.stringify(cssCode)};document.head.appendChild(s);})();`;
        bundle[key].code = injector + bundle[key].code;
      }
    }
  }
});

export default defineConfig({
  plugins: [react(), inlineCssPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2022",
    minify: "esbuild",
    sourcemap: false,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom")) {
              return "vendor-react";
            }
            if (id.includes("three") || id.includes("@react-three")) {
              return "vendor-three";
            }
            if (id.includes("@supabase")) {
              return "vendor-supabase";
            }
          }
        },
      },
    },
  },
});