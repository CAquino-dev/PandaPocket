import { useEffect, useState } from "react";
import type { Transaction, Category } from "../types/transactions";
import type { TransactionFilters, PaginatedTransactions } from "@/services/transactionService";
import { getTransactions, getRecentTransactions } from "@/services/transactionService";
import { getCategories } from "@/services/categoryService";

export const useTransactions = (API_URL: string, token: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<PaginatedTransactions["pagination"] | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  const [filters, setFilters] = useState<TransactionFilters>({
    page: 1,
    limit: 10,
  });

  const fetchAll = async () => {
    const [cat, tx, rc] = await Promise.all([
      getCategories(API_URL, token),
      getTransactions(API_URL, token, filters),
      getRecentTransactions(API_URL, token)
    ]);

    setCategories(cat);
    setTransactions(tx.transactions);
    setPagination(tx.pagination);
    setRecentTransactions(rc.transactions);
  };

  useEffect(() => {
    if (token) fetchAll();
  }, [token, filters]);

  return {
    categories,
    transactions,
    recentTransactions,
    pagination,
    filters,
    setFilters,
    refresh: fetchAll,
  };
};