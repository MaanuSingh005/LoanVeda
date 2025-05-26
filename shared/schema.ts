import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const loanQueries = pgTable("loan_queries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile").notNull(),
  loanType: text("loan_type").notNull(),
  amount: integer("amount").notNull(),
  city: text("city").notNull(),
  comments: text("comments"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLoanQuerySchema = createInsertSchema(loanQueries).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  loanType: z.enum(["personal", "business", "home", "car", "education", "gold"]),
  amount: z.number().min(1000, "Minimum loan amount is ₹1,000"),
  city: z.string().min(2, "City must be at least 2 characters"),
  comments: z.string().optional(),
  status: z.enum(["pending", "responded"]).default("pending"),
});

export const updateLoanQuerySchema = z.object({
  status: z.enum(["pending", "responded"]),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLoanQuery = z.infer<typeof insertLoanQuerySchema>;
export type LoanQuery = typeof loanQueries.$inferSelect;
export type UpdateLoanQuery = z.infer<typeof updateLoanQuerySchema>;
