import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(async () => {
  const isVercel = !!process.env.VERCEL;
  const isGH = process.env.GITHUB_PAGES === "true";
  const base = isVercel ? "/" : isGH ? "/LoanVeda/" : "/";

  return {
    base,
    build: {
      outDir: path.resolve(__dirname, "../dist"),
      emptyOutDir: true,
    },
    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...(process.env.NODE_ENV !== "production" &&
      process.env.REPL_ID !== undefined
        ? [(await import("@replit/vite-plugin-cartographer")).cartographer()]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@shared": path.resolve(__dirname, "../shared"),
        "@assets": path.resolve(__dirname, "../attached_assets"),
      },
    },
  };
});
