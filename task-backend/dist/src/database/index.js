"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const initialize_superadmin_1 = require("../services/initialize_superadmin");
const dbConnection = async () => {
    try {
        await mongoose_1.default.connect(config_1.MONGO_URI);
        await (0, initialize_superadmin_1.initializeSuperAdmin)();
        console.log('MongoDB connected successfully');
    }
    catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};
exports.default = dbConnection;
