import { Request, Response } from "express";
import mongoose from "mongoose";
import * as budgetService from "../services/budget.service"

export const setBudget = async (req: Request, res: Response) => {
    try {
        const { amount, month, year, categoryId } = req.body;
        const userId = new mongoose.Types.ObjectId(req.user!.id);

        if (!amount || !month || !year || !categoryId) {
            res.status(400).json({
                message: "month, year, amount and categoryId are required",
            });
            return;
        }

        const budget = await budgetService.setBudget({
            userId,
            categoryId: new mongoose.Types.ObjectId(categoryId),
            amount,
            month,
            year,
        });

        res.status(200).json(budget);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBudget = async (req: Request, res: Response) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user!.id);
        const budgetId = new mongoose.Types.ObjectId(req.params.id as string);

        await budgetService.deleteBudget({ userId, budgetId });

        res.status(200).json({ message: "Budget deleted" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getBudgetsWithSpending = async (req: Request, res: Response) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user!.id);
        const now = new Date();
        const month = req.query.month ? Number(req.query.month) : now.getMonth() + 1;
        const year = req.query.year ? Number(req.query.year) : now.getFullYear();

        const budgets = await budgetService.getBudgetsWithSpending({ userId, month, year });

        res.status(200).json(budgets);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};