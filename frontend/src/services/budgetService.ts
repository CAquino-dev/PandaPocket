import axios from "axios";
import type { BudgetWithCategory } from "@/types/budget";

type SetBudgetBody = {
  categoryId: string;
  amount: number;
  month: number;
  year: number;
};

export const getBudgets = async (
  API_URL: string,
  token: string,
  month: number,
  year: number
) => {
  const res = await axios.get<BudgetWithCategory[]>(`${API_URL}/api/budgets`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { month, year },
  });

  return res.data;
};

export const setBudget = async (
  API_URL: string,
  token: string,
  body: SetBudgetBody
) => {
  const res = await axios.post<BudgetWithCategory>(
    `${API_URL}/api/budgets`,
    body,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return res.data;
};

export const deleteBudget = async (
  API_URL: string,
  token: string,
  budgetId: string
) => {
  await axios.delete(`${API_URL}/api/budgets/${budgetId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};