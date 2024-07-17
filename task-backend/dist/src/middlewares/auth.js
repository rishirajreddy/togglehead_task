"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const jwtVerify = (req) => {
    const authToken = req.headers.authorization?.split("Bearer")[0];
    if (typeof authToken === "string") {
        return jsonwebtoken_1.default.verify(authToken, config_1.JWT_SECRET);
    }
    else {
        return { message: "UnAuthorized" };
    }
};
exports.jwtVerify = jwtVerify;
