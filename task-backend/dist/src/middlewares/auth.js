"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAccess = exports.jwtVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const User_1 = __importDefault(require("../models/User"));
const jwtVerify = async (req, res, next) => {
    const authToken = req.headers.authorization?.split("Bearer ")[1];
    if (typeof authToken === "string") {
        const data = jsonwebtoken_1.default.verify(authToken, config_1.JWT_SECRET);
        res.locals.user_id = data.id;
        next();
    }
    else {
        return res.status(401).json({ message: "UnAuthorized" });
    }
};
exports.jwtVerify = jwtVerify;
const adminAccess = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "UnAuthorized! Only Admin Can Access this route" });
        }
        const authToken = authHeader.split("Bearer ")[1];
        if (!authToken) {
            return res.status(401).json({ message: "UnAuthorized! Only Admin Can Access this route" });
        }
        const decodedToken = jsonwebtoken_1.default.verify(authToken, config_1.JWT_SECRET);
        const userId = decodedToken.id;
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "UnAuthorized! Only Admin Can Access this route" });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "UnAuthorized! Only Admin Can Access this route" });
        }
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ message: "UnAuthorized" });
    }
};
exports.adminAccess = adminAccess;
