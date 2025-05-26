import { users, loanQueries, type User, type InsertUser, type LoanQuery, type InsertLoanQuery, type UpdateLoanQuery } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private loanQueries: Map<number, LoanQuery>;
  private currentUserId: number;
  private currentQueryId: number;

  constructor() {
    this.users = new Map();
    this.loanQueries = new Map();
    this.currentUserId = 1;
    this.currentQueryId = 1;

    // Create default admin user
    this.createUser({ username: "admin", password: "admin123" });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLoanQuery(insertQuery: InsertLoanQuery): Promise<LoanQuery> {
    const id = this.currentQueryId++;
    const query: LoanQuery = {
      id,
      name: insertQuery.name,
      email: insertQuery.email,
      mobile: insertQuery.mobile,
      loanType: insertQuery.loanType,
      amount: insertQuery.amount,
      city: insertQuery.city,
      comments: insertQuery.comments || null,
      status: insertQuery.status,
      createdAt: new Date(),
    };
    this.loanQueries.set(id, query);
    return query;
  }

  async getLoanQueries(): Promise<LoanQuery[]> {
    return Array.from(this.loanQueries.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getLoanQuery(id: number): Promise<LoanQuery | undefined> {
    return this.loanQueries.get(id);
  }

  async updateLoanQuery(id: number, update: UpdateLoanQuery): Promise<LoanQuery | undefined> {
    const query = this.loanQueries.get(id);
    if (!query) return undefined;

    const updatedQuery: LoanQuery = { ...query, ...update };
    this.loanQueries.set(id, updatedQuery);
    return updatedQuery;
  }

  async deleteLoanQuery(id: number): Promise<boolean> {
    return this.loanQueries.delete(id);
  }
}

export const storage = new MemStorage();
