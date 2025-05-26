import { users, loanQueries, type User, type InsertUser, type LoanQuery, type InsertLoanQuery, type UpdateLoanQuery } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Loan query methods
  createLoanQuery(query: InsertLoanQuery): Promise<LoanQuery>;
  getLoanQueries(): Promise<LoanQuery[]>;
  getLoanQuery(id: number): Promise<LoanQuery | undefined>;
  updateLoanQuery(id: number, update: UpdateLoanQuery): Promise<LoanQuery | undefined>;
  deleteLoanQuery(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createLoanQuery(insertQuery: InsertLoanQuery): Promise<LoanQuery> {
    const [query] = await db
      .insert(loanQueries)
      .values({
        ...insertQuery,
        comments: insertQuery.comments || null,
      })
      .returning();
    return query;
  }

  async getLoanQueries(): Promise<LoanQuery[]> {
    const queries = await db
      .select()
      .from(loanQueries)
      .orderBy(loanQueries.createdAt);
    return queries.reverse(); // Most recent first
  }

  async getLoanQuery(id: number): Promise<LoanQuery | undefined> {
    const [query] = await db.select().from(loanQueries).where(eq(loanQueries.id, id));
    return query || undefined;
  }

  async updateLoanQuery(id: number, update: UpdateLoanQuery): Promise<LoanQuery | undefined> {
    const [query] = await db
      .update(loanQueries)
      .set(update)
      .where(eq(loanQueries.id, id))
      .returning();
    return query || undefined;
  }

  async deleteLoanQuery(id: number): Promise<boolean> {
    const result = await db.delete(loanQueries).where(eq(loanQueries.id, id));
    return result.rowCount > 0;
  }
}

// Initialize database with admin user
async function initializeDatabase() {
  try {
    const existingAdmin = await db.select().from(users).where(eq(users.username, "admin"));
    if (existingAdmin.length === 0) {
      await db.insert(users).values({ username: "admin", password: "admin123" });
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export const storage = new DatabaseStorage();

// Initialize database on startup
initializeDatabase();
