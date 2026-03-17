import Category from "../models/category.model";
import Budget from "../models/budget.model";
import transactionModel from "../models/transaction.model";
import mongoose, { MongooseError } from "mongoose";

interface setBudgetInput {
    userId: mongoose.Types.ObjectId;
    categoryId: mongoose.Types.ObjectId;
    amount: number;
    month: number;
    year: number;
} 

interface deleteBudgetInput {        
    userId: mongoose.Types.ObjectId;
    budgetId: mongoose.Types.ObjectId;
}

interface getBudgetsWithSpendingInput {
    userId: mongoose.Types.ObjectId;
    month: number;
    year: number;
}

export const setBudget = async (data: setBudgetInput) => {
    const { userId, categoryId, amount, month, year } = data;

    const category = await Category.findOne({
    _id: categoryId,
    $or: [
        { userId },
        { userId: null }
    ]
    });

    if (!category) {
        throw new Error("Invalid category");
    }

    return Budget.findOneAndUpdate(
        { userId, categoryId, month, year },
        { amount },
        { upsert: true, new: true }
    );
};

export const deleteBudget = async (data: deleteBudgetInput) => {
    const {userId, budgetId} = data;

    const budget = await Budget.findOne({ _id: budgetId, userId });
    if(!budget){
        throw new Error("Budget not found or not authorized")
    };

    await Budget.deleteOne({ _id: budget.id });
};

export const getBudgetsWithSpending = async (data: getBudgetsWithSpendingInput) => {
    const { userId, month, year } = data;

    // Step 1: aggregate spending per category from transactions
    const spendingByCategory = await transactionModel.aggregate([
        {
            $match: {
                userId,
                type: "expense",
                date: {
                    $gte: new Date(year, month - 1, 1),
                    $lt: new Date(year, month, 1)
                }
            }
        },
        {
            $group: {
                _id: "$category",
                totalSpent: { $sum: "$amount" }
            }
        }
    ]);

    // Step 2: turn the array into a map for easy lookup
    const spendingMap = new Map(
        spendingByCategory.map(s => [s._id.toString(), s.totalSpent])
    );

    // Step 3: fetch all budgets for this user/month/year
    const budgets = await Budget.find({ userId, month, year });

    // Step 4: merge budgets with their spending
    return budgets.map(budget => ({
        ...budget.toObject(),
        spent: spendingMap.get(budget.categoryId.toString()) ?? 0
    }));
};