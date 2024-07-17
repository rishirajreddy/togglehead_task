"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FaqSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    order: {
        type: Number
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Faq", FaqSchema);
