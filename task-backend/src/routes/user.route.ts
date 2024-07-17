import { Router } from "express";
const router = Router();
import { create, findOne, getMe, login, register } from "../controllers/user.controller"
import { userCreateSchema } from './../middlewares/user.middleware';
import { adminAccess, jwtVerify } from "../middlewares/auth";
import { validate } from "../middlewares/schema_validator";
// import { validate } from "../middlewares/schemaValidator";

router.post("/", [adminAccess, validate(userCreateSchema)], create)
router.post("/register",  register)
router.post("/login",  login)
router.get("/me", jwtVerify, getMe)
router.get("/:id", findOne)
// router.get("/:id", findOne)
export default router