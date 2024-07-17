import mongoose from "mongoose";
import { MONGO_URI } from "../config";
import { initializeSuperAdmin } from "../services/initialize_superadmin";

const dbConnection = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        await initializeSuperAdmin()
        console.log('MongoDB connected successfully');
    } catch (err: any) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};
export default dbConnection