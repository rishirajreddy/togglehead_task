"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const banner_route_1 = __importDefault(require("./banner.route"));
const faq_route_1 = __importDefault(require("./faq.route"));
const router = (0, express_1.Router)();
router.use("/users", user_route_1.default);
router.use("/banners", banner_route_1.default);
router.use("/faqs", faq_route_1.default);
exports.default = router;
