import { Request, Response } from "express";
import * as accountsService from "../services/accounts.service";
import mongoose from "mongoose";

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user!.id);
    const accounts = await accountsService.getAccounts({ userId });

    res.status(200).json(accounts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { type, name, balance, currency } = req.body;
    const userId = new mongoose.Types.ObjectId(req.user!.id);

    if (!type || !name || balance === undefined || !currency) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const account = await accountsService.createAccount({
      userId,
      type,
      name,
      balance,
      currency,
    });

    res.status(201).json(account);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user!.id);
    const accountId = new mongoose.Types.ObjectId(req.params.id as string);
    const { name, type, balance, currency } = req.body;

    if (!name && !type && balance === undefined && !currency) {
      res.status(400).json({ message: "At least one field is required to update" });
      return;
    }

    const account = await accountsService.updateAccount({
      userId,
      accountId,
      name,
      type,
      balance,
      currency,
    });

    res.status(200).json(account);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user!.id);
    const accountId = new mongoose.Types.ObjectId(req.params.id as string);

    await accountsService.deleteAccount({ userId, accountId });

    res.status(200).json({ message: "Account deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};