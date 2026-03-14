import type { Transaction, Category } from "../types/transactions";

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

export const getCategories = async (API_URL: string, token: string) => {
  const res = await fetch(`${API_URL}/api/category/getCategories`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json() as Promise<Category[]>;
};

export const getTransactions = async (
  API_URL: string, 
  token: string,
  filters: TransactionFilters = {},
) => {
  const params = new URLSearchParams();

  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.type) params.set("type", filters.type);
  if (filters.categoryId) params.set("categoryId", filters.categoryId);
  if (filters.search) params.set("search", filters.search);
  if (filters.startDate) params.set("startDate", filters.startDate);
  if (filters.endDate) params.set("endDate", filters.endDate);

  const res = await fetch(
    `${API_URL}/api/transactions/transactions?${params.toString()}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) throw new Error("Failed to fetch transactions");
  
  return res.json() as Promise<PaginatedTransactions>;
};

export const createTransaction = async (
  API_URL: string,
  token: string,
  body: any
) => {
  const res = await fetch(`${API_URL}/api/transactions/createTransaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};