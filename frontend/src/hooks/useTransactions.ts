import { useEffect, useState } from "react";
import type { Transaction, Category } from "../types/transactions";
import type { TransactionFilters, PaginatedTransactions } from "@/services/transactionService";
import { getCategories, getTransactions } from "@/services/transactionService";

export const useTransactions = (API_URL: string, token: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<PaginatedTransactions["pagination"] | null>(null);

  const [filters, setFilters] = useState<TransactionFilters>({
    page: 1,
    limit: 10,
  });

  const fetchAll = async () => {
    const [cat, tx] = await Promise.all([
      getCategories(API_URL, token),
      getTransactions(API_URL, token, filters),
    ]);

    setCategories(cat);
    setTransactions(tx.transactions);
    setPagination(tx.pagination);
  };

  useEffect(() => {
    if (token) fetchAll();
  }, [token, filters]);

  return {
    categories,
    transactions,
    pagination,
    filters,
    setFilters,
    refresh: fetchAll,
  };
};