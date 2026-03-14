import { Router } from "express";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transaction.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/createTransaction", authMiddleware, createTransaction);
router.get("/transactions", authMiddleware, getTransactions);
router.delete("/deleteTransaction/:id", authMiddleware, deleteTransaction);

export default router;