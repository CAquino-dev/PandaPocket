import { useEffect, useState } from "react";
import type { Transaction, Category } from "../types/transactions";
import {
  getCategories,
  getTransactions,
} from "@/services/transactionService";

export const useTransactions = (API_URL: string, token: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchAll = async () => {
    const [cat, tx] = await Promise.all([
      getCategories(API_URL, token),
      getTransactions(API_URL, token),
    ]);

    setCategories(cat);
    setTransactions(tx);
  };

  useEffect(() => {
    if (token) fetchAll();
  }, [token]);

  return {
    categories,
    transactions,
    refresh: fetchAll,
  };
};