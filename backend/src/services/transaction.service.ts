import Transaction from "../models/transaction.model";
import Category from "../models/category.model";
import Account from "../models/accounts.model";
import mongoose from "mongoose";

interface CreateTransactionInput {
  userId: mongoose.Types.ObjectId;
  accountId: mongoose.Types.ObjectId;
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
  accountId?: mongoose.Types.ObjectId;
  search?: string;
  startDate?: Date;
  endDate?: Date;
}

interface DeleteTransactionInput {
  userId: mongoose.Types.ObjectId;
  transactionId: string;
}

export const createTransaction = async (data: CreateTransactionInput) => {
  const { userId, accountId, type, amount, categoryId, description, date } = data;

  // Validate category
  const category = await Category.findOne({
    _id: categoryId,
    $or: [{ userId }, { userId: null }],
  });

  if (!category) throw new Error("Invalid category");
  if (category.type !== type) throw new Error("Category type mismatch");

  // Validate account belongs to user
  const account = await Account.findOne({ _id: accountId, userId });
  if (!account) throw new Error("Account not found or not authorized");

  // Create the transaction
  const transaction = await Transaction.create({
    userId,
    accountId,
    type,
    amount,
    category: category._id,
    description,
    date,
  });

  // Update account balance
  const balanceChange = type === "income" ? amount : -amount;
  await Account.findOneAndUpdate(
    { _id: accountId, userId },
    { $inc: { balance: balanceChange } }
  );

  return transaction;
};

export const getUserTransactions = async (data: GetTransactionsInput) => {
  const {
    userId,
    page = 1,
    limit = 10,
    type,
    categoryId,
    accountId,
    search,
    startDate,
    endDate,
  } = data;

  const skip = (page - 1) * limit;
  const filter: any = { userId };

  if (type) filter.type = type;
  if (categoryId) filter.category = categoryId;
  if (accountId) filter.accountId = accountId;

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = startDate;
    if (endDate) filter.date.$lte = endDate;
  }

  if (search) {
    filter.description = {
      $regex: search,
      $options: "i",
    };
  }

  const total = await Transaction.countDocuments(filter);

  const transactions = await Transaction.find(filter)
    .populate("category", "name type")
    .populate("accountId", "name type currency")
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

export const deleteTransaction = async (data: DeleteTransactionInput): Promise<void> => {
  const { userId, transactionId } = data;

  const transaction = await Transaction.findOne({
    _id: transactionId,
    userId,
  });

  if (!transaction) throw new Error("Transaction not found or not authorized");

  // Reverse the balance change
  const balanceChange = transaction.type === "income" ? -transaction.amount : transaction.amount;
  await Account.findOneAndUpdate(
    { _id: transaction.accountId, userId },
    { $inc: { balance: balanceChange } }
  );

  await Transaction.deleteOne({ _id: transaction._id });
};