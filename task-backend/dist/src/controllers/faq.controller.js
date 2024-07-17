"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFaq = exports.updateFaq = exports.reOrderFaqs = exports.findAll = exports.create = void 0;
const Faq_1 = __importDefault(require("../models/Faq"));
const create = async (req, res) => {
    try {
        const body = req.body;
        const max_order = await Faq_1.default.find().sort({ order: -1 }).limit(1).then(faqs => (faqs[0] ? faqs[0].order : 0));
        body["order"] = max_order + 1;
        const new_faq = await Faq_1.default.create(body);
        return res.status(200).send({ data: new_faq });
    }
    catch (error) {
        return res.status(500).send({ message: error?.message });
    }
};
exports.create = create;
const findAll = async (req, res) => {
    try {
        const faqs = await Faq_1.default.find().sort({ order: 1 });
        return res.status(200).send({ data: faqs });
    }
    catch (error) {
        return res.status(500).send({ message: error?.message });
    }
};
exports.findAll = findAll;
const reOrderFaqs = async (req, res) => {
    try {
        const faq = await Faq_1.default.findById(req.params.id);
        const new_order = req.body.order;
        if (!faq) {
            return res.status(400).send({ message: "NO FAQ found with the given ID" });
        }
        const original_order = faq.order;
        if (new_order === original_order) {
            return res.status(200).send({ message: "FAQs ReOrdered" });
        }
        ;
        if (new_order < original_order) {
            await Faq_1.default.updateMany({ order: { $gte: new_order, $lt: original_order } }, { $inc: { order: 1 } });
        }
        else {
            await Faq_1.default.updateMany({ order: { $gt: original_order, $lte: new_order } }, { $inc: { order: -1 } });
        }
        faq.order = new_order;
        await faq.save();
        return res.status(201).send({ message: "FAQs ReOrdered" });
    }
    catch (error) {
        return res.status(500).send({ message: error?.message });
    }
};
exports.reOrderFaqs = reOrderFaqs;
const updateFaq = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const faq = await Faq_1.default.findByIdAndUpdate(id, body, { new: true });
        if (!faq) {
            return res.status(400).send({ message: 'No FAQ Found' });
        }
        return res.status(200).send({ message: 'FAQ Updated Successfully' });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error?.message });
    }
};
exports.updateFaq = updateFaq;
const deleteFaq = async (req, res) => {
    try {
        const id = req.params.id;
        const faq = await Faq_1.default.findById(id);
        if (!faq) {
            return res.status(400).send({ message: 'No FAQ Found' });
        }
        await Faq_1.default.deleteOne({ _id: id });
        return res.status(200).send({ message: 'FAQ Deleted Successfully' });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error?.message });
    }
};
exports.deleteFaq = deleteFaq;
