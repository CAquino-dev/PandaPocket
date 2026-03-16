import { Router } from "express";
import { getOverview, getCategoryBreakdown, getSummary } from "../controllers/analytics.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/overview", authMiddleware, getOverview);
router.get("/categories", authMiddleware, getCategoryBreakdown);
router.get("/summary", authMiddleware, getSummary);


export default router;