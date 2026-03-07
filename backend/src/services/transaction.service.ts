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
  const { userId } = data;

  return Transaction.find({ userId })
    .populate("category", "name type")
    .sort({ date: -1 });
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