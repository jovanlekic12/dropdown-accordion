import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // Make "src" or "app" available for imports
        includePaths: [path.resolve(__dirname, "src")],
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      app: path.resolve(__dirname, "src/app"), // ✅ allows 'app/config/breakpoints'
    },
  },
});
