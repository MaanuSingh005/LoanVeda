import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// export default defineConfig(async () => {
//   const isVercel = !!process.env.VERCEL;

//   return {
//     root: path.resolve(import.meta.dirname, "client"), // 👈 where index.html lives
//     base: isVercel ? "/" : "/LoanVeda/", // 👈 "/" for Vercel, repo name for GitHub Pages
//     build: {
//       outDir: path.resolve(import.meta.dirname, "dist"), // output to project root dist
//       emptyOutDir: true,
//     },
//     plugins: [
//       react(),
//       runtimeErrorOverlay(),
//       ...(process.env.NODE_ENV !== "production" &&
//       process.env.REPL_ID !== undefined
//         ? [
//             (await import("@replit/vite-plugin-cartographer")).cartographer(),
//           ]
//         : []),
//     ],
//     resolve: {
//       alias: {
//         "@": path.resolve(import.meta.dirname, "client", "src"),
//         "@shared": path.resolve(import.meta.dirname, "shared"),
//         "@assets": path.resolve(import.meta.dirname, "attached_assets"),
//       },
//     },
//   };
// });

export default defineConfig(async () => {
  const isVercel = !!process.env.VERCEL;

  return {
    root: path.resolve(__dirname, "client"),
    base: isVercel ? "/" : "/LoanVeda/",
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
    },
    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...(process.env.NODE_ENV !== "production" &&
      process.env.REPL_ID !== undefined
        ? [
            (await import("@replit/vite-plugin-cartographer")).cartographer(),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
  };
});