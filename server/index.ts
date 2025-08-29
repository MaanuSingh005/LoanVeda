// server/vite.ts
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, ViteDevServer } from "vite";
import express, { Express } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function setupVite(app: Express, server: any) {
  // Create Vite server in middleware mode
  const vite: ViteDevServer = await createViteServer({
    server: { middlewareMode: true },
    root: path.resolve(__dirname, "../client"), // adjust if needed
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);
}

export function serveStatic(app: Express) {
  // Serve built client in production
  const distPath = path.resolve(__dirname, "../dist");
  app.use(express.static(distPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

export function log(message: string) {
  console.log(`[server] ${message}`);
}
