"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.create = void 0;
const User_1 = __importDefault(require("../models/User"));
const create = async (req, res) => {
    try {
        const body = req.body;
        body["role"] = 'authorized';
        const newUser = await User_1.default.create(body);
        return res.status(200).send({ pdata: newUser });
    }
    catch (error) {
        return res.status(500).send({ message: error?.message });
    }
};
exports.create = create;
const findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const findUser = await User_1.default.findById(id);
        if (!findUser)
            return res.status(404).send({ message: "No User Found!" });
        return res.status(200).send({ data: findUser });
    }
    catch (error) {
        return res.status(500).send({ message: error?.message });
    }
};
exports.findOne = findOne;
