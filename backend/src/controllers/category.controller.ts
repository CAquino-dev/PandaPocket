import { Request, Response } from "express";
import * as categoryService from "../services/category.service";
import mongoose from "mongoose";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;
    
    const userId = new mongoose.Types.ObjectId(req.user!.id);

    if (!name || !type) {
      return res.status(400).json({ message: "Name and type are required" });
    }

    const category = await categoryService.createCategory({
      userId,
      name,
      type,
    });
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    
    const userId = new mongoose.Types.ObjectId(req.user!.id);
    const type = req.query.type as string | undefined;

    const categories = await categoryService.getCategories({
      userId,
      type: type as any,
    });

    res.status(200).json(categories);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user!.id);

    const idParam = req.params.id;

    if (!idParam || Array.isArray(idParam)) {
      return res.status(400).json({ message: "Invalid category id" });
    }

    await categoryService.deleteCategory({
      userId,
      categoryId: idParam,
    });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};