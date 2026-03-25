import mongoose from "mongoose";
import transactionModel from "../models/transaction.model";

interface OverviewInput {
  userId: mongoose.Types.ObjectId;
  year: number;
}

interface CategoryBreakdownInput {
  userId: mongoose.Types.ObjectId;
  type: "income" | "expense";
  year: number;
  month?: number;
}

interface SummaryInput {
  userId: mongoose.Types.ObjectId;
  year: number;
  month: number;
}

export const getOverview = async (data: OverviewInput) => {
  const { userId, year } = data;

  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  const result = await transactionModel.aggregate([
    {
      $match: {
        userId,
        date: { $gte: start, $lt: end }
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    {
      $sort: { "_id.month": 1 },
    },
  ]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const overview = months.map((month, i) => {
    const monthNum = i + 1;

    const income = result.find(
      (r) => r._id.month === monthNum && r._id.type === "income"
    );

    const expense = result.find(
      (r) => r._id.month === monthNum && r._id.type === "expense"
    );

    return {
      month,
      income: income?.total ?? 0,
      expenses: expense?.total ?? 0,
    };
  });

  return overview;
};

export const getCategoryBreakdown = async (data: CategoryBreakdownInput) => {
  const { userId, type, year, month } = data;

  const matchDate: { $gte: Date; $lt: Date } = month
    ? {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      }
    : {
        $gte: new Date(year, 0, 1),
        $lt: new Date(year + 1, 0, 1),
      };

  const result = await transactionModel.aggregate([
    {
      $match: {
        userId,
        type,
        date: matchDate,
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $project: {
        _id: 0,
        category: "$category.name",
        total: 1,
      },
    },
    {
      $sort: { total: -1 },
    },
  ]);

  return result;
};

export const getSummary = async (data: SummaryInput) => {
  const { userId, year, month } = data;

  const matchDate: { $gte: Date; $lt: Date } = {
    $gte: new Date(year, month - 1, 1),
    $lt: new Date(year, month, 1),
  };

  const result = await transactionModel.aggregate([
    {
      $match: {
        userId,
        date: matchDate,
      },
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  const income = result.find((r) => r._id === "income")?.total ?? 0;
  const expenses = result.find((r) => r._id === "expense")?.total ?? 0;
  const netSavings = income - expenses;
  const savingsRate = income > 0 ? Math.round((netSavings / income) * 100) : 0;

  return {
    totalIncome: income,
    totalExpenses: expenses,
    netSavings,
    savingsRate,
  };
};