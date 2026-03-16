import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { Summary, OverviewData, CategoryBreakdown } from "@/types/analytics";
import {
  getSummary,
  getOverview,
  getCategoryBreakdown,
} from "@/services/analyticsService";

export const useAnalytics = () => {
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [type, setType] = useState<"income" | "expense">("expense");

  const [summary, setSummary] = useState<Summary | null>(null);
  const [overview, setOverview] = useState<OverviewData[]>([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryBreakdown[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const [summaryData, overviewData, breakdownData] = await Promise.all([
        getSummary(API_URL, token, year, month),
        getOverview(API_URL, token, year),
        getCategoryBreakdown(API_URL, token, type, year, month),
      ]);

      setSummary(summaryData);
      setOverview(overviewData);
      setCategoryBreakdown(breakdownData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [token, year, month, type]);

  return {
    summary,
    overview,
    categoryBreakdown,
    year,
    month,
    type,
    setYear,
    setMonth,
    setType,
    loading,
    error,
    refresh: fetchAll,
  };
};