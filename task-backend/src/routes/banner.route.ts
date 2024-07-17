import { Router } from "express";
const router = Router();
import { adminAccess } from "../middlewares/auth";
import { validate } from "../middlewares/schema_validator";
import { bannerCreateSchema } from "../middlewares/banner.middleware";
import { create, deleteBanner, findAll, reOrderBanners, updateBanner } from "../controllers/banner.controller";
import { fileUpload } from "../middlewares/image_upload";

router.post("/", [adminAccess, fileUpload], create)
router.get("/",  findAll)
router.put("/:id/re-order",  adminAccess,reOrderBanners)
router.put("/:id",  [adminAccess,fileUpload],updateBanner)
router.delete("/:id",  adminAccess,deleteBanner)
export default router