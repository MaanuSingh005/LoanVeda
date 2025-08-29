import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(() => {
  return {
    root: path.resolve(__dirname, "client"),
    base: "/LoanVeda/",   // 👈 VERY IMPORTANT for GitHub Pages
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
      },
    },
  };
});
