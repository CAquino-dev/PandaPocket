import Accounts from "../models/accounts.model";
import mongoose from "mongoose";
import { accountType } from "../models/accounts.model";

interface getAccountsInput {
    userId: mongoose.Types.ObjectId;
}

interface createAccountInput {
    userId: mongoose.Types.ObjectId;
    type: accountType;
    name: string;
    balance: number;
    currency: string;
};  

interface updateAccountInput {
  userId: mongoose.Types.ObjectId;
  accountId: mongoose.Types.ObjectId;
  name?: string;
  type?: accountType;
  balance?: number;
  currency?: string;
}

interface deleteAccountInput {
  userId: mongoose.Types.ObjectId;
  accountId: mongoose.Types.ObjectId;
}


export const getAccounts = async (data: getAccountsInput) => {
    const { userId } = data;
     
    const res = await Accounts.find({ userId: userId })

    return res;
};

export const createAccount = async (data: createAccountInput) => {
    const { userId, type, name, balance, currency } = data;

    const existing = await Accounts.findOne({ userId, name });
    if(existing) {
        throw new Error(`Account already exists`);
    }

    const account = await Accounts.create({
        userId,
        type,
        name,
        balance,
        currency
    })

    return account;
};

export const updateAccount = async (data: updateAccountInput) => {
  const { userId, accountId, ...updates } = data;

  const account = await Accounts.findOne({ _id: accountId, userId });
  if (!account) throw new Error("Account not found or not authorized");

  Object.assign(account, updates);
  await account.save();

  return account;
};

export const deleteAccount = async (data: deleteAccountInput) => {
  const { userId, accountId } = data;

  const account = await Accounts.findOne({ _id: accountId, userId });
  if (!account) throw new Error("Account not found or not authorized");

  await Accounts.deleteOne({ _id: account._id });
};