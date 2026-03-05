import type { Transaction, Category } from "../types/transactions";

export const getCategories = async (API_URL: string, token: string) => {
  const res = await fetch(`${API_URL}/api/category/getCategories`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json() as Promise<Category[]>;
};

export const getTransactions = async (API_URL: string, token: string) => {
  const res = await fetch(`${API_URL}/api/transactions/getTransactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch transactions");

  return res.json() as Promise<Transaction[]>;
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