"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSuperAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const initializeSuperAdmin = async () => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash('12345678', 10);
        const user = await User_1.default.findOneAndUpdate({ name: 'superadmin' }, {
            name: 'superadmin',
            email: 'superadmin@gmail.com',
            password: hashedPassword,
            role: 'admin',
            phone: "9999999999",
            country_code: "+91",
            city: "Mumbai",
            state: "Maharashtra"
        }, { upsert: true, new: true, setDefaultsOnInsert: true });
        console.log('Superadmin Initialized');
    }
    catch (error) {
        console.error('Error in findOrCreateSuperAdmin:', error);
        throw error;
    }
};
exports.initializeSuperAdmin = initializeSuperAdmin;
