"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGO_URI = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/toggle_mongo";
exports.JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET";
