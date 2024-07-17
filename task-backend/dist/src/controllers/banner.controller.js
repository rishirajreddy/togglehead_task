"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBanner = exports.updateBanner = exports.reOrderBanners = exports.findAll = exports.create = void 0;
const Banner_1 = __importDefault(require("../models/Banner"));
const create = async (req, res) => {
    try {
        const body = req.body;
        const max_order = await Banner_1.default.find().sort({ order: -1 }).limit(1).then(banners => (banners[0] ? banners[0].order : 0));
        if (!req.file) {
            return res.status(400).json({ message: 'No file selected' });
        }
        const filePath = req.file.path.split("\\").join("/");
        const image_url = "/" + filePath;
        body["order"] = max_order + 1;
        body["image_url"] = image_url;
        const newBanner = await Banner_1.default.create(body);
        return res.status(200).send({ data: newBanner });
    }
    catch (error) {
        return res.status(500).send({ message: error?.message });
    }
};
exports.create = create;
const findAll = async (req, res) => {
    try {
        const banners = await Banner_1.default.find().sort({ order: 1 });
        return res.status(200).send({ data: banners });
    }
    catch (error) {
        return res.status(500).send({ message: error?.message });
    }
};
exports.findAll = findAll;
const reOrderBanners = async (req, res) => {
    try {
        const banner = await Banner_1.default.findById(req.params.id);
        const new_order = req.body.order;
        if (!banner) {
            return res.status(400).send({ message: "NO Banners found with the given ID" });
        }
        const original_order = banner.order;
        if (new_order === original_order) {
            return res.status(200).send({ message: "Banner ReOrdered" });
        }
        ;
        if (new_order < original_order) {
            await Banner_1.default.updateMany({ order: { $gte: new_order, $lt: original_order } }, { $inc: { order: 1 } });
        }
        else {
            await Banner_1.default.updateMany({ order: { $gt: original_order, $lte: new_order } }, { $inc: { order: -1 } });
        }
        banner.order = new_order;
        await banner.save();
        return res.status(201).send({ message: "Banner ReOrdered" });
    }
    catch (error) {
        return res.status(500).send({ message: error?.message });
    }
};
exports.reOrderBanners = reOrderBanners;
const updateBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if (req.file) {
            const filePath = req.file.path.split("\\").join("/");
            const image_url = "/" + filePath;
            body["image_url"] = image_url;
        }
        const banner = await Banner_1.default.findByIdAndUpdate(id, body, { new: true });
        if (!banner) {
            return res.status(400).send({ message: 'No Banner Found' });
        }
        return res.status(200).send({ message: 'Banner Updated Successfully' });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error?.message });
    }
};
exports.updateBanner = updateBanner;
const deleteBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const banner = await Banner_1.default.findById(id);
        if (!banner) {
            return res.status(400).send({ message: 'No Banner Found' });
        }
        await Banner_1.default.deleteOne({ _id: id });
        return res.status(200).send({ message: 'Banner Deleted Successfully' });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error?.message });
    }
};
exports.deleteBanner = deleteBanner;
