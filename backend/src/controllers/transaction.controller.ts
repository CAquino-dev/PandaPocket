import { Request, Response } from "express";
import * as transactionService from "../services/transaction.service";
import mongoose from "mongoose";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { type, amount, categoryId, description, date } = req.body;

    const userId = new mongoose.Types.ObjectId(req.user!.id);

    if (!type || !amount || !categoryId || !date) {
      return res.status(400).json({
        message: "Type, amount, categoryId and date are required",
      });
    }

    const transaction = await transactionService.createTransaction({
      userId,
      type,
      amount,
      categoryId,
      description,
      date,
    });

    res.status(201).json(transaction);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user!.id);

    const transactions = await transactionService.getUserTransactions({
      userId,
    });

    res.status(200).json(transactions);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user!.id);
    const idParam = req.params.id;

    if (!idParam || Array.isArray(idParam)) {
      return res.status(400).json({ message: "Invalid transaction id" });
    }

    await transactionService.deleteTransaction({
      userId,
      transactionId: idParam,
    });

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};