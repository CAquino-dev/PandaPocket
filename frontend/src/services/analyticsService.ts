import axios from "axios";
import type { Summary, OverviewData, CategoryBreakdown } from "@/types/analytics";

export const getSummary = async (
  API_URL: string,
  token: string,
  year?: number,
  month?: number
) => {
  const params: Record<string, string> = {};
  if (year) params.year = String(year);
  if (month) params.month = String(month);

  const res = await axios.get<Summary>(`${API_URL}/api/analytics/summary`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return res.data;
};

export const getOverview = async (
  API_URL: string,
  token: string,
  year?: number
) => {
  const params: Record<string, string> = {};
  if (year) params.year = String(year);

  const res = await axios.get<OverviewData[]>(`${API_URL}/api/analytics/overview`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return res.data;
};

export const getCategoryBreakdown = async (
  API_URL: string,
  token: string,
  type: "income" | "expense",
  year?: number,
  month?: number
) => {
  const params: Record<string, string> = { type };
  if (year) params.year = String(year);
  if (month) params.month = String(month);

  const res = await axios.get<CategoryBreakdown[]>(`${API_URL}/api/analytics/categories`, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return res.data;
};