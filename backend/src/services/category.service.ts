import { ICategory, CategoryType } from "../models/category.model";
import mongoose from "mongoose";
import Category from "../models/category.model";

interface createCategoryInput {
    userId: mongoose.Types.ObjectId;
    name: string;
    type: CategoryType;
}

interface deleteCategoryInput {
    userId: mongoose.Types.ObjectId;
    categoryId: string;
}

interface getCategoriesInput {
    userId: mongoose.Types.ObjectId;
    type?: CategoryType;
}

export const createCategory = async ( data: createCategoryInput): Promise<ICategory> => {
    const {userId, name, type} = data;
    
    const normalizedName = name.trim().toLowerCase();

    const existing = await Category.findOne({ userId, name:normalizedName, type });
    if (existing) {
        throw new Error(`Category "${name}" already exists for type "${type}"`);
    }

      // Create category
    const category = await Category.create({
        userId,
        name: normalizedName,
        type,
    });

  return category;
}

export const deleteCategory = async (data: deleteCategoryInput): Promise<void> => {
    const {userId, categoryId} = data;
    const category = await Category.findOne({ _id: categoryId, userId });
    if (!category) {
        throw new Error("Category not found or not authorized");
    }

    await Category.deleteOne({ _id: category._id });
}

export const getCategories = async(data: getCategoriesInput): Promise<ICategory[]> => {
    const {userId, type} = data; 

    const filter: any = { userId };
    if (type) filter.type = type;

    return Category.find(filter).sort({ name: 1 });
};