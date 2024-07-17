"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bannerCreateSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().optional(),
    image_url: joi_1.default.string(),
    order: joi_1.default.number()
});
