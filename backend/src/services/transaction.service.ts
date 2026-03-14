import Transaction from "../models/transaction.model";
import Category from "../models/category.model";
import mongoose from "mongoose";

interface CreateTransactionInput {
  userId: mongoose.Types.ObjectId;
  type: "income" | "expense";
  amount: number;
  categoryId: string;
  description?: string;
  date: Date;
}

interface GetTransactionsInput {
  userId: mongoose.Types.ObjectId;
  page?: number;
  limit?: number;
  type?: "income" | "expense";
  categoryId?: mongoose.Types.ObjectId;
  search?: string;
  startDate?: Date;
  endDate?: Date;
}

interface DeleteTransactionInput {
  userId: mongoose.Types.ObjectId;
  transactionId: string;
}

export const createTransaction = async ( data: CreateTransactionInput ) => {
  const { userId, type, amount, categoryId, description, date } = data;

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

  // Ensure transaction type matches category type
  if (category.type !== type) {
    throw new Error("Category type mismatch");
  }

  return Transaction.create({
    userId,
    type,
    amount,
    category: category._id,
    description,
    date,
  });
};

export const getUserTransactions = async (
  data: GetTransactionsInput
) => {

  const {
    userId,
    page = 1,
    limit = 10,
    type,
    categoryId,
    search,
    startDate,
    endDate,
  } = data;

  const skip = (page - 1) * limit;

  const filter: any = { userId };

  if(type) {
    filter.type = type;
  }

  if(categoryId) {
    filter.category = categoryId;
  }

  if(startDate || endDate){
    filter.date = {};

    if(startDate){
      filter.date.$gte = startDate;
    }
    if(endDate){
      filter.date.$lte = endDate;
    }
  }

    // search description
  if (search) {
    filter.description = {
      $regex: search,
      $options: "i",
    };
  }

  const total = await Transaction.countDocuments(filter);

  const transactions = await Transaction.find(filter)
  .populate("category", "name type")
  .sort({ date: -1 })
  .skip(skip)
  .limit(limit);

  return {
    transactions,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  };
};

export const deleteTransaction = async (
  data: DeleteTransactionInput
): Promise<void> => {
  const { userId, transactionId } = data;

  const transaction = await Transaction.findOne({
    _id: transactionId,
    userId,
  });

  if (!transaction) {
    throw new Error("Transaction not found or not authorized");
  }

  await Transaction.deleteOne({ _id: transaction._id });
};