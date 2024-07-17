import { Router } from "express";
import userRoute from "./user.route";
import bannerRoute from "./banner.route";
import faqRoute from "./faq.route";
const router = Router();
router.use("/users", userRoute)
router.use("/banners",bannerRoute )
router.use("/faqs",faqRoute )
export default router