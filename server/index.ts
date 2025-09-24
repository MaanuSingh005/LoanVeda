
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, ViteDevServer } from "vite";
import express, { Express } from "express";
import { registerRoutes } from "./routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  // Register API routes
  await registerRoutes(app);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    try {
      const viteConfigPath = path.resolve(__dirname, "../client/vite.config.ts");
      const vite: ViteDevServer = await createViteServer({
        server: { middlewareMode: true },
        root: path.resolve(__dirname, "../client"),
        configFile: viteConfigPath,
      });
      app.use(vite.middlewares);
      console.log("Vite dev middleware initialized using:", viteConfigPath);
    } catch (err) {
      console.error("Failed to initialize Vite dev middleware:", err);
    }
  } else {
    // Serve static files in production
    const distPath = path.resolve(__dirname, "../dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
