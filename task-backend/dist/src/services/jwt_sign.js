"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const signJwt = (user) => {
    const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.JWT_SECRET, { expiresIn: '3h' });
    return token;
};
exports.signJwt = signJwt;
