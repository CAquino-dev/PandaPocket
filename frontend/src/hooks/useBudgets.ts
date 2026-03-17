import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { BudgetWithCategory } from "@/types/budget";
import type { Category } from "@/types/transactions";
import { getBudgets, deleteBudget as deleteBudgetService } from "@/services/budgetService";
import { getCategories } from "@/services/categoryService";

export const useBudgets = () => {
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  const [budgets, setBudgets] = useState<BudgetWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const [budgetData, categoryData] = await Promise.all([
        getBudgets(API_URL, token, month, year),
        getCategories(API_URL, token),
      ]);

      setBudgets(budgetData);
      setCategories(categoryData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBudget = async (budgetId: string) => {
    try {
      await deleteBudgetService(API_URL, token!, budgetId);
      await fetchAll();
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [token, month, year]);

  return {
    budgets,
    categories,
    month,
    year,
    setMonth,
    setYear,
    loading,
    error,
    refresh: fetchAll,
    deleteBudget,
  };
};