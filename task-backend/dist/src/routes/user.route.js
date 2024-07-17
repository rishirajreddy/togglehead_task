"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_controller_1 = require("../controllers/user.controller");
const user_middleware_1 = require("./../middlewares/user.middleware");
const auth_1 = require("../middlewares/auth");
const schema_validator_1 = require("../middlewares/schema_validator");
// import { validate } from "../middlewares/schemaValidator";
router.post("/", [auth_1.adminAccess, (0, schema_validator_1.validate)(user_middleware_1.userCreateSchema)], user_controller_1.create);
router.post("/register", user_controller_1.register);
router.post("/login", user_controller_1.login);
router.get("/me", auth_1.jwtVerify, user_controller_1.getMe);
router.get("/:id", user_controller_1.findOne);
// router.get("/:id", findOne)
exports.default = router;
