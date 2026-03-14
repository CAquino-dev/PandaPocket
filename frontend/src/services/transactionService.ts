import axios from "axios";
import type { Transaction } from "../types/transactions";

export type TransactionFilters = {
  page?: number;
  limit?: number;
  type?: "income" | "expense";
  categoryId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
};

export type PaginatedTransactions = {
  transactions: Transaction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
};

export const getTransactions = async (
  API_URL: string,
  token: string,
  filters: TransactionFilters = {}
) => {
  const params: Record<string, string> = {};

  if (filters.page) params.page = String(filters.page);
  if (filters.limit) params.limit = String(filters.limit);
  if (filters.type) params.type = filters.type;
  if (filters.categoryId) params.categoryId = filters.categoryId;
  if (filters.search) params.search = filters.search;
  if (filters.startDate) params.startDate = filters.startDate;
  if (filters.endDate) params.endDate = filters.endDate;

  try {
    const res = await axios.get(
      `${API_URL}/api/transactions/transactions`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params,
      }
    );

    return res.data as PaginatedTransactions;
  } catch (err) {
    throw new Error("Failed to fetch transactions");
  }
};

export const createTransaction = async (
  API_URL: string,
  token: string,
  body: any
) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/transactions/createTransaction`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Failed to create transaction");
  }
};