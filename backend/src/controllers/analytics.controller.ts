import type { Request, Response } from "express";
import mongoose from "mongoose";
import * as analyticsService from "../services/analytics.service";

export const getOverview = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user!.id);
    const year = req.query.year ? Number(req.query.year) : new Date().getFullYear();

    const overview = await analyticsService.getOverview({ userId, year });

    res.status(200).json(overview);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getCategoryBreakdown = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user!.id);
    const year = req.query.year ? Number(req.query.year) : new Date().getFullYear();
    const month = req.query.month ? Number(req.query.month) : undefined;
    const type = req.query.type as "income" | "expense";

    if (!type || (type !== "income" && type !== "expense")) {
      res.status(400).json({ message: "type must be 'income' or 'expense'" });
      return;
    }

    const breakdown = await analyticsService.getCategoryBreakdown({
      userId,
      type,
      year,
      month,
    });

    res.status(200).json(breakdown);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getSummary = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user!.id);
    const now = new Date();
    const year = req.query.year ? Number(req.query.year) : now.getFullYear();
    const month = req.query.month ? Number(req.query.month) : now.getMonth() + 1;

    const summary = await analyticsService.getSummary({ userId, year, month });

    res.status(200).json(summary);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};