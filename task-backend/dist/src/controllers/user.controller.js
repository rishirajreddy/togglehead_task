"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.getMe = exports.login = exports.register = exports.findOne = exports.create = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_sign_1 = require("../services/jwt_sign");
const create = async (req, res) => {
    try {
        const body = req.body;
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
const register = async (req, res) => {
    try {
        const body = req.body;
        body["role"] = "authorized";
        const newUser = await User_1.default.create(body);
        return res.status(200).send({ pdata: newUser });
    }
    catch (error) {
        return res.status(500).send({ message: error?.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const body = req.body;
        const user = await User_1.default.findOne({ email: body.email }).select('+password');
        if (!user) {
            return res.status(400).send({ message: "NO User Found" });
        }
        const isMatched = await bcryptjs_1.default.compare(body.password, user.password);
        if (!isMatched) {
            return res.status(500).send({ message: "Invalid credentials" });
        }
        const token = (0, jwt_sign_1.signJwt)(user);
        const { password, ...filtered_user } = user.toObject();
        return res.status(200).send({ token: token, user: filtered_user });
    }
    catch (error) {
        return res.status(500).send({ message: error?.message });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const user_id = res.locals.user_id;
        const user = await User_1.default.findById(user_id);
        return res.status(200).send({ data: user });
    }
    catch (error) {
        return res.status(500).send({ data: error.message });
    }
};
exports.getMe = getMe;
const update = async (req, res) => {
    try {
        const user_id = res.locals.user_id;
        const body = req.body;
        if (body.password) {
            // const hashPassword = await bcrypt.hash()
        }
        const user = await User_1.default.updateOne({ _id: user_id }, body);
    }
    catch (error) {
        return res.status(500).send({ data: error.message });
    }
};
exports.update = update;
