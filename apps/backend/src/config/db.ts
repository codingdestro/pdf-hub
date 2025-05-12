import mongoose, { Connection } from "mongoose";

class Database {
  private static instance: Database;
  private connection: Connection | null = null;

  private constructor() {}

  public async connect(): Promise<void> {
    try {
      if (this.connection) {
        return;
      }
      console.log("trying to connect with database");

      const MONGODB_URI =
        process.env.MONGODB_URI || "mongodb://localhost:27017/pdf-hub";

      await mongoose.connect(MONGODB_URI);
      this.connection = mongoose.connection;

      this.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
      });

      this.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
      });

      this.connection.on("disconnected", () => {
        console.log("MongoDB disconnected");
      });

      process.on("SIGINT", async () => {
        await this.disconnect();
        process.exit(0);
      });
    } catch (error) {
      console.error("Failed to connect to MongoDB:");
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null;
    }
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export default Database;
