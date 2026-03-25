import { Router } from "express";
import { setBudget, deleteBudget, getBudgetsWithSpending } from "../controllers/budget.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getBudgetsWithSpending);
router.post("/", authMiddleware, setBudget);
router.delete("/:id", authMiddleware, deleteBudget);

export default router;