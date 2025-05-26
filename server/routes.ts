import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLoanQuerySchema, updateLoanQuerySchema } from "@shared/schema";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  // Create loan query
  app.post("/api/query", async (req, res) => {
    try {
      const queryData = insertLoanQuerySchema.parse(req.body);
      const query = await storage.createLoanQuery(queryData);
      res.json(query);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all loan queries
  app.get("/api/queries", async (req, res) => {
    try {
      const queries = await storage.getLoanQueries();
      res.json(queries);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get single loan query
  app.get("/api/query/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const query = await storage.getLoanQuery(id);
      
      if (!query) {
        return res.status(404).json({ message: "Query not found" });
      }

      res.json(query);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update loan query status
  app.put("/api/query/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = updateLoanQuerySchema.parse(req.body);
      const query = await storage.updateLoanQuery(id, updateData);
      
      if (!query) {
        return res.status(404).json({ message: "Query not found" });
      }

      res.json(query);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Delete loan query
  app.delete("/api/query/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteLoanQuery(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Query not found" });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
