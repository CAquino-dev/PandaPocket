import { Router } from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
} from "../controllers/category.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/createCategory", authMiddleware, createCategory);
router.get("/getCategories", authMiddleware, getCategories);
router.delete("/deleteCategories/:id", authMiddleware, deleteCategory);


export default router;