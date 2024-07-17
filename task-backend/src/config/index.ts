import { config } from "dotenv";

config()

export const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost:27017/toggle_mongo";
export const JWT_SECRET: string = process.env.JWT_SECRET || "JWT_SECRET";