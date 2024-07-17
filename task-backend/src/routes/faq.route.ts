import { Router } from "express";
const router = Router();
import { adminAccess } from "../middlewares/auth";
import { create, deleteFaq, findAll, reOrderFaqs, updateFaq } from "../controllers/faq.controller";

router.post("/", adminAccess, create)
router.get("/",  findAll)
router.put("/:id/re-order", adminAccess, reOrderFaqs)
router.delete("/:id", adminAccess, deleteFaq)
router.put("/:id", adminAccess, updateFaq)
export default router