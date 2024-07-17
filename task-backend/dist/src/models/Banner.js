"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BannerSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image_url: {
        type: String,
    },
    redirect_url: {
        type: String,
    },
    order: {
        type: Number
    }
}, { timestamps: true });
BannerSchema.index({ title: 1, order: 1 });
exports.default = (0, mongoose_1.model)("Banner", BannerSchema);
